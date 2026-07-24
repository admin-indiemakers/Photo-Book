import { Footer, HeaderNav } from "@/components/shared";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white min-h-screen text-[#111111] font-sans selection:bg-[#EAEAEA] selection:text-[#111]">
      <HeaderNav />
      
      <section className="pt-40 pb-32 px-6 md:px-12 flex justify-center">
        <div className="max-w-[800px] w-full">
          <h1 className="font-[family-name:var(--font-instrument)] text-5xl md:text-6xl mb-12 text-[#111]">Privacy Policy</h1>
          
          <div className="space-y-8 text-[#333] leading-relaxed font-light">
            <p><strong>Last Updated: July 24, 2026</strong></p>
            
            <p>At Offline Living, we deeply respect your privacy. This Privacy Policy describes how we collect, use, and protect your personal information when you use our website and services.</p>
            
            <h2 className="font-[family-name:var(--font-instrument)] text-3xl text-[#111] mt-12 mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, upload photos, place an order, or contact us for support. This may include your name, email address, shipping address, payment information, and the images you upload for printing.</p>
            
            <h2 className="font-[family-name:var(--font-instrument)] text-3xl text-[#111] mt-12 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fulfill and manage your orders</li>
              <li>Provide customer support</li>
              <li>Improve our website and services</li>
              <li>Send you updates about your orders</li>
            </ul>

            <h2 className="font-[family-name:var(--font-instrument)] text-3xl text-[#111] mt-12 mb-4">3. Photo Privacy</h2>
            <p>Your photos are strictly used for the purpose of printing your photobooks and keepsakes. We do not use your personal photos for marketing or public display without your explicit, written consent. Your uploaded images are securely stored and deleted from our active servers after your order is successfully completed and delivered.</p>
            
            <h2 className="font-[family-name:var(--font-instrument)] text-3xl text-[#111] mt-12 mb-4">4. Data Security</h2>
            <p>We implement strict security measures to protect your personal information. All payment processing is handled securely by certified third-party payment gateways, and we do not store your credit card information on our servers.</p>
            
            <h2 className="font-[family-name:var(--font-instrument)] text-3xl text-[#111] mt-12 mb-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at offlinelivingsupport@gmail.com.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
