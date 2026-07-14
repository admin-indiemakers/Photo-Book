'use client';

export const LandingHtml = () => (
  <>
    

  {/*  LOADER  */}
  <div className="loader" id="loader">
    <div className="loader__text">Offline Living</div>
    <div className="loader__bar"><div className="loader__fill" id="loaderFill"></div></div>
    <div className="loader__pct" id="loaderPct">0%</div>
  </div>

  {/*  CURSOR  */}
  <div className="cursor-dot" id="cursorDot"></div>
  <div className="cursor-ring" id="cursorRing"></div>

  {/*  ====== NAVIGATION ======  */}
  <nav className="nav" id="nav">
    <div className="container nav__inner">
      <a href="#" className="nav__logo" data-magnetic>
        {/*  Butterfly/heart icon  */}
        <svg className="nav__logo-icon" viewBox="0 0 40 40" fill="none">
          <path d="M20 4C16 4 12 8 10 12C8 16 8 20 10 24C12 28 16 30 18 32C19 33 19.5 34 20 36C20.5 34 21 33 22 32C24 30 28 28 30 24C32 20 32 16 30 12C28 8 24 4 20 4Z" fill="currentColor"/>
          <path d="M14 8C12 10 10 14 10 18C10 22 12 26 16 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35"/>
          <path d="M26 8C28 10 30 14 30 18C30 22 28 26 24 28" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35"/>
        </svg>
        <span className="nav__logo-text">Offline Living</span>
      </a>
      <div className="nav__links">
        <div className="nav__dropdown-group" style={{ position: 'relative', display: 'inline-block' }}>
          <a href="/editor" className="nav__link nav__link--dropdown" data-magnetic>Create</a>
          <div className="nav__dropdown-menu" style={{ 
            position: 'absolute', 
            top: '100%', 
            left: '0', 
            background: 'white', 
            border: '1px solid rgba(0,0,0,0.1)', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
            padding: '8px 0', 
            minWidth: '180px', 
            opacity: '0', 
            visibility: 'hidden', 
            transform: 'translateY(10px)', 
            transition: 'all 0.3s ease',
            zIndex: 1000
          }}>
            <a href="/photo-book" className="nav__dropdown-item" style={{ display: 'block', padding: '10px 20px', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.background = 'rgba(250,246,238,0.5)'}} onMouseOut={e => {e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'transparent'}}>Photo Book</a>
            <a href="/frame" className="nav__dropdown-item" style={{ display: 'block', padding: '10px 20px', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.background = 'rgba(250,246,238,0.5)'}} onMouseOut={e => {e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'transparent'}}>Photo Frame</a>
            <a href="/polaroid" className="nav__dropdown-item" style={{ display: 'block', padding: '10px 20px', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.background = 'rgba(250,246,238,0.5)'}} onMouseOut={e => {e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'transparent'}}>Polaroid</a>
            <a href="/fridge-magnet" className="nav__dropdown-item" style={{ display: 'block', padding: '10px 20px', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.background = 'rgba(250,246,238,0.5)'}} onMouseOut={e => {e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'transparent'}}>Fridge Magnet</a>
            <a href="/acrylic-frames" className="nav__dropdown-item" style={{ display: 'block', padding: '10px 20px', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.background = 'rgba(250,246,238,0.5)'}} onMouseOut={e => {e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'transparent'}}>Acrylic Frames</a>
            <a href="/canvas-frames" className="nav__dropdown-item" style={{ display: 'block', padding: '10px 20px', fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', transition: 'all 0.2s' }} onMouseOver={e => {e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.background = 'rgba(250,246,238,0.5)'}} onMouseOut={e => {e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'transparent'}}>Canvas Frames</a>
          </div>
        </div>
        <a href="#" className="nav__link" data-magnetic>Templates</a>
        <a href="#" className="nav__link" data-magnetic>Features</a>
        <a href="#" className="nav__link" data-magnetic>Pricing</a>
        <a href="#" className="nav__link" data-magnetic>Inspiration</a>
      </div>
      <div className="nav__right">
        <a href="#" className="nav__login" data-magnetic>Login</a>
        <button className="nav__burger" data-magnetic aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>

  {/*  ====== SECTION 01 — HERO ======  */}
  <section className="hero" id="hero">
    <div className="container">
      <div className="hero__grid">
        {/*  Left  */}
        <div className="hero__left">
          <div className="hero__vertical">Preserve your memories</div>
          <div className="section-num" data-reveal>01</div>

          <h1 className="hero__title">
            <span className="hero__title-line"><span>YOUR</span></span>
            <span className="hero__title-line"><span>STORY.</span></span>
            <span className="hero__title-line hero__title-line--bold"><span>BEAUTIFULLY TOLD.</span></span>
          </h1>

          <p className="hero__desc" data-reveal>
            Transform the digital camera roll into an archival-quality masterpiece. Beautifully bound photobooks designed to be felt, shared, and passed down.
          </p>

          <div className="hero__actions" data-reveal>
            <a href="/editor" className="btn-cta" data-magnetic>
              Start Creating <span className="arr">→</span>
            </a>
            <a href="#" className="btn-play" data-magnetic>
              <span className="btn-play__circle">
                <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="9,6 19,12 9,18"/></svg>
              </span>
              How It Works
            </a>
          </div>

          <div className="hero__proof" data-reveal>
            <div className="avatars">
              <div className="avatars__img"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face" alt="Creator" loading="eager" /></div>
              <div className="avatars__img"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Creator" loading="eager" /></div>
              <div className="avatars__img"><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face" alt="Creator" loading="eager" /></div>
            </div>
            <span className="hero__proof-text"><strong>2,500+</strong> happy creators</span>
          </div>
        </div>

        {/*  Right  */}
        <div className="hero__right">
          {/*  Badge  */}
          <div className="hero__badge" data-reveal>
            <div className="hero__badge-bg"></div>
            <svg className="hero__badge-svg" viewBox="0 0 105 105">
              <defs>
                <path id="cp" d="M52.5,52.5 m-36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"/>
              </defs>
              <text><textPath href="#cp" startOffset="0%">PRINTED WITH LOVE • MADE TO LAST •&nbsp;</textPath></text>
            </svg>
            <span className="hero__badge-heart">🧡</span>
          </div>

          {/*  Book  */}
          <div className="hero__book" data-reveal>
            <div className="hero__book-spread">
              <div className="hero__book-page hero__book-page--left">
                <img src="https://images.unsplash.com/photo-1587572236558-a3751c6d42c0?w=500&h=380&fit=crop" alt="Hands holding open photobook" loading="eager" />
              </div>
              <div className="hero__book-page">
                <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=380&fit=crop" alt="Happy couple outdoors" loading="eager" />
                <span className="hero__book-handwriting">Collect<br />beautiful<br />moments.</span>
              </div>
            </div>
          </div>

          {/*  Small Photo  */}
          <div className="hero__small-photo" data-reveal>
            <img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=300&h=200&fit=crop" alt="Beach vacation" loading="lazy" />
            <span className="hero__sticker">OUR HAPPY PLACE</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  ====== SECTION 02 — EDITOR ======  */}
  <section className="editor" id="editor">
    <div className="container">
      <div className="section-num">02</div>
      <div className="editor__grid">
        {/*  Left  */}
        <div className="editor__left" data-reveal>
          <h2 className="editor__title">Design freely.<br />Create easily.</h2>
          <p className="editor__desc">Powerful tools. Simple to use.<br />Your book, your way.</p>
          <a href="/editor" className="link-arrow editor__link" data-magnetic>Explore Editor <span>→</span></a>
        </div>

        {/*  Center Card  */}
        <div className="editor__card" data-reveal>
          <div className="editor__spread">
            <div className="editor__page">
              <img src="https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=420&h=280&fit=crop" alt="Flat lay of custom photobook and polaroids" loading="lazy" />
            </div>
            <div className="editor__page">
              <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=420&h=280&fit=crop" alt="Mountain lake" loading="lazy" />
              <div className="editor__page-text">
                <p>Travel together.<br />Memories forever.</p>
              </div>
            </div>
            <div className="editor__add">
              <span className="editor__add-btn">+</span>
              <span className="editor__add-text">Add Page</span>
            </div>
          </div>
          <div className="editor__thumbs">
            <div className="editor__thumb editor__thumb--active">
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&h=70&fit=crop" alt="Thumb" loading="lazy" />
            </div>
            <div className="editor__thumb">
              <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=100&h=70&fit=crop" alt="Thumb" loading="lazy" />
            </div>
            <div className="editor__thumb">
              <img src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=100&h=70&fit=crop" alt="Thumb" loading="lazy" />
            </div>
            <div className="editor__thumb">
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=100&h=70&fit=crop" alt="Thumb" loading="lazy" />
            </div>
            <div className="editor__thumb">
              <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=100&h=70&fit=crop" alt="Thumb" loading="lazy" />
            </div>
            <span className="editor__pgcount">12 / 24</span>
          </div>
        </div>

        {/*  Right Features  */}
        <div className="editor__features">
          <div className="editor__feat" data-reveal>
            <div className="editor__feat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>
            </div>
            <div>
              <div className="editor__feat-title">Easy to Use</div>
              <div className="editor__feat-desc">Simple tools for everyone</div>
            </div>
          </div>
          <div className="editor__feat" data-reveal>
            <div className="editor__feat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>
            </div>
            <div>
              <div className="editor__feat-title">Fully Customizable</div>
              <div className="editor__feat-desc">Your book, your style</div>
            </div>
          </div>
          <div className="editor__feat" data-reveal>
            <div className="editor__feat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
            </div>
            <div>
              <div className="editor__feat-title">Premium Quality</div>
              <div className="editor__feat-desc">Museum-grade printing</div>
            </div>
          </div>
          <div className="editor__feat" data-reveal>
            <div className="editor__feat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            </div>
            <div>
              <div className="editor__feat-title">Safe & Secure</div>
              <div className="editor__feat-desc">Your memories are safe</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  ====== SECTION 03 — TEMPLATES ======  */}
  <section className="templates" id="templates">
    <div className="container">
      <div className="section-num">03</div>
      <div className="templates__header">
        <span className="section-label">Handpicked Templates</span>
        <a href="#" className="link-arrow templates__viewall" data-magnetic>View All Templates <span>→</span></a>
      </div>

      <h2 className="templates__title" data-reveal>For every story.<br />For every you.</h2>

      <div className="templates__grid">
        {/*  1 - Wanderlust  */}
        <div className="tpl-card" data-reveal>
          <div className="tpl-card__img-wrap">
            <img className="tpl-card__img" src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=340&h=450&fit=crop" alt="Mountain landscape at sunset" loading="lazy" />
          </div>
          <div className="tpl-card__name">Wanderlust</div>
          <div className="tpl-card__pages">12 Pages</div>
        </div>

        {/*  2 - Wedding Bliss  */}
        <div className="tpl-card" data-reveal>
          <div className="tpl-card__img-wrap">
            <img className="tpl-card__img" src="https://images.unsplash.com/photo-1519741497674-611481863552?w=340&h=450&fit=crop" alt="Beautiful wedding ceremony" loading="lazy" />
          </div>
          <div className="tpl-card__name">Wedding Bliss</div>
          <div className="tpl-card__pages">40 Pages</div>
        </div>

        {/*  3 - Little One  */}
        <div className="tpl-card" data-reveal>
          <div className="tpl-card__img-wrap">
            <img className="tpl-card__img" src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=340&h=450&fit=crop" alt="Happy child playing" loading="lazy" />
          </div>
          <div className="tpl-card__name">Little One</div>
          <div className="tpl-card__pages">24 Pages</div>
        </div>

        {/*  4 - Family Time  */}
        <div className="tpl-card" data-reveal>
          <div className="tpl-card__img-wrap">
            <img className="tpl-card__img" src="https://images.unsplash.com/photo-1596389523108-78b9a10fdbe6?w=340&h=450&fit=crop" alt="Family together at golden hour" loading="lazy" />
          </div>
          <div className="tpl-card__name">Family Time</div>
          <div className="tpl-card__pages">36 Pages</div>
        </div>

        {/*  5 - Milestones  */}
        <div className="tpl-card" data-reveal>
          <div className="tpl-card__img-wrap">
            <img className="tpl-card__img" src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=340&h=450&fit=crop" alt="Milestones celebration" loading="lazy" />
          </div>
          <div className="tpl-card__name">Milestones</div>
          <div className="tpl-card__pages">28 Pages</div>
        </div>
      </div>
    </div>
  </section>

  {/*  ====== SECTION 04 — QUALITY ======  */}
  <section className="quality" id="quality">
    <div className="quality__grid">
      <div className="quality__left">
        <div className="section-num section-num--light">04</div>
        <h2 className="quality__title" data-reveal>Printed to perfection.<br /><em>Made to last.</em></h2>
        <ul className="quality__list">
          <li className="quality__item" data-reveal>
            <span className="quality__check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg></span>
            Vibrant colors that never fade
          </li>
          <li className="quality__item" data-reveal>
            <span className="quality__check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg></span>
            Thick layflat pages
          </li>
          <li className="quality__item" data-reveal>
            <span className="quality__check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg></span>
            Luxurious matte finish
          </li>
          <li className="quality__item" data-reveal>
            <span className="quality__check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg></span>
            Thoughtful packaging
          </li>
        </ul>
        <a href="#" className="link-arrow quality__link" data-magnetic data-reveal>See Quality <span>→</span></a>
      </div>
      <div className="quality__right">
        <img src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=800&h=700&fit=crop" alt="Macro shot of premium thick layflat pages" loading="lazy" />
      </div>
    </div>
  </section>

  {/*  ====== SECTION 05 — COMMUNITY ======  */}
  <section className="community" id="community">
    <div className="container">
      <div className="section-num">05</div>
      <div className="section-label">Real Stories. Real People.</div>

      <div className="community__top">
        <div>
          <h2 className="community__title" data-reveal>Stories from<br />our community.</h2>
          <p className="community__desc" data-reveal>Every book has a story.<br />Here are ones we love.</p>
          <a href="#" className="link-arrow community__link" data-magnetic data-reveal>View All Stories <span>→</span></a>
        </div>

        <div className="community__photos">
          <div className="community__photo" data-reveal><img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=260&h=200&fit=crop" alt="Family together" loading="lazy" /></div>
          <div className="community__photo" data-reveal><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=260&h=200&fit=crop" alt="Portrait" loading="lazy" /></div>
          <div className="community__photo" data-reveal><img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=260&h=200&fit=crop" alt="Photographer" loading="lazy" /></div>
          <div className="community__photo" data-reveal><img src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=260&h=200&fit=crop" alt="Nature" loading="lazy" /></div>
          <div className="community__photo" data-reveal><img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=260&h=200&fit=crop" alt="Friends gathering" loading="lazy" /></div>
          <div className="community__photo" data-reveal><img src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?w=260&h=200&fit=crop" alt="Sunset couple" loading="lazy" /></div>
          <div className="community__photo" data-reveal><img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=260&h=200&fit=crop" alt="Portrait outdoors" loading="lazy" /></div>
          <div className="community__photo" data-reveal><img src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=260&h=200&fit=crop" alt="Golden hour" loading="lazy" /></div>
        </div>
      </div>

      <div className="community__quotes">
        <div className="quote-card" data-reveal>
          <div className="quote__stars">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </div>
          <p className="quote__text">The best way to keep memories alive.</p>
          <div className="quote__meta">
            <p className="quote__author">Sarah T.</p>
            <span className="quote__verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg> Verified Buyer</span>
          </div>
        </div>
        <div className="quote-card" data-reveal>
          <div className="quote__stars">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </div>
          <p className="quote__text">Beautiful quality and so easy to create.</p>
          <div className="quote__meta">
            <p className="quote__author">James L.</p>
            <span className="quote__verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg> Verified Buyer</span>
          </div>
        </div>
        <div className="quote-card" data-reveal>
          <div className="quote__stars">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </div>
          <p className="quote__text">A gift that means everything.</p>
          <div className="quote__meta">
            <p className="quote__author">Priya K.</p>
            <span className="quote__verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg> Verified Buyer</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/*  ====== FOOTER ======  */}
  <footer className="footer" id="footer">
    <div className="container">
      <div className="footer__grid">
        {/*  Brand  */}
        <div>
          <a href="#" className="footer__logo">
            <svg className="footer__logo-icon" viewBox="0 0 40 40" fill="none">
              <path d="M20 4C16 4 12 8 10 12C8 16 8 20 10 24C12 28 16 30 18 32C19 33 19.5 34 20 36C20.5 34 21 33 22 32C24 30 28 28 30 24C32 20 32 16 30 12C28 8 24 4 20 4Z" fill="currentColor"/>
            </svg>
            <span className="footer__logo-text">Offline Living</span>
          </a>
          <p className="footer__tagline">We help you turn your memories into beautiful photobooks you'll treasure forever.</p>
          <div className="footer__socials">
            <a href="#" className="footer__social" data-magnetic aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="#" className="footer__social" data-magnetic aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" className="footer__social" data-magnetic aria-label="Pinterest">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12c0 5.1 3.2 9.4 7.6 11.2-.1-.9-.2-2.4 0-3.4.2-.9 1.4-6 1.4-6s-.4-.7-.4-1.8c0-1.7 1-2.9 2.2-2.9 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.2 1.8 2.2 2.1 0 3.8-2.2 3.8-5.5 0-2.9-2.1-4.9-5-4.9-3.4 0-5.4 2.6-5.4 5.2 0 1 .4 2.1.9 2.7.1.1.1.2.1.3l-.3 1.4c-.1.2-.2.3-.4.2C7.3 17.4 6.3 15.2 6.3 13c0-3.8 2.8-7.3 7.9-7.3 4.2 0 7.4 3 7.4 6.9 0 4.1-2.6 7.5-6.2 7.5-1.2 0-2.4-.6-2.8-1.4l-.7 2.9c-.3 1-1 2.3-1.5 3.1 1.1.4 2.3.6 3.6.6 6.6 0 12-5.4 12-12S18.6 0 12 0z"/></svg>
            </a>
            <a href="#" className="footer__social" data-magnetic aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4L15.8 12l-6.3 3.6z"/></svg>
            </a>
          </div>
        </div>

        {/*  Product  */}
        <div>
          <h4 className="footer__col-title">Product</h4>
          <div className="footer__links">
            <a href="#" className="footer__link">Create Book</a>
            <a href="#" className="footer__link">Templates</a>
            <a href="#" className="footer__link">Features</a>
            <a href="#" className="footer__link">Pricing</a>
          </div>
        </div>

        {/*  Company  */}
        <div>
          <h4 className="footer__col-title">Company</h4>
          <div className="footer__links">
            <a href="#" className="footer__link">About Us</a>
            <a href="#" className="footer__link">Blog</a>
            <a href="#" className="footer__link">Careers</a>
            <a href="#" className="footer__link">Contact</a>
          </div>
        </div>

        {/*  Support  */}
        <div>
          <h4 className="footer__col-title">Support</h4>
          <div className="footer__links">
            <a href="#" className="footer__link">Help Center</a>
            <a href="#" className="footer__link">Shipping</a>
            <a href="#" className="footer__link">Returns</a>
            <a href="#" className="footer__link">FAQs</a>
          </div>
        </div>

        {/*  Newsletter  */}
        <div>
          <h4 className="footer__col-title">Stay In The Loop</h4>
          <p className="footer__nl-text">Get inspiration & exclusive offers.</p>
          <form className="footer__nl-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" className="footer__nl-input" placeholder="Enter your email" aria-label="Email address" />
            <button className="footer__nl-btn" data-magnetic aria-label="Subscribe">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer__giant-text">
        OFFLINE LIVING
      </div>

      <div className="footer__bottom">
        <span>&copy; 2026 Offline Living. All rights reserved.</span>
        <span>Crafted with 🧡</span>
      </div>
    </div>
  </footer>

  {/*  SCRIPTS  */}
  
  
  
  

  </>
);