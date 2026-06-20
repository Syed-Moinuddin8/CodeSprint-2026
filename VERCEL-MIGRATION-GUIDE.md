# Complete Vercel Deployment Guide

## ⚠️ Important: Major Changes Required

Vercel is a **serverless platform** that requires significant architectural changes to your current setup.

---

## 🔄 Required Changes Overview

| Component | Current | Required for Vercel | Complexity |
|-----------|---------|-------------------|------------|
| Database | SQLite (file-based) | PostgreSQL/MySQL (cloud) | HIGH |
| API Server | Express.js | Serverless Functions | HIGH |
| File Uploads | Local `/uploads` | Cloud Storage (Cloudinary/S3) | MEDIUM |
| Static Files | Served by Express | Served by Vercel | LOW |

**Total Migration Time:** 4-6 hours of development work

---

## 🎯 Recommended Approach

### **Option 1: Hybrid (Easiest)**
- **Frontend** → Vercel
- **Backend + Database** → Render/Railway (keep current setup)
- **Benefit:** No code changes needed!

### **Option 2: Full Vercel (Most Work)**
- Everything on Vercel
- **Benefit:** Single platform, better integration
- **Drawback:** 4-6 hours of code refactoring

---

## 📝 If You Want Full Vercel Migration

### **Phase 1: Database Migration to PostgreSQL**

#### 1.1 Create Vercel Postgres Database

1. Go to https://vercel.com/dashboard
2. Create new project or go to existing
3. Go to **Storage** tab
4. Click **"Create Database"** → **"Postgres"**
5. Copy the connection string

#### 1.2 Update Database Configuration

**File:** `lib/db/drizzle.config.ts`

```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql', // Changed from 'sqlite'
  schema: './src/schema',
  out: './drizzle',
  dbCredentials: {
    url: process.env.POSTGRES_URL!, // Vercel provides this
  },
});
```

**File:** `lib/db/src/index.ts`

```typescript
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';

export const db = drizzle(sql);
```

#### 1.3 Update Schema Files

Change SQLite-specific types to PostgreSQL:

**File:** `lib/db/src/schema/registrations.ts`

```typescript
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const registrations = pgTable('registrations', {
  id: serial('id').primaryKey(), // Changed from integer
  fullName: text('full_name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone').notNull(),
  college: text('college').notNull(),
  teamName: text('team_name').notNull(),
  teamSize: integer('team_size').notNull(),
  teamMembers: text('team_members'),
  paymentReceiptPath: text('payment_receipt_path'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

#### 1.4 Run Migrations

```bash
cd lib/db
pnpm run db:push
```

---

### **Phase 2: Convert API to Serverless Functions**

#### 2.1 Create API Directory

Create: `artifacts/hackathon/api/`

#### 2.2 Convert Routes

**Example:** Convert registration endpoint

**Current (Express):** `artifacts/api-server/src/routes/registrations.ts`
```typescript
router.post('/registrations', upload.single('paymentReceipt'), async (req, res) => {
  // Express logic
});
```

**New (Vercel):** `artifacts/hackathon/api/registrations.ts`
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { db } from '@/lib/db';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === 'POST') {
    // Serverless logic
    const data = req.body;
    // Insert to database
    return res.status(200).json({ success: true });
  }
  
  if (req.method === 'GET') {
    // Get registrations
    return res.status(200).json({ registrations: [] });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
```

#### 2.3 Install Vercel Dependencies

```bash
cd artifacts/hackathon
pnpm add @vercel/node @vercel/postgres
```

---

### **Phase 3: File Upload to Cloudinary**

#### 3.1 Create Cloudinary Account

1. Go to https://cloudinary.com
2. Sign up for free (25GB free storage)
3. Get your credentials from dashboard

#### 3.2 Install Cloudinary SDK

```bash
cd artifacts/hackathon
pnpm add cloudinary
```

#### 3.3 Update Upload Logic

**File:** `artifacts/hackathon/api/upload.ts`

```typescript
import { v2 as cloudinary } from 'cloudinary';
import type { VercelRequest, VercelResponse } from '@vercel/node';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method === 'POST') {
    const file = req.body.file; // Base64 or URL
    
    const result = await cloudinary.uploader.upload(file, {
      folder: 'codesprint-receipts',
    });
    
    return res.json({ url: result.secure_url });
  }
}
```

#### 3.4 Update Frontend Upload

**File:** `artifacts/hackathon/src/components/RegistrationForm.tsx`

```typescript
// Convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};

// Upload file
const base64 = await fileToBase64(formData.paymentReceipt);
const uploadResponse = await fetch('/api/upload', {
  method: 'POST',
  body: JSON.stringify({ file: base64 }),
});
const { url } = await uploadResponse.json();
```

---

### **Phase 4: Vercel Configuration**

**File:** `artifacts/hackathon/vercel.json`

```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

### **Phase 5: Environment Variables**

Add to Vercel Dashboard:

```
POSTGRES_URL=postgresql://...
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### **Phase 6: Deploy**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd artifacts/hackathon
vercel
```

---

## 💰 Cost Comparison

| Platform | Database | Storage | Total/Month |
|----------|----------|---------|-------------|
| **Render (Current)** | SQLite (Free) | Disk (Free) | $0 |
| **Vercel (Full)** | Postgres (Free) | Cloudinary (Free 25GB) | $0 |
| **Vercel (Heavy Use)** | Postgres (Paid) | Blob Storage | $10-50 |

---

## ⏱️ Time Investment

- **Database Migration:** 2 hours
- **API Conversion:** 3 hours
- **File Upload Migration:** 1 hour
- **Testing & Debugging:** 2 hours
- **Total:** ~8 hours

---

## 🎯 My Recommendation

### **For Your Hackathon Event:**

**Use Hybrid Approach (Option 1):**
1. Deploy frontend on Vercel (fast & free)
2. Keep backend on Render (no code changes)
3. Total time: 10 minutes

**Why?**
- ✅ No code changes needed
- ✅ Works immediately
- ✅ Stable and tested
- ✅ Free tier sufficient
- ✅ Easy to manage

### **After the Event:**

If you want to migrate to full Vercel:
- You have time to refactor properly
- Can test thoroughly
- No pressure of upcoming event

---

## 🚀 Quick Deploy (Hybrid - Recommended)

### Frontend on Vercel:
```bash
cd artifacts/hackathon
vercel
```

### Backend on Render:
Keep your current setup!

**Connect them:**
```
VITE_API_URL=https://codesprint-2026-api.onrender.com
```

**Done in 10 minutes!** ✅

---

## 📞 Need Help?

If you still want full Vercel migration, I can help you:
1. Convert all routes to serverless
2. Migrate database to PostgreSQL
3. Setup Cloudinary for uploads

Let me know!
