'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCart } from '../actions/cart';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

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
        if (res.success) {
          setCartData(res.cart || { cart_items: [] });
        } else {
          setError(res.error || 'Failed to load cart');
        }
        setLoading(false);
      });
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F0] flex items-center justify-center pt-24 pb-24">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-2 border-black/10 border-t-[#E85D26] rounded-full"
        />
      </div>
    );
  }

  if (error || !cartData) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center bg-[#F7F5F0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="z-10 text-center max-w-md">
          <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a18] mb-4 tracking-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>Your Cart</h1>
          <p className="text-[#6b6560] mb-8 font-light text-lg">{error || 'Please log in to view your cart.'}</p>
          {error === 'Please log in to view your cart.' ? (
            <Link href="/login" className="inline-block bg-[#1a1a18] text-white px-10 py-4 rounded-xl hover:bg-[#E85D26] hover:shadow-xl hover:shadow-[#E85D26]/20 transition-all duration-300 font-mono text-sm uppercase tracking-widest">
              Log In to Continue
            </Link>
          ) : (
            <Link href="/products" className="inline-block bg-[#1a1a18] text-white px-10 py-4 rounded-xl hover:bg-[#E85D26] hover:shadow-xl hover:shadow-[#E85D26]/20 transition-all duration-300 font-mono text-sm uppercase tracking-widest">
              Continue Shopping
            </Link>
          )}
        </motion.div>
      </div>
    );
  }

  const items = cartData?.cart_items || [];
  const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-[#F7F5F0] font-sans pb-24 text-black pt-24 relative selection:bg-[#E85D26] selection:text-white">
      {/* Decorative film grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-12 lg:px-20 pt-4 lg:pt-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-2 text-[#1a1a18]" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Shopping Cart
          </h1>
          <p className="text-lg text-[#6b6560] font-light">Review your premium selections before checkout.</p>
        </motion.div>
        
        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24 bg-white/60 rounded-3xl border border-black/5 shadow-sm backdrop-blur-sm">
            <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </div>
            <h2 className="text-2xl font-serif text-[#1a1a18] mb-3">Your cart is empty</h2>
            <p className="text-[#6b6560] mb-10 max-w-md mx-auto font-light">Looks like you haven't added anything to your cart yet. Explore our premium products to start your collection.</p>
            <Link href="/products" className="inline-block bg-[#1a1a18] text-white px-10 py-4 rounded-xl hover:bg-[#E85D26] hover:shadow-xl hover:shadow-[#E85D26]/20 transition-all duration-300 font-mono text-sm uppercase tracking-widest">
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence>
                {items.map((item: any, index: number) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-row gap-4 sm:gap-6 bg-white/80 backdrop-blur p-4 sm:p-6 rounded-2xl shadow-sm border border-black/5 hover:shadow-md hover:border-[#E85D26]/20 transition-all group"
                  >
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-black/5 flex-shrink-0 border border-black/5 group-hover:border-[#E85D26]/30 transition-colors">
                      {item.custom_options?.items?.[0]?.url || item.products?.images?.[0] ? (
                        <img 
                          src={item.custom_options?.items?.[0]?.url || item.products?.images?.[0]} 
                          alt={item.products?.name || 'Product'} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-xs text-black/30 bg-[#f4f4f4]">
                          <svg className="w-8 h-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          No Image
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-serif text-2xl text-[#1a1a18]">{item.products?.name || 'Product'}</h3>
                          <p className="font-medium text-lg text-[#E85D26]">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-sm font-medium text-[#1a1a18] mb-1">Quantity: {item.quantity} <span className="text-[#6b6560] font-normal text-xs">(₹{item.price.toFixed(2)} each)</span></p>
                          
                          <div className="space-y-1 mt-2 border-l-2 border-[#E85D26]/30 pl-3 py-1">
                            {item.custom_options && Object.keys(item.custom_options).map(key => {
                              if (key === 'items' || key === 'pdfData') return null;
                              
                              const val = item.custom_options[key];
                              let displayVal = val;
                              if (Array.isArray(val)) displayVal = `${val.length} items selected`;
                              else if (typeof val === 'object') displayVal = JSON.stringify(val);
                              
                              return (
                                <p key={key} className="text-xs text-[#6b6560] capitalize"><span className="font-medium text-[#1a1a18]">{key}:</span> {displayVal}</p>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <button className="text-xs font-mono uppercase tracking-widest text-black/40 hover:text-red-500 transition-colors flex items-center gap-1 group/btn">
                          <svg className="w-4 h-4 group-hover/btn:-rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-4 relative">
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-black/5 lg:sticky lg:top-32"
              >
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#E85D26] mb-6 flex items-center gap-2 font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Order Summary
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6b6560]">Subtotal ({items.length} items)</span>
                    <span className="font-medium text-[#1a1a18]">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6b6560]">Taxes</span>
                    <span className="font-medium text-[#1a1a18]">Included</span>
                  </div>
                  <div className="flex justify-between text-sm pb-6 border-b border-black/5">
                    <span className="text-[#6b6560]">Shipping</span>
                    <span className="font-medium text-[#E85D26] text-xs bg-[#E85D26]/10 px-2 py-0.5 rounded-full">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between items-end pt-2">
                    <span className="text-lg font-medium text-[#1a1a18]">Total</span>
                    <span className="text-3xl font-serif text-[#1a1a18]">₹{total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link href="/checkout" className="block w-full bg-[#1a1a18] text-white text-center py-4 rounded-xl font-mono text-sm uppercase tracking-widest hover:bg-[#E85D26] hover:shadow-xl hover:shadow-[#E85D26]/20 transition-all duration-300 transform hover:-translate-y-1">
                  Proceed to Checkout
                </Link>
                
                <div className="mt-6 pt-6 border-t border-black/5 grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#6b6560]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <span className="text-[10px] text-[#6b6560] leading-tight">Secure Checkout</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#6b6560]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <span className="text-[10px] text-[#6b6560] leading-tight">Order Tracking</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-[#6b6560]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    </div>
                    <span className="text-[10px] text-[#6b6560] leading-tight">Easy Returns</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

