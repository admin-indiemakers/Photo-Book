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
    <main className="bg-archival-cream text-ink-charcoal font-body-md antialiased min-h-screen pt-32 md:pt-40">
      <HeaderNav />

      <section className="pb-16 md:pb-24 px-6 md:px-margin-desktop min-h-[80vh]">
        <div className="max-w-7xl mx-auto relative">

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            className="mb-16 md:mb-20 text-center"
          >
            <span className="font-label-caps text-xs text-brass-gold font-bold mb-4 block tracking-widest uppercase">
              COLLECTIONS
            </span>
            <h1 className="font-headline-lg text-4xl sm:text-5xl lg:text-[60px] text-ink-charcoal mb-6 leading-tight">Curated Formats.</h1>
            <p className="font-body-lg text-base md:text-lg text-ink-charcoal/75 max-w-xl mx-auto leading-relaxed">
              Explore our full range of premium, archival-quality physical artifacts designed to turn your digital memories into lasting heirlooms.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-ink-charcoal/20 border-t-brass-gold rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {products.map((item, i) => {
                const img = item.images && item.images.length > 0 ? item.images[0] : "/images/hero.png";
                const badge = getBadgeFromName(item.name);
                const href = getHrefFromCategory(item.category);

                return (
                  <Link href={href} key={item.id} className="block group">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: customEase }}
                      className="product-card"
                    >
                      <div className="card-minimal bg-archival-cream p-5 mb-6 rounded-lg border border-ink-charcoal/10 shadow-md overflow-hidden">
                        <div className="aspect-[4/5] overflow-hidden bg-surface-container relative rounded-md">
                          <img 
                            src={img} 
                            alt={item.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/books.png"; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                            <span className="text-archival-cream font-label-caps text-xs font-bold tracking-wider flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">photo_library</span> Archival Edition
                            </span>
                          </div>

                          {badge && (
                            <div className="absolute top-3 left-3 px-3 py-1 bg-archival-cream/90 backdrop-blur-md text-brass-gold font-label-caps text-[10px] uppercase tracking-widest font-bold rounded-full border border-brass-gold/30 shadow-sm">
                              {badge}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-2">
                        <span className="font-label-caps text-xs font-bold text-brass-gold tracking-widest">
                          {badge || 'COLLECTION'}
                        </span>
                        <span className="font-label-caps text-xs font-bold text-ink-charcoal/70 tracking-wider">
                          {item.price ? `FROM $${item.price}` : 'CUSTOM'}
                        </span>
                      </div>
                      <h3 className="font-headline-md text-xl md:text-2xl font-medium text-ink-charcoal mb-2 leading-tight">{item.name}</h3>
                      <p className="font-body-md text-sm md:text-base text-ink-charcoal/75 mb-5 leading-relaxed line-clamp-2">{item.description}</p>
                      <span className="nav-link font-label-caps text-xs font-bold tracking-widest uppercase text-ink-charcoal inline-flex items-center gap-2 group/btn">
                        Customize Formats <span className="material-symbols-outlined text-[16px] transition-transform group-hover/btn:translate-x-2">arrow_forward</span>
                      </span>
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
