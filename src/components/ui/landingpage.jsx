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
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const unreadCount = notifications.filter(n => !n.is_read).length;

  useEffect(() => {
    const fetchUserNotifications = async (u) => {
      try {
        const { getUserNotifications } = await import('@/app/actions/orders');
        const res = await getUserNotifications(u.id, u.email);
        if (res.success && res.notifications) {
          setNotifications(res.notifications);
        }
      } catch (e) {
        console.error(e);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user || null;
      setUser(u);
      if (u) fetchUserNotifications(u);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user || null;
      setUser(u);
      if (u) fetchUserNotifications(u);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNotificationsClick = async () => {
    setNotificationsOpen(!notificationsOpen);
    setProfileOpen(false); // Close profile if open
    if (!notificationsOpen && unreadCount > 0 && user) {
      try {
        const { markNotificationsRead } = await import('@/app/actions/orders');
        await markNotificationsRead(user.id, user.email);
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
    setNotificationsOpen(false); // Close notifications if open
  };

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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setProfileOpen(false);
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-ink-charcoal/10 bg-archival-cream/90 backdrop-blur-md transition-all duration-300">
      <div className="flex justify-between items-center px-4 md:px-8 lg:px-margin-desktop py-4 w-full max-w-full mx-auto">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <Link className="flex items-center gap-1 md:gap-2 group text-ink-charcoal" href="/">
            <span className="font-headline-md italic text-lg md:text-2xl font-normal tracking-tight hover:text-brass-gold transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
              Offline <span className="text-[10px] md:text-xs non-italic font-sans uppercase tracking-widest text-brass-gold align-top relative -top-1">Living ®</span>
            </span>
          </Link>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-10 shrink-0">
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
        <div className="flex items-center gap-4 md:gap-6 relative shrink-0">
          {user ? (
            <div className="relative">
              <button
                onClick={handleProfileClick}
                className="nav-link font-label-caps text-[10px] md:text-xs tracking-[0.14em] uppercase font-bold text-brass-gold hover:text-ink-charcoal transition-colors flex items-center gap-1"
              >
                <span className="hidden sm:inline">Hi, {user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'Account'}</span>
                <span className="sm:hidden material-symbols-outlined text-[20px]">person</span>
              </button>

              {/* Profile Dropdown */}
              <div className={`absolute top-full right-0 mt-4 w-56 bg-archival-cream/98 backdrop-blur-xl border border-ink-charcoal/10 shadow-2xl rounded-xl p-5 transition-all duration-300 transform z-50 ${profileOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <div className="pb-4 mb-4 border-b border-ink-charcoal/10">
                  <p className="font-label-caps text-[10px] tracking-widest uppercase text-ink-charcoal/50 mb-1">Signed in as</p>
                  <p className="font-headline-md text-sm font-medium truncate">{user.user_metadata?.full_name || user.email}</p>
                </div>
                <ul className="space-y-3 font-label-caps text-xs tracking-widest uppercase font-semibold">
                  <li><Link href="/orders" className="block text-ink-charcoal hover:text-brass-gold transition-colors">My Orders</Link></li>
                  <li><button onClick={handleSignOut} className="block text-red-600 hover:text-red-700 transition-colors uppercase w-full text-left">Sign Out</button></li>
                </ul>
              </div>
            </div>
          ) : (
            <button onClick={handleGoogleLogin} className="hidden sm:block nav-link font-label-caps text-xs tracking-[0.14em] uppercase font-bold text-ink-charcoal/80 hover:text-brass-gold transition-colors">
              Sign In
            </button>
          )}

          {user && (
            <div className="relative">
              <button
                onClick={handleNotificationsClick}
                className="material-symbols-outlined text-[20px] md:text-[24px] text-ink-charcoal hover:text-brass-gold transition-colors flex items-center relative"
                title="Notifications"
              >
                notifications
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-archival-cream"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <div className={`absolute top-full right-0 mt-4 w-72 bg-archival-cream/98 backdrop-blur-xl border border-ink-charcoal/10 shadow-2xl rounded-xl p-0 transition-all duration-300 transform z-50 overflow-hidden ${notificationsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <div className="p-4 border-b border-ink-charcoal/10 bg-ink-charcoal/5">
                  <h4 className="font-label-caps text-[10px] font-bold tracking-widest uppercase text-ink-charcoal">Notifications</h4>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center font-body-md text-xs text-ink-charcoal/60">
                      You're all caught up.
                    </div>
                  ) : (
                    notifications.map((n, i) => (
                      <div key={n.id || i} className={`p-4 border-b border-ink-charcoal/5 last:border-b-0 hover:bg-white/50 transition-colors ${!n.is_read ? 'bg-white' : ''}`}>
                        <div className="font-headline-md text-sm font-medium mb-1">{n.title}</div>
                        <div className="font-body-md text-xs text-ink-charcoal/70 leading-relaxed mb-2">{n.message}</div>
                        <div className="font-label-caps text-[9px] uppercase tracking-widest text-ink-charcoal/40">{new Date(n.created_at).toLocaleDateString()}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {!user && (
            <button onClick={handleGoogleLogin} className="sm:hidden material-symbols-outlined text-[20px] text-ink-charcoal hover:text-brass-gold transition-colors flex items-center" title="Sign In">person</button>
          )}

          <Link href="/cart" className="material-symbols-outlined text-[20px] md:text-[24px] text-ink-charcoal hover:text-brass-gold transition-colors flex items-center" title="Cart">shopping_bag</Link>
          
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden material-symbols-outlined text-[20px] text-ink-charcoal hover:text-brass-gold ml-2 flex items-center">
            {mobileMenuOpen ? 'close' : 'menu'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-archival-cream/95 backdrop-blur-xl ${mobileMenuOpen ? 'max-h-64 border-b border-ink-charcoal/10' : 'max-h-0'}`}>
        <div className="flex flex-col px-6 py-4 gap-4">
          <Link href="/products" className="font-label-caps text-xs tracking-[0.14em] uppercase font-bold text-ink-charcoal hover:text-brass-gold">Collections</Link>
          <Link href="/about" className="font-label-caps text-xs tracking-[0.14em] uppercase font-bold text-ink-charcoal hover:text-brass-gold">About</Link>
          <Link href="/contact" className="font-label-caps text-xs tracking-[0.14em] uppercase font-bold text-ink-charcoal hover:text-brass-gold">Contact</Link>
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
          <span className="font-label-caps text-[10px] md:text-xs text-brass-gold font-bold mb-3 md:mb-4 block tracking-widest">
            ✦ ARCHIVAL QUALITY GUARANTEED
          </span>
          <h1 className="font-display-hero text-3xl sm:text-5xl lg:text-[60px] xl:text-[68px] mb-4 md:mb-6 leading-[1.08]">
            Your memories, archived in physical form.
          </h1>
          <p className="font-body-lg text-sm md:text-lg text-ink-charcoal/75 mb-6 md:mb-8 max-w-md">
            Elevating your digital memories into tactile, museum-quality physical artifacts. Designed for the modern home, built for eternity.
          </p>
          <div className="flex flex-row gap-2 sm:gap-4 items-center w-full justify-start mt-2">
            <Link href="/templates" className="btn-premium inline-block bg-ink-charcoal text-archival-cream px-2 py-3 md:px-8 md:py-4 font-label-caps text-[8px] sm:text-[10px] md:text-xs tracking-widest uppercase rounded text-center flex-1 sm:flex-none whitespace-nowrap">
              Start Studio Customizer
            </Link>
            <Link href="/products" className="inline-block border border-ink-charcoal/30 text-ink-charcoal hover:bg-ink-charcoal hover:text-archival-cream px-2 py-3 md:px-8 md:py-4 font-label-caps text-[8px] sm:text-[10px] md:text-xs tracking-widest uppercase rounded transition-colors text-center flex-1 sm:flex-none whitespace-nowrap">
              Explore Archive
            </Link>
          </div>
        </div>

        {/* Hero Card */}
        <div className="md:col-span-7 relative h-[50vh] md:h-[calc(82vh-96px)] min-h-[320px] md:min-h-[480px] max-h-[400px] md:max-h-[600px] mt-8 md:mt-0 w-full">
          <div className="card-minimal w-full h-full rounded-lg overflow-hidden shadow-xl" id="hero-card">
            <div className="absolute inset-0 bg-ink-charcoal/5 -rotate-2 scale-95 translate-y-4"></div>
            <div className="w-full h-full relative overflow-hidden">
              <img
                alt="Signature Photo Book detail"
                className="w-full h-full object-cover grayscale-[15%] brightness-[98%] transition-transform duration-700 hover:scale-105"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/hero_premium.png'; }}
                src="/images/hero_premium.png"
              />
              <div className="absolute bottom-8 left-8 bg-archival-cream/95 backdrop-blur-md p-6 border border-brass-gold/40 max-w-xs rounded-lg shadow-lg">
                <span className="font-label-caps text-[10px] text-brass-gold font-bold tracking-widest block mb-1">FEATURED ARCHIVE</span>
                <h4 className="font-headline-md text-xl font-medium mb-1">The Timeless Memory Book</h4>
                <p className="text-xs text-ink-charcoal/60">Seamless Layflat Binding • Heirloom Quality Materials</p>
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
    <div className="bg-ink-charcoal py-6 overflow-hidden border-y border-ink-charcoal/10">
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
          const featuredData = data.filter(item => item.attributes?.is_featured);
          const mapped = featuredData.map((item) => {
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
                
            let imageUrl = item.images?.[0] || fallbackImg;
            if (item.name === 'Custom Polaroids' || (imageUrl && imageUrl.includes('Polariod 3'))) {
              imageUrl = '/images/polaroid8.jpg';
            }

            return {
              id: item.id || item.name,
              category: cat,
              badge: item.attributes?.featured_badge || 'FEATURED',
              badgeColor: 'text-brass-gold',
              price: item.price ? `FROM $${item.price}` : (item.attributes?.price_text || 'CUSTOM'),
              title: item.name,
              description: item.description || 'Custom archival-quality memory keepsake.',
              image: imageUrl,
              feature: item.attributes?.feature || 'Archival Edition',
              icon: item.category === 'photo_book' ? 'menu_book' : item.category === 'photo_frame' ? 'aspect_ratio' : 'photo_library',
              cta: 'Customize Now',
              href: route
            };
          });
          setProducts(mapped.slice(0, 6));
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
    <section className="pt-16 pb-8 md:pt-24 md:pb-12 px-6 md:px-margin-desktop bg-white/40 backdrop-blur-sm" id="collections">
      <div className="flex flex-row justify-between items-center mb-6 md:mb-12">
        <div>
          <span className="font-label-caps text-[10px] md:text-xs text-brass-gold font-bold tracking-widest m-0 block">COLLECTIONS</span>
        </div>

        {/* Link to All Collections */}
        <div>
          <Link
            href="/products"
            className="group flex items-center gap-1 md:gap-2 font-label-caps text-[10px] md:text-xs font-bold tracking-widest uppercase text-ink-charcoal hover:text-brass-gold transition-colors"
          >
            All Collections
            <span className="material-symbols-outlined text-[14px] md:text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 md:gap-10" id="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card group flex flex-col h-full">
            <div className="card-minimal bg-archival-cream p-2 md:p-5 mb-2 md:mb-6 rounded-lg border border-ink-charcoal/10 shadow-md overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden bg-surface-container relative rounded-md">
                <img
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = product.image; }}
                  src={product.image}
                />
                <div className="absolute top-1 left-1 md:top-3 md:left-3 bg-white/90 backdrop-blur-sm px-1.5 md:px-3 py-0.5 md:py-1 rounded-full shadow-sm z-10">
                  <span className={`font-label-caps text-[6px] md:text-[10px] font-bold tracking-widest ${product.badgeColor || 'text-brass-gold'}`}>{product.badge}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-1 md:mb-2">
              <span className="font-label-caps text-[8px] md:text-xs font-bold text-ink-charcoal/70 tracking-wider">{product.price}</span>
            </div>
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-y-2 gap-x-4 mb-2 mt-auto">
              <h3 className="font-headline-md text-[10px] sm:text-xs md:text-xl lg:text-2xl font-medium leading-tight">{product.title}</h3>
              <Link href={product.href || '/templates'} className="inline-block bg-ink-charcoal text-archival-cream hover:bg-brass-gold hover:text-ink-charcoal px-2 py-1 md:px-4 md:py-2 rounded-sm font-label-caps text-[6px] md:text-[10px] font-bold tracking-widest uppercase transition-colors whitespace-nowrap shadow-sm self-start xl:self-auto">
                {product.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// 5. Standard of Excellence Section
function StandardOfExcellence() {
  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-24 px-6 md:px-margin-desktop bg-archival-cream/50 overflow-hidden" id="studio">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        <div className="lg:col-span-4 pr-0 lg:pr-12">
          <h2 className="font-headline-lg text-2xl md:text-4xl lg:text-[40px] leading-tight mb-4 md:mb-8">Standard of Excellence.</h2>
          <p className="font-body-lg text-sm md:text-lg text-ink-charcoal/75 mb-8 md:mb-12">
            Elevate your space with our premium wall art collection. From solid wood frames to museum-grade acrylics, we craft pieces that demand attention.
          </p>
          <ul className="space-y-6 md:space-y-10">
            {[
              { title: 'Solid Wood Frames', desc: 'Handcrafted from sustainably sourced timber, providing a timeless border for your memories.', href: '/frame' },
              { title: 'Optic Clear Acrylic', desc: 'Anti-reflective museum glass offering vivid contrast, pure clarity, and UV protection.', href: '/acrylic-frames' },
              { title: 'Woven Cotton Canvas', desc: 'Rich, textured fine-art canvas stretched tightly over premium wooden bars.', href: '/canvas-frames' }
            ].map((item, idx) => (
              <li key={idx} className="border-b border-ink-charcoal/10 pb-4 md:pb-6 group">
                <div className="block">
                  <h4 className="font-label-caps text-[10px] md:text-xs font-bold tracking-widest uppercase text-brass-gold mb-2 md:mb-3 transition-all group-hover:translate-x-2 flex items-center gap-2">
                    <span>{item.title}</span>
                  </h4>
                  <p className="font-body-md text-xs md:text-base text-ink-charcoal/70 leading-relaxed">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-4 md:pt-12">
              <div className="w-full aspect-square rounded-lg overflow-hidden shadow-lg relative">
                <img
                  alt="Premium Photo Frame"
                  className="w-full h-full absolute inset-0 object-cover transition-all duration-700 hover:scale-105"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/wide_photo_frame.png'; }}
                  src="/images/wide_photo_frame.png"
                />
              </div>
              <div className="w-full aspect-square rounded-lg overflow-hidden shadow-lg relative">
                <img
                  alt="Premium Photo Book"
                  className="w-full h-full absolute inset-0 object-cover transition-all duration-700 hover:scale-105"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/wide_photo_book.png'; }}
                  src="/images/wide_photo_book.png"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
                <img
                  alt="Premium Canvas Art"
                  className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/premium_canvas_art.png'; }}
                  src="/images/premium_canvas_art.png"
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
    { title: 'PHOTO BOOK', img: '/images/photobook11.jpg', alt: 'Minimalist interior with photo book' },
    { title: 'PHOTO FRAME', img: '/images/premium_color_frame.png', alt: 'Colorful photo frame detail' },
    { title: 'POLAROID', img: '/images/polaroid2.jpg', alt: 'Archival book spine' },
    { title: 'POLAROID FRIDGE MAGNET', img: '/images/polariod fridge magnet 4.jpg', alt: 'Corner art arrangement' }
  ];

  return (
    <section className="pb-16 md:pb-24 pt-4 md:pt-8 px-6 md:px-margin-desktop bg-transparent">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-label-caps text-xs text-brass-gold font-bold tracking-widest mb-4 block">CURATED MOMENTS</span>
        <h2 className="font-headline-lg text-3xl md:text-4xl lg:text-[40px] leading-tight">A Vibrant Legacy in Print.</h2>
      </div>
      <div className="grid grid-cols-4 gap-2 md:gap-6">
        {galleries.map((item, idx) => (
          <div key={idx} className="aspect-[3/4] bg-surface-container relative group overflow-hidden rounded-lg">
            <img
              alt={item.alt}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = item.img; }}
              src={item.img}
            />
            <div className="absolute bottom-0 left-0 p-2 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-ink-charcoal/90 to-transparent w-full">
              <p className="font-label-caps text-[6px] md:text-xs tracking-widest text-white font-bold">{item.title}</p>
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
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-10 md:mb-20">
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-4 md:mb-6 group text-ink-charcoal">
              <span className="font-headline-md italic text-3xl font-normal tracking-tight group-hover:text-brass-gold transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                Offline <span className="text-sm non-italic font-sans uppercase tracking-widest text-brass-gold align-top relative -top-1.5">Living ®</span>
              </span>
            </Link>
            <p className="font-body-md text-sm md:text-base text-ink-charcoal/70 max-w-sm mb-6 md:mb-8 leading-relaxed">
              Elevating your digital memories into tactile, museum-quality physical artifacts. Designed for the modern home, built for eternity.
            </p>
            <div className="flex gap-6">
              <a href="https://instagram.com" className="text-ink-charcoal/50 hover:text-brass-gold transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-label-caps text-xs font-bold tracking-widest uppercase text-ink-charcoal mb-3 md:mb-6">Explore</h4>
            <ul className="space-y-2 md:space-y-4 font-body-md text-sm text-ink-charcoal/70">
              <li><Link className="nav-link" href="/templates">Photo Books</Link></li>
              <li><Link className="nav-link" href="/frame">Photo Frames</Link></li>
              <li><Link className="nav-link" href="/polaroid">Polaroids</Link></li>
              <li><Link className="nav-link" href="/acrylic-frames">Acrylic Frames</Link></li>
              <li><Link className="nav-link" href="/fridge-magnet">Polaroid Fridge Magnet</Link></li>
              <li><Link className="nav-link" href="/canvas-frames">Canvas Frames</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-label-caps text-xs font-bold tracking-widest uppercase text-ink-charcoal mb-3 md:mb-6">Company</h4>
            <ul className="space-y-2 md:space-y-4 font-body-md text-sm text-ink-charcoal/70">
              <li><Link className="nav-link" href="/about">About Us</Link></li>
              <li><Link className="nav-link" href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-label-caps text-xs font-bold tracking-widest uppercase text-ink-charcoal mb-3 md:mb-6">Stay Inspired</h4>
            <p className="font-body-md text-sm text-ink-charcoal/70 mb-4 md:mb-6 leading-relaxed">Exclusive releases and editorial insights on analog living.</p>
            <form onSubmit={handleSubmit} className="relative group">
              <input
                className="w-full bg-transparent border-b border-ink-charcoal/20 py-2 md:py-3 font-body-md text-sm focus:outline-none focus:border-brass-gold transition-colors pr-16"
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

        <div className="w-full pt-8 md:pt-10 border-t border-ink-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left">
          <span className="font-label-caps text-[10px] md:text-xs text-ink-charcoal/50 font-medium">© 2026 OFFLINE LIVING. ARCHIVAL QUALITY GUARANTEED.</span>
          <div className="flex gap-6 md:gap-8 justify-center">
            <Link className="nav-link font-label-caps text-[10px] md:text-xs text-ink-charcoal/50 font-medium" href="/privacy">Privacy Policy</Link>
            <Link className="nav-link font-label-caps text-[10px] md:text-xs text-ink-charcoal/50 font-medium" href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export function LandingPage() {
  return (
    <div className="bg-archival-cream text-ink-charcoal font-body-md antialiased relative overflow-x-clip min-h-screen">
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
