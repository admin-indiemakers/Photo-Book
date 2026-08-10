"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScrapbookNavbar,
  ScrapbookFooter
} from '@/components/ui/landingpage';

import wanderlustImg from '@/assets/Wanderlust.jpg';
import yearInReviewImg from '@/assets/Year in Review.jpg';
import milestonesImg from '@/assets/Milestones.jpg';
import familyRecipesImg from '@/assets/Family Recipes.jpg';

const templates = [
  { id: 'wanderlust', name: 'Wanderlust Travel Journal', category: 'Travel', pages: 12, price: 1499, image: wanderlustImg.src, badge: 'Travel' },
  { id: 'wedding-bliss', name: 'Wedding Bliss Layflat', category: 'Wedding', pages: 12, price: 3999, image: '/images/tpl_wedding.png', badge: 'Wedding' },
  { id: 'little-one', name: 'Little One Baby Book', category: 'Family', pages: 12, price: 1799, image: '/images/tpl_baby.png', badge: 'Baby Milestones' },
  { id: 'family-time', name: 'Family Memories Album', category: 'Family', pages: 12, price: 2199, image: '/images/tpl_family.png', badge: 'Family Album' },
  { id: 'milestones', name: 'Golden Milestones', category: 'Occasions', pages: 12, price: 2499, image: milestonesImg.src, badge: 'Anniversary' },
  { id: 'year-in-review', name: 'Year in Review Journal', category: 'Occasions', pages: 12, price: 2999, image: yearInReviewImg.src, badge: 'Annual Journal' },
  { id: 'portfolio', name: 'Creative Photography Portfolio', category: 'Portfolio', pages: 12, price: 1999, image: '/images/tpl_portfolio.png', badge: 'Portfolio' },
  { id: 'recipe-book', name: 'Family Recipe Keepsake', category: 'Family', pages: 12, price: 2299, image: familyRecipesImg.src, badge: 'Family Recipes' }
];

const categories = [
  { id: 'All', label: 'All Layouts' },
  { id: 'Travel', label: 'Travel' },
  { id: 'Wedding', label: 'Wedding' },
  { id: 'Family', label: 'Family' },
  { id: 'Occasions', label: 'Occasions' },
  { id: 'Portfolio', label: 'Portfolio' }
];

export default function TemplatesClient() {
  const [activeCat, setActiveCat] = useState('All');

  const filteredTemplates = activeCat === 'All'
    ? templates
    : templates.filter(t => t.category === activeCat);

  return (
    <div className="bg-[#F8F3EA] text-[#3A342D] font-sans antialiased relative min-h-screen">
      <div className="grain-overlay" />

      {/* Floating Scrapbook Navbar */}
      <ScrapbookNavbar />

      <main className="pt-28 pb-20">

        {/* 1. Header Section */}
        <section className="pt-8 pb-8 px-6 md:px-12 text-center relative">
          <div className="max-w-3xl mx-auto space-y-3">
            <h1
              className="text-4xl md:text-6xl text-[#3A342D] tracking-tight"
              style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
            >
              Photobook Layouts
            </h1>

            <p className="font-glory text-xl md:text-2xl text-[#3A342D]/85 font-bold leading-relaxed max-w-xl mx-auto">
              Choose a starting point for your memories. All layouts are fully customizable in our studio editor. ♡
            </p>
          </div>

          {/* Category Filter Badges */}
          <div className="flex flex-wrap justify-center gap-2 pt-6 max-w-4xl mx-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`px-5 py-2 rounded-full font-protest text-xs transition-all ${
                  activeCat === cat.id
                    ? 'bg-[#C27871] text-white shadow-md scale-105'
                    : 'bg-[#FAF6EE] text-[#3A342D]/80 border border-[#DDD5C5] hover:bg-[#F8EBE6] hover:text-[#C27871]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* 2. Grid of Templates */}
        <section className="px-4 sm:px-6 md:px-12 max-w-6xl mx-auto pt-6">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredTemplates.map((tpl, idx) => (
                <motion.div
                  layout
                  key={tpl.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#DDD5C5] shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 relative flex flex-col justify-between group"
                >
                  {/* Washi Tape */}
                  <div className={`washi-tape -top-2.5 left-1/2 -translate-x-1/2 ${idx % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[2deg]'}`} />

                  <div>
                    {/* Cover Preview Image */}
                    <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#F4EFE5] border border-[#DDD5C5] relative mb-3">
                      <img
                        src={tpl.image}
                        alt={tpl.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/books.png"; }}
                      />
                      <div className="absolute top-2 left-2 bg-[#FAF6EE]/90 px-2.5 py-0.5 rounded-full text-[9px] font-mono text-[#3A342D] font-bold border border-[#DDD5C5]">
                        {tpl.badge}
                      </div>
                    </div>

                    <h3
                      className="text-lg text-[#3A342D] group-hover:text-[#C27871] transition-colors mb-1 line-clamp-1"
                      style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                    >
                      {tpl.name}
                    </h3>

                    <div className="flex items-center justify-between font-glory text-sm text-[#3A342D]/75 font-bold mb-3">
                      <span>{tpl.pages} Pages Included</span>
                      <span className="text-[#C27871] font-bold">From ₹{tpl.price}</span>
                    </div>
                  </div>

                  {/* Action Link to Editor */}
                  <Link
                    href={`/editor?template=${tpl.id}`}
                    className="w-full py-2.5 bg-[#C27871] text-white rounded-full font-protest text-xs uppercase tracking-wider hover:bg-[#3A342D] transition-colors shadow-sm text-center block"
                  >
                    Select & Customize
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

      </main>

      {/* Scrapbook Footer */}
      <ScrapbookFooter />
    </div>
  );
}
