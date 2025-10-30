# QR Code Pre-Generation for Yodeck Deployment

This system generates QR codes offline for map navigation in the signage system, ensuring compatibility with Yodeck's offline HTML app environment.

## 🎯 Quick Start

### 1. Generate QR Codes
```bash
cd scripts
node generate-qr-codes.js
```

### 2. Verify Generated Files
Check `public/images/qr-codes/` for generated PNG files:
- `rest-[item-id]-map.png`
- `shop-[item-id]-map.png`
- `unit-[item-id]-map.png`

### 3. Deploy to Yodeck
Include the entire `public/images/qr-codes/` folder in your Yodeck ZIP package.

## 📁 File Structure

```
├── scripts/
│   ├── generate-qr-codes.js     # QR generation script
│   └── package.json             # Script dependencies
├── public/
│   ├── images/qr-codes/         # Generated QR codes (created)
│   ├── data/                    # Product data sources
│   └── product.html             # Updated with offline QR support
```

## 🔧 How It Works

### Data Sources
The script reads from your existing data files:
- `public/data/rest.json` → Restaurant QR codes
- `public/data/shop.json` → Shop QR codes
- `public/data/unit.json` → Unit QR codes

### QR Code Naming Convention
Generated files follow the pattern: `{type}-{item-id}-map.png`

Examples:
- `rest-rest001-map.png`
- `shop-shop001-map.png`
- `unit-unit001-map.png`

### Map URL Generation Priority
1. **Coordinates** (if `product.coordinates` exists)
   ```json
   "coordinates": {"lat": 13.7563, "lng": 100.5018}
   ```

2. **Google Maps Embed URL** (extracts coordinates automatically)
   ```json
   "map_embed_url": "https://maps.google.com/maps/embed?pb=!1m18!1m12!..."
   ```

3. **Address Fallback** (uses address search)
   ```json
   "address": "123 Main Street, Bangkok"
   ```

## 🚀 Integration

### product.html Changes
- **Offline QR loading**: Uses pre-generated local images instead of API calls
- **Smart fallback**: Hides QR section if image not found
- **File path generation**: Automatically matches generated file names

### Map Modal Features
- **80x80px QR codes** positioned beside location info
- **"Scan to Navigate"** label with instructions
- **Error handling** for missing QR codes
- **Mobile-optimized** for easy scanning

## 🔄 Workflow for Updates

### When Adding New Locations:
1. Add location data to relevant JSON file
2. Run `node generate-qr-codes.js`
3. Include updated QR codes in next Yodeck deployment

### When Updating Addresses:
1. Update address/coordinates in JSON
2. Re-run QR generation script
3. Replace old QR codes with new ones

## 📊 Generation Report

After running the script, check `public/images/qr-codes/generation-report.json`:

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "totalGenerated": 45,
  "errors": [],
  "outputDirectory": "/path/to/qr-codes"
}
```

## ⚠️ Important Notes

### For Yodeck Deployment:
- **All QR codes must be pre-generated** (no online API access)
- **Include entire qr-codes folder** in ZIP package
- **Test QR codes** before deployment to ensure they work

### QR Code Requirements:
- **160x160px PNG format** for optimal scanning
- **Google Maps URLs** for universal mobile compatibility
- **Error handling** for missing or invalid images

### Troubleshooting:
- **Missing QR codes**: Check if product has valid map data
- **Generation failures**: Verify internet connection during generation
- **Scanning issues**: Ensure QR codes are at least 2cm² when displayed

## 🎨 Customization

### Change QR Size:
Edit `generate-qr-codes.js`, line with `size=160x160`

### Custom QR API:
Replace QR_API_BASE with alternative service (must work offline after generation)

### File Naming:
Modify `getQRCodePath()` function in product.html and generation script consistently

---

**Ready for Yodeck!** 🚀 Your QR codes will work perfectly in offline signage environments.