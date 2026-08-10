"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ScrapbookNavbar,
  ScrapbookFooter,
  TornPaperEdgeTop,
  TornPaperEdgeBottom,
  AuthenticWaxSeal,
  PaperClipIcon,
  AnimatedDrawnLine,
  DRAWN_PATHS
} from '@/components/ui/landingpage';

export default function AboutPage() {
  const values = [
    {
      title: 'Pure Craftsmanship',
      desc: '100% archival cotton paper, pigment inks, and heritage layflat binding meant to last lifetimes, not just seasons.',
      color: 'bg-[#F8EBE6]'
    },
    {
      title: 'Made for Real Life',
      desc: 'Physical keepsakes you can hold, gift, and place on your coffee table for real human moments away from screens.',
      color: 'bg-[#DCE4D7]/50'
    },
    {
      title: 'Sustainably Kind',
      desc: 'FSC-certified papers, plastic-free packaging, and thoughtful small-batch production made with immense care.',
      color: 'bg-[#FAF6EE]'
    }
  ];

  return (
    <div className="bg-[#F8F3EA] text-[#3A342D] font-sans antialiased relative min-h-screen">
      <div className="grain-overlay" />
      
      {/* Floating Scrapbook Navbar */}
      <ScrapbookNavbar />

      <main className="pt-28 pb-16">

        {/* 1. Header Intro Section */}
        <section className="pt-8 pb-12 px-6 md:px-12 text-center relative overflow-hidden">
          {/* Animated Line That Draws a Heart Symbol in the Background */}
          <AnimatedDrawnLine
            d={DRAWN_PATHS.heartLoop}
            viewBox={DRAWN_PATHS.heartLoopViewBox}
            stroke="#C27871"
            strokeWidth={2.2}
            strokeOpacity={0.28}
            className="top-2 left-1/2 -translate-x-1/2 w-full max-w-4xl h-36 -z-0"
            duration={2.6}
            delay={0.1}
          />

          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <h1
              className="text-4xl md:text-6xl text-[#3A342D] tracking-tight"
              style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
            >
              Our Little Story
            </h1>

            <p className="font-glory text-xl md:text-2xl text-[#3A342D]/85 font-bold leading-relaxed max-w-xl mx-auto">
              We started Offline Living because we noticed the moments that mattered most were getting trapped inside cold glass screens. ♡
            </p>
          </div>
        </section>

        {/* 2. The Founders' Note / Scrapbook Letter Section */}
        <section className="px-4 sm:px-6 md:px-12 max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#FAF6EE] p-8 sm:p-12 rounded-3xl border border-[#DDD5C5] shadow-2xl relative"
          >
            {/* Washi Tape at Top */}
            <div className="washi-tape -top-3 left-12 rotate-[-2deg]" />
            <div className="washi-tape -top-3 right-12 rotate-[3deg]" />

            {/* Paper Clip with polaroid on right on desktop */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              
              {/* Left Letter Content */}
              <div className="flex-1 space-y-6">
                <div className="border-b border-[#DDD5C5] pb-4">
                  <span className="font-mono text-xs font-bold text-[#C27871] uppercase tracking-widest block mb-1">
                    STUDIO JOURNAL • ENTRY NO. 01
                  </span>
                  <h2
                    className="text-2xl sm:text-3xl text-[#3A342D]"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    Why We Keep It Offline
                  </h2>
                </div>

                <div className="space-y-4 font-glory text-lg sm:text-xl text-[#3A342D]/90 leading-relaxed font-bold">
                  <p>
                    Every day, we take hundreds of photos. We snap sunset walks, shared desserts, family laughs, and golden afternoon light. But they often end up buried under receipts, screenshots, and an infinite camera roll.
                  </p>
                  <p>
                    We built Offline Living to bring those memories back into the real, physical world. There is an irreplaceable magic in turning thick matte paper pages, feeling the linen texture under your fingers, and gathering around a coffee table with people you love.
                  </p>
                  <p>
                    Every photobook, polaroid pack, and frame we produce is printed using archival pigment inks and hand-inspected with deep care. Because your memories aren't just data points — they are your life's story.
                  </p>
                </div>

                {/* Handwritten Sign-off */}
                <div className="pt-4 border-t border-[#DDD5C5] flex items-center justify-between">
                  <div>
                    <p className="font-glory text-2xl text-[#C27871]">With love & gratitude,</p>
                    <p className="font-protest text-base text-[#3A342D]">The Offline Living Studio Team</p>
                  </div>
                  <AuthenticWaxSeal className="w-24 h-24" />
                </div>
              </div>

              {/* Right Side Pinned Polaroid */}
              <div className="w-full md:w-56 flex-shrink-0 flex flex-col items-center">
                <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="absolute -top-4 left-6 z-20">
                    <PaperClipIcon className="w-6 h-10 text-slate-600" />
                  </div>
                  <div className="polaroid-frame w-48 shadow-xl">
                    <img
                      src="/images/craft1.png"
                      alt="Offline Living Studio"
                      className="w-full aspect-square object-cover"
                    />
                    <p className="font-glory text-sm text-[#3A342D] mt-2 text-center font-bold">
                      studio days ♡
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* 3. Core Values Grid */}
        <section className="relative py-16 px-6 md:px-12 bg-gingham text-[#3A342D] overflow-hidden my-8">
          <TornPaperEdgeTop fill="#F8F3EA" className="-top-8 absolute left-0" />
          
          {/* Animated Connecting Wave with Heart End */}
          <AnimatedDrawnLine
            d={DRAWN_PATHS.connectingHeartEnd}
            viewBox={DRAWN_PATHS.connectingHeartEndViewBox}
            stroke="#C27871"
            strokeWidth={2.5}
            strokeOpacity={0.28}
            className="top-10 left-0 w-full h-36 -z-0"
            duration={2.8}
            delay={0.2}
          />

          <div className="max-w-6xl mx-auto relative z-10 space-y-12">
            <div className="text-center space-y-2">
              <h2
                className="text-3xl md:text-5xl text-[#3A342D] tracking-tight"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                What We Stand For
              </h2>
              <p className="font-glory text-xl text-[#3A342D]/85 font-bold">
                The three simple promises in everything we craft. ♡
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <div
                  key={i}
                  className={`p-8 rounded-3xl border border-[#DDD5C5] shadow-lg flex flex-col justify-between relative group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${v.color}`}
                >
                  <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />
                  <h3
                    className="text-2xl text-[#3A342D] mb-2"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    {v.title}
                  </h3>
                  <p className="font-glory text-lg text-[#3A342D]/80 leading-relaxed font-bold">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <TornPaperEdgeBottom fill="#F8F3EA" className="-bottom-8 absolute left-0" />
        </section>

        {/* 4. Ready to Create Call-to-Action */}
        <section className="pt-12 pb-8 px-6 text-center">
          <div className="max-w-xl mx-auto space-y-6">
            <h2
              className="text-3xl md:text-4xl text-[#3A342D]"
              style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
            >
              Make Your First Keepsake Today
            </h2>
            <p className="font-glory text-xl text-[#3A342D]/85 font-bold">
              Turn your camera roll into archival art in just a few clicks. ♡
            </p>
            <div>
              <Link
                href="/products"
                className="inline-block px-8 py-4 bg-[#C27871] text-white rounded-full font-protest text-xs uppercase tracking-wider hover:bg-[#3A342D] transition-all shadow-md"
              >
                Browse Formats
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Scrapbook Footer */}
      <ScrapbookFooter />
    </div>
  );
}
