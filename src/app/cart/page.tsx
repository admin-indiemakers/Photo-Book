'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCart } from '../actions/cart';
import { supabase } from '@/lib/supabase';

export default function CartPage() {
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        setError('Please log in to view your cart.');
        setLoading(false);
        return;
      }
      getCart(session.user.id).then((res) => {
        if (res.success && res.cart) {
          setCartData(res.cart);
        } else {
          setError(res.error || 'Cart not found');
        }
        setLoading(false);
      });
    });
  }, []);

  if (loading) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

  if (error || !cartData) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center bg-theme-ivory">
        <h1 className="text-3xl font-serif text-theme-black mb-4">Your Cart</h1>
        <p className="text-theme-black/60 mb-8">{error || 'Please log in to view your cart.'}</p>
        <Link href="/login" className="bg-[#1a1a18] text-white px-8 py-3 rounded hover:bg-black transition-colors">
          Log In
        </Link>
      </div>
    );
  }

  const items = cartData?.cart_items || [];
  const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-theme-ivory">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-serif text-theme-black mb-12">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-black/5">
            <h2 className="text-xl font-medium text-theme-black mb-4">Your cart is empty</h2>
            <p className="text-theme-black/60 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/" className="bg-[#E85D26] text-white px-8 py-3 rounded hover:bg-[#d0501f] transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item: any) => (
                <div key={item.id} className="flex gap-6 bg-white p-6 rounded-lg shadow-sm border border-black/5">
                  {item.custom_options?.items?.[0]?.url || item.products?.images?.[0] ? (
                    <img 
                      src={item.custom_options?.items?.[0]?.url || item.products?.images?.[0]} 
                      alt={item.products?.name || 'Product'} 
                      className="w-24 h-24 rounded object-cover flex-shrink-0 border border-black/10"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded object-cover flex-shrink-0 flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-theme-black mb-1">{item.products?.name || 'Product'}</h3>
                    <p className="text-sm text-theme-black/60 mb-4">Quantity: {item.quantity}</p>
                    {item.custom_options && Object.keys(item.custom_options).map(key => {
                      const val = item.custom_options[key];
                      let displayVal = val;
                      if (Array.isArray(val)) displayVal = `${val.length} items configured`;
                      else if (typeof val === 'object') displayVal = JSON.stringify(val);
                      
                      return (
                        <p key={key} className="text-xs text-theme-black/50 mb-1 capitalize">{key}: {displayVal}</p>
                      );
                    })}
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-theme-black">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-black/5 h-fit">
              <h3 className="text-xl font-serif text-theme-black mb-6">Order Summary</h3>
              <div className="flex justify-between mb-4 text-theme-black/80">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-6 text-theme-black/80">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-black/10 pt-4 mb-8 flex justify-between font-medium text-lg text-theme-black">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <Link href="/checkout" className="block w-full bg-[#1a1a18] text-white text-center py-4 rounded font-medium hover:bg-black transition-colors">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
