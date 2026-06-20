import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db, registrationsTable } from '@workspace/db';
import { eq } from 'drizzle-orm';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      // Get all registrations
      const registrations = await db
        .select()
        .from(registrationsTable)
        .orderBy(registrationsTable.createdAt);

      return res.status(200).json({ registrations });
    }

    if (req.method === 'POST') {
      // Create new registration
      const { fullName, email, phone, college, teamName, teamSize, teamMembers, paymentReceiptPath } = req.body;

      // Check if email already exists
      const existing = await db
        .select()
        .from(registrationsTable)
        .where(eq(registrationsTable.email, email))
        .limit(1);

      if (existing.length > 0) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Insert new registration
      const [registration] = await db
        .insert(registrationsTable)
        .values({
          fullName,
          email,
          phone,
          college,
          teamName,
          teamSize: parseInt(teamSize),
          teamMembers: teamMembers || null,
          paymentReceiptPath: paymentReceiptPath || null,
        })
        .returning();

      return res.status(201).json(registration);
    }

    if (req.method === 'DELETE') {
      // Delete registration
      const { id } = req.query;

      if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: 'Registration ID required' });
      }

      await db
        .delete(registrationsTable)
        .where(eq(registrationsTable.id, parseInt(id)));

      return res.status(200).json({ message: 'Registration deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
