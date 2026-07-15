import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "About Us | Offline Living",
  description: "Learn about our mission to turn digital memories into beautiful, archival-quality photobooks.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-theme-ivory pt-24 pb-20">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-12">
          <Link href="/" className="text-theme-black/60 hover:text-theme-black inline-block">&larr; Back to Home</Link>
        </div>
        
        <h1 className="text-5xl font-serif text-theme-black mb-8">Our Story</h1>
        
        <div className="prose prose-lg prose-theme max-w-none text-theme-black/80 space-y-6">
          <p className="text-xl leading-relaxed">
            Offline Living was born out of a simple realization: in an era where we take more photos than ever before, we look at them less. Our digital camera rolls have become bottomless pits of forgotten memories.
          </p>
          
          <img 
            src="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=800&h=400&fit=crop" 
            alt="Printing process preview" 
            className="w-full h-80 object-cover rounded-xl my-10"
            data-placeholder="true"
          />

          <h2 className="text-3xl font-serif text-theme-black mt-12 mb-6">The Mission</h2>
          <p>
            We believe your most important moments shouldn't be trapped behind a screen. They deserve to be felt, shared, and passed down. That's why we set out to create the world's most beautiful, accessible photobook platform.
          </p>
          
          <h2 className="text-3xl font-serif text-theme-black mt-12 mb-6">Uncompromising Quality</h2>
          <p>
            From the beginning, we made a commitment to never cut corners on quality. We partner with heritage printers who use archival-grade paper and museum-quality inks. Every book that leaves our facility is hand-inspected to ensure it meets our exacting standards.
          </p>

          <div className="bg-white p-8 rounded-xl border border-theme-black/10 my-10">
            <h3 className="text-xl font-serif mb-4">Our Core Values</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="font-bold">&bull;</span>
                <span><strong>Preservation:</strong> Building products meant to last lifetimes, not just seasons.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold">&bull;</span>
                <span><strong>Simplicity:</strong> Complex design tools shouldn't stand between you and your memories.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold">&bull;</span>
                <span><strong>Sustainability:</strong> Using FSC-certified papers and environmentally responsible printing processes.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
