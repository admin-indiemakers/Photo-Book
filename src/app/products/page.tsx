"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HeaderNav, Footer, productsData } from "@/components/shared";

const customEase = [0.16, 1, 0.3, 1] as const;

export default function AllProductsPage() {
  return (
    <main className="bg-white min-h-screen text-black font-sans selection:bg-[#f26523] selection:text-white pt-20">
      <HeaderNav />

      <section className="py-24 px-6 bg-white min-h-[80vh]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            className="mb-16 text-center"
          >
            <h1 className="font-serif text-5xl md:text-7xl text-black mb-6">Our Collections</h1>
            <p className="text-gray-500 font-light text-lg max-w-2xl mx-auto">
              Explore our full range of premium, archival-quality physical artifacts designed to turn your digital memories into lasting heirlooms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {productsData.map((item, i) => (
              <Link href={item.href} key={item.title} className="block">
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: customEase }}
                  className="group cursor-pointer perspective-[1000px]"
                >
                  <div className="relative h-[500px] md:h-[600px] w-full rounded-2xl overflow-hidden mb-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-x-2 group-hover:rotate-y-[-2deg] group-hover:scale-[1.02] shadow-sm hover:shadow-xl">
                    <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                    
                    {item.badge && (
                      <div className="absolute top-6 left-6 px-3 py-1 bg-white text-black text-xs uppercase tracking-widest font-semibold rounded-sm">
                        {item.badge === "Signature" ? (
                          <span className="text-[#c5161d]">{item.badge}</span>
                        ) : (
                          <span className="text-[#fdc930]">{item.badge}</span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-serif text-3xl text-black mb-3">{item.title}</h3>
                  <p className="text-gray-600 font-light text-lg leading-relaxed">{item.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
