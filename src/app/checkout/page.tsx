'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCart, checkoutCart } from '../actions/cart';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    let value = e.target.value;
    if (e.target.name === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email strictly
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address (e.g., name@example.com).");
      return;
    }

    // Validate Indian phone number (10 digits, starts with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setSubmitting(true);

    const res = await checkoutCart(userId as string, formData);
    if (res.success) {
      window.location.href = '/orders';
    } else {
      setError(res.error || 'Checkout failed');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center pt-40 pb-24">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-2 border-black/10 border-t-[#E85D26] rounded-full"
        />
      </div>
    );
  }

  const items = cartData?.cart_items || [];
  const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  if (items.length === 0 || error) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center bg-[#F7F5F0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="z-10 text-center max-w-md">
          <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <h2 className="text-3xl font-serif text-[#1a1a18] mb-4">Your cart is empty</h2>
          <p className="text-[#6b6560] mb-8">{error || 'Please add items to your cart to proceed with checkout.'}</p>
          <Link href="/cart" className="inline-block bg-[#1a1a18] text-white px-10 py-4 rounded-xl hover:bg-[#E85D26] hover:shadow-xl hover:shadow-[#E85D26]/20 transition-all duration-300 font-mono text-sm uppercase tracking-widest">
            Return to Cart
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] font-sans pb-24 text-black pt-40 relative selection:bg-[#E85D26] selection:text-white">
      {/* Decorative film grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-12 lg:px-20 pt-4 lg:pt-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-[#6b6560] hover:text-[#E85D26] mb-6 transition-colors text-sm font-medium group">
            <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Cart
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-[#1a1a18]" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Secure Checkout
          </h1>
        </motion.div>
        
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur rounded-3xl p-5 sm:p-10 shadow-sm border border-black/5"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#E85D26] mb-6 flex items-center gap-2 font-bold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Delivery Information
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-widest text-[#6b6560]">Full Name *</label>
                    <input required minLength={2} type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="w-full px-4 py-3.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85D26]/20 focus:border-[#E85D26] transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-widest text-[#6b6560]">Email *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85D26]/20 focus:border-[#E85D26] transition-all" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#6b6560]">Phone Number *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-[#6b6560] font-medium">+91</div>
                    <input required maxLength={10} pattern="[6-9][0-9]{9}" title="Please enter a valid 10-digit phone number" type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full pl-12 pr-4 py-3.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85D26]/20 focus:border-[#E85D26] transition-all" placeholder="9876543210" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#6b6560]">Address Line 1 *</label>
                  <input required type="text" name="address_line1" value={formData.address_line1} onChange={handleChange} className="w-full px-4 py-3.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85D26]/20 focus:border-[#E85D26] transition-all" placeholder="House/Flat No., Building Name" />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-widest text-[#6b6560]">Address Line 2 (Optional)</label>
                  <input type="text" name="address_line2" value={formData.address_line2} onChange={handleChange} className="w-full px-4 py-3.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85D26]/20 focus:border-[#E85D26] transition-all" placeholder="Street, Landmark, Area" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-widest text-[#6b6560]">City *</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85D26]/20 focus:border-[#E85D26] transition-all" placeholder="Mumbai" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-widest text-[#6b6560]">State *</label>
                    <input required type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85D26]/20 focus:border-[#E85D26] transition-all" placeholder="Maharashtra" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-widest text-[#6b6560]">Postal Code *</label>
                    <input required type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} className="w-full px-4 py-3.5 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E85D26]/20 focus:border-[#E85D26] transition-all" placeholder="400001" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-widest text-[#6b6560]">Country</label>
                    <input disabled type="text" name="country" value={formData.country} className="w-full px-4 py-3.5 bg-gray-50 border border-transparent rounded-xl text-[#a09890] cursor-not-allowed font-medium" />
                  </div>
                </div>

                <div className="sticky bottom-4 z-50 lg:static lg:bottom-auto mt-8">
                  <button 
                    type="submit" 
                    disabled={submitting}
                    className="w-full bg-[#1a1a18] text-white py-4 rounded-xl font-mono text-sm uppercase tracking-widest hover:bg-[#E85D26] hover:shadow-xl hover:shadow-[#E85D26]/20 transition-all duration-300 transform lg:hover:-translate-y-1 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none flex justify-center items-center gap-2 shadow-[0_0_40px_rgba(0,0,0,0.15)] lg:shadow-none"
                  >
                    {submitting ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full" />
                        Processing...
                      </>
                    ) : (
                      `Pay ₹${total.toFixed(2)}`
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="bg-white p-5 sm:p-8 rounded-3xl shadow-xl shadow-black/5 border border-black/5 lg:sticky lg:top-32"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#E85D26] mb-6 flex items-center gap-2 font-bold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                Order Details
              </div>
              
              <div className="space-y-4 mb-8 lg:max-h-[400px] lg:overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item: any) => (
                  <div key={item.id} className="flex gap-4 p-3 hover:bg-black/5 rounded-xl transition-colors">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-black/5 flex-shrink-0 border border-black/10">
                      {item.custom_options?.items?.[0]?.url || item.products?.images?.[0] ? (
                        <img 
                          src={item.custom_options?.items?.[0]?.url || item.products?.images?.[0]} 
                          alt={item.products?.name || 'Product'} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-black/40 bg-[#f4f4f4]">
                          No Image
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="font-serif text-lg text-[#1a1a18] leading-tight mb-1">{item.products?.name || 'Product'}</p>
                      <p className="text-sm text-[#6b6560]">Qty: {item.quantity}</p>
                      {item.custom_options && Object.keys(item.custom_options).map(key => {
                        if (key === 'items' || key === 'pdfData') return null;
                        return (
                          <p key={key} className="text-xs text-[#6b6560] capitalize mt-0.5"><span className="font-medium text-[#1a1a18]">{key}:</span> {item.custom_options[key]}</p>
                        );
                      })}
                    </div>
                    
                    <div className="flex items-center">
                      <p className="font-medium text-[#E85D26]">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 pt-6 border-t border-black/10">
                <div className="flex justify-between text-sm text-[#6b6560]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1a1a18]">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#6b6560]">
                  <span>Shipping</span>
                  <span className="font-medium text-[#E85D26] text-xs bg-[#E85D26]/10 px-2 py-0.5 rounded-full">Free Delivery</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-black/5 mt-2">
                  <span className="text-lg font-medium text-[#1a1a18]">Total</span>
                  <span className="text-3xl font-serif text-[#1a1a18]">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
