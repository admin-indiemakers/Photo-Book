"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

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
    <footer className="bg-[#FAFAFA] text-[#111111] pt-24 pb-12 px-6 border-t border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="block mb-8">
            <img src="/images/logoo.png" alt="Offline Living Logo" className="h-40 md:h-64 object-contain origin-left" />
          </Link>
          <p className="text-[#555555] font-light text-sm mb-8 leading-relaxed max-w-[250px]">
            Elevating your digital memories into tactile, museum-quality physical artifacts. Designed for the modern home, built for eternity.
          </p>
          <div className="flex gap-4 opacity-70 mt-6">
            <a href="#" className="w-8 h-8 flex items-center justify-center text-[#111] hover:text-[#E85D26] hover:bg-[#FAFAFA] rounded-full transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="w-8 h-8 flex items-center justify-center text-[#111] hover:text-[#E85D26] hover:bg-[#FAFAFA] rounded-full transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-6 uppercase tracking-wider text-[11px] text-[#888888]">Explore</h4>
          <ul className="space-y-3 font-light text-[#555555] text-sm">
            <li><Link href="/templates" className="hover:text-[#111111] transition-colors">Photo Books</Link></li>
            <li><Link href="/frame" className="hover:text-[#111111] transition-colors">Photo Frames</Link></li>
            <li><Link href="/polaroid" className="hover:text-[#111111] transition-colors">Polaroids</Link></li>
            <li><Link href="/fridge-magnet" className="hover:text-[#111111] transition-colors">Fridge Magnets</Link></li>
            <li><Link href="/acrylic-frames" className="hover:text-[#111111] transition-colors">Acrylic Frames</Link></li>
            <li><Link href="/canvas-frames" className="hover:text-[#111111] transition-colors">Canvas Frames</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6 uppercase tracking-wider text-[11px] text-[#888888]">Company</h4>
          <ul className="space-y-3 font-light text-[#555555] text-sm">
            <li><Link href="/about" className="hover:text-[#111111] transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-[#111111] transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6 uppercase tracking-wider text-[11px] text-[#888888]">Stay Inspired</h4>
          <p className="text-[#555555] font-light mb-4 text-sm leading-relaxed">Exclusive releases and editorial insights on analog living.</p>
          <div className="relative group mt-6">
            <input
              type="email"
              placeholder="Email address"
              className="w-full border-b border-[#CCCCCC] pb-2 pr-10 focus:outline-none focus:border-[#111111] bg-transparent text-[#111111] transition-colors text-sm placeholder:text-[#AAAAAA]"
              suppressHydrationWarning
            />
            <button suppressHydrationWarning className="absolute right-0 top-0 text-[#888888] group-hover:text-[#111111] transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[11px] text-[#888888] font-light pt-8 border-t border-[#EAEAEA]">
        <p>&copy; {new Date().getFullYear()} Offline Living. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-[#111111] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#111111] transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export function HeaderNav() {
  const pathname = usePathname();
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

  const isHomePage = pathname === '/';
  const navClass = scrolled 
    ? "bg-white/80 backdrop-blur-md border-b border-[#eaeaea] text-[#111111]" 
    : "bg-transparent text-[#111111] border-b border-transparent";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${navClass}`} suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-6 h-24 md:h-32 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/images/logoo1.png" alt="Offline Living Logo" className="h-12 md:h-20 object-contain" />
        </Link>
        <div className="hidden md:flex items-center gap-10 font-[family-name:var(--font-instrument)] italic text-xl md:text-2xl">
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button className="hover:opacity-70 transition-opacity flex items-center gap-1" suppressHydrationWarning>
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
          <Link href="/about" className="hover:opacity-70 transition-opacity">About</Link>
          <Link href="/contact" className="hover:opacity-70 transition-opacity">Contact</Link>
        </div>
        <div className="flex items-center gap-6 font-[family-name:var(--font-instrument)] italic text-xl md:text-2xl">
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
            <div className="px-6 py-4 flex flex-col gap-4 font-[family-name:var(--font-instrument)] italic text-2xl">
              <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity">Collections</Link>
              <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity">Orders</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity">About</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:opacity-70 transition-opacity">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
