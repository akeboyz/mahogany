import { doc, addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';
import { AnalyticsEvent } from './types';

export const trackEvent = async (event: AnalyticsEvent) => {
  try {
    await addDoc(collection(db, 'analytics'), {
      ...event,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

export const trackImpression = (deviceId: string, itemKey: string) => {
  trackEvent({
    type: 'impression',
    device_id: deviceId,
    timestamp: Date.now(),
    data: { item_key: itemKey }
  });
};

export const trackTap = (deviceId: string, target: string) => {
  trackEvent({
    type: 'tap',
    device_id: deviceId,
    timestamp: Date.now(),
    data: { target }
  });
};

export const trackMenuOpen = (deviceId: string) => {
  trackEvent({
    type: 'menu_open',
    device_id: deviceId,
    timestamp: Date.now()
  });
};

export const trackAddToCart = (deviceId: string, sku: string, shopId: string) => {
  trackEvent({
    type: 'add_to_cart',
    device_id: deviceId,
    timestamp: Date.now(),
    data: { sku, shop_id: shopId }
  });
};

export const trackPaymentSuccess = (deviceId: string, orderId: string) => {
  trackEvent({
    type: 'payment_success',
    device_id: deviceId,
    timestamp: Date.now(),
    data: { order_id: orderId }
  });
};

export const trackLeadSubmit = (deviceId: string, unitId: string) => {
  trackEvent({
    type: 'lead_submit',
    device_id: deviceId,
    timestamp: Date.now(),
    data: { unit_id: unitId }
  });
};