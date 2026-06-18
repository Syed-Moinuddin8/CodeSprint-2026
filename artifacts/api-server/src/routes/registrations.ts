import { Router } from "express";
import { db } from "@workspace/db";
import { registrationsTable } from "@workspace/db";
import { eq, ilike, or, desc } from "drizzle-orm";
import { CreateRegistrationBody, DeleteRegistrationParams } from "@workspace/api-zod";

const router = Router();

function serializeReg(r: typeof registrationsTable.$inferSelect) {
  return { ...r, createdAt: r.createdAt.toISOString() };
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

router.post("/registrations", async (req, res): Promise<void> => {
  const parsed = CreateRegistrationBody.safeParse(req.body);
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
    if (err?.code === "23505") {
      res.status(409).json({ error: "Email already registered" });
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
          r.createdAt.toISOString(),
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
