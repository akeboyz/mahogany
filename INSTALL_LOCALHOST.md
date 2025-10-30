# 🚀 Complete Localhost Installation Guide

## STEP 1: Install Node.js and npm

### Download and Install Node.js
1. **Go to:** https://nodejs.org/
2. **Download:** LTS version (Long Term Support) - currently v20.x
3. **Choose:** Windows Installer (.msi) 64-bit
4. **Run the installer:**
   - Double-click the `.msi` file
   - Click "Next" through all steps
   - ✅ Make sure "Add to PATH" is checked
   - ✅ Install "npm package manager"
   - ✅ Install "Node.js runtime"
   - Click "Install"

5. **Restart your computer** (important!)

### Verify Installation
Open **PowerShell** (search "PowerShell" in Start menu) and run:
```bash
node --version
npm --version
```

You should see version numbers like:
```
v20.11.0
10.2.4
```

## STEP 2: Navigate to Project Folder

In PowerShell, run:
```bash
cd "C:\Users\Lenovo\OneDrive - MBK Group\Documents\Visual"
```

Verify you're in the right folder:
```bash
dir
```
You should see files like `package.json`, `README.md`, etc.

## STEP 3: Install Project Dependencies

Run this command (it will take 2-3 minutes):
```bash
npm install
```

You should see something like:
```
added 324 packages in 45s
```

## STEP 4: Start the Development Server

Run:
```bash
npm run dev
```

You should see:
```
▲ Next.js 14.2.5
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.1s
```

## STEP 5: Test in Browser

Open your web browser and go to:

### 🏠 Homepage
**URL:** http://localhost:3000

You should see:
- "Digital Signage System" title
- "Interactive Kiosk MVP" subtitle  
- Blue "Open Player" button
- Green "Admin Panel" button
- "Server is running! ✅" status

### 🖥️ Player (Kiosk Demo)
**URL:** http://localhost:3000/player?device=NRF-26-L1-01

You should see:
- Full-screen black interface
- "Digital Signage Player" with device ID
- "Touch for Main Menu" button
- Live status indicator in bottom-left

**Test the interaction:**
1. Click "Touch for Main Menu"
2. Try clicking "Dine", "Marketplace", "Property"
3. Use the back buttons to navigate

### ⚙️ Admin Panel  
**URL:** http://localhost:3000/admin

You should see:
- Admin dashboard with 4 cards (Devices, Playlists, Shops, Property)
- System status indicators
- Setup instructions

### 🩺 Health Check
**URL:** http://localhost:3000/api/health

You should see JSON response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "server": "Next.js 14",
  "message": "Digital Signage System is running!"
}
```

## ✅ SUCCESS CHECKLIST

- [ ] Node.js installed (`node --version` works)
- [ ] npm installed (`npm --version` works)  
- [ ] Project dependencies installed (`npm install` completed)
- [ ] Server starts (`npm run dev` shows "Ready")
- [ ] Homepage loads at http://localhost:3000
- [ ] Player demo works at http://localhost:3000/player?device=NRF-26-L1-01
- [ ] Admin panel loads at http://localhost:3000/admin
- [ ] Health API responds at http://localhost:3000/api/health

## 🆘 TROUBLESHOOTING

### Issue: "npm is not recognized"
**Solution:** Node.js is not installed properly
1. Reinstall Node.js from https://nodejs.org/
2. Restart computer
3. Try again

### Issue: "Cannot find module" errors
**Solution:** Dependencies not installed
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Port 3000 already in use"
**Solution:** Use different port
```bash
npm run dev -- --port 3001
```
Then visit http://localhost:3001

### Issue: PowerShell execution policy error
**Solution:** Run as Administrator
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: Firewall blocking Node.js
**Solution:** Allow Node.js through Windows Firewall when prompted

### Issue: Server starts but pages don't load
**Solution:** Wait a bit longer, then refresh browser
- Server needs 30-60 seconds to fully compile
- Look for "✓ Compiled" message in PowerShell

## 🎯 WHAT'S WORKING

After successful installation, you'll have:

### ✅ Demo Features
- **Interactive Player:** Full-screen kiosk simulation
- **Main Menu:** Touch-friendly navigation  
- **Admin Dashboard:** System overview and status
- **API Endpoints:** Health checks and system info
- **Responsive Design:** Works on desktop and mobile

### ✅ Technical Features  
- **Next.js 14:** Modern React framework
- **TypeScript:** Type-safe development
- **TailwindCSS:** Utility-first styling
- **PWA Ready:** Progressive Web App capabilities
- **Hot Reload:** Changes update instantly

### 🔮 Coming Next (After Firebase Setup)
- Real video playback with HLS streaming
- Database integration with Firestore
- Order management system
- Property lead capture
- Analytics tracking
- Offline caching

## 🚀 QUICK START COMMANDS

```bash
# Check if Node.js is installed
node --version

# Navigate to project
cd "C:\Users\Lenovo\OneDrive - MBK Group\Documents\Visual"

# Install dependencies (first time only)
npm install

# Start development server
npm run dev

# Open in browser
start http://localhost:3000
```

## 📞 NEED HELP?

If you get stuck:
1. Copy the error message
2. Check the troubleshooting section above
3. Try restarting PowerShell
4. Try restarting your computer
5. Ask for help with the specific error message

**The system should be working perfectly on localhost once these steps are complete!**