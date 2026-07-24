"use client";

import { Footer, HeaderNav } from "@/components/shared";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const [isUnpacking, setIsUnpacking] = useState(true);
  const [flapOpen, setFlapOpen] = useState(false);
  const [letterUp, setLetterUp] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFlapOpen(true), 600);
    const t2 = setTimeout(() => setLetterUp(true), 1600);
    const t3 = setTimeout(() => setIsUnpacking(false), 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <main className="bg-[#F5F2EB] min-h-screen text-[#111111] font-sans selection:bg-[#E85D26] selection:text-white">
      
      <AnimatePresence>
        {isUnpacking && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#F5F2EB]"
          >
            <div className="relative w-[400px] h-[260px]">
              {/* Back of Envelope */}
              <div className="absolute inset-0 bg-[#D3CDBE] shadow-2xl rounded-sm"></div>

              {/* Miniature Letter Inside Envelope */}
              <motion.div 
                initial={{ y: 0, scale: 0.95 }}
                animate={{ y: letterUp ? -250 : 0, scale: letterUp ? 1.6 : 0.95, opacity: letterUp ? 0 : 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-2 top-2 bottom-2 bg-[#FCFBF8] rounded-sm shadow-md flex flex-col items-center pt-8 border border-[#EAE5D9]"
              >
                <img src="/images/logoo1.png" alt="" className="h-6 opacity-60 grayscale mix-blend-multiply" />
                <div className="mt-8 w-3/4 h-[2px] bg-[#EAE5D9]"></div>
                <div className="mt-3 w-3/4 h-[2px] bg-[#EAE5D9]"></div>
                <div className="mt-3 w-1/2 h-[2px] bg-[#EAE5D9]"></div>
              </motion.div>

              {/* Front Flaps */}
              <div className="absolute inset-0 z-10 drop-shadow-md pointer-events-none">
                <svg viewBox="0 0 400 260" className="w-full h-full">
                  <polygon points="0,260 200,150 400,260" fill="#EAE5D9" />
                  <polygon points="0,0 200,150 0,260" fill="#E3DFD5" />
                  <polygon points="400,0 200,150 400,260" fill="#E3DFD5" />
                </svg>
              </div>

              {/* Top Flap */}
              <motion.div 
                initial={{ rotateX: 0 }}
                animate={{ rotateX: flapOpen ? 180 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ transformOrigin: "top" }}
                className="absolute top-0 inset-x-0 z-20 drop-shadow-md pointer-events-none"
              >
                <svg viewBox="0 0 400 160" className="w-full h-[160px]">
                  <polygon points="0,0 400,0 200,150" fill="#EAE5D9" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <HeaderNav />
      
      {/* The Desk / Background */}
      <section className="pt-40 pb-32 px-4 sm:px-6 md:px-12 flex justify-center min-h-screen items-center relative overflow-hidden">
        
        {/* Subtle desk texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

        {/* The Letter */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isUnpacking ? 0 : 1, y: isUnpacking ? 30 : 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-[700px] w-full bg-[#FCFBF8] p-12 md:p-20 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_20px_60px_rgba(0,0,0,0.08),0_40px_100px_rgba(0,0,0,0.06)] border border-[#EAE5D9] relative mx-auto my-12 transform -rotate-[1deg] hover:rotate-0 transition-transform duration-1000 ease-[0.16,1,0.3,1] z-10 before:content-[''] before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/rice-paper.png')] before:opacity-30 before:pointer-events-none"
        >
          
          {/* Lined Paper Lines */}
          <div 
            className="absolute inset-0 pointer-events-none top-[180px] bottom-[120px]" 
            style={{ 
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 39px, #E8E2D9 39px, #E8E2D9 40px)',
              backgroundSize: '100% 40px' 
            }} 
          />

          {/* Letterhead */}
          <div className="flex justify-between items-end mb-12 relative z-10 border-b border-[#EAE5D9] pb-8">
            <h1 className="font-[family-name:var(--font-instrument)] italic text-4xl text-[#111]">Offline Living</h1>
            <span className="font-[family-name:var(--font-caveat)] text-2xl text-[#888] opacity-80">{currentDate}</span>
          </div>

          <div className="relative z-10 pt-4">
            {/* Salutation */}
            <p className="font-[family-name:var(--font-caveat)] text-4xl md:text-5xl text-[#2A2A28] mb-[28px] -rotate-1 h-[40px] flex items-end">
              Dear friend,
            </p>

            {/* Body - Line height must match the 40px background lines perfectly */}
            <div className="font-[family-name:var(--font-instrument)] text-[22px] md:text-[24px] leading-[40px] text-[#333330]">
              <p className="indent-12 mb-[40px]">
                We live in an era of endless scrolling. We take thousands of photos, store them in the cloud, and rarely look at them again. They become pixels buried beneath more pixels, quietly forgotten in the noise of the digital age.
              </p>
              <p className="indent-12 mb-[40px]">
                We started <span className="italic">Offline Living</span> because we missed the weight of a photograph. We missed the tactile joy of turning a thick, textured page, the faint smell of fresh ink, and the quiet, undeniable intimacy of holding a memory in your hands.
              </p>
              <p className="indent-12 mb-[40px]">
                Our mission is simple: to help you strip away the noise. We curate, craft, and bind your fleeting digital moments into museum-grade, physical artifacts—books that you can place proudly on your coffee table and pass down through generations.
              </p>
              <p className="text-center italic mt-[80px] text-[#111]">
                It’s time to bring your story into the real world.
              </p>
            </div>

            {/* Sign-off */}
            <div className="pt-24 flex flex-col items-end text-right">
              <p className="font-[family-name:var(--font-caveat)] text-3xl md:text-4xl text-[#555] mb-6">
                Warmly,
              </p>
              <div className="relative group">
                <img src="/images/logoo1.png" alt="Offline Living Logo Signature" className="h-48 md:h-56 object-contain opacity-70 mix-blend-multiply grayscale group-hover:grayscale-0 transition-all duration-700 transform -rotate-3" />
                {/* Subtle ink smudge effect on stamp */}
                <img src="/images/logoo1.png" alt="" className="h-48 md:h-56 object-contain opacity-20 mix-blend-multiply grayscale absolute top-[2px] left-[2px] blur-[2px] pointer-events-none transform -rotate-3" />
              </div>
            </div>
          </div>
          
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
