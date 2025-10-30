'use client';

import { Device, Shop, CartItem } from '@/lib/types';

interface CartProps {
  items: CartItem[];
  shop: Shop;
  device: Device;
  onUpdateQuantity: (index: number, qty: number) => void;
  onRemoveItem: (index: number) => void;
  onContinueShopping: () => void;
  onCheckout: () => void;
  onBack: () => void;
}

export default function Cart({
  items,
  shop,
  device,
  onUpdateQuantity,
  onRemoveItem,
  onContinueShopping,
  onCheckout,
  onBack
}: CartProps) {
  const lang = device.app_config.lang_default;
  
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full">
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
            {lang === 'th' ? 'ตะกร้า' : 'Cart'}
          </h1>
          
          <div className="w-16"></div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-4">
            {lang === 'th' ? 'ตะกร้าว่าง' : 'Empty Cart'}
          </h2>
          <p className="text-gray-400 mb-8 text-center">
            {lang === 'th' 
              ? 'เพิ่มสินค้าลงในตะกร้าเพื่อเริ่มสั่งซื้อ'
              : 'Add items to your cart to get started'
            }
          </p>
          <button
            onClick={onContinueShopping}
            className="touch-button bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-semibold"
          >
            {lang === 'th' ? 'เลือกเมนู' : 'Browse Menu'}
          </button>
        </div>
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
        
        <div className="text-center">
          <h1 className="text-xl font-bold">
            {lang === 'th' ? 'ตะกร้า' : 'Cart'}
          </h1>
          <p className="text-gray-400 text-sm">
            {lang === 'th' ? shop.name_th : shop.name_en}
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-400">
            {totalItems} {lang === 'th' ? 'รายการ' : 'items'}
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={`${item.sku}-${index}`} className="bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">
                    {lang === 'th' ? item.name_th : item.name_en || item.name_th}
                  </h3>
                  <div className="text-blue-400 font-bold">
                    ฿{item.price.toFixed(2)} {lang === 'th' ? 'ต่อชิ้น' : 'each'}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onUpdateQuantity(index, item.qty - 1)}
                    className="touch-button w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  
                  <span className="text-xl font-bold w-8 text-center">{item.qty}</span>
                  
                  <button
                    onClick={() => onUpdateQuantity(index, item.qty + 1)}
                    className="touch-button w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="touch-button w-10 h-10 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center ml-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-700">
                <div className="text-gray-400">
                  {lang === 'th' ? 'รวม' : 'Subtotal'}
                </div>
                <div className="text-xl font-bold text-green-400">
                  ฿{(item.price * item.qty).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-700 bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-bold">
            {lang === 'th' ? 'ยอดรวมทั้งหมด' : 'Total'}
          </div>
          <div className="text-2xl font-bold text-green-400">
            ฿{totalPrice.toFixed(2)}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onContinueShopping}
            className="touch-button flex-1 bg-gray-600 hover:bg-gray-500 text-white py-4 rounded-lg text-lg font-semibold"
          >
            {lang === 'th' ? 'เลือกเพิ่ม' : 'Add More'}
          </button>
          
          <button
            onClick={onCheckout}
            className="touch-button flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold"
          >
            {lang === 'th' ? 'สั่งซื้อ' : 'Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}