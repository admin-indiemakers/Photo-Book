import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Community Stories & Reviews | Offline Living",
  description: "Read real reviews from our creators and explore a gallery of beautiful, customer-designed photobooks.",
};

export default function StoriesPage() {
  const reviews = [
    { name: "Sarah T.", date: "Jan 12, 2026", rating: 5, text: "The best way to keep memories alive. The layflat pages are incredibly thick and the print quality is stunning." },
    { name: "James L.", date: "Nov 28, 2025", rating: 5, text: "Beautiful quality and so easy to create. I made my wedding album in a weekend and it looks like it cost triple what I paid." },
    { name: "Priya K.", date: "Oct 05, 2025", rating: 5, text: "A gift that means everything. I made a 'year in review' book for my parents and they were in tears. The packaging was also a lovely touch." },
    { name: "Elena R.", date: "Sep 14, 2025", rating: 4, text: "Great quality book! The editor was a bit slow on my older laptop, but the final product is flawless. Definitely ordering again." },
    { name: "Marcus W.", date: "Aug 02, 2025", rating: 5, text: "I'm a professional photographer and this is the only consumer platform I trust for my personal family photos. Highly recommended." }
  ];

  return (
    <div className="min-h-screen bg-theme-ivory pt-24 pb-20">
      <div className="container max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <Link href="/" className="text-theme-black/60 hover:text-theme-black mb-8 inline-block">&larr; Back to Home</Link>
          <h1 className="text-5xl font-serif text-theme-black mb-4">Stories from our community</h1>
          <p className="text-lg text-theme-black/70 max-w-2xl mx-auto">
            Every book has a story. Here are ones we love from our verified creators.
          </p>
        </div>

        {/* Gallery */}
        <div className="mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2">
              <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=600&fit=crop" alt="Family together" loading="lazy" className="w-full h-full object-cover rounded-xl" data-placeholder="true" />
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop" alt="Portrait" loading="lazy" className="w-full h-full object-cover rounded-xl" data-placeholder="true" />
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&h=300&fit=crop" alt="Photographer" loading="lazy" className="w-full h-full object-cover rounded-xl" data-placeholder="true" />
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=300&h=300&fit=crop" alt="Nature" loading="lazy" className="w-full h-full object-cover rounded-xl" data-placeholder="true" />
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop" alt="Friends gathering" loading="lazy" className="w-full h-full object-cover rounded-xl" data-placeholder="true" />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-theme-black/10 pb-6 mb-8">
            <h2 className="text-3xl font-serif text-theme-black">Customer Reviews</h2>
            <div className="flex items-center gap-4">
               <div className="text-xl font-bold">4.9 / 5.0</div>
               <div className="flex text-theme-black">
                 <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                 <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                 <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                 <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                 <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
               </div>
               <span className="text-theme-black/50 text-sm">(2,500+ reviews)</span>
            </div>
          </div>

          <div className="space-y-8">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-theme-black/5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-theme-black">{review.name}</span>
                      <span className="text-xs text-theme-black/50 bg-theme-black/5 px-2 py-0.5 rounded flex items-center gap-1">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M20 6L9 17l-5-5"/></svg>
                        Verified Buyer
                      </span>
                    </div>
                    <div className="text-sm text-theme-black/50">{review.date}</div>
                  </div>
                  <div className="flex text-theme-black">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" className={`w-4 h-4 ${i < review.rating ? 'text-theme-black' : 'text-theme-black/20'}`} fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    ))}
                  </div>
                </div>
                <p className="text-theme-black/80">{review.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="border border-theme-black text-theme-black px-8 py-3 rounded hover:bg-theme-black hover:text-white transition-colors">
              Load More Reviews
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
