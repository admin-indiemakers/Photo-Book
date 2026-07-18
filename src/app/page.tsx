"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { customEase, MagneticButton, productsData, Footer, HeaderNav } from "@/components/shared";

function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Background image */}
      <motion.div 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: customEase }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="/images/hero.png" 
          alt="Luxury Photobook" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-white w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center mt-20">
        <div className="max-w-xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: customEase }}
            className="font-serif text-5xl md:text-7xl lg:text-[90px] leading-[1.05] mb-6"
          >
            Memories,<br />Curated<br />Offline.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: customEase }}
            className="text-base md:text-lg font-light mb-10 max-w-sm leading-relaxed opacity-90"
          >
            Beautifully crafted keepsakes for the moments that <i className="font-serif">matter</i> most.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: customEase }}
          >
            <MagneticButton variant="light" className="pl-6 pr-4">
              Start Creating <ArrowRight className="w-4 h-4 ml-2" />
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/70"
      >
        <div className="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center text-[10px] font-serif italic">
          i
        </div>
        <span className="text-[9px] uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}

function ProductCollections() {
  const homeProducts = productsData.slice(0, 3);

  return (
    <section className="pt-16 pb-8 md:pt-20 md:pb-10 px-6 bg-[#f4f2ee]">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: customEase }}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h4 className="text-[#a08a73] uppercase tracking-[0.2em] text-[10px] font-semibold mb-4">Our Collections</h4>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] text-[#2c2b29] max-w-lg leading-[1.1]">
              Timeless pieces for every chapter of life.
            </h2>
          </div>
          <Link href="/products" className="text-[#2c2b29] font-medium hover:opacity-70 transition-opacity uppercase tracking-[0.15em] text-[10px] flex items-center gap-2 pb-2">
            View All Collections <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {homeProducts.map((item, i) => (
            <Link href={item.href} key={item.title} className="block group">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: customEase }}
                className="relative bg-[#ebe8e3] rounded-md overflow-hidden h-[500px] shadow-sm hover:shadow-xl transition-shadow duration-500 flex flex-col justify-end p-8"
              >
                {/* Product Image */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
                  />
                  {/* Gradient overlay for text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>
                
                {/* Badge */}
                {item.badge && (
                  <div className="absolute top-6 left-6 z-10 px-3 py-1 bg-white text-[#2c2b29] text-[9px] uppercase tracking-widest font-semibold rounded-sm shadow-sm flex items-center justify-center">
                    {item.badge}
                  </div>
                )}
                
                {/* Content */}
                <div className="relative z-10 text-white flex justify-between items-end w-full">
                  <div className="flex-1 pr-4">
                    <h3 className="font-serif text-2xl mb-1">{item.title}</h3>
                    <p className="text-white/70 font-light text-[13px] leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-[#2c2b29] transition-colors duration-300 shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Craftsmanship() {
  return (
    <section className="pt-8 pb-16 md:pt-10 md:pb-20 px-6 bg-[#f4f2ee]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-20">
        
        {/* Left: Images */}
        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[650px]">
          <div className="absolute top-0 left-0 w-[75%] h-[65%] rounded-lg overflow-hidden z-10">
            <img src="/images/craft1.png" alt="Craftsmanship detail" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-[65%] h-[55%] rounded-lg overflow-hidden shadow-2xl z-20">
            <img src="/images/craft2.png" alt="Paper texture" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right: Text */}
        <div className="w-full lg:w-1/2 lg:pl-10">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: customEase }}
          >
            <h4 className="text-[#a08a73] uppercase tracking-[0.2em] text-[10px] font-semibold mb-4">Our Craftsmanship</h4>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] text-[#2c2b29] mb-16 leading-[1.1]">
              Crafted with intention.<br/>Made to last.
            </h2>
            
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#d3cdc2] bg-white flex items-center justify-center text-[#2c2b29]">
                  {/* Icon placeholder */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-[#2c2b29] mb-2 tracking-wide">
                    <span className="text-[12px] mr-2">01.</span> Archival-Quality Paper
                  </h4>
                  <p className="text-gray-500 font-light text-[14px] leading-relaxed max-w-md">
                    Printed on 300gsm acid-free matte paper, ensuring your memories retain their vibrance and texture for generations without fading.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#d3cdc2] bg-white flex items-center justify-center text-[#2c2b29]">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-[#2c2b29] mb-2 tracking-wide">
                    <span className="text-[12px] mr-2">02.</span> Seamless Layflat Binding
                  </h4>
                  <p className="text-gray-500 font-light text-[14px] leading-relaxed max-w-md">
                    Our signature 180-degree layflat binding means panoramas span across spreads flawlessly—no lost details in the gutter, just uninterrupted beauty.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#d3cdc2] bg-white flex items-center justify-center text-[#2c2b29]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
                <div>
                  <h4 className="text-[15px] font-semibold text-[#2c2b29] mb-2 tracking-wide">
                    <span className="text-[12px] mr-2">03.</span> Museum-Grade Acrylic
                  </h4>
                  <p className="text-gray-500 font-light text-[14px] leading-relaxed max-w-md">
                    Frames sealed with anti-reflective, UV-protecting acrylic glass, preserving the sharp contrast and rich hues of your most cherished moments.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
               <MagneticButton variant="dark">
                 Discover Our Process <ArrowRight className="w-4 h-4 ml-2" />
               </MagneticButton>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center text-white mt-10 md:mt-16">
      <div className="absolute inset-0 z-0">
        <img src="/images/footer.png" alt="Mountain Landscape" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10 px-6 max-w-3xl mx-auto flex flex-col items-center">
        <div className="mb-8 text-white/80">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
        </div>
        <h3 className="font-serif text-3xl md:text-5xl lg:text-[56px] leading-[1.1] mb-8">
          It's not just a photo book.<br/>It's where our story lives.
        </h3>
        <p className="text-[10px] uppercase tracking-[0.2em] mb-12 opacity-80 font-medium">— ALEX & MEGAN</p>
        
        <div className="flex justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-100" />
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
          <div className="w-1.5 h-1.5 rounded-full bg-white opacity-40" />
        </div>
      </div>
    </section>
  );
}

export default function GalleryLandingPage() {
  return (
    <main className="bg-[#f4f2ee] min-h-screen text-[#2c2b29] font-sans selection:bg-[#2c2b29] selection:text-white">
      <HeaderNav />
      <HeroSection />
      <ProductCollections />
      <Craftsmanship />
      <QuoteSection />
      <Footer />
    </main>
  );
}
