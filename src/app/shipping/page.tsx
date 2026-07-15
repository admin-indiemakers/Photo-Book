import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Shipping Information | Offline Living",
  description: "Learn about our shipping rates, timelines, and international delivery options.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-theme-ivory pt-24 pb-20">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="mb-12">
          <Link href="/" className="text-theme-black/60 hover:text-theme-black inline-block">&larr; Back to Home</Link>
        </div>
        
        <h1 className="text-5xl font-serif text-theme-black mb-12">Shipping Information</h1>
        
        <div className="prose prose-lg prose-theme max-w-none text-theme-black/80 space-y-8">
          <p>
            Every Offline Living photobook is custom printed and bound to order. Please note that the total delivery time includes both our production time (printing and binding) and the transit time from our facility to your door.
          </p>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-theme-black/10 my-8">
            <h2 className="text-2xl font-serif text-theme-black mb-4 mt-0">Production Time</h2>
            <p className="mb-0">
              <strong>Standard Production:</strong> 3-5 business days<br/>
              During peak holiday seasons (November-December), please allow up to 7 business days for production.
            </p>
          </div>

          <h2 className="text-3xl font-serif text-theme-black mt-12 mb-6">Domestic Shipping (US)</h2>
          <table className="w-full text-left border-collapse border border-theme-black/10 bg-white rounded-lg overflow-hidden">
            <thead className="bg-theme-black/5">
              <tr>
                <th className="p-4 border-b border-theme-black/10 font-medium">Method</th>
                <th className="p-4 border-b border-theme-black/10 font-medium">Transit Time</th>
                <th className="p-4 border-b border-theme-black/10 font-medium">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-theme-black/10">Standard</td>
                <td className="p-4 border-b border-theme-black/10">4-6 business days</td>
                <td className="p-4 border-b border-theme-black/10">$7.99</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-theme-black/10">Expedited</td>
                <td className="p-4 border-b border-theme-black/10">2-3 business days</td>
                <td className="p-4 border-b border-theme-black/10">$14.99</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-theme-black/10">Overnight</td>
                <td className="p-4 border-b border-theme-black/10">1 business day</td>
                <td className="p-4 border-b border-theme-black/10">$29.99</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm text-theme-black/60 mt-2">* Free Standard Shipping on all orders over $150.</p>

          <h2 className="text-3xl font-serif text-theme-black mt-12 mb-6">International Shipping</h2>
          <p>
            We currently ship to Canada, the United Kingdom, and Australia. International standard shipping typically takes 7-14 business days. Rates are calculated dynamically at checkout based on your exact location and the weight of your order.
          </p>
          <p className="text-sm">
            <em>Note: International customers are responsible for any applicable customs duties or import taxes levied by their local authorities.</em>
          </p>
        </div>
      </div>
    </div>
  );
}
