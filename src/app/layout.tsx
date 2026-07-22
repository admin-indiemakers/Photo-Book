import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Caveat, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Script from "next/script";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "🦋 Offline Living — Your Story. Beautifully Told.",
  description: "Turn your photos into archival-quality, layflat photobooks — beautifully designed, printed to last, delivered to your door.",
  openGraph: {
    title: "🦋 Offline Living — Your Story. Beautifully Told.",
    description: "Turn your photos into archival-quality, layflat photobooks — beautifully designed, printed to last, delivered to your door.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerif.variable} ${caveat.variable} ${instrument.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans text-theme-black bg-theme-ivory">
        <TooltipProvider>
          {children}
        </TooltipProvider>

        {/* Global Cursor */}
        <div className="cursor-dot" id="cursorDot"></div>
        <div className="cursor-ring" id="cursorRing"></div>

        {/* Global Scripts */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js" strategy="beforeInteractive" />
        <Script src="/script.js?v=3" strategy="lazyOnload" />
      </body>
    </html>
  );
}
