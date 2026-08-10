"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ScrapbookNavbar,
  ScrapbookFooter
} from '@/components/ui/landingpage';

export default function BlogPage() {
  const posts = [
    {
      id: "how-to-organize-digital-photos",
      title: "How to Sort Your 10,000+ Camera Roll Photos in 5 Steps",
      excerpt: "Stop feeling overwhelmed by thousands of forgotten photos. Here is our fun, stress-free method to curate, favorite, and print your best memories.",
      category: "Craft Guides",
      date: "Jul 10, 2026",
      img: "/images/photobook11.jpg",
      readTime: "4 min read"
    },
    {
      id: "wedding-album-must-haves",
      title: "10 Candid Moments Every Wedding Album Needs",
      excerpt: "Beyond the posed portraits and standard family lineup, these are the spontaneous, heartwarming glances that will make you smile 30 years from now.",
      category: "Inspiration",
      date: "Jun 28, 2026",
      img: "/images/polaroid2.jpg",
      readTime: "5 min read"
    },
    {
      id: "the-science-of-print",
      title: "Why Holding Physical Photos Makes Us Truly Happier",
      excerpt: "Recent psychological studies prove that tangible, tactile photos in your living space significantly improve gratitude and emotional connection.",
      category: "Slow Living",
      date: "Jun 15, 2026",
      img: "/images/polaroid8.jpg",
      readTime: "3 min read"
    },
    {
      id: "travel-journal-tips",
      title: "How to Build a Cohesive Travel Photobook",
      excerpt: "Mix phone snapshots, scanned flight tickets, coffee receipts, and notes into an authentic layflat travel journal you will cherish forever.",
      category: "Travel Diaries",
      date: "May 22, 2026",
      img: "/images/craft1.png",
      readTime: "6 min read"
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
              The Offline Journal
            </h1>

            <p className="font-glory text-xl md:text-2xl text-[#3A342D]/85 font-bold leading-relaxed max-w-xl mx-auto">
              Tips, craft guides, and slow-living thoughts on turning digital pixels into physical keepsakes. ♡
            </p>
          </div>
        </section>

        {/* 2. Featured Journal Article */}
        <section className="px-4 sm:px-6 md:px-12 max-w-5xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#FAF6EE] p-6 sm:p-10 rounded-2xl border border-[#DDD5C5] shadow-xl relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center group hover:shadow-2xl transition-shadow"
          >
            <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />

            <div className="md:col-span-6 overflow-hidden rounded-xl border border-[#DDD5C5] aspect-[4/3] relative">
              <img
                src={posts[0].img}
                alt={posts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-[#FAF6EE] px-2.5 py-1 rounded-full text-[10px] font-mono text-[#3A342D] font-bold border border-[#DDD5C5]">
                {posts[0].category}
              </div>
            </div>

            <div className="md:col-span-6 space-y-3">
              <div className="flex items-center gap-2 font-glory text-xs text-[#C27871] font-bold">
                <span>{posts[0].date}</span>
                <span>•</span>
                <span>{posts[0].readTime}</span>
              </div>

              <h2
                className="text-2xl sm:text-3xl text-[#3A342D] group-hover:text-[#C27871] transition-colors"
                style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
              >
                {posts[0].title}
              </h2>

              <p className="font-glory text-base sm:text-lg text-[#3A342D]/85 leading-relaxed font-bold">
                {posts[0].excerpt}
              </p>

              <div className="pt-2">
                <span className="font-glory text-lg text-[#C27871] font-bold inline-block group-hover:translate-x-1 transition-transform">
                  Read journal article
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 3. Grid of Recent Articles */}
        <section className="px-4 sm:px-6 md:px-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.slice(1).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#DDD5C5] shadow-lg flex flex-col justify-between group hover:shadow-xl transition-all relative"
              >
                <div className="washi-tape -top-2.5 left-6 rotate-[-1deg]" />

                <div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F4EFE5] border border-[#DDD5C5] relative mb-4">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-[#FAF6EE] px-2 py-0.5 rounded-full text-[9px] font-mono text-[#3A342D] font-bold border border-[#DDD5C5]">
                      {p.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-glory text-xs text-[#C27871] font-bold mb-1">
                    <span>{p.date}</span>
                    <span>•</span>
                    <span>{p.readTime}</span>
                  </div>

                  <h3
                    className="text-lg sm:text-xl text-[#3A342D] group-hover:text-[#C27871] transition-colors mb-2"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    {p.title}
                  </h3>

                  <p className="font-glory text-sm text-[#3A342D]/80 leading-relaxed font-bold mb-4">
                    {p.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#DDD5C5]">
                  <span className="font-glory text-sm text-[#C27871] font-bold block">
                    Read article
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>

      {/* Scrapbook Footer */}
      <ScrapbookFooter />
    </div>
  );
}
