"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ScrapbookNavbar,
  ScrapbookFooter,
  TornPaperEdgeTop,
  TornPaperEdgeBottom,
  AuthenticWaxSeal
} from '@/components/ui/landingpage';

export default function QualityPage() {
  const materials = [
    {
      title: "100% Archival Cotton Papers",
      badge: "MOHAWK SUPERFINE",
      desc: "Sourced from heritage mills, our acid-free archival papers feature a rich eggshell texture that feels warm, substantial, and timeless to the touch.",
      specs: ["148gsm Everyday Softcover", "650gsm Ultra-Thick Layflat", "FSC-Certified & Chlorine-Free"],
      img: "/images/photobook1.jpg"
    },
    {
      title: "Seamless Layflat Binding",
      badge: "PANORAMIC 180° SPREADS",
      desc: "Our signature binding technique allows pages to open completely flat with zero gutter curve, making panoramic landscape photos flow uninterrupted across two full pages.",
      specs: ["Zero Middle Gutter Loss", "Reinforced Linen Spine", "Hand-Inspected Strength"],
      img: "/images/photobook2.png"
    },
    {
      title: "6-Color Museum Pigment Inks",
      badge: "UV-RESISTANT LONGEVITY",
      desc: "Printed using ultra-fine commercial presses with museum-grade pigment inks that resist fading, moisture, and yellowing for over a century.",
      specs: ["High-Definition Color Gamut", "Natural True Skin Tones", "Deep Velvety Contrast"],
      img: "/images/photobook3.png"
    }
  ];

  return (
    <div className="bg-[#F8F3EA] text-[#3A342D] font-sans antialiased relative min-h-screen">
      <div className="grain-overlay" />

      {/* Floating Scrapbook Navbar */}
      <ScrapbookNavbar />

      <main className="pt-28 pb-20">

        {/* 1. Header Intro */}
        <section className="pt-8 pb-12 px-6 md:px-12 text-center relative">
          <div className="max-w-3xl mx-auto space-y-3">
            <h1
              className="text-4xl md:text-6xl text-[#3A342D] tracking-tight"
              style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
            >
              Our Craft & Materials
            </h1>

            <p className="font-glory text-xl md:text-2xl text-[#3A342D]/85 font-bold leading-relaxed max-w-xl mx-auto">
              We never cut corners. Every book and print is crafted using heritage methods intended to last lifetimes. ♡
            </p>
          </div>
        </section>

        {/* 2. Materials Swatchbook Section */}
        <section className="px-4 sm:px-6 md:px-12 max-w-5xl mx-auto space-y-16">
          {materials.map((m, idx) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`flex flex-col gap-8 md:gap-12 items-center ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              {/* Image Preview */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative group">
                  <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />
                  <div className="polaroid-frame w-72 sm:w-80 shadow-2xl bg-[#FAF6EE] p-3 pb-6 border border-[#DDD5C5] transform hover:scale-105 transition-all">
                    <img
                      src={m.img}
                      alt={m.title}
                      className="w-full aspect-[4/3] object-cover rounded-xs"
                      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/books.png"; }}
                    />
                    <div className="mt-2 text-center">
                      <span className="bg-[#DCE4D7] px-2.5 py-1 text-[10px] font-mono text-[#3A342D] rounded-full font-bold">
                        {m.badge}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Content Card */}
              <div className="w-full md:w-1/2 bg-[#FAF6EE] p-8 rounded-2xl border border-[#DDD5C5] shadow-lg space-y-4">
                <h3
                  className="text-2xl sm:text-3xl text-[#3A342D]"
                  style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                >
                  {m.title}
                </h3>

                <p className="font-glory text-lg sm:text-xl text-[#3A342D]/90 leading-relaxed font-bold">
                  {m.desc}
                </p>

                <div className="pt-2 border-t border-[#DDD5C5] space-y-2">
                  {m.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="font-glory text-base text-[#C27871] font-bold">
                      • {spec}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* 3. Archival Seal & Guarantee Banner */}
        <section className="mt-24 py-16 px-6 md:px-12 bg-[#DCE4D7] text-[#3A342D] relative overflow-hidden">
          <TornPaperEdgeTop fill="#F8F3EA" className="-top-6 absolute left-0" />

          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-2 text-center md:text-left">
              <h3
                className="text-2xl sm:text-4xl text-[#3A342D]"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                100% Archival Guarantee
              </h3>
              <p className="font-glory text-xl text-[#3A342D]/85 font-bold">
                If your print isn't completely perfect, we'll reprint it with care or refund your order. No questions asked. ♡
              </p>
            </div>

            <div className="flex-shrink-0">
              <AuthenticWaxSeal className="w-32 h-32" />
            </div>
          </div>

          <TornPaperEdgeBottom fill="#F8F3EA" className="-bottom-6 absolute left-0" />
        </section>

        {/* 4. Call to Action */}
        <section className="pt-16 pb-6 text-center">
          <Link
            href="/templates"
            className="inline-block px-8 py-4 bg-[#C27871] text-white rounded-full font-protest text-xs tracking-wider uppercase hover:bg-[#3A342D] transition-all shadow-lg"
          >
            Experience The Craft
          </Link>
        </section>

      </main>

      {/* Scrapbook Footer */}
      <ScrapbookFooter />
    </div>
  );
}
