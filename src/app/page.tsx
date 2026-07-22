"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { customEase, MagneticButton, productsData, Footer, HeaderNav } from "@/components/shared";

function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[85vh] overflow-clip bg-black text-white">
      {/* Edge to edge background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <img
          src="/images/hero.png"
          alt="Minimalist Hero"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden mb-6"
        >
          <span className="block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/70 font-medium">
            The Art of Subtraction
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-light tracking-tighter text-6xl sm:text-7xl md:text-8xl lg:text-[120px] leading-[0.9] text-white max-w-5xl mix-blend-difference"
        >
          Distill Your <br />
          <span className="italic font-serif font-normal text-white/80">Memories.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] font-medium text-white/50">
            Scroll to Discover
          </span>
          <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-full bg-white"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCollections() {
  const homeProducts = productsData.slice(0, 3);

  return (
    <section className="pt-32 pb-32 px-6 md:px-12 lg:px-24 bg-white text-[#111]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: customEase }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8"
        >
          <h2 className="font-sans font-light tracking-tight text-4xl md:text-5xl lg:text-7xl max-w-2xl leading-none">
            Curated Formats.
          </h2>
          <Link href="/products" className="group flex items-center gap-4 cursor-pointer">
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#111] transition-colors">
              View Archive
            </span>
            <div className="w-12 h-12 rounded-full border border-[#111]/20 flex items-center justify-center group-hover:bg-[#111] group-hover:border-[#111] transition-colors duration-500">
              <ArrowRight className="w-4 h-4 text-[#111] group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-500 ease-[0.16,1,0.3,1]" />
            </div>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {homeProducts.map((item, i) => (
            <ProductCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ item, index }: { item: any; index: number }) {
  return (
    <Link href={item.href} className="group block w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: index * 0.15, ease: customEase }}
        className="relative flex flex-col gap-6"
      >
        <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#f4f4f4]">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#888] block mb-2">
              {item.badge || `0${index + 1}`}
            </span>
            <h3 className="font-sans text-xl md:text-2xl font-light tracking-tight text-[#111]">
              {item.title}
            </h3>
          </div>
          <ArrowRight className="w-5 h-5 text-[#111] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
        </div>
      </motion.div>
    </Link>
  );
}

function Craftsmanship() {
  return (
    <section className="bg-[#111] text-white py-32 md:py-48 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="font-sans font-light tracking-tight text-5xl md:text-7xl leading-none mb-12"
          >
            Tactile <br /> Precision.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
            className="text-lg text-white/60 font-light max-w-md leading-relaxed"
          >
            Every product is bound, printed, and inspected with meticulous attention to detail. We strip away the unnecessary so only the emotion remains.
          </motion.p>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-16 md:gap-32">
          {[
            {
              title: "Archival Papers",
              desc: "Acid-free, museum-grade matte sheets that resist fading for centuries.",
              img: "/images/craft1.png"
            },
            {
              title: "Layflat Binding",
              desc: "Seamless 180-degree spreads. No lost details in the gutter.",
              img: "/images/craft2.png"
            },
            {
              title: "Optic Clear Acrylic",
              desc: "Anti-reflective glass offering vivid contrast and pure clarity.",
              img: "/images/hero.png" // Reusing an image as placeholder
            }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: customEase }}
              className="flex flex-col gap-6"
            >
              <div className="w-full aspect-video md:aspect-[3/2] overflow-hidden bg-[#222]">
                <img src={feature.img} alt={feature.title} className="w-full h-full object-cover opacity-80" />
              </div>
              <div>
                <h4 className="text-2xl font-light tracking-tight mb-3">{feature.title}</h4>
                <p className="text-white/50 font-light text-sm md:text-base max-w-md leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="py-32 md:py-56 px-6 bg-[#fafafa] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-[#111]/10" />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl text-center relative z-10"
      >
        {/* Giant subtle quote mark */}
        <div className="text-[#111]/5 font-serif text-[180px] md:text-[280px] leading-none absolute -top-20 md:-top-32 left-1/2 -translate-x-1/2 pointer-events-none select-none">
          &ldquo;
        </div>
        
        <h3 className="font-serif italic font-light text-4xl md:text-5xl lg:text-6xl text-[#111] leading-[1.2] mb-16 relative z-10">
          Simplicity is the ultimate sophistication.<br className="hidden md:block" /> We frame what matters, and let go of the rest.
        </h3>
        
        <div className="flex items-center justify-center gap-6">
          <span className="w-12 h-[1px] bg-[#111]/20" />
          <p className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#111]/60">
            The Studio
          </p>
          <span className="w-12 h-[1px] bg-[#111]/20" />
        </div>
      </motion.div>
    </section>
  );
}

export default function GalleryLandingPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111] font-sans selection:bg-[#111] selection:text-white">
      <HeaderNav />
      <HeroSection />
      <ProductCollections />
      <Craftsmanship />
      <QuoteSection />
      <Footer />
    </main>
  );
}
