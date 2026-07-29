import { HeaderNav, Footer } from '@/components/shared';
import { AcrylicFramesProductPage } from '@/components/AcrylicFramesProductPage';

export default function AcrylicFramesPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0]">
      <HeaderNav />
      <AcrylicFramesProductPage />
          <Footer />
    </main>
  );
}
