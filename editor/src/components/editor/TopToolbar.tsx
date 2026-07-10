'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Undo, Redo, ZoomIn, ZoomOut, Download, Grid, Maximize, Ruler, Magnet, Save } from 'lucide-react';
import { useEditorStore } from '@/store/useEditorStore';

export default function TopToolbar() {
  const {
    toggleGrid, canvasSettings, setZoom,
    undo, redo, canUndo, canRedo,
    toggleRulers, toggleSnapToObjects,
    saveStatus, lastSavedAt,
  } = useEditorStore();

  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (!lastSavedAt) return;
    const update = () => {
      const diff = Math.floor((Date.now() - lastSavedAt) / 1000);
      if (diff < 5) setTimeAgo('just now');
      else if (diff < 60) setTimeAgo(`${diff}s ago`);
      else setTimeAgo(`${Math.floor(diff / 60)}m ago`);
    };
    update();
    const interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, [lastSavedAt]);

  const zoomPercent = Math.round(canvasSettings.zoom * 100);

  const zoomPresets = [25, 50, 75, 100, 150, 200];
  const [showZoomMenu, setShowZoomMenu] = useState(false);

  return (
    <header className="h-14 flex items-center justify-between px-4 bg-[#FFFFFF] border-b border-[#e8e2d9] shadow-sm z-20 shrink-0">
      <div className="flex items-center gap-4">
        <a href="/" className="font-serif text-xl font-bold text-[#E85D26] hover:opacity-80 transition-opacity">MEMORIZE.</a>
        <div className="h-4 w-[1px] bg-[#e8e2d9]" />
        <span className="text-sm font-medium text-[#6b6560]">Untitled Project</span>
        {saveStatus === 'saving' && (
          <span className="text-[10px] text-[#a09890] animate-pulse">Saving...</span>
        )}
        {saveStatus === 'saved' && lastSavedAt && (
          <span className="text-[10px] text-green-600">✓ Saved {timeAgo}</span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost" size="icon"
          className={`h-8 w-8 ${canUndo() ? 'text-[#6b6560] hover:text-[#E85D26]' : 'text-[#d4cfc9] cursor-not-allowed'}`}
          onClick={undo}
          disabled={!canUndo()}
          title="Undo (Ctrl+Z)"
        >
          <Undo size={16} />
        </Button>
        <Button
          variant="ghost" size="icon"
          className={`h-8 w-8 ${canRedo() ? 'text-[#6b6560] hover:text-[#E85D26]' : 'text-[#d4cfc9] cursor-not-allowed'}`}
          onClick={redo}
          disabled={!canRedo()}
          title="Redo (Ctrl+Shift+Z)"
        >
          <Redo size={16} />
        </Button>

        <div className="h-4 w-[1px] bg-[#e8e2d9] mx-1" />

        <Button
          variant="ghost" size="icon"
          className="h-8 w-8 text-[#6b6560] hover:text-[#E85D26]"
          onClick={() => setZoom(Math.max(0.1, canvasSettings.zoom / 1.2))}
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </Button>

        <div className="relative">
          <button
            className="text-xs font-medium w-14 text-center hover:bg-[#f4efeb] rounded py-1 transition-colors"
            onClick={() => setShowZoomMenu(!showZoomMenu)}
          >
            {zoomPercent}%
          </button>
          {showZoomMenu && (
            <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white border border-[#e8e2d9] rounded-lg shadow-lg py-1 z-50 min-w-[80px]">
              {zoomPresets.map(preset => (
                <button
                  key={preset}
                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-[#f4efeb] transition-colors ${
                    zoomPercent === preset ? 'text-[#E85D26] font-semibold' : 'text-[#1a1a18]'
                  }`}
                  onClick={() => { setZoom(preset / 100); setShowZoomMenu(false); }}
                >
                  {preset}%
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          variant="ghost" size="icon"
          className="h-8 w-8 text-[#6b6560] hover:text-[#E85D26]"
          onClick={() => setZoom(Math.min(5, canvasSettings.zoom * 1.2))}
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </Button>
        <Button
          variant="ghost" size="icon"
          className="h-8 w-8 text-[#6b6560] hover:text-[#E85D26]"
          onClick={() => setZoom(1)}
          title="Fit to 100%"
        >
          <Maximize size={16} />
        </Button>

        <div className="h-4 w-[1px] bg-[#e8e2d9] mx-1" />

        <Button
          variant={canvasSettings.showGrid ? "secondary" : "ghost"}
          size="icon"
          className="h-8 w-8 text-[#6b6560] hover:text-[#E85D26]"
          onClick={toggleGrid}
          title="Toggle Grid"
        >
          <Grid size={16} />
        </Button>
        <Button
          variant={canvasSettings.snapToObjects ? "secondary" : "ghost"}
          size="icon"
          className="h-8 w-8 text-[#6b6560] hover:text-[#E85D26]"
          onClick={toggleSnapToObjects}
          title="Toggle Snap to Objects"
        >
          <Magnet size={16} />
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
