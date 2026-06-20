# 🚀 Deploy CodeSprint 2026 on Render

## Complete Step-by-Step Guide

### 📋 Prerequisites
- ✅ GitHub repository (Already done: `https://github.com/Syed-Moinuddin8/CodeSprint-2026`)
- ✅ Render account (Free - we'll create in Step 1)

---

## 🎯 Deployment Steps

### **Step 1: Create Render Account**
1. Go to **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with your **GitHub** account
4. Authorize Render to access your repositories

---

### **Step 2: Deploy Backend API**

1. From Render Dashboard, click **"New +"** → **"Web Service"**

2. **Connect Repository:**
   - Click **"Connect GitHub"** if not already connected
   - Search for: **`CodeSprint-2026`**
   - Click **"Connect"** on your repository

3. **Configure the Web Service:**
   ```
   Name: codesprint-2026-api
   Region: Singapore (or closest to your users)
   Branch: main
   Root Directory: artifacts/api-server
   Runtime: Node
   Build Command: pnpm install
   Start Command: pnpm start
   Plan: Free
   ```

4. **Add Environment Variables:**
   Click **"Advanced"** → **"Add Environment Variable"**
   
   Add these variables:
   ```
   PORT = 5000
   DATABASE_PATH = /opt/render/project/src/data/hackathon.db
   PROJECT_ROOT = /opt/render/project/src
   NODE_ENV = production
   ```

5. **Add Persistent Disk (IMPORTANT):**
   - Scroll down to **"Disks"**
   - Click **"Add Disk"**
   - Configure:
     ```
     Name: codesprint-data
     Mount Path: /opt/render/project/src/data
     Size: 1 GB
     ```
   - This ensures your SQLite database persists!

6. Click **"Create Web Service"**

7. **Wait for deployment** (takes 3-5 minutes)
   - You'll see build logs
   - Once complete, you'll get a URL like: `https://codesprint-2026-api.onrender.com`
   - **Copy this URL!** You'll need it for the frontend

---

### **Step 3: Deploy Frontend**

1. From Render Dashboard, click **"New +"** → **"Static Site"**

2. **Connect Repository:**
   - Select: **`CodeSprint-2026`** (same repo)
   - Click **"Connect"**

3. **Configure the Static Site:**
   ```
   Name: codesprint-2026
   Branch: main
   Root Directory: artifacts/hackathon
   Build Command: pnpm install && pnpm run build
   Publish Directory: dist
   ```

4. **Add Environment Variable:**
   Click **"Advanced"** → **"Add Environment Variable"**
   
   ```
   VITE_API_URL = https://codesprint-2026-api.onrender.com
   ```
   ⚠️ **Replace with YOUR actual backend URL from Step 2!**

5. Click **"Create Static Site"**

6. **Wait for deployment** (takes 2-4 minutes)
   - Once complete, you'll get a URL like: `https://codesprint-2026.onrender.com`
   - This is your live website! 🎉

---

### **Step 4: Setup Admin Account**

Your database is empty! You need to create an admin account:

1. Go to your **backend service** in Render
2. Click **"Shell"** tab (in the menu)
3. Run these commands:
   ```bash
   cd /opt/render/project/src
   node lib/db/create-admin.mjs
   ```

This creates the admin user:
- **Username:** admin
- **Password:** admin123

---

### **Step 5: Test Your Deployment**

1. **Visit your frontend URL:** `https://codesprint-2026.onrender.com`
2. **Test registration:**
   - Click "Register Now"
   - Fill the form
   - Upload a test payment receipt
   - Submit
3. **Test admin login:**
   - Go to: `https://codesprint-2026.onrender.com/admin`
   - Login with: admin / admin123
   - Check if registrations appear

---

## 🎨 Custom Domain (Optional)

Want to use your own domain like `codesprint2026.com`?

1. Go to your Static Site settings
2. Click **"Custom Domains"**
3. Add your domain
4. Update DNS records as instructed by Render
5. Done!

---

## ⚡ Important Notes

### **Free Tier Limitations:**
- ⏱️ Services **sleep after 15 minutes** of inactivity
- 🐌 First request after sleep takes **~30 seconds** to wake up
- 💾 **750 hours/month** free (enough for your event)
- 📦 **1GB disk** storage for database

### **For Event Day:**
1. Keep the site "warm" by visiting it every 10-15 minutes
2. Or upgrade to paid plan ($7/month) to prevent sleeping

### **File Uploads:**
- Payment receipts are stored in the persistent disk
- They will persist across deployments
- Make sure the disk is properly mounted!

---

## 🔧 Troubleshooting

### **Problem: API not connecting**
**Solution:** 
- Check if `VITE_API_URL` in frontend matches your backend URL
- Ensure backend is running (check Render logs)

### **Problem: Database errors**
**Solution:**
- Verify persistent disk is mounted at `/opt/render/project/src/data`
- Run migrations: Click Shell → `pnpm run db:push`

### **Problem: Admin login not working**
**Solution:**
- Create admin account via Shell (see Step 4)
- Check backend logs for errors

### **Problem: Site is slow**
**Solution:**
- Free tier services sleep after inactivity
- Upgrade to paid plan ($7/month) for always-on service

---

## 📊 Monitoring

Check your services:
1. Go to Render Dashboard
2. Click on each service
3. View **Logs** tab for errors
4. View **Metrics** tab for performance

---

## 💰 Costs

- **Backend (Web Service):** Free (750 hours/month)
- **Frontend (Static Site):** Free (100GB bandwidth/month)
- **Disk Storage:** Free (1GB included)
- **Total:** $0/month on free tier!

**Upgrade Options:**
- Paid plan: $7/month (no sleeping, better performance)

---

## 🎉 You're Live!

Your CodeSprint 2026 website is now live on:
- **Frontend:** https://codesprint-2026.onrender.com
- **Backend API:** https://codesprint-2026-api.onrender.com
- **Admin Panel:** https://codesprint-2026.onrender.com/admin

Share your website and start accepting registrations! 🚀

---

## 📝 Post-Deployment Checklist

- [ ] Backend is deployed and running
- [ ] Frontend is deployed and accessible
- [ ] Admin account created
- [ ] Can register successfully
- [ ] Payment receipts upload works
- [ ] Admin can see registrations
- [ ] Admin can delete registrations
- [ ] All pages work (About, Timeline, Rules, etc.)
- [ ] WhatsApp float button works
- [ ] QR codes display correctly
- [ ] Success page shows after registration

---

## 🆘 Need Help?

If you encounter issues:
1. Check Render logs (Dashboard → Service → Logs)
2. Verify environment variables
3. Check if disk is mounted correctly
4. Contact Render support (they're very responsive!)

Good luck with your hackathon! 🎊
