"use client";

import React from 'react';
import {
  ScrapbookNavbar,
  ScrapbookFooter,
  AuthenticWaxSeal
} from '@/components/ui/landingpage';

export default function TermsOfServicePage() {
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
              <span className="text-2xl text-[#C27871]">📜</span>
              <h1
                className="text-4xl md:text-6xl text-[#3A342D] tracking-tight"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                Terms & Conditions
              </h1>
              <span className="text-2xl text-[#C27871]">📜</span>
            </div>

            <p className="font-glory text-xl md:text-2xl text-[#3A342D]/85 font-bold leading-relaxed max-w-xl mx-auto">
              Our fair and friendly community agreement for using Offline Living. ♡
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
                1. Studio Services
              </h2>
              <p className="font-glory text-lg text-[#3A342D]/90 leading-relaxed font-bold">
                Offline Living provides a creative studio platform for individuals to design, customize, and order printed photobooks, polaroids, frames, and tangible keepsakes.
              </p>
            </div>

            <div className="border-t border-[#DDD5C5] pt-6 space-y-3">
              <h2
                className="text-2xl text-[#3A342D]"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                2. User Uploads & Rights
              </h2>
              <p className="font-glory text-lg text-[#3A342D]/90 leading-relaxed font-bold">
                You retain full copyright ownership of all photos you upload. By uploading, you confirm that you own the rights to the photos or have permission from the subjects depicted.
              </p>
            </div>

            <div className="border-t border-[#DDD5C5] pt-6 space-y-3">
              <h2
                className="text-2xl text-[#3A342D]"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                3. Custom Printing Orders
              </h2>
              <p className="font-glory text-lg text-[#3A342D]/90 leading-relaxed font-bold">
                Because each item is custom crafted on demand, orders cannot be cancelled once they have entered the physical printing and binding stage.
              </p>
            </div>

            <div className="border-t border-[#DDD5C5] pt-6 space-y-3">
              <h2
                className="text-2xl text-[#3A342D]"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                4. Quality Guarantee & Support
              </h2>
              <p className="font-glory text-lg text-[#3A342D]/90 leading-relaxed font-bold">
                If your physical order contains any manufacturing defect or shipping damage, we provide a 100% free reprint within 14 days of delivery.
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
