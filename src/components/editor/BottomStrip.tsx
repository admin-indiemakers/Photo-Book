'use client';
import React from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { Plus, Copy, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BottomStrip() {
  const { pages, currentSpreadIndex, goToNextSpread, goToPrevSpread, addPage } = useEditorStore();
  const totalSpreads = Math.ceil(pages.length / 2) + (pages.length % 2 === 0 ? 1 : 0); // approx

  return (
    <div className="pointer-events-auto mx-auto max-w-lg mb-6 bg-[#FFFFFF]/95 backdrop-blur-lg rounded-full shadow-xl border border-[#e8e2d9] p-3 flex items-center justify-between gap-4">
      {/* Spread navigation arrows */}
      <Button
        variant="ghost" size="icon"
        className="h-10 w-10 text-[#6b6560] hover:text-[#E85D26] hover:bg-[#FAF6EE] shrink-0 rounded-full"
        onClick={goToPrevSpread} disabled={currentSpreadIndex <= 0}
      >
        <ChevronLeft size={20} />
      </Button>

      {/* Spread indicator */}
      <div className="flex-1 text-center flex flex-col items-center">
        <span className="text-sm font-semibold text-[#1a1a18]">
          {currentSpreadIndex === 0 ? 'Cover' : `Spread ${currentSpreadIndex}`}
        </span>
        <span className="text-[10px] text-[#a09890] font-medium uppercase tracking-wider">
          {currentSpreadIndex === 0
            ? 'Front Cover'
            : `Pages ${(currentSpreadIndex - 1) * 2 + 1} - ${(currentSpreadIndex - 1) * 2 + 2}`}
        </span>
      </div>

      <Button
        variant="ghost" size="icon"
        className="h-10 w-10 text-[#6b6560] hover:text-[#E85D26] hover:bg-[#FAF6EE] shrink-0 rounded-full"
        onClick={goToNextSpread} disabled={currentSpreadIndex >= Math.ceil(pages.length / 2)}
      >
        <ChevronRight size={20} />
      </Button>

      {/* Add page */}
      <div className="h-8 w-px bg-[#e8e2d9]" />
      <Button
        variant="ghost"
        className="shrink-0 h-10 px-4 rounded-full text-[#6b6560] hover:text-[#E85D26] hover:bg-[#FAF6EE] transition-colors text-sm font-medium gap-2"
        onClick={addPage}
      >
        <Plus size={16} /> Add Pages
      </Button>
    </div>
  );
}
