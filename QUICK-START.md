# Quick Start Guide - Fix 401 Error

## The Problem
You're getting a 401 error when uploading images because:
1. MongoDB Atlas is blocking your IP address
2. Admin user doesn't exist in the database yet
3. You can't login without the admin user

## The Solution (3 Steps)

### Step 1: Whitelist Your IP in MongoDB Atlas (REQUIRED)

**This is the most important step!**

1. Go to https://cloud.mongodb.com/
2. Login with your credentials
3. Click "Network Access" in the left sidebar
4. Click "Add IP Address" button
5. Choose ONE option:
   - **Option A**: Click "Add Current IP Address" (recommended)
   - **Option B**: Enter `0.0.0.0/0` to allow all IPs (less secure)
6. Click "Confirm"
7. **WAIT 1-2 MINUTES** for changes to take effect

### Step 2: Create Admin User

After whitelisting your IP and waiting 1-2 minutes:

**Option A: Use the batch file (easiest)**
```
Double-click: FIX-AND-START.bat
```

**Option B: Manual commands**
```bash
cd server
node scripts/createAdmin.js
```

You should see:
```
✅ Admin user created successfully
Email: admin@seemee.com
Password: admin123
```

### Step 3: Start Everything

**Option A: Use the batch file**
```
The FIX-AND-START.bat file will start everything automatically
```

**Option B: Manual start (3 separate terminals)**

Terminal 1 - Backend:
```bash
cd server
npm start
```

Terminal 2 - Frontend:
```bash
npm run dev
```

Terminal 3 - Admin Panel:
```bash
cd admin
npm run dev
```

### Step 4: Login and Test

1. Open http://localhost:5174/admin
2. Login with:
   - Email: `admin@seemee.com`
   - Password: `admin123`
3. Go to "Products Manager"
4. Try uploading a product with images
5. The 401 error should be GONE! ✅

## Troubleshooting

### "MongooseServerSelectionError" or "Could not connect"
- You didn't whitelist your IP in MongoDB Atlas
- OR you didn't wait 1-2 minutes after whitelisting
- Solution: Go back to Step 1

### "Admin user already exists"
- Good! The admin user is already created
- Just start the servers (Step 3) and login (Step 4)

### "Invalid credentials" when logging in
- Make sure you're using: admin@seemee.com / admin123
- Check if there are any typos
- Clear browser localStorage: Open DevTools (F12) → Console → Type: `localStorage.clear()`
- Try logging in again

### Still getting 401 error after login
- Open browser DevTools (F12)
- Go to Application tab → Local Storage → http://localhost:5174
- Check if `adminToken` exists
- If not, login again
- If yes but still 401, the token format might be wrong - check the AdminLogin.jsx fix was applied

### Backend won't start - "EADDRINUSE"
- Port 5000 is already in use
- Kill the process:
  ```bash
  netstat -ano | findstr :5000
  taskkill /PID [PID_NUMBER] /F
  ```
- Then start backend again

## What Was Fixed

1. **AdminLogin.jsx**: Changed response structure from `data.data` to `data.user` and `data.token` to match backend
2. **ProductsManager.jsx**: Already has proper error handling for 401 errors
3. **Upload route**: Already has proper authentication middleware
4. **Auth route**: Already returns correct structure

## Files You Can Check

- `admin/src/pages/AdminLogin.jsx` - Login component (FIXED)
- `server/routes/auth.js` - Login endpoint
- `server/routes/upload.js` - Upload endpoint with auth
- `server/middleware/auth.js` - Authentication middleware
- `server/.env` - Contains admin credentials

## Need More Help?

Read the detailed guide: `MONGODB-FIX-GUIDE.md`
