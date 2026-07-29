import { HeaderNav, Footer } from '@/components/shared';
import { FrameProductPage } from '@/components/FrameProductPage';

export default function FramePage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0]">
      <HeaderNav />
      <FrameProductPage />
          <Footer />
    </main>
  );
}
