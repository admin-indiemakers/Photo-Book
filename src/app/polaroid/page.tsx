import { HeaderNav, Footer } from '@/components/shared';
import { PolaroidProductPage } from '@/components/PolaroidProductPage';

export default function PolaroidPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0]">
      <HeaderNav />
      <PolaroidProductPage />
          <Footer />
    </main>
  );
}
