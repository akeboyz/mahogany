'use client';

import { Device } from '../../../lib/types';
import { trackMenuOpen } from '../../../lib/analytics';
import { useEffect } from 'react';

interface MainMenuProps {
  device: Device;
  onNavigate: (view: string) => void;
  onBack: () => void;
}

export default function MainMenu({ device, onNavigate, onBack }: MainMenuProps) {
  const lang = device.app_config.lang_default;

  useEffect(() => {
    trackMenuOpen(device.device_id);
  }, [device.device_id]);

  const menuItems = [
    {
      id: 'dine',
      title_th: 'ร้านอาหาร',
      title_en: 'Dine',
      icon: '🍽️',
      color: 'bg-orange-600 hover:bg-orange-700',
    },
    {
      id: 'marketplace',
      title_th: 'ตลาด',
      title_en: 'Marketplace',
      icon: '🛍️',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      id: 'property',
      title_th: 'อสังหาริมทรัพย์',
      title_en: 'Property',
      icon: '🏢',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
  ];

  return (
    <div className="kiosk-layout bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
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
          {lang === 'th' ? 'เมนูหลัก' : 'Main Menu'}
        </h1>
        
        <div className="w-16"></div>
      </div>

      {/* Menu Grid */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="grid grid-cols-1 gap-8 w-full max-w-md">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`touch-button ${item.color} text-white p-8 rounded-xl text-center shadow-xl transform transition-all duration-200 hover:scale-105`}
            >
              <div className="text-6xl mb-4">{item.icon}</div>
              <div className="text-2xl font-bold">
                {lang === 'th' ? item.title_th : item.title_en}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center text-gray-500">
        <p className="text-sm">
          {lang === 'th' 
            ? 'เลือกหมวดหมู่ที่ต้องการ หรือรอ 45 วินาที เพื่อกลับสู่หน้าจอหลัก'
            : 'Select a category or wait 45 seconds to return to main screen'
          }
        </p>
      </div>
    </div>
  );
}