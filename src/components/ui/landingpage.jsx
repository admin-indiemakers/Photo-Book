import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

import wanderlustImg from '@/assets/Wanderlust.jpg';
import yearInReviewImg from '@/assets/Year in Review.jpg';
import familyRecipesImg from '@/assets/Family Recipes.jpg';
import milestonesImg from '@/assets/Milestones.jpg';

// Torn Paper Top Edge SVG Component
export function TornPaperEdgeTop({ fill = "#F8F3EA", className = "" }) {
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}>
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-6 sm:h-8 md:h-12 block">
        <path
          d="M0,0 L0,20 Q30,32 60,18 Q90,5 120,24 Q150,38 180,14 Q210,2 240,22 Q270,35 300,16 Q330,8 360,26 Q390,36 420,15 Q450,4 480,25 Q510,38 540,18 Q570,8 600,28 Q630,36 660,16 Q690,4 720,24 Q750,35 780,14 Q810,6 840,26 Q870,38 900,18 Q930,4 960,22 Q990,34 1020,16 Q1050,6 1080,24 Q1110,36 1140,18 Q1170,8 1200,25 L1200,0 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

// Torn Paper Bottom Edge SVG Component
export function TornPaperEdgeBottom({ fill = "#F8F3EA", className = "" }) {
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}>
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="w-full h-6 sm:h-8 md:h-12 block">
        <path
          d="M0,40 L0,20 Q30,8 60,22 Q90,35 120,16 Q150,2 180,26 Q210,38 240,18 Q270,5 300,24 Q330,32 360,14 Q390,4 420,25 Q450,36 480,15 Q510,2 540,22 Q570,32 600,12 Q630,4 660,24 Q690,36 720,16 Q750,5 780,26 Q810,34 840,14 Q870,2 900,22 Q930,36 960,18 Q990,6 1020,24 Q1050,34 1080,16 Q1110,4 1140,22 Q1170,32 1200,15 L1200,40 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

// Metallic Paper Clip SVG Component
export function PaperClipIcon({ className = "w-5 h-8 sm:w-6 sm:h-10 text-slate-600" }) {
  return (
    <svg viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 12v22a6 6 0 0 0 12 0V10a4 4 0 0 0-8 0v22a2 2 0 0 0 4 0V14" />
    </svg>
  );
}

// Daisy Flower Doodle SVG
export function DaisyDoodle({ className = "w-5 h-5 sm:w-6 sm:h-6 text-[#C27871]" }) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" className={className}>
      <circle cx="20" cy="20" r="5" fill="#E8B042" />
      <circle cx="20" cy="8" r="6" fill="currentColor" opacity="0.85" />
      <circle cx="20" cy="32" r="6" fill="currentColor" opacity="0.85" />
      <circle cx="8" cy="20" r="6" fill="currentColor" opacity="0.85" />
      <circle cx="32" cy="20" r="6" fill="currentColor" opacity="0.85" />
      <circle cx="11.5" cy="11.5" r="5.5" fill="currentColor" opacity="0.85" />
      <circle cx="28.5" cy="28.5" r="5.5" fill="currentColor" opacity="0.85" />
      <circle cx="28.5" cy="11.5" r="5.5" fill="currentColor" opacity="0.85" />
      <circle cx="11.5" cy="28.5" r="5.5" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

// Sparkle / 4-Point Star Doodle SVG
export function SparkleDoodle({ className = "w-4 h-4 sm:w-5 sm:h-5 text-[#E8B042]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}

// Hand-drawn Heart Outline Doodle SVG
export function HeartDoodle({ className = "w-4 h-4 sm:w-5 sm:h-5 text-[#C27871]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

// Sleek Directional Arrow SVG Icon
export function ArrowRightIcon({ className = "w-3.5 h-3.5 sm:w-4 sm:h-4 inline-block" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

// Minimal Open Book Doodle SVG
export function BookDoodle({ className = "w-4 h-4 sm:w-5 sm:h-5 text-[#C27871]" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

// =========================================================================
// HAND-DRAWN CONTINUOUS PATH LIBRARY
// =========================================================================
export const DRAWN_PATHS = {
  heartLoop: "M 20,90 C 90,30 160,140 220,80 C 235,55 220,25 195,25 C 170,25 160,55 180,85 C 200,115 230,140 230,140 C 230,140 260,115 280,85 C 300,55 290,25 265,25 C 240,25 225,55 240,80 C 260,115 320,155 420,60 C 500,-15 600,135 700,45 C 780,-15 860,105 920,55",
  heartLoopViewBox: "0 0 940 160",

  loopDeLoopHeart: "M 10,60 C 80,130 150,10 210,75 C 240,110 270,110 280,75 C 290,35 250,20 240,55 C 230,95 280,125 320,80 C 340,55 330,30 310,30 C 290,30 280,55 295,80 C 310,105 330,125 330,125 C 330,125 350,105 365,80 C 380,55 370,30 350,30 C 330,30 320,55 335,80 C 360,130 440,20 520,90 C 580,140 640,30 700,70",
  loopDeLoopHeartViewBox: "0 0 720 150",

  connectingHeartEnd: "M 0,70 C 140,20 260,120 400,50 C 540,-20 660,120 800,45 C 920,-10 1020,110 1120,60 C 1140,40 1130,15 1110,15 C 1090,15 1080,40 1095,60 C 1110,80 1125,95 1125,95 C 1125,95 1140,80 1155,60 C 1170,40 1160,15 1140,15 C 1120,15 1110,40 1125,60 C 1140,80 1170,100 1200,65",
  connectingHeartEndViewBox: "0 0 1200 110",

  whimsicalSquiggle: "M 10,40 C 70,90 120,10 180,60 C 210,85 225,85 225,60 C 225,35 195,35 205,65 C 220,110 290,20 360,75 C 390,100 405,100 405,75 C 405,50 375,50 385,80 C 400,120 480,30 560,70",
  whimsicalSquiggleViewBox: "0 0 580 130",

  starSparkleTrail: "M 20,120 C 100,30 180,160 260,70 C 290,35 310,80 320,30 C 330,80 350,35 380,70 C 330,80 375,100 325,110 C 315,60 295,110 265,70 C 330,160 440,10 540,90 C 620,150 720,20 800,80",
  starSparkleTrailViewBox: "0 0 820 180",

  spiralMemoryLoop: "M 30,110 C 90,30 160,140 230,80 C 270,45 285,45 285,75 C 285,105 255,105 255,75 C 255,45 300,15 340,55 C 380,95 440,30 500,75",
  spiralMemoryLoopViewBox: "0 0 520 130",

  flutteringRibbon: "M 20,30 C 100,110 220,10 320,80 C 380,120 460,20 540,85 C 600,130 680,30 760,70",
  flutteringRibbonViewBox: "0 0 780 140"
};

// ==========================================
// ANIMATED HAND-DRAWN BACKGROUND LINE COMPONENT
// ==========================================
export function AnimatedDrawnLine({
  d,
  viewBox = "0 0 600 200",
  stroke = "#C27871",
  strokeWidth = 2,
  strokeDasharray = "",
  strokeOpacity = 0.35,
  className = "",
  duration = 2.4,
  delay = 0.15,
  ease = [0.42, 0, 0.58, 1]
}) {
  return (
    <div className={`pointer-events-none absolute select-none overflow-hidden max-w-full ${className}`}>
      <motion.svg
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <motion.path
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={strokeDasharray || undefined}
          strokeOpacity={strokeOpacity}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: strokeOpacity }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration, delay, ease }}
        />
      </motion.svg>
    </div>
  );
}


// 1. FLOATING PAPER NAVIGATION BAR
export function ScrapbookNavbar() {
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const productLinks = [
    { label: 'Photo Books', href: '/templates', icon: 'menu_book' },
    { label: 'Photo Frames', href: '/frame', icon: 'photo_frame' },
    { label: 'Polaroids', href: '/polaroid', icon: 'photo' },
    { label: 'Fridge Magnets', href: '/fridge-magnet', icon: 'crop_portrait' },
    { label: 'Acrylic Frames', href: '/acrylic-frames', icon: 'art_track' },
    { label: 'Canvas Frames', href: '/canvas-frames', icon: 'wallpaper' }
  ];

  useEffect(() => {
    setIsClient(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? window.location.origin : ''
      }
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserMenuOpen(false);
    if (typeof window !== 'undefined') window.location.href = '/';
  };

  return (
    <nav className="fixed top-2 sm:top-3 left-1/2 -translate-x-1/2 w-[94%] sm:w-[95%] max-w-6xl z-50" suppressHydrationWarning>
      {/* Paper texture container with paper clip */}
      <div className="relative bg-[#F4EFE5] border border-[#DCD3C1] shadow-lg rounded-2xl px-3 sm:px-6 md:px-8 py-2 sm:py-2.5 flex items-center justify-between" suppressHydrationWarning>
        {/* Paper Clip pinned on top left */}
        <div className="absolute -top-3 left-4 sm:left-6 z-20 transform -rotate-12 pointer-events-none">
          <PaperClipIcon className="w-5 h-8 sm:w-6 sm:h-10 text-slate-500 drop-shadow-sm" />
        </div>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-1.5 group text-[#3A342D] pl-5 sm:pl-4">
          <div className="flex flex-col font-protest">
            <span className="text-base sm:text-lg md:text-2xl font-normal tracking-wide leading-none group-hover:text-[#C27871] transition-colors">
              Offline
            </span>
            <span className="text-base sm:text-lg md:text-2xl font-normal tracking-wide leading-none text-[#C27871]">
              Living
            </span>
          </div>
        </Link>

        {/* Center Links (Desktop only) */}
        <div className="hidden md:flex items-center gap-8 font-protest text-sm tracking-wide text-[#3A342D]/85">
          {/* Collections Dropdown */}
          <div
            className="relative py-2"
            onMouseEnter={() => setCollectionsOpen(true)}
            onMouseLeave={() => setCollectionsOpen(false)}
          >
            <Link
              href="/products"
              className="hover:text-[#C27871] transition-colors flex items-center gap-1"
            >
              Collections
              <span className={`material-symbols-outlined text-base transition-transform duration-300 ${collectionsOpen ? 'rotate-180 text-[#C27871]' : ''}`}>
                expand_more
              </span>
            </Link>

            <AnimatePresence>
              {collectionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-[#FAF6EE] border border-[#DDD5C5] shadow-2xl rounded-xl p-4 z-50"
                >
                  <div className="washi-tape -top-2 left-1/2 -translate-x-1/2 rotate-[-2deg]" />
                  <ul className="space-y-2 font-protest text-xs">
                    {productLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#3A342D]/85 hover:bg-[#F8EBE6] hover:text-[#C27871] transition-all"
                        >
                          <span className="material-symbols-outlined text-base text-[#C27871]">{link.icon}</span>
                          <span>{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/about" className="hover:text-[#C27871] transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[#C27871] transition-colors">Contact</Link>
        </div>

        {/* Right Action Icons: Auth / Notifications / Cart */}
        <div className="flex items-center gap-2.5 sm:gap-4 font-protest text-xs text-[#3A342D]">
          {isClient ? (
            user ? (
              /* Logged In User Dropdown */
              <div className="relative py-1 sm:py-2">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="hover:text-[#C27871] transition-colors flex items-center gap-1 text-[#C27871] max-w-[120px] truncate"
                >
                  <span className="material-symbols-outlined text-lg">account_circle</span>
                  <span className="hidden sm:inline truncate">Hi, {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'Friend'}</span>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.96 }}
                      className="absolute top-full right-0 mt-1 w-56 bg-[#FAF6EE] border border-[#DDD5C5] shadow-2xl rounded-xl p-4 z-50"
                    >
                      <div className="pb-3 border-b border-[#DDD5C5] font-glory text-sm text-[#3A342D]/70">
                        Logged in as:
                        <span className="block font-bold text-xs text-[#3A342D] font-sans truncate mt-0.5">
                          {user.user_metadata?.full_name || user.email}
                        </span>
                      </div>
                      <div className="pt-2 space-y-1 font-protest text-xs">
                        <Link
                          href="/orders"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-2 py-2 rounded text-[#3A342D] hover:bg-[#F8EBE6] hover:text-[#C27871] transition-colors"
                        >
                          <span className="material-symbols-outlined text-base">receipt_long</span>
                          <span>My Orders</span>
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-2 py-2 rounded text-red-500 hover:bg-red-50 transition-colors text-left"
                        >
                          <span className="material-symbols-outlined text-base">logout</span>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Sign In Button */
              <button
                onClick={handleGoogleLogin}
                className="px-3 sm:px-3.5 py-1.5 bg-[#C27871] text-white rounded-full font-protest text-[11px] sm:text-xs hover:bg-[#3A342D] transition-colors shadow-xs"
              >
                Sign In
              </button>
            )
          ) : (
            <div className="w-10 sm:w-14 h-4" />
          )}

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="hover:text-[#C27871] transition-colors flex items-center p-1"
            title="Cart"
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">shopping_bag</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            className="md:hidden p-1 hover:text-[#C27871] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 bg-[#F4EFE5] border border-[#DCD3C1] shadow-2xl rounded-2xl p-5 space-y-3 font-protest text-sm"
          >
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#3A342D] hover:text-[#C27871] border-b border-[#DDD5C5]/50"
            >
              Collections
            </Link>
            <Link
              href="/templates"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#3A342D] hover:text-[#C27871] border-b border-[#DDD5C5]/50"
            >
              Photo Books
            </Link>
            <Link
              href="/polaroid"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#3A342D] hover:text-[#C27871] border-b border-[#DDD5C5]/50"
            >
              Polaroids
            </Link>
            <Link
              href="/orders"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#3A342D] hover:text-[#C27871] border-b border-[#DDD5C5]/50"
            >
              My Orders
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#3A342D] hover:text-[#C27871] border-b border-[#DDD5C5]/50"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#3A342D] hover:text-[#C27871]"
            >
              Contact Studio
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}


// 2. HERO SECTION — "KEEP IT OFFLINE."
function HeroScrapbookSection() {
  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] pt-24 sm:pt-28 pb-10 px-4 sm:px-8 md:px-12 bg-[#F8F3EA] overflow-hidden flex flex-col justify-center">

      {/* Background Animated Drawing Lines */}
      <AnimatedDrawnLine
        d={DRAWN_PATHS.heartLoop}
        viewBox={DRAWN_PATHS.heartLoopViewBox}
        stroke="#C27871"
        strokeWidth={2.4}
        strokeOpacity={0.3}
        className="top-12 left-0 w-full max-w-4xl h-48 sm:h-56 -z-0"
        duration={2.8}
        delay={0.1}
      />

      <AnimatedDrawnLine
        d={DRAWN_PATHS.loopDeLoopHeart}
        viewBox={DRAWN_PATHS.loopDeLoopHeartViewBox}
        stroke="#E8B042"
        strokeWidth={2}
        strokeOpacity={0.3}
        strokeDasharray="5 4"
        className="top-20 right-0 w-64 sm:w-80 md:w-[480px] h-40 sm:h-48 -z-0 hidden sm:block"
        duration={2.5}
        delay={0.35}
      />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

        {/* Left Side: Headlines & Copy */}
        <div className="lg:col-span-5 z-20 space-y-4 sm:space-y-6 text-center lg:text-left">
          
          {/* Archival Studio Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FAF6EE] px-3.5 py-1.5 rounded-full border border-[#DDD5C5] shadow-xs">
            <span className="text-[#C27871] text-xs">♥</span>
            <span className="font-glory text-sm sm:text-base text-[#3A342D] font-bold">100% Archival Cotton • Hand-crafted in Studio</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#3A342D] leading-[0.92]" style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}>
              <span className="block">Keep It</span>
              <span className="text-[#C27871] block">Offline.</span>
            </h1>
          </div>

          <p className="font-glory text-xl sm:text-2xl text-[#3A342D] font-bold max-w-md mx-auto lg:mx-0 leading-snug">
            Your favorite moments deserve more than a camera roll. ♡
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1 sm:pt-2">
            <Link
              href="/templates"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#C27871] text-white font-cute text-xs tracking-wider uppercase font-bold rounded-full hover:bg-[#3A342D] transition-all shadow-md text-center"
            >
              Make Something Real
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#F4EFE5] border border-[#3A342D]/30 text-[#3A342D] font-cute text-xs tracking-wider uppercase font-bold rounded-full hover:bg-[#3A342D] hover:text-white transition-all shadow-xs text-center"
            >
              Explore Formats
            </Link>
          </div>

          {/* Mini annotation */}
          <div className="pt-1">
            <span className="font-handwriting text-xl sm:text-2xl text-[#C27871]">memories you can hold ♡</span>
          </div>
        </div>

        {/* Right Side: Asymmetrical Scrapbook Photo Composition matching reference image */}
        <div className="lg:col-span-7 relative min-h-[460px] sm:min-h-[520px] md:min-h-[560px] w-full flex items-center justify-center mt-6 lg:mt-0">

          {/* Main Large Taped Polaroid (Van/Sunset Beach) */}
          <motion.div
            whileHover={{ scale: 1.03, rotate: 0 }}
            className="absolute z-20 top-0 sm:top-2 left-[6%] sm:left-[15%] md:left-[20%] transform -rotate-3 cursor-pointer"
          >
            {/* Washi Tape on top */}
            <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />
            <div className="polaroid-frame w-56 sm:w-64 md:w-80 shadow-2xl">
              <img src="/images/polaroid2.jpg" alt="Van sunset beach" className="w-full aspect-[4/3] object-cover rounded-xs" />
              <p className="font-glory text-xl sm:text-2xl text-[#3A342D] mt-2 sm:mt-3 text-center">the good days ♡</p>
            </div>
          </motion.div>

          {/* Sticky Note Top Right */}
          <motion.div
            whileHover={{ scale: 1.08, rotate: 0 }}
            className="absolute z-30 top-2 sm:top-4 right-[2%] md:right-[6%] transform rotate-6 bg-[#F7E8E1] p-2.5 sm:p-3 border border-[#E8D4CC] shadow-md w-28 sm:w-32 rounded-xs cursor-pointer"
          >
            <p className="font-glory text-base sm:text-xl text-[#C27871] leading-tight font-bold">
              keep this one ♡
            </p>
          </motion.div>

          {/* Daisy Flowers Photo Top Right */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 6 }}
            className="absolute z-10 top-[20%] right-[2%] md:right-[5%] transform rotate-12 hidden sm:block cursor-pointer"
          >
            <div className="washi-tape -top-2 right-2 rotate-[6deg]" />
            <div className="polaroid-frame w-36 sm:w-40 shadow-lg">
              <img src="/images/polaroid8.jpg" alt="Daisy Flowers" className="w-full aspect-square object-cover" />
            </div>
          </motion.div>

          {/* Film Negative Strip Far Right */}
          <div className="absolute z-10 top-4 sm:top-6 -right-2 md:right-0 transform rotate-6 hidden md:block">
            <div className="bg-[#1A1A1A] p-2 rounded shadow-2xl border border-stone-800 space-y-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-12 h-16 sm:w-14 sm:h-20 bg-stone-900 border border-stone-700 relative overflow-hidden">
                  <img src={`/images/polaroid${i === 1 ? '8' : i === 2 ? '2' : '8'}.jpg`} alt="Film frame" className="w-full h-full object-cover opacity-80 sepia-[0.2]" />
                  <span className="absolute bottom-0.5 right-0.5 text-[6px] text-amber-500 font-mono">35mm</span>
                </div>
              ))}
            </div>
          </div>

          {/* Polaroid Bottom Left (Beach sunset & summer '24 tag) */}
          <motion.div
            whileHover={{ scale: 1.04, rotate: -4 }}
            className="absolute z-20 bottom-2 left-0 sm:left-[2%] md:left-[4%] transform -rotate-8 cursor-pointer"
          >
            <div className="washi-tape washi-tape-burgundy -top-2.5 left-4 rotate-[4deg]" />
            <div className="polaroid-frame w-40 sm:w-48 shadow-xl">
              <img src="/images/photobook11.jpg" alt="Beach sunset" className="w-full aspect-video object-cover" />
              <div className="mt-1 sm:mt-2 flex justify-between items-center">
                <span className="bg-[#DCE4D7] px-2 py-0.5 text-[9px] sm:text-[10px] font-mono text-[#3A342D] rounded">summer '24</span>
              </div>
            </div>
          </motion.div>

          {/* Center Handwritten Tag */}
          <motion.div
            whileHover={{ scale: 1.06 }}
            className="absolute z-30 bottom-10 sm:bottom-12 left-[32%] sm:left-[38%] bg-[#FAF6EE] p-2 sm:p-2.5 border border-[#DDD5C5] shadow-md rounded transform rotate-3 cursor-pointer"
          >
            <p className="font-glory text-sm sm:text-lg text-[#3A342D] leading-none font-bold">
              don't forget this ♡
            </p>
          </motion.div>

          {/* Vintage Camera Graphic Illustration Bottom Center */}
          <div className="absolute z-20 bottom-0 right-[15%] sm:right-[22%] md:right-[25%] transform rotate-4 hidden sm:block pointer-events-none">
            <img src="/images/keepsakes.png" alt="Vintage camera accessories" className="w-36 sm:w-48 object-contain opacity-90 drop-shadow-md" />
          </div>

        </div>

      </div>
    </section>
  );
}

// 3. INTRODUCTION SECTION — "YOUR CAMERA ROLL HAS STORIES."
function ScrapbookIntroSection() {
  const steps = [
    { num: '01', title: 'PHONE', icon: 'smartphone', desc: 'Camera Roll' },
    { num: '02', title: 'PHOTO', icon: 'photo', desc: 'Selection' },
    { num: '03', title: 'PRINT', icon: 'menu_book', desc: 'Archival Print' },
    { num: '04', title: 'MEMORY', icon: 'favorite', desc: 'Forever Keepsake' }
  ];

  return (
    <section className="relative py-10 sm:py-14 px-4 sm:px-6 md:px-12 bg-[#F4EFE5] text-[#3A342D] overflow-hidden">
      <TornPaperEdgeTop fill="#F8F3EA" className="-top-6 absolute left-0" />

      {/* Connecting Wave Line */}
      <AnimatedDrawnLine
        d={DRAWN_PATHS.connectingHeartEnd}
        viewBox={DRAWN_PATHS.connectingHeartEndViewBox}
        stroke="#C27871"
        strokeWidth={2.4}
        strokeOpacity={0.3}
        className="top-1/2 left-0 w-full h-28 -translate-y-1/2 -z-0 hidden md:block"
        duration={2.8}
        delay={0.15}
      />

      <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 pt-1 relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-5xl text-[#3A342D] tracking-tight" style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}>
          <span>Your Camera Roll </span>
          <span className="text-[#C27871]">Has Stories.</span>
        </h2>

        <p className="font-glory text-base sm:text-xl md:text-2xl text-[#3A342D]/90 max-w-lg mx-auto font-bold leading-relaxed">
          Some moments are too good to disappear into a thousand other photos. ♡
        </p>

        {/* 4 Transformation Step Cards */}
        <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-3xl mx-auto">
          {steps.map((s) => (
            <div key={s.num} className="bg-[#FAF6EE] p-3 sm:p-4 border border-[#DDD5C5] shadow-md rounded-xl flex flex-col items-center justify-between relative group hover:border-[#C27871] transition-all">
              <span className="font-readable text-[9px] sm:text-[10px] font-bold text-[#C27871] uppercase tracking-widest">{s.num}</span>
              <div className="w-12 h-12 sm:w-14 sm:h-14 my-1.5 sm:my-2 bg-[#F8EBE6] rounded-full flex items-center justify-center text-[#C27871] group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-lg sm:text-xl">{s.icon}</span>
              </div>
              <h4 className="font-protest text-xs sm:text-sm text-[#3A342D] tracking-wide">{s.title}</h4>
              <span className="font-readable text-[11px] sm:text-xs font-semibold text-[#C27871]">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4. PRODUCT SECTION — "WHAT SHOULD WE PRINT?" (4 FEATURED PRODUCTS + VIEW ALL COLLECTIONS BUTTON)
function WhatShouldWePrint() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const products = [
    {
      id: 'photobooks',
      title: 'Photo Books',
      subtitle: 'Stories worth keeping.',
      badge: 'Layflat Hardcover',
      img: '/images/wide_photo_book.png',
      cta: 'Explore Books',
      href: '/templates',
      color: 'bg-[#F8EBE6]'
    },
    {
      id: 'photo_frames',
      title: 'Photo Frames',
      subtitle: 'Timeless frames for everyday magic.',
      badge: 'Natural Wood',
      img: '/images/frames.png',
      cta: 'Shop Frames',
      href: '/frame',
      color: 'bg-[#FAF6EE]'
    },
    {
      id: 'polaroids',
      title: 'Polaroids',
      subtitle: 'Because photos feel better in your hands.',
      badge: 'Retro Prints',
      img: '/images/polaroid8.jpg',
      cta: 'Shop Polaroids',
      href: '/polaroid',
      color: 'bg-[#DCE4D7]/60'
    },
    {
      id: 'fridge_magnets',
      title: 'Fridge Magnets',
      subtitle: 'Turn your fridge into a daily gallery.',
      badge: 'Magnetic Keepsake',
      img: '/images/polariod fridge magnet 4.jpg',
      cta: 'Shop Magnets',
      href: '/fridge-magnet',
      color: 'bg-[#F7E8E1]'
    }
  ];

  return (
    <section className="pt-12 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 bg-[#F8F3EA] relative overflow-hidden">

      {/* Top right flowing line that loops into a heart */}
      <AnimatedDrawnLine
        d={DRAWN_PATHS.heartLoop}
        viewBox={DRAWN_PATHS.heartLoopViewBox}
        stroke="#C27871"
        strokeWidth={2.4}
        strokeOpacity={0.28}
        className="top-6 right-0 w-full max-w-3xl h-40 sm:h-48 -z-0"
        duration={2.8}
        delay={0.15}
      />

      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 relative z-10">

        {/* Section Header - Centered */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2
            className="text-3xl sm:text-4xl md:text-6xl text-[#3A342D] tracking-tight"
            style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
          >
            What Should We Print?
          </h2>
          <p className="font-glory text-base sm:text-xl text-[#3A342D]/80 font-bold">
            Choose your physical keepsake format. ♡
          </p>

          {/* Left / Right Carousel Navigation Buttons (Mobile / Tablet Only) */}
          <div className="flex lg:hidden items-center justify-center gap-2 pt-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-[#FAF6EE] border border-[#DDD5C5] text-[#3A342D] hover:bg-[#C27871] hover:text-white transition-all shadow-md flex items-center justify-center hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            <span className="font-glory text-sm text-[#C27871] font-bold">swipe formats ♡</span>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-[#FAF6EE] border border-[#DDD5C5] text-[#3A342D] hover:bg-[#C27871] hover:text-white transition-all shadow-md flex items-center justify-center hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Responsive Container: Horizontal Scroll on Mobile (<lg), Full 4-Column Grid on Desktop (>=lg) */}
        <div
          ref={scrollRef}
          className="flex lg:grid lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 overflow-x-auto lg:overflow-visible pb-6 lg:pb-0 pt-3 px-1 snap-x snap-mandatory lg:snap-none scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {products.map((p) => (
            <div
              key={p.id}
              className={`w-[260px] sm:w-[300px] lg:w-auto flex-shrink-0 lg:flex-shrink snap-start lg:snap-align-none p-5 sm:p-7 rounded-2xl sm:rounded-3xl border-2 border-[#DDD5C5] shadow-lg sm:shadow-xl flex flex-col justify-between items-center text-center relative group hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ${p.color}`}
            >
              <div className="washi-tape -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />

              {/* Badge Tag */}
              <div className="mb-3">
                <span className="bg-white/80 border border-[#DDD5C5] px-3 py-1 rounded-full text-[10px] font-readable font-bold text-[#C27871] uppercase tracking-wider shadow-2xs">
                  {p.badge}
                </span>
              </div>

              {/* Image Preview */}
              <div className="w-full aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl bg-white border border-[#DDD5C5] shadow-xs mb-4 sm:mb-6 relative">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Title & Subtitle */}
              <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 flex-1 flex flex-col justify-center">
                <h3
                  className="text-xl sm:text-2xl md:text-3xl text-[#3A342D]"
                  style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                >
                  {p.title}
                </h3>
                <p className="font-glory text-base sm:text-xl text-[#3A342D]/85 font-bold leading-snug">
                  "{p.subtitle}"
                </p>
              </div>

              {/* CTA Button */}
              <Link
                href={p.href}
                className="w-full py-3 sm:py-3.5 bg-[#C27871] text-white rounded-full font-protest text-xs uppercase tracking-wider hover:bg-[#3A342D] transition-all shadow-md text-center block"
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// 5. BEST SELLERS SECTION — "OUR LITTLE FAVORITES" (HORIZONTAL SCROLL ON MOBILE, FULL GRID ON DESKTOP)
function OurLittleFavoritesGingham() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const favoriteTemplates = [
    {
      id: 'wanderlust',
      title: 'Wanderlust Travel Journal',
      category: 'Travel & Trips',
      price: 'From ₹1,499',
      pages: 12,
      rating: 5,
      reviews: 184,
      img: wanderlustImg.src,
      badge: 'most loved travel layout'
    },
    {
      id: 'wedding-bliss',
      title: 'Wedding Bliss Layflat',
      category: 'Weddings & Love',
      price: 'From ₹3,999',
      pages: 12,
      rating: 5,
      reviews: 240,
      img: '/images/tpl_wedding.png',
      badge: 'bestseller wedding book'
    },
    {
      id: 'little-one',
      title: 'Little One Baby Book',
      category: 'Baby & Milestones',
      price: 'From ₹1,799',
      pages: 12,
      rating: 5,
      reviews: 156,
      img: '/images/tpl_baby.png',
      badge: 'precious baby steps'
    },
    {
      id: 'year-in-review',
      title: 'Year In Review Journal',
      category: 'Annual Memories',
      price: 'From ₹2,999',
      pages: 12,
      rating: 5,
      reviews: 212,
      img: yearInReviewImg.src,
      badge: '365 days of magic'
    },
    {
      id: 'recipe-book',
      title: 'Family Heritage Keepsake',
      category: 'Family & Recipes',
      price: 'From ₹2,299',
      pages: 12,
      rating: 5,
      reviews: 118,
      img: familyRecipesImg.src,
      badge: 'cherished family heirloom'
    }
  ];

  return (
    <section className="relative py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-gingham text-[#3A342D] overflow-hidden">
      <TornPaperEdgeTop fill="#F8F3EA" className="-top-6 sm:-top-8 absolute left-0" />

      {/* Animated Connecting Wave with Love Symbol */}
      <AnimatedDrawnLine
        d={DRAWN_PATHS.connectingHeartEnd}
        viewBox={DRAWN_PATHS.connectingHeartEndViewBox}
        stroke="#C27871"
        strokeWidth={2.8}
        strokeOpacity={0.3}
        className="top-20 left-0 w-full h-32 -z-0"
        duration={3.0}
        delay={0.15}
      />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8 sm:space-y-12">

        {/* Header Storytelling */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <h2
            className="text-3xl sm:text-4xl md:text-6xl text-[#3A342D] tracking-tight"
            style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
          >
            Our Little Favorites
          </h2>

          <p className="font-glory text-lg sm:text-xl md:text-2xl text-[#3A342D]/90 font-bold leading-relaxed px-2">
            Every memory deserves its own chapter. Our hand-bound, archival layflat photobooks let you weave your camera roll into tactile heirloom pages that stay vivid for generations. ♡
          </p>

          {/* Feature Badges with clean typography */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3 pt-1 sm:pt-2">
            <span className="bg-[#FAF6EE] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#DDD5C5] text-[10px] sm:text-xs font-readable text-[#3A342D] font-bold shadow-xs">
              100% Archival Cotton Paper
            </span>
            <span className="bg-[#FAF6EE] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#DDD5C5] text-[10px] sm:text-xs font-readable text-[#3A342D] font-bold shadow-xs">
              180° Seamless Layflat
            </span>
            <span className="bg-[#FAF6EE] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[#DDD5C5] text-[10px] sm:text-xs font-readable text-[#C27871] font-bold shadow-xs">
              Hand-Inspected with Care
            </span>
          </div>

          {/* Left / Right Carousel Controls (Mobile Only) */}
          <div className="flex md:hidden items-center justify-center gap-3 pt-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full bg-[#FAF6EE] border border-[#DDD5C5] text-[#3A342D] hover:bg-[#C27871] hover:text-white transition-all shadow-md flex items-center justify-center hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            <span className="font-glory text-sm text-[#C27871] font-bold">swipe layouts ♡</span>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full bg-[#FAF6EE] border border-[#DDD5C5] text-[#3A342D] hover:bg-[#C27871] hover:text-white transition-all shadow-md flex items-center justify-center hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Scroll right"
            >
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Responsive Container: Horizontal Scroll on Mobile (<md), Full 5-Column Grid on Desktop (>=md) */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 overflow-x-auto md:overflow-visible pb-6 md:pb-0 pt-3 px-1 snap-x snap-mandatory md:snap-none scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {favoriteTemplates.map((fav) => (
            <div
              key={fav.id}
              className="w-[230px] sm:w-[260px] md:w-auto flex-shrink-0 md:flex-shrink snap-start md:snap-align-none bg-[#FAF6EE] p-4 sm:p-5 border border-[#DDD5C5] shadow-lg sm:shadow-xl rounded-2xl flex flex-col justify-between relative group hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Washi Tape Pin */}
              <div className="washi-tape -top-2 sm:-top-2.5 right-3 rotate-[3deg]" />

              <div>
                {/* Book Cover Layout Preview */}
                <div className="aspect-[3/4] bg-[#F4EFE5] rounded-xl border border-[#DDD5C5] overflow-hidden mb-3 sm:mb-4 relative shadow-xs">
                  <img
                    src={fav.img}
                    alt={fav.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/images/books.png"; }}
                  />
                  <span className="absolute bottom-2 left-2 bg-[#FAF6EE]/90 px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-readable font-bold text-[#3A342D] border border-[#DDD5C5]">
                    {fav.pages} Pages
                  </span>
                </div>

                <div className="space-y-1 sm:space-y-1.5 text-left">
                  <span className="bg-[#F8EBE6] px-2.5 py-0.5 text-[9px] sm:text-[10px] font-glory text-[#C27871] rounded-full font-bold inline-block">
                    {fav.badge}
                  </span>

                  <h4
                    className="text-base sm:text-lg text-[#3A342D] leading-tight line-clamp-1"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    {fav.title}
                  </h4>

                  {/* Clean Readable Price */}
                  <p className="text-sm font-bold text-[#C27871]">
                    <span className="font-glory">From </span>
                    <span className="font-num font-extrabold tracking-tight">{fav.price.replace('From ', '')}</span>
                  </p>

                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    <span>★★★★★</span>
                    <span className="text-[10px] font-readable font-bold text-[#3A342D]/70">({fav.reviews})</span>
                  </div>
                </div>
              </div>

              {/* Action Button to Editor */}
              <Link
                href={`/editor?template=${fav.id}`}
                className="mt-3 sm:mt-4 w-full py-2.5 bg-[#C27871] text-white text-xs font-protest uppercase tracking-wider rounded-full text-center hover:bg-[#3A342D] transition-colors shadow-xs block"
              >
                Customize Layout
              </Link>
            </div>
          ))}
        </div>

        {/* View All Templates CTA Link */}
        <div className="text-center pt-2 sm:pt-4">
          <Link
            href="/templates"
            className="w-full sm:w-auto inline-block px-6 sm:px-8 py-3.5 bg-[#FAF6EE] text-[#3A342D] border border-[#DDD5C5] rounded-full font-protest text-xs uppercase tracking-wider hover:bg-[#C27871] hover:text-white transition-all shadow-md text-center"
          >
            Browse All Photobook Layouts
          </Link>
        </div>

      </div>

      <TornPaperEdgeBottom fill="#DCE4D7" className="-bottom-6 sm:-bottom-8 absolute left-0" />
    </section>
  );
}


// Official Wax Seal / Archival Stamp Component
export function AuthenticWaxSeal({ className = "w-24 h-24 sm:w-28 sm:h-28 text-[#8F302D]" }) {
  return (
    <div className={`relative flex items-center justify-center transform -rotate-12 select-none drop-shadow-md cursor-pointer hover:rotate-0 transition-transform duration-300 ${className}`}>
      <svg viewBox="0 0 140 140" className="w-full h-full">
        <defs>
          <path
            id="sealTextPath"
            d="M 70, 70 m -46, 0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
          />
        </defs>

        {/* Outer Serrated / Wax Edge Circle */}
        <circle cx="70" cy="70" r="64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 3" opacity="0.85" />
        <circle cx="70" cy="70" r="58" fill="#F4EFE5" stroke="currentColor" strokeWidth="1.5" opacity="0.95" />
        <circle cx="70" cy="70" r="54" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />

        {/* Curved Circular Text Path */}
        <text className="text-[9px] font-bold tracking-[0.16em] fill-[#8F302D] uppercase font-sans">
          <textPath href="#sealTextPath" startOffset="0%">
            • OFFLINE LIVING • ARCHIVAL QUALITY • EST. 2026 •
          </textPath>
        </text>

        {/* Inner Circle & Center Content */}
        <circle cx="70" cy="70" r="32" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <g transform="translate(70, 62)">
          <text textAnchor="middle" y="2" className="text-[9px] font-sans font-extrabold tracking-widest fill-[#8F302D]">GENUINE</text>
          <text textAnchor="middle" y="14" className="text-[14px] font-serif fill-[#C27871]">♥</text>
          <text textAnchor="middle" y="24" className="text-[7.5px] font-sans font-bold tracking-wider fill-[#8F302D]">STAMP</text>
        </g>
      </svg>
    </div>
  );
}

// 6. TESTIMONIAL BANNER — SAGE GREEN TORN PAPER STRIP
function SageTestimonialBanner() {
  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 md:px-12 bg-[#DCE4D7] text-[#3A342D] flex items-center justify-center overflow-hidden">

      <AnimatedDrawnLine
        d={DRAWN_PATHS.whimsicalSquiggle}
        viewBox={DRAWN_PATHS.whimsicalSquiggleViewBox}
        stroke="#3A342D"
        strokeWidth={2.2}
        strokeOpacity={0.25}
        className="top-3 left-1/2 -translate-x-1/2 w-full max-w-3xl h-20 sm:h-24 -z-0"
        duration={2.4}
        delay={0.2}
      />

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 w-full relative z-10">

        {/* Paper clip photo on left */}
        <div className="relative">
          <div className="absolute -top-3 left-4 z-20">
            <PaperClipIcon className="w-5 h-8 sm:w-6 sm:h-10 text-slate-600" />
          </div>
          <div className="polaroid-frame w-32 sm:w-40 shadow-xl transform -rotate-6">
            <img src="/images/polaroid8.jpg" alt="Happy customer memory" className="w-full aspect-square object-cover" />
          </div>
        </div>

        {/* Quote in center */}
        <div className="text-center md:text-left space-y-1.5 sm:space-y-2 flex-1">
          <p className="font-glory italic text-2xl sm:text-3xl md:text-4xl text-[#3A342D] leading-snug">
            "It's not just printing. <br />
            It's reliving."
          </p>
          <p className="font-protest text-xs text-[#C27871]">
            — ANANYA, BANGALORE
          </p>
        </div>

        {/* Archival Wax Seal Stamp on right */}
        <div className="flex items-center justify-center">
          <AuthenticWaxSeal className="w-24 h-24 sm:w-32 sm:h-32" />
        </div>

      </div>
    </section>
  );
}


// 7. REAL PEOPLE. REAL MEMORIES.
function RealPeopleRealMemories() {
  const customerMemories = [
    { img: "/images/photobook11.jpg", caption: "Kyoto Trip '24" },
    { img: "/images/polaroid2.jpg", caption: "Beach Days" },
    { img: "/images/wide_photo_book.png", caption: "Family Album" },
    { img: "/images/keepsakes.png", caption: "Anniversary Print" },
    { img: "/images/polaroid8.jpg", caption: "Sunday Coffee" },
    { img: "/images/craft1.png", caption: "Polaroids" }
  ];

  return (
    <section className="py-14 sm:py-24 px-4 sm:px-6 md:px-12 bg-[#F8F3EA] text-[#3A342D] relative overflow-hidden">

      {/* Heart-threaded drawing line */}
      <AnimatedDrawnLine
        d={DRAWN_PATHS.heartLoop}
        viewBox={DRAWN_PATHS.heartLoopViewBox}
        stroke="#C27871"
        strokeWidth={2.4}
        strokeOpacity={0.3}
        className="top-1/2 left-0 w-full h-32 sm:h-36 -translate-y-1/2 -z-0"
        duration={2.8}
        delay={0.2}
      />

      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10 text-center relative z-10">

        <div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl text-[#3A342D] tracking-tight" style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}>
            Real People. Real Memories.
          </h2>
          <p className="font-glory text-xs sm:text-sm text-[#C27871] font-bold mt-1.5">
            Tag us @offlineliving.co to be featured ♡
          </p>
        </div>

        {/* Grid of 6 Customer Photo Cards + Sticky Note */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 sm:gap-4 items-center">
          {customerMemories.map((m, i) => (
            <div key={i} className="polaroid-frame w-full shadow-sm sm:shadow-md transform hover:scale-105 transition-transform p-1.5 pb-3">
              <img src={m.img} alt={m.caption} className="w-full aspect-square object-cover" />
              <p className="font-handwriting text-[10px] sm:text-xs text-[#3A342D] mt-1 text-center truncate">{m.caption}</p>
            </div>
          ))}

          {/* Sticky Note */}
          <div className="bg-[#FAF6EE] p-3 sm:p-4 border border-[#DDD5C5] shadow-md sm:shadow-lg rounded transform rotate-3 sm:rotate-6 col-span-2 sm:col-span-1">
            <p className="font-handwriting text-base sm:text-xl text-[#C27871] font-bold leading-tight">
              Thanks for keeping it real! ♡
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

// Wavy Wave Top Edge SVG Component
export function WavyFooterEdgeTop({ fill = "#3A342D", className = "" }) {
  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-10 sm:h-14 md:h-20 block">
        <path
          d="M0,60 C150,0 250,50 400,20 C550,-10 650,50 800,20 C950,-10 1050,50 1200,60 L1200,60 L0,60 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

// 8. EMAIL SECTION & DARK WARM BROWN FOOTER WITH WAVY TOP
export function ScrapbookFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="bg-[#3A342D] text-[#F8F3EA] pt-16 sm:pt-20 pb-8 sm:pb-10 px-4 sm:px-6 md:px-12 relative mt-16 sm:mt-24" suppressHydrationWarning>
      <WavyFooterEdgeTop fill="#3A342D" className="-top-10 sm:-top-14 md:-top-20 absolute left-0 w-full z-20" />

      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-16 pt-2 sm:pt-4 relative z-10" suppressHydrationWarning>

        {/* Newsletter Signup Strip */}
        <div className="bg-[#4A433A] p-5 sm:p-8 md:p-10 rounded-2xl border border-stone-600 shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6" suppressHydrationWarning>
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-protest text-lg sm:text-xl text-[#F8F3EA]">Let's stay in touch!</h4>
            <p className="font-glory text-sm sm:text-base text-[#F8F3EA]/80 font-light">Get cute updates, new products, and special offers.</p>
          </div>

          {subscribed ? (
            <span className="font-glory text-xl sm:text-2xl text-[#C27871]">Subscribed with love! ♡</span>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row w-full md:w-auto gap-2" suppressHydrationWarning>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                suppressHydrationWarning
                className="bg-[#F8F3EA] text-[#3A342D] px-4 py-2.5 rounded-full sm:rounded font-glory text-sm flex-1 md:w-64 focus:outline-none"
              />
              <button
                type="submit"
                suppressHydrationWarning
                className="bg-[#C27871] text-white px-5 py-2.5 rounded-full sm:rounded font-protest text-xs uppercase tracking-wider hover:bg-white hover:text-[#3A342D] transition-colors flex items-center justify-center text-center"
              >
                Join Studio List
              </button>
            </form>
          )}
        </div>


        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 border-t border-stone-700 pt-8 sm:pt-12">

          {/* Left Brand Identity */}
          <div className="col-span-2 md:col-span-5 space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-protest text-xl sm:text-2xl text-[#F8F3EA]">OFFLINE LIVING</span>
            </div>
            <p className="font-glory text-xl sm:text-2xl text-[#C27871]">MAKE MEMORIES PHYSICAL. ♡</p>
            <p className="font-sans text-xs text-[#F8F3EA]/60 max-w-sm leading-relaxed font-light">
              Turning your favorite digital photos into physical layflat photobooks, tactile prints, and handmade memory keepsakes.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="col-span-1 md:col-span-2 space-y-2 sm:space-y-3">
            <h5 className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#C27871]">SHOP</h5>
            <ul className="space-y-1.5 sm:space-y-2 font-sans text-xs text-[#F8F3EA]/70">
              <li><Link href="/templates" className="hover:text-[#C27871]">Photo Books</Link></li>
              <li><Link href="/polaroid" className="hover:text-[#C27871]">Prints</Link></li>
              <li><Link href="/fridge-magnet" className="hover:text-[#C27871]">Cards</Link></li>
              <li><Link href="/frame" className="hover:text-[#C27871]">Gifts</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-2 sm:space-y-3">
            <h5 className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#C27871]">COMPANY</h5>
            <ul className="space-y-1.5 sm:space-y-2 font-sans text-xs text-[#F8F3EA]/70">
              <li><Link href="/about" className="hover:text-[#C27871]">About Us</Link></li>
              <li><Link href="/about-us" className="hover:text-[#C27871]">Our Story</Link></li>
              <li><Link href="/blog" className="hover:text-[#C27871]">Blog</Link></li>
              <li><Link href="/careers" className="hover:text-[#C27871]">Careers</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3 space-y-2 sm:space-y-3">
            <h5 className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#C27871]">HELP</h5>
            <ul className="space-y-1.5 sm:space-y-2 font-sans text-xs text-[#F8F3EA]/70">
              <li><Link href="/faqs" className="hover:text-[#C27871]">FAQs</Link></li>
              <li><Link href="/shipping" className="hover:text-[#C27871]">Shipping</Link></li>
              <li><Link href="/returns" className="hover:text-[#C27871]">Returns</Link></li>
              <li><Link href="/contact" className="hover:text-[#C27871]">Contact Us</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Social & Copyright */}
        <div className="border-t border-stone-700 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-sans text-[#F8F3EA]/50 gap-3 text-center sm:text-left">
          <p>© 2026 Offline Living. All rights reserved. • EST. 2026</p>
          <div className="flex gap-4 text-xs font-sans">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C27871]">Instagram</a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C27871]">Pinterest</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#C27871]">YouTube</a>
            <a href="mailto:hello@offlineliving.co" className="hover:text-[#C27871]">Email Studio</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

// MAIN EXPORTED LANDING PAGE COMPONENT
export function LandingPage() {

  return (
    <div className="bg-[#F8F3EA] text-[#3A342D] font-sans antialiased relative min-h-screen max-w-full overflow-x-hidden">
      <div className="grain-overlay" />
      <ScrapbookNavbar />
      <main className="max-w-full overflow-x-hidden">
        <HeroScrapbookSection />
        <ScrapbookIntroSection />
        <WhatShouldWePrint />
        <OurLittleFavoritesGingham />
        <SageTestimonialBanner />
        <RealPeopleRealMemories />
      </main>
      <ScrapbookFooter />
    </div>
  );
}

export default LandingPage;
