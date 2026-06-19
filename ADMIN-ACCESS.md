# Admin Panel Access Guide

## 🔐 Admin Login Credentials

**Username:** `admin`  
**Password:** `admin123`

## 📍 How to Access Admin Panel

### Step 1: Open Admin Panel
Navigate to: **http://localhost:5173/admin**

### Step 2: Login
1. Enter username: `admin`
2. Enter password: `admin123`
3. Click "Sign In"

### Step 3: View Dashboard
After login, you'll see:
- Total registrations count
- Number of teams registered
- Individual participants count
- Recent registrations table
- Export to CSV button

## 🎯 Admin Panel Features

### Current Features
- ✅ View registration statistics
- ✅ See recent registrations (last 5)
- ✅ Export all registrations to CSV
- ✅ Logout functionality

### Coming Soon (To Be Implemented)
- ⏳ View all registrations (not just recent 5)
- ⏳ View payment receipt images
- ⏳ Search and filter registrations
- ⏳ Delete registrations
- ⏳ View individual registration details
- ⏳ Change admin password

## 📊 What You Can See Now

### Dashboard Stats Cards
1. **Total Registrations** - Count of all registered teams
2. **Teams** - Number of unique teams
3. **Individual Participants** - Solo participants count

### Recent Registrations Table
Displays last 5 registrations with:
- Name
- Email
- Team Name
- Team Size

### Export Function
Click "Export CSV" to download all registrations as CSV file

## 🔧 Admin Account Management

### To Create Additional Admins
```bash
cd Hackathon-Master-Plan
node lib/db/create-admin.mjs
```

### To Change Password
Currently need to:
1. Open database directly
2. Update password hash manually

(Password change feature will be added in admin panel)

## 📁 Database Location

**SQLite Database:** `Hackathon-Master-Plan/data/hackathon.db`

### Direct Database Access
```bash
# Using sqlite3 CLI
sqlite3 data/hackathon.db

# View all admins
SELECT * FROM admins;

# View all registrations
SELECT * FROM registrations;
```

## 🔒 Security Notes

1. **Change Default Password**
   - The default password `admin123` should be changed after first login
   - (Feature to be implemented in admin panel)

2. **Session-Based Auth**
   - Uses Express sessions
   - Session data stored in memory
   - Logout clears session

3. **Protected Routes**
   - Only authenticated admins can access dashboard
   - API endpoints check session authentication

## 🚀 Next Steps

To enhance the admin panel with:
1. Full registration list (paginated)
2. Payment receipt viewing
3. Search functionality
4. Registration management

Would you like me to implement these features?

## ⚠️ Important

- Keep admin credentials secure
- Don't share admin login publicly
- Change default password in production
- Regular database backups recommended

## 📞 Support

If you can't access the admin panel:
1. Make sure both servers are running:
   - Frontend: http://localhost:5173
   - API: http://localhost:5000
2. Check browser console for errors
3. Verify admin user exists in database
4. Try clearing browser cache/cookies
