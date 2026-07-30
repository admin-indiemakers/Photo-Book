import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Script from "next/script";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CinematicGrain } from "@/components/PremiumEffects";

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

import { DM_Sans, Playfair_Display, Caveat } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
});

import React, { Suspense } from "react";
import GA4Analytics from "@/components/GA4Analytics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${playfair.variable} ${caveat.variable} antialiased`}
    >
      <head>
        {/* Google Fonts & Material Symbols */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5FNBNK1V8P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-5FNBNK1V8P');
          `}
        </Script>
      </head>
      <body className="flex flex-col font-sans text-theme-black bg-theme-ivory" suppressHydrationWarning>
        <Suspense fallback={null}>
          <GA4Analytics />
        </Suspense>
        <TooltipProvider>
          {children}
        </TooltipProvider>

        {/* Ultra-Premium Cinematic Effects */}
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
