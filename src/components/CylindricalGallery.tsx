"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

import polaroid1 from "../assets/polaroid1.jpg";
import polaroid2 from "../assets/polaroid2.jpg";
import polaroid3 from "../assets/polaroid3.jpg";
import polaroid4 from "../assets/polaroid4.png";
import polaroid5 from "../assets/polaroid5.png";
import polaroid6 from "../assets/polaroid6.png";
import polaroid7 from "../assets/polaroid7.jpg";
import polaroid8 from "../assets/polaroid8.jpg";

const baseGalleryItems = [
  { id: 1, title: "EXHIBIT 01", subtitle: "MONOCHROME", date: "PARIS, FR", img: polaroid1.src },
  { id: 2, title: "EXHIBIT 02", subtitle: "SILHOUETTES", date: "MILAN, IT", img: polaroid2.src },
  { id: 3, title: "EXHIBIT 03", subtitle: "ARCHITECTURE", date: "LONDON, UK", img: polaroid3.src },
  { id: 4, title: "EXHIBIT 04", subtitle: "STILL LIFE", date: "TOKYO, JP", img: polaroid4.src },
  { id: 5, title: "EXHIBIT 05", subtitle: "PORTRAITS", date: "NEW YORK, US", img: polaroid5.src },
  { id: 6, title: "EXHIBIT 06", subtitle: "LANDSCAPES", date: "OSLO, NO", img: polaroid6.src },
  { id: 7, title: "EXHIBIT 07", subtitle: "MOTION", date: "BERLIN, DE", img: polaroid7.src },
  { id: 8, title: "EXHIBIT 08", subtitle: "TEXTURES", date: "COPENHAGEN, DK", img: polaroid8.src },
];

// Duplicate to create a 16-sided polygon instead of an 8-sided one (makes the cylinder huge and smooth!)
const galleryItems = [
  ...baseGalleryItems,
  ...baseGalleryItems.map(item => ({ ...item, id: item.id + 8 }))
];

export function CylindricalGallery() {
  const [isHovered, setIsHovered] = useState(false);
  const dragX = useMotionValue(0);
  const rotationY = useTransform(dragX, [-2000, 2000], [-360, 360]);

  // Auto-rotation logic
  useEffect(() => {
    let animation: any;
    if (!isHovered) {
      // Rotate continuously
      animation = animate(dragX, dragX.get() - 2000, {
        duration: 35,
        repeat: Infinity,
        ease: "linear",
      });
    }
    return () => {
      if (animation) animation.stop();
    };
  }, [isHovered, dragX]);

  const numItems = galleryItems.length;
  const itemWidth = 320; 
  // Base radius for a perfect polygon
  const radius = Math.round((itemWidth / 2) / Math.tan(Math.PI / numItems)); 

  return (
    <section className="relative w-full h-[80vh] md:h-[90vh] bg-white overflow-hidden flex flex-col justify-center items-center cursor-grab active:cursor-grabbing border-t border-[#EAEAEA]">
      
      {/* Invisible 2D Drag Pane */}
      <motion.div 
        drag="x"
        dragConstraints={{ left: -10000, right: 10000 }}
        style={{ x: dragX }}
        className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      />

      {/* 3D Scene Container */}
      <div 
        className="relative w-full max-w-[1200px] h-[500px] md:h-[600px] flex justify-center items-center perspective-[1200px] md:perspective-[1600px] pointer-events-none"
        style={{ 
          clipPath: "ellipse(130% 90% at 50% 50%)"
        }}
      >
        <motion.div
          style={{ rotateY: rotationY }}
          transformTemplate={({ rotateY }) => `translateZ(-${radius + 100}px) rotateY(${rotateY})`}
          className="relative w-full h-full flex justify-center items-center preserve-3d"
        >
          {galleryItems.map((item, index) => {
            const angle = (360 / numItems) * index;
            
            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`absolute w-[260px] sm:w-[320px] h-[380px] sm:h-[480px] bg-[#FAFAFA] rounded-sm flex flex-col backface-hidden shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-[#EAEAEA] select-none cursor-pointer transition-colors p-4`}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                }}
                transformTemplate={({ scale }) => `rotateY(${angle}deg) translateZ(${radius}px) scale(${scale !== undefined ? scale : 1})`}
              >
                {/* Clean, editorial image block */}
                <div className="relative w-full h-[65%] overflow-hidden bg-[#F0F0F0] mb-6">
                  <img src={item.img} alt={item.subtitle} className="w-full h-full object-cover opacity-90 transition-all duration-700 hover:opacity-100 hover:scale-105" draggable="false" />
                </div>
                
                <div className="flex flex-col text-[#111111] justify-between flex-grow">
                  <div className="flex justify-between items-start font-sans font-medium uppercase tracking-[0.2em] text-[9px] text-[#888]">
                    <span>{item.title}</span>
                    <span>No. {index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                  </div>
                  
                  <div className="flex flex-col mt-4">
                    <h3 className="font-[family-name:var(--font-instrument)] italic font-normal text-3xl tracking-tight leading-none text-[#111]">
                      {item.subtitle}
                    </h3>
                  </div>
                  
                  <div className="flex justify-between items-end font-sans uppercase tracking-[0.2em] text-[9px] mt-auto border-t border-[#EAEAEA] pt-4 text-[#888]">
                    <span>{item.date}</span>
                    <span className="w-8 h-8 rounded-full border border-[#EAEAEA] flex items-center justify-center hover:bg-[#111] hover:text-white hover:border-[#111] transition-colors">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-12 flex flex-col md:flex-row items-center gap-8 md:gap-10 text-[#111] z-20 pointer-events-auto bg-white/90 backdrop-blur-md px-10 py-6 rounded-3xl md:rounded-full border border-[#EAEAEA] shadow-md">
        <div className="flex flex-col text-center md:text-left mb-2 md:mb-0">
          <span className="font-[family-name:var(--font-instrument)] italic text-2xl md:text-3xl">Polaroid Cards</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#888] mt-1">Fully customizable text</span>
        </div>
        <div className="hidden md:block w-[1px] h-10 bg-[#EAEAEA]"></div>
        <a href="/polaroid" className="mt-2 md:mt-0 bg-[#111] text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-[#E85D26] transition-colors">
          Create Yours
        </a>
      </div>
    </section>
  );
}
