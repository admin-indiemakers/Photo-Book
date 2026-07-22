'use client';
import React, { useState, useEffect } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PreviewMode({ onClose }: { onClose: () => void }) {
  const { pages, canvasSettings } = useEditorStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const PAGE_WIDTH = canvasSettings.width || 600;
  const PAGE_HEIGHT = canvasSettings.height || 800;

  useEffect(() => {
    // Initial auto-scale for mobile screens
    if (typeof window !== 'undefined') {
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.7; 
      const scaleForWidth = maxWidth / PAGE_WIDTH;
      const scaleForHeight = maxHeight / PAGE_HEIGHT;
      const optimalZoom = Math.min(scaleForWidth, scaleForHeight, 1);
      if (optimalZoom < 1) {
        setZoom(optimalZoom);
      }
    }
  }, [PAGE_WIDTH, PAGE_HEIGHT]);

  const goTo = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(pages.length - 1, index)));
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
      if (e.key === 'ArrowRight') goTo(currentIndex + 1);
      if (e.key === 'Home') goTo(0);
      if (e.key === 'End') goTo(pages.length - 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex, pages.length, onClose]);

  const page = pages[currentIndex];
  if (!page) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1a1a18] flex flex-col">
      {/* Top bar */}
      <div className="h-12 flex items-center justify-between px-4 bg-[#1a1a18]/90 border-b border-white/10 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-serif text-sm text-white/80">Preview</span>
          <span className="text-xs text-white/40 tabular-nums">
            {currentIndex + 1} / {pages.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white/60 hover:text-white"
            onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}>
            <ZoomOut size={14} />
          </Button>
          <span className="text-xs text-white/50 w-12 text-center tabular-nums">{Math.round(zoom * 100)}%</span>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white/60 hover:text-white"
            onClick={() => setZoom(Math.min(3, zoom + 0.25))}>
            <ZoomIn size={14} />
          </Button>
          <div className="w-px h-4 bg-white/10 mx-2" />
          <Button variant="ghost" size="icon" className="h-7 w-7 text-white/60 hover:text-white" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* Page display */}
      <div className="flex-1 flex items-center justify-center relative overflow-auto">
        {/* Navigation arrows */}
        <button
          className={`absolute left-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all ${
            currentIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'
          }`}
          onClick={() => goTo(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={20} className="text-white" />
        </button>

        <button
          className={`absolute right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all ${
            currentIndex === pages.length - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'
          }`}
          onClick={() => goTo(currentIndex + 1)}
          disabled={currentIndex === pages.length - 1}
        >
          <ChevronRight size={20} className="text-white" />
        </button>

        {/* Page canvas */}
        <div
          className="bg-white shadow-2xl shadow-black/40 transition-transform"
          style={{
            width: PAGE_WIDTH * zoom,
            height: PAGE_HEIGHT * zoom,
            transform: 'translate3d(0,0,0)',
          }}
        >
          <div
            style={{
              width: PAGE_WIDTH,
              height: PAGE_HEIGHT,
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              backgroundColor: page.background?.value || 'white',
              opacity: page.background?.opacity ?? 1,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {page.elements
              .filter(el => !el.hidden)
              .map((el) => (
                <div
                  key={el.id}
                  style={{
                    position: 'absolute',
                    left: el.x,
                    top: el.y,
                    width: el.width,
                    height: el.height,
                    transform: `rotate(${el.rotation || 0}deg)`,
                    opacity: el.opacity ?? 1,
                  }}
                >
                  {el.type === 'text' && (
                    <div
                      style={{
                        fontSize: el.fontSize || 16,
                        fontFamily: el.fontFamily || 'sans-serif',
                        color: el.fill || '#1a1a18',
                        fontWeight: el.fontStyle?.includes('bold') ? 'bold' : 'normal',
                        fontStyle: el.fontStyle?.includes('italic') ? 'italic' : 'normal',
                        textAlign: el.align || 'left',
                        lineHeight: el.lineHeight || 1.2,
                        letterSpacing: el.letterSpacing ? `${el.letterSpacing}px` : undefined,
                        width: '100%',
                        height: '100%',
                        wordBreak: 'break-word',
                        overflow: 'hidden',
                      }}
                    >
                      {el.text}
                    </div>
                  )}
                  {el.type === 'image' && el.src && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={el.src}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: el.cornerRadius || 0,
                        border: el.stroke ? `${el.strokeWidth || 1}px solid ${el.stroke}` : undefined,
                      }}
                    />
                  )}
                  {el.type === 'shape' && (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: el.fill || '#E85D26',
                        borderRadius: el.shapeType === 'circle' ? '50%' : (el.cornerRadius || 0),
                        border: el.stroke ? `${el.strokeWidth || 1}px solid ${el.stroke}` : undefined,
                        opacity: el.opacity ?? 1,
                      }}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Bottom page thumbnails - horizontal scrolling */}
      <div className="h-16 flex items-center gap-2 px-4 bg-[#1a1a18]/90 border-t border-white/10 shrink-0 overflow-x-auto no-scrollbar justify-start sm:justify-center">
        {pages.map((p, i) => (
          <button
            key={p.id}
            className={`w-10 h-12 rounded border-2 transition-all flex shrink-0 items-center justify-center text-[10px] ${
              i === currentIndex
                ? 'border-[#E85D26] bg-white/10 text-[#E85D26] font-bold'
                : 'border-white/10 hover:border-white/30 text-white/40'
            }`}
            onClick={() => goTo(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
