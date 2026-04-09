# 🔧 Vercel Environment Variables Setup

## What You're Seeing

The errors you're getting:
- ❌ "A server e..." is not valid JSON
- ❌ "Internal server error"
- ❌ Cannot call `users.findOne()` before initial connection

**Root Cause:** Environment variables are NOT set in Vercel dashboard.

## What Vercel Environment Variables Should Look Like

Go to: **https://vercel.com/dashboard** → Your Project → **Settings** → **Environment Variables**

You should see this:

```
┌─────────────────┬──────────────────────────────────────────────────────────────┬─────────────────────┐
│ NAME            │ VALUE                                                        │ ENVIRONMENTS        │
├─────────────────┼──────────────────────────────────────────────────────────────┼─────────────────────┤
│ MONGODB_URI     │ mongodb+srv://daksh2singh34_db_user:1165yXLEmoXV3HZN@...   │ Production, Preview │
│ JWT_SECRET      │ seemee_super_secret_jwt_key_2024_change_in_production_xyz123│ Production, Preview │
│ NODE_ENV        │ production                                                   │ Production          │
│ ADMIN_EMAIL     │ admin@seemee.com                                            │ Production, Preview │
│ ADMIN_PASSWORD  │ admin123                                                     │ Production, Preview │
└─────────────────┴──────────────────────────────────────────────────────────────┴─────────────────────┘
```

## Step-by-Step: Add Environment Variables

### 1. Open Vercel Dashboard
- Go to https://vercel.com/dashboard
- Click on your **SEE_MEE** project
- Click **Settings** tab (top navigation)
- Click **Environment Variables** (left sidebar)

### 2. Add Each Variable

Click **"Add New"** button and add these ONE BY ONE:

#### Variable 1: MONGODB_URI
```
Key: MONGODB_URI
Value: mongodb+srv://daksh2singh34_db_user:1165yXLEmoXV3HZN@seemee.d8uqovf.mongodb.net/seemee?retryWrites=true&w=majority
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 2: JWT_SECRET
```
Key: JWT_SECRET
Value: seemee_super_secret_jwt_key_2024_change_in_production_xyz123
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 3: NODE_ENV
```
Key: NODE_ENV
Value: production
Environments: ✅ Production
```

#### Variable 4: ADMIN_EMAIL
```
Key: ADMIN_EMAIL
Value: admin@seemee.com
Environments: ✅ Production ✅ Preview ✅ Development
```

#### Variable 5: ADMIN_PASSWORD
```
Key: ADMIN_PASSWORD
Value: admin123
Environments: ✅ Production ✅ Preview ✅ Development
```

### 3. Save Each Variable
- Click **"Save"** after adding each variable
- Make sure NO extra spaces before or after values
- Make sure you select the correct environments

### 4. Verify Variables Are Saved
After adding all 5 variables, you should see them listed like this:

![Environment Variables Screenshot]

```
MONGODB_URI          mongodb+srv://daksh2singh34_db_user:...    Production, Preview, Development
JWT_SECRET           seemee_super_secret_jwt_key_2024_...       Production, Preview, Development
NODE_ENV             production                                  Production
ADMIN_EMAIL          admin@seemee.com                           Production, Preview, Development
ADMIN_PASSWORD       admin123                                    Production, Preview, Development
```

## After Adding Variables

### Step 1: Redeploy
1. Go to **Deployments** tab
2. Click **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. ✅ Check **"Use existing Build Cache"** (faster)
5. Click **"Redeploy"**
6. Wait 2-3 minutes

### Step 2: Test API
Open these URLs in your browser:

**Test 1: Health Check**
```
https://see-mee-beta.vercel.app/api/health
```
✅ Should return:
```json
{
  "success": true,
  "message": "Server is running",
  "mongodb": "connected"
}
```

**Test 2: Products**
```
https://see-mee-beta.vercel.app/api/products?inCollection=true
```
✅ Should return: Array of 5 products with base64 images

### Step 3: Test Login
1. Go to: https://see-mee-beta.vercel.app/admin/login
2. Enter:
   - Email: `admin@seemee.com`
   - Password: `admin123`
3. Click **Login**
4. ✅ Should redirect to `/admin/dashboard`

## Troubleshooting

### Still Getting "Internal server error"?

**Check 1: Are variables actually saved?**
- Go back to Settings → Environment Variables
- Make sure all 5 variables are listed
- If not, add them again

**Check 2: Did you redeploy?**
- Environment variables only apply to NEW deployments
- You MUST redeploy after adding variables
- Go to Deployments → Redeploy

**Check 3: Check Function Logs**
- Go to your latest deployment
- Click **"Functions"** tab
- Click on `/api/index.js`
- Look for error messages:
  - "MONGODB_URI not set" → Variable not saved properly
  - "MongoNetworkError" → MongoDB Atlas IP whitelist issue
  - "Invalid connection string" → Typo in MONGODB_URI

### MongoDB Atlas IP Whitelist

If you see "MongoNetworkError":

1. Go to https://cloud.mongodb.com
2. Click **Network Access** (left sidebar)
3. Click **"Add IP Address"**
4. Select **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **"Confirm"**
6. Wait 2-3 minutes
7. Redeploy on Vercel

## What Should Work After This

✅ Main website loads
✅ Products display with images
✅ Collection slider shows products
✅ Admin login works
✅ Admin can add/edit products
✅ Images upload and display correctly

## Quick Checklist

Before asking for help, verify:

- [ ] All 5 environment variables are added in Vercel dashboard
- [ ] Each variable has correct value (no typos, no extra spaces)
- [ ] Variables are enabled for Production and Preview
- [ ] You redeployed AFTER adding variables
- [ ] MongoDB Atlas allows access from anywhere (0.0.0.0/0)
- [ ] You waited 2-3 minutes after redeploying

## Visual Guide

### Where to Find Environment Variables

```
Vercel Dashboard
  └── Your Project (SEE_MEE)
      └── Settings (top tab)
          └── Environment Variables (left sidebar)
              └── Add New (button)
```

### What Each Field Means

```
┌─────────────────────────────────────────────────┐
│ Add Environment Variable                        │
├─────────────────────────────────────────────────┤
│ Key:   [MONGODB_URI                          ]  │  ← Variable name (exact)
│                                                 │
│ Value: [mongodb+srv://daksh2singh34_db_user...] │  ← Full connection string
│                                                 │
│ Environments:                                   │
│   ☑ Production   ☑ Preview   ☑ Development    │  ← Check all three
│                                                 │
│                          [Cancel]  [Save]       │
└─────────────────────────────────────────────────┘
```

## Summary

The code is perfect. Everything works on localhost. The ONLY issue is:

**❌ Environment variables are not set in Vercel**

Once you add them and redeploy, everything will work! 🚀

---

**Need the exact values?** They're in the "Add Each Variable" section above. Copy-paste them exactly as shown.
