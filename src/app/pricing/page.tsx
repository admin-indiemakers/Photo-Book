import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Pricing | Offline Living",
  description: "Transparent pricing for our archival-quality photobooks. Choose from softcover, hardcover, and premium layflat options.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-theme-ivory pt-24 pb-20">
      <div className="container max-w-6xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <Link href="/" className="text-theme-black/60 hover:text-theme-black mb-8 inline-block">&larr; Back to Home</Link>
          <h1 className="text-5xl font-serif text-theme-black mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-theme-black/70 max-w-2xl mx-auto">
            Museum-quality printing starting at just $39. All books include 20 pages standard, with options to add up to 100 pages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Softcover */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-theme-black/10 flex flex-col">
            <h3 className="text-2xl font-serif mb-2">Softcover</h3>
            <p className="text-theme-black/60 text-sm mb-6 flex-grow">Lightweight, flexible, and perfect for everyday moments and travel journals.</p>
            <div className="text-4xl font-sans font-medium mb-6">$39<span className="text-base text-theme-black/50 font-normal"> / 20 pages</span></div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 text-theme-black/50"><path d="M5 12l5 5L20 7"/></svg>
                5.5" x 5.5" or 8" x 8" sizes
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 text-theme-black/50"><path d="M5 12l5 5L20 7"/></svg>
                Flexible binding
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 text-theme-black/50"><path d="M5 12l5 5L20 7"/></svg>
                Matte finish cover
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 text-theme-black/50"><path d="M5 12l5 5L20 7"/></svg>
                +$0.50 per extra page
              </li>
            </ul>
            <Link href="/editor" className="block w-full text-center border border-theme-black text-theme-black rounded py-3 hover:bg-theme-black hover:text-white transition-colors">Start Creating</Link>
          </div>

          {/* Hardcover */}
          <div className="bg-white p-8 rounded-xl shadow-md border-2 border-theme-black relative flex flex-col transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-theme-black text-white px-4 py-1 text-xs font-bold uppercase tracking-wider rounded-full">Most Popular</div>
            <h3 className="text-2xl font-serif mb-2">Hardcover</h3>
            <p className="text-theme-black/60 text-sm mb-6 flex-grow">Classic, durable, and designed to look beautiful on any coffee table or bookshelf.</p>
            <div className="text-4xl font-sans font-medium mb-6">$59<span className="text-base text-theme-black/50 font-normal"> / 20 pages</span></div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 text-theme-black/50"><path d="M5 12l5 5L20 7"/></svg>
                8.5" x 8.5" or 11" x 8.5" sizes
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 text-theme-black/50"><path d="M5 12l5 5L20 7"/></svg>
                Sturdy hardcover binding
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 text-theme-black/50"><path d="M5 12l5 5L20 7"/></svg>
                Fabric or photo-wrap cover
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 text-theme-black/50"><path d="M5 12l5 5L20 7"/></svg>
                +$1.00 per extra page
              </li>
            </ul>
            <Link href="/editor" className="block w-full text-center bg-theme-black text-white rounded py-3 hover:bg-black transition-colors">Start Creating</Link>
          </div>

          {/* Layflat */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-theme-black/10 flex flex-col">
            <h3 className="text-2xl font-serif mb-2">Premium Layflat</h3>
            <p className="text-theme-black/60 text-sm mb-6 flex-grow">Ultra-thick pages that open completely flat for stunning seamless panoramic spreads.</p>
            <div className="text-4xl font-sans font-medium mb-6">$119<span className="text-base text-theme-black/50 font-normal"> / 20 pages</span></div>
            <ul className="space-y-3 mb-8 text-sm">
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 text-theme-black/50"><path d="M5 12l5 5L20 7"/></svg>
                10" x 10" or 12" x 12" sizes
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 text-theme-black/50"><path d="M5 12l5 5L20 7"/></svg>
                Seamless layflat binding
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 text-theme-black/50"><path d="M5 12l5 5L20 7"/></svg>
                Ultra-thick archival paper
              </li>
              <li className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4 text-theme-black/50"><path d="M5 12l5 5L20 7"/></svg>
                +$2.00 per extra page
              </li>
            </ul>
            <Link href="/editor" className="block w-full text-center border border-theme-black text-theme-black rounded py-3 hover:bg-theme-black hover:text-white transition-colors">Start Creating</Link>
          </div>
        </div>
        
        <div className="mt-24 max-w-3xl mx-auto text-center border-t border-theme-black/10 pt-12">
          <h2 className="text-2xl font-serif mb-4">Safe & Secure Ordering</h2>
          <p className="text-theme-black/70 mb-6">We accept all major credit cards, PayPal, and Apple Pay. Your transaction is securely encrypted.</p>
          <div className="flex justify-center items-center gap-4 text-theme-black/40">
            {/* Payment Icons Placeholder */}
            <div className="flex gap-2">
              <span className="px-3 py-1 border border-theme-black/20 rounded font-medium text-xs">Visa</span>
              <span className="px-3 py-1 border border-theme-black/20 rounded font-medium text-xs">Mastercard</span>
              <span className="px-3 py-1 border border-theme-black/20 rounded font-medium text-xs">Amex</span>
              <span className="px-3 py-1 border border-theme-black/20 rounded font-medium text-xs">Apple Pay</span>
            </div>
          </div>
          <div className="mt-4 text-xs text-theme-black/50 flex items-center justify-center gap-1">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
             256-bit SSL Secure Checkout
          </div>
        </div>

      </div>
    </div>
  );
}
