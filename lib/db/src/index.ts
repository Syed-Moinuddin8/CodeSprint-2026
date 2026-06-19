import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the directory path for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// SQLite database file location
const dbPath = process.env.DATABASE_PATH || join(__dirname, "../../../data/hackathon.db");

// Ensure the data directory exists
import { mkdirSync } from "fs";
const dataDir = dirname(dbPath);
try {
  mkdirSync(dataDir, { recursive: true });
} catch (err) {
  // Directory already exists
}

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });

export * from "./schema";
