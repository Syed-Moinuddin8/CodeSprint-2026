import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { sql } from "drizzle-orm";

export const registrationsTable = sqliteTable("registrations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  college: text("college").notNull(),
  teamName: text("team_name").notNull(),
  teamSize: integer("team_size").notNull(),
  teamMembers: text("team_members"),
  paymentReceiptPath: text("payment_receipt_path"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

export const insertRegistrationSchema = createInsertSchema(registrationsTable).omit({ id: true, createdAt: true });
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrationsTable.$inferSelect;
