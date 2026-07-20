'use client';
import React from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { Button } from '@/components/ui/button';
import { CopyPlus, Trash2, ArrowUp, ArrowDown, Crop, Edit3 } from 'lucide-react';

export default function FloatingObjectToolbar() {
  const {
    selectedElementIds,
    pages,
    currentPageId,
    duplicateSelectedElements,
    deleteSelectedElements,
    bringForward,
    sendBackward,
  } = useEditorStore();

  const currentPage = pages.find(p => p.id === currentPageId);
  const selectedElement = selectedElementIds.length === 1 && currentPage
    ? currentPage.elements.find(el => el.id === selectedElementIds[0])
    : null;

  if (!selectedElement) return null;

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-full animate-in slide-in-from-top-4 fade-in duration-300">
        
        {/* Contextual label based on selected element type */}
        <div className="px-3 flex items-center border-r border-black/5 mr-1">
          <span className="text-[11px] font-semibold text-black/60 uppercase tracking-widest">
            {selectedElement.type === 'text' && 'Text'}
            {selectedElement.type === 'image' && 'Image'}
            {selectedElement.type === 'shape' && 'Shape'}
          </span>
        </div>

        <Button
          variant="ghost" size="icon"
          className="h-8 w-8 text-black/60 hover:text-black hover:bg-black/5 rounded-full"
          title="Duplicate"
          onClick={duplicateSelectedElements}
        >
          <CopyPlus size={15} />
        </Button>
        <Button
          variant="ghost" size="icon"
          className="h-8 w-8 text-black/60 hover:text-black hover:bg-black/5 rounded-full"
          title="Bring Forward"
          onClick={bringForward}
        >
          <ArrowUp size={15} />
        </Button>
        <Button
          variant="ghost" size="icon"
          className="h-8 w-8 text-black/60 hover:text-black hover:bg-black/5 rounded-full"
          title="Send Backward"
          onClick={sendBackward}
        >
          <ArrowDown size={15} />
        </Button>

        {selectedElement.type === 'image' && (
          <Button
            variant="ghost" size="icon"
            className="h-8 w-8 text-black/60 hover:text-[#E85D26] hover:bg-[#E85D26]/10 rounded-full ml-1 border border-transparent"
            title="Crop (Pro)"
          >
            <Crop size={15} />
          </Button>
        )}

        <div className="h-5 w-px bg-black/10 mx-1" />

        <Button
          variant="ghost" size="icon"
          className="h-8 w-8 text-red-500/70 hover:text-red-600 hover:bg-red-50 rounded-full"
          title="Delete"
          onClick={deleteSelectedElements}
        >
          <Trash2 size={15} />
        </Button>
      </div>
    </div>
  );
}
