# MongoDB Atlas Connection Fix

## Problem
Your MongoDB Atlas cluster is blocking connections because your current IP address is not whitelisted.

## Solution - Add Your IP to MongoDB Atlas

### Step 1: Login to MongoDB Atlas
1. Go to https://cloud.mongodb.com/
2. Login with your credentials

### Step 2: Whitelist Your IP Address
1. Click on "Network Access" in the left sidebar
2. Click "Add IP Address" button
3. Choose one of these options:
   
   **Option A: Add Current IP (Recommended for development)**
   - Click "Add Current IP Address"
   - Click "Confirm"
   
   **Option B: Allow Access from Anywhere (Less secure, but works everywhere)**
   - Enter IP: `0.0.0.0/0`
   - Description: "Allow all IPs"
   - Click "Confirm"

4. Wait 1-2 minutes for the changes to take effect

### Step 3: Start the Backend Server
After whitelisting your IP, run:

```bash
cd server
npm start
```

The server should now connect successfully to MongoDB.

### Step 4: Create Admin User
Once the server is running, open a NEW terminal and run:

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

### Step 5: Login to Admin Panel
1. Open http://localhost:5173/admin in your browser
2. Login with:
   - Email: `admin@seemee.com`
   - Password: `admin123`

### Step 6: Test Image Upload
1. Go to Products Manager
2. Try uploading a product with an image
3. The 401 error should be gone!

## Quick Commands

### Start Backend (from project root):
```bash
cd server
npm start
```

### Start Frontend (from project root):
```bash
npm run dev
```

### Start Admin Panel (from project root):
```bash
cd admin
npm run dev
```

## Troubleshooting

### If you still get connection errors:
1. Check your MongoDB Atlas cluster is not paused
2. Verify the connection string in `server/.env` is correct
3. Make sure you waited 1-2 minutes after adding the IP
4. Try restarting your computer (sometimes DNS cache needs clearing)

### If admin login still fails:
1. Make sure the backend server is running (check http://localhost:5000/api/auth/me)
2. Check browser console for errors (F12)
3. Clear localStorage: `localStorage.clear()` in browser console
4. Try creating admin user again

### If 401 errors persist:
1. Open browser DevTools (F12)
2. Go to Application tab → Local Storage
3. Check if `adminToken` exists
4. If not, login again
5. If yes, the token might be expired - clear it and login again
