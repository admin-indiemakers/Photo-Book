import { HeaderNav, Footer } from '@/components/shared';
import { CanvasFramesProductPage } from '@/components/CanvasFramesProductPage';

export default function CanvasFramesPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0]">
      <HeaderNav />
      <CanvasFramesProductPage />
          <Footer />
    </main>
  );
}
