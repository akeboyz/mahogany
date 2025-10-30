@echo off
echo ====================================
echo Testing Node.js Installation
echo ====================================
echo.

echo Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo.
    echo ❌ Node.js is NOT installed!
    echo.
    echo Please install Node.js:
    echo 1. Go to https://nodejs.org/
    echo 2. Download LTS version
    echo 3. Install with default settings
    echo 4. Restart your computer
    echo 5. Run this test again
    echo.
) else (
    echo ✅ Node.js is installed!
    echo.
    
    echo Checking npm...
    npm --version
    if %errorlevel% neq 0 (
        echo ❌ npm is NOT working!
    ) else (
        echo ✅ npm is working!
        echo.
        echo 🎉 SUCCESS! Node.js and npm are ready!
        echo.
        echo You can now run:
        echo   npm install
        echo   npm run dev
        echo.
    )
)

pause