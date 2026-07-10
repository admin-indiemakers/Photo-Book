'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Undo, Redo, ZoomIn, ZoomOut, Download, Grid, Maximize } from 'lucide-react';
import { useEditorStore } from '@/store/useEditorStore';

export default function TopToolbar() {
  const { toggleGrid, canvasSettings } = useEditorStore();

  return (
    <header className="h-14 flex items-center justify-between px-4 bg-[#FFFFFF] border-b border-[#e8e2d9] shadow-sm z-20 shrink-0">
      <div className="flex items-center gap-4">
        <div className="font-serif text-xl font-bold text-[#E85D26]">MEMORIZE.</div>
        <div className="h-4 w-[1px] bg-[#e8e2d9]" />
        <span className="text-sm font-medium text-[#6b6560]">Untitled Project</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6b6560] hover:text-[#E85D26]"><Undo size={16} /></Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6b6560] hover:text-[#E85D26]"><Redo size={16} /></Button>
        <div className="h-4 w-[1px] bg-[#e8e2d9] mx-2" />
        
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6b6560] hover:text-[#E85D26]"><ZoomOut size={16} /></Button>
        <span className="text-xs font-medium w-10 text-center">100%</span>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6b6560] hover:text-[#E85D26]"><ZoomIn size={16} /></Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#6b6560] hover:text-[#E85D26]"><Maximize size={16} /></Button>
        
        <div className="h-4 w-[1px] bg-[#e8e2d9] mx-2" />
        <Button 
          variant={canvasSettings.showGrid ? "secondary" : "ghost"} 
          size="icon" 
          className="h-8 w-8 text-[#6b6560] hover:text-[#E85D26]"
          onClick={toggleGrid}
        >
          <Grid size={16} />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" className="h-9 text-xs font-semibold tracking-wider uppercase border-[#e8e2d9] hover:border-[#E85D26] hover:text-[#E85D26]">Preview</Button>
        <Button disabled className="h-9 text-xs font-semibold tracking-wider uppercase bg-[#E85D26] hover:bg-[#D4520A] text-white">
          <Download size={14} className="mr-2" /> Export
        </Button>
      </div>
    </header>
  );
}
