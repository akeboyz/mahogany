'use client';

import { useState } from 'react';
import { Device, Unit } from '@/lib/types';

interface LeadFormProps {
  unit: Unit;
  device: Device;
  onSubmit: (data: {
    name: string;
    phone: string;
    preferredTime: string;
    notes?: string;
  }) => void;
  onBack: () => void;
}

export default function LeadForm({ unit, device, onSubmit, onBack }: LeadFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredTime: '',
    notes: ''
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  const lang = device.app_config.lang_default;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !selectedTimeSlot) return;

    // Generate preferred time based on selected slot
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [hour] = selectedTimeSlot.split(':');
    tomorrow.setHours(parseInt(hour), 0, 0, 0);

    onSubmit({
      ...formData,
      preferredTime: tomorrow.toISOString()
    });
  };

  // Generate time slots (9 AM to 6 PM)
  const timeSlots = [];
  for (let hour = 9; hour <= 18; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    const displayTime = lang === 'th' 
      ? `${hour.toString().padStart(2, '0')}.00 น.`
      : `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
    timeSlots.push({ value: time, label: displayTime });
  }

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
          {lang === 'th' ? 'ขอให้โทรกลับ' : 'Request Callback'}
        </h1>
        
        <div className="w-16"></div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Unit Summary */}
          <div className="bg-gray-800 rounded-xl p-4 text-center">
            <h3 className="font-bold text-lg mb-1">
              {unit.project} - {unit.room_type}
            </h3>
            <p className="text-gray-400 text-sm">
              {unit.size_sqm} {lang === 'th' ? 'ตร.ม.' : 'sqm'} | {lang === 'th' ? 'ชั้น' : 'Floor'} {unit.floor}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">
              {lang === 'th' ? 'ข้อมูลติดต่อ' : 'Contact Information'}
            </h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                {lang === 'th' ? 'ชื่อ *' : 'Name *'}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder={lang === 'th' ? 'กรอกชื่อ-นามสกุล' : 'Enter your full name'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {lang === 'th' ? 'เบอร์โทรศัพท์ *' : 'Phone Number *'}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder={lang === 'th' ? 'กรอกเบอร์โทรศัพท์' : 'Enter phone number'}
              />
            </div>
          </div>

          {/* Preferred Time */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">
              {lang === 'th' ? 'เวลาที่สะดวกรับสาย' : 'Preferred Call Time'}
            </h3>
            <p className="text-gray-400 text-sm">
              {lang === 'th' ? 'เลือกช่วงเวลาที่สะดวกรับสายพรุ่งนี้' : 'Select a convenient time for tomorrow'}
            </p>
            
            <div className="grid grid-cols-3 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.value}
                  onClick={() => setSelectedTimeSlot(slot.value)}
                  className={`touch-button p-3 rounded-lg border text-sm font-medium ${
                    selectedTimeSlot === slot.value
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {lang === 'th' ? 'หมายเหตุเพิ่มเติม' : 'Additional Notes'}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              rows={3}
              placeholder={lang === 'th' ? 'ข้อมูลเพิ่มเติม (ถ้ามี)' : 'Any additional information (optional)'}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-700 bg-gray-800">
        <button
          onClick={handleSubmit}
          disabled={!formData.name || !formData.phone || !selectedTimeSlot}
          className="touch-button w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-lg text-xl font-semibold"
        >
          {lang === 'th' ? 'ส่งข้อมูล' : 'Submit Request'}
        </button>
        
        <p className="text-center text-gray-400 text-xs mt-3">
          {lang === 'th' 
            ? 'เจ้าหน้าที่จะติดต่อกลับตามเวลาที่เลือก'
            : 'Our agent will call at your selected time'
          }
        </p>
      </div>
    </div>
  );
}