'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Device, Shop, CartItem } from '@/lib/types';
import ShopList from './ShopList';
import ShopMenu from './ShopMenu';
import Cart from './Cart';
import CheckoutForm from './CheckoutForm';
import QRHandoff from './QRHandoff';

interface DineFlowProps {
  device: Device;
  onBack: () => void;
}

export default function DineFlow({ device, onBack }: DineFlowProps) {
  const [currentStep, setCurrentStep] = useState<'shops' | 'menu' | 'cart' | 'checkout' | 'success'>('shops');
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderId, setOrderId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const lang = device.app_config.lang_default;

  useEffect(() => {
    const loadShops = async () => {
      try {
        const shopsQuery = query(
          collection(db, 'shops'),
          where('type', '==', 'dine')
        );
        const shopsSnapshot = await getDocs(shopsQuery);
        const shopsData = shopsSnapshot.docs.map(doc => ({ ...doc.data() } as Shop));
        setShops(shopsData);
      } catch (error) {
        console.error('Failed to load shops:', error);
      } finally {
        setLoading(false);
      }
    };

    loadShops();
  }, []);

  const handleShopSelect = (shop: Shop) => {
    setSelectedShop(shop);
    setCurrentStep('menu');
  };

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        cartItem => cartItem.sku === item.sku && 
        JSON.stringify(cartItem.selectedOptions) === JSON.stringify(item.selectedOptions)
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].qty += item.qty;
        return updated;
      } else {
        return [...prev, item];
      }
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index: number, qty: number) => {
    if (qty === 0) {
      handleRemoveFromCart(index);
    } else {
      setCart(prev => {
        const updated = [...prev];
        updated[index].qty = qty;
        return updated;
      });
    }
  };

  const handleCheckoutSuccess = (newOrderId: string) => {
    setOrderId(newOrderId);
    setCurrentStep('success');
  };

  const handleStartOver = () => {
    setCurrentStep('shops');
    setSelectedShop(null);
    setCart([]);
    setOrderId('');
  };

  if (loading) {
    return (
      <div className="kiosk-layout flex items-center justify-center">
        <div className="text-2xl">{lang === 'th' ? 'กำลังโหลด...' : 'Loading...'}</div>
      </div>
    );
  }

  return (
    <div className="kiosk-layout bg-gray-900">
      {currentStep === 'shops' && (
        <ShopList
          shops={shops}
          device={device}
          onSelect={handleShopSelect}
          onBack={onBack}
        />
      )}

      {currentStep === 'menu' && selectedShop && (
        <ShopMenu
          shop={selectedShop}
          device={device}
          onAddToCart={handleAddToCart}
          onViewCart={() => setCurrentStep('cart')}
          onBack={() => setCurrentStep('shops')}
          cartCount={cart.reduce((sum, item) => sum + item.qty, 0)}
        />
      )}

      {currentStep === 'cart' && selectedShop && (
        <Cart
          items={cart}
          shop={selectedShop}
          device={device}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onContinueShopping={() => setCurrentStep('menu')}
          onCheckout={() => setCurrentStep('checkout')}
          onBack={() => setCurrentStep('menu')}
        />
      )}

      {currentStep === 'checkout' && selectedShop && (
        <CheckoutForm
          cart={cart}
          shop={selectedShop}
          device={device}
          onSuccess={handleCheckoutSuccess}
          onBack={() => setCurrentStep('cart')}
        />
      )}

      {currentStep === 'success' && (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-green-400 mb-2">
              {lang === 'th' ? 'สั่งอาหารสำเร็จ!' : 'Order Placed!'}
            </h2>
            <p className="text-gray-300 mb-4">
              {lang === 'th' ? `หมายเลขออเดอร์: ${orderId}` : `Order ID: ${orderId}`}
            </p>
          </div>

          <QRHandoff
            device={device}
            currentRoute="/order-status"
            params={{ orderId }}
          />

          <button
            onClick={handleStartOver}
            className="touch-button mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-semibold"
          >
            {lang === 'th' ? 'สั่งใหม่อีกครั้ง' : 'Place Another Order'}
          </button>
        </div>
      )}
    </div>
  );
}