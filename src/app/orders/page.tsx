'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getUserOrders } from '../actions/orders';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScrapbookNavbar,
  ScrapbookFooter
} from '@/components/ui/landingpage';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrders() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setError('Please log in to view your order history.');
        setLoading(false);
        return;
      }

      const res = await getUserOrders(session.user.id, session.user.email);

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

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? window.location.href : ''
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F3EA] text-[#3A342D] flex flex-col" suppressHydrationWarning>
        <ScrapbookNavbar />
        <div className="flex-1 flex flex-col items-center justify-center pt-40 pb-24 space-y-4" suppressHydrationWarning>
          <div className="w-10 h-10 border-4 border-[#DDD5C5] border-t-[#C27871] rounded-full animate-spin" />
          <p className="font-glory text-xl text-[#C27871] font-bold">Opening your order journal... ♡</p>
        </div>
        <ScrapbookFooter />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8F3EA] text-[#3A342D] relative" suppressHydrationWarning>
        <div className="grain-overlay" />
        <ScrapbookNavbar />

        <div className="flex-1 flex flex-col items-center justify-center pt-36 pb-24 px-6 relative z-10 w-full max-w-xl mx-auto" suppressHydrationWarning>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full text-center py-16 px-8 bg-[#FAF6EE] rounded-3xl border border-[#DDD5C5] shadow-xl relative"
            suppressHydrationWarning
          >
            <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />
            <h1
              className="text-3xl md:text-5xl text-[#3A342D] mb-3"
              style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
            >
              Your Order History
            </h1>
            <p className="font-glory text-xl text-[#3A342D]/80 mb-8 font-bold">
              {error}
            </p>
            <button
              onClick={handleGoogleLogin}
              className="px-8 py-4 bg-[#C27871] text-white rounded-full font-protest text-xs uppercase tracking-wider hover:bg-[#3A342D] transition-all shadow-md"
            >
              Sign In to View Orders
            </button>
          </motion.div>
        </div>

        <ScrapbookFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F3EA] text-[#3A342D] font-sans antialiased relative" suppressHydrationWarning>
      <div className="grain-overlay" />
      <ScrapbookNavbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 pb-24 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center md:text-left">
          <h1
            className="text-3xl md:text-5xl text-[#3A342D]"
            style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
          >
            Your Memory Orders
          </h1>
          <p className="font-glory text-xl text-[#3A342D]/85 font-bold mt-1">
            Track your handcrafted keepsakes from our printing press to your hands. ♡
          </p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-[#FAF6EE] rounded-3xl border border-[#DDD5C5] shadow-lg max-w-xl mx-auto p-8 relative"
          >
            <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />
            <h2
              className="text-2xl sm:text-3xl text-[#3A342D] mb-2"
              style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
            >
              No orders yet!
            </h2>
            <p className="font-glory text-lg text-[#3A342D]/80 mb-8 font-bold">
              Your memory archive is empty. Let's make your first physical keepsake! ♡
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-[#C27871] text-white rounded-full font-protest text-xs uppercase tracking-wider hover:bg-[#3A342D] transition-all shadow-md"
            >
              Explore Formats
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {orders.map((order: any, idx: number) => {
              const dateStr = new Date(order.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-[#FAF6EE] rounded-2xl border border-[#DDD5C5] shadow-lg overflow-hidden relative"
                >
                  <div className="washi-tape -top-2.5 right-10 rotate-[2deg]" />

                  {/* Header Strip */}
                  <div className="bg-[#F4EFE5] px-6 py-4 border-b border-[#DDD5C5] flex flex-wrap justify-between items-center gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#3A342D]/70 uppercase font-bold">Order Slip</span>
                        <span className="font-mono text-xs font-bold text-[#3A342D]">#{order.id.slice(0, 8)}</span>
                      </div>
                      <p className="font-glory text-sm text-[#3A342D]/70 font-bold">Placed on {dateStr}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-protest uppercase tracking-wider ${
                        order.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'processing'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-[#F8EBE6] text-[#C27871]'
                      }`}>
                        {order.status || 'Received'}
                      </span>
                      <span
                        className="text-2xl text-[#C27871]"
                        style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                      >
                        ₹{(order.total_amount || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="p-6 divide-y divide-[#DDD5C5]">
                    {(order.order_items || []).map((item: any) => (
                      <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 sm:gap-6 items-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#F4EFE5] border border-[#DDD5C5] flex-shrink-0">
                          {item.custom_options?.items?.[0]?.url || item.products?.images?.[0] ? (
                            <img
                              src={item.custom_options?.items?.[0]?.url || item.products?.images?.[0]}
                              alt={item.products?.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-glory text-xs text-[#3A342D]/40">
                              Keepsake
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h4
                            className="text-lg sm:text-xl text-[#3A342D]"
                            style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                          >
                            {item.products?.name || 'Photobook Keepsake'}
                          </h4>
                          <p className="font-glory text-sm text-[#3A342D]/70 font-bold">
                            Quantity: {item.quantity} • ₹{item.price.toFixed(2)} each
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="font-glory text-xl text-[#3A342D] font-bold">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address Footer */}
                  {order.shipping_address && (
                    <div className="bg-[#FAF6EE] px-6 py-3 border-t border-[#DDD5C5] text-xs font-glory text-[#3A342D]/70 font-bold flex flex-wrap justify-between items-center">
                      <span>
                        Delivering to: {order.shipping_address.full_name}, {order.shipping_address.city}, {order.shipping_address.state}
                      </span>
                      <Link
                        href="/products"
                        className="text-[#C27871] hover:underline"
                      >
                        Print Again
                      </Link>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      <ScrapbookFooter />
    </div>
  );
}
