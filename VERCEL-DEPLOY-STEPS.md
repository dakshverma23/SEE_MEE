# 🚀 Deploy to Vercel - Step by Step

## What We Fixed

1. ✅ Admin login now uses relative URLs (`/api/auth/login`) instead of hardcoded localhost
2. ✅ Images are stored as base64 in MongoDB (no file system needed)
3. ✅ Product model supports both old and new image formats
4. ✅ Server exports properly for Vercel serverless
5. ✅ API routes configured correctly

## Deploy Steps

### Step 1: Push Latest Code to GitHub

Run these commands in your terminal:

```bash
git add .
git commit -m "Vercel deployment fixes - base64 images and API routes"
git push origin master
```

### Step 2: Deploy on Vercel

1. Go to **https://vercel.com** and sign in with GitHub

2. Click **"Add New Project"**

3. Select your repository: **`dakshverma23/SEE_MEE`**

4. Configure settings:
   - Framework Preset: **Vite**
   - Root Directory: **`./`**
   - Build Command: **`npm run build`**
   - Output Directory: **`dist`**

5. Add Environment Variables:

```
MONGODB_URI
mongodb+srv://daksh2singh34_db_user:1165yXLEmoXV3HZN@seemee.d8uqovf.mongodb.net/seemee?retryWrites=true&w=majority

JWT_SECRET
seemee_super_secret_jwt_key_2024_change_in_production_xyz123

PORT
5000

NODE_ENV
production

ADMIN_EMAIL
admin@seemee.com

ADMIN_PASSWORD
admin123
```

6. Click **"Deploy"**

7. Wait 2-3 minutes for deployment to complete

### Step 3: Test Your Deployment

Once deployed, you'll get a URL like: `https://see-mee-xyz.vercel.app`

Test these:
- ✅ Homepage loads
- ✅ Admin login at `/admin` works
- ✅ Can upload products with images
- ✅ Images display on frontend
- ✅ Collection page shows products

## Important Notes

### Image Storage
- Images are now stored as base64 in MongoDB
- Each product's images are stored with the product document
- No file system storage needed (perfect for Vercel)
- Images persist across deployments

### Admin Access
- URL: `https://your-app.vercel.app/admin`
- Email: `admin@seemee.com`
- Password: `admin123`

### API Routes
All API calls use relative URLs:
- `/api/auth/login`
- `/api/products`
- `/api/upload/images`
- etc.

## Troubleshooting

### "Failed to fetch" error on login
- Check browser console for actual error
- Verify environment variables are set in Vercel
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Images not showing
- Old products with file paths won't work
- Upload new products through admin panel
- Images will be stored as base64 in MongoDB

### Collection not showing
- Make sure products have `inCollection: true`
- Check products are active (`isActive: true`)
- Verify stock > 0

## Redeploy After Changes

If you make code changes:

```bash
git add .
git commit -m "Your changes"
git push origin master
```

Vercel will automatically redeploy when you push to master branch.

---

**Your app is ready to deploy!** 🎉
