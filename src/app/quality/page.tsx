import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Our Quality & Materials | Offline Living",
  description: "Discover the premium materials, archival papers, and expert binding methods we use to craft your photobooks.",
};

export default function QualityPage() {
  return (
    <div className="min-h-screen bg-theme-ivory pt-0 pb-20">
      <div className="container max-w-5xl mx-auto px-4">
        
        <div className="text-center mb-20">
          
          <h1 className="text-5xl font-serif text-theme-black mb-4">Uncompromising Quality</h1>
          <p className="text-lg text-theme-black/70 max-w-2xl mx-auto">
            We don't cut corners. Every book is crafted using heritage methods and premium, sustainable materials intended to last for generations.
          </p>
        </div>

        {/* Feature 1 */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 px-4 md:pr-12">
              <h2 className="text-3xl font-serif text-theme-black mb-6">Archival-Grade Paper</h2>
              <p className="text-theme-black/70 text-lg leading-relaxed mb-6">
                The foundation of a beautiful book is the paper. We exclusively source FSC-certified papers from renowned mills, ensuring sustainability without sacrificing quality. 
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-theme-black shrink-0"></div>
                  <div>
                    <strong className="block text-theme-black">Mohawk Superfine Eggshell (148gsm)</strong>
                    <span className="text-sm text-theme-black/70">Used in our softcover and standard hardcover books. Offers a beautiful tactile texture and superb ink adhesion.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-theme-black shrink-0"></div>
                  <div>
                    <strong className="block text-theme-black">Ultra-Thick Mohawk Matte (650gsm)</strong>
                    <span className="text-sm text-theme-black/70">Exclusive to our Premium Layflat books. This paper is rigidly thick, unbendable, and perfectly smooth for high-fidelity photo reproduction.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <img src="https://images.unsplash.com/photo-1587572236558-a3751c6d42c0?w=600&h=600&fit=crop" alt="Close up of paper texture" className="w-full rounded-2xl shadow-sm border border-theme-black/10" loading="lazy" data-placeholder="true" />
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=600&h=600&fit=crop" alt="Close up of layflat binding" className="w-full rounded-2xl shadow-sm border border-theme-black/10" loading="lazy" data-placeholder="true" />
            </div>
            <div className="px-4 md:pl-12">
              <h2 className="text-3xl font-serif text-theme-black mb-6">Seamless Layflat Binding</h2>
              <p className="text-theme-black/70 text-lg leading-relaxed mb-6">
                Our signature binding method allows pages to open completely flat, up to 180 degrees, without a harsh center gutter interrupting your images.
              </p>
              <p className="text-theme-black/70 text-lg leading-relaxed">
                This means you can print sweeping, panoramic landscape photos across a full two-page spread without losing any detail in the fold. It's the ultimate format for wedding albums, travel journals, and professional portfolios.
              </p>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 px-4 md:pr-12">
              <h2 className="text-3xl font-serif text-theme-black mb-6">Museum-Quality Printing</h2>
              <p className="text-theme-black/70 text-lg leading-relaxed mb-6">
                We utilize state-of-the-art Indigo commercial presses to achieve remarkable color accuracy and vibrancy. 
              </p>
              <p className="text-theme-black/70 text-lg leading-relaxed">
                Using a 6-color printing process, we ensure smoother gradients, deeper blacks, and perfect skin tones. Our inks are UV-resistant, meaning your photos won't fade or yellow, remaining as vivid decades from now as they were the day they were printed.
              </p>
            </div>
            <div className="order-1 md:order-2 bg-white rounded-2xl p-12 shadow-sm border border-theme-black/10 flex items-center justify-center">
               <div className="text-center">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="w-24 h-24 mx-auto mb-6 text-theme-black"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                 <span className="block text-2xl font-serif">6-Color Process</span>
               </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/editor" className="inline-block bg-theme-black text-white px-8 py-4 rounded hover:bg-black transition-colors">
            Experience the Quality — Start Creating
          </Link>
        </div>

      </div>
    </div>
  );
}
