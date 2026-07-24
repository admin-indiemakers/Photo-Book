'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Undo, Redo, ZoomIn, ZoomOut, Grid, Maximize, Ruler, Magnet, Save, AlignHorizontalJustifyCenter } from 'lucide-react';
import { useEditorStore } from '@/store/useEditorStore';
interface TopToolbarProps {
  onPreview?: () => void;
  onValidate?: () => void;
}

export default function TopToolbar({ onPreview, onValidate }: TopToolbarProps) {
  const {
    toggleGrid, canvasSettings, setZoom,
    undo, redo, canUndo, canRedo,
    toggleRulers, toggleSnapToObjects, toggleSnapToGrid,
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
    <header className="h-14 flex items-center justify-between px-2 lg:px-4 bg-[#FFFFFF] border-b border-[#e8e2d9] shadow-sm z-20 shrink-0 gap-1 w-full overflow-hidden">
      <div className="flex items-center gap-2 lg:gap-4 shrink-0">
        <a href="/" className="hover:opacity-80 transition-opacity flex items-center shrink-0">
          <img src="/images/logoo1.png" alt="Offline Living Logo" className="h-8 object-contain" />
        </a>
        <div className="h-4 w-[1px] bg-[#e8e2d9] hidden lg:block" />
        <span className="text-sm font-medium text-[#6b6560] hidden lg:inline-block truncate">Untitled Project</span>
        {saveStatus === 'saving' && (
          <span className="text-[10px] text-[#a09890] animate-pulse">Saving...</span>
        )}
        {saveStatus === 'saved' && lastSavedAt && (
          <span className="text-[10px] text-green-600">✓ Saved {timeAgo}</span>
        )}
        {saveStatus === 'error' && (
          <span className="text-[10px] text-red-600">⚠ Save failed</span>
        )}
      </div>

      <div className="hidden lg:flex items-center gap-4 border border-[#e8e2d9] rounded-md px-2 bg-[#FAF6EE] shrink-0">
        <span className="text-[10px] font-semibold text-[#a09890] uppercase tracking-wider">Size:</span>
        <select
          className="text-xs text-[#1a1a18] bg-transparent outline-none cursor-pointer py-1.5 focus:ring-0"
          value={`${canvasSettings.width || 600}x${canvasSettings.height || 800}`}
          onChange={(e) => {
            const val = e.target.value;
            const label = e.target.options[e.target.selectedIndex].text;
            if (val === '600x800') useEditorStore.getState().setCanvasSize(600, 800, label);
            if (val === '800x600') useEditorStore.getState().setCanvasSize(800, 600, label);
            if (val === '800x800') useEditorStore.getState().setCanvasSize(800, 800, label);
            if (val === '595x842') useEditorStore.getState().setCanvasSize(595, 842, label);
            if (val === '842x595') useEditorStore.getState().setCanvasSize(842, 595, label);
          }}
        >
          <option value="600x800">Portrait (6x8)</option>
          <option value="800x600">Landscape (8x6)</option>
          <option value="800x800">Square (8x8)</option>
          <option value="595x842">A4 Portrait</option>
          <option value="842x595">A4 Landscape</option>
        </select>
      </div>

      <div className="hidden md:flex items-center gap-1 bg-[#FAF6EE] p-1 rounded-lg border border-[#e8e2d9]">
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
                  className={`w-full px-3 py-1.5 text-xs text-left hover:bg-[#f4efeb] transition-colors ${zoomPercent === preset ? 'text-[#E85D26] font-semibold' : 'text-[#1a1a18]'
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
          variant="ghost"
          size="icon"
          className={`h-8 w-8 transition-colors ${canvasSettings.showRulers ? 'bg-[#E85D26] text-white hover:bg-[#D4520A]' : 'text-[#6b6560] hover:bg-[#f4efeb] hover:text-[#E85D26]'}`}
          onClick={toggleRulers}
          title="Toggle Rulers"
        >
          <Ruler size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 transition-colors ${canvasSettings.showGrid ? 'bg-[#E85D26] text-white hover:bg-[#D4520A]' : 'text-[#6b6560] hover:bg-[#f4efeb] hover:text-[#E85D26]'}`}
          onClick={toggleGrid}
          title="Toggle Grid"
        >
          <Grid size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 transition-colors ${canvasSettings.snapToGrid ? 'bg-[#E85D26] text-white hover:bg-[#D4520A]' : 'text-[#6b6560] hover:bg-[#f4efeb] hover:text-[#E85D26]'}`}
          onClick={toggleSnapToGrid}
          title="Snap to Grid"
        >
          <AlignHorizontalJustifyCenter size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`h-8 w-8 transition-colors ${canvasSettings.snapToObjects ? 'bg-[#E85D26] text-white hover:bg-[#D4520A]' : 'text-[#6b6560] hover:bg-[#f4efeb] hover:text-[#E85D26]'}`}
          onClick={toggleSnapToObjects}
          title="Toggle Snap to Objects"
        >
          <Magnet size={16} />
        </Button>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-auto">
        <Button onClick={onPreview} variant="outline" className="h-8 lg:h-9 px-2 lg:px-4 text-[10px] lg:text-xs font-semibold tracking-wider uppercase border-[#e8e2d9] hover:border-[#E85D26] hover:text-[#E85D26]">Preview</Button>
        <Button
          onClick={async () => {
            try {
              useEditorStore.getState().setSaveStatus('saving');
              const { supabase } = await import('@/lib/supabase');
              const { data: { session } } = await supabase.auth.getSession();
              if (!session?.user) {
                alert('Please login to continue');
                window.location.href = '/login';
                return;
              }

              const pagesData = useEditorStore.getState().pages;

              const { addToCart } = await import('@/app/actions/cart');
              // Assuming a generic product ID for Photo Book, or we can just pass a dummy one if not strict
              // A real app would query the products table for the 'Photo Book' product ID.
              const { data: products } = await supabase.from('products').select('id').eq('category', 'photo_book').limit(1);
              const productId = products?.[0]?.id || 'default-photobook-id';

              const res = await addToCart(session.user.id, productId, 1, { pdfData: pagesData, type: 'photobook_pdf' }, 1500);

              if (res.success) {
                useEditorStore.getState().setSaveStatus('saved');
                window.location.href = '/cart';
              } else {
                throw new Error(res.error);
              }
            } catch (e: any) {
              console.error(e);
              useEditorStore.getState().setSaveStatus('error');
              alert('Failed to save to cart: ' + e.message);
            }
          }}
          className="h-8 lg:h-9 px-2 lg:px-4 text-[10px] lg:text-xs font-semibold tracking-wider uppercase bg-[#E85D26] hover:bg-[#D4520A] text-white"
        >
          <Save size={14} className="mr-1 lg:mr-2 shrink-0" /> 
          <span className="hidden sm:inline">Save & Continue</span>
          <span className="sm:hidden">Save</span>
        </Button>
      </div>
    </header>
  );
}
