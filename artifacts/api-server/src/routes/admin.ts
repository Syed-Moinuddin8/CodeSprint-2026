import { Router } from "express";
import { db } from "@workspace/db";
import { adminsTable, registrationsTable } from "@workspace/db";
import { eq, count, sql, desc } from "drizzle-orm";
import { AdminLoginBody } from "@workspace/api-zod";
import * as crypto from "crypto";

const router = Router();

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "codesprint2026salt").digest("hex");
}

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }
  const { username, password } = parsed.data;
  try {
    const [admin] = await db
      .select()
      .from(adminsTable)
      .where(eq(adminsTable.username, username));

    if (!admin || admin.passwordHash !== hashPassword(password)) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    (req as any).session.adminAuthenticated = true;
    (req as any).session.adminUsername = username;

    res.json({ username, authenticated: true });
  } catch (err) {
    req.log.error({ err }, "Admin login failed");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/admin/logout", (req, res): void => {
  (req as any).session.destroy(() => {
    res.json({ ok: true });
  });
});

router.get("/admin/me", (req, res): void => {
  if (!(req as any).session?.adminAuthenticated) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  res.json({
    username: (req as any).session.adminUsername,
    authenticated: true,
  });
});

router.get("/admin/stats", async (req, res): Promise<void> => {
  if (!(req as any).session?.adminAuthenticated) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const [totalRow] = await db.select({ count: count() }).from(registrationsTable);
    const totalRegistrations = Number(totalRow?.count ?? 0);

    const [teamsRow] = await db
      .select({ count: sql<number>`count(distinct team_name)` })
      .from(registrationsTable);
    const teamsRegistered = Number(teamsRow?.count ?? 0);

    const [soloRow] = await db
      .select({ count: count() })
      .from(registrationsTable)
      .where(eq(registrationsTable.teamSize, 1));
    const individualParticipants = Number(soloRow?.count ?? 0);

    const recentRegistrations = await db
      .select()
      .from(registrationsTable)
      .orderBy(desc(registrationsTable.createdAt))
      .limit(5);

    res.json({
      totalRegistrations,
      teamsRegistered,
      individualParticipants,
      recentRegistrations: recentRegistrations.map((r) => ({
        ...r,
        createdAt: typeof r.createdAt === 'string' ? r.createdAt : r.createdAt.toISOString(),
      })),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get admin stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
