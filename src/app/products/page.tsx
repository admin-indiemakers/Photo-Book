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
    <main className="bg-white min-h-screen text-black font-sans selection:bg-[#f26523] selection:text-white pt-32 md:pt-40">
      <HeaderNav />

      <section className="pb-6 md:pb-24 px-4 md:px-6 bg-white min-h-0 md:min-h-[80vh]">
        <div className="max-w-7xl mx-auto relative">


          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            className="mb-16 md:mb-24 text-center"
          >
            <h1 className="font-[family-name:var(--font-instrument)] italic text-5xl md:text-[80px] text-[#111] mb-6 leading-none">Our Collections</h1>
            <p className="text-[#555] font-light text-sm md:text-base max-w-xl mx-auto leading-relaxed">
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
                      <div className="relative h-[250px] md:h-[500px] w-full bg-[#FAFAFA] border border-[#EAEAEA] mb-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] overflow-hidden">
                        <img src={img} alt={item.name} className="absolute inset-0 w-full h-full object-cover grayscale-[15%] transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
                        <div className="absolute inset-0 bg-[#EAE5D9] mix-blend-multiply opacity-10"></div>
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />

                        {badge && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-white text-[#111] text-[9px] uppercase tracking-widest font-semibold rounded-full border border-[#EAEAEA] shadow-sm">
                            {badge}
                          </div>
                        )}
                      </div>

                      <h3 className="font-[family-name:var(--font-instrument)] text-2xl md:text-3xl text-[#111] mb-2 leading-tight">{item.name}</h3>
                      <p className="text-[#555] font-light text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none">{item.description}</p>
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
