import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Script from "next/script";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CustomCursor, CinematicGrain, InitialPreloader } from "@/components/PremiumEffects";

export const metadata: Metadata = {
  title: "Offline Living — Your Story. Beautifully Told.",
  description: "Turn your photos into archival-quality, layflat photobooks — beautifully designed, printed to last, delivered to your door.",
  openGraph: {
    title: "Offline Living — Your Story. Beautifully Told.",
    description: "Turn your photos into archival-quality, layflat photobooks — beautifully designed, printed to last, delivered to your door.",
    type: "website",
  },
  icons: {
    icon: "/images/logoo-icon.svg",
  },
};

import { DM_Sans, DM_Serif_Display, Caveat, Instrument_Serif } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-serif',
  style: ['normal', 'italic'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument',
  style: ['normal', 'italic'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerif.variable} ${caveat.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-theme-black bg-theme-ivory">
        <TooltipProvider>
          <Breadcrumbs />
          {children}
        </TooltipProvider>

        {/* Ultra-Premium Cinematic Effects */}
        <InitialPreloader />
        <CustomCursor />
        <CinematicGrain />

        {/* Global Scripts */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js" strategy="beforeInteractive" />
        <Script src="/script.js?v=3" strategy="lazyOnload" />
      </body>
    </html>
  );
}
