import Link from 'next/link';
import { HeaderNav, Footer } from '@/components/shared';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] font-sans flex flex-col selection:bg-[#E85D26] selection:text-white">
      <HeaderNav />
      <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center relative overflow-hidden">
        {/* Background Film Grain */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

        <h1 className="text-6xl md:text-9xl font-serif text-[#1a1a18] tracking-tight mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-serif text-[#1a1a18] mb-6">Page not found</h2>
        <p className="text-[#6b6560] max-w-md mx-auto mb-10 text-lg font-light leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link href="/" className="inline-block bg-[#1a1a18] text-white px-10 py-4 rounded-xl hover:bg-[#E85D26] hover:shadow-xl hover:shadow-[#E85D26]/20 transition-all duration-300 font-mono text-sm uppercase tracking-widest relative z-10">
          Return Home
        </Link>
      </div>
      <Footer />
    </div>
  );
}
