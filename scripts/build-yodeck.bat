@echo off
echo Building Yodeck package...
node build-yodeck.js
if %errorlevel% equ 0 (
    echo.
    echo ✅ Yodeck package built successfully!
    echo 📦 File: yodeck-signage-package.zip
    echo 🚀 Ready to upload to Yodeck platform
) else (
    echo ❌ Build failed!
)
pause