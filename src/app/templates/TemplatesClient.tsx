"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HeaderNav, Footer, customEase, MagneticButton } from '@/components/shared';

import wanderlustImg from '@/assets/Wanderlust.jpg';
import yearInReviewImg from '@/assets/Year in Review.jpg';
import milestonesImg from '@/assets/Milestones.jpg';
import familyRecipesImg from '@/assets/Family Recipes.jpg';

const templates = [
  { id: 'wanderlust', name: 'Wanderlust', category: 'Travel', pages: 12, price: 39, image: wanderlustImg.src },
  { id: 'wedding-bliss', name: 'Wedding Bliss', category: 'Wedding', pages: 40, price: 89, image: '/images/tpl_wedding.png' },
  { id: 'little-one', name: 'Little One', category: 'Family', pages: 24, price: 49, image: '/images/tpl_baby.png' },
  { id: 'family-time', name: 'Family Time', category: 'Family', pages: 36, price: 69, image: '/images/tpl_family.png' },
  { id: 'milestones', name: 'Milestones', category: 'Occasions', pages: 28, price: 59, image: milestonesImg.src },
  { id: 'year-in-review', name: 'Year in Review', category: 'Occasions', pages: 50, price: 99, image: yearInReviewImg.src },
  { id: 'portfolio', name: 'Creative Portfolio', category: 'Portfolio', pages: 20, price: 45, image: '/images/tpl_portfolio.png' },
  { id: 'recipe-book', name: 'Family Recipes', category: 'Family', pages: 30, price: 55, image: familyRecipesImg.src }
];

const categories = ['All', 'Travel', 'Wedding', 'Family', 'Occasions', 'Portfolio'];

export default function TemplatesClient() {
  const [activeCat, setActiveCat] = useState('All');

  const filteredTemplates = activeCat === 'All'
    ? templates
    : templates.filter(t => t.category === activeCat);

  return (
    <main className="bg-archival-cream text-ink-charcoal font-sans selection:bg-[#f26523] selection:text-white pt-32 md:pt-40">
      <HeaderNav />

      <section className="pt-2 pb-8 md:pt-4 md:pb-24 px-4 md:px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            className="text-center mb-10 md:mb-20"
          >
            <h1 className="text-4xl md:text-7xl font-serif text-ink-charcoal mb-4 md:mb-6 leading-tight">Photobook Templates</h1>
            <p className="text-sm md:text-lg text-ink-charcoal/70 font-light max-w-2xl mx-auto px-4 md:px-0 leading-relaxed">
              Choose a starting point for your story. All of our layout templates are fully customizable in our studio editor, designed for premium archival-quality printing.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-16"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-4 py-1.5 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-medium tracking-wide transition-all duration-300 ${activeCat === cat
                  ? 'bg-black text-white shadow-lg scale-105'
                  : 'bg-archival-cream text-ink-charcoal/70 border border-ink-charcoal/15 hover:border-black hover:text-black'
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10">
            <AnimatePresence>
              {filteredTemplates.map((tpl, idx) => (
                <motion.div
                  layout
                  key={tpl.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.5, ease: customEase }}
                  className="group relative cursor-pointer flex flex-col"
                >
                  <div className="overflow-hidden rounded-xl md:rounded-2xl mb-2 md:mb-6 bg-surface-container aspect-[3/4] relative perspective-[1000px] shadow-sm border border-ink-charcoal/10">
                    <img
                      src={tpl.image}
                      alt={`${tpl.name} template preview`}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />

                    {/* Hover Overlay Action */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-sm">
                      <Link href={`/editor?template=${tpl.id}`}>
                        <MagneticButton className="border-white text-white bg-black/50 hover:border-[#f26523] px-6 py-3">
                          Select Layout
                        </MagneticButton>
                      </Link>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row md:justify-between items-start mb-1 md:mb-2 gap-1 md:gap-0">
                    <h3 className="font-serif text-[12px] md:text-2xl text-ink-charcoal leading-tight line-clamp-1">{tpl.name}</h3>
                    <span className="hidden md:inline-block text-[10px] font-semibold uppercase tracking-widest px-2 py-1 bg-ink-charcoal/5 text-ink-charcoal/60 rounded-sm">
                      {tpl.category}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-ink-charcoal/60 font-light mt-auto text-[9px] md:text-base gap-0.5 md:gap-0">
                    <span className="hidden md:inline">{tpl.pages} Pages</span>
                    <span className="text-ink-charcoal font-medium text-[10px] md:text-base">From ₹{tpl.price}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
