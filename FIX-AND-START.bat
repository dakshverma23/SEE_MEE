@echo off
echo ========================================
echo See Mee - Complete Fix and Start Script
echo ========================================
echo.

echo STEP 1: MongoDB Atlas IP Whitelist
echo ------------------------------------
echo IMPORTANT: Before continuing, you MUST whitelist your IP in MongoDB Atlas:
echo.
echo 1. Go to: https://cloud.mongodb.com/
echo 2. Login with your credentials
echo 3. Click "Network Access" in left sidebar
echo 4. Click "Add IP Address"
echo 5. Click "Add Current IP Address" OR enter 0.0.0.0/0 for all IPs
echo 6. Click "Confirm"
echo 7. Wait 1-2 minutes for changes to take effect
echo.
pause

echo.
echo STEP 2: Creating Admin User
echo ----------------------------
cd server
echo Running createAdmin script...
node scripts/createAdmin.js
echo.

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ❌ Failed to create admin user!
    echo.
    echo Possible reasons:
    echo - MongoDB Atlas IP not whitelisted yet (wait 1-2 minutes)
    echo - Internet connection issue
    echo - MongoDB Atlas cluster is paused
    echo.
    echo Please fix the issue and run this script again.
    pause
    exit /b 1
)

echo.
echo ✅ Admin user created successfully!
echo.
echo Admin Credentials:
echo Email: admin@seemee.com
echo Password: admin123
echo.
echo STEP 3: Starting Backend Server
echo --------------------------------
echo Starting backend on http://localhost:5000
echo.
start cmd /k "cd /d %CD% && npm start"

timeout /t 3 /nobreak >nul

cd ..

echo.
echo STEP 4: Starting Frontend
echo --------------------------
echo Starting frontend on http://localhost:5173
echo.
start cmd /k "npm run dev"

timeout /t 2 /nobreak >nul

echo.
echo STEP 5: Starting Admin Panel
echo -----------------------------
echo Starting admin panel on http://localhost:5174
echo.
cd admin
start cmd /k "cd /d %CD% && npm run dev"

cd ..

echo.
echo ========================================
echo ✅ ALL SERVERS STARTED!
echo ========================================
echo.
echo Three terminal windows have been opened:
echo 1. Backend Server (port 5000)
echo 2. Frontend (port 5173)
echo 3. Admin Panel (port 5174)
echo.
echo Next Steps:
echo -----------
echo 1. Wait 10 seconds for all servers to start
echo 2. Open browser: http://localhost:5174/admin
echo 3. Login with:
echo    Email: admin@seemee.com
echo    Password: admin123
echo 4. Go to Products Manager
echo 5. Upload products with images
echo.
echo Troubleshooting:
echo ----------------
echo - If login fails: Check browser console (F12)
echo - If 401 error: Make sure you logged in first
echo - If connection error: Check if backend is running
echo.
echo Read MONGODB-FIX-GUIDE.md for detailed help
echo.
pause
