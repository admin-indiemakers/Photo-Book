"use client";

import React from 'react';
import Link from 'next/link';
import {
  ScrapbookNavbar,
  ScrapbookFooter,
  AuthenticWaxSeal
} from '@/components/ui/landingpage';

export default function ReturnsPage() {
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
              Returns & Quality Guarantee
            </h1>

            <p className="font-glory text-xl md:text-2xl text-[#3A342D]/85 font-bold leading-relaxed max-w-xl mx-auto">
              Our 100% Love It Or Free Reprint Promise. ♡
            </p>
          </div>
        </section>

        {/* 2. Content Card */}
        <section className="px-4 sm:px-6 md:px-12 max-w-3xl mx-auto">
          <div className="bg-[#FAF6EE] p-8 sm:p-12 rounded-3xl border border-[#DDD5C5] shadow-xl relative space-y-8">
            <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />

            <div>
              <h2
                className="text-2xl text-[#3A342D] mb-3"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                Our 100% Quality Promise
              </h2>
              <p className="font-glory text-xl text-[#3A342D]/90 leading-relaxed font-bold">
                We want you to hold your photobook and smile every single time. Because each item is uniquely custom-printed with your personal photos, we cannot accept general returns for change of mind. However, <strong className="text-[#C27871]">we stand 100% behind our manufacturing quality</strong>.
              </p>
            </div>

            <div className="border-t border-[#DDD5C5] pt-6">
              <h2
                className="text-2xl text-[#3A342D] mb-3"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                What Qualifies for a Free Reprint?
              </h2>
              <ul className="space-y-3 font-glory text-lg text-[#3A342D] font-bold">
                <li>• Damage during transit (bent corners, crushed box, water damage)</li>
                <li>• Manufacturing defects (loose pages, misaligned binding)</li>
                <li>• Printing errors not present in your digital preview file</li>
              </ul>
            </div>

            <div className="border-t border-[#DDD5C5] pt-6">
              <h2
                className="text-2xl text-[#3A342D] mb-3"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                How to Request a Replacement
              </h2>
              <p className="font-glory text-lg text-[#3A342D]/90 leading-relaxed font-bold mb-6">
                Simply take 2-3 photos of the defect and email them with your order number to <strong className="text-[#C27871]">offlinelivingsupport@gmail.com</strong>. Our team will fast-track a free reprint into production within 24 hours!
              </p>

              <Link
                href="/contact"
                className="inline-block px-8 py-3.5 bg-[#C27871] text-white rounded-full font-protest text-xs uppercase tracking-wider hover:bg-[#3A342D] transition-all shadow-md"
              >
                Contact Support Team
              </Link>
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
