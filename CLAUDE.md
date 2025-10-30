# Digital Signage System - Claude Configuration

## Project Overview
Interactive multi-site digital signage system with kiosk PWA and admin interface.

**Tech Stack**: Next.js 14 (App Router), TypeScript, TailwindCSS, Firebase, hls.js, PWA

## Key Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run seed         # Seed sample data to Firestore
npm run seed -- --with-test-data  # Seed with additional test data
```

### Firebase
```bash
# Functions
cd functions && npm run build && cd .. && firebase deploy --only functions

# Firestore rules
firebase deploy --only firestore:rules

# Hosting (if using Firebase Hosting)
firebase deploy --only hosting
```

### Testing URLs
- Player: `http://localhost:3000/player?device=NRF-26-L1-01`
- Admin: `http://localhost:3000/admin`
- Health: `http://localhost:3000/api/health`

## Project Structure

### Core Components
- `app/player/` - Kiosk PWA components (VideoLoop, MainMenu, DineFlow, PropertyFlow)
- `app/admin/` - Admin interface (DevicesAdmin, PlaylistsAdmin, ShopsAdmin, UnitsAdmin)
- `lib/` - Utilities (firebase.ts, types.ts, analytics.ts)
- `functions/` - Firebase Functions for webhooks and notifications

### Key Files
- `firestore.rules` - Database security rules
- `public/sw.js` - Service Worker for offline support
- `scripts/seed.ts` - Database seeding script
- `app/globals.css` - TailwindCSS styles with kiosk-specific classes

## Firebase Collections
- `devices` - Kiosk configurations and heartbeat
- `playlists` - Video content with daypart scheduling
- `shops` - Restaurants and marketplaces
- `units` - Property listings
- `orders` - Customer orders
- `leads` - Property inquiries
- `analytics` - Event tracking

## Common Tasks

### Adding New Video Content
1. Update playlist in Admin interface or directly in Firestore
2. Add video URLs (HLS .m3u8 or MP4)
3. Configure CTAs (menu, dine_cart, property_list, detail)
4. Set daypart scheduling

### Device Management
1. Device configs in `devices` collection
2. Monitor heartbeat via Admin interface
3. Update `current_playlist_id` to change content

### Mock Payments
- Use "Mark as Paid" button in checkout flow
- Webhook endpoint: `/paymentMock` (Firebase Function)
- Orders update automatically via Firestore triggers

### Analytics
- Events tracked: impression, tap, menu_open, add_to_cart, payment_success, lead_submit
- View in Firestore `analytics` collection
- Real-time tracking via `trackEvent()` function

## Deployment Notes

### Environment Variables
Required in `.env.local`:
- `NEXT_PUBLIC_FIREBASE_*` - Firebase client config
- `FIREBASE_SERVICE_ACCOUNT_JSON` - Service account for seeding
- `LINE_NOTIFY_TOKEN=stub` - LINE notification token
- `PLAYER_QR_BASE` - Base URL for QR codes

### Production Checklist
- [ ] Update Firestore security rules for production
- [ ] Deploy Firebase Functions
- [ ] Configure CDN for video assets
- [ ] Set up proper domain for QR base URL
- [ ] Enable Firebase Analytics
- [ ] Add proper PWA icons
- [ ] Test offline functionality

## Troubleshooting

### Common Issues
- **Video not playing**: Check CORS and video URL accessibility
- **Device offline**: Check heartbeat timestamp in devices collection
- **Functions not working**: Verify deployment and check Firebase logs
- **PWA not installing**: Ensure HTTPS and valid manifest

### Debug Commands
```bash
# Check Firebase functions logs
firebase functions:log

# Test functions locally
cd functions && npm run serve

# Clear browser cache for PWA updates
# Or use Application tab in DevTools
```

## Development Guidelines

### Code Style
- Use TypeScript strict mode
- Follow existing component patterns
- Keep kiosk layouts in 9:16 aspect ratio
- Touch targets minimum 64px
- Use existing TailwindCSS utility classes

### Performance
- Lazy load components where possible
- Optimize video assets for mobile
- Use Service Worker caching strategically
- Monitor Firestore read/write operations

### Security
- Never expose API keys in client code
- Validate all user inputs
- Use Firestore security rules
- Implement rate limiting for public endpoints

## Yodeck Platform Reference

### Key Features
- Digital signage software platform with comprehensive documentation
- Supports various hardware options (including Raspberry Pi)
- Web scripting engine for customizing web page displays
- Free digital signage software and templates

### Documentation Resources
- Comprehensive user manual and setup guides
- Partner manual for resellers and white-label solutions
- Knowledge base with FAQs and tutorials
- Yodeck Academy for learning resources

### Integration Capabilities
- Google Sheets integration
- Instagram content integration
- Looker Studio connectivity
- QR code WiFi connection for players
- Multiple content types support

### Hardware & Deployment
- Raspberry Pi compatible
- Various player hardware options
- Web-based content management
- Remote player management capabilities

### Comparison Notes
- **Our System**: Custom Next.js with Firebase, focused on restaurant/property kiosks
- **Yodeck**: General-purpose digital signage with broader hardware support
- **Potential Learnings**: Web scripting engine concept, player management approaches