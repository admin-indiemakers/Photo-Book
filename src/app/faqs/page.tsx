import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "FAQs | Offline Living",
  description: "Frequently asked questions about Offline Living photobooks.",
};

export default function FAQPage() {
  const faqs = [
    {
      question: "How long does it take to print my photobook?",
      answer: "Once you submit your order, our printing process takes 3-5 business days. We meticulously inspect every page before it ships out to ensure it meets our quality standards."
    },
    {
      question: "What kind of paper do you use?",
      answer: "For our standard books, we use 148gsm Mohawk Superfine Eggshell paper. For our Premium Layflat books, we use ultra-thick 650gsm archival paper that opens completely flat with no gutter."
    },
    {
      question: "Can I save my progress and finish later?",
      answer: "Yes! As long as you are logged into your account, your photobook edits are automatically saved to your drafts. You can return at any time to continue designing."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship to the US, Canada, UK, and Australia. We are working on expanding our shipping zones soon."
    },
    {
      question: "What if there is an issue with my printed book?",
      answer: "We stand by our quality 100%. If your book arrives damaged or has a manufacturing defect, please contact us within 14 days of delivery with photos of the issue, and we will reprint it for you free of charge."
    }
  ];

  return (
    <div className="min-h-screen bg-theme-ivory pt-24 pb-20">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="mb-12">
          <Link href="/" className="text-theme-black/60 hover:text-theme-black inline-block">&larr; Back to Home</Link>
        </div>
        
        <h1 className="text-5xl font-serif text-theme-black mb-12">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-theme-black/10">
              <h3 className="text-xl font-medium text-theme-black mb-3">{faq.question}</h3>
              <p className="text-theme-black/70 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-theme-black/70 mb-4">Still have questions?</p>
          <Link href="/contact" className="inline-block border border-theme-black text-theme-black rounded px-6 py-2 hover:bg-theme-black hover:text-white transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
