# Digital Signage MVP System

A complete interactive multi-site digital signage system with kiosk PWA and admin interface, built with Next.js 14, TypeScript, Firebase, and TailwindCSS.

## Features

### 🖥️ Player (Kiosk) PWA
- **Video Loop**: Auto-playing HLS/MP4 videos with daypart scheduling
- **Interactive CTAs**: Touch overlays for navigation to menus and details
- **Main Menu**: Large touch buttons for Dine, Marketplace, Property
- **Order Flow**: Browse shops, add to cart, mock payment with QR codes
- **Property Leads**: Unit browsing, callback scheduling, lead capture
- **QR Handoff**: Generate mobile-friendly URLs for order/lead tracking
- **Offline Support**: Service Worker with caching and prefetch
- **Analytics**: Track impressions, taps, conversions

### ⚙️ Admin Interface
- **Device Management**: View device status, heartbeat monitoring
- **Playlist Editor**: Manage dayparts, video items, and CTA configurations
- **Shop Management**: Edit restaurants and marketplaces, menu items
- **Property Units**: Manage availability, pricing, images

### 🔧 Backend
- **Firebase Functions**: Mock payment webhooks, LINE notifications
- **Firestore Database**: Real-time data with security rules
- **Firebase Storage**: Video and image asset hosting
- **Analytics Collection**: Event tracking and reporting

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Video**: hls.js with adaptive bitrate streaming
- **PWA**: Custom Service Worker with offline caching
- **Backend**: Firebase (Firestore, Functions, Storage)
- **Deployment**: Netlify/Vercel + Firebase Hosting

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and configure your Firebase project:

```bash
cp .env.example .env.local
```

Update the Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"your-project-id"}
LINE_NOTIFY_TOKEN=stub
PLAYER_QR_BASE=https://aquamx.biz/kiosk
```

### 3. Firebase Setup

1. Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)

2. Enable Firestore Database and create with security rules:
```bash
# Deploy the firestore.rules file
firebase deploy --only firestore:rules
```

3. Enable Firebase Storage for video/image assets

4. Generate a service account key:
   - Go to Project Settings > Service Accounts
   - Generate new private key
   - Add the JSON content to your `.env.local`

### 4. Seed Sample Data

```bash
npm run seed
```

This creates:
- 1 demo device (`NRF-26-L1-01`)
- 1 playlist with 2 video items
- 2 shops (Thai Garden restaurant + Fresh Mart)  
- 3 property units

### 5. Start Development

```bash
npm run dev
```

### 6. Test the System

- **Player**: http://localhost:3000/player?device=NRF-26-L1-01
- **Admin**: http://localhost:3000/admin
- **Home**: http://localhost:3000

## Firebase Functions Setup

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 2. Initialize Firebase (if not done)

```bash
firebase init
```
Select:
- Firestore
- Functions (Node.js)
- Hosting

### 3. Deploy Functions

```bash
cd functions
npm install
npm run build
cd ..
firebase deploy --only functions
```

Available endpoints:
- `POST /paymentMock` - Mock payment webhook
- `POST /lineNotifyStub` - LINE notification stub
- `GET /healthCheck` - Function health status

## Deployment

### Frontend (Netlify/Vercel)

1. **Netlify**:
   - Connect your repository
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Add environment variables

2. **Vercel**:
   ```bash
   npm install -g vercel
   vercel --prod
   ```

### Firebase Hosting (Alternative)

```bash
npm run build
firebase deploy --only hosting
```

### Firebase Functions

```bash
firebase deploy --only functions
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── admin/             # Admin interface
│   ├── player/            # Kiosk player PWA
│   │   └── components/    # Player components
│   └── components/        # Shared components
├── lib/                   # Utilities and configs
│   ├── firebase.ts        # Firebase client config
│   ├── types.ts          # TypeScript types
│   └── analytics.ts      # Event tracking
├── functions/             # Firebase Functions
│   └── src/index.ts      # Cloud functions
├── scripts/               # Utility scripts
│   └── seed.ts           # Database seeding
├── public/               # Static assets
│   ├── sw.js            # Service Worker
│   ├── manifest.webmanifest
│   └── offline.html     # Offline fallback
└── firestore.rules      # Database security rules
```

## Key URLs

- **Player**: `/player?device=DEVICE_ID`
- **Admin**: `/admin`
- **Health Check**: `/api/health` (when functions deployed)

## Data Model

### Collections

- `devices` - Kiosk device configurations
- `playlists` - Video content with daypart scheduling  
- `shops` - Restaurant and marketplace data
- `units` - Property listings
- `orders` - Customer orders
- `leads` - Property inquiries
- `analytics` - Event tracking data

## Features Overview

### Player Flow
1. **Idle Loop**: Auto-play videos based on current daypart
2. **CTA Interaction**: Touch overlays trigger navigation
3. **Main Menu**: Category selection (Dine/Marketplace/Property)
4. **Shopping**: Browse → Cart → Checkout → Payment
5. **Property**: Browse units → View details → Request callback
6. **QR Handoff**: Mobile continuation links
7. **Auto Return**: 45-second idle timeout back to loop

### Admin Features
- Real-time device monitoring with heartbeat status
- Playlist management with visual daypart editor
- Shop and menu item editing
- Property unit availability and pricing
- Order and lead tracking

## Production Considerations

### Security
- Update Firestore rules for production environment
- Implement proper authentication for admin interface
- Add rate limiting for public endpoints
- Validate all user inputs

### Performance
- Implement proper CDN for video assets
- Add image optimization and compression
- Monitor bundle size and lazy load components
- Use Firebase Performance Monitoring

### Monitoring
- Set up error tracking (Sentry)
- Configure Firebase Analytics
- Monitor function performance and costs
- Set up uptime monitoring for critical endpoints

### Scaling
- Implement caching strategies
- Consider database partitioning for analytics
- Plan for multi-region deployment if needed
- Monitor Firestore read/write quotas

## Troubleshooting

### Common Issues

1. **Video won't play**: Check CORS settings and video URLs
2. **Device offline**: Check heartbeat timestamps in admin
3. **Functions not deploying**: Verify Node.js version (20.x required)
4. **Data not loading**: Check Firebase configuration and security rules

### Debug Mode

Set `NODE_ENV=development` for additional logging and disable service worker registration.

## License

Private/Proprietary - All rights reserved.

---

**MVP Status**: ✅ Complete - Ready for demo and testing

This system provides a solid foundation for digital signage deployment with interactive kiosk functionality, real-time management, and offline capabilities.