"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Custom high-end easing
export const customEase = [0.16, 1, 0.3, 1] as const;

export function MagneticButton({ children, className = "", variant = "dark" }: { children: React.ReactNode, className?: string, variant?: "dark" | "light" }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseClass = "relative group overflow-hidden rounded-full px-8 py-4 flex items-center justify-center text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";
  const variants = {
    dark: "bg-[#111111] text-white hover:bg-black",
    light: "bg-white text-[#111111] hover:bg-[#fafafa] border border-[#eaeaea]"
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseClass} ${variants[variant]} ${className}`}
      suppressHydrationWarning
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

export const productsData = [
  {
    title: "Photo Book",
    desc: "Custom archival-quality books with seamless layflat binding.",
    img: "/images/books.png",
    badge: "Signature",
    href: "/templates"
  },
  {
    title: "Photo Frame",
    desc: "Solid wood framing for your most cherished memories.",
    img: "/images/frames.png",
    badge: "Popular",
    href: "/frame"
  },
  {
    title: "Polaroid",
    desc: "Retro polaroid prints to keep the nostalgia alive.",
    img: "/images/keepsakes.png",
    badge: "",
    href: "/polaroid"
  },
  {
    title: "Fridge Magnet",
    desc: "Premium brass fridge magnets for everyday joy.",
    img: "/images/craft1.png",
    badge: "",
    href: "/fridge-magnet"
  },
  {
    title: "Acrylic Frames",
    desc: "Museum-grade acrylic frames for a modern gallery look.",
    img: "/images/craft2.png",
    badge: "New",
    href: "/acrylic-frames"
  },
  {
    title: "Canvas Frames",
    desc: "Classic woven canvas prints stretched to perfection.",
    img: "/images/hero.png",
    badge: "",
    href: "/canvas-frames"
  }
];

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-white pt-24 pb-8 px-6 font-sans overflow-hidden">
      {/* Matte Noise Texture Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 mb-20">
          
          {/* Left Column: Brand & Vision */}
          <div className="lg:w-2/5">
            <Link href="/" className="font-serif italic font-light text-5xl block mb-6 text-white/90">
              Offline Living.
            </Link>
            <p className="text-white/40 font-light text-sm leading-relaxed max-w-sm mb-10">
              We believe in the power of the tangible. In a world of fleeting pixels, we craft heirlooms meant to be held, passed down, and cherished for generations.
            </p>
            <div className="flex gap-6">
              {["Instagram", "Pinterest", "Twitter"].map((social) => (
                <Link key={social} href="#" className="relative overflow-hidden group text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">
                  <span className="block group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">{social}</span>
                  <span className="block absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">{social}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Links & Newsletter */}
          <div className="lg:w-1/2 flex flex-col md:flex-row justify-between gap-12 lg:gap-16">
            
            <div className="md:w-1/3">
              <h4 className="font-medium mb-6 uppercase tracking-[0.3em] text-[9px] text-white/30">Collections</h4>
              <ul className="space-y-4 font-light text-white/60 text-[13px]">
                {["Signature Books", "Gallery Frames", "Keepsakes", "Gift Cards"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="hover:text-white transition-colors relative group flex items-center">
                      <span className="w-0 h-[1px] bg-white mr-0 group-hover:w-4 group-hover:mr-4 transition-all duration-500 ease-out"></span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:w-2/3 max-w-xs">
              <h4 className="font-medium mb-6 uppercase tracking-[0.3em] text-[9px] text-white/30">Join The List</h4>
              <p className="text-white/40 font-light text-[13px] leading-relaxed mb-8">
                Exclusive releases, editorial insights, and a gentle reminder to print your photos.
              </p>
              <div className="relative group border-b border-white/20 pb-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full focus:outline-none bg-transparent text-white transition-colors text-sm placeholder:text-white/20"
                  suppressHydrationWarning
                />
                <button className="absolute right-0 top-1 text-white/20 group-hover:text-white transition-colors" suppressHydrationWarning>
                  <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-out" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Massive Typography Backdrop with overlay */}
        <div className="w-full overflow-hidden flex flex-col justify-end border-t border-white/10 pt-16 relative min-h-[220px]">
           <h1 
             className="text-[14vw] leading-[0.75] font-sans font-light tracking-tighter text-white/[0.04] select-none pointer-events-none mt-auto text-center w-full pb-8"
             style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 10%, black 80%)' }}
           >
             OFFLINE LIVING
           </h1>
           
           {/* Copyright overlaying the massive text at the very bottom */}
           <div className="absolute bottom-4 left-0 w-full flex flex-col md:flex-row justify-between items-end md:items-center text-[9px] uppercase tracking-[0.25em] text-white/40 gap-4">
             <div className="flex items-center gap-4">
               <span>&copy; {new Date().getFullYear()} OFFLINE LIVING</span>
               <span className="w-1 h-1 bg-white/20 rounded-full hidden md:block"></span>
               <span className="hidden md:block">ALL RIGHTS RESERVED</span>
             </div>
             <div className="flex gap-8">
               <Link href="#" className="hover:text-white transition-colors relative group pb-1">
                 <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white/0 group-hover:bg-white transition-colors duration-300"></span>
                 Privacy Policy
               </Link>
               <Link href="#" className="hover:text-white transition-colors relative group pb-1">
                 <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-white/0 group-hover:bg-white transition-colors duration-300"></span>
                 Terms of Service
               </Link>
             </div>
           </div>
        </div>
      </div>
    </footer>
  );
}

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export function HeaderNav() {
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const navClass = scrolled ? "bg-white/80 backdrop-blur-md border-b border-[#eaeaea] text-[#111111]" : "bg-transparent text-white border-b border-transparent";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${navClass}`} suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="font-sans font-light tracking-tight text-[22px]">Offline Living</Link>
        <div className="hidden md:flex items-center gap-10 text-[11px] font-medium tracking-widest uppercase">
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button className="hover:opacity-70 transition-opacity flex items-center gap-1 uppercase tracking-widest" suppressHydrationWarning>
              Collections
            </button>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-0 mt-6 w-48 bg-white/95 backdrop-blur-md text-[#111111] border border-[#eaeaea] rounded-none overflow-hidden py-4 shadow-sm"
                >
                  <Link href="/templates" className="block px-6 py-2 hover:bg-[#fafafa] hover:text-black transition-colors font-light">Photo Book</Link>
                  <Link href="/frame" className="block px-6 py-2 hover:bg-[#fafafa] hover:text-black transition-colors font-light">Photo Frame</Link>
                  <Link href="/polaroid" className="block px-6 py-2 hover:bg-[#fafafa] hover:text-black transition-colors font-light">Polaroid</Link>
                  <Link href="/fridge-magnet" className="block px-6 py-2 hover:bg-[#fafafa] hover:text-black transition-colors font-light">Fridge Magnet</Link>
                  <Link href="/acrylic-frames" className="block px-6 py-2 hover:bg-[#fafafa] hover:text-black transition-colors font-light">Acrylic Frames</Link>
                  <Link href="/canvas-frames" className="block px-6 py-2 hover:bg-[#fafafa] hover:text-black transition-colors font-light">Canvas Frames</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="#" className="hover:opacity-70 transition-opacity">Craftsmanship</Link>
          <Link href="#" className="hover:opacity-70 transition-opacity">Journal</Link>
          <Link href="/orders" className="hover:opacity-70 transition-opacity">Orders</Link>
          <Link href="#" className="hover:opacity-70 transition-opacity">About</Link>
        </div>
        <div className="flex items-center gap-6 text-[11px] font-medium tracking-widest uppercase">
          {isClient ? (
            user ? (
              <div className="relative group cursor-pointer h-24 flex items-center">
                <span className="hover:opacity-70 transition-opacity flex items-center gap-2">
                  Profile
                </span>
                <div className="absolute top-[80px] right-0 mt-2 w-48 bg-white/95 backdrop-blur-md text-[#111111] border border-[#eaeaea] rounded-none overflow-hidden py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-2 group-hover:translate-y-0 shadow-sm">
                  <div className="px-6 py-3 font-light text-[10px] border-b border-[#eaeaea] truncate tracking-normal text-[#888888] normal-case">
                    Logged in as<br/>
                    <span className="font-medium text-[11px] text-[#111111] block mt-1">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                  </div>
                  <Link 
                    href="/orders"
                    className="block w-full text-left px-6 py-3 mt-2 hover:bg-[#fafafa] transition-colors uppercase tracking-[0.15em] text-[10px] text-[#111111]"
                  >
                    My Orders
                  </Link>
                  <button 
                    onClick={() => supabase.auth.signOut()}
                    className="w-full text-left px-6 py-3 hover:bg-[#fafafa] transition-colors uppercase tracking-[0.15em] text-[10px] text-red-500"
                    suppressHydrationWarning
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="hover:opacity-70 transition-opacity">
                Sign In
              </Link>
            )
          ) : (
            <div className="w-12 h-4" />
          )}
          <Link href="/cart" className="hover:opacity-70 transition-opacity">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
