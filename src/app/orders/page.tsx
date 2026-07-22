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
    <div className="min-h-screen bg-[#F7F5F0] font-sans pb-24 text-black pt-20 relative selection:bg-[#E85D26] selection:text-white">
      {/* Decorative film grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-16 pt-2 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight mb-2 text-[#1a1a18]" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Order History
          </h1>
          <p className="text-base sm:text-lg text-[#6b6560] font-light">Track the status of your recent purchases and view your collection.</p>
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
                  className="bg-white rounded-2xl shadow-sm border border-[#e8e2d9] overflow-hidden hover:shadow-md transition-shadow group"
                >
                  <div className="bg-[#f4f2ee] p-4 sm:px-6 sm:py-5 border-b border-[#e8e2d9] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
                    <div className="flex justify-between sm:justify-start sm:gap-12 w-full sm:w-auto">
                      <div className="flex flex-col">
                        <p className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.15em] text-[#8c857b] mb-1">Order Placed</p>
                        <p className="font-serif text-[#1a1a18] text-base">{new Date(order.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                      </div>
                      
                      <div className="flex flex-col items-end sm:items-start text-right sm:text-left">
                        <p className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.15em] text-[#8c857b] mb-1">Total</p>
                        <p className="font-serif text-[#1a1a18] text-base">₹{order.total_amount}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end w-full sm:w-auto pt-3 sm:pt-0 border-t border-[#e8e2d9] sm:border-0">
                      <p className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.15em] text-[#8c857b] mb-1">Order #</p>
                      <p className="font-mono text-[#1a1a18] text-xs">{order.id.substring(0, 8)}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-center mb-6 sm:mb-8">
                      <h3 className="text-lg sm:text-xl font-serif text-[#1a1a18]">Status</h3>
                      <span className="px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-sans tracking-[0.15em] uppercase font-semibold bg-[#E85D26]/10 text-[#E85D26] border border-[#E85D26]/20">
                        {order.status || 'Processing'}
                      </span>
                    </div>
                    
                    {order.order_items && (
                      <div className="space-y-6">
                        {order.order_items.map((item: any, idx: number) => (
                          <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center py-5 border-t border-[#e8e2d9] first:border-t-0 first:pt-0">
                            <div className="flex gap-4 w-full sm:w-auto">
                              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-[#ebe8e3] border border-[#e8e2d9] flex-shrink-0">
                                {item.customization?.items?.[0]?.url ? (
                                  <img 
                                    src={item.customization.items[0].url} 
                                    alt="Product" 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-[#8c857b] text-[10px] uppercase tracking-widest text-center px-2">
                                    No Image
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 sm:hidden flex flex-col justify-center">
                                <p className="font-serif text-lg text-[#1a1a18] mb-1 leading-tight">{item.products?.name || 'Custom Product'}</p>
                                <p className="text-xs text-[#8c857b]">Qty: <strong className="text-[#1a1a18] font-medium">
                                  {item.quantity}
                                  {item.products?.name?.toLowerCase().includes('polaroid') ? (item.quantity === 1 ? ' pack' : ' packs') : ''}
                                </strong></p>
                              </div>
                            </div>
                            
                            <div className="hidden sm:block flex-1">
                              <p className="font-serif text-xl text-[#1a1a18] mb-1.5 leading-tight">{item.products?.name || 'Custom Product'}</p>
                              <p className="text-sm text-[#8c857b]">Qty: <strong className="text-[#1a1a18] font-medium">
                                {item.quantity}
                                {item.products?.name?.toLowerCase().includes('polaroid') ? (item.quantity === 1 ? ' pack' : ' packs') : ''}
                              </strong></p>
                            </div>
                            
                            <div className="w-full sm:w-auto mt-2 sm:mt-0">
                              <Link href="/" className="inline-flex justify-center w-full sm:w-auto px-5 py-2.5 bg-white border border-[#1a1a18] text-[#1a1a18] text-[10px] uppercase tracking-[0.15em] font-medium rounded-full hover:bg-[#1a1a18] hover:text-white transition-colors duration-300">
                                Buy it again
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
