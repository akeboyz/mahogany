@echo off
echo ========================================
echo Node.js Installer for Digital Signage
echo ========================================
echo.

echo Checking if Node.js is already installed...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js is already installed!
    node --version
    npm --version
    echo.
    echo You can now run: npm install
    pause
    exit /b 0
)

echo ❌ Node.js is not installed.
echo.
echo AUTOMATIC INSTALLATION OPTIONS:
echo.
echo 1. Download Node.js installer automatically
echo 2. Manual installation guide
echo 3. Exit
echo.
choice /c 123 /m "Choose option"

if errorlevel 3 exit /b 0
if errorlevel 2 goto manual
if errorlevel 1 goto automatic

:automatic
echo.
echo 📥 Opening Node.js download page...
start https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi
echo.
echo ⏳ AFTER THE DOWNLOAD:
echo 1. Find the .msi file in your Downloads folder
echo 2. Double-click to install
echo 3. Use default settings (keep "Add to PATH" checked)
echo 4. RESTART YOUR COMPUTER after installation
echo 5. Run this script again to verify
echo.
pause
exit /b 0

:manual
echo.
echo 📋 MANUAL INSTALLATION STEPS:
echo.
echo 1. Open browser and go to: https://nodejs.org/
echo 2. Click the LEFT green button (LTS version)
echo 3. Download will start automatically (.msi file)
echo 4. Go to Downloads folder and double-click the .msi file
echo 5. Install with default settings
echo 6. IMPORTANT: Keep "Add to PATH" checked
echo 7. RESTART YOUR COMPUTER after installation
echo 8. Open new PowerShell and test: node --version
echo.
echo After installation, run these commands:
echo   cd "%cd%"
echo   npm install
echo   npm run dev
echo.
pause
exit /b 0