import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import Script from "next/script";

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
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&family=Dancing+Script:wght@400..700&family=Instrument+Serif:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Lora:ital,wght@0,400..700;1,400..700&family=Merriweather:ital,wght@0,300..900;1,300..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Oswald:wght@200..700&family=Outfit:wght@100..900&family=Pacifico&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100..900;1,100..900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Aleo:wght@400;700&family=Amatic+SC:wght@400;700&family=Anton&family=Arvo:wght@400;700&family=Bangers&family=Bebas+Neue&family=Bitter:wght@400;700&family=Cabin:wght@400;700&family=Cinzel:wght@400;700&family=Cookie&family=Cormorant+Garamond:wght@400;700&family=Courgette&family=Crimson+Text:wght@400;700&family=Dosis:wght@400;700&family=EB+Garamond:wght@400;700&family=Fira+Sans:wght@400;700&family=Great+Vibes&family=Heebo:wght@400;700&family=Indie+Flower&family=Karla:wght@400;700&family=Kaushan+Script&family=Lato:wght@400;700&family=Libre+Baskerville:wght@400;700&family=Lobster&family=Open+Sans:wght@400;700&family=Permanent+Marker&family=PT+Serif:wght@400;700&family=Quicksand:wght@400;700&family=Righteous&family=Rokkitt:wght@400;700&family=Rubik:wght@400;700&family=Sacramento&family=Satisfy&family=Shadows+Into+Light&family=Tinos:wght@400;700&family=Work+Sans:wght@400;700&family=Zilla+Slab:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="flex flex-col font-sans text-theme-black bg-theme-ivory" suppressHydrationWarning>
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
