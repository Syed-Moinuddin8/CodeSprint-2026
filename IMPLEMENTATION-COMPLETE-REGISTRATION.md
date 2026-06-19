# Complete Registration System Implementation

## Overview
This document outlines the complete implementation for saving registration data and payment receipts.

## What We're Building

### 1. Frontend Form Submission
- Collect all registration data
- Upload payment receipt file
- Send to API endpoint
- Show success/error feedback

### 2. Backend API
- Receive multipart form data
- Save payment receipt to disk
- Store registration in database
- Return confirmation

### 3. Admin Dashboard
- View all registrations
- See payment receipt images
- Export to CSV
- Search and filter

## File Structure

```
Hackathon-Master-Plan/
├── uploads/                          # NEW: File storage
│   └── receipts/                     # Payment receipts
├── artifacts/
│   ├── api-server/
│   │   └── src/
│   │       ├── routes/
│   │       │   └── registrations.ts  # UPDATE: Add file upload
│   │       └── app.ts                # UPDATE: Serve static files
│   └── hackathon/
│       └── src/
│           ├── components/
│           │   └── RegistrationForm.tsx  # UPDATE: Connect to API
│           └── pages/
│               └── AdminDashboard.tsx    # UPDATE: Show receipts
└── lib/
    └── db/
        └── src/
            └── schema/
                └── registrations.ts  # DONE: Added paymentReceiptPath
```

## Implementation Steps

### Step 1: Create Uploads Directory ✅
```bash
mkdir -p Hackathon-Master-Plan/uploads/receipts
```

### Step 2: Update Database Schema ✅
Already done - added `paymentReceiptPath` field

### Step 3: Update API Registration Route
Need to add:
- Multer middleware for file upload
- File validation (size, type)
- Save file with unique name
- Store path in database

### Step 4: Update API App
Need to add:
- Static file serving for /uploads
- CORS for file uploads

### Step 5: Connect Frontend Form
Need to update:
- Use FormData instead of JSON
- Upload file with fetch
- Handle loading/error states
- Show success message

### Step 6: Enhance Admin Dashboard
Need to add:
- Full registrations list (not just recent)
- Image preview for receipts
- Search functionality
- Delete registrations
- View individual registration details

## API Endpoints

### POST /api/registrations (PUBLIC)
**Purpose:** Submit new registration with payment receipt

**Request:** multipart/form-data
- `fullName`: string
- `email`: string
- `phone`: string  
- `college`: string
- `teamName`: string
- `teamSize`: number
- `teamMembers`: string (comma-separated)
- `paymentReceipt`: file (image/pdf, max 5MB)

**Response:**
```json
{
  "id": 1,
  "fullName": "John Doe",
  "email": "john@example.com",
  "teamName": "Team Alpha",
  "paymentReceiptPath": "/uploads/receipts/receipt_1234567890_teamalpha.jpg",
  "createdAt": "2026-06-18T10:00:00.000Z"
}
```

### GET /api/registrations (ADMIN ONLY)
**Purpose:** List all registrations

**Query params:**
- `search`: string (optional) - Search in name/email/team

**Response:**
```json
[
  {
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "college": "ABC College",
    "teamName": "Team Alpha",
    "teamSize": 2,
    "teamMembers": "John Doe, Jane Smith",
    "paymentReceiptPath": "/uploads/receipts/receipt_123.jpg",
    "createdAt": "2026-06-18T10:00:00.000Z"
  }
]
```

### GET /uploads/receipts/:filename (ADMIN ONLY)
**Purpose:** View payment receipt image

## Database Schema

```sql
CREATE TABLE registrations (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  team_name TEXT NOT NULL,
  team_size INTEGER NOT NULL,
  team_members TEXT,
  payment_receipt_path TEXT,  -- NEW FIELD
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

## Frontend Form Flow

1. User fills form
2. User uploads payment receipt
3. Click "Submit Registration"
4. Form creates FormData object
5. Sends POST request to /api/registrations
6. Shows loading spinner
7. On success: Show confirmation, close modal
8. On error: Show error message

## Admin Dashboard Features

### View Registrations
- Table with all registrations
- Columns: ID, Name, Email, Phone, Team, Size, Registered At, Receipt
- Click receipt to view full image

### Search
- Search bar to filter by name/email/team/college
- Real-time filtering

### Export
- Download all registrations as CSV
- Includes all fields except receipt path

### View Receipt
- Click on receipt link
- Opens modal with full image
- Shows transaction ID area

## Security Considerations

1. **File Upload Validation**
   - Only accept: JPG, PNG, GIF, PDF
   - Max size: 5MB
   - Rename files to prevent path traversal

2. **Access Control**
   - Public: Can submit registrations
   - Admin only: Can view/export/delete

3. **File Storage**
   - Receipts stored outside public folder
   - Served through API with auth check
   - Original filenames not used

## Testing Checklist

- [ ] Submit registration with all fields
- [ ] Upload payment receipt
- [ ] See registration in admin dashboard
- [ ] View payment receipt image
- [ ] Export registrations to CSV
- [ ] Search registrations
- [ ] Delete registration
- [ ] Handle errors (duplicate email, large file, wrong format)

## Current Status

✅ Database schema updated
✅ Multer installed
⏳ API route needs file upload implementation
⏳ Frontend form needs API connection
⏳ Admin dashboard needs receipt viewing
⏳ Database tables need to be created

## Next Actions

Would you like me to:
1. ✅ Implement the complete API with file upload
2. ✅ Connect the registration form to save data
3. ✅ Enhance admin dashboard to show receipts
4. ✅ Push database schema changes
5. ✅ Test the complete flow

Ready to implement! 🚀
