'use client';

import { Device, Unit } from '@/lib/types';

interface UnitListProps {
  units: Unit[];
  device: Device;
  onSelect: (unit: Unit) => void;
  onBack: () => void;
}

export default function UnitList({ units, device, onSelect, onBack }: UnitListProps) {
  const lang = device.app_config.lang_default;

  const getUnitStatusText = (unit: Unit) => {
    if (unit.condition.for_sale && unit.condition.for_rent) {
      return lang === 'th' ? 'ขาย/เช่า' : 'Sale/Rent';
    } else if (unit.condition.for_sale) {
      return lang === 'th' ? 'ขาย' : 'For Sale';
    } else if (unit.condition.for_rent) {
      return lang === 'th' ? 'ให้เช่า' : 'For Rent';
    }
    return '';
  };

  const getUnitPrice = (unit: Unit) => {
    const prices = [];
    if (unit.condition.for_sale && unit.condition.selling_price) {
      prices.push(`${lang === 'th' ? 'ขาย' : 'Sale'}: ฿${unit.condition.selling_price.toLocaleString()}`);
    }
    if (unit.condition.for_rent && unit.condition.rental_price) {
      prices.push(`${lang === 'th' ? 'เช่า' : 'Rent'}: ฿${unit.condition.rental_price.toLocaleString()}/${lang === 'th' ? 'เดือน' : 'mo'}`);
    }
    return prices.join(' | ');
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
        
        <h1 className="text-2xl font-bold">
          {lang === 'th' ? 'เลือกห้องพัก' : 'Available Units'}
        </h1>
        
        <div className="w-16"></div>
      </div>

      {/* Unit Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 gap-4">
          {units.map((unit) => (
            <button
              key={unit.unit_id}
              onClick={() => onSelect(unit)}
              className="touch-button bg-gray-800 hover:bg-gray-700 rounded-xl p-6 text-left transition-colors"
            >
              <div className="flex items-start space-x-4">
                {unit.images.length > 0 && (
                  <img
                    src={unit.images[0]}
                    alt={`${unit.project} ${unit.room_type}`}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white truncate">
                      {unit.project} - {unit.room_type}
                    </h3>
                    <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full flex-shrink-0 ml-2">
                      {getUnitStatusText(unit)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-gray-300 text-sm mb-3">
                    <div>
                      <span className="text-gray-500">{lang === 'th' ? 'ขนาด:' : 'Size:'}</span> {unit.size_sqm} {lang === 'th' ? 'ตร.ม.' : 'sqm'}
                    </div>
                    <div>
                      <span className="text-gray-500">{lang === 'th' ? 'ชั้น:' : 'Floor:'}</span> {unit.floor}
                    </div>
                  </div>
                  
                  <div className="text-lg font-bold text-blue-400">
                    {getUnitPrice(unit)}
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-1">
                    {lang === 'th' ? 'พร้อมอยู่:' : 'Available:'} {new Date(unit.available_from).toLocaleDateString()}
                  </div>
                </div>

                <svg className="w-6 h-6 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {units.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-xl">
              {lang === 'th' ? 'ไม่มีห้องพักว่างในขณะนี้' : 'No units available at this time'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}