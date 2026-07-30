"use client";

import { Footer, HeaderNav } from "@/components/shared";
import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);
    setStatus("idle");

    // NOTE: EmailJS is fully configured for offlinelivingsupport@gmail.com
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
        }, 5000); // Hide the message after 5 second
      });
  };

  return (
    <main className="bg-[#FAF6EE] min-h-screen text-[#111111] font-sans selection:bg-[#EAEAEA] selection:text-[#111]">
      <HeaderNav />

      <section className="pt-40 pb-32 px-6 md:px-12 flex justify-center min-h-screen items-center relative overflow-hidden">

        {/* Subtle desk texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

        <div className="max-w-[1000px] w-full grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">

          {/* Left Column: Contact Info */}
          <div className="flex flex-col justify-center">
            <span className="font-label-caps text-xs text-brass-gold font-bold mb-4 block tracking-widest uppercase">
              ✦ GET IN TOUCH
            </span>
            <h1 className="font-headline-lg text-4xl sm:text-5xl lg:text-[64px] mb-8 text-ink-charcoal leading-[1.08]">
              Get in touch.
            </h1>
            <p className="font-body-lg text-base md:text-lg text-ink-charcoal/75 mb-12 leading-relaxed">
              Whether you have a question about our craftsmanship, need help with an order, or just want to say hello, we'd love to hear from you.
            </p>

            <div className="space-y-8">
              <div>
                <h4 className="font-label-caps text-xs font-bold tracking-widest uppercase text-brass-gold mb-2">Email</h4>
                <a href="mailto:offlinelivingsupport@gmail.com" className="font-headline-md italic text-xl md:text-2xl text-ink-charcoal hover:text-brass-gold transition-colors">offlinelivingsupport@gmail.com</a>
              </div>
              <div>
                <h4 className="font-label-caps text-xs font-bold tracking-widest uppercase text-brass-gold mb-2">Studio</h4>
                <p className="font-body-md text-base md:text-lg text-ink-charcoal/80 leading-relaxed">
                  The New Indian Express<br />
                  Express House, East Hill Road<br />
                  West Hill, Kozhikode<br />
                  Kerala, 673005
                </p>
              </div>
              <div>
                <h4 className="font-label-caps text-xs font-bold tracking-widest uppercase text-brass-gold mb-2">Hours</h4>
                <p className="font-body-md text-base md:text-lg text-ink-charcoal/80">
                  Mon-Fri, 9am - 5pm EST
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-archival-cream p-8 md:p-12 shadow-xl border border-ink-charcoal/10 rounded-lg relative">

            <form ref={form} className="space-y-6 relative z-10" onSubmit={sendEmail}>
              <div>
                <label className="block font-label-caps text-xs font-bold tracking-widest uppercase text-ink-charcoal/80 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-transparent border-b border-ink-charcoal/20 py-3 font-body-md text-base text-ink-charcoal focus:outline-none focus:border-brass-gold transition-colors"
                />
              </div>

              <div>
                <label className="block font-label-caps text-xs font-bold tracking-widest uppercase text-ink-charcoal/80 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent border-b border-ink-charcoal/20 py-3 font-body-md text-base text-ink-charcoal focus:outline-none focus:border-brass-gold transition-colors"
                />
              </div>

              <div>
                <label className="block font-label-caps text-xs font-bold tracking-widest uppercase text-ink-charcoal/80 mb-2">Message</label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-ink-charcoal/20 py-3 font-body-md text-base text-ink-charcoal focus:outline-none focus:border-brass-gold transition-colors resize-none"
                ></textarea>
              </div>

              <div className="space-y-4 pt-2">
                {status === "success" && (
                  <div className="bg-green-50 border border-green-200 text-green-800 p-4 text-center font-body-md text-sm rounded">
                    Message sent successfully! We will get back to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-4 text-center font-body-md text-sm rounded">
                    Failed to send the message. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="btn-premium w-full bg-ink-charcoal text-archival-cream py-4 font-label-caps text-xs tracking-widest uppercase rounded hover:bg-ink-charcoal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
