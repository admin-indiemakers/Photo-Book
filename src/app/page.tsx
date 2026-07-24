"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { customEase, MagneticButton, productsData, Footer, HeaderNav } from "@/components/shared";
import { CylindricalGallery } from "@/components/CylindricalGallery";
import { MagneticImage, SplitTextReveal, InfiniteMarquee } from "@/components/PremiumEffects";

import { useState, useEffect } from "react";

function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1 based on center of screen
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const photos = [
    { src: "/images/hero.png", baseRotate: -15, baseTranslate: { x: -20, y: 10 } },
    { src: "/images/keepsakes.png", baseRotate: 8, baseTranslate: { x: 30, y: -20 } },
    { src: "/images/craft1.png", baseRotate: -5, baseTranslate: { x: -40, y: -30 } },
    { src: "/images/tpl_wedding.png", baseRotate: 20, baseTranslate: { x: 50, y: 30 } },
    { src: "/images/books.png", baseRotate: 0, baseTranslate: { x: 0, y: 0 } },
  ];

  return (
    <section 
      className="relative w-full h-screen overflow-hidden bg-[#FAFAFA] text-[#111111] flex items-center justify-center cursor-crosshair"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Scattered Polaroids Stack */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        {photos.map((photo, idx) => {
          // Calculate scatter effect based on mouse distance from center
          // The further the mouse is from center, the more they scatter
          const scatterMagnitude = isHovering ? Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2) * 450 : 0;
          
          // Each photo scatters in a slightly different direction
          const scatterDirectionX = photo.baseTranslate.x > 0 ? 1 : photo.baseTranslate.x < 0 ? -1 : (mousePosition.x > 0 ? -1 : 1);
          const scatterDirectionY = photo.baseTranslate.y > 0 ? 1 : photo.baseTranslate.y < 0 ? -1 : (mousePosition.y > 0 ? -1 : 1);

          return (
            <motion.div
              key={idx}
              className="absolute w-[280px] md:w-[400px] aspect-[4/5] bg-white p-4 pb-16 shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-[#EAEAEA]"
              initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotate: photo.baseRotate + (mousePosition.x * photo.baseRotate * 1.5),
                x: photo.baseTranslate.x + (scatterDirectionX * scatterMagnitude) + (mousePosition.x * -80 * idx),
                y: photo.baseTranslate.y + (scatterDirectionY * scatterMagnitude) + (mousePosition.y * -80 * idx),
              }}
              transition={{ 
                type: "spring", 
                stiffness: 80, 
                damping: 25, 
                mass: 1.5,
                opacity: { duration: 1, delay: idx * 0.1 },
                scale: { duration: 1, delay: idx * 0.1 }
              }}
              style={{ zIndex: idx }}
            >
              <img src={photo.src} alt="Polaroid" className="w-full h-full object-cover transition-all duration-700 pointer-events-auto" />
            </motion.div>
          );
        })}
      </div>

      {/* Foreground Typography */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="relative z-10 flex flex-col items-center text-center max-w-[90vw] pointer-events-none mix-blend-exclusion text-white"
      >
        <div className="font-[family-name:var(--font-instrument)] tracking-tight text-7xl md:text-[120px] lg:text-[180px] font-normal leading-[0.8] mb-8 drop-shadow-2xl">
          <SplitTextReveal text="Offline" delay={1.2} />
          <span className="italic block mt-4">
            <SplitTextReveal text="Living." delay={1.4} />
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: customEase }}
          className="flex flex-col sm:flex-row items-center gap-6 mt-12 pointer-events-auto"
        >
          <Link 
            href="/templates"
            className="w-full sm:w-auto px-12 py-5 bg-[#fdc930] text-[#111] rounded-full text-xs uppercase tracking-[0.2em] font-bold hover:scale-105 shadow-[0_20px_40px_-10px_rgba(253,201,48,0.3)] inline-flex justify-center items-center transition-transform"
          >
            Start Creating
          </Link>
        </motion.div>
      </motion.div>
      
    </section>
  );
}

function FlagshipProductSection() {
  return (
    <section className="w-full bg-[#FAFAFA] py-32 md:py-48 px-6 md:px-12 lg:px-24 border-t border-[#EAEAEA]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Left Side: Real Product Copy */}
        <div className="flex flex-col lg:col-span-5 lg:sticky lg:top-32">
          <div className="text-[50px] md:text-[80px] leading-[1] font-medium tracking-tight text-[#111] mb-8">
            <SplitTextReveal text="The Signature" delay={0.2} />
            <span className="font-[family-name:var(--font-instrument)] font-normal italic text-[#888] block overflow-hidden mt-2">
              <SplitTextReveal text="Layflat Album." delay={0.3} />
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[#555] font-light text-lg md:text-xl max-w-sm mb-10 leading-relaxed"
          >
            Our flagship photo book. Hand-bound with seamless layflat pages and printed on ultra-thick, acid-free archival paper. The ultimate permanent home for your most important memories.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-16"
          >
            <Link href="/templates" className="inline-flex items-center gap-2 bg-[#111] text-white px-8 py-4 rounded-full text-xs uppercase tracking-widest hover:bg-[#E85D26] transition-colors">
              Create Photobook
            </Link>
          </motion.div>

          <div className="flex flex-col gap-12 border-l border-[#EAEAEA] pl-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h3 className="font-[family-name:var(--font-instrument)] text-5xl md:text-6xl text-[#111] mb-3">800gsm</h3>
              <p className="text-sm text-[#888] font-light max-w-[200px] leading-relaxed uppercase tracking-widest">
                Ultra-thick rigid pages that never bend
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h3 className="font-[family-name:var(--font-instrument)] text-5xl md:text-6xl text-[#111] mb-3">180°</h3>
              <p className="text-sm text-[#888] font-light max-w-[200px] leading-relaxed uppercase tracking-widest">
                Seamless panoramic spreads
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side: Real Product Images in Bento Box */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: customEase }}
            className="col-span-2 relative w-full aspect-video bg-white p-4 border border-[#EAEAEA] overflow-hidden group shadow-sm"
          >
            <MagneticImage>
              <img src="https://images.unsplash.com/photo-1544627836-822bfe450209?q=80&w=2940&auto=format&fit=crop" alt="Premium Layflat Photo Book Open" className="w-full h-full object-cover transition-all duration-1000 pointer-events-none" />
            </MagneticImage>
            <div className="absolute top-8 left-8 bg-[#fdc930] text-[#111] px-4 py-2 pointer-events-none shadow-md">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Flagship Product</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: customEase }}
            className="col-span-1 relative w-full aspect-[4/5] bg-white p-4 border border-[#EAEAEA] overflow-hidden group shadow-sm"
          >
            <MagneticImage>
              <img src="https://images.unsplash.com/photo-1621600411688-4be93cd68504?q=80&w=2800&auto=format&fit=crop" alt="Thick Paper Detail" className="w-full h-full object-cover bg-[#F9F9F9] transform group-hover:scale-105 transition-transform duration-1000 pointer-events-none" />
            </MagneticImage>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: customEase }}
            className="col-span-1 relative w-full aspect-[4/5] bg-white p-10 flex flex-col justify-center items-center border border-[#EAEAEA] shadow-sm text-center"
          >
            <div className="w-12 h-[1px] bg-[#111] mb-6"></div>
            <h4 className="font-serif text-2xl mb-4 text-[#111]">No Lost Details</h4>
            <p className="text-xs text-[#888] leading-relaxed">
              Unlike traditional books, our signature layflat binding ensures your photos span seamlessly across the gutter without any visual interruption.
            </p>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}

function ProductCollections() {
  const homeProducts = productsData.slice(0, 3);

  return (
    <section className="pt-32 pb-32 px-6 md:px-12 lg:px-24 bg-white text-[#111] border-t border-[#EAEAEA]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: customEase }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8 border-b border-[#EAEAEA] pb-12"
        >
          <h2 className="font-[family-name:var(--font-instrument)] tracking-tight text-5xl md:text-7xl lg:text-[90px] max-w-2xl leading-none">
            Curated Formats.
          </h2>
          <Link href="/products" className="group flex items-center gap-4 cursor-pointer">
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#111] transition-colors">
              View Archive
            </span>
            <div className="w-12 h-12 rounded-full border border-[#EAEAEA] flex items-center justify-center group-hover:bg-[#111] group-hover:border-[#111] transition-colors duration-500 shadow-sm">
              <ArrowRight className="w-4 h-4 text-[#111] group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-500 ease-[0.16,1,0.3,1]" />
            </div>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
    <Link href={item.href} className="group block w-full bg-[#FAFAFA] p-6 border border-[#EAEAEA] hover:shadow-xl transition-shadow duration-700">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: index * 0.15, ease: customEase }}
        className="relative flex flex-col gap-8 h-full"
      >
        <div className="flex justify-between items-start w-full">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#fdc930] font-bold">
            {item.badge || `No. 0${index + 1}`}
          </span>
          <ArrowRight className="w-4 h-4 text-[#111] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out" />
        </div>
        
        <div className="relative w-full aspect-square overflow-hidden bg-white border border-[#EAEAEA] shadow-sm flex items-center justify-center p-8">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-110"
          />
        </div>

        <div className="mt-auto">
          <h3 className="font-serif text-2xl tracking-tight text-[#111] mb-2">
            {item.title}
          </h3>
          <p className="text-[#888] font-light text-sm max-w-[85%] leading-relaxed">
            {item.desc}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}

function Craftsmanship() {
  return (
    <section className="bg-[#FAFAFA] text-[#111] py-32 md:py-48 px-6 md:px-12 lg:px-24 border-t border-[#EAEAEA]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-[1px] bg-[#111111]"></span>
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#555]">The Process</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="font-[family-name:var(--font-instrument)] tracking-tight text-6xl md:text-8xl leading-none mb-12"
          >
            Gallery <br /> Standard.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
            className="text-lg text-[#555] font-light max-w-md leading-relaxed"
          >
            Elevate your space with our premium wall art collection. From solid wood frames to museum-grade acrylics, we craft pieces that demand attention.
          </motion.p>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-12">
          {[
            {
              title: "Solid Wood Frames",
              desc: "Handcrafted from sustainably sourced timber, providing a timeless border for your memories.",
              img: "/images/frames.png"
            },
            {
              title: "Optic Clear Acrylic",
              desc: "Anti-reflective museum glass offering vivid contrast, pure clarity, and UV protection.",
              img: "/images/craft1.png"
            },
            {
              title: "Woven Canvas",
              desc: "Rich, textured fine-art canvas stretched tightly over premium wooden bars.",
              img: "/images/craft2.png"
            }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: customEase }}
              className="flex flex-col md:flex-row gap-8 items-center bg-white border border-[#EAEAEA] p-6 hover:shadow-lg transition-shadow duration-500 group"
            >
              <div className="w-full md:w-48 aspect-square overflow-hidden bg-[#FAFAFA] flex-shrink-0 flex items-center justify-center p-6 border border-[#EAEAEA]">
                <img src={feature.img} alt={feature.title} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-[1s]" />
              </div>
              <div>
                <h4 className="text-2xl font-serif tracking-tight mb-3 text-[#111]">{feature.title}</h4>
                <p className="text-[#888] font-light text-sm max-w-md leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParallaxDivider() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden border-y border-[#EAEAEA]">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[140%] -top-[20%]"
      >
        <img 
          src="/images/editor.png" 
          alt="The Studio" 
          className="w-full h-full object-cover" 
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#111]/30 pointer-events-none mix-blend-multiply"></div>
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-white font-serif text-5xl md:text-8xl italic opacity-90 mix-blend-overlay">The Studio</h2>
      </div>
    </section>
  );
}

function QuoteSection() {
  const [hoverImage, setHoverImage] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="py-32 md:py-56 px-6 bg-white flex flex-col items-center justify-center relative overflow-hidden border-t border-[#EAEAEA]">
      
      <AnimatePresence>
        {hoverImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed pointer-events-none z-0 w-[300px] md:w-[450px] aspect-[4/5] overflow-hidden shadow-2xl border border-[#EAEAEA]"
            style={{ 
              left: mousePosition.x - 225, 
              top: mousePosition.y - 280 
            }}
          >
            <img src={hoverImage} className="w-full h-full object-cover bg-[#FAFAFA]" alt="Hover Reveal" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-[#EAEAEA]" />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl text-center relative z-10"
      >
        {/* Giant subtle quote mark */}
        <div className="text-[#FAFAFA] font-serif text-[180px] md:text-[280px] leading-none absolute -top-20 md:-top-32 left-1/2 -translate-x-1/2 pointer-events-none select-none">
          &ldquo;
        </div>
        
        <h3 className="font-[family-name:var(--font-instrument)] italic font-normal text-5xl md:text-6xl lg:text-[80px] text-[#111] leading-[1.1] mb-16 relative z-10">
          Simplicity is the ultimate <span 
            className="relative inline-block cursor-crosshair text-[#E85D26] hover:text-[#111] transition-colors duration-500"
            onMouseEnter={() => setHoverImage("/images/books.png")}
            onMouseLeave={() => setHoverImage(null)}
          >sophistication</span>.<br className="hidden md:block" /> We <span 
            className="relative inline-block cursor-crosshair text-[#E85D26] hover:text-[#111] transition-colors duration-500"
            onMouseEnter={() => setHoverImage("/images/frames.png")}
            onMouseLeave={() => setHoverImage(null)}
          >frame</span> what matters.
        </h3>
        
        <div className="flex items-center justify-center gap-6">
          <span className="w-12 h-[1px] bg-[#EAEAEA]" />
          <p className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#888]">
            The Studio
          </p>
          <span className="w-12 h-[1px] bg-[#EAEAEA]" />
        </div>
      </motion.div>
    </section>
  );
}

export default function GalleryLandingPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111] font-sans selection:bg-[#EAEAEA] selection:text-[#111]">
      <HeaderNav />
      <HeroSection />
      <ProductCollections />
      <FlagshipProductSection />
      <CylindricalGallery />
      <ParallaxDivider />
      <Craftsmanship />
      <InfiniteMarquee text="MUSEUM GRADE ARCHIVAL PAPER ✦ PRINTED IN STUDIO ✦ TACTILE PRECISION ✦ OFFLINE LIVING" />
      <QuoteSection />
      <Footer />
    </main>
  );
}
