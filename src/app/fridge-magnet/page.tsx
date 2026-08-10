"use client";

import { ScrapbookNavbar, ScrapbookFooter } from '@/components/ui/landingpage';
import { FridgeMagnetProductPage } from '@/components/FridgeMagnetProductPage';

export default function FridgeMagnetPage() {
  return (
    <main className="min-h-screen bg-[#F8F3EA] text-[#3A342D] relative">
      <div className="grain-overlay" />
      <ScrapbookNavbar />
      <FridgeMagnetProductPage />
      <ScrapbookFooter />
    </main>
  );
}
