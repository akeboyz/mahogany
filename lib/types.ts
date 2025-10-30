export interface Device {
  device_id: string;
  venue_id: string;
  tags: string[];
  capabilities: {
    touch: boolean;
    max_res: string;
  };
  content_profile: string;
  current_playlist_id: string;
  app_config: {
    idle_timeout_sec: number;
    qr_base_url: string;
    lang_default: 'th' | 'en';
  };
  heartbeat_ts: number;
}

export interface PlaylistItem {
  type: 'video';
  src: string;
  duration: number;
  cta?: {
    open: 'detail' | 'menu' | 'property_list' | 'dine_cart';
    ref?: string;
    shop_id?: string;
    project?: string;
  };
}

export interface Daypart {
  start: string;
  end: string;
  items: string[];
}

export interface Playlist {
  playlist_id: string;
  targets: {
    venues: string[];
    tags_in: string[];
  };
  dayparts: Daypart[];
  items: Record<string, PlaylistItem>;
}

export interface Shop {
  shop_id: string;
  name_th: string;
  name_en: string;
  type: 'dine' | 'market';
  categories: string[];
  deliver_area: string[];
  contact: {
    line_oa?: string;
    phone?: string;
  };
  media: {
    logo?: string;
    gallery: string[];
  };
  menu: MenuItem[];
}

export interface MenuItem {
  sku: string;
  name_th: string;
  name_en?: string;
  price: number;
  options?: MenuOption[];
  image?: string;
}

export interface MenuOption {
  name_th: string;
  name_en?: string;
  price_modifier: number;
}

export interface Unit {
  unit_id: string;
  project: string;
  room_type: string;
  size_sqm: number;
  floor: number;
  images: string[];
  condition: {
    for_sale: boolean;
    selling_price?: number;
    for_rent: boolean;
    rental_price?: number;
  };
  available_from: string;
}

export interface Order {
  order_id: string;
  device_id: string;
  shop_id: string;
  items: OrderItem[];
  buyer: {
    name: string;
    phone: string;
    room?: string;
  };
  delivery: {
    to: string;
    note?: string;
  };
  payment: {
    method: 'qr_mock';
    status: 'pending' | 'paid';
    tx_ref: string;
  };
  status: 'placed' | 'confirmed' | 'preparing' | 'delivered';
  timestamps: {
    placed: number;
    paid?: number;
  };
}

export interface OrderItem {
  sku: string;
  qty: number;
  price: number;
  name_th: string;
  options?: string[];
}

export interface Lead {
  lead_id: string;
  source_device: string;
  unit_id: string;
  buyer: {
    name: string;
    phone: string;
  };
  preferred_time: string;
  notes?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'closed';
  created_at: number;
}

export interface CartItem extends MenuItem {
  qty: number;
  selectedOptions: string[];
}

export interface AnalyticsEvent {
  type: 'impression' | 'tap' | 'menu_open' | 'add_to_cart' | 'payment_success' | 'lead_submit';
  device_id: string;
  timestamp: number;
  data?: any;
}