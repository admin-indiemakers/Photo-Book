"use client";

import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import {
  ScrapbookNavbar,
  ScrapbookFooter,
  AuthenticWaxSeal,
  PaperClipIcon
} from '@/components/ui/landingpage';

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);
    setStatus("idle");

    emailjs.sendForm('service_trxlstp', 'template_0oe8u1f', form.current, '908xIYJo7C18Sy5Jw')
      .then((result) => {
        console.log(result.text);
        setStatus("success");
        form.current?.reset();
      }, (error) => {
        console.log(error.text);
        setStatus("error");
      })
      .finally(() => {
        setIsSending(false);
        setTimeout(() => {
          if (form.current) setStatus("idle");
        }, 5000);
      });
  };

  return (
    <div className="bg-[#F8F3EA] text-[#3A342D] font-sans antialiased relative min-h-screen">
      <div className="grain-overlay" />

      {/* Floating Scrapbook Navbar */}
      <ScrapbookNavbar />

      <main className="pt-28 pb-20">

        {/* 1. Header Title */}
        <section className="pt-8 pb-10 px-6 md:px-12 text-center relative">
          <div className="max-w-3xl mx-auto space-y-3">
            <h1
              className="text-4xl md:text-6xl text-[#3A342D] tracking-tight"
              style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
            >
              Say Hello!
            </h1>

            <p className="font-glory text-xl md:text-2xl text-[#3A342D]/85 font-bold leading-relaxed max-w-xl mx-auto">
              Questions about an order, custom prints, or just want to say hi? Drop us a little note! ♡
            </p>
          </div>
        </section>

        {/* 2. Postcard Contact Section */}
        <section className="px-4 sm:px-6 md:px-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Pinned Studio Info Note (5 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 bg-[#FAF6EE] p-8 rounded-2xl border border-[#DDD5C5] shadow-xl relative transform -rotate-1 hover:rotate-0 transition-transform space-y-6"
            >
              {/* Paper Clip on top left */}
              <div className="absolute -top-3 left-6 z-20">
                <PaperClipIcon className="w-6 h-10 text-slate-500" />
              </div>

              <div className="flex items-center justify-between border-b border-[#DDD5C5] pb-4 pt-2">
                <h3
                  className="text-2xl text-[#3A342D]"
                  style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                >
                  Studio Desk
                </h3>
                <span className="font-glory text-xs font-bold text-[#C27871]">
                  Always here ♡
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <h4
                    className="text-sm text-[#C27871] mb-1"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    Email Us
                  </h4>
                  <a
                    href="mailto:offlinelivingsupport@gmail.com"
                    className="font-glory text-xl text-[#3A342D] hover:text-[#C27871] transition-colors font-bold block"
                  >
                    offlinelivingsupport@gmail.com
                  </a>
                </div>

                <div>
                  <h4
                    className="text-sm text-[#C27871] mb-1"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    Our Studio
                  </h4>
                  <p className="font-glory text-lg text-[#3A342D]/85 leading-relaxed font-bold">
                    The New Indian Express<br />
                    Express House, East Hill Road<br />
                    West Hill, Kozhikode, Kerala 673005
                  </p>
                </div>

                <div>
                  <h4
                    className="text-sm text-[#C27871] mb-1"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    Studio Hours
                  </h4>
                  <p className="font-glory text-lg text-[#3A342D]/85 font-bold">
                    Monday – Friday: 9:00 AM – 6:00 PM IST
                  </p>
                </div>
              </div>

              {/* Cute Seal at bottom */}
              <div className="pt-4 border-t border-[#DDD5C5] flex justify-center">
                <AuthenticWaxSeal className="w-24 h-24" />
              </div>
            </motion.div>

            {/* Right Column: Adorable Postcard Inquiry Form (7 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 bg-[#FAF6EE] p-8 sm:p-10 rounded-2xl border-2 border-dashed border-[#C27871]/40 shadow-2xl relative"
            >
              {/* Washi Tape at top right */}
              <div className="washi-tape -top-3 right-8 rotate-[3deg]" />

              {/* Top Postage Stamp Box */}
              <div className="flex justify-between items-start mb-6 border-b border-[#DDD5C5] pb-4">
                <div>
                  <h2
                    className="text-2xl text-[#3A342D]"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    Write A Little Postcard
                  </h2>
                  <p className="font-glory text-sm text-[#C27871] font-bold">
                    We reply within 24 hours! ♡
                  </p>
                </div>

                <div className="w-16 h-20 border-2 border-dashed border-[#C27871] rounded-sm flex flex-col items-center justify-center p-1 bg-[#F8EBE6] rotate-3 text-center">
                  <span className="font-glory text-[8px] font-bold text-[#C27871] leading-tight">
                    AIR MAIL
                  </span>
                </div>
              </div>

              {/* Form */}
              <form ref={form} onSubmit={sendEmail} className="space-y-5">
                <div>
                  <label
                    className="block text-xs text-[#3A342D] mb-1.5"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Maya Sharma"
                    className="w-full bg-[#F4EFE5] border border-[#DDD5C5] rounded-xl px-4 py-3 font-glory text-lg text-[#3A342D] placeholder:text-[#3A342D]/40 focus:outline-none focus:border-[#C27871] focus:ring-1 focus:ring-[#C27871] transition-all"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs text-[#3A342D] mb-1.5"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="maya@example.com"
                    className="w-full bg-[#F4EFE5] border border-[#DDD5C5] rounded-xl px-4 py-3 font-glory text-lg text-[#3A342D] placeholder:text-[#3A342D]/40 focus:outline-none focus:border-[#C27871] focus:ring-1 focus:ring-[#C27871] transition-all"
                  />
                </div>

                <div>
                  <label
                    className="block text-xs text-[#3A342D] mb-1.5"
                    style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}
                  >
                    Your Note or Inquiry
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about the project you're dreaming of..."
                    className="w-full bg-[#F4EFE5] border border-[#DDD5C5] rounded-xl px-4 py-3 font-glory text-lg text-[#3A342D] placeholder:text-[#3A342D]/40 focus:outline-none focus:border-[#C27871] focus:ring-1 focus:ring-[#C27871] transition-all resize-none"
                  />
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-[#DCE4D7] border border-[#AEC2A5] text-[#3A342D] rounded-xl text-center font-glory text-lg font-bold"
                  >
                    Your note is on its way to our studio desk! ♡
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-[#F8EBE6] border border-[#C27871] text-[#C27871] rounded-xl text-center font-glory text-lg font-bold"
                  >
                    Something went wrong. Please email us directly at offlinelivingsupport@gmail.com.
                  </motion.div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 bg-[#C27871] text-white rounded-full font-protest text-xs uppercase tracking-wider hover:bg-[#3A342D] transition-all shadow-md text-center block hover:shadow-lg disabled:opacity-50"
                >
                  {isSending ? 'Stamping your postcard...' : 'Send Postcard to Studio'}
                </button>
              </form>
            </motion.div>

          </div>
        </section>

      </main>

      {/* Scrapbook Footer */}
      <ScrapbookFooter />
    </div>
  );
}
