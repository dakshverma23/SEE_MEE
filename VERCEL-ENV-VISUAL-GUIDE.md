# 📸 Vercel Environment Variables - Visual Guide

## What You Need to Do

Your errors are happening because **environment variables are NOT set in Vercel**.

Here's EXACTLY what your Vercel dashboard should look like:

---

## Step 1: Navigate to Environment Variables

```
1. Go to: https://vercel.com/dashboard
2. Click your project name
3. Click "Settings" tab at the top
4. Click "Environment Variables" in the left sidebar
```

---

## Step 2: What You Should See

After adding all variables, your page should look like this:

```
╔════════════════════════════════════════════════════════════════════════════╗
║                        Environment Variables                                ║
╠════════════════════════════════════════════════════════════════════════════╣
║                                                                             ║
║  Environment variables are encrypted and stored securely.                  ║
║                                                                             ║
║  ┌──────────────────────────────────────────────────────────────────────┐ ║
║  │                                                                       │ ║
║  │  MONGODB_URI                                                         │ ║
║  │  mongodb+srv://daksh2singh34_db_user:••••••••••••••••••••••••••••   │ ║
║  │  Production, Preview, Development                        [Edit] [×]  │ ║
║  │                                                                       │ ║
║  └──────────────────────────────────────────────────────────────────────┘ ║
║                                                                             ║
║  ┌──────────────────────────────────────────────────────────────────────┐ ║
║  │                                                                       │ ║
║  │  JWT_SECRET                                                          │ ║
║  │  seemee_super_secret_jwt_key_2024_change_in_production_xyz123       │ ║
║  │  Production, Preview, Development                        [Edit] [×]  │ ║
║  │                                                                       │ ║
║  └──────────────────────────────────────────────────────────────────────┘ ║
║                                                                             ║
║  ┌──────────────────────────────────────────────────────────────────────┐ ║
║  │                                                                       │ ║
║  │  NODE_ENV                                                            │ ║
║  │  production                                                          │ ║
║  │  Production                                              [Edit] [×]  │ ║
║  │                                                                       │ ║
║  └──────────────────────────────────────────────────────────────────────┘ ║
║                                                                             ║
║  ┌──────────────────────────────────────────────────────────────────────┐ ║
║  │                                                                       │ ║
║  │  ADMIN_EMAIL                                                         │ ║
║  │  admin@seemee.com                                                    │ ║
║  │  Production, Preview, Development                        [Edit] [×]  │ ║
║  │                                                                       │ ║
║  └──────────────────────────────────────────────────────────────────────┘ ║
║                                                                             ║
║  ┌──────────────────────────────────────────────────────────────────────┐ ║
║  │                                                                       │ ║
║  │  ADMIN_PASSWORD                                                      │ ║
║  │  admin123                                                            │ ║
║  │  Production, Preview, Development                        [Edit] [×]  │ ║
║  │                                                                       │ ║
║  └──────────────────────────────────────────────────────────────────────┘ ║
║                                                                             ║
║                                                          [+ Add New]        ║
║                                                                             ║
╚════════════════════════════════════════════════════════════════════════════╝
```

---

## Step 3: How to Add Each Variable

Click the **"+ Add New"** button and fill in:

### Variable 1: MONGODB_URI

```
┌─────────────────────────────────────────────────────────────┐
│ Add Environment Variable                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Key                                                         │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ MONGODB_URI                                             ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Value                                                       │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ mongodb+srv://daksh2singh34_db_user:1165yXLEmoXV3HZN@  ││
│ │ seemee.d8uqovf.mongodb.net/seemee?retryWrites=true&w=   ││
│ │ majority                                                ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Environments                                                │
│ ☑ Production    ☑ Preview    ☑ Development                │
│                                                             │
│                                      [Cancel]  [Save]       │
└─────────────────────────────────────────────────────────────┘
```

**IMPORTANT:** Copy the FULL MongoDB URI in ONE LINE:
```
mongodb+srv://daksh2singh34_db_user:1165yXLEmoXV3HZN@seemee.d8uqovf.mongodb.net/seemee?retryWrites=true&w=majority
```

### Variable 2: JWT_SECRET

```
┌─────────────────────────────────────────────────────────────┐
│ Add Environment Variable                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Key                                                         │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ JWT_SECRET                                              ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Value                                                       │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ seemee_super_secret_jwt_key_2024_change_in_production_  ││
│ │ xyz123                                                  ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Environments                                                │
│ ☑ Production    ☑ Preview    ☑ Development                │
│                                                             │
│                                      [Cancel]  [Save]       │
└─────────────────────────────────────────────────────────────┘
```

Copy this EXACTLY:
```
seemee_super_secret_jwt_key_2024_change_in_production_xyz123
```

### Variable 3: NODE_ENV

```
┌─────────────────────────────────────────────────────────────┐
│ Add Environment Variable                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Key                                                         │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ NODE_ENV                                                ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Value                                                       │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ production                                              ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Environments                                                │
│ ☑ Production    ☐ Preview    ☐ Development                │
│                                                             │
│                                      [Cancel]  [Save]       │
└─────────────────────────────────────────────────────────────┘
```

Copy this:
```
production
```

### Variable 4: ADMIN_EMAIL

```
┌─────────────────────────────────────────────────────────────┐
│ Add Environment Variable                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Key                                                         │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ ADMIN_EMAIL                                             ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Value                                                       │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ admin@seemee.com                                        ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Environments                                                │
│ ☑ Production    ☑ Preview    ☑ Development                │
│                                                             │
│                                      [Cancel]  [Save]       │
└─────────────────────────────────────────────────────────────┘
```

Copy this:
```
admin@seemee.com
```

### Variable 5: ADMIN_PASSWORD

```
┌─────────────────────────────────────────────────────────────┐
│ Add Environment Variable                                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Key                                                         │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ ADMIN_PASSWORD                                          ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Value                                                       │
│ ┌─────────────────────────────────────────────────────────┐│
│ │ admin123                                                ││
│ └─────────────────────────────────────────────────────────┘│
│                                                             │
│ Environments                                                │
│ ☑ Production    ☑ Preview    ☑ Development                │
│                                                             │
│                                      [Cancel]  [Save]       │
└─────────────────────────────────────────────────────────────┘
```

Copy this:
```
admin123
```

---

## Step 4: After Adding All Variables

### Verify They're Saved

You should see 5 variables listed:

```
✅ MONGODB_URI       (Production, Preview, Development)
✅ JWT_SECRET        (Production, Preview, Development)
✅ NODE_ENV          (Production)
✅ ADMIN_EMAIL       (Production, Preview, Development)
✅ ADMIN_PASSWORD    (Production, Preview, Development)
```

### Redeploy

1. Click **"Deployments"** tab at the top
2. Find your latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Check **"Use existing Build Cache"**
6. Click **"Redeploy"** button
7. Wait 2-3 minutes

---

## Step 5: Test It Works

### Test 1: Open Health Check

Open this URL in your browser:
```
https://see-mee-beta.vercel.app/api/health
```

You should see:
```json
{
  "success": true,
  "message": "Server is running",
  "mongodb": "connected"
}
```

### Test 2: Try Login

1. Go to: https://see-mee-beta.vercel.app/admin/login
2. Enter:
   - Email: `admin@seemee.com`
   - Password: `admin123`
3. Click Login
4. Should redirect to dashboard

---

## Common Mistakes

### ❌ Mistake 1: Typo in Variable Name
```
MONGODB_URL  ← WRONG (should be MONGODB_URI)
MONGODB_URI  ← CORRECT
```

### ❌ Mistake 2: Extra Spaces
```
" mongodb+srv://..."  ← WRONG (space at start)
"mongodb+srv://..."   ← CORRECT (no spaces)
```

### ❌ Mistake 3: Wrong Environment Selected
```
☐ Production  ← WRONG (not checked)
☑ Production  ← CORRECT (checked)
```

### ❌ Mistake 4: Forgot to Redeploy
```
Added variables → Didn't redeploy → Still getting errors
Added variables → Redeployed → Works! ✅
```

---

## Quick Copy-Paste Values

Just copy these and paste into Vercel:

```
MONGODB_URI
mongodb+srv://daksh2singh34_db_user:1165yXLEmoXV3HZN@seemee.d8uqovf.mongodb.net/seemee?retryWrites=true&w=majority

JWT_SECRET
seemee_super_secret_jwt_key_2024_change_in_production_xyz123

NODE_ENV
production

ADMIN_EMAIL
admin@seemee.com

ADMIN_PASSWORD
admin123
```

---

## Summary

1. ✅ Go to Vercel → Settings → Environment Variables
2. ✅ Add all 5 variables (copy-paste from above)
3. ✅ Check correct environments for each
4. ✅ Click Save for each one
5. ✅ Redeploy from Deployments tab
6. ✅ Wait 2-3 minutes
7. ✅ Test /api/health endpoint
8. ✅ Try logging in

That's it! Your site will work after this. 🚀
