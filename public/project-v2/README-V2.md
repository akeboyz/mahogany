# Project V2 - Improved Asset Management

## 🎯 What's Different

### **Original Problem:**
```javascript
// Multiple inconsistent path patterns
"project_logo": "medias/prj001_logo.png"     // relative
"file_name": "/ann/medias/unit001-01.mp4"    // absolute
"main_menu_video": "videos/main_menu.mp4"    // different folder

// Multiple resolver functions causing bugs
resolveMediaSrc()
resolveAssetPath()
buildDetailUrl()
```

### **V2 Solution:**
```javascript
// Clean JSON - filenames only
"project_logo": "prj001_logo.png"
"file_name": "unit001-01.mp4"
"main_menu_video": "main_menu.mp4"

// One universal function
asset('prj001_logo.png', 'logo')  // → /project-v2/assets/medias/prj001_logo.png
```

## 🗂️ New File Structure

```
/project-v2/
├── assets/
│   ├── medias/          # All videos, images, logos
│   └── thumbs/          # Thumbnails
├── config.json         # Environment configuration
├── assets.js           # Universal path resolver
└── [existing files]    # All other files unchanged
```

## 🌍 Cross-Platform Compatibility

| Environment | Status | Asset Path |
|------------|--------|------------|
| **Localhost** | ✅ Works | `/project-v2/assets/medias/` |
| **Netlify** | ✅ Works | `/project-v2/assets/medias/` |
| **Yodeck** | ✅ Works | `./assets/medias/` |
| **File Protocol** | ✅ Works | `./assets/medias/` |

## 🚀 How to Test

### **Access URLs:**
- **Original**: `http://localhost:3000/project/projects.html?project_id=prj001`
- **V2 Improved**: `http://localhost:3000/project-v2/projects.html?project_id=prj001`

### **What to Compare:**
1. **Logo Loading** - Should work in both versions
2. **Page Performance** - V2 may load faster
3. **Console Errors** - V2 should have fewer path errors
4. **Network Tab** - V2 shows cleaner asset requests

## 🔧 Key Improvements

### **1. Simplified JSON Structure**
- ❌ **Before**: Mixed path formats causing confusion
- ✅ **After**: Clean filenames only

### **2. Environment Detection**
```javascript
// Automatically detects deployment environment
const ENV = {
  isYodeck: window.location.protocol === 'file:',
  isNetlify: window.location.hostname.includes('netlify'),
  isDevelopment: window.location.hostname === 'localhost'
};
```

### **3. Centralized Assets**
- All media files in one location: `/assets/medias/`
- No more hunting for missing files across multiple directories
- Easier backup and deployment

### **4. Future-Proof**
- Easy to add CDN support
- Ready for build optimization
- Simple to add asset versioning

## 🧪 Testing Checklist

- [ ] Project logos load correctly
- [ ] No 404 errors in console
- [ ] Works on localhost
- [ ] Ready for Netlify deployment
- [ ] Compatible with Yodeck file:// protocol

## 🤔 Decision Time

**Keep V2 if:**
- Logos load properly ✅
- No console errors ✅
- Code looks cleaner ✅
- Easier to maintain ✅

**Keep Original if:**
- V2 has issues loading assets
- You prefer the current structure
- Migration seems risky

---
*Generated: 2025-01-25 | Asset Resolver v2.0*