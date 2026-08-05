"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { getUserNotifications, markNotificationsRead } from "@/app/actions/orders";

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
    title: "Polaroid Fridge Magnet",
    desc: "Premium polaroid fridge magnets for everyday joy.",
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
    <footer className="bg-[#FDFCF8]/90 text-[#1A1A1A] pt-16 md:pt-20 pb-8 px-6 border-t border-[#1A1A1A]/10 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 md:mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="block mb-4 md:mb-6">
            <span className="font-headline-md italic text-2xl font-normal tracking-tight text-[#1A1A1A] hover:text-[#C5A059] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
              Offline <span className="text-xs non-italic font-sans uppercase tracking-widest text-[#C5A059] align-top relative -top-1">Living ®</span>
            </span>
          </Link>
          <p className="font-body-md text-sm text-[#1A1A1A]/70 mb-6 leading-relaxed max-w-[280px]">
            Elevating your digital memories into tactile, museum-quality physical artifacts. Designed for the modern home, built for eternity.
          </p>
        </div>

        <div>
          <h4 className="font-label-caps text-xs font-bold tracking-widest uppercase text-[#1A1A1A] mb-6">Explore</h4>
          <ul className="space-y-3 font-body-md text-sm text-[#1A1A1A]/70">
            <li><Link href="/templates" className="nav-link hover:text-[#C5A059] transition-colors">Photo Books</Link></li>
            <li><Link href="/frame" className="nav-link hover:text-[#C5A059] transition-colors">Photo Frames</Link></li>
            <li><Link href="/polaroid" className="nav-link hover:text-[#C5A059] transition-colors">Polaroids</Link></li>
            <li><Link href="/fridge-magnet" className="nav-link hover:text-[#C5A059] transition-colors">Polaroid Fridge Magnet</Link></li>
            <li><Link href="/acrylic-frames" className="nav-link hover:text-[#C5A059] transition-colors">Acrylic Frames</Link></li>
            <li><Link href="/canvas-frames" className="nav-link hover:text-[#C5A059] transition-colors">Canvas Frames</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-caps text-xs font-bold tracking-widest uppercase text-[#1A1A1A] mb-6">Company</h4>
          <ul className="space-y-3 font-body-md text-sm text-[#1A1A1A]/70">
            <li><Link href="/about" className="nav-link hover:text-[#C5A059] transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="nav-link hover:text-[#C5A059] transition-colors">Contact Us</Link></li>
            <li><Link href="/about-us" className="nav-link hover:text-[#C5A059] transition-colors">Philosophy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-label-caps text-xs font-bold tracking-widest uppercase text-[#1A1A1A] mb-6">Stay Inspired</h4>
          <p className="font-body-md text-sm text-[#1A1A1A]/70 mb-4 leading-relaxed">Exclusive releases and editorial insights on analog living.</p>
          <div className="relative group mt-6">
            <input
              type="email"
              placeholder="Email address"
              className="w-full border-b border-[#1A1A1A]/20 pb-2 pr-10 focus:outline-none focus:border-[#C5A059] bg-transparent text-[#1A1A1A] transition-colors text-sm placeholder:text-[#AAAAAA] font-body-md"
              suppressHydrationWarning
            />
            <button suppressHydrationWarning className="absolute right-0 top-1/2 -translate-y-1/2 font-label-caps text-xs font-bold text-[#C5A059] uppercase hover:text-[#1A1A1A] transition-all">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center font-label-caps text-xs text-[#1A1A1A]/50 font-medium pt-8 border-t border-[#1A1A1A]/5">
        <p>© {new Date().getFullYear()} OFFLINE LIVING. ARCHIVAL QUALITY GUARANTEED.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-[#1A1A1A] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#1A1A1A] transition-colors">Terms of Service</Link>
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

  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      console.error('Google login error:', error.message);
    }
  };

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const fetchUserNotifications = async (u: User) => {
      const res = await getUserNotifications(u.id, u.email);
      if (res.success && res.notifications) {
        setNotifications(res.notifications);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) fetchUserNotifications(u);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) fetchUserNotifications(u);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleNotificationsClick = async () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && unreadCount > 0 && user) {
      await markNotificationsRead(user.id, user.email);
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    }
  };

  const navClass = scrolled 
    ? "bg-[#FDFCF8]/90 backdrop-blur-md border-b border-[#1A1A1A]/10 text-[#1A1A1A]" 
    : "bg-transparent text-[#1A1A1A] border-b border-transparent";

  const [activeCategories, setActiveCategories] = useState<any[]>([]);

  useEffect(() => {
    async function fetchActiveCategories() {
      const { data } = await supabase.from('products').select('category').eq('is_active', true);
      if (data) {
        setActiveCategories(data.map(d => d.category));
      }
    }
    fetchActiveCategories();
  }, []);

  const navLinks = [
    { cat: 'photo_book', label: 'Photo Book', href: '/templates' },
    { cat: 'photo_frame', label: 'Photo Frame', href: '/frame' },
    { cat: 'polaroid', label: 'Polaroid', href: '/polaroid' },
    { cat: 'fridge_magnet', label: 'Polaroid Fridge Magnet', href: '/fridge-magnet' },
    { cat: 'acrylic_frame', label: 'Acrylic Frames', href: '/acrylic-frames' },
    { cat: 'photo_canvas', label: 'Canvas Frames', href: '/canvas-frames' }
  ];

  const visibleLinks = navLinks.filter(link => activeCategories.includes(link.cat));

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navClass}`} suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group text-[#1A1A1A]">
          <span className="font-headline-md italic text-2xl font-normal tracking-tight hover:text-[#C5A059] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
            Offline <span className="text-xs non-italic font-sans uppercase tracking-widest text-[#C5A059] align-top relative -top-1">Living ®</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-10 font-label-caps text-xs tracking-[0.14em] uppercase font-bold text-[#1A1A1A]/80">
          <div
            className="relative group py-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link href="/products" className="hover:text-[#C5A059] transition-colors flex items-center gap-1.5" suppressHydrationWarning>
              Collections
              <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </Link>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#FDFCF8]/98 backdrop-blur-xl border border-[#1A1A1A]/10 shadow-2xl rounded-xl p-5 z-50"
                >
                  <ul className="space-y-3.5 font-label-caps text-xs tracking-widest uppercase font-semibold">
                    {visibleLinks.map(link => (
                      <li key={link.cat}>
                        <Link href={link.href} className="block text-[#1A1A1A]/80 hover:text-[#C5A059] hover:translate-x-1 transition-all">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link href="/about" className="hover:text-[#C5A059] transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[#C5A059] transition-colors">Contact</Link>
        </div>
        <div className="flex items-center gap-6 font-label-caps text-xs tracking-[0.14em] uppercase font-bold text-[#1A1A1A]">
          {isClient ? (
            user ? (
              <div className="relative group cursor-pointer py-2 flex items-center">
                <span className="hover:text-[#C5A059] transition-colors flex items-center gap-2 text-[#C5A059]">
                  Hi, {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'Account'}
                </span>
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#FDFCF8] text-[#1A1A1A] border border-[#1A1A1A]/10 rounded-xl overflow-hidden p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl z-50">
                  <div className="pb-3 font-normal text-[10px] border-b border-[#1A1A1A]/10 truncate tracking-normal text-[#1A1A1A]/60 normal-case">
                    Logged in as<br/>
                    <span className="font-semibold text-xs text-[#1A1A1A] block mt-1">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                  </div>
                  <Link 
                    href="/orders"
                    className="block w-full text-left py-2 mt-2 hover:text-[#C5A059] transition-colors uppercase tracking-[0.14em] text-xs font-bold"
                  >
                    My Orders
                  </Link>
                  <button 
                    onClick={async () => {
                      await supabase.auth.signOut();
                      window.location.href = "/";
                    }}
                    className="w-full text-left py-2 hover:text-red-600 transition-colors uppercase tracking-[0.14em] text-xs font-bold text-red-500"
                    suppressHydrationWarning
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button onClick={handleGoogleLogin} className="hover:text-[#C5A059] transition-colors">
                Sign In
              </button>
            )
          ) : (
            <div className="w-12 h-4" />
          )}
          {isClient && user && (
            <div className="relative">
              <button 
                onClick={handleNotificationsClick}
                className="hover:text-[#C5A059] transition-colors relative flex items-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white/80"></span>
                )}
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-[50px] right-0 mt-2 w-72 bg-white backdrop-blur-md text-[#111111] border border-[#eaeaea] rounded-none shadow-lg overflow-hidden py-2 z-50 font-sans normal-case"
                  >
                    <div className="px-4 py-2 border-b border-[#eaeaea] text-xs font-semibold uppercase tracking-wider text-[#888888]">
                      Notifications
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-4 text-xs text-[#888888] text-center">
                          No notifications yet.
                        </div>
                      ) : (
                        notifications.map((n, i) => (
                          <div key={n.id || i} className={`px-4 py-3 border-b border-[#eaeaea] last:border-b-0 ${!n.is_read ? 'bg-[#fafafa]' : ''}`}>
                            <div className="text-xs font-semibold mb-1 text-[#111111]">{n.title}</div>
                            <div className="text-[11px] text-[#555555] leading-relaxed">{n.message}</div>
                            <div className="text-[9px] text-[#888888] mt-1">{new Date(n.created_at).toLocaleDateString()}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
