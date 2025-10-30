# Complete Digital Signage Project Package

## 📦 Package Contents

This ZIP contains a complete digital signage solution with dashboard management system.

### 🏢 **Condo Digital Signage (Yodeck Ready)**
Located in: `yodeck-signage-package/`

**Main Files:**
- `index.html` - Entry point video player (9:16 portrait)
- `menu.html` - 6-category menu grid (2×3 layout)
- `submenu.html` - Category items display (4×3 grid)
- `product.html` - Advertiser showcase (single page, no scroll)
- `styles.css` - Complete 9:16 responsive styling
- `config.json` - Project configuration
- `playlist.json` - Video playlist with working URLs

**JavaScript Controllers:**
- `js/player.js` - Video playlist and touch navigation
- `js/navigation.js` - 60-second timeout and page routing
- `js/menu.js` - Category menu management
- `js/submenu.js` - Items grid with pagination
- `js/product.js` - Product showcase controller

**Sample Data:**
- `data/products.json` - 6 advertiser products
- `data/items-*.json` - Menu items for all 6 categories

### 🎯 **Project Dashboard**
- `dashboard.html` - Project management interface
- `dashboard-styles.css` - Dashboard styling
- `dashboard-script.js` - Project management functionality

## 🚀 **Quick Start Guide**

### For Yodeck Deployment:
1. **Extract** the `yodeck-signage-package/` folder
2. **ZIP only** the contents of that folder
3. **Upload** to Yodeck as HTML app
4. **Set** `index.html` as entry point
5. **Deploy** to your screens

### For Local Testing:
1. **Extract** all files
2. **Start** a local web server in the extracted folder
3. **Open** `dashboard.html` for project management
4. **Open** `yodeck-signage-package/index.html` for signage

## 📱 **Features**

### **Signage Features:**
- **9:16 Portrait** aspect ratio (fits any screen)
- **Touch Navigation** with 60-second auto-return
- **Video Playlist** with working sample videos
- **6 Categories**: Dine, Delivery, Daily, On-demand, Deals, Juristic
- **4×3 Item Grid** with pagination (12 items per page)
- **Product Showcase** (4 products, single page view)
- **Responsive Design** (auto-scales to screen size)

### **Dashboard Features:**
- **Project Management** with condo-focused interface
- **Real-time Stats** (Total projects, Live displays, Maintenance)
- **Search & Filter** by status, location, type
- **Add/Edit/Clone/Delete** projects
- **Direct Links** to signage projects
- **6 Display Types**: Lobby, Sales Gallery, Amenities, Elevator, Reception, Parking

## 🎨 **Customization**

### **Adding New Projects:**
1. Use dashboard to add new condo projects
2. Projects are saved in browser localStorage
3. Each project links to its own signage instance

### **Updating Content:**
- **Videos**: Replace URLs in `playlist.json` and `config.json`
- **Menu Items**: Edit files in `data/` folder
- **Products**: Update `data/products.json`
- **Styling**: Modify `styles.css` for appearance

### **Configuration:**
- **Project Info**: Edit `config.json`
- **Categories**: Update categories array in config
- **Timeout**: Change display.timeout value (default: 60000ms)

## 🔧 **Technical Specs**

- **Aspect Ratio**: 9:16 Portrait (1080×1920 optimal)
- **Responsive**: Auto-fits any screen size
- **No Dependencies**: Pure HTML/CSS/JavaScript
- **Offline Ready**: All assets bundled
- **Touch Optimized**: Minimum 64px touch targets
- **Performance**: Optimized for 24/7 kiosk operation

## 📞 **Support**

This package is ready for production deployment on Yodeck or any digital signage platform that supports HTML applications.

For customization or additional features, refer to the detailed documentation in the individual README files within each component folder.

---

**Created with Claude Code - Ready for Yodeck Deployment**