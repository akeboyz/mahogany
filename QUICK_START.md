# 🚀 Quick Start Guide

## STEP 1: Install Dependencies
```bash
npm install
```

## STEP 2: Start the Server
```bash
npm run dev
```

## STEP 3: Open in Browser
- **Home**: http://localhost:3000
- **Player**: http://localhost:3000/player?device=NRF-26-L1-01  
- **Admin**: http://localhost:3000/admin

## ✅ SUCCESS!
If you can see the homepage with buttons, the server is working correctly!

## 🔧 If Server Won't Start:

### Check Node.js Version
```bash
node --version
# Should be 18.0.0 or higher
```

### Clean Install
```bash
rm -rf node_modules package-lock.json
npm install
```

### Try Different Port
```bash
npx next dev --port 3001
```

### Manual Start
```bash
npx next dev
```

## ❌ Common Errors:

**"Module not found"** → Run `npm install`
**"Port 3000 in use"** → Use `--port 3001`
**"Permission denied"** → Run as administrator
**"Firebase error"** → Ignore for now, demo works without Firebase

## 🎯 Test the Demo:
1. Go to http://localhost:3000
2. Click "Open Player"
3. Click "Touch for Main Menu" 
4. Try the menu options

That's it! The basic system should be working now.