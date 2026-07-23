import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Contact Us | Offline Living",
  description: "Get in touch with the Offline Living support team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-theme-ivory pt-0 pb-20">
      <div className="container max-w-2xl mx-auto px-4">
        
        
        <h1 className="text-5xl font-serif text-theme-black mb-4">Contact Us</h1>
        <p className="text-lg text-theme-black/70 mb-12">
          Have a question about an order, our products, or just want to say hello? Fill out the form below and our team will get back to you within 24 hours.
        </p>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-theme-black/10">
          <form className="space-y-6" action="#" method="POST">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-theme-black mb-1">First Name</label>
                <input type="text" id="first-name" name="first-name" required className="w-full px-4 py-2 border border-theme-black/20 rounded focus:outline-none focus:border-theme-black transition-colors" />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-theme-black mb-1">Last Name</label>
                <input type="text" id="last-name" name="last-name" required className="w-full px-4 py-2 border border-theme-black/20 rounded focus:outline-none focus:border-theme-black transition-colors" />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-theme-black mb-1">Email Address</label>
              <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-theme-black/20 rounded focus:outline-none focus:border-theme-black transition-colors" />
            </div>
            
            <div>
              <label htmlFor="order-number" className="block text-sm font-medium text-theme-black mb-1">Order Number (Optional)</label>
              <input type="text" id="order-number" name="order-number" className="w-full px-4 py-2 border border-theme-black/20 rounded focus:outline-none focus:border-theme-black transition-colors" />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-theme-black mb-1">Message</label>
              <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 border border-theme-black/20 rounded focus:outline-none focus:border-theme-black transition-colors resize-none"></textarea>
            </div>
            
            <button type="submit" className="w-full bg-theme-black text-white rounded py-3 hover:bg-black transition-colors font-medium">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
