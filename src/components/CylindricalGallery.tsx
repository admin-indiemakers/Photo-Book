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
  { id: 1, title: "COLLECTION 01", subtitle: "HEART SHAPE", date: "WALL DECOR", img: polaroid1.src },
  { id: 2, title: "COLLECTION 02", subtitle: "FAIRY LIGHTS", date: "HOME DECOR", img: polaroid2.src },
  { id: 3, title: "COLLECTION 03", subtitle: "CORNER ART", date: "INTERIORS", img: polaroid3.src },
  { id: 4, title: "COLLECTION 04", subtitle: "GIFT BOX", date: "PRESENTS", img: polaroid4.src },
  { id: 5, title: "COLLECTION 05", subtitle: "THE STACK", date: "MEMORIES", img: polaroid5.src },
  { id: 6, title: "COLLECTION 06", subtitle: "MINI EASEL", date: "DESK ART", img: polaroid6.src },
  { id: 7, title: "COLLECTION 07", subtitle: "PHOTO RING", date: "KEEPSAKES", img: polaroid7.src },
  { id: 8, title: "COLLECTION 08", subtitle: "WALL HANGING", date: "HOME DECOR", img: polaroid8.src },
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
    <section className="relative w-full h-[60vh] md:h-[90vh] bg-white overflow-hidden flex flex-col justify-center items-center cursor-grab active:cursor-grabbing border-t border-[#EAEAEA]">
      
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
        className="relative w-full max-w-[1200px] h-[450px] md:h-[600px] flex justify-center items-center perspective-[1200px] md:perspective-[1600px] pointer-events-none"
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
                className={`absolute w-[260px] sm:w-[320px] h-[380px] sm:h-[480px] bg-[#FAFAFA] rounded-sm flex flex-col [backface-visibility:hidden] shadow-[0_30px_60px_rgba(0,0,0,0.08)] border border-[#EAEAEA] select-none cursor-pointer transition-colors p-4`}
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

      <div className="absolute bottom-6 md:bottom-12 flex flex-row items-center justify-between gap-2 md:gap-10 text-[#111] z-20 pointer-events-auto bg-white/90 backdrop-blur-md px-5 py-3 md:px-10 md:py-6 rounded-full border border-[#EAEAEA] shadow-md w-[90%] max-w-[400px] md:w-auto md:max-w-none">
        <div className="flex flex-col text-left">
          <span className="font-[family-name:var(--font-instrument)] italic text-xl md:text-3xl">Polaroid Cards</span>
          <span className="text-[7px] sm:text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[#888] mt-0.5 md:mt-1">Fully customizable text</span>
        </div>
        <div className="hidden md:block w-[1px] h-10 bg-[#EAEAEA]"></div>
        <a href="/polaroid" className="bg-[#111] text-white px-4 py-2 md:px-8 md:py-3 rounded-full text-[9px] md:text-xs uppercase tracking-widest hover:bg-[#E85D26] transition-colors whitespace-nowrap">
          Create Yours
        </a>
      </div>
    </section>
  );
}
