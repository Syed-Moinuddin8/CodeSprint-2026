import { Router } from "express";
import { db } from "@workspace/db";
import { registrationsTable } from "@workspace/db";
import { count, sql } from "drizzle-orm";

const router = Router();

router.get("/stats", async (req, res): Promise<void> => {
  try {
    const [totalRow] = await db.select({ count: count() }).from(registrationsTable);
    const participants = Number(totalRow?.count ?? 0);

    const [teamsRow] = await db
      .select({ count: sql<number>`count(distinct team_name)` })
      .from(registrationsTable);
    const teams = Number(teamsRow?.count ?? 0);

    res.json({
      participants,
      teams,
      prizePool: "$10,000",
      judges: 12,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
