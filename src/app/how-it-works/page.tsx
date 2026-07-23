import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "How It Works | Offline Living",
  description: "Learn how easy it is to create your own beautiful photobook with Offline Living.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Choose Your Format",
      desc: "Select from our range of sizes and cover types. Whether you want a flexible everyday softcover, a classic hardcover, or our premium layflat for panoramic spreads, we have the perfect foundation for your story.",
      image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=600&h=400&fit=crop"
    },
    {
      num: "02",
      title: "Upload & Auto-fill",
      desc: "Connect your device or cloud storage to upload your photos. Our smart editor can automatically arrange your images chronologically, or you can start with a blank canvas and one of our designer templates.",
      image: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=600&h=400&fit=crop"
    },
    {
      num: "03",
      title: "Customize & Personalize",
      desc: "Add captions, change layouts, and adjust cropping with our intuitive drag-and-drop tools. You have full creative control to make every page look exactly how you envisioned.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop"
    },
    {
      num: "04",
      title: "Print & Preserve",
      desc: "Once you approve the final proof, we take over. Your book is printed on archival-grade paper, hand-bound with care, and shipped securely to your door, ready to be enjoyed for generations.",
      image: "https://images.unsplash.com/photo-1587572236558-a3751c6d42c0?w=600&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-theme-ivory pt-0 pb-20">
      <div className="container max-w-5xl mx-auto px-4">
        
        <div className="text-center mb-20">
          
          <h1 className="text-5xl font-serif text-theme-black mb-4">How It Works</h1>
          <p className="text-lg text-theme-black/70 max-w-2xl mx-auto">
            From digital camera roll to physical heirloom in four simple steps.
          </p>
        </div>

        <div className="space-y-24">
          {steps.map((step, index) => (
            <div key={step.num} className={`flex flex-col gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
              <div className="w-full md:w-1/2">
                <div className="overflow-hidden rounded-xl shadow-sm border border-theme-black/10">
                  <img src={step.image} alt={step.title} loading="lazy" className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" data-placeholder="true" />
                </div>
              </div>
              <div className="w-full md:w-1/2 px-4 md:px-8">
                <span className="text-theme-black/40 text-6xl font-serif leading-none block mb-4">{step.num}</span>
                <h2 className="text-3xl font-serif text-theme-black mb-4">{step.title}</h2>
                <p className="text-theme-black/70 text-lg leading-relaxed mb-8">{step.desc}</p>
                {index === 0 && (
                  <Link href="/pricing" className="text-theme-black border-b border-theme-black pb-1 hover:opacity-70 transition-opacity">
                    View Pricing Options &rarr;
                  </Link>
                )}
                {index === 1 && (
                  <Link href="/templates" className="text-theme-black border-b border-theme-black pb-1 hover:opacity-70 transition-opacity">
                    Browse Templates &rarr;
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 text-center bg-white p-16 rounded-2xl shadow-sm border border-theme-black/10">
          <h2 className="text-4xl font-serif text-theme-black mb-6">Ready to tell your story?</h2>
          <p className="text-lg text-theme-black/70 mb-8 max-w-xl mx-auto">
            Open our editor in your browser and start bringing your memories to life. No software download required.
          </p>
          <Link href="/editor" className="inline-block bg-theme-black text-white px-8 py-4 rounded-full text-lg hover:bg-black transition-colors shadow-lg">
            Start Creating Now
          </Link>
        </div>

      </div>
    </div>
  );
}
