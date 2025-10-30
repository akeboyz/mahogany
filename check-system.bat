@echo off
echo ====================================
echo System Check for Digital Signage
echo ====================================
echo.

echo 🔍 Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js: NOT INSTALLED
    echo    Download from: https://nodejs.org/
) else (
    echo ✅ Node.js: INSTALLED
    node --version
)
echo.

echo 🔍 Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm: NOT INSTALLED
    echo    Should come with Node.js
) else (
    echo ✅ npm: INSTALLED  
    npm --version
)
echo.

echo 🔍 Checking project files...
if exist "package.json" (
    echo ✅ package.json: FOUND
) else (
    echo ❌ package.json: NOT FOUND
    echo    Make sure you're in the project directory
)

if exist "app" (
    echo ✅ app folder: FOUND
) else (
    echo ❌ app folder: NOT FOUND
)

if exist "lib" (
    echo ✅ lib folder: FOUND
) else (
    echo ❌ lib folder: NOT FOUND
)
echo.

echo 🔍 Checking dependencies...
if exist "node_modules" (
    echo ✅ node_modules: FOUND (dependencies installed)
) else (
    echo ❌ node_modules: NOT FOUND
    echo    Run: npm install
)
echo.

echo 🔍 Checking port 3000...
netstat -an | find ":3000" >nul 2>&1
if %errorlevel% equ 0 (
    echo ⚠️  Port 3000: IN USE
    echo    Stop other servers or use different port
) else (
    echo ✅ Port 3000: AVAILABLE
)
echo.

echo 🔍 System Information...
echo OS Version: 
ver
echo.

echo Current Directory:
cd
echo.

echo ====================================
echo Next Steps:
echo 1. Install Node.js (if not installed)
echo 2. Run: npm install (if node_modules missing)
echo 3. Run: npm run dev (to start server)
echo 4. Open: http://localhost:3000
echo ====================================
echo.
pause