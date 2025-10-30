# Navigation Fix for Project V2

## Issue Found
When clicking Menu in signage, it was navigating to the wrong paths (original project paths instead of v2 paths).

## Files Fixed

### ✅ `/project-v2/ann/index.html` (Signage Player)
- **Fixed**: `buildMainMenuUrl()` now points to `/project-v2/menu.html`
- **Fixed**: `buildDetailUrl()` now points to `/project-v2/product.html`

### ✅ `/project-v2/menu.html` (Main Menu)
- **Fixed**: Video src paths now point to `./assets/medias/`
- **Fixed**: Navigation back to signage now points to `./ann/index.html`

### ✅ Files Copied to V2
- `menu.html` (Main menu with video tiles)
- `category.html` (Category listings)
- `product.html` (Product details)

## Navigation Flow (Now Fixed)
```
Signage Player → Menu → Category → Product → Back to Signage
     ↓             ↓         ↓         ↓           ↑
project-v2/   project-v2/ project-v2/ project-v2/  └─ Back loop
ann/index.html  menu.html  category.html product.html
```

## Test URLs
- **Signage**: `http://localhost:3000/project-v2/ann/index.html?project_id=prj001`
- **Menu**: `http://localhost:3000/project-v2/menu.html?project_id=prj001`
- **Category**: `http://localhost:3000/project-v2/category.html?type=dining&project_id=prj001`

All navigation should now stay within the `project-v2` directory structure.

---
*Fixed: 2025-01-25*