'use client';

import { useState } from 'react';
import { Device, Unit } from '@/lib/types';

interface UnitDetailsProps {
  unit: Unit;
  device: Device;
  onRequestCallback: () => void;
  onBack: () => void;
}

export default function UnitDetails({ unit, device, onRequestCallback, onBack }: UnitDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const lang = device.app_config.lang_default;

  const getUnitStatusText = () => {
    if (unit.condition.for_sale && unit.condition.for_rent) {
      return lang === 'th' ? 'ขาย/ให้เช่า' : 'For Sale/Rent';
    } else if (unit.condition.for_sale) {
      return lang === 'th' ? 'ขาย' : 'For Sale';
    } else if (unit.condition.for_rent) {
      return lang === 'th' ? 'ให้เช่า' : 'For Rent';
    }
    return '';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % unit.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + unit.images.length) % unit.images.length);
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
        
        <h1 className="text-xl font-bold text-center">
          {unit.project}<br />
          <span className="text-sm text-gray-400">{unit.room_type}</span>
        </h1>
        
        <div className="w-16"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Image Gallery */}
        {unit.images.length > 0 && (
          <div className="relative bg-gray-800">
            <img
              src={unit.images[currentImageIndex]}
              alt={`${unit.project} ${unit.room_type}`}
              className="w-full h-64 object-cover"
            />
            
            {unit.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="touch-button absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextImage}
                  className="touch-button absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-2">
                    {unit.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Unit Details */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex justify-center">
            <span className="px-6 py-2 bg-green-600 text-white text-lg rounded-full">
              {getUnitStatusText()}
            </span>
          </div>

          {/* Price */}
          <div className="text-center space-y-2">
            {unit.condition.for_sale && unit.condition.selling_price && (
              <div className="text-2xl font-bold text-blue-400">
                {lang === 'th' ? 'ขาย' : 'Sale Price'}: ฿{unit.condition.selling_price.toLocaleString()}
              </div>
            )}
            {unit.condition.for_rent && unit.condition.rental_price && (
              <div className="text-2xl font-bold text-green-400">
                {lang === 'th' ? 'ค่าเช่า' : 'Rental Price'}: ฿{unit.condition.rental_price.toLocaleString()}/{lang === 'th' ? 'เดือน' : 'month'}
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-2 gap-4 bg-gray-800 rounded-xl p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{unit.size_sqm}</div>
              <div className="text-gray-400">{lang === 'th' ? 'ตร.ม.' : 'sqm'}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{unit.floor}</div>
              <div className="text-gray-400">{lang === 'th' ? 'ชั้น' : 'Floor'}</div>
            </div>
          </div>

          {/* Available Date */}
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <div className="text-gray-400 mb-1">
              {lang === 'th' ? 'วันที่พร้อมอยู่' : 'Available From'}
            </div>
            <div className="text-lg font-semibold text-white">
              {new Date(unit.available_from).toLocaleDateString(
                lang === 'th' ? 'th-TH' : 'en-US',
                { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-6 border-t border-gray-700 bg-gray-800">
        <button
          onClick={onRequestCallback}
          className="touch-button w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-xl font-semibold"
        >
          {lang === 'th' ? 'ขอให้โทรกลับ' : 'Request Callback'}
        </button>
        
        <p className="text-center text-gray-400 text-sm mt-3">
          {lang === 'th' 
            ? 'เจ้าหน้าที่จะติดต่อกลับเพื่อนัดชมห้อง'
            : 'Our agent will call to schedule a viewing'
          }
        </p>
      </div>
    </div>
  );
}