'use client';
import React from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { Plus, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BottomStrip() {
  const { pages, currentPageId, setCurrentPage, addPage } = useEditorStore();

  return (
    <div className="pointer-events-auto mx-auto max-w-3xl mb-4 bg-[#FFFFFF] rounded-xl shadow-lg border border-[#e8e2d9] p-2 flex items-center gap-2 overflow-x-auto">
      {pages.map((page, index) => (
        <div 
          key={page.id}
          onClick={() => setCurrentPage(page.id)}
          className={`relative group shrink-0 w-24 h-16 rounded-md overflow-hidden border-2 cursor-pointer transition-colors ${currentPageId === page.id ? 'border-[#E85D26]' : 'border-transparent hover:border-[#e8e2d9] bg-[#f4efeb]'}`}
        >
          <div className="absolute inset-0 flex items-center justify-center text-xs text-[#6b6560] font-medium">
            {index + 1}
          </div>
          
          {/* Hover Actions */}
          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 flex flex-col gap-1 transition-opacity z-10">
            <button 
              className="bg-white p-1 rounded shadow text-[#6b6560] hover:text-[#E85D26]"
              onClick={(e) => { e.stopPropagation(); useEditorStore.getState().duplicatePage(page.id); }}
            >
              <Copy size={12} />
            </button>
            <button 
              className="bg-white p-1 rounded shadow text-[#6b6560] hover:text-red-500"
              onClick={(e) => { e.stopPropagation(); useEditorStore.getState().deletePage(page.id); }}
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      ))}
      
      <Button 
        variant="outline" 
        className="shrink-0 w-12 h-16 rounded-md border-dashed border-[#e8e2d9] text-[#6b6560] hover:text-[#E85D26] hover:border-[#E85D26] bg-transparent"
        onClick={addPage}
      >
        <Plus size={20} />
      </Button>
    </div>
  );
}
