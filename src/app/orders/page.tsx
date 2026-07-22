'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getUserOrders } from '../actions/orders';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrders() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setError('Please log in to view your orders.');
        setLoading(false);
        return;
      }
      
      const res = await getUserOrders(session.user.id);

      if (!res.success) {
        console.error(res.error);
        setError('Failed to load orders.');
      } else {
        setOrders(res.orders || []);
      }
      setLoading(false);
    }
    loadOrders();
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

  if (error) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center bg-[#F7F5F0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="z-10 text-center max-w-md">
          <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a18] mb-4 tracking-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>Your Orders</h1>
          <p className="text-[#6b6560] mb-8 font-light text-lg">{error}</p>
          <Link href="/login" className="inline-block bg-[#1a1a18] text-white px-10 py-4 rounded-xl hover:bg-[#E85D26] hover:shadow-xl hover:shadow-[#E85D26]/20 transition-all duration-300 font-mono text-sm uppercase tracking-widest">
            Log In to Continue
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] font-sans pb-24 text-black pt-24 relative selection:bg-[#E85D26] selection:text-white">
      {/* Decorative film grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-12 lg:px-20 pt-4 lg:pt-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight mb-2 text-[#1a1a18]" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Order History
          </h1>
          <p className="text-lg text-[#6b6560] font-light">Track the status of your recent purchases and view your collection.</p>
        </motion.div>
        
        {orders.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24 bg-white/60 rounded-3xl border border-black/5 shadow-sm backdrop-blur-sm">
            <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-black/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            </div>
            <h2 className="text-2xl font-serif text-[#1a1a18] mb-3">No orders found</h2>
            <p className="text-[#6b6560] mb-10 max-w-md mx-auto font-light">You haven't placed any orders yet. Start creating your custom memories today.</p>
            <Link href="/" className="inline-block bg-[#1a1a18] text-white px-10 py-4 rounded-xl hover:bg-[#E85D26] hover:shadow-xl hover:shadow-[#E85D26]/20 transition-all duration-300 font-mono text-sm uppercase tracking-widest">
              Explore Products
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            <AnimatePresence>
              {orders.map((order, index) => (
                <motion.div 
                  key={order.id} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur rounded-3xl shadow-sm border border-black/5 overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="bg-black/5 p-4 sm:px-6 sm:py-4 border-b border-black/5 grid grid-cols-2 gap-4 sm:flex sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex flex-col">
                      <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6b6560] mb-1">Order Placed</p>
                      <p className="font-medium text-[#1a1a18] text-sm sm:text-base">{new Date(order.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    </div>
                    
                    <div className="flex flex-col items-end sm:items-center">
                      <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6b6560] mb-1">Total</p>
                      <p className="font-medium text-[#1a1a18] text-sm sm:text-base">₹{order.total_amount}</p>
                    </div>

                    <div className="flex flex-col col-span-2 pt-3 border-t border-black/10 sm:border-0 sm:pt-0 sm:col-span-1 sm:items-end">
                      <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#6b6560] mb-1">Order #</p>
                      <p className="font-medium text-[#1a1a18] text-sm font-mono">{order.id.substring(0, 8)}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-center mb-5 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-serif text-[#1a1a18]">Status</h3>
                      <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono tracking-widest uppercase font-bold bg-[#E85D26]/10 text-[#E85D26] border border-[#E85D26]/20">
                        {order.status || 'Processing'}
                      </span>
                    </div>
                    
                    {order.order_items && (
                      <div className="space-y-4">
                        {order.order_items.map((item: any, idx: number) => (
                          <div key={idx} className="flex gap-4 sm:gap-6 items-center py-4 border-t border-black/5 first:border-t-0 first:pt-0">
                            <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#f4f4f4] border border-black/5 flex-shrink-0">
                              {item.customization?.items?.[0]?.url ? (
                                <img 
                                  src={item.customization.items[0].url} 
                                  alt="Product" 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#6b6560] text-xs">
                                  No Image
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <p className="font-serif text-base sm:text-xl text-[#1a1a18] mb-0.5 sm:mb-1 leading-tight">{item.products?.name || 'Custom Product'}</p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-[#6b6560]">
                                <span>Qty: <strong className="text-[#1a1a18] font-medium">{item.quantity}</strong></span>
                              </div>
                            </div>
                            
                            <div className="hidden sm:block">
                              <Link href="/" className="text-[#E85D26] text-sm font-medium hover:underline">Buy it again</Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-4 sm:hidden pt-4 border-t border-black/5 text-center">
                      <Link href="/" className="inline-block w-full py-3.5 rounded-xl bg-[#1a1a18] text-white text-[10px] font-mono tracking-widest uppercase hover:bg-[#E85D26] transition-colors shadow-lg shadow-black/5">
                        Buy Again
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
