"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScrapbookNavbar,
  ScrapbookFooter
} from '@/components/ui/landingpage';

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What makes your layflat photobooks different from regular photo albums?",
      a: "Our layflat albums use an archival seamless binding system where the pages lay 100% flat at a complete 180-degree angle. This means your panoramic photos flow across both left and right pages without disappearing into a center gutter crease."
    },
    {
      q: "What paper types and inks do you use?",
      a: "We exclusively use 100% archival, acid-free Mohawk Superfine eggshell paper (148gsm for softcovers, 650gsm ultra-thick sheets for layflat albums). Our inks are 6-color museum-grade pigment inks that resist fading and yellowing for over a century."
    },
    {
      q: "How long does printing and delivery take in India?",
      a: "Because each piece is individually inspected and custom-printed, production takes 2 to 4 business days. Standard delivery across India takes 3 to 5 business days. Express shipping is also available at checkout."
    },
    {
      q: "Can I customize the number of pages in my photobook?",
      a: "Yes! All our photobooks start with 20 pages included. You can easily add more pages inside the online studio editor (up to 100 pages for standard books, 60 pages for ultra-thick layflat books)."
    },
    {
      q: "What if I notice an issue with my print?",
      a: "We offer a 100% Love & Archival Guarantee. If your order arrives with any manufacturing imperfection, printing defect, or transit damage, we will reprint it immediately free of charge or give you a full refund."
    }
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
              Frequently Asked Questions
            </h1>

            <p className="font-glory text-xl md:text-2xl text-[#3A342D]/85 font-bold leading-relaxed max-w-xl mx-auto">
              Everything you need to know about our paper craft, printing, shipping, and love guarantee. ♡
            </p>
          </div>
        </section>

        {/* 2. Accordion Sticky Note FAQ Cards */}
        <section className="px-4 sm:px-6 md:px-12 max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#FAF6EE] rounded-2xl border border-[#DDD5C5] shadow-md overflow-hidden relative"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#F8EBE6]/50 transition-colors"
              >
                <h3
                  className="text-lg sm:text-xl text-[#3A342D]"
                  style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                >
                  {faq.q}
                </h3>

                <span
                  className={`material-symbols-outlined text-[#C27871] transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 pt-1 text-[#3A342D]/85 font-glory text-lg sm:text-xl font-bold leading-relaxed border-t border-[#DDD5C5]/50"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </section>

        {/* 3. Still Have Questions Banner */}
        <section className="mt-16 text-center px-6">
          <div className="bg-[#FAF6EE] p-8 rounded-2xl border border-[#DDD5C5] shadow-lg max-w-md mx-auto relative">
            <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />
            <h3
              className="text-2xl text-[#3A342D] mb-2"
              style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
            >
              Still Have A Question?
            </h3>
            <p className="font-glory text-lg text-[#3A342D]/80 mb-6 font-bold">
              Our studio support team is always delighted to help you! ♡
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 bg-[#C27871] text-white rounded-full font-protest text-xs uppercase tracking-wider hover:bg-[#3A342D] transition-all shadow-md"
            >
              Write To Us
            </Link>
          </div>
        </section>

      </main>

      {/* Scrapbook Footer */}
      <ScrapbookFooter />
    </div>
  );
}
