"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ScrapbookNavbar,
  ScrapbookFooter,
  TornPaperEdgeTop,
  TornPaperEdgeBottom,
  AnimatedDrawnLine,
  DRAWN_PATHS
} from '@/components/ui/landingpage';

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Pick Your Format",
      desc: "Choose from our curated formats: layflat hardcover photobooks, vintage polaroids, wooden framed prints, or magnetic photo sets.",
      img: "/images/books.png",
      note: "layflat or softcover? you choose! ♡"
    },
    {
      num: "02",
      title: "Select & Upload Photos",
      desc: "Pick your favorite snapshots right from your phone, laptop, or Instagram roll. Our auto-flow tool arranges them chronologically with one click.",
      img: "/images/photobook11.jpg",
      note: "quick & easy seamless upload ♡"
    },
    {
      num: "03",
      title: "Personalize Your Keepsake",
      desc: "Add meaningful captions, dates, custom covers, and playful scrapbook stickers to make every page distinctly yours.",
      img: "/images/polaroid2.jpg",
      note: "add sweet handwritten notes ♡"
    },
    {
      num: "04",
      title: "Archival Print & Unbox",
      desc: "We handcraft your piece on archival cotton paper with 6-color pigment inks and pack it in a plastic-free keepsake box delivered to your door.",
      img: "/images/keepsakes.png",
      note: "packaged with immense care ♡"
    }
  ];

  return (
    <div className="bg-[#F8F3EA] text-[#3A342D] font-sans antialiased relative min-h-screen">
      <div className="grain-overlay" />

      {/* Floating Scrapbook Navbar */}
      <ScrapbookNavbar />

      <main className="pt-28 pb-20">

        {/* 1. Header Title */}
        <section className="pt-8 pb-12 px-6 md:px-12 text-center relative overflow-hidden">
          {/* Animated Line That Draws a Heart on the Way */}
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

          <div className="max-w-3xl mx-auto space-y-3 relative z-10">
            <h1
              className="text-4xl md:text-6xl text-[#3A342D] tracking-tight"
              style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
            >
              How It Works
            </h1>

            <p className="font-glory text-xl md:text-2xl text-[#3A342D]/85 font-bold leading-relaxed max-w-xl mx-auto">
              From your camera roll to a physical keepsake in four simple, heartwarming steps. ♡
            </p>
          </div>
        </section>

        {/* 2. Step-by-Step Roadmap (Alternating Scrapbook Cards) */}
        <section className="px-4 sm:px-6 md:px-12 max-w-5xl mx-auto space-y-16 relative">
          {/* Vertical Loop-de-loop Line in background */}
          <AnimatedDrawnLine
            d="M 20,40 C 120,200 40,400 120,600 C 40,800 140,1000 60,1200"
            viewBox="0 0 160 1240"
            stroke="#E8B042"
            strokeWidth={2}
            strokeDasharray="6 4"
            strokeOpacity={0.22}
            className="top-10 left-1/2 -translate-x-1/2 w-40 h-[90%] -z-0 hidden lg:block"
            duration={3.0}
            delay={0.3}
          />

          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`flex flex-col gap-8 md:gap-12 items-center relative z-10 ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              {/* Photo / Polaroid Card */}
              <div className="w-full md:w-1/2 relative flex justify-center">
                <div className="relative group">
                  <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />
                  <div className="polaroid-frame w-72 sm:w-80 shadow-xl bg-[#FAF6EE] p-3 pb-8 border border-[#DDD5C5] transform hover:rotate-0 hover:scale-105 transition-all">
                    <img
                      src={step.img}
                      alt={step.title}
                      className="w-full aspect-[4/3] object-cover rounded-xs"
                    />
                    <p className="font-glory text-center text-sm text-[#C27871] mt-3 font-bold">
                      {step.note}
                    </p>
                  </div>
                </div>
              </div>

              {/* Text Description Card */}
              <div className="w-full md:w-1/2 bg-[#FAF6EE] p-8 rounded-2xl border border-[#DDD5C5] shadow-lg relative space-y-4">
                <span
                  className="text-3xl sm:text-4xl text-[#C27871] block"
                  style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                >
                  Step {step.num}
                </span>

                <h3
                  className="text-2xl sm:text-3xl text-[#3A342D]"
                  style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                >
                  {step.title}
                </h3>

                <p className="font-glory text-lg sm:text-xl text-[#3A342D]/90 leading-relaxed font-bold">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* 3. Call to Action */}
        <section className="mt-24 py-16 px-6 md:px-12 text-center bg-gingham relative overflow-hidden">
          <TornPaperEdgeTop fill="#F8F3EA" className="-top-6 absolute left-0" />

          {/* Animated Connecting Wave with Love Symbol */}
          <AnimatedDrawnLine
            d={DRAWN_PATHS.connectingHeartEnd}
            viewBox={DRAWN_PATHS.connectingHeartEndViewBox}
            stroke="#C27871"
            strokeWidth={2.5}
            strokeOpacity={0.28}
            className="top-6 left-0 w-full h-24 -z-0"
            duration={2.6}
            delay={0.2}
          />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2
              className="text-3xl md:text-5xl text-[#3A342D] tracking-tight"
              style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
            >
              Ready To Print Your Memories?
            </h2>
            <p className="font-glory text-xl text-[#3A342D]/80 font-bold">
              Start building your personalized photobook or print set today! ♡
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/templates"
                className="px-8 py-4 bg-[#C27871] text-white rounded-full font-protest text-xs tracking-wider uppercase hover:bg-[#3A342D] transition-all shadow-lg"
              >
                Explore Photobooks
              </Link>
              <Link
                href="/polaroid"
                className="px-8 py-4 bg-[#FAF6EE] border border-[#3A342D]/30 text-[#3A342D] rounded-full font-protest text-xs tracking-wider uppercase hover:bg-[#3A342D] hover:text-white transition-all shadow-sm"
              >
                Make Polaroids
              </Link>
            </div>
          </div>

          <TornPaperEdgeBottom fill="#F8F3EA" className="-bottom-6 absolute left-0" />
        </section>

      </main>

      {/* Scrapbook Footer */}
      <ScrapbookFooter />
    </div>
  );
}
