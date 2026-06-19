import Database from "better-sqlite3";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, "../../data/hackathon.db");

const db = new Database(dbPath);

try {
  const admins = db.prepare("SELECT id, username, created_at FROM admins").all();
  
  console.log("\n📊 Admin Users in Database:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
  
  if (admins.length === 0) {
    console.log("❌ No admin users found!");
  } else {
    admins.forEach(admin => {
      console.log(`ID: ${admin.id}`);
      console.log(`Username: ${admin.username}`);
      console.log(`Created: ${admin.created_at}`);
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
    });
  }
  
  // Check tables
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log("\n📋 Database Tables:");
  tables.forEach(t => console.log(`  - ${t.name}`));
  
} catch (error) {
  console.error("❌ Error:", error.message);
} finally {
  db.close();
}
