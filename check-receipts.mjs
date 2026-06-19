import Database from 'better-sqlite3';

const dbPath = process.env.DATABASE_PATH || './data/hackathon.db';
const db = new Database(dbPath);

console.log('Checking registrations with payment receipts...\n');

const registrations = db.prepare('SELECT id, fullName, email, teamName, paymentReceiptPath FROM registrations').all();

registrations.forEach(reg => {
  console.log(`ID: ${reg.id}`);
  console.log(`Name: ${reg.fullName}`);
  console.log(`Team: ${reg.teamName}`);
  console.log(`Receipt Path: ${reg.paymentReceiptPath || 'NULL'}`);
  console.log('---');
});

db.close();
