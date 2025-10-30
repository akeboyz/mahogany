# Yodeck Deployment Guide

## Quick Deploy Steps

### Method 1: Automated Script (Recommended)
```bash
cd scripts
npm install archiver  # First time only
node build-yodeck.js
```
This creates `yodeck-signage-package.zip` ready for upload.

### Method 2: Manual Steps
1. **Create deployment folder**: `yodeck-deploy/`
2. **Copy all files** from `public/` to `yodeck-deploy/`
3. **Copy `public/ann/signage.html`** as `yodeck-deploy/index.html`
4. **Update paths** in the new `index.html`:
   - `./data/` → `ann/data/`
   - `./medias/` → `ann/medias/`
   - `./menu.html` → `ann/menu.html`
   - `./category.html` → `ann/category.html`
   - `./product.html` → `ann/product.html`
5. **ZIP the `yodeck-deploy/` folder**

## Path Updates Needed

When copying `ann/signage.html` to root `index.html`, update these patterns:

```javascript
// OLD (relative to ann/)
fetch('./data/playlist.json')
src="./medias/placeholder.jpg"
location.href = './menu.html'

// NEW (relative to root)
fetch('ann/data/playlist.json')
src="ann/medias/placeholder.jpg"
location.href = 'ann/menu.html'
```

## File Structure in ZIP
```
yodeck-signage-package.zip
├── index.html              # (copied from ann/signage.html)
├── ann/
│   ├── signage.html        # original file
│   ├── menu.html
│   ├── category.html
│   ├── data/
│   │   ├── playlist.json
│   │   ├── shop.json
│   │   └── ...
│   └── medias/
├── product.html            # unified product page
└── data/                   # root level data
```

## Testing Locally
1. Serve the `yodeck-deploy/` folder with any HTTP server
2. Open `http://localhost:8000/index.html`
3. Verify all videos, navigation, and data loading works

## Yodeck Upload
1. Log into Yodeck dashboard
2. Go to **Content** → **Web Apps**
3. Click **+ Add Web App**
4. Upload `yodeck-signage-package.zip`
5. Set display duration and loop settings
6. Deploy to your screens

## Troubleshooting

### Videos not playing?
- Ensure video URLs are absolute (https://) or relative to zip root
- Check video formats are supported (MP4, WebM)

### Data not loading?
- Verify JSON file paths are correct relative to index.html
- Check browser console for 404 errors

### Navigation broken?
- Confirm all HTML file references are updated to correct paths
- Test each navigation flow manually