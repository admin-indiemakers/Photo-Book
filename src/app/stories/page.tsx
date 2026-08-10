"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ScrapbookNavbar,
  ScrapbookFooter,
  TornPaperEdgeTop,
  TornPaperEdgeBottom
} from '@/components/ui/landingpage';

export default function StoriesPage() {
  const reviews = [
    {
      name: "Sarah & Liam",
      location: "Bangalore",
      date: "Jan 2026",
      rating: 5,
      title: "Our Wedding Album is Pure Magic",
      text: "The layflat pages are unbelievably thick and the color vibrancy is beyond what we imagined. Holding our wedding day in our hands feels so much more emotional than scrolling an iPad.",
      img: "/images/photobook11.jpg",
      product: "12x12 Layflat Hardcover"
    },
    {
      name: "Priya & Rohan",
      location: "Mumbai",
      date: "Dec 2025",
      rating: 5,
      title: "A 'Year in Review' for the Grandparents",
      text: "I made a mini photobook with our daughter's first year memories for my parents. They were both in happy tears. The paper texture feels like a true heritage book.",
      img: "/images/polaroid2.jpg",
      product: "8x8 Classic Hardcover"
    },
    {
      name: "Marcus W.",
      location: "Goa",
      date: "Nov 2025",
      rating: 5,
      title: "Professional Grade Quality",
      text: "As a professional photographer, I am deeply picky about color gamut and paper weight. Offline Living is the only consumer studio I trust with my family memories.",
      img: "/images/polaroid8.jpg",
      product: "Retro Polaroid Set"
    },
    {
      name: "Ananya S.",
      location: "Delhi",
      date: "Oct 2025",
      rating: 5,
      title: "Fridge Magnets That Bring Daily Smiles",
      text: "The polaroid fridge magnets turned our boring refrigerator into a tiny memory gallery. Everyone who visits stops to look at them!",
      img: "/images/craft1.png",
      product: "Polaroid Fridge Magnets"
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
              Real Stories & Love Notes
            </h1>

            <p className="font-glory text-xl md:text-2xl text-[#3A342D]/85 font-bold leading-relaxed max-w-xl mx-auto">
              Every print holds a precious memory. Here are heartwarming stories from our community. ♡
            </p>

            <div className="pt-2 flex items-center justify-center gap-2 font-glory text-base text-[#C27871] font-bold">
              <span className="text-amber-500">★★★★★</span>
              <span>4.9 / 5.0 rating from 2,500+ happy creators</span>
            </div>
          </div>
        </section>

        {/* 2. Customer Stories Scrapbook Grid */}
        <section className="px-4 sm:px-6 md:px-12 max-w-6xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((rev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#FAF6EE] p-6 sm:p-8 rounded-2xl border border-[#DDD5C5] shadow-lg relative flex flex-col justify-between"
              >
                {/* Washi Tape on top */}
                <div className={`washi-tape -top-2.5 ${i % 2 === 0 ? 'left-6 rotate-[-2deg]' : 'right-6 rotate-[2deg]'}`} />

                <div>
                  {/* Polaroid Preview + Reviewer Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="polaroid-frame w-20 flex-shrink-0 shadow-md bg-white p-1 pb-3">
                      <img src={rev.img} alt={rev.name} className="w-full aspect-square object-cover rounded-xs" />
                    </div>

                    <div>
                      <h4
                        className="text-lg text-[#3A342D]"
                        style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                      >
                        {rev.name}
                      </h4>
                      <p className="font-glory text-xs text-[#C27871] font-bold">
                        {rev.location} • {rev.date}
                      </p>
                      <span className="bg-[#DCE4D7] px-2 py-0.5 rounded-full text-[9px] font-mono text-[#3A342D] font-bold inline-block mt-1">
                        {rev.product}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="text-xl text-[#3A342D] mb-2"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    {rev.title}
                  </h3>

                  <p className="font-glory text-base sm:text-lg text-[#3A342D]/90 leading-relaxed font-bold">
                    "{rev.text}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#DDD5C5] flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    <span>★★★★★</span>
                    <span className="font-glory text-[#3A342D]/70 font-bold ml-1">Verified Memory</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. Community Tagging Banner */}
        <section className="mt-20 py-16 px-6 md:px-12 bg-gingham text-center relative overflow-hidden">
          <TornPaperEdgeTop fill="#F8F3EA" className="-top-6 absolute left-0" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h3
              className="text-2xl sm:text-4xl text-[#3A342D]"
              style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
            >
              Tag Us In Your Memories
            </h3>
            <p className="font-glory text-xl text-[#3A342D]/85 font-bold">
              Share your unboxing on Instagram or TikTok with <strong className="text-[#C27871]">@offlineliving.co</strong> for a chance to be featured in our print journal and win a free print pack! ♡
            </p>
            <Link
              href="/templates"
              className="inline-block px-8 py-4 bg-[#C27871] text-white rounded-full font-protest text-xs tracking-wider uppercase hover:bg-[#3A342D] transition-all shadow-lg"
            >
              Make Something Real
            </Link>
          </div>

          <TornPaperEdgeBottom fill="#F8F3EA" className="-bottom-6 absolute left-0" />
        </section>

      </main>

      {/* Scrapbook Footer */}
      <ScrapbookFooter />
    </div>
  );
}
