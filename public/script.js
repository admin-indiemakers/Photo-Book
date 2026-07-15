/* ============================================================
   Offline Living — Photo Book Website
   JavaScript — GSAP + Lenis + Cursor + Animations
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

// Global variables
let lenis;

// ============ PAGE LOADER ============
(function () {
  const loader = document.getElementById('loader');
  const fill = document.getElementById('loaderFill');
  const pct = document.getElementById('loaderPct');
  const txt = document.querySelector('.loader__text');

  if (!loader || !fill || !pct || !txt) {
    initAll();
    return;
  }

  let progress = 0;
  const start = Date.now();
  const dur = 1800;

  gsap.to(txt, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.1 });

  (function tick() {
    progress = Math.min(((Date.now() - start) / dur) * 100, 100);
    fill.style.width = progress + '%';
    pct.textContent = Math.round(progress) + '%';

    if (progress < 100) {
      requestAnimationFrame(tick);
    } else {
      gsap.to(loader, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        delay: 0.25,
        onComplete: () => {
          loader.style.display = 'none';
          document.body.style.overflow = '';
          initAll();
        }
      });
    }
  })();
})();

// ============ INIT ============
function initAll() {
  initLenis();
  initCursor();
  initNavScroll();
  initHero();
  initReveals();
  initMagnetic();
}

// ============ LENIS ============
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

// ============ CUSTOM CURSOR ============
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  // Skip on touch
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mx = -100, my = -100;
  let dx = -100, dy = -100;
  let rx = -100, ry = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  (function loop() {
    dx += (mx - dx) * 0.22;
    dy += (my - dy) * 0.22;
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    dot.style.left = dx + 'px';
    dot.style.top = dy + 'px';
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();

  // Use event delegation for hover states so it works across Next.js route changes
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, [data-magnetic], input, .tpl-card, .community__photo');
    if (target) {
      dot.classList.add('hover');
      ring.classList.add('hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, [data-magnetic], input, .tpl-card, .community__photo');
    if (target) {
      dot.classList.remove('hover');
      ring.classList.remove('hover');
    }
  });

  document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; ring.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; ring.style.opacity = '1'; });
}

// ============ NAV SCROLL ============
function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  
  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    onUpdate: self => {
      nav.classList.toggle('nav--scrolled', self.progress > 0);
    }
  });
}

// ============ HERO ANIMATIONS ============
function initHero() {
  if (!document.querySelector('.hero')) return;

  const tl = gsap.timeline({ delay: 0.15 });

  // Headline words
  tl.fromTo('.hero__title-line span',
    { y: 120, opacity: 0, rotationX: -25 },
    { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: 'power3.out', stagger: 0.13 }
  );

  // Description
  tl.fromTo('.hero__desc',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
    '-=0.5'
  );

  // Actions
  tl.fromTo('.hero__actions',
    { y: 25, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
    '-=0.45'
  );

  // Social proof
  tl.fromTo('.hero__proof',
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
    '-=0.35'
  );

  // Book
  tl.fromTo('.hero__book',
    { scale: 0.88, opacity: 0, y: 35 },
    { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
    '-=0.8'
  );

  // Badge
  tl.fromTo('.hero__badge',
    { scale: 0, opacity: 0, rotation: -180 },
    { scale: 1, opacity: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.8)' },
    '-=0.5'
  );

  // Small photo
  tl.fromTo('.hero__small-photo',
    { y: 35, opacity: 0, rotation: -6 },
    { y: 0, opacity: 1, rotation: -3, duration: 0.7, ease: 'power2.out' },
    '-=0.4'
  );

  // Section number + vertical text
  tl.fromTo('.hero .section-num',
    { y: 10, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
    '-=0.5'
  );
  tl.fromTo('.hero__vertical',
    { opacity: 0 },
    { opacity: 0.45, duration: 0.5, ease: 'power2.out' },
    '-=0.3'
  );

  // Parallax on book
  gsap.to('.hero__book', {
    y: -25,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });
  gsap.to('.hero__small-photo', {
    y: -40, rotation: 1,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });
}

// ============ SCROLL REVEALS ============
function initReveals() {
  // Generic data-reveal elements
  document.querySelectorAll('[data-reveal]').forEach(el => {
    // Skip hero elements (handled above)
    if (el.closest('.hero')) return;

    gsap.fromTo(el,
      { y: 35, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        }
      }
    );
  });

  // Editor card — special entrance
  gsap.fromTo('.editor__card',
    { y: 50, opacity: 0, scale: 0.94 },
    {
      y: 0, opacity: 1, scale: 1,
      duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.editor', start: 'top 65%', toggleActions: 'play none none none' }
    }
  );

  // Template cards — staggered
  gsap.fromTo('.tpl-card',
    { y: 50, opacity: 0 },
    {
      y: 0, opacity: 1,
      duration: 0.8, ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: { trigger: '.templates__grid', start: 'top 78%', toggleActions: 'play none none none' }
    }
  );

  // Quality image zoom-in
  gsap.fromTo('.quality__right img',
    { scale: 1.12 },
    {
      scale: 1,
      duration: 1.2, ease: 'power2.out',
      scrollTrigger: { trigger: '.quality', start: 'top 55%', toggleActions: 'play none none none' }
    }
  );

  // Community photos — staggered
  gsap.fromTo('.community__photo',
    { scale: 0.88, opacity: 0 },
    {
      scale: 1, opacity: 1,
      duration: 0.55, ease: 'power2.out',
      stagger: 0.06,
      scrollTrigger: { trigger: '.community__photos', start: 'top 78%', toggleActions: 'play none none none' }
    }
  );

  // Testimonials — staggered
  gsap.fromTo('.community__quotes > div',
    { y: 25, opacity: 0 },
    {
      y: 0, opacity: 1,
      duration: 0.6, ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '.community__quotes', start: 'top 85%', toggleActions: 'play none none none' }
    }
  );

  // Footer columns — staggered
  gsap.fromTo('.footer__grid > div',
    { y: 25, opacity: 0 },
    {
      y: 0, opacity: 1,
      duration: 0.6, ease: 'power2.out',
      stagger: 0.07,
      scrollTrigger: { trigger: '.footer', start: 'top 85%', toggleActions: 'play none none none' }
    }
  );
}

// ============ MAGNETIC BUTTONS ============
function initMagnetic() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  document.querySelectorAll('[data-magnetic]').forEach(el => {
    const pull = 0.28;

    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(el, { x: x * pull, y: y * pull, duration: 0.35, ease: 'power2.out' });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}
