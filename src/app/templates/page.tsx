import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Templates | Offline Living",
  description: "Browse our collection of handpicked photobook templates for every story and occasion.",
};

// Mock data for templates
const templates = [
  { id: 'wanderlust', name: 'Wanderlust', category: 'Travel', pages: 12, price: 39, image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=340&h=450&fit=crop' },
  { id: 'wedding-bliss', name: 'Wedding Bliss', category: 'Wedding', pages: 40, price: 89, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=340&h=450&fit=crop' },
  { id: 'little-one', name: 'Little One', category: 'Family', pages: 24, price: 49, image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=340&h=450&fit=crop' },
  { id: 'family-time', name: 'Family Time', category: 'Family', pages: 36, price: 69, image: 'https://images.unsplash.com/photo-1596389523108-78b9a10fdbe6?w=340&h=450&fit=crop' },
  { id: 'milestones', name: 'Milestones', category: 'Occasions', pages: 28, price: 59, image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=340&h=450&fit=crop' },
  { id: 'year-in-review', name: 'Year in Review', category: 'Occasions', pages: 50, price: 99, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=340&h=450&fit=crop' },
  { id: 'portfolio', name: 'Creative Portfolio', category: 'Portfolio', pages: 20, price: 45, image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=340&h=450&fit=crop' },
  { id: 'recipe-book', name: 'Family Recipes', category: 'Family', pages: 30, price: 55, image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=340&h=450&fit=crop' }
];

const categories = ['All', 'Travel', 'Wedding', 'Family', 'Occasions', 'Portfolio'];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-theme-ivory pt-24 pb-20">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/" className="text-theme-black/60 hover:text-theme-black mb-8 inline-block">&larr; Back to Home</Link>
          <h1 className="text-5xl font-serif text-theme-black mb-4">Template Gallery</h1>
          <p className="text-lg text-theme-black/70 max-w-2xl mx-auto">
            Choose a starting point for your story. All templates are fully customizable in our editor.
          </p>
        </div>

        {/* Filters (Visual only for now, client-side filtering can be added later) */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat, idx) => (
            <button 
              key={cat} 
              className={`px-6 py-2 rounded-full border text-sm transition-colors ${idx === 0 ? 'bg-theme-black text-white border-theme-black' : 'border-theme-black/20 text-theme-black hover:border-theme-black'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((tpl) => (
            <div key={tpl.id} className="group relative bg-white p-4 rounded-xl shadow-sm border border-theme-black/10 hover:shadow-md transition-shadow">
              <div className="overflow-hidden rounded-lg mb-4 bg-gray-100 aspect-[3/4]">
                <img 
                  src={tpl.image} 
                  alt={`${tpl.name} template preview`} 
                  loading="lazy" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  data-placeholder="true"
                />
              </div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-serif text-xl text-theme-black">{tpl.name}</h3>
                <span className="text-xs font-medium px-2 py-1 bg-theme-ivory rounded text-theme-black/70 border border-theme-black/5">{tpl.category}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-theme-black/60 mb-4">
                <span>{tpl.pages} Pages</span>
                <span>From ${tpl.price}</span>
              </div>
              <Link 
                href={`/editor?template=${tpl.id}`} 
                className="block w-full text-center border border-theme-black/20 rounded py-2 text-sm hover:bg-theme-black hover:text-white transition-colors"
              >
                Use this template
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
