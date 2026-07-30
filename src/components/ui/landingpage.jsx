import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

// Product Data using project local assets
const PRODUCTS = [
  {
    id: 'book-01',
    category: 'books',
    badge: 'NEW ARRIVAL',
    badgeColor: 'text-brass-gold',
    price: 'FROM $120',
    title: 'Signature Photo Book',
    description: 'Custom archival-quality books with seamless layflat binding.',
    image: '/images/books.png',
    feature: 'Archival Edition',
    icon: 'menu_book',
    cta: 'Customize in Studio',
    href: '/templates'
  },
  {
    id: 'frame-01',
    category: 'frames',
    badge: 'POPULAR',
    badgeColor: 'text-ink-charcoal/70',
    price: 'FROM $85',
    title: 'Solid Wood Frame',
    description: 'Sustainably harvested timber with museum anti-reflective glass.',
    image: '/images/frames.png',
    feature: 'Custom Matting',
    icon: 'aspect_ratio',
    cta: 'Customize Frame',
    href: '/frame'
  },
  {
    id: 'print-01',
    category: 'prints',
    badge: 'NO. 03',
    badgeColor: 'text-ink-charcoal/70',
    price: 'FROM $45',
    title: 'Polaroid Keepsakes',
    description: 'Tactile archival analog prints packaged in bespoke linen box.',
    image: '/images/keepsakes.png',
    feature: 'Set of 24 Prints',
    icon: 'photo_library',
    cta: 'Print Memories',
    href: '/polaroid'
  }
];

// 1. Navigation Bar
function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-ink-charcoal/10 bg-archival-cream/90 backdrop-blur-md transition-all duration-300">
      <div className="flex justify-between items-center px-8 md:px-margin-desktop py-4 w-full max-w-full mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link className="flex items-center gap-2 group text-ink-charcoal" href="/">
            <span className="font-headline-md italic text-2xl font-normal tracking-tight hover:text-brass-gold transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
              Offline <span className="text-xs non-italic font-sans uppercase tracking-widest text-brass-gold align-top relative -top-1">Living ®</span>
            </span>
          </Link>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-10">
          <div 
            className="relative group py-2"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="nav-link font-label-caps text-xs tracking-[0.14em] uppercase font-bold text-ink-charcoal/80 hover:text-brass-gold flex items-center gap-1.5 transition-colors">
              Collections
              <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>
            
            {/* Dropdown Card */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-archival-cream/98 backdrop-blur-xl border border-ink-charcoal/10 shadow-2xl rounded-xl p-5 transition-all duration-300 transform ${dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
              <ul className="space-y-3.5 font-label-caps text-xs tracking-widest uppercase font-semibold">
                <li><Link href="/templates" className="block text-ink-charcoal/80 hover:text-brass-gold hover:translate-x-1 transition-all">Photo Book</Link></li>
                <li><Link href="/frame" className="block text-ink-charcoal/80 hover:text-brass-gold hover:translate-x-1 transition-all">Photo Frame</Link></li>
                <li><Link href="/polaroid" className="block text-ink-charcoal/80 hover:text-brass-gold hover:translate-x-1 transition-all">Polaroid</Link></li>
                <li><Link href="/fridge-magnet" className="block text-ink-charcoal/80 hover:text-brass-gold hover:translate-x-1 transition-all">Polaroid Fridge Magnet</Link></li>
                <li><Link href="/acrylic-frames" className="block text-ink-charcoal/80 hover:text-brass-gold hover:translate-x-1 transition-all">Acrylic Frames</Link></li>
                <li><Link href="/canvas-frames" className="block text-ink-charcoal/80 hover:text-brass-gold hover:translate-x-1 transition-all">Canvas Frames</Link></li>
              </ul>
            </div>
          </div>

          <Link className="nav-link font-label-caps text-xs tracking-[0.14em] uppercase font-bold text-ink-charcoal/80 hover:text-brass-gold transition-colors" href="/about">About</Link>
          <Link className="nav-link font-label-caps text-xs tracking-[0.14em] uppercase font-bold text-ink-charcoal/80 hover:text-brass-gold transition-colors" href="/contact">Contact</Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          {user ? (
            <Link className="nav-link font-label-caps text-xs tracking-[0.14em] uppercase font-bold text-brass-gold hover:text-ink-charcoal transition-colors hidden sm:inline-block" href="/orders">
              Hi, {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'Account'}
            </Link>
          ) : (
            <Link className="nav-link font-label-caps text-xs tracking-[0.14em] uppercase font-bold text-ink-charcoal/80 hover:text-brass-gold transition-colors hidden sm:inline-block" href="/login">
              Profile
            </Link>
          )}
          <Link href="/orders" className="material-symbols-outlined text-ink-charcoal hover:text-brass-gold transition-colors flex items-center" title="Orders & Notifications">notifications</Link>
          <Link href="/cart" className="material-symbols-outlined text-ink-charcoal hover:text-brass-gold transition-colors flex items-center" title="Cart">shopping_bag</Link>
        </div>
      </div>
    </nav>
  );
}

// 2. Hero Section
function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center px-6 md:px-margin-desktop py-12 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-12 w-full items-center gap-gutter">
        <div className="md:col-span-5 z-10">
          <span className="font-label-caps text-xs text-brass-gold font-bold mb-4 block tracking-widest">
            ✦ ARCHIVAL QUALITY GUARANTEED
          </span>
          <h1 className="font-display-hero text-4xl sm:text-5xl lg:text-[60px] xl:text-[68px] mb-6 leading-[1.08]">
            Your memories, archived in physical form.
          </h1>
          <p className="font-body-lg text-base md:text-lg text-ink-charcoal/75 mb-8 max-w-md">
            Elevating your digital memories into tactile, museum-quality physical artifacts. Designed for the modern home, built for eternity.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/templates" className="btn-premium inline-block bg-ink-charcoal text-archival-cream px-8 py-4 font-label-caps text-xs tracking-widest uppercase rounded">
              Start Studio Customizer
            </Link>
            <a href="#collections" className="nav-link font-label-caps text-xs tracking-widest font-bold px-3 py-3 text-ink-charcoal/75 hover:text-ink-charcoal">
              Explore Archive ↓
            </a>
          </div>
        </div>

        {/* Hero Card */}
        <div className="md:col-span-7 relative h-[calc(82vh-96px)] min-h-[480px] max-h-[600px]">
          <div className="card-minimal w-full h-full rounded-lg overflow-hidden shadow-xl" id="hero-card">
            <div className="absolute inset-0 bg-ink-charcoal/5 -rotate-2 scale-95 translate-y-4"></div>
            <div className="w-full h-full relative overflow-hidden">
              <img
                alt="Signature Photo Book detail"
                className="w-full h-full object-cover grayscale-[15%] brightness-[98%] transition-transform duration-700 hover:scale-105"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/hero.png'; }}
                src="/images/hero.png"
              />
              <div className="absolute bottom-8 left-8 bg-archival-cream/95 backdrop-blur-md p-6 border border-brass-gold/40 max-w-xs rounded-lg shadow-lg">
                <span className="font-label-caps text-[10px] text-brass-gold font-bold tracking-widest block mb-1">ARCHIVAL NO. 01</span>
                <h4 className="font-headline-md text-xl font-medium mb-1">Signature Layflat Edition</h4>
                <p className="text-xs text-ink-charcoal/60">310gsm German Etching Paper • Japanese Bookcloth</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. Marquee Ticker
function Marquee() {
  const items = [
    'MUSEUM GRADE ARCHIVAL PAPER',
    'HAND-BOUND IN STUDIO',
    'TACTILE PRECISION',
    'OFFLINE LIVING',
    '310 GSM COTTON RAG',
    'UV PROTECTIVE GLASS'
  ];

  return (
    <div className="bg-ink-charcoal py-6 overflow-hidden border-y border-ink-charcoal/10 my-12">
      <div className="marquee-track">
        {[1, 2].map((groupKey) => (
          <div key={groupKey} className="flex gap-12 font-label-caps text-xs tracking-widest text-archival-cream px-6 font-bold uppercase">
            {items.map((text, idx) => (
              <React.Fragment key={idx}>
                <span>{text}</span>
                <span>✦</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Curated Formats Product Grid
function CuratedFormats() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState(PRODUCTS);

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_active', true);

        if (data && data.length > 0) {
          const mapped = data.map((item) => {
            const cat = item.category === 'photo_book' ? 'books' :
                        item.category === 'photo_frame' ? 'frames' :
                        item.category === 'polaroid' ? 'prints' :
                        item.category === 'acrylic_frame' ? 'frames' :
                        item.category === 'photo_canvas' ? 'frames' : 'prints';
            const route = item.category === 'photo_book' ? '/templates' :
                          item.category === 'photo_frame' ? '/frame' :
                          item.category === 'polaroid' ? '/polaroid' :
                          item.category === 'fridge_magnet' ? '/fridge-magnet' :
                          item.category === 'acrylic_frame' ? '/acrylic-frames' :
                          item.category === 'photo_canvas' ? '/canvas-frames' : '/products';
            const fallbackImg = item.category === 'photo_book' ? '/images/books.png' :
                               item.category === 'photo_frame' ? '/images/frames.png' :
                               item.category === 'polaroid' ? '/images/keepsakes.png' : '/images/craft1.png';
            return {
              id: item.id || item.name,
              category: cat,
              badge: item.attributes?.featured_badge || 'FEATURED',
              badgeColor: 'text-brass-gold',
              price: item.price ? `FROM $${item.price}` : (item.attributes?.price_text || 'CUSTOM'),
              title: item.name,
              description: item.description || 'Custom archival-quality memory keepsake.',
              image: item.images?.[0] || fallbackImg,
              feature: item.attributes?.feature || 'Archival Edition',
              icon: item.category === 'photo_book' ? 'menu_book' : item.category === 'photo_frame' ? 'aspect_ratio' : 'photo_library',
              cta: 'Customize Now',
              href: route
            };
          });
          setProducts(mapped);
        }
      } catch (err) {
        console.error('Error fetching products from Supabase:', err);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="py-16 md:py-section-gap px-6 md:px-margin-desktop bg-white/40 backdrop-blur-sm" id="collections">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
        <div>
          <span className="font-label-caps text-xs text-brass-gold font-bold tracking-widest mb-2 block">COLLECTIONS</span>
          <h2 className="font-headline-lg text-3xl md:text-4xl lg:text-[40px] leading-tight">Curated Formats.</h2>
        </div>
        
        {/* Interactive Filter Tabs */}
        <div className="flex flex-wrap gap-2.5 mt-6 md:mt-0 bg-archival-cream/80 p-1.5 rounded-full border border-ink-charcoal/10">
          {[
            { id: 'all', label: 'All Formats' },
            { id: 'books', label: 'Photo Books' },
            { id: 'frames', label: 'Solid Frames' },
            { id: 'prints', label: 'Polaroid Prints' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`filter-tab px-4 py-2 font-label-caps text-xs font-bold tracking-widest rounded-full transition-all ${
                activeCategory === tab.id
                  ? 'bg-ink-charcoal text-archival-cream'
                  : 'text-ink-charcoal/75 hover:text-ink-charcoal'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10" id="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card group">
            <div className="card-minimal bg-archival-cream p-5 mb-6 rounded-lg border border-ink-charcoal/10 shadow-md overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden bg-surface-container relative rounded-md">
                <img
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = product.image; }}
                  src={product.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <span className="text-archival-cream font-label-caps text-xs font-bold tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">{product.icon || 'photo_library'}</span> {product.feature}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className={`font-label-caps text-xs font-bold tracking-widest ${product.badgeColor || 'text-brass-gold'}`}>{product.badge}</span>
              <span className="font-label-caps text-xs font-bold text-ink-charcoal/70 tracking-wider">{product.price}</span>
            </div>
            <h3 className="font-headline-md text-xl md:text-2xl font-medium mb-2 leading-tight">{product.title}</h3>
            <p className="font-body-md text-sm md:text-base text-ink-charcoal/75 mb-5 leading-relaxed">{product.description}</p>
            <Link href={product.href || '/templates'} className="nav-link font-label-caps text-xs font-bold tracking-widest uppercase text-ink-charcoal inline-flex items-center gap-2 group/btn">
              {product.cta} <span className="material-symbols-outlined text-[16px] transition-transform group-hover/btn:translate-x-2">arrow_forward</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

// 5. Standard of Excellence Section
function StandardOfExcellence() {
  return (
    <section className="py-16 md:py-section-gap px-6 md:px-margin-desktop bg-archival-cream/50 overflow-hidden" id="studio">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        <div className="lg:col-span-4 pr-0 lg:pr-12">
          <h2 className="font-headline-lg text-3xl md:text-4xl lg:text-[40px] leading-tight mb-8">Standard of Excellence.</h2>
          <p className="font-body-lg text-base md:text-lg text-ink-charcoal/75 mb-12">
            Elevate your space with our premium wall art collection. From solid wood frames to museum-grade acrylics, we craft pieces that demand attention.
          </p>
          <ul className="space-y-10">
            {[
              { title: 'Solid Wood Frames', desc: 'Handcrafted from sustainably sourced timber, providing a timeless border for your memories.', href: '/frame' },
              { title: 'Optic Clear Acrylic', desc: 'Anti-reflective museum glass offering vivid contrast, pure clarity, and UV protection.', href: '/acrylic-frames' },
              { title: 'Woven Cotton Canvas', desc: 'Rich, textured fine-art canvas stretched tightly over premium wooden bars.', href: '/canvas-frames' }
            ].map((item, idx) => (
              <li key={idx} className="border-b border-ink-charcoal/10 pb-6 group">
                <Link href={item.href} className="block">
                  <h4 className="font-label-caps text-xs font-bold tracking-widest uppercase text-brass-gold mb-3 transition-all group-hover:translate-x-2 flex items-center gap-2">
                    <span>{item.title}</span> <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </h4>
                  <p className="font-body-md text-sm md:text-base text-ink-charcoal/70 leading-relaxed">{item.desc}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 gap-4 min-h-[480px] max-h-[600px] w-full">
            <div className="flex flex-col gap-4 mt-12">
              <div className="w-full h-1/2 rounded-lg overflow-hidden shadow-lg">
                <img
                  alt="Close up of wood frame texture"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/frames.png'; }}
                  src="/images/frames.png"
                />
              </div>
              <div className="w-full h-1/2 rounded-lg overflow-hidden shadow-lg">
                <img
                  alt="Handcrafted assembly detail"
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/craft1.png'; }}
                  src="/images/craft1.png"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
                <img
                  alt="Premium paper texture detail"
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/craft2.png'; }}
                  src="/images/craft2.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 6. Inspiration Gallery Grid
function InspirationGrid() {
  const galleries = [
    { title: 'THE STACK', img: '/images/books.png', alt: 'Minimalist interior with photo book' },
    { title: 'INTERIORS', img: '/images/frames.png', alt: 'Photo frame detail' },
    { title: 'GALLERY', img: '/images/craft2.png', alt: 'Archival book spine' },
    { title: 'KEEPSAKES', img: '/images/keepsakes.png', alt: 'Corner art arrangement' }
  ];

  return (
    <section className="py-16 md:py-section-gap px-6 md:px-margin-desktop bg-transparent">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-label-caps text-xs text-brass-gold font-bold tracking-widest mb-4 block">STAY INSPIRED</span>
        <h2 className="font-headline-lg text-3xl md:text-4xl lg:text-[40px] leading-tight">Archives of the Modern Home.</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {galleries.map((item, idx) => (
          <div key={idx} className="aspect-[3/4] bg-surface-container relative group overflow-hidden rounded-lg">
            <img
              alt={item.alt}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = item.img; }}
              src={item.img}
            />
            <div className="absolute bottom-0 left-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-ink-charcoal/90 to-transparent w-full">
              <p className="font-label-caps text-xs tracking-widest text-white font-bold">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// 7. Footer
function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed ${email} to Archival Living Insights!`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-archival-cream/90 backdrop-blur-md border-t border-ink-charcoal/10 relative z-10" id="footer">
      <div className="flex flex-col items-center pt-16 md:pt-section-gap pb-gutter px-6 md:px-margin-desktop w-full max-w-7xl mx-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5">
            <h2 className="font-headline-md text-headline-md text-ink-charcoal mb-6">OFFLINE</h2>
            <p className="font-body-md text-sm md:text-base text-ink-charcoal/70 max-w-sm mb-8 leading-relaxed">
              Elevating your digital memories into tactile, museum-quality physical artifacts. Designed for the modern home, built for eternity.
            </p>
            <div className="flex gap-6">
              <a className="material-symbols-outlined text-ink-charcoal/50 hover:text-brass-gold transition-colors" href="#">public</a>
              <a className="material-symbols-outlined text-ink-charcoal/50 hover:text-brass-gold transition-colors" href="#">camera_alt</a>
              <a className="material-symbols-outlined text-ink-charcoal/50 hover:text-brass-gold transition-colors" href="mailto:support@offlineliving.com">mail</a>
            </div>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-label-caps text-xs font-bold tracking-widest uppercase text-ink-charcoal mb-6">Explore</h4>
            <ul className="space-y-4 font-body-md text-sm text-ink-charcoal/70">
              <li><Link className="nav-link" href="/templates">Photo Books</Link></li>
              <li><Link className="nav-link" href="/frame">Photo Frames</Link></li>
              <li><Link className="nav-link" href="/polaroid">Polaroids</Link></li>
              <li><Link className="nav-link" href="/acrylic-frames">Acrylic Frames</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-label-caps text-xs font-bold tracking-widest uppercase text-ink-charcoal mb-6">Company</h4>
            <ul className="space-y-4 font-body-md text-sm text-ink-charcoal/70">
              <li><Link className="nav-link" href="/about">About Us</Link></li>
              <li><Link className="nav-link" href="/contact">Contact Us</Link></li>
              <li><Link className="nav-link" href="/about-us">Philosophy</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-label-caps text-xs font-bold tracking-widest uppercase text-ink-charcoal mb-6">Stay Inspired</h4>
            <p className="font-body-md text-sm text-ink-charcoal/70 mb-6 leading-relaxed">Exclusive releases and editorial insights on analog living.</p>
            <form onSubmit={handleSubmit} className="relative group">
              <input
                className="w-full bg-transparent border-b border-ink-charcoal/20 py-3 font-body-md text-sm focus:outline-none focus:border-brass-gold transition-colors pr-16"
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 font-label-caps text-xs font-bold text-brass-gold tracking-widest uppercase hover:text-ink-charcoal transition-all" type="submit">Join</button>
            </form>
          </div>
        </div>
        
        <div className="w-full pt-10 border-t border-ink-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="font-label-caps text-xs text-ink-charcoal/50 font-medium">© 2026 OFFLINE LIVING. ARCHIVAL QUALITY GUARANTEED.</span>
          <div className="flex gap-8">
            <Link className="nav-link font-label-caps text-xs text-ink-charcoal/50 font-medium" href="/privacy">Privacy Policy</Link>
            <Link className="nav-link font-label-caps text-xs text-ink-charcoal/50 font-medium" href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export function LandingPage() {
  return (
    <div className="bg-archival-cream text-ink-charcoal font-body-md antialiased relative overflow-x-hidden min-h-screen">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      <Navbar />
      <main className="pt-24 relative" id="main-content">
        <Hero />
        <Marquee />
        <CuratedFormats />
        <StandardOfExcellence />
        <InspirationGrid />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
