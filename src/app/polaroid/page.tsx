"use client";

import { ScrapbookNavbar, ScrapbookFooter } from '@/components/ui/landingpage';
import { PolaroidProductPage } from '@/components/PolaroidProductPage';

export default function PolaroidPage() {
  return (
    <main className="min-h-screen bg-[#F8F3EA] text-[#3A342D] relative">
      <div className="grain-overlay" />
      <ScrapbookNavbar />
      <PolaroidProductPage />
      <ScrapbookFooter />
    </main>
  );
}
