import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Returns Policy | Offline Living",
  description: "Learn about the Offline Living satisfaction guarantee and return policy.",
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-theme-ivory pt-40 pb-20">
      <div className="container max-w-3xl mx-auto px-4">
        
        
        <h1 className="text-5xl font-serif text-theme-black mb-8">Returns & Guarantees</h1>
        
        <div className="prose prose-lg prose-theme max-w-none text-theme-black/80 space-y-6">
          <p className="text-xl leading-relaxed font-medium">
            We want you to love your Offline Living photobook. Because every product is custom-made based on your unique design, we cannot accept returns for buyer's remorse or user errors. However, we stand 100% behind our manufacturing quality.
          </p>

          <h2 className="text-3xl font-serif text-theme-black mt-12 mb-4">Our Quality Guarantee</h2>
          <p>
            If your book arrives damaged, has a manufacturing defect, or if there is a printing issue on our end, please let us know within <strong>14 days of delivery</strong>. We will happily reprint and replace the affected item completely free of charge.
          </p>
          
          <h3 className="text-xl font-medium mt-8 mb-2">What qualifies for a free replacement?</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Damaged in transit (bent corners, water damage, crushed spine)</li>
            <li>Manufacturing defects (loose pages, misaligned binding)</li>
            <li>Printing errors caused by our systems (smudged ink, incorrect coloration not present in the original file)</li>
          </ul>

          <h3 className="text-xl font-medium mt-8 mb-2">What does NOT qualify for a free replacement?</h3>
          <ul className="list-disc pl-5 space-y-2 text-theme-black/70">
            <li>Typos, misspellings, or grammatical errors in the text you provided</li>
            <li>Poor image quality due to low-resolution original uploads</li>
            <li>Images that are cut off because they were placed outside the "safe zone" in the editor</li>
            <li>Changing your mind about a cover material or template choice after placing the order</li>
          </ul>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-theme-black/10 my-10">
            <h2 className="text-2xl font-serif text-theme-black mb-4 mt-0">How to request a replacement</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Take 2-3 clear photos showing the damage or defect.</li>
              <li>Email the photos to <strong>support@offlineliving.com</strong> along with your order number.</li>
              <li>Our team will review your case within 1-2 business days.</li>
              <li>Once approved, a replacement order will be fast-tracked into production.</li>
            </ol>
            <div className="mt-6">
              <Link href="/contact" className="inline-block bg-theme-black text-white px-6 py-2 rounded hover:bg-black transition-colors">Contact Support</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
