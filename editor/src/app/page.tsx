import { LandingHtml } from './LandingHtml';
import Script from 'next/script';

export default function HomePage() {
  return (
    <>
      <link rel="stylesheet" href="/landing.css" />
      <LandingHtml />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js" strategy="beforeInteractive" />
      <Script src="/script.js" strategy="lazyOnload" />
    </>
  );
}
