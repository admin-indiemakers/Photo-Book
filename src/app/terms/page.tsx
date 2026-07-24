import { Footer, HeaderNav } from "@/components/shared";

export default function TermsOfServicePage() {
  return (
    <main className="bg-white min-h-screen text-[#111111] font-sans selection:bg-[#EAEAEA] selection:text-[#111]">
      <HeaderNav />
      
      <section className="pt-40 pb-32 px-6 md:px-12 flex justify-center">
        <div className="max-w-[800px] w-full">
          <h1 className="font-[family-name:var(--font-instrument)] text-5xl md:text-6xl mb-12 text-[#111]">Terms & Conditions</h1>
          
          <div className="space-y-8 text-[#333] leading-relaxed font-light">
            <p><strong>Last Updated: July 24, 2026</strong></p>
            
            <p>Welcome to Offline Living. By accessing our website and using our services, you agree to be bound by the following Terms and Conditions.</p>
            
            <h2 className="font-[family-name:var(--font-instrument)] text-3xl text-[#111] mt-12 mb-4">1. Services</h2>
            <p>Offline Living provides a platform for users to design, customize, and order printed photobooks and related products. We reserve the right to modify or discontinue the service at any time.</p>
            
            <h2 className="font-[family-name:var(--font-instrument)] text-3xl text-[#111] mt-12 mb-4">2. User Content</h2>
            <p>You retain all rights to the images and content you upload. By uploading content, you guarantee that you own the rights to the images or have obtained necessary permissions. You agree not to upload any content that is illegal, offensive, or violates intellectual property rights. We reserve the right to refuse to print any material that violates these terms.</p>

            <h2 className="font-[family-name:var(--font-instrument)] text-3xl text-[#111] mt-12 mb-4">3. Orders and Payments</h2>
            <p>All orders are subject to acceptance and availability. Prices are subject to change without notice. Payment is required in full at the time of placing the order. Because our products are custom-made, orders cannot be cancelled once production has begun.</p>
            
            <h2 className="font-[family-name:var(--font-instrument)] text-3xl text-[#111] mt-12 mb-4">4. Shipping and Returns</h2>
            <p>We strive to deliver your physical artifacts in pristine condition. If your product arrives damaged or contains a manufacturing defect, please contact us within 7 days of receipt for a replacement. Due to the custom nature of our products, we do not accept returns for user errors (such as typos or low-resolution images).</p>
            
            <h2 className="font-[family-name:var(--font-instrument)] text-3xl text-[#111] mt-12 mb-4">5. Limitation of Liability</h2>
            <p>Offline Living shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our services.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
