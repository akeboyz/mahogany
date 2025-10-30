# 🚀 Netlify Deployment Guide - Digital Signage System

## 📁 Ready for Deployment
Your digital signage system is now prepared for Netlify deployment in the `netlify-deploy/` folder.

## 🎯 Quick Deployment Steps

### Method 1: Drag & Drop (Easiest)
1. **Go to [netlify.com](https://netlify.com)** and sign up/login
2. **Drag the entire `netlify-deploy` folder** to the Netlify dashboard
3. **Wait for deployment** - You'll get a URL like `https://amazing-name-123456.netlify.app`
4. **Test your site** using the provided URL

### Method 2: Git Repository
1. **Create new GitHub repository** for your project
2. **Copy `netlify-deploy` contents** to repository root
3. **Connect repository to Netlify** via their dashboard
4. **Auto-deploy** on every commit

## 🔗 Site URLs After Deployment
Once deployed, your signage system will be accessible at:

- **Main Menu**: `https://yoursite.netlify.app/menu.html?project_id=prj001`
- **Signage Player**: `https://yoursite.netlify.app/ann/signage.html?project_id=prj001`
- **Category Browse**: `https://yoursite.netlify.app/category.html?type=dining&project_id=prj001`
- **Product Details**: `https://yoursite.netlify.app/product.html?type=restaurant&id=rest001&project_id=prj001`

## ⚙️ Configuration Included

### netlify.toml
- ✅ **Static site config** - No build process needed
- ✅ **Caching headers** for optimal performance
- ✅ **Security headers** for safe iframe usage
- ✅ **Default redirects** from `/` to `/menu.html`

### _redirects
- ✅ **SPA routing** for missing pages
- ✅ **Legacy file redirects** (old signage files)
- ✅ **Friendly URLs** for common routes

## 📱 Mobile/Tablet Optimization

Your deployed site includes:
- ✅ **9:16 aspect ratio** for portrait displays
- ✅ **Touch-friendly interface** with proper hit targets
- ✅ **Auto-return timers** for kiosk mode
- ✅ **Offline QR codes** for location navigation
- ✅ **PWA manifest** for app-like experience

## 🎯 Testing Your Deployed Site

### For Each Project:
1. **Project 1**: `?project_id=prj001` (Mahogany Residences)
2. **Project 2**: `?project_id=prj002` (Green Valley Estate)
3. **Project 3**: `?project_id=prj003` (Urban Plaza Complex)

### Key Features to Test:
- ✅ **Menu navigation** to categories
- ✅ **Category filtering** and item display
- ✅ **Product details** with image gallery
- ✅ **QR codes** in map popups
- ✅ **Auto-return timers** (60 seconds)
- ✅ **Signage video cycling** with overlays

## 🔧 Post-Deployment Tasks

### Update Your URLs:
1. **QR codes** - Regenerate with Netlify URL for physical displays
2. **Kiosk settings** - Point to your Netlify URL
3. **Documentation** - Update any references to localhost

### Monitoring:
- **Check Netlify Analytics** for visitor stats
- **Monitor performance** via Netlify dashboard
- **Update content** by re-uploading JSON files

## 🎨 Customization After Deploy

### Easy Updates:
1. **Content**: Edit JSON files in `/data/` folder
2. **Images**: Replace files in `/images/` folder
3. **Videos**: Replace files in `/medias/` folder
4. **Branding**: Update logos in `/logos/` folder

### Re-deploy Process:
1. Make changes locally
2. Copy updated files to `netlify-deploy/`
3. Either drag-drop again or push to Git (auto-deploys)

## 🚨 Important Notes

### File Sizes:
- **Large videos** may slow initial load
- **Consider CDN** for video hosting if needed
- **Optimize images** for web if experiencing slow loads

### Browser Compatibility:
- ✅ **Modern browsers** fully supported
- ✅ **iOS Safari** and **Chrome Android** tested
- ✅ **Kiosk browsers** should work fine

### Security:
- ✅ **HTTPS enabled** automatically by Netlify
- ✅ **Headers configured** for iframe security
- ✅ **No sensitive data** exposed in static files

---

## 🎉 Ready to Deploy!

Your complete digital signage system is ready. Just drag the `netlify-deploy` folder to Netlify and you'll have a professional, mobile-optimized signage system live on the web!

**Deployment folder location**: `C:\Users\Lenovo\OneDrive - MBK Group\Documents\Visual\netlify-deploy\`

Good luck! 🚀