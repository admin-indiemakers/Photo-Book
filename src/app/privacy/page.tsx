"use client";

import React from 'react';
import {
  ScrapbookNavbar,
  ScrapbookFooter,
  AuthenticWaxSeal
} from '@/components/ui/landingpage';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#F8F3EA] text-[#3A342D] font-sans antialiased relative min-h-screen">
      <div className="grain-overlay" />

      {/* Floating Scrapbook Navbar */}
      <ScrapbookNavbar />

      <main className="pt-28 pb-20">

        {/* 1. Header Section */}
        <section className="pt-8 pb-10 px-6 md:px-12 text-center relative">
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl text-[#C27871]">🔒</span>
              <h1
                className="text-4xl md:text-6xl text-[#3A342D] tracking-tight"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                Privacy & Photo Safety
              </h1>
              <span className="text-2xl text-[#C27871]">🔒</span>
            </div>

            <p className="font-glory text-xl md:text-2xl text-[#3A342D]/85 font-bold leading-relaxed max-w-xl mx-auto">
              Your memories are sacred. Here is our solemn promise to protect them. ♡
            </p>
          </div>
        </section>

        {/* 2. Content Card */}
        <section className="px-4 sm:px-6 md:px-12 max-w-3xl mx-auto">
          <div className="bg-[#FAF6EE] p-8 sm:p-12 rounded-3xl border border-[#DDD5C5] shadow-xl relative space-y-8">
            <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />

            <div className="space-y-3">
              <h2
                className="text-2xl text-[#3A342D]"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                1. Your Personal Photos Stay Yours
              </h2>
              <p className="font-glory text-lg text-[#3A342D]/90 leading-relaxed font-bold">
                Your uploaded pictures are strictly used to print your physical photobooks and keepsakes. We never sell, monetize, or use your private photos for advertising or promotional materials without your direct, written consent.
              </p>
            </div>

            <div className="border-t border-[#DDD5C5] pt-6 space-y-3">
              <h2
                className="text-2xl text-[#3A342D]"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                2. Data We Collect
              </h2>
              <p className="font-glory text-lg text-[#3A342D]/90 leading-relaxed font-bold">
                We only collect information necessary to craft and deliver your orders, including your name, email, delivery address, phone number, and print customization preferences.
              </p>
            </div>

            <div className="border-t border-[#DDD5C5] pt-6 space-y-3">
              <h2
                className="text-2xl text-[#3A342D]"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                3. Secure Payment & Storage
              </h2>
              <p className="font-glory text-lg text-[#3A342D]/90 leading-relaxed font-bold">
                All checkout transactions are processed via bank-grade 256-bit encrypted gateways. We do not store your credit card or sensitive payment details on our local servers.
              </p>
            </div>

            <div className="border-t border-[#DDD5C5] pt-6 space-y-3">
              <h2
                className="text-2xl text-[#3A342D]"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                4. Contact Our Privacy Desk
              </h2>
              <p className="font-glory text-lg text-[#3A342D]/90 leading-relaxed font-bold">
                If you ever wish to request data deletion or have questions about photo storage, email us directly at <strong className="text-[#C27871]">offlinelivingsupport@gmail.com</strong>.
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
