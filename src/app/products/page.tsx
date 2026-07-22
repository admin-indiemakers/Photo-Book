"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HeaderNav, Footer } from "@/components/shared";
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
  if (name.includes('Book')) return 'Signature';
  if (name.includes('Frame') && !name.includes('Acrylic') && !name.includes('Canvas')) return 'Popular';
  if (name.includes('Acrylic')) return 'New';
  return '';
};

const customEase = [0.16, 1, 0.3, 1] as const;

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

  useEffect(() => {
    const triggerResize = () => {
      if ((window as any).lenis) {
        (window as any).lenis.resize();
      }
      if ((window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.refresh();
      }
      window.dispatchEvent(new Event('resize'));
    };

    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true);

      if (!error && data) {
        // Sort products according to the desired order
        const sortedData = [...data].sort((a, b) => {
          const indexA = PRODUCT_ORDER.findIndex(p => a.name.toLowerCase().includes(p));
          const indexB = PRODUCT_ORDER.findIndex(p => b.name.toLowerCase().includes(p));

          if (indexA === -1 && indexB === -1) return 0;
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;

          return indexA - indexB;
        });

        setProducts(sortedData);
        // Force lenis/scrolltrigger to recalculate height after DOM update
        setTimeout(triggerResize, 150);
        setTimeout(triggerResize, 500);
        setTimeout(triggerResize, 1000);
      }
      setLoading(false);
    }
    fetchProducts();

    // Trigger on mount as well to handle Next.js client-side navigation
    setTimeout(triggerResize, 150);
    setTimeout(triggerResize, 500);
  }, []);

  return (
    <main className="bg-white min-h-screen text-black font-sans selection:bg-[#f26523] selection:text-white pt-20">
      <HeaderNav />

      <section className="pt-2 pb-6 md:pt-0 md:pb-24 px-4 md:px-6 bg-white min-h-0 md:min-h-[80vh]">
        <div className="max-w-7xl mx-auto relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            className="absolute left-0 top-0 md:top-4 z-10"
          >
            <Link href="/" className="group inline-flex items-center gap-3 px-6 py-2.5 bg-white border border-[#e8e2d9] rounded-full text-[10px] uppercase tracking-[0.2em] font-medium text-[#2c2b29] hover:bg-[#f4f2ee] transition-all duration-300 shadow-sm hover:shadow">
              <svg className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back to Home
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            className="mb-4 md:mb-16 pt-16 md:pt-0 text-center"
          >
            <h1 className="font-serif text-4xl md:text-7xl text-black mb-3 md:mb-6">Our Collections</h1>
            <p className="text-gray-500 font-light text-xs md:text-lg max-w-2xl mx-auto">
              Explore our full range of premium, archival-quality physical artifacts designed to turn your digital memories into lasting heirlooms.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#f26523] rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
              {products.map((item, i) => {
                const img = item.images && item.images.length > 0 ? item.images[0] : "/images/hero.png";
                const badge = getBadgeFromName(item.name);
                const href = getHrefFromCategory(item.category);

                return (
                  <Link href={href} key={item.id} className="block">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: customEase }}
                      className="group cursor-pointer perspective-[1000px]"
                    >
                      <div className="relative h-[130px] sm:h-[160px] md:h-[600px] w-full rounded-lg md:rounded-2xl overflow-hidden mb-2 md:mb-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-x-2 group-hover:rotate-y-[-2deg] group-hover:scale-[1.02] shadow-sm hover:shadow-xl">
                        <img src={img} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

                        {badge && (
                          <div className="absolute top-2 left-2 md:top-6 md:left-6 px-1.5 py-0.5 md:px-3 md:py-1 bg-white text-black text-[8px] md:text-xs uppercase tracking-widest font-semibold rounded-sm">
                            {badge === "Signature" ? (
                              <span className="text-[#c5161d]">{badge}</span>
                            ) : (
                              <span className="text-[#fdc930]">{badge}</span>
                            )}
                          </div>
                        )}
                      </div>

                      <h3 className="font-serif text-[11px] sm:text-xs md:text-3xl text-black mb-1 md:mb-3 leading-tight">{item.name}</h3>
                      <p className="text-gray-600 font-light text-[9px] sm:text-[10px] md:text-lg leading-tight md:leading-relaxed line-clamp-2 md:line-clamp-none">{item.description}</p>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
