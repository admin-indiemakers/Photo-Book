import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Custom Photo Books | Offline Living",
  description: "Create beautiful, archival-quality custom photo books. Choose from layflat, hardcover, and softcover options.",
};

export default function PhotoBookPage() {
  return (
    <div className="min-h-screen bg-theme-ivory pt-40 pb-20">
      <div className="container max-w-5xl mx-auto px-4">
        
        <div className="text-center mb-16">
          
          <h1 className="text-5xl font-serif text-theme-black mb-4">Custom Photo Books</h1>
          <p className="text-lg text-theme-black/70 max-w-2xl mx-auto">
            Turn your digital camera roll into a beautifully bound heirloom. Designed to be felt, shared, and passed down.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
           <div className="overflow-hidden rounded-xl shadow-sm border border-theme-black/10">
             <img src="https://images.unsplash.com/photo-1587572236558-a3751c6d42c0?w=800&h=600&fit=crop" alt="Open photobook showing hands" className="w-full h-auto" data-placeholder="true" loading="eager" />
           </div>
           <div className="px-4">
             <h2 className="text-3xl font-serif text-theme-black mb-6">Your Story, Your Way</h2>
             <p className="text-theme-black/70 text-lg mb-6 leading-relaxed">
               Our intuitive editor makes it easy to create professional-quality photobooks in minutes. Start with one of our handpicked designer templates or build your layouts from scratch.
             </p>
             <ul className="space-y-4 mb-8">
               <li className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-theme-black rounded-full"></div>
                 <span>Premium archival-grade papers that won't fade</span>
               </li>
               <li className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-theme-black rounded-full"></div>
                 <span>Seamless layflat binding options</span>
               </li>
               <li className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 bg-theme-black rounded-full"></div>
                 <span>From 20 up to 100 pages per book</span>
               </li>
             </ul>
             <div className="flex gap-4">
               <Link href="/editor" className="bg-theme-black text-white px-8 py-3 rounded hover:bg-black transition-colors">Start Creating</Link>
               <Link href="/templates" className="border border-theme-black text-theme-black px-8 py-3 rounded hover:bg-theme-black hover:text-white transition-colors">Browse Templates</Link>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
