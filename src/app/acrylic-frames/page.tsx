"use client";

import { ScrapbookNavbar, ScrapbookFooter } from '@/components/ui/landingpage';
import { AcrylicFramesProductPage } from '@/components/AcrylicFramesProductPage';

export default function AcrylicFramesPage() {
  return (
    <main className="min-h-screen bg-[#F8F3EA] text-[#3A342D] relative">
      <div className="grain-overlay" />
      <ScrapbookNavbar />
      <AcrylicFramesProductPage />
      <ScrapbookFooter />
    </main>
  );
}
