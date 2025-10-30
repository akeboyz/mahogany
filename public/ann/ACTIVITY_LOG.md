# Digital Signage Activity Log
*Generated: 2025-09-10*

## Session Summary
Implemented dynamic content population for digital signage system with project-specific filtering and category remapping.

## Files Created/Modified

### New Files Created:
- `data/playlist.json` - Project-to-content mapping
- `data/delivery.json` - Delivery service data  
- `data/deal.json` - Deal/promotion data
- `data/daily.json` - Daily service data
- `data/juristic.json` - Juristic announcement data
- `data/ondemand.json` - On-demand service data
- `signage.html` - Main signage loop page

### Files Modified:
- `category.html` - Updated with dynamic content loading logic
- `data/foodie.json` - Added 8 more restaurants (total: 12)
- `data/market.json` - Added 12 more shops (total: 20)

## Category Remapping Implemented

### Before → After:
- **Deal** → Units (property listings)
- **Delivery** → Restaurants with delivery + delivery services
- **Dining** → Restaurants without delivery (dine-in only)
- **Juristic** → Announcements  
- **On-demand** → Service shops (laundry, repair, etc.)
- **Daily** → Regular shops (supermarket, pharmacy, etc.)

## Data Distribution by Project

### Project prj001:
- **Restaurants**: 3 (Sushi Hiro, Steak House, Boat Noodles)
- **Shops**: 5 (3 regular, 2 service)
- **Units**: 1 (Unit A108)

### Project prj002:
- **Restaurants**: 3 (After You, Pizza Hut, Chicken Rice)
- **Shops**: 5 (3 regular, 2 service)  
- **Units**: 1 (Unit B205)

### Project prj003:
- **Restaurants**: 3 (Fire Tiger, Mocha Cafe, Chinese Restaurant)
- **Shops**: 5 (3 regular, 2 service)
- **Units**: 1 (Unit C301)

### Project prj004:
- **Restaurants**: 3 (Pasta Fresca, Burger Bar, Ice Cream)
- **Shops**: 5 (3 regular, 2 service)
- **Units**: 1 (Unit D115)

## Technical Implementation

### Data Filtering Logic:
```javascript
// Filter by project_id
if (projectId) {
  items = items.filter(item => item.project_id === projectId);
}

// Filter by service type for shops
case 'ondemand':
  items = items.filter(shop => 
    shop.category_en && shop.category_en.toLowerCase().includes('service')
  );

case 'daily':
  items = items.filter(shop => 
    !shop.category_en || !shop.category_en.toLowerCase().includes('service')
  );
```

### Navigation Flow:
1. `signage.html?project_id=prj001` - Auto-cycling content
2. Touch screen → `menu.html?project_id=prj001` - 6 category buttons
3. Category selection → `category.html?type=[category]&project_id=prj001`
4. Auto-return to signage after 60 seconds inactivity

## Testing URLs

### Signage:
- http://localhost:3000/project/ann/signage.html?project_id=prj001

### Categories:
- http://localhost:3000/project/ann/category.html?type=deal&project_id=prj001
- http://localhost:3000/project/ann/category.html?type=delivery&project_id=prj001
- http://localhost:3000/project/ann/category.html?type=dining&project_id=prj001
- http://localhost:3000/project/ann/category.html?type=juristic&project_id=prj001
- http://localhost:3000/project/ann/category.html?type=ondemand&project_id=prj001
- http://localhost:3000/project/ann/category.html?type=daily&project_id=prj001

## Next Steps/Pending
- [ ] Replace announce.html with A4-shaped images for Lumpini 24 project
- [ ] Upload announcement images for integration
- [ ] Test all categories with different project IDs
- [ ] Add media files for video content in `/ann/medias/`

## Notes
- All content is now project-specific and filtered properly
- Service vs non-service shop distinction implemented
- Delivery vs dine-in restaurant filtering working
- Auto-return functionality maintains kiosk behavior
- Error handling and fallbacks implemented for missing data