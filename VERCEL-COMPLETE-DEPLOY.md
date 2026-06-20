# 🚀 Complete Vercel Deployment Guide

## ✅ What's Been Set Up

Your project is now ready for Vercel deployment with:
- ✅ Supabase PostgreSQL database
- ✅ Vercel serverless API functions
- ✅ Cloudinary for file uploads (setup required)
- ✅ All routes converted to serverless

---

## 📋 Prerequisites

Before deploying, you need:

### 1. **Cloudinary Account** (for payment receipts)

**Sign up:**
1. Go to https://cloudinary.com/users/register/free
2. Sign up (free tier: 25GB storage, 25GB bandwidth/month)
3. Get credentials from Dashboard:
   - **Cloud Name**
   - **API Key**  
   - **API Secret**

Save these - you'll need them!

---

## 🎯 Step 1: Prepare for Deployment

### Update Registration Form for Cloudinary

The registration form needs to upload files to Cloudinary instead of local server.

**File:** `artifacts/hackathon/src/components/RegistrationForm.tsx`

Add this helper function after imports:

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
```

Update the `handleSubmit` function (around line 48):

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!formData.paymentReceipt) {
    alert("Please upload payment receipt before submitting!");
    return;
  }

  try {
    // Upload file to Cloudinary first
    const base64File = await fileToBase64(formData.paymentReceipt);
    
    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: base64File }),
    });

    if (!uploadResponse.ok) {
      throw new Error('File upload failed');
    }

    const { url: paymentReceiptPath } = await uploadResponse.json();

    // Submit registration with image URL
    const response = await fetch("/api/registrations", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: formData.teamLeaderName,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        teamName: formData.teamName,
        teamSize: formData.teamSize,
        teamMembers: [formData.member2, formData.member3, formData.member4]
          .filter(m => m.trim())
          .join(", "),
        paymentReceiptPath,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Registration failed");
    }

    const data = await response.json();

    // Store registration data and show success page
    setRegistrationData({
      id: data.id,
      teamName: formData.teamName,
      teamLeaderName: formData.teamLeaderName,
      phone: formData.phone,
      email: formData.email,
    });
    setShowSuccessPage(true);
      
  } catch (error: any) {
    let errorMessage = "Registration failed. Please try again.";
    
    if (error.message.includes("already registered")) {
      errorMessage = "This email is already registered.";
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    alert(`Registration Error: ${errorMessage}`);
    console.error("Registration error:", error);
  }
};
```

---

## 🎯 Step 2: Deploy to Vercel

### **Option A: Deploy via Vercel Dashboard** (Recommended)

1. **Go to** https://vercel.com
2. **Sign in** with GitHub
3. Click **"Add New..."** → **"Project"**
4. **Import** your repository: `CodeSprint-2026`
5. **Configure:**
   - **Root Directory:** `artifacts/hackathon`
   - **Framework Preset:** Vite
   - **Build Command:** `pnpm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `pnpm install`

6. **Add Environment Variables:**

Click "Environment Variables" and add:

```
DATABASE_URL = postgresql://postgres:o3DeEJSTutMQuuL1@db.hnlojhytgebehrhsijpu.supabase.co:5432/postgres

CLOUDINARY_CLOUD_NAME = your_cloud_name_here
CLOUDINARY_API_KEY = your_api_key_here
CLOUDINARY_API_SECRET = your_api_secret_here
```

7. Click **"Deploy"**

**Done!** Your site will be live in ~2 minutes at: `https://your-project.vercel.app`

---

### **Option B: Deploy via CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd artifacts/hackathon
vercel

# Follow prompts
# - Link to existing project or create new
# - Set root directory if needed
# - Deploy!
```

**Add environment variables:**
```bash
vercel env add DATABASE_URL
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
```

---

## 🎯 Step 3: Test Your Deployment

1. **Visit** your Vercel URL: `https://your-project.vercel.app`
2. **Test registration:**
   - Fill the form
   - Upload payment receipt
   - Submit
3. **Test admin:**
   - Go to `/admin`
   - Login: admin / admin123
   - Check registrations

---

## 📊 Check Database

Go to your Supabase dashboard to see registered users!

---

## 🔧 Troubleshooting

### **API Routes Not Working**

**Problem:** 404 on /api/* routes

**Solution:**
- Check `vercel.json` is in `artifacts/hackathon/` folder
- Ensure `api/` folder exists in same directory
- Redeploy

### **Database Connection Error**

**Problem:** Can't connect to Supabase

**Solution:**
- Verify `DATABASE_URL` in Vercel environment variables
- Check Supabase database is active
- Test connection string locally first

### **File Upload Fails**

**Problem:** Upload returns error

**Solution:**
- Verify Cloudinary credentials are correct
- Check environment variables in Vercel
- Test Cloudinary API key in their dashboard

### **CORS Errors**

**Problem:** API blocked by CORS

**Solution:**
Already handled in API functions! If still seeing errors:
- Clear browser cache
- Check Vercel deployment logs
- Ensure API routes include CORS headers

---

## 📈 Monitoring

### **Vercel Dashboard**

- **Deployments:** See all deployments and logs
- **Analytics:** Track visitors
- **Logs:** Real-time function logs

### **Supabase Dashboard**

- **Table Editor:** View registrations
- **SQL Editor:** Run queries
- **Logs:** Database query logs

---

## 💰 Costs

| Service | Free Tier | Paid (if needed) |
|---------|-----------|------------------|
| **Vercel** | 100GB bandwidth/month | $20/month (Pro) |
| **Supabase** | 500MB database | $25/month |
| **Cloudinary** | 25GB storage + 25GB bandwidth | $89/month |

**Total:** $0/month on free tier! ✅

---

## 🎊 You're Live!

Your website is now deployed on Vercel with:
- ✅ Serverless API functions
- ✅ Supabase PostgreSQL
- ✅ Cloudinary file storage
- ✅ Auto HTTPS
- ✅ Global CDN
- ✅ Auto scaling

**Share your URL and start accepting registrations!** 🚀

---

## 🔄 Making Updates

To update your site:

```bash
git add .
git commit -m "Update message"
git push origin main
```

Vercel will auto-deploy! 🎉

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Cloudinary Docs:** https://cloudinary.com/documentation

Good luck with CodeSprint 2026! 🎊
