import * as admin from 'firebase-admin';
import { Device, Playlist, Shop, Unit } from '../lib/types';

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
    : undefined;

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    console.error('FIREBASE_SERVICE_ACCOUNT_JSON not found in environment');
    process.exit(1);
  }
}

const db = admin.firestore();

// Sample device data
const sampleDevice: Device = {
  device_id: 'NRF-26-L1-01',
  venue_id: 'nrf-l1',
  tags: ['lobby', 'main-entrance', '9:16'],
  capabilities: {
    touch: true,
    max_res: '1080x1920'
  },
  content_profile: 'mixed-commercial',
  current_playlist_id: 'lobby-mix-v1',
  app_config: {
    idle_timeout_sec: 45,
    qr_base_url: 'https://aquamx.biz/kiosk',
    lang_default: 'th'
  },
  heartbeat_ts: Date.now()
};

// Sample playlist data
const samplePlaylist: Playlist = {
  playlist_id: 'lobby-mix-v1',
  targets: {
    venues: ['nrf-l1'],
    tags_in: ['lobby', 'main-entrance']
  },
  dayparts: [
    {
      start: '09:00',
      end: '22:00',
      items: ['promo-dine-1', 'property-showcase-1']
    },
    {
      start: '22:01',
      end: '08:59',
      items: ['property-showcase-1']
    }
  ],
  items: {
    'promo-dine-1': {
      type: 'video',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      duration: 30,
      cta: {
        open: 'dine_cart',
        shop_id: 'thai-garden'
      }
    },
    'property-showcase-1': {
      type: 'video',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      duration: 45,
      cta: {
        open: 'property_list',
        project: 'Aqua MX'
      }
    }
  }
};

// Sample shop data
const sampleShop: Shop = {
  shop_id: 'thai-garden',
  name_th: 'สวนไทย',
  name_en: 'Thai Garden Restaurant',
  type: 'dine',
  categories: ['Thai Food', 'Authentic', 'Spicy'],
  deliver_area: ['L1', 'L2', 'L3'],
  contact: {
    line_oa: '@thaigarden',
    phone: '+66-2-123-4567'
  },
  media: {
    logo: 'https://via.placeholder.com/200x200/4ade80/ffffff?text=TG',
    gallery: [
      'https://via.placeholder.com/400x300/4ade80/ffffff?text=Thai+Garden+1',
      'https://via.placeholder.com/400x300/4ade80/ffffff?text=Thai+Garden+2'
    ]
  },
  menu: [
    {
      sku: 'TG001',
      name_th: 'ผัดไทย',
      name_en: 'Pad Thai',
      price: 120,
      image: 'https://via.placeholder.com/200x150/f97316/ffffff?text=Pad+Thai'
    },
    {
      sku: 'TG002',
      name_th: 'ต้มยำกุ้ง',
      name_en: 'Tom Yum Goong',
      price: 180,
      image: 'https://via.placeholder.com/200x150/dc2626/ffffff?text=Tom+Yum'
    },
    {
      sku: 'TG003',
      name_th: 'แกงเขียวหวานไก่',
      name_en: 'Green Curry Chicken',
      price: 160,
      image: 'https://via.placeholder.com/200x150/16a34a/ffffff?text=Green+Curry'
    },
    {
      sku: 'TG004',
      name_th: 'ข้าวผัดใส่ไข่',
      name_en: 'Egg Fried Rice',
      price: 80,
      image: 'https://via.placeholder.com/200x150/eab308/ffffff?text=Fried+Rice'
    }
  ]
};

// Sample marketplace shop
const sampleMarketplace: Shop = {
  shop_id: 'fresh-mart',
  name_th: 'เฟรชมาร์ท',
  name_en: 'Fresh Mart',
  type: 'market',
  categories: ['Groceries', 'Fresh Food', 'Daily Needs'],
  deliver_area: ['L1', 'L2', 'L3', 'L4'],
  contact: {
    phone: '+66-2-765-4321'
  },
  media: {
    logo: 'https://via.placeholder.com/200x200/06b6d4/ffffff?text=FM',
    gallery: [
      'https://via.placeholder.com/400x300/06b6d4/ffffff?text=Fresh+Mart+1'
    ]
  },
  menu: [
    {
      sku: 'FM001',
      name_th: 'นมสด',
      name_en: 'Fresh Milk 1L',
      price: 45,
      image: 'https://via.placeholder.com/200x150/ffffff/000000?text=Milk'
    },
    {
      sku: 'FM002',
      name_th: 'ขนมปังโฮลวีท',
      name_en: 'Whole Wheat Bread',
      price: 35,
      image: 'https://via.placeholder.com/200x150/d97706/ffffff?text=Bread'
    }
  ]
};

// Sample unit data
const sampleUnits: Unit[] = [
  {
    unit_id: 'AQX-A1201',
    project: 'Aqua MX',
    room_type: '1 Bedroom',
    size_sqm: 35,
    floor: 12,
    images: [
      'https://via.placeholder.com/600x400/3b82f6/ffffff?text=1BR+Living+Room',
      'https://via.placeholder.com/600x400/8b5cf6/ffffff?text=1BR+Bedroom',
      'https://via.placeholder.com/600x400/10b981/ffffff?text=1BR+Kitchen'
    ],
    condition: {
      for_sale: true,
      selling_price: 4200000,
      for_rent: true,
      rental_price: 18000
    },
    available_from: '2024-03-01T00:00:00.000Z'
  },
  {
    unit_id: 'AQX-B0803',
    project: 'Aqua MX',
    room_type: '2 Bedroom',
    size_sqm: 55,
    floor: 8,
    images: [
      'https://via.placeholder.com/600x400/ef4444/ffffff?text=2BR+Living+Room',
      'https://via.placeholder.com/600x400/f59e0b/ffffff?text=2BR+Master+Bedroom',
      'https://via.placeholder.com/600x400/84cc16/ffffff?text=2BR+Kitchen'
    ],
    condition: {
      for_sale: true,
      selling_price: 6800000,
      for_rent: true,
      rental_price: 28000
    },
    available_from: '2024-04-15T00:00:00.000Z'
  },
  {
    unit_id: 'AQX-C1505',
    project: 'Aqua MX',
    room_type: 'Studio',
    size_sqm: 28,
    floor: 15,
    images: [
      'https://via.placeholder.com/600x400/6366f1/ffffff?text=Studio+Room',
      'https://via.placeholder.com/600x400/ec4899/ffffff?text=Studio+Kitchen'
    ],
    condition: {
      for_sale: false,
      for_rent: true,
      rental_price: 14000
    },
    available_from: '2024-02-20T00:00:00.000Z'
  }
];

async function seedData() {
  try {
    console.log('Starting data seeding...');

    // Add device
    await db.collection('devices').doc(sampleDevice.device_id).set(sampleDevice);
    console.log('✅ Device added:', sampleDevice.device_id);

    // Add playlist
    await db.collection('playlists').doc(samplePlaylist.playlist_id).set(samplePlaylist);
    console.log('✅ Playlist added:', samplePlaylist.playlist_id);

    // Add shops
    await db.collection('shops').doc(sampleShop.shop_id).set(sampleShop);
    console.log('✅ Shop added:', sampleShop.shop_id);

    await db.collection('shops').doc(sampleMarketplace.shop_id).set(sampleMarketplace);
    console.log('✅ Marketplace added:', sampleMarketplace.shop_id);

    // Add units
    for (const unit of sampleUnits) {
      await db.collection('units').doc(unit.unit_id).set(unit);
      console.log('✅ Unit added:', unit.unit_id);
    }

    console.log('\n🎉 Seeding completed successfully!');
    console.log('\nYou can now:');
    console.log('1. Run "npm run dev" to start the development server');
    console.log('2. Open http://localhost:3000/player?device=NRF-26-L1-01 to test the player');
    console.log('3. Open http://localhost:3000/admin to manage the system');
    console.log('\nSample data includes:');
    console.log('- 1 device (NRF-26-L1-01)');
    console.log('- 1 playlist with 2 video items');
    console.log('- 2 shops (Thai Garden restaurant + Fresh Mart)');
    console.log('- 3 property units');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Additional sample data for testing
async function seedTestData() {
  try {
    console.log('Adding additional test data...');

    // Add sample analytics events
    const analyticsEvents = [
      {
        type: 'impression',
        device_id: 'NRF-26-L1-01',
        timestamp: Date.now() - 3600000, // 1 hour ago
        data: { item_key: 'promo-dine-1' }
      },
      {
        type: 'tap',
        device_id: 'NRF-26-L1-01',
        timestamp: Date.now() - 1800000, // 30 minutes ago
        data: { target: 'menu' }
      },
      {
        type: 'menu_open',
        device_id: 'NRF-26-L1-01',
        timestamp: Date.now() - 1200000, // 20 minutes ago
        data: {}
      }
    ];

    for (const event of analyticsEvents) {
      await db.collection('analytics').add(event);
    }
    console.log('✅ Analytics events added');

    // Add sample order
    const sampleOrder = {
      order_id: `ORD-${Date.now()}`,
      device_id: 'NRF-26-L1-01',
      shop_id: 'thai-garden',
      items: [
        {
          sku: 'TG001',
          qty: 1,
          price: 120,
          name_th: 'ผัดไทย'
        },
        {
          sku: 'TG002',
          qty: 1,
          price: 180,
          name_th: 'ต้มยำกุ้ง'
        }
      ],
      buyer: {
        name: 'สมศักดิ์ ใจดี',
        phone: '081-234-5678',
        room: 'A1201'
      },
      delivery: {
        to: 'A1201',
        note: 'โทรก่อนส่ง'
      },
      payment: {
        method: 'qr_mock' as const,
        status: 'pending' as const,
        tx_ref: `TX-${Date.now()}`
      },
      status: 'placed' as const,
      timestamps: {
        placed: Date.now()
      }
    };

    await db.collection('orders').add(sampleOrder);
    console.log('✅ Sample order added');

    // Add sample lead
    const sampleLead = {
      lead_id: `LEAD-${Date.now()}`,
      source_device: 'NRF-26-L1-01',
      unit_id: 'AQX-A1201',
      buyer: {
        name: 'วิไล สมบูรณ์',
        phone: '089-876-5432'
      },
      preferred_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      notes: 'สนใจดูห้องจริง',
      status: 'new' as const,
      created_at: Date.now()
    };

    await db.collection('leads').add(sampleLead);
    console.log('✅ Sample lead added');

    console.log('\n✨ Test data seeding completed!');

  } catch (error) {
    console.error('❌ Test data seeding failed:', error);
  }
}

// Run seeding
async function main() {
  await seedData();
  
  // Ask if user wants to add test data
  const args = process.argv.slice(2);
  if (args.includes('--with-test-data')) {
    await seedTestData();
  }
  
  process.exit(0);
}

main().catch(console.error);