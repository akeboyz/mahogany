@echo off
echo ====================================
echo Digital Signage System Installer
echo ====================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo.
    echo Please install Node.js first:
    echo 1. Go to https://nodejs.org/
    echo 2. Download LTS version
    echo 3. Install with default settings
    echo 4. Restart your computer
    echo 5. Run this script again
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
node --version
npm --version
echo.

:: Check if we're in the right directory
if not exist "package.json" (
    echo ❌ package.json not found!
    echo Make sure you're running this from the project directory
    pause
    exit /b 1
)

echo ✅ Found package.json
echo.

echo 📦 Installing dependencies...
echo This may take 2-3 minutes...
echo.
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    echo Try running: npm install --force
    pause
    exit /b 1
)

echo.
echo ✅ Dependencies installed successfully!
echo.

echo 🚀 Starting development server...
echo.
echo The server will start at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

:: Start the development server
npm run dev