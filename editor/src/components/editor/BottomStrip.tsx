'use client';
import React from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { Plus, Copy, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BottomStrip() {
  const { pages, currentPageId, setCurrentPage, addPage } = useEditorStore();
  const currentIndex = pages.findIndex(p => p.id === currentPageId);

  const goToPrev = () => {
    if (currentIndex > 0) setCurrentPage(pages[currentIndex - 1].id);
  };
  const goToNext = () => {
    if (currentIndex < pages.length - 1) setCurrentPage(pages[currentIndex + 1].id);
  };

  return (
    <div className="pointer-events-auto mx-auto max-w-4xl mb-4 bg-[#FFFFFF]/95 backdrop-blur-lg rounded-xl shadow-lg border border-[#e8e2d9] p-2 flex items-center gap-2">
      {/* Page navigation arrows */}
      <Button
        variant="ghost" size="icon"
        className="h-8 w-8 text-[#6b6560] hover:text-[#E85D26] shrink-0"
        onClick={goToPrev} disabled={currentIndex <= 0}
      >
        <ChevronLeft size={16} />
      </Button>

      {/* Scrollable page list */}
      <div className="flex-1 overflow-x-auto flex items-center gap-2 scrollbar-none">
        {pages.map((page, index) => (
          <div
            key={page.id}
            onClick={() => setCurrentPage(page.id)}
            className={`relative group shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
              currentPageId === page.id
                ? 'border-[#E85D26] shadow-md shadow-[#E85D26]/20 scale-105'
                : 'border-transparent hover:border-[#e8e2d9] bg-[#f4efeb]'
            }`}
          >
            {/* Page number */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-xs font-semibold ${
                currentPageId === page.id ? 'text-[#E85D26]' : 'text-[#6b6560]'
              }`}>
                {index + 1}
              </span>
            </div>

            {/* Element count badge */}
            {page.elements.length > 0 && (
              <div className="absolute bottom-0.5 right-0.5 bg-[#1a1a18]/60 text-white text-[8px] px-1 rounded-sm font-medium">
                {page.elements.length}
              </div>
            )}

            {/* Hover Actions */}
            <div className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 flex gap-0.5 transition-opacity z-10">
              <button
                className="bg-white/90 p-0.5 rounded shadow-sm text-[#6b6560] hover:text-[#E85D26] transition-colors"
                onClick={(e) => { e.stopPropagation(); useEditorStore.getState().duplicatePage(page.id); }}
                title="Duplicate page"
              >
                <Copy size={10} />
              </button>
              <button
                className="bg-white/90 p-0.5 rounded shadow-sm text-[#6b6560] hover:text-red-500 transition-colors"
                onClick={(e) => { e.stopPropagation(); useEditorStore.getState().deletePage(page.id); }}
                title="Delete page"
              >
                <Trash2 size={10} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost" size="icon"
        className="h-8 w-8 text-[#6b6560] hover:text-[#E85D26] shrink-0"
        onClick={goToNext} disabled={currentIndex >= pages.length - 1}
      >
        <ChevronRight size={16} />
      </Button>

      {/* Add page */}
      <div className="h-6 w-px bg-[#e8e2d9]" />
      <Button
        variant="ghost"
        className="shrink-0 h-10 px-3 rounded-md text-[#6b6560] hover:text-[#E85D26] hover:bg-[#FAF6EE] transition-colors text-xs font-medium gap-1.5"
        onClick={addPage}
      >
        <Plus size={14} /> Add Page
      </Button>

      {/* Page indicator */}
      <div className="text-[10px] text-[#a09890] font-medium tabular-nums shrink-0">
        {currentIndex + 1} / {pages.length}
      </div>
    </div>
  );
}
