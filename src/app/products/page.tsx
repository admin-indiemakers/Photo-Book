"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ScrapbookNavbar,
  ScrapbookFooter
} from "@/components/ui/landingpage";
import { supabase } from "@/lib/supabase";

const getHrefFromCategory = (category: string) => {
  switch (category) {
    case 'polaroid': return '/polaroid';
    case 'photo_frame': return '/frame';
    case 'photo_canvas': return '/canvas-frames';
    case 'fridge_magnet': return '/fridge-magnet';
    case 'acrylic_frame': return '/acrylic-frames';
    case 'photo_book': return '/templates';
    default: return '/products';
  }
};

const getBadgeFromName = (name: string) => {
  if (name.toLowerCase().includes('book')) return 'Signature Album';
  if (name.toLowerCase().includes('frame') && !name.toLowerCase().includes('acrylic') && !name.toLowerCase().includes('canvas')) return 'Solid Wood';
  if (name.toLowerCase().includes('acrylic')) return 'Crystal Finish';
  if (name.toLowerCase().includes('polaroid') && !name.toLowerCase().includes('magnet')) return 'Retro Prints';
  if (name.toLowerCase().includes('magnet')) return 'Fridge Keepsake';
  if (name.toLowerCase().includes('canvas')) return 'Gallery Canvas';
  return 'Keepsake';
};

const PRODUCT_ORDER = [
  "signature photo book",
  "custom photo frames",
  "custom polaroids",
  "crystal acrylic frames",
  "gallery canvas frames",
  "premium fridge magnets"
];

export default function AllProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true);

      if (!error && data) {
        const sortedData = [...data].sort((a, b) => {
          const aIndex = PRODUCT_ORDER.findIndex(title => a.name.toLowerCase().includes(title));
          const bIndex = PRODUCT_ORDER.findIndex(title => b.name.toLowerCase().includes(title));
          if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          return a.name.localeCompare(b.name);
        });
        setProducts(sortedData);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filterCategories = [
    { id: 'all', label: 'All Collections' },
    { id: 'photo_book', label: 'Photo Books' },
    { id: 'polaroid', label: 'Polaroids' },
    { id: 'photo_frame', label: 'Photo Frames' },
    { id: 'fridge_magnet', label: 'Fridge Magnets' },
    { id: 'acrylic_frame', label: 'Acrylic Frames' }
  ];

  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter);

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
              Our Little Collections
            </h1>

            <p className="font-glory text-xl md:text-2xl text-[#3A342D]/85 font-bold leading-relaxed max-w-xl mx-auto">
              Choose your format: layflat albums, retro polaroid packs, solid wood frames, and everyday keepsakes. ♡
            </p>
          </div>

          {/* Category Filter Badges */}
          <div className="flex flex-wrap justify-center gap-2 pt-6 max-w-4xl mx-auto">
            {filterCategories.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 rounded-full font-protest text-xs transition-all ${
                  activeFilter === filter.id
                    ? 'bg-[#C27871] text-white shadow-md scale-105'
                    : 'bg-[#FAF6EE] text-[#3A342D]/80 border border-[#DDD5C5] hover:bg-[#F8EBE6] hover:text-[#C27871]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* 2. Products Grid */}
        <section className="px-4 sm:px-6 md:px-12 max-w-6xl mx-auto pt-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-3">
              <div className="w-10 h-10 border-4 border-[#DDD5C5] border-t-[#C27871] rounded-full animate-spin" />
              <p className="font-glory text-xl text-[#C27871] font-bold">Opening the keepsake box... ♡</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((item, i) => {
                const img = item.images && item.images.length > 0 ? item.images[0] : "/images/books.png";
                const badge = getBadgeFromName(item.name);
                const href = getHrefFromCategory(item.category);

                return (
                  <Link href={href} key={item.id} className="block group">
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="bg-[#FAF6EE] p-5 rounded-2xl border border-[#DDD5C5] shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 relative flex flex-col justify-between h-full"
                    >
                      {/* Washi Tape at Top */}
                      <div className={`washi-tape -top-2.5 left-1/2 -translate-x-1/2 ${i % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[2deg]'}`} />

                      <div>
                        {/* Image Preview Box */}
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#F4EFE5] border border-[#DDD5C5] relative mb-4">
                          <img
                            src={img}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/books.png"; }}
                          />
                          <div className="absolute top-2 left-2 bg-[#FAF6EE]/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#DDD5C5] text-[10px] font-mono text-[#3A342D] font-bold shadow-xs">
                            {badge}
                          </div>
                        </div>

                        {/* Title and Price */}
                        <div className="flex justify-between items-baseline mb-1">
                          <h3
                            className="text-xl sm:text-2xl text-[#3A342D] group-hover:text-[#C27871] transition-colors"
                            style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                          >
                            {item.name}
                          </h3>
                        </div>

                        <p className="font-glory text-base text-[#C27871] font-bold mb-2">
                          {item.price ? `From ₹${item.price}` : 'Custom Sizing'}
                        </p>

                        <p className="font-glory text-base text-[#3A342D]/80 leading-relaxed line-clamp-2 mb-4 font-bold">
                          {item.description || "Archival-quality physical artifact crafted with immense love."}
                        </p>
                      </div>

                      {/* Button Action */}
                      <div className="pt-2 border-t border-[#DDD5C5]">
                        <span className="font-glory text-base text-[#C27871] font-bold group-hover:translate-x-1 transition-transform block">
                          Customize this format
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

      </main>

      {/* Scrapbook Footer */}
      <ScrapbookFooter />
    </div>
  );
}
