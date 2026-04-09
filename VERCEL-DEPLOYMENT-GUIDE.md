# 🚀 Vercel Deployment Guide for See Mee

## Quick Deploy (5 Minutes)

### Step 1: Go to Vercel
1. Open your browser and go to: **https://vercel.com**
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Project
1. Click **"Add New..."** → **"Project"**
2. Find and select: **`dakshverma23/SEE_MEE`**
3. Click **"Import"**

### Step 3: Configure Build Settings
Leave these as default (Vercel will auto-detect):
- **Framework Preset:** Vite
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Step 4: Add Environment Variables
Click **"Environment Variables"** and add these:

```
MONGODB_URI=mongodb+srv://daksh2singh34_db_user:1165yXLEmoXV3HZN@seemee.d8uqovf.mongodb.net/seemee?retryWrites=true&w=majority

JWT_SECRET=seemee_super_secret_jwt_key_2024_change_in_production_xyz123

PORT=5000

NODE_ENV=production

ADMIN_EMAIL=admin@seemee.com

ADMIN_PASSWORD=admin123
```

**Important:** Add each variable separately:
- Name: `MONGODB_URI`, Value: `mongodb+srv://...`
- Name: `JWT_SECRET`, Value: `seemee_super_secret_jwt_key_2024...`
- Name: `PORT`, Value: `5000`
- Name: `NODE_ENV`, Value: `production`
- Name: `ADMIN_EMAIL`, Value: `admin@seemee.com`
- Name: `ADMIN_PASSWORD`, Value: `admin123`

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes for build to complete
3. You'll get a live URL like: `https://see-mee-xyz.vercel.app`

---

## After Deployment

### Access Your Site
- **Frontend:** `https://your-app.vercel.app`
- **Admin Panel:** `https://your-app.vercel.app/admin`
- **API:** `https://your-app.vercel.app/api/...`

### Admin Login
- Email: `admin@seemee.com`
- Password: `admin123`

---

## Important Notes

⚠️ **File Uploads:** Images uploaded through admin panel won't persist after redeployment on Vercel's free tier. For production, you'll need cloud storage (Cloudinary, AWS S3, etc.)

✅ **What Works:**
- All frontend pages and features
- Admin panel and authentication
- MongoDB database (persistent)
- Product management
- Collection and category pages
- Magazine slideshow
- Cart and wishlist

---

## Troubleshooting

### Build Fails?
- Check that all environment variables are added correctly
- Make sure MongoDB URI is whitelisted for all IPs (0.0.0.0/0)

### API Not Working?
- Verify environment variables are set
- Check MongoDB Atlas Network Access allows Vercel IPs

### Need Help?
- Check Vercel deployment logs in the dashboard
- Verify your GitHub repo has the latest code

---

## Alternative: Deploy via Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

---

**Your app is ready to deploy! Just follow the steps above.** 🎉
