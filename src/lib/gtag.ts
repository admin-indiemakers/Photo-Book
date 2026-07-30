// Google Analytics 4 (GA4) E-Commerce & Pageview Helper

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_TRACKING_ID = 'G-5FNBNK1V8P';

// Generic helper to safely send gtag events with dataLayer queue fallback
export const trackGaEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: eventName, ...params });
    }
  }
};

// 0. Pageview tracking for SPA navigation
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  } else {
    trackGaEvent('page_view', {
      page_path: url,
      page_location: typeof window !== 'undefined' ? window.location.href : url,
    });
  }
};

// 1. View Item (Product Page view)
export const trackViewItem = (item: { id: string; name: string; price: number; category?: string }) => {
  trackGaEvent('view_item', {
    currency: 'INR',
    value: item.price,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category || 'Photobooks & Frames',
        quantity: 1,
      },
    ],
  });
};

// 2. Add to Cart
export const trackAddToCart = (item: { id: string; name: string; price: number; quantity?: number; category?: string }) => {
  const qty = item.quantity || 1;
  trackGaEvent('add_to_cart', {
    currency: 'INR',
    value: item.price * qty,
    items: [
      {
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        item_category: item.category || 'Photobooks & Frames',
        quantity: qty,
      },
    ],
  });
};

// 3. View Cart
export const trackViewCart = (items: Array<{ id: string; name: string; price: number; quantity: number }>, totalValue: number) => {
  trackGaEvent('view_cart', {
    currency: 'INR',
    value: totalValue,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });
};

// 4. Begin Checkout
export const trackBeginCheckout = (items: Array<{ id: string; name: string; price: number; quantity: number }>, totalValue: number) => {
  trackGaEvent('begin_checkout', {
    currency: 'INR',
    value: totalValue,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });
};

// 5. Purchase
export const trackPurchase = (
  transactionId: string,
  items: Array<{ id: string; name: string; price: number; quantity: number }>,
  totalValue: number
) => {
  trackGaEvent('purchase', {
    transaction_id: transactionId,
    currency: 'INR',
    value: totalValue,
    items: items.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });
};

