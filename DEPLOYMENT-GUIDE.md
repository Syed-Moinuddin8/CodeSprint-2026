# CodeSprint 2026 - Deployment Guide

## Project Structure
This is a full-stack application with:
- **Frontend**: React + Vite (in `artifacts/hackathon/`)
- **Backend API**: Express.js (in `artifacts/api-server/`)
- **Database**: SQLite with file uploads

## Deployment Options

### 🎯 Option 1: Split Deployment (Recommended)

#### **Frontend on Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository: `Syed-Moinuddin8/CodeSprint-2026`
5. Configure:
   - **Root Directory**: `artifacts/hackathon`
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `pnpm install`
6. Add Environment Variable:
   - `VITE_API_URL`: (Your backend URL from Railway/Render - add after backend deployment)
7. Click "Deploy"

#### **Backend on Railway**
1. Go to [railway.app](https://railway.app)
2. Sign up/Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository: `Syed-Moinuddin8/CodeSprint-2026`
5. Configure:
   - **Root Directory**: `artifacts/api-server`
   - Railway will auto-detect Node.js
6. Add Environment Variables:
   - `PORT`: 5000
   - `DATABASE_PATH`: `/app/data/hackathon.db`
   - `PROJECT_ROOT`: `/app`
7. Railway will provide a URL like: `https://your-app.railway.app`
8. Copy this URL and update Vercel's `VITE_API_URL`

#### **Alternative: Backend on Render**
1. Go to [render.com](https://render.com)
2. Sign up/Sign in with GitHub
3. Click "New" → "Web Service"
4. Connect your repository
5. Configure:
   - **Name**: codesprint-2026-api
   - **Root Directory**: `artifacts/api-server`
   - **Build Command**: `pnpm install && pnpm run build`
   - **Start Command**: `pnpm start`
6. Add Environment Variables (same as Railway)
7. Click "Create Web Service"

---

### 🎯 Option 2: Everything on Railway (Simpler)

Deploy both frontend and backend together:

1. Go to [railway.app](https://railway.app)
2. Create a new project from your GitHub repo
3. Railway will detect the monorepo structure
4. Configure environment variables
5. Deploy!

---

### 🎯 Option 3: Everything on Render

Similar to Railway but on Render.

---

## Important: Update API URL in Frontend

After deploying the backend, update the frontend to use the production API:

### Method 1: Environment Variable (Recommended)
Update `artifacts/hackathon/vite.config.ts`:

```typescript
export default defineConfig({
  // ... existing config
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(
      process.env.VITE_API_URL || 'http://localhost:5000'
    )
  }
});
```

Then use in code:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

### Method 2: Update vite.config.ts proxy (Current)
Currently, the app uses a proxy in development. For production, you'll need to either:
1. Use environment variables (Method 1), or
2. Update API calls to use absolute URLs

---

## Database Considerations

### ⚠️ SQLite on Railway/Render
- Files are **ephemeral** (lost on restart) on free tiers
- For production, consider:
  1. **PostgreSQL** (Railway/Render provide free PostgreSQL)
  2. **Turso** (SQLite in the cloud with persistence)
  3. **Paid tier** on Railway/Render for persistent volumes

### Migration to PostgreSQL (If needed)
1. Update `lib/db/drizzle.config.ts` to use PostgreSQL
2. Update connection string in environment variables
3. Run migrations: `pnpm run db:push`

---

## File Uploads Consideration

File uploads (payment receipts) are stored in `/uploads` directory:
- **Not persistent** on Vercel/Railway/Render free tier
- **Solutions**:
  1. Use **Cloudinary** for image storage
  2. Use **AWS S3** or **Vercel Blob Storage**
  3. Upgrade to paid tier with persistent volumes

---

## Quick Start Commands

### Frontend (Local Development)
```bash
cd artifacts/hackathon
pnpm install
pnpm run dev
```

### Backend (Local Development)
```bash
cd artifacts/api-server
pnpm install
pnpm run dev
```

### Build Everything
```bash
pnpm install
pnpm run build
```

---

## Vercel Deployment Steps (Detailed)

1. **Push your code to GitHub** ✅ (Already done)

2. **Deploy Frontend to Vercel**:
   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel
   
   # Deploy from artifacts/hackathon directory
   cd artifacts/hackathon
   vercel
   ```

3. **Or use Vercel Dashboard**:
   - Visit: https://vercel.com/new
   - Import your GitHub repository
   - Select root directory: `artifacts/hackathon`
   - Deploy!

4. **Configure Environment Variables** in Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` with your backend URL

---

## Post-Deployment Checklist

- [ ] Frontend is accessible
- [ ] Backend API is responding
- [ ] Database is connected
- [ ] Registration form works
- [ ] Payment upload works (or migrated to cloud storage)
- [ ] Admin login works
- [ ] All routes work correctly
- [ ] Environment variables are set
- [ ] CORS is configured for frontend domain
- [ ] WhatsApp links work
- [ ] QR codes display correctly

---

## Support

If you encounter issues:
1. Check Vercel/Railway/Render logs
2. Verify environment variables
3. Check CORS configuration in backend
4. Ensure database migrations ran successfully

---

## Costs

- **Vercel**: Free tier (perfect for frontend)
- **Railway**: $5/month free credit (backend + DB)
- **Render**: Free tier available (may sleep after inactivity)

---

Good luck with your deployment! 🚀
