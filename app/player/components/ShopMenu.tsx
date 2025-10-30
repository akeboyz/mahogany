'use client';

import { useState } from 'react';
import { Device, Shop, MenuItem, CartItem } from '@/lib/types';
import { trackAddToCart } from '@/lib/analytics';

interface ShopMenuProps {
  shop: Shop;
  device: Device;
  onAddToCart: (item: CartItem) => void;
  onViewCart: () => void;
  onBack: () => void;
  cartCount: number;
}

export default function ShopMenu({ shop, device, onAddToCart, onViewCart, onBack, cartCount }: ShopMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const lang = device.app_config.lang_default;

  const categories = ['all', ...shop.categories];
  const filteredMenu = selectedCategory === 'all' 
    ? shop.menu 
    : shop.menu.filter(item => item.name_th.includes(selectedCategory) || item.name_en?.includes(selectedCategory));

  const handleAddToCart = (menuItem: MenuItem) => {
    const cartItem: CartItem = {
      ...menuItem,
      qty: 1,
      selectedOptions: []
    };

    onAddToCart(cartItem);
    trackAddToCart(device.device_id, menuItem.sku, shop.shop_id);
  };

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

        <div className="text-center">
          <h1 className="text-xl font-bold">
            {lang === 'th' ? shop.name_th : shop.name_en}
          </h1>
        </div>

        <button
          onClick={onViewCart}
          className="touch-button relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            <span>{cartCount}</span>
          </div>
        </button>
      </div>

      {/* Categories */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`touch-button px-4 py-2 rounded-lg whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category === 'all' 
                ? (lang === 'th' ? 'ทั้งหมด' : 'All')
                : category
              }
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-4">
          {filteredMenu.map((item) => (
            <div
              key={item.sku}
              className="bg-gray-800 rounded-xl p-4 flex items-center space-x-4"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={lang === 'th' ? item.name_th : item.name_en || item.name_th}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">
                  {lang === 'th' ? item.name_th : item.name_en || item.name_th}
                </h3>
                <div className="text-blue-400 font-bold text-lg">
                  ฿{item.price.toFixed(2)}
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(item)}
                className="touch-button bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>{lang === 'th' ? 'เพิ่ม' : 'Add'}</span>
                </div>
              </button>
            </div>
          ))}
        </div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              {lang === 'th' ? 'ไม่มีเมนูในหมวดนี้' : 'No items in this category'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}