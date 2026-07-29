import { HeaderNav, Footer } from '@/components/shared';
import { FridgeMagnetProductPage } from '@/components/FridgeMagnetProductPage';

export default function FridgeMagnetPage() {
  return (
    <main className="min-h-screen bg-[#F7F5F0]">
      <HeaderNav />
      <FridgeMagnetProductPage />
          <Footer />
    </main>
  );
}
