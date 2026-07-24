"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over a clickable element
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-[#E85D26] rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 4 : 1,
          opacity: isHovering ? 0.8 : 1
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#111]/30 rounded-full pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.5 }}
      />
    </>
  );
}

export function CinematicGrain() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.04] mix-blend-difference" 
         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
    </div>
  );
}

// Reusable Magnetic Image Wrapper for deep 3D hover effects
export function MagneticImage({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { height, width, left, top } = currentTarget.getBoundingClientRect();
    
    // Calculate distance from center (-1 to 1)
    const x = (clientX - (left + width / 2)) / (width / 2);
    const y = (clientY - (top + height / 2)) / (height / 2);
    
    // Max rotation is 15 degrees
    setPosition({ x: x * 10, y: y * 10 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ 
        rotateX: -position.y, 
        rotateY: position.x,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
      style={{ perspective: 1000 }}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <motion.div 
        animate={{ 
          x: position.x * -10, 
          y: position.y * -10,
          scale: 1.05
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Cinematic Staggered Text Reveal
export function SplitTextReveal({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", paddingBottom: "0.2em", marginBottom: "-0.2em" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} style={{ marginRight: "0.25em" }} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function InitialPreloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disable scrolling while preloader is active
    document.body.style.overflow = "hidden";
    
    // Increase timeout to match the slower animation
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }, 5500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-[999999] bg-white flex flex-col items-center justify-center pointer-events-none"
      initial={{ y: 0 }}
      animate={{ y: "-100vh" }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 4.0 }}
    >
      <motion.div
        className="overflow-hidden mb-8"
        initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <img src="/images/logoo1.png" alt="Loading" className="h-[200px] md:h-[350px] lg:h-[500px] object-contain max-w-[90vw]" />
      </motion.div>
    </motion.div>
  );
}

export function InfiniteMarquee({ text }: { text: string }) {
  const repeatedText = Array(4).fill(text).join(" ✦ ");
  
  return (
    <div className="flex overflow-hidden whitespace-nowrap bg-[#111] text-white py-6 border-y border-[#222] select-none">
      <motion.div
        className="flex flex-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
      >
        <span className="text-[11px] uppercase tracking-[0.4em] font-medium pr-8">{repeatedText}</span>
        <span className="text-[11px] uppercase tracking-[0.4em] font-medium pr-8">{repeatedText}</span>
      </motion.div>
    </div>
  );
}
