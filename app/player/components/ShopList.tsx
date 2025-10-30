'use client';

import { Device, Shop } from '@/lib/types';

interface ShopListProps {
  shops: Shop[];
  device: Device;
  onSelect: (shop: Shop) => void;
  onBack: () => void;
}

export default function ShopList({ shops, device, onSelect, onBack }: ShopListProps) {
  const lang = device.app_config.lang_default;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <button
          onClick={onBack}
          className="touch-button flex items-center space-x-2 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>{lang === 'th' ? 'กลับ' : 'Back'}</span>
        </button>
        
        <h1 className="text-2xl font-bold">
          {lang === 'th' ? 'เลือกร้านอาหาร' : 'Select Restaurant'}
        </h1>
        
        <div className="w-16"></div>
      </div>

      {/* Shop Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 gap-4">
          {shops.map((shop) => (
            <button
              key={shop.shop_id}
              onClick={() => onSelect(shop)}
              className="touch-button bg-gray-800 hover:bg-gray-700 rounded-xl p-6 text-left transition-colors"
            >
              <div className="flex items-center space-x-4">
                {shop.media.logo && (
                  <img
                    src={shop.media.logo}
                    alt={lang === 'th' ? shop.name_th : shop.name_en}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">
                    {lang === 'th' ? shop.name_th : shop.name_en}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {shop.categories.slice(0, 3).map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-blue-600 text-white text-xs rounded"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {shops.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl">
              {lang === 'th' ? 'ไม่มีร้านอาหารในขณะนี้' : 'No restaurants available'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}