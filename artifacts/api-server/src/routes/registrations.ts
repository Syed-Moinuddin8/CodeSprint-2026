import { Router } from "express";
import { db } from "@workspace/db";
import { registrationsTable } from "@workspace/db";
import { eq, ilike, or, desc } from "drizzle-orm";
import { CreateRegistrationBody, DeleteRegistrationParams } from "@workspace/api-zod";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Uploads directory - get from environment or use project root path
const projectRoot = process.env.PROJECT_ROOT || path.resolve(process.cwd(), "../..");
const uploadsDir = path.join(projectRoot, "uploads");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "receipt-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image and PDF files are allowed"));
    }
  },
});

function serializeReg(r: typeof registrationsTable.$inferSelect) {
  return { 
    ...r, 
    createdAt: typeof r.createdAt === 'string' ? r.createdAt : r.createdAt.toISOString() 
  };
}

router.get("/registrations", async (req, res): Promise<void> => {
  if (!(req as any).session?.adminAuthenticated) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const search = req.query.search as string | undefined;
  try {
    let rows;
    if (search) {
      rows = await db
        .select()
        .from(registrationsTable)
        .where(
          or(
            ilike(registrationsTable.fullName, `%${search}%`),
            ilike(registrationsTable.email, `%${search}%`),
            ilike(registrationsTable.teamName, `%${search}%`),
            ilike(registrationsTable.college, `%${search}%`),
          ),
        )
        .orderBy(desc(registrationsTable.createdAt));
    } else {
      rows = await db
        .select()
        .from(registrationsTable)
        .orderBy(desc(registrationsTable.createdAt));
    }
    res.json(rows.map(serializeReg));
  } catch (err) {
    req.log.error({ err }, "Failed to list registrations");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/registrations", upload.single("paymentReceipt"), async (req, res): Promise<void> => {
  const body = {
    ...req.body,
    teamSize: Number(req.body.teamSize),
    paymentReceiptPath: req.file ? `/uploads/${req.file.filename}` : undefined,
  };
  
  const parsed = CreateRegistrationBody.safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    return;
  }
  try {
    const [reg] = await db
      .insert(registrationsTable)
      .values(parsed.data)
      .returning();
    res.status(201).json(serializeReg(reg!));
  } catch (err: any) {
    if (err?.code === "23505" || err?.code === "SQLITE_CONSTRAINT" || err?.code === "SQLITE_CONSTRAINT_UNIQUE") {
      res.status(409).json({ error: "Email already registered. Please use a different email address." });
      return;
    }
    req.log.error({ err }, "Failed to create registration");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/registrations/export", async (req, res): Promise<void> => {
  if (!(req as any).session?.adminAuthenticated) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const rows = await db
      .select()
      .from(registrationsTable)
      .orderBy(desc(registrationsTable.createdAt));

    const headers = ["ID", "Full Name", "Email", "Phone", "College/Org", "Team Name", "Team Size", "Team Members", "Registered At"];
    const csvRows = [
      headers.join(","),
      ...rows.map((r) =>
        [
          r.id,
          `"${r.fullName.replace(/"/g, '""')}"`,
          `"${r.email.replace(/"/g, '""')}"`,
          `"${r.phone.replace(/"/g, '""')}"`,
          `"${r.college.replace(/"/g, '""')}"`,
          `"${r.teamName.replace(/"/g, '""')}"`,
          r.teamSize,
          `"${(r.teamMembers ?? "").replace(/"/g, '""')}"`,
          typeof r.createdAt === 'string' ? r.createdAt : r.createdAt.toISOString(),
        ].join(","),
      ),
    ];

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=registrations.csv");
    res.send(csvRows.join("\n"));
  } catch (err) {
    req.log.error({ err }, "Failed to export registrations");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/registrations/:id", async (req, res): Promise<void> => {
  if (!(req as any).session?.adminAuthenticated) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const params = DeleteRegistrationParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  try {
    const [deleted] = await db
      .delete(registrationsTable)
      .where(eq(registrationsTable.id, params.data.id))
      .returning();
    if (!deleted) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    req.log.error({ err }, "Failed to delete registration");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
