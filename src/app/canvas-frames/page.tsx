"use client";

import { ScrapbookNavbar, ScrapbookFooter } from '@/components/ui/landingpage';
import { CanvasFramesProductPage } from '@/components/CanvasFramesProductPage';

export default function CanvasFramesPage() {
  return (
    <main className="min-h-screen bg-[#F8F3EA] text-[#3A342D] relative">
      <div className="grain-overlay" />
      <ScrapbookNavbar />
      <CanvasFramesProductPage />
      <ScrapbookFooter />
    </main>
  );
}
