'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCart, checkoutCart } from '../actions/cart';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  ScrapbookNavbar,
  ScrapbookFooter,
  AuthenticWaxSeal
} from '@/components/ui/landingpage';
import { motion } from 'framer-motion';
import { trackBeginCheckout, trackPurchase } from '@/lib/gtag';

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
        setError('Please log in to complete your checkout.');
        setLoading(false);
        return;
      }
      setUserId(session.user.id);
      getCart(session.user.id).then((res) => {
        if (res.success && res.cart) {
          setCartData(res.cart);
          const checkoutItems = (res.cart.cart_items || []).map((i: any) => ({
            id: i.product_id || i.id,
            name: i.products?.name || 'Product',
            price: Number(i.price) || 0,
            quantity: Number(i.quantity) || 1,
          }));
          const totalVal = checkoutItems.reduce((acc: number, curr: any) => acc + curr.price * curr.quantity, 0);
          trackBeginCheckout(checkoutItems, totalVal);
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

    // Validate Indian phone number
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setSubmitting(true);

    const checkoutItems = (cartData?.cart_items || []).map((i: any) => ({
      id: i.product_id || i.id,
      name: i.products?.name || 'Product',
      price: Number(i.price) || 0,
      quantity: Number(i.quantity) || 1,
    }));
    const totalVal = checkoutItems.reduce((acc: number, curr: any) => acc + curr.price * curr.quantity, 0);

    const res = await checkoutCart(userId as string, formData);
    if (res.success) {
      trackPurchase(res.orderId || `ORD_${Date.now()}`, checkoutItems, totalVal);
      window.location.href = '/orders';
    } else {
      setError(res.error || 'Checkout failed');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F3EA] text-[#3A342D] flex flex-col" suppressHydrationWarning>
        <ScrapbookNavbar />
        <div className="flex-1 flex flex-col items-center justify-center pt-40 pb-24 space-y-4" suppressHydrationWarning>
          <div className="w-10 h-10 border-4 border-[#DDD5C5] border-t-[#C27871] rounded-full animate-spin" />
          <p className="font-glory text-xl text-[#C27871] font-bold">Preparing your order receipt... ♡</p>
        </div>
        <ScrapbookFooter />
      </div>
    );
  }

  const items = cartData?.cart_items || [];
  const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  if (items.length === 0 || error) {
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
            <h2
              className="text-3xl text-[#3A342D] mb-3"
              style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
            >
              No items to checkout
            </h2>
            <p className="font-glory text-xl text-[#3A342D]/80 mb-8 font-bold">
              {error || 'Your keepsake bag is currently empty. ♡'}
            </p>
            <Link
              href="/cart"
              className="inline-block px-8 py-4 bg-[#C27871] text-white rounded-full font-protest text-xs uppercase tracking-wider hover:bg-[#3A342D] transition-all shadow-md"
            >
              Return to Bag
            </Link>
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

      <main className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 pt-32 pb-24 relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <Link
            href="/cart"
            className="font-glory text-lg text-[#C27871] font-bold hover:underline mb-2 inline-block"
          >
            Return to Keepsake Bag
          </Link>
          <h1
            className="text-3xl md:text-5xl text-[#3A342D]"
            style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
          >
            Secure Memory Checkout
          </h1>
          <p className="font-glory text-xl text-[#3A342D]/85 font-bold mt-1">
            Where your digital moments begin their journey into the real world. ♡
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Delivery Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#FAF6EE] p-6 sm:p-10 rounded-2xl border border-[#DDD5C5] shadow-xl relative"
            >
              <div className="washi-tape -top-3 left-8 rotate-[-2deg]" />

              <div className="border-b border-[#DDD5C5] pb-3 mb-6">
                <h3
                  className="text-2xl text-[#3A342D]"
                  style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                >
                  Delivery Address
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-sm font-glory font-bold border border-red-200">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs text-[#3A342D] mb-1"
                      style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                    >
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="e.g. Maya Sharma"
                      className="w-full bg-[#F4EFE5] border border-[#DDD5C5] rounded-xl px-4 py-3 font-glory text-lg text-[#3A342D] focus:outline-none focus:border-[#C27871] transition-all"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs text-[#3A342D] mb-1"
                      style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                    >
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="maya@example.com"
                      className="w-full bg-[#F4EFE5] border border-[#DDD5C5] rounded-xl px-4 py-3 font-glory text-lg text-[#3A342D] focus:outline-none focus:border-[#C27871] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs text-[#3A342D] mb-1"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    Phone Number (10 Digits) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 font-glory text-lg text-[#3A342D]/60 font-bold">+91</span>
                    <input
                      required
                      maxLength={10}
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className="w-full bg-[#F4EFE5] border border-[#DDD5C5] rounded-xl pl-14 pr-4 py-3 font-glory text-lg text-[#3A342D] focus:outline-none focus:border-[#C27871] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs text-[#3A342D] mb-1"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    Address Line 1 *
                  </label>
                  <input
                    required
                    type="text"
                    name="address_line1"
                    value={formData.address_line1}
                    onChange={handleChange}
                    placeholder="Flat/House No., Apartment or Building Name"
                    className="w-full bg-[#F4EFE5] border border-[#DDD5C5] rounded-xl px-4 py-3 font-glory text-lg text-[#3A342D] focus:outline-none focus:border-[#C27871] transition-all"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs text-[#3A342D] mb-1"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    name="address_line2"
                    value={formData.address_line2}
                    onChange={handleChange}
                    placeholder="Street, Landmark, Area"
                    className="w-full bg-[#F4EFE5] border border-[#DDD5C5] rounded-xl px-4 py-3 font-glory text-lg text-[#3A342D] focus:outline-none focus:border-[#C27871] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs text-[#3A342D] mb-1"
                      style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                    >
                      City *
                    </label>
                    <input
                      required
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Bangalore"
                      className="w-full bg-[#F4EFE5] border border-[#DDD5C5] rounded-xl px-4 py-3 font-glory text-lg text-[#3A342D] focus:outline-none focus:border-[#C27871] transition-all"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs text-[#3A342D] mb-1"
                      style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                    >
                      State *
                    </label>
                    <input
                      required
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="e.g. Karnataka"
                      className="w-full bg-[#F4EFE5] border border-[#DDD5C5] rounded-xl px-4 py-3 font-glory text-lg text-[#3A342D] focus:outline-none focus:border-[#C27871] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-xs text-[#3A342D] mb-1"
                      style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                    >
                      PIN / Postal Code *
                    </label>
                    <input
                      required
                      type="text"
                      name="postal_code"
                      value={formData.postal_code}
                      onChange={handleChange}
                      placeholder="560001"
                      className="w-full bg-[#F4EFE5] border border-[#DDD5C5] rounded-xl px-4 py-3 font-glory text-lg text-[#3A342D] focus:outline-none focus:border-[#C27871] transition-all"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-xs text-[#3A342D] mb-1"
                      style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                    >
                      Country
                    </label>
                    <input
                      disabled
                      type="text"
                      name="country"
                      value={formData.country}
                      className="w-full bg-[#EAE5D9] border border-transparent rounded-xl px-4 py-3 font-glory text-lg text-[#3A342D]/60 cursor-not-allowed font-bold"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-[#C27871] text-white rounded-full font-protest text-xs uppercase tracking-wider hover:bg-[#3A342D] transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    {submitting ? 'Placing your order...' : `Complete Order • ₹${total.toFixed(2)}`}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Right Column: Order Details Receipt Card */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#FAF6EE] p-6 sm:p-8 rounded-2xl border-2 border-dashed border-[#C27871]/40 shadow-xl relative space-y-4"
            >
              <div className="washi-tape -top-3 right-6 rotate-[3deg]" />

              <div className="border-b border-[#DDD5C5] pb-3 flex items-center justify-between">
                <h3
                  className="text-2xl text-[#3A342D]"
                  style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                >
                  Order Summary
                </h3>
                <span className="font-glory text-xs text-[#C27871] font-bold">
                  {items.length} keepsake{items.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="divide-y divide-[#DDD5C5] max-h-72 overflow-y-auto pr-1">
                {items.map((item: any) => (
                  <div key={item.id} className="py-3 flex gap-3 items-center">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#F4EFE5] border border-[#DDD5C5] flex-shrink-0">
                      {item.custom_options?.items?.[0]?.url || item.products?.images?.[0] ? (
                        <img
                          src={item.custom_options?.items?.[0]?.url || item.products?.images?.[0]}
                          alt={item.products?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-glory text-[10px] text-[#3A342D]/40">
                          Keepsake
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-base text-[#3A342D] truncate"
                        style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                      >
                        {item.products?.name || 'Photobook'}
                      </p>
                      <p className="font-glory text-xs text-[#3A342D]/70 font-bold">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <span className="font-glory text-lg text-[#C27871] font-bold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#DDD5C5] space-y-2 font-glory text-base text-[#3A342D] font-bold">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-700">FREE DELIVERY</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#DDD5C5]">
                  <span className="text-xl">Grand Total</span>
                  <span
                    className="text-3xl text-[#C27871]"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex justify-center">
                <AuthenticWaxSeal className="w-20 h-20" />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <ScrapbookFooter />
    </div>
  );
}
