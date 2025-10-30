'use client';

import { Device, PlaylistItem } from '../../../lib/types';

interface CTAOverlayProps {
  cta: PlaylistItem['cta'];
  onClick: () => void;
  device: Device;
}

export default function CTAOverlay({ cta, onClick, device }: CTAOverlayProps) {
  if (!cta) return null;

  const getCTAText = () => {
    const lang = device.app_config.lang_default;
    
    switch (cta.open) {
      case 'menu':
        return lang === 'th' ? 'แตะเพื่อดูเมนู' : 'Tap for Menu';
      case 'dine_cart':
        return lang === 'th' ? 'สั่งอาหาร' : 'Order Food';
      case 'property_list':
        return lang === 'th' ? 'ดูห้องพัก' : 'View Units';
      case 'detail':
        return lang === 'th' ? 'ดูรายละเอียด' : 'View Details';
      default:
        return lang === 'th' ? 'แตะที่นี่' : 'Tap Here';
    }
  };

  return (
    <div className="cta-overlay">
      <button
        onClick={onClick}
        className="touch-button bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow-lg border-2 border-blue-400"
      >
        <div className="flex items-center space-x-2">
          <span>{getCTAText()}</span>
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </button>
    </div>
  );
}