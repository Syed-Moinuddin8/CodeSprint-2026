import Database from "better-sqlite3";
import { createHash } from "crypto";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database path
const dbPath = join(__dirname, "../data/hackathon.db");

// Hash password function (same as in admin.ts)
function hashPassword(password) {
  return createHash("sha256").update(password + "codesprint2026salt").digest("hex");
}

// Connect to database
const db = new Database(dbPath);

// Admin credentials
const username = "admin";
const password = "admin123";
const passwordHash = hashPassword(password);

try {
  // Check if admin already exists
  const existing = db.prepare("SELECT * FROM admins WHERE username = ?").get(username);
  
  if (existing) {
    console.log("❌ Admin user already exists!");
    console.log("\nLogin credentials:");
    console.log("Username: admin");
    console.log("Password: admin123");
  } else {
    // Insert admin user
    const stmt = db.prepare(`
      INSERT INTO admins (username, password_hash, created_at)
      VALUES (?, ?, datetime('now'))
    `);
    
    stmt.run(username, passwordHash);
    
    console.log("✅ Admin user created successfully!");
    console.log("\n🔐 Login Credentials:");
    console.log("━━━━━━━━━━━━━━━━━━━━━");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("━━━━━━━━━━━━━━━━━━━━━");
    console.log("\n📍 Admin Panel: http://localhost:5173/admin");
    console.log("\n⚠️  IMPORTANT: Change the password after first login!");
  }
} catch (error) {
  console.error("❌ Error creating admin:", error.message);
} finally {
  db.close();
}
