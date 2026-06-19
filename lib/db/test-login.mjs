import { createHash } from "crypto";
import Database from "better-sqlite3";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, "../../data/hackathon.db");

function hashPassword(password) {
  return createHash("sha256").update(password + "codesprint2026salt").digest("hex");
}

const db = new Database(dbPath);

const username = "admin";
const password = "admin123";
const expectedHash = hashPassword(password);

console.log("\n🔐 Testing Login Credentials");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(`Username: ${username}`);
console.log(`Password: ${password}`);
console.log(`\nExpected hash: ${expectedHash}`);

const admin = db.prepare("SELECT * FROM admins WHERE username = ?").get(username);

if (!admin) {
  console.log("\n❌ Admin user not found in database!");
} else {
  console.log(`\nStored hash:   ${admin.password_hash}`);
  console.log(`\nHashes match: ${admin.password_hash === expectedHash ? '✅ YES' : '❌ NO'}`);
  
  if (admin.password_hash === expectedHash) {
    console.log("\n✅ Login credentials are correct!");
    console.log("If login fails in browser, check:");
    console.log("  1. API server is running on port 5000");
    console.log("  2. No CORS errors in browser console");
    console.log("  3. Cookie settings in browser");
  } else {
    console.log("\n❌ Password hash mismatch!");
    console.log("Re-creating admin user...");
    
    db.prepare("DELETE FROM admins WHERE username = ?").run(username);
    db.prepare(`
      INSERT INTO admins (username, password_hash, created_at)
      VALUES (?, ?, datetime('now'))
    `).run(username, expectedHash);
    
    console.log("✅ Admin user recreated with correct password!");
  }
}

db.close();
