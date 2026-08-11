'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCart, removeFromCart } from '../actions/cart';
import { supabase } from '@/lib/supabase';
import {
  ScrapbookNavbar,
  ScrapbookFooter
} from '@/components/ui/landingpage';
import { motion, AnimatePresence } from 'framer-motion';
import { trackViewCart } from '@/lib/gtag';

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
          const cartItems = (res.cart.cart_items || []).map((i: any) => ({
            id: i.product_id || i.id,
            name: i.products?.name || 'Product',
            price: Number(i.price) || 0,
            quantity: Number(i.quantity) || 1,
          }));
          const totalVal = cartItems.reduce((acc: number, curr: any) => acc + curr.price * curr.quantity, 0);
          trackViewCart(cartItems, totalVal);
        } else {
          setError(res.error || 'Failed to load cart');
        }
        setLoading(false);
      });
    });
  }, []);

  const handleRemove = async (itemId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    await removeFromCart(session.user.id, itemId);
    const res = await getCart(session.user.id);
    if (res.success && res.cart) {
      setCartData(res.cart);
    }
  };

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
          <p className="font-glory text-xl text-[#C27871] font-bold">Unpacking your keepsakes... ♡</p>
        </div>
        <ScrapbookFooter />
      </div>
    );
  }

  if (error || !cartData) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8F3EA] text-[#3A342D] relative" suppressHydrationWarning>
        <div className="grain-overlay" />
        <ScrapbookNavbar />

        <div className="flex-1 flex flex-col items-center justify-center pt-36 pb-24 px-6 relative z-10 w-full max-w-2xl mx-auto" suppressHydrationWarning>
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
              Your Keepsake Bag
            </h1>
            <p className="font-glory text-xl text-[#3A342D]/80 mb-8 font-bold max-w-md mx-auto">
              {error || 'Please sign in to view and save your custom prints. ♡'}
            </p>

            {error === 'Please log in to view your cart.' ? (
              <button
                onClick={handleGoogleLogin}
                className="px-8 py-4 bg-[#C27871] text-white rounded-full font-protest text-xs uppercase tracking-wider hover:bg-[#3A342D] transition-all shadow-md"
              >
                Sign In with Google
              </button>
            ) : (
              <Link
                href="/products"
                className="px-8 py-4 bg-[#C27871] text-white rounded-full font-protest text-xs uppercase tracking-wider hover:bg-[#3A342D] transition-all shadow-md inline-block"
              >
                Browse Collections
              </Link>
            )}
          </motion.div>
        </div>

        <ScrapbookFooter />
      </div>
    );
  }

  const items = cartData?.cart_items || [];
  const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-[#F8F3EA] text-[#3A342D] font-sans antialiased relative" suppressHydrationWarning>
      <div className="grain-overlay" />
      <ScrapbookNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 pb-24 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center md:text-left">
          <h1
            className="text-3xl md:text-5xl text-[#3A342D]"
            style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
          >
            Your Keepsake Bag
          </h1>
          <p className="font-glory text-xl text-[#3A342D]/85 font-bold mt-1">
            Review your custom memory keepsakes before we craft them. ♡
          </p>
        </motion.div>

        {items.length === 0 ? (
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
              Your bag is currently empty
            </h2>
            <p className="font-glory text-lg text-[#3A342D]/80 mb-8 font-bold">
              You haven't added any customized keepsakes yet. Let's make something real! ♡
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-[#C27871] text-white rounded-full font-protest text-xs uppercase tracking-wider hover:bg-[#3A342D] transition-all shadow-md"
            >
              Explore Formats
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Items List */}
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence>
                {items.map((item: any, index: number) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.08 }}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 bg-[#FAF6EE] p-5 sm:p-6 rounded-2xl shadow-md border border-[#DDD5C5] relative group"
                  >
                    {/* Item Polaroid Photo Thumbnail */}
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-[#F4EFE5] flex-shrink-0 border border-[#DDD5C5]">
                      {item.custom_options?.items?.[0]?.url || item.products?.images?.[0] ? (
                        <img
                          src={item.custom_options?.items?.[0]?.url || item.products?.images?.[0]}
                          alt={item.products?.name || 'Product'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center font-glory text-sm text-[#3A342D]/40">
                          No Preview
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3
                            className="text-xl sm:text-2xl text-[#3A342D]"
                            style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                          >
                            {item.products?.name || 'Photobook Keepsake'}
                          </h3>
                          <span className="font-glory text-2xl text-[#C27871] font-bold">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        <p className="font-glory text-base text-[#3A342D]/80 font-bold mt-1">
                          Quantity: {item.quantity} • ₹{item.price.toFixed(2)} each
                        </p>

                        {/* Options preview */}
                        {item.custom_options && (
                          <div className="mt-2 space-y-1 bg-[#F4EFE5] p-2.5 rounded-lg border border-[#DDD5C5] text-xs font-glory text-[#3A342D] font-bold">
                            {Object.keys(item.custom_options).map(key => {
                              if (key === 'items' || key === 'pdfData') return null;
                              const val = item.custom_options[key];
                              let displayVal = val;
                              if (Array.isArray(val)) displayVal = `${val.length} photos chosen`;
                              return (
                                <p key={key} className="capitalize">
                                  <span className="text-[#C27871]">{key}:</span> {String(displayVal)}
                                </p>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 mt-3 border-t border-[#DDD5C5] flex justify-end">
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="font-glory text-sm text-red-500 hover:text-red-700 font-bold transition-colors"
                        >
                          Remove slip
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Receipt Summary Card */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-[#FAF6EE] p-6 sm:p-8 rounded-2xl border-2 border-dashed border-[#C27871]/40 shadow-xl relative space-y-5"
              >
                <div className="washi-tape -top-3 right-6 rotate-[3deg]" />

                <div className="border-b border-[#DDD5C5] pb-3">
                  <h3
                    className="text-2xl text-[#3A342D]"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    Keepsake Summary
                  </h3>
                </div>

                <div className="space-y-3 font-glory text-lg text-[#3A342D] font-bold">
                  <div className="flex justify-between">
                    <span>Subtotal ({items.length} items)</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-[#DDD5C5]">
                    <span>Shipping</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-sm">FREE</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-xl">Grand Total</span>
                    <span
                      className="text-3xl text-[#C27871]"
                      style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                    >
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 bg-[#C27871] text-white text-center rounded-full font-protest text-xs uppercase tracking-wider hover:bg-[#3A342D] transition-all shadow-md block"
                >
                  Proceed to Checkout
                </Link>

                <div className="pt-2 text-center font-glory text-sm text-[#3A342D]/70 font-bold">
                  Archival Quality Guarantee Included ♡
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </main>

      <ScrapbookFooter />
    </div>
  );
}
