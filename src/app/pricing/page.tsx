"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ScrapbookNavbar,
  ScrapbookFooter
} from '@/components/ui/landingpage';

export default function PricingPage() {
  const photobookTiers = [
    {
      name: "Everyday Softcover",
      price: "₹1,499",
      unit: "for 20 pages",
      badge: "Everyday Cute",
      desc: "Flexible, lightweight, and perfect for weekend trips, recipe books, and baby journals.",
      features: [
        "6\" x 6\" or 8\" x 8\" square sizes",
        "148gsm Mohawk Eggshell paper",
        "Silky matte protective cover",
        "₹30 per additional page"
      ],
      href: "/templates",
      buttonText: "Create Softcover",
      popular: false
    },
    {
      name: "Classic Hardcover",
      price: "₹2,499",
      unit: "for 20 pages",
      badge: "Most Loved",
      desc: "Durable, substantial, and designed to look stunning on your coffee table for years.",
      features: [
        "8.5\" x 8.5\" or 11\" x 8.5\" sizes",
        "Sturdy cloth-bound or photo wrap",
        "Archival-grade cotton pages",
        "₹45 per additional page"
      ],
      href: "/templates",
      buttonText: "Create Hardcover",
      popular: true
    },
    {
      name: "Premium Layflat",
      price: "₹3,999",
      unit: "for 20 pages",
      badge: "Panoramic 180°",
      desc: "Ultra-thick unbendable pages that open 100% flat with zero center seam gutter loss.",
      features: [
        "10\" x 10\" or 12\" x 12\" panoramic sizes",
        "650gsm ultra-thick matte sheets",
        "Custom foil-stamped linen cover",
        "₹80 per additional page"
      ],
      href: "/templates",
      buttonText: "Create Layflat",
      popular: false
    }
  ];

  const miniFormats = [
    { title: "Retro Polaroids (16 pcs)", price: "₹299 / pack", href: "/polaroid" },
    { title: "Polaroid Fridge Magnets (4 pcs)", price: "₹349 / set", href: "/fridge-magnet" },
    { title: "Solid Wood Photo Frame", price: "₹699", href: "/frame" },
    { title: "Crystal Acrylic Block Frame", price: "₹899", href: "/acrylic-frames" },
    { title: "Gallery Canvas Frame", price: "₹1,199", href: "/canvas-frames" }
  ];

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
              Simple & Sweet Pricing
            </h1>

            <p className="font-glory text-xl md:text-2xl text-[#3A342D]/85 font-bold leading-relaxed max-w-xl mx-auto">
              Museum-quality printing with transparent pricing and zero hidden fees. ♡
            </p>
          </div>
        </section>

        {/* 2. Photobook Tier Cards */}
        <section className="px-4 sm:px-6 md:px-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {photobookTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-[#FAF6EE] p-8 rounded-2xl border shadow-xl relative flex flex-col justify-between ${
                  tier.popular
                    ? 'border-2 border-[#C27871] md:-translate-y-3 bg-[#FCFAF5]'
                    : 'border-[#DDD5C5]'
                }`}
              >
                {/* Washi Tape on Top */}
                <div className={`washi-tape -top-3 left-1/2 -translate-x-1/2 ${tier.popular ? 'washi-tape-burgundy rotate-[-2deg]' : 'rotate-[2deg]'}`} />

                <div>
                  {/* Top Badge */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="bg-[#DCE4D7] px-3 py-1 rounded-full text-[10px] font-mono text-[#3A342D] font-bold">
                      {tier.badge}
                    </span>
                  </div>

                  <h3
                    className="text-2xl sm:text-3xl text-[#3A342D] mb-1"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    {tier.name}
                  </h3>

                  <p className="font-glory text-base text-[#3A342D]/80 mb-6 font-bold leading-snug">
                    {tier.desc}
                  </p>

                  <div className="py-4 border-y border-[#DDD5C5] mb-6">
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-4xl sm:text-5xl text-[#C27871]"
                        style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                      >
                        {tier.price}
                      </span>
                      <span className="font-glory text-sm text-[#3A342D]/70 font-bold">
                        {tier.unit}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="font-glory text-base text-[#3A342D] font-bold">
                        • {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={tier.href}
                  className={`w-full py-3.5 rounded-full font-protest text-xs uppercase tracking-wider text-center transition-all shadow-md block ${
                    tier.popular
                      ? 'bg-[#C27871] text-white hover:bg-[#3A342D]'
                      : 'bg-[#FAF6EE] border border-[#3A342D]/30 text-[#3A342D] hover:bg-[#3A342D] hover:text-white'
                  }`}
                >
                  {tier.buttonText}
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. Smaller Formats & Prints Price Table */}
        <section className="mt-20 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto">
          <div className="bg-[#FAF6EE] p-8 sm:p-10 rounded-2xl border border-[#DDD5C5] shadow-lg relative">
            <div className="washi-tape -top-3 left-8 rotate-[-3deg]" />

            <h3
              className="text-2xl sm:text-3xl text-[#3A342D] mb-6 text-center"
              style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
            >
              Prints, Frames & Keepsakes
            </h3>

            <div className="divide-y divide-[#DDD5C5]">
              {miniFormats.map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between gap-4">
                  <span
                    className="text-base sm:text-lg text-[#3A342D]"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    {item.title}
                  </span>

                  <div className="flex items-center gap-4">
                    <span className="font-glory text-lg text-[#C27871] font-bold">
                      {item.price}
                    </span>
                    <Link
                      href={item.href}
                      className="px-4 py-1.5 bg-[#FAF6EE] border border-[#DDD5C5] rounded-full font-protest text-[10px] uppercase text-[#3A342D] hover:bg-[#C27871] hover:text-white transition-colors"
                    >
                      Customize
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Scrapbook Footer */}
      <ScrapbookFooter />
    </div>
  );
}
