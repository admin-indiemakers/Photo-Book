'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCart, checkoutCart } from '../actions/cart';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India'
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }
      setUserId(session.user.id);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await checkoutCart(userId as string, formData);
    if (res.success) {
      setSuccessId(res.orderId);
    } else {
      setError(res.error || 'Checkout failed');
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

  if (successId) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center bg-theme-ivory">
        <div className="bg-white p-12 rounded-xl shadow-sm border border-black/5 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-theme-black mb-4">Order Confirmed!</h2>
          <p className="text-theme-black/60 mb-8">Thank you for your purchase. We've received your order and will begin processing it right away.</p>
          <Link href="/orders" className="inline-block bg-[#1a1a18] text-white px-8 py-3 rounded font-medium hover:bg-black transition-colors w-full">
            View My Orders
          </Link>
        </div>
      </div>
    );
  }

  const items = cartData?.cart_items || [];
  const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-6 text-center">
        <p className="mb-4 text-lg">Your cart is empty.</p>
        <Link href="/cart" className="text-blue-600 hover:underline">Go back to cart</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-theme-ivory">
      <div className="max-w-6xl mx-auto px-6">
        <Link href="/cart" className="inline-flex items-center text-theme-black/60 hover:text-theme-black mb-8 transition-colors text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Cart
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Checkout Form */}
          <div>
            <h2 className="text-2xl font-serif text-theme-black mb-8">Delivery Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-theme-black/80 mb-2">Full Name</label>
                  <input required minLength={2} type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-black/10 rounded focus:outline-none focus:border-[#E85D26] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-theme-black/80 mb-2">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-black/10 rounded focus:outline-none focus:border-[#E85D26] transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm text-theme-black/80 mb-2">Phone Number</label>
                <input required pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-black/10 rounded focus:outline-none focus:border-[#E85D26] transition-colors" />
              </div>

              <div>
                <label className="block text-sm text-theme-black/80 mb-2">Address Line 1</label>
                <input required type="text" name="address_line1" value={formData.address_line1} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-black/10 rounded focus:outline-none focus:border-[#E85D26] transition-colors" />
              </div>

              <div>
                <label className="block text-sm text-theme-black/80 mb-2">Address Line 2 (Optional)</label>
                <input type="text" name="address_line2" value={formData.address_line2} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-black/10 rounded focus:outline-none focus:border-[#E85D26] transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-theme-black/80 mb-2">City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-black/10 rounded focus:outline-none focus:border-[#E85D26] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-theme-black/80 mb-2">State</label>
                  <input required type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-black/10 rounded focus:outline-none focus:border-[#E85D26] transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-theme-black/80 mb-2">Postal Code</label>
                  <input required type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-black/10 rounded focus:outline-none focus:border-[#E85D26] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm text-theme-black/80 mb-2">Country</label>
                  <input disabled type="text" name="country" value={formData.country} className="w-full px-4 py-3 bg-gray-50 border border-black/10 rounded text-gray-500 cursor-not-allowed" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full bg-[#E85D26] text-white py-4 rounded font-medium hover:bg-[#d0501f] transition-colors mt-8 disabled:opacity-50"
              >
                {submitting ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-black/5 h-fit lg:sticky lg:top-32">
            <h3 className="text-xl font-serif text-theme-black mb-6">Order Summary</h3>
            <div className="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2">
              {items.map((item: any) => (
                <div key={item.id} className="flex gap-4">
                  {item.custom_options?.items?.[0]?.url || item.products?.images?.[0] ? (
                    <img 
                      src={item.custom_options?.items?.[0]?.url || item.products?.images?.[0]} 
                      alt={item.products?.name || 'Product'} 
                      className="w-16 h-16 rounded object-cover flex-shrink-0 border border-black/10"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded object-cover flex-shrink-0 flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                  <div className="flex-1 text-sm">
                    <p className="font-medium text-theme-black">{item.products?.name || 'Product'}</p>
                    <p className="text-theme-black/60">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">₹{item.price}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-black/10 pt-4 mb-4 flex justify-between text-sm text-theme-black/80">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-theme-black/80 mb-6">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t border-black/10 pt-4 flex justify-between font-medium text-lg text-theme-black">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
