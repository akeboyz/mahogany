'use client';

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Device, Shop, CartItem, Order } from '@/lib/types';
import { trackPaymentSuccess } from '@/lib/analytics';

interface CheckoutFormProps {
  cart: CartItem[];
  shop: Shop;
  device: Device;
  onSuccess: (orderId: string) => void;
  onBack: () => void;
}

export default function CheckoutForm({ cart, shop, device, onSuccess, onBack }: CheckoutFormProps) {
  const [step, setStep] = useState<'info' | 'payment' | 'processing'>('info');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    room: '',
    deliveryNote: ''
  });
  const [showMockPayment, setShowMockPayment] = useState(false);

  const lang = device.app_config.lang_default;
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = async () => {
    if (!formData.name || !formData.phone) return;

    setStep('processing');

    try {
      const orderId = `ORD-${Date.now()}`;
      
      const orderData: Order = {
        order_id: orderId,
        device_id: device.device_id,
        shop_id: shop.shop_id,
        items: cart.map((item: CartItem) => ({
          sku: item.sku,
          qty: item.qty,
          price: item.price,
          name_th: item.name_th,
          options: item.selectedOptions
        })),
        buyer: {
          name: formData.name,
          phone: formData.phone,
          room: formData.room || undefined
        },
        delivery: {
          to: formData.room || 'Pickup',
          note: formData.deliveryNote || undefined
        },
        payment: {
          method: 'qr_mock',
          status: 'pending',
          tx_ref: `TX-${Date.now()}`
        },
        status: 'placed',
        timestamps: {
          placed: Date.now()
        }
      };

      await addDoc(collection(db, 'orders'), orderData);
      setStep('payment');
      setShowMockPayment(true);
      
    } catch (error) {
      console.error('Failed to create order:', error);
      alert(lang === 'th' ? 'เกิดข้อผิดพลาด กรุณาลองใหม่' : 'Error occurred. Please try again.');
      setStep('info');
    }
  };

  const handleMockPayment = async () => {
    try {
      // In a real app, this would be handled by the webhook after actual payment
      trackPaymentSuccess(device.device_id, `ORD-${Date.now()}`);
      onSuccess(`ORD-${Date.now()}`);
    } catch (error) {
      console.error('Mock payment failed:', error);
    }
  };

  if (step === 'processing') {
    return (
      <div className="kiosk-layout flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-xl">
            {lang === 'th' ? 'กำลังสร้างออเดอร์...' : 'Creating order...'}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'payment' && showMockPayment) {
    return (
      <div className="kiosk-layout flex flex-col items-center justify-center p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {lang === 'th' ? 'สแกน QR เพื่อชำระเงิน' : 'Scan QR to Pay'}
          </h2>
          <p className="text-gray-400 mb-6">
            {lang === 'th' ? `ยอดชำระ: ฿${totalPrice.toFixed(2)}` : `Amount: ฿${totalPrice.toFixed(2)}`}
          </p>
        </div>

        {/* Mock QR Code */}
        <div className="bg-white p-8 rounded-xl mb-8">
          <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-xs text-center">
            Mock QR Code<br/>
            Payment Gateway<br/>
            ฿{totalPrice.toFixed(2)}
          </div>
        </div>

        {/* Mock Payment Button (for MVP testing) */}
        <button
          onClick={handleMockPayment}
          className="touch-button bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold mb-4"
        >
          {lang === 'th' ? '✓ จำลองการชำระเงินสำเร็จ' : '✓ Mock Payment Success'}
        </button>

        <button
          onClick={onBack}
          className="touch-button text-gray-400 hover:text-white"
        >
          {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
        </button>
      </div>
    );
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
          {lang === 'th' ? 'ข้อมูลการสั่งซื้อ' : 'Checkout'}
        </h1>
        
        <div className="w-16"></div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-md mx-auto space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-800 rounded-xl p-4">
            <h3 className="font-bold text-lg mb-3">
              {lang === 'th' ? 'สรุปออเดอร์' : 'Order Summary'}
            </h3>
            <div className="space-y-2 text-sm">
              {cart.map((item: CartItem, index: number) => (
                <div key={index} className="flex justify-between">
                  <span>{item.qty}x {lang === 'th' ? item.name_th : item.name_en || item.name_th}</span>
                  <span>฿{(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-700 mt-3 pt-3 flex justify-between font-bold text-lg">
              <span>{lang === 'th' ? 'รวมทั้งหมด' : 'Total'}</span>
              <span className="text-green-400">฿{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">
              {lang === 'th' ? 'ข้อมูลผู้สั่ง' : 'Contact Information'}
            </h3>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                {lang === 'th' ? 'ชื่อ *' : 'Name *'}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('name', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder={lang === 'th' ? 'กรอกชื่อ' : 'Enter your name'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {lang === 'th' ? 'เบอร์โทร *' : 'Phone *'}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('phone', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder={lang === 'th' ? 'กรอกเบอร์โทร' : 'Enter phone number'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {lang === 'th' ? 'หมายเลขห้อง' : 'Room Number'}
              </label>
              <input
                type="text"
                value={formData.room}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('room', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                placeholder={lang === 'th' ? 'หมายเลขห้อง (ถ้ามี)' : 'Room number (optional)'}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {lang === 'th' ? 'หมายเหตุ' : 'Notes'}
              </label>
              <textarea
                value={formData.deliveryNote}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('deliveryNote', e.target.value)}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                rows={3}
                placeholder={lang === 'th' ? 'หมายเหตุเพิ่มเติม' : 'Additional notes'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-700 bg-gray-800">
        <button
          onClick={handleSubmitOrder}
          disabled={!formData.name || !formData.phone}
          className="touch-button w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-4 rounded-lg text-xl font-semibold"
        >
          {lang === 'th' ? 'ยืนยันและชำระเงิน' : 'Confirm & Pay'}
        </button>
      </div>
    </div>
  );
}