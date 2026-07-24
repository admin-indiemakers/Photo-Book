"use client";

import { Footer, HeaderNav } from "@/components/shared";

export default function ContactPage() {
  return (
    <main className="bg-[#FAF6EE] min-h-screen text-[#111111] font-sans selection:bg-[#EAEAEA] selection:text-[#111]">
      <HeaderNav />
      
      <section className="pt-40 pb-32 px-6 md:px-12 flex justify-center min-h-screen items-center relative overflow-hidden">
        
        {/* Subtle desk texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

        <div className="max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
          
          {/* Left Column: Contact Info */}
          <div className="flex flex-col justify-center">
            <h1 className="font-[family-name:var(--font-instrument)] italic text-6xl md:text-[80px] mb-8 text-[#111] leading-none">
              Get in touch
            </h1>
            <p className="text-[#555] font-light text-lg mb-12 leading-relaxed">
              Whether you have a question about our craftsmanship, need help with an order, or just want to say hello, we'd love to hear from you.
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="font-semibold mb-2 uppercase tracking-wider text-[11px] text-[#888888]">Email</h4>
                <a href="mailto:offlinelivingsupport@gmail.com" className="text-xl font-[family-name:var(--font-instrument)] hover:text-[#E85D26] transition-colors">offlinelivingsupport@gmail.com</a>
              </div>
              <div>
                <h4 className="font-semibold mb-2 uppercase tracking-wider text-[11px] text-[#888888]">Studio</h4>
                <p className="text-xl font-[family-name:var(--font-instrument)] text-[#333]">
                  123 Artisan Way<br/>
                  Brooklyn, NY 11201
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 uppercase tracking-wider text-[11px] text-[#888888]">Hours</h4>
                <p className="text-xl font-[family-name:var(--font-instrument)] text-[#333]">
                  Mon-Fri, 9am - 5pm EST
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form styled beautifully */}
          <div className="bg-[#FCFBF8] p-10 md:p-14 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_60px_rgba(0,0,0,0.08)] border border-[#EAE5D9] relative before:content-[''] before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] before:opacity-30 before:pointer-events-none">
            
            <form className="space-y-8 relative z-10" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
              <div>
                <label className="block font-semibold mb-2 uppercase tracking-wider text-[11px] text-[#888888]">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-transparent border-b border-[#D8D2C4] py-3 text-lg font-[family-name:var(--font-instrument)] focus:outline-none focus:border-[#111] transition-colors"
                />
              </div>
              
              <div>
                <label className="block font-semibold mb-2 uppercase tracking-wider text-[11px] text-[#888888]">Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-transparent border-b border-[#D8D2C4] py-3 text-lg font-[family-name:var(--font-instrument)] focus:outline-none focus:border-[#111] transition-colors"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 uppercase tracking-wider text-[11px] text-[#888888]">Message</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-[#D8D2C4] py-3 text-lg font-[family-name:var(--font-instrument)] focus:outline-none focus:border-[#111] transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#111] text-white py-4 font-semibold tracking-widest text-[11px] uppercase hover:bg-[#E85D26] transition-colors mt-4"
              >
                Send Message
              </button>
            </form>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
