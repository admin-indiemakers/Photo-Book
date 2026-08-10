"use client";

import { ScrapbookNavbar, ScrapbookFooter } from '@/components/ui/landingpage';
import { FrameProductPage } from '@/components/FrameProductPage';

export default function FramePage() {
  return (
    <main className="min-h-screen bg-[#F8F3EA] text-[#3A342D] relative">
      <div className="grain-overlay" />
      <ScrapbookNavbar />
      <FrameProductPage />
      <ScrapbookFooter />
    </main>
  );
}
