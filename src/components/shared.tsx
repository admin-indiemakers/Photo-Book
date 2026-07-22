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

  const baseClass = "relative group overflow-hidden rounded-full px-8 py-4 flex items-center justify-center text-sm font-medium transition-colors duration-300";
  const variants = {
    dark: "bg-[#1a1a1a] text-white hover:bg-black",
    light: "bg-white text-black hover:bg-gray-100"
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseClass} ${variants[variant]} ${className}`}
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
    <footer className="bg-[#1a1a1a] text-white pt-6 md:pt-20 pb-4 md:pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-12 mb-6 md:mb-20">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="font-serif text-3xl tracking-wide block mb-3 md:mb-6">Offline Living</Link>
          <p className="text-gray-400 font-light text-sm mb-4 md:mb-8 leading-relaxed max-w-[250px]">
            Elevating your digital memories into tactile, museum-quality physical artifacts. Designed for the modern home, built for eternity.
          </p>
          <div className="flex gap-4 opacity-70">
            {/* Social Icons Placeholders */}
            <div className="w-5 h-5 border border-white rounded-sm flex items-center justify-center text-[10px]">IG</div>
            <div className="w-5 h-5 border border-white rounded-sm flex items-center justify-center text-[10px]">P</div>
            <div className="w-5 h-5 border border-white rounded-sm flex items-center justify-center text-[10px]">YT</div>
            <div className="w-5 h-5 border border-white rounded-sm flex items-center justify-center text-[10px]">M</div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 md:mb-6 uppercase tracking-wider text-[11px] text-gray-300">Explore</h4>
          <ul className="space-y-1.5 md:space-y-3 font-light text-gray-400 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">Photobooks</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Wall Art</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Keepsakes</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Gift Cards</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 md:mb-6 uppercase tracking-wider text-[11px] text-gray-300">Company</h4>
          <ul className="space-y-1.5 md:space-y-3 font-light text-gray-400 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Our Craftsmanship</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Journal</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 md:mb-6 uppercase tracking-wider text-[11px] text-gray-300">Stay Inspired</h4>
          <p className="text-gray-400 font-light mb-3 md:mb-4 text-sm leading-relaxed">Exclusive releases and editorial insights on analog living.</p>
          <div className="relative group mt-3 md:mt-6">
            <input
              type="email"
              placeholder="Email address"
              className="w-full border-b border-gray-600 pb-2 pr-10 focus:outline-none focus:border-white bg-transparent text-white transition-colors text-sm"
            />
            <button className="absolute right-0 top-0 text-gray-400 group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500 font-light pt-4 md:pt-8 border-t border-gray-800">
        <p>&copy; {new Date().getFullYear()} Offline Living. All rights reserved.</p>
        <div className="flex gap-6 mt-3 md:mt-0">
          <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navClass = scrolled ? "bg-white text-black shadow-sm" : "bg-transparent text-white";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navClass}`}>
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="font-serif text-[22px] tracking-wide">Offline Living</Link>
        <div className="hidden md:flex items-center gap-10 text-[11px] font-medium tracking-widest uppercase">
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button className="hover:opacity-70 transition-opacity flex items-center gap-1 uppercase tracking-widest">
              Collections
            </button>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-4 w-48 bg-white text-black border border-gray-100 shadow-xl rounded-sm overflow-hidden py-2"
                >
                  <Link href="/templates" className="block px-5 py-2 hover:bg-gray-50 transition-colors">Photo Book</Link>
                  <Link href="/frame" className="block px-5 py-2 hover:bg-gray-50 transition-colors">Photo Frame</Link>
                  <Link href="/polaroid" className="block px-5 py-2 hover:bg-gray-50 transition-colors">Polaroid</Link>
                  <Link href="/fridge-magnet" className="block px-5 py-2 hover:bg-gray-50 transition-colors">Fridge Magnet</Link>
                  <Link href="/acrylic-frames" className="block px-5 py-2 hover:bg-gray-50 transition-colors">Acrylic Frames</Link>
                  <Link href="/canvas-frames" className="block px-5 py-2 hover:bg-gray-50 transition-colors">Canvas Frames</Link>
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
                <div className="absolute top-[80px] right-0 mt-1 w-48 bg-white text-black border border-gray-100 shadow-xl rounded-sm overflow-hidden py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-5 py-3 font-medium text-[10px] border-b border-gray-100 truncate tracking-normal text-gray-500 normal-case">
                    Logged in as<br/>
                    <span className="font-semibold text-[11px] text-black block mt-0.5">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                  </div>
                  <Link 
                    href="/orders"
                    className="block w-full text-left px-5 py-3 hover:bg-gray-50 transition-colors uppercase tracking-widest font-medium text-black border-b border-gray-100"
                  >
                    My Orders
                  </Link>
                  <button 
                    onClick={() => supabase.auth.signOut()}
                    className="w-full text-left px-5 py-3 hover:bg-gray-50 transition-colors uppercase tracking-widest font-medium text-[#f26523]"
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
          <button className="md:hidden ml-2 hover:opacity-70" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white text-black border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4 text-[11px] font-medium tracking-widest uppercase">
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity">Collections</Link>
              <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity">Orders</Link>
              <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity">Craftsmanship</Link>
              <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity">Journal</Link>
              <Link href="#" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity">About</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
