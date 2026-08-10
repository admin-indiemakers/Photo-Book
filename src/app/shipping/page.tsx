"use client";

import React from 'react';
import Link from 'next/link';
import {
  ScrapbookNavbar,
  ScrapbookFooter,
  AuthenticWaxSeal
} from '@/components/ui/landingpage';

export default function ShippingPage() {
  return (
    <div className="bg-[#F8F3EA] text-[#3A342D] font-sans antialiased relative min-h-screen">
      <div className="grain-overlay" />

      {/* Floating Scrapbook Navbar */}
      <ScrapbookNavbar />

      <main className="pt-28 pb-20">

        {/* 1. Header Section */}
        <section className="pt-8 pb-10 px-6 md:px-12 text-center relative">
          <div className="max-w-3xl mx-auto space-y-3">
            <h1
              className="text-4xl md:text-6xl text-[#3A342D] tracking-tight"
              style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
            >
              Shipping & Delivery
            </h1>

            <p className="font-glory text-xl md:text-2xl text-[#3A342D]/85 font-bold leading-relaxed max-w-xl mx-auto">
              How we carefully package and deliver your physical memory keepsakes. ♡
            </p>
          </div>
        </section>

        {/* 2. Policy Card */}
        <section className="px-4 sm:px-6 md:px-12 max-w-3xl mx-auto">
          <div className="bg-[#FAF6EE] p-8 sm:p-12 rounded-3xl border border-[#DDD5C5] shadow-xl relative space-y-8">
            <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />

            <div>
              <h2
                className="text-2xl text-[#3A342D] mb-3"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                Studio Crafting & Production Timeline
              </h2>
              <p className="font-glory text-xl text-[#3A342D]/90 leading-relaxed font-bold">
                Because every photobook and print set is individually tailored and hand-bound, our studio printing process takes <strong className="text-[#C27871]">3 to 5 business days</strong>. Every single page is hand-inspected under high-CRI studio lighting to ensure color fidelity and flawless binding.
              </p>
            </div>

            <div className="border-t border-[#DDD5C5] pt-6">
              <h2
                className="text-2xl text-[#3A342D] mb-3"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                Domestic Shipping (All India)
              </h2>
              <div className="bg-[#F4EFE5] p-5 rounded-2xl border border-[#DDD5C5] space-y-3 font-glory text-lg text-[#3A342D] font-bold">
                <div className="flex justify-between items-center">
                  <span>Standard Doorstep Delivery (3-5 days)</span>
                  <span className="text-[#C27871]">₹99 (FREE over ₹999)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Express Air Delivery (1-2 days)</span>
                  <span className="text-[#C27871]">₹199</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#DDD5C5] pt-6">
              <h2
                className="text-2xl text-[#3A342D] mb-3"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                Plastic-Free Eco Packaging
              </h2>
              <p className="font-glory text-xl text-[#3A342D]/90 leading-relaxed font-bold">
                Every print order is lovingly wrapped in tissue paper and secured with recycled cardboard corner protectors inside a sturdy keepsake box, keeping your memories safe without harming our planet.
              </p>
            </div>

            <div className="pt-4 border-t border-[#DDD5C5] flex justify-center">
              <AuthenticWaxSeal className="w-24 h-24" />
            </div>
          </div>
        </section>

      </main>

      {/* Scrapbook Footer */}
      <ScrapbookFooter />
    </div>
  );
}
