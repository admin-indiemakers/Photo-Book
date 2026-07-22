'use client';
import React, { useRef, useEffect } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BottomStrip() {
  const { pages, currentSpreadIndex, currentPageId, addPage } = useEditorStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Group pages into spreads
  const spreads: { left?: any, right?: any, index: number }[] = [];
  
  if (pages.length > 0) {
    // Spread 0: Cover (Right page only)
    spreads.push({ right: pages[0], index: 0 });
    
    // Spread 1+: Internal pages
    for (let i = 1; i < pages.length; i += 2) {
      spreads.push({
        left: pages[i],
        right: pages[i + 1], // might be undefined if odd number of pages
        index: Math.ceil(i / 2)
      });
    }
  }

  // Scroll to active spread on mount or spread change
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector(`[data-spread-index="${currentSpreadIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [currentSpreadIndex]);

  const handlePageClick = (pageId: string, spreadIndex: number) => {
    const store = useEditorStore.getState();
    store.setCurrentPage(pageId);
    
    // Also update spread index so we navigate to it
    if (store.currentSpreadIndex !== spreadIndex) {
      useEditorStore.setState({ currentSpreadIndex: spreadIndex });
    }
  };

  return (
    <div className="pointer-events-auto mx-auto w-full max-w-4xl mb-2 bg-[#FFFFFF]/95 backdrop-blur-lg rounded-xl shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] border border-[#e8e2d9] p-3 flex items-center gap-4">
      
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-x-auto flex items-center gap-4 px-2 py-1 snap-x no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {spreads.map((spread) => {
          const isActiveSpread = currentSpreadIndex === spread.index;
          return (
            <div 
              key={`spread-${spread.index}`} 
              data-spread-index={spread.index}
              className="flex gap-0.5 shrink-0 snap-center items-center justify-center relative"
            >
              {/* Spread Label */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] font-semibold text-[#a09890] uppercase tracking-wider whitespace-nowrap">
                {spread.index === 0 ? 'Cover' : `Spread ${spread.index}`}
              </div>

              {/* Left Page (if exists) */}
              {spread.left ? (
                <button
                  onClick={() => handlePageClick(spread.left.id, spread.index)}
                  className={`w-10 h-14 bg-[#FAF6EE] shadow-sm flex items-center justify-center transition-all 
                    ${currentPageId === spread.left.id ? 'ring-2 ring-[#E85D26] ring-inset bg-white z-10' : 'border border-[#d2cec5] hover:border-[#E85D26]'}
                    rounded-l-sm`}
                >
                  <span className="text-[10px] text-[#6b6560] font-medium">{pages.findIndex(p => p.id === spread.left.id) + 1}</span>
                </button>
              ) : (
                <div className="w-10 h-14 bg-transparent" />
              )}

              {/* Right Page (if exists) */}
              {spread.right && (
                <button
                  onClick={() => handlePageClick(spread.right.id, spread.index)}
                  className={`w-10 h-14 bg-[#FAF6EE] shadow-sm flex items-center justify-center transition-all 
                    ${currentPageId === spread.right.id ? 'ring-2 ring-[#E85D26] ring-inset bg-white z-10' : 'border border-[#d2cec5] hover:border-[#E85D26]'}
                    ${spread.left ? 'rounded-r-sm' : 'rounded-sm'}`}
                >
                  <span className="text-[10px] text-[#6b6560] font-medium">{pages.findIndex(p => p.id === spread.right.id) + 1}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Add pages button */}
      <div className="h-8 w-px bg-[#e8e2d9] shrink-0" />
      <Button
        variant="ghost"
        className="shrink-0 h-10 px-4 rounded-xl text-[#6b6560] hover:text-[#E85D26] hover:bg-[#FAF6EE] transition-colors text-sm font-medium gap-2"
        onClick={addPage}
      >
        <Plus size={16} /> Add Pages
      </Button>

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}
