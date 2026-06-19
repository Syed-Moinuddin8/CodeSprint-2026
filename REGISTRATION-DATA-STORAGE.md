# Registration Data Storage - Complete Guide

## Current Status: ⚠️ NOT STORING DATA YET

Currently, when users submit the registration form:
- ✅ Form validates all fields
- ✅ Shows success alert
- ❌ **Data is NOT saved to database**
- ❌ **Payment receipts are NOT uploaded**
- ❌ **Only logs to browser console**

## Where Data SHOULD Be Stored

### 1. **Registration Details** → PostgreSQL Database
**Database:** `hackathon` (PostgreSQL)  
**Table:** `registrations`

**Columns:**
- `id` - Auto-increment primary key
- `full_name` - Team leader's name
- `email` - Email (unique)
- `phone` - Mobile number
- `college` - College/Organization
- `team_name` - Team name
- `team_size` - Number of members (1-4)
- `team_members` - JSON string of member names
- `payment_receipt_path` - Path to uploaded receipt file
- `created_at` - Registration timestamp

### 2. **Payment Receipts** → File System
**Location:** `Hackathon-Master-Plan/uploads/receipts/`

**File naming:** `receipt_[timestamp]_[teamname].[ext]`  
Example: `receipt_1781757350000_teamalpha.jpg`

## API Endpoints (Already Built!)

### POST /api/registrations
**Purpose:** Create new registration  
**Status:** ✅ Exists but NOT connected to frontend

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "college": "ABC College",
  "teamName": "Team Alpha",
  "teamSize": 2,
  "teamMembers": "John Doe, Jane Smith",
  "paymentReceiptPath": "/uploads/receipts/receipt_123.jpg"
}
```

### GET /api/registrations (Admin Only)
**Purpose:** View all registrations  
**Auth:** Requires admin login

### GET /api/registrations/export (Admin Only)
**Purpose:** Download registrations as CSV  
**Auth:** Requires admin login

### DELETE /api/registrations/:id (Admin Only)
**Purpose:** Delete a registration  
**Auth:** Requires admin login

## What Needs to Be Done

### Step 1: Setup Database
```bash
# Make sure PostgreSQL is running
# Update DATABASE_URL in environment

# Push database schema
cd Hackathon-Master-Plan
pnpm --filter @workspace/db run push
```

### Step 2: Create Uploads Directory
```bash
mkdir -p Hackathon-Master-Plan/uploads/receipts
```

### Step 3: Add File Upload to API
The API server needs:
- `multer` package for file uploads
- File upload endpoint
- Serve static files from uploads folder

### Step 4: Connect Frontend Form
The registration form needs:
- FormData for file upload
- Fetch call to POST /api/registrations
- Handle success/error responses

## File Locations

### Database Schema
```
Hackathon-Master-Plan/lib/db/src/schema/registrations.ts
```

### API Routes
```
Hackathon-Master-Plan/artifacts/api-server/src/routes/registrations.ts
```

### Frontend Form
```
Hackathon-Master-Plan/artifacts/hackathon/src/components/RegistrationForm.tsx
```

### API Validation Schemas
```
Hackathon-Master-Plan/lib/api-zod/src/registrations.ts
```

## Accessing Stored Data

### Option 1: Admin Dashboard
- Login at: http://localhost:5173/admin
- View all registrations
- Export to CSV
- Delete registrations

### Option 2: Direct Database Query
```sql
-- Connect to database
psql postgresql://localhost:5432/hackathon

-- View all registrations
SELECT * FROM registrations ORDER BY created_at DESC;

-- Count total registrations
SELECT COUNT(*) FROM registrations;

-- Search by team name
SELECT * FROM registrations WHERE team_name ILIKE '%alpha%';
```

### Option 3: Payment Receipts
```bash
# Navigate to uploads folder
cd Hackathon-Master-Plan/uploads/receipts

# List all receipts
ls -lh
```

## Security Considerations

1. **Payment Receipts**
   - Stored on server file system
   - Not publicly accessible
   - Admin can view via dashboard

2. **Personal Data**
   - Stored in PostgreSQL database
   - Password protected
   - Only admin can access

3. **File Upload Limits**
   - Max 5MB per receipt
   - Only images and PDF allowed
   - Validated before storage

## Next Steps to Make It Work

Would you like me to:
1. ✅ Complete the API file upload functionality
2. ✅ Connect the frontend form to the API
3. ✅ Set up the database tables
4. ✅ Test the complete flow

Let me know and I'll implement the full storage solution!
