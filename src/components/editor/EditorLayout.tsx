'use client';

import React, { useState } from 'react';
import TopToolbar from './TopToolbar';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import BottomStrip from './BottomStrip';
import ContextMenu from './ContextMenu';
import dynamic from 'next/dynamic';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

import { useSearchParams } from 'next/navigation';
import { useEditorStore } from '@/store/useEditorStore';
import FloatingObjectToolbar from './FloatingObjectToolbar';
import { ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal, BookOpen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CanvasWorkspace = dynamic(() => import('./CanvasWorkspace'), { ssr: false });
const PreviewMode = dynamic(() => import('./PreviewMode'), { ssr: false });
const ValidationPanel = dynamic(() => import('./ValidationPanel'), { ssr: false });

export default function EditorLayout() {
  useKeyboardShortcuts();
  const searchParams = useSearchParams();
  const templateId = searchParams?.get('template');
  const { loadTemplate, isHydrated, currentSpreadIndex, pages, goToPrevSpread, goToNextSpread } = useEditorStore();

  React.useEffect(() => {
    if (isHydrated && templateId) {
      loadTemplate(templateId);
    }
  }, [templateId, loadTemplate, isHydrated]);

  const [showPreview, setShowPreview] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  
  // Mobile layout state
  const [mobileTab, setMobileTab] = useState<'left' | 'right' | 'pages' | null>(null);
  
  const selectedElementIds = useEditorStore(state => state.selectedElementIds);
  const [prevSelected, setPrevSelected] = useState(selectedElementIds);

  React.useEffect(() => {
    // Auto-switch to properties if an element is added while the 'Add' tab is open
    if (selectedElementIds.length > 0 && selectedElementIds !== prevSelected) {
      if (mobileTab === 'left') {
        setMobileTab('right');
      }
    }
    // Auto-close properties if user clicks empty canvas (deselects)
    if (selectedElementIds.length === 0 && mobileTab === 'right') {
      setMobileTab(null);
    }
    setPrevSelected(selectedElementIds);
  }, [selectedElementIds, mobileTab, prevSelected]);

  if (!isHydrated) {
    return (
      <div className="flex flex-col h-screen w-full bg-[#FAF6EE] text-[#1a1a18] items-center justify-center">
        <div className="animate-pulse text-lg font-editorial">Loading Book Editor...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-[#FAF6EE] text-[#1a1a18] overflow-hidden">
      {/* Top Toolbar */}
      <TopToolbar
        onPreview={() => setShowPreview(true)}
        onValidate={() => setShowValidation(true)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative bg-transparent">
        {/* Center Workspace (Canvas) */}
        <main className="flex-1 relative overflow-hidden bg-transparent">
          <CanvasWorkspace />

          <FloatingObjectToolbar />

          {/* Spread Navigation - Left */}
          <div className="absolute left-2 lg:left-[360px] top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <Button
              variant="outline"
              size="icon"
              className="pointer-events-auto h-12 w-12 rounded-full bg-white/90 backdrop-blur shadow-md hover:scale-110 transition-transform hover:bg-[#E85D26] hover:text-white border-[#e8e2d9] text-[#6b6560]"
              onClick={goToPrevSpread}
              disabled={currentSpreadIndex <= 0}
            >
              <ChevronLeft size={24} />
            </Button>
          </div>

          {/* Spread Navigation - Right */}
          <div className="absolute right-2 lg:right-[360px] top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <Button
              variant="outline"
              size="icon"
              className="pointer-events-auto h-12 w-12 rounded-full bg-white/90 backdrop-blur shadow-md hover:scale-110 transition-transform hover:bg-[#E85D26] hover:text-white border-[#e8e2d9] text-[#6b6560]"
              onClick={goToNextSpread}
              disabled={currentSpreadIndex >= Math.ceil(pages.length / 2)}
            >
              <ChevronRight size={24} />
            </Button>
          </div>

          {/* Bottom Page Strip */}
          <div className={`absolute bottom-20 lg:bottom-6 left-2 right-2 lg:left-[360px] lg:right-[360px] z-10 pointer-events-none flex justify-center transition-transform lg:translate-y-0 ${mobileTab === 'pages' ? 'translate-y-0' : 'translate-y-[200%] lg:translate-y-0'}`}>
            <div className="pointer-events-auto w-full bg-white/90 lg:bg-transparent backdrop-blur lg:backdrop-blur-none p-2 lg:p-0 rounded-2xl shadow-xl lg:shadow-none">
              <BottomStrip />
            </div>
          </div>
        </main>

        {/* Left Sidebar (Desktop Dock / Mobile Sheet) */}
        <div className={`fixed inset-x-0 bottom-16 h-[60vh] z-40 lg:h-auto lg:absolute lg:inset-auto lg:left-6 lg:top-6 lg:bottom-24 lg:w-80 lg:z-20 pointer-events-none transition-transform duration-300 lg:translate-y-0 ${mobileTab === 'left' ? 'translate-y-0' : 'translate-y-[150%] lg:translate-y-0'}`}>
          <div className="pointer-events-auto h-full w-full rounded-t-2xl lg:rounded-2xl overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:shadow-2xl bg-[#FAF6EE] flex flex-col">
            <div className="lg:hidden flex items-center justify-between p-3 border-b border-[#e8e2d9] bg-white">
              <span className="font-serif font-medium">Add Elements</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setMobileTab(null)}><X size={18}/></Button>
            </div>
            <div className="flex-1 overflow-hidden relative">
              <LeftSidebar />
            </div>
          </div>
        </div>

        {/* Right Sidebar (Desktop Dock / Mobile Sheet) */}
        <div className={`fixed inset-x-0 bottom-16 h-[60vh] z-40 lg:h-auto lg:absolute lg:inset-auto lg:right-6 lg:top-6 lg:bottom-24 lg:w-80 lg:z-20 pointer-events-none transition-transform duration-300 lg:translate-y-0 ${mobileTab === 'right' ? 'translate-y-0' : 'translate-y-[150%] lg:translate-y-0'}`}>
          <div className="pointer-events-auto h-full w-full rounded-t-2xl lg:rounded-2xl overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:shadow-2xl bg-[#FAF6EE] flex flex-col">
            <div className="lg:hidden flex items-center justify-between p-3 border-b border-[#e8e2d9] bg-white">
              <span className="font-serif font-medium">Properties</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setMobileTab(null)}><X size={18}/></Button>
            </div>
            <div className="flex-1 overflow-hidden relative">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden h-16 bg-white border-t border-[#e8e2d9] z-50 flex items-center justify-around px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setMobileTab(mobileTab === 'left' ? null : 'left')}
          className={`flex flex-col items-center gap-1 w-16 p-2 rounded-lg transition-colors ${mobileTab === 'left' ? 'text-[#E85D26]' : 'text-[#6b6560]'}`}
        >
          <LayoutGrid size={20} />
          <span className="text-[10px] font-medium">Add</span>
        </button>
        <button 
          onClick={() => setMobileTab(mobileTab === 'pages' ? null : 'pages')}
          className={`flex flex-col items-center gap-1 w-16 p-2 rounded-lg transition-colors ${mobileTab === 'pages' ? 'text-[#E85D26]' : 'text-[#6b6560]'}`}
        >
          <BookOpen size={20} />
          <span className="text-[10px] font-medium">Pages</span>
        </button>
        <button 
          onClick={() => setMobileTab(mobileTab === 'right' ? null : 'right')}
          className={`flex flex-col items-center gap-1 w-16 p-2 rounded-lg transition-colors ${mobileTab === 'right' ? 'text-[#E85D26]' : 'text-[#6b6560]'}`}
        >
          <SlidersHorizontal size={20} />
          <span className="text-[10px] font-medium">Props</span>
        </button>
      </div>

      {/* Context Menu (portal-like overlay) */}
      <ContextMenu />

      {/* Preview Mode */}
      {showPreview && <PreviewMode onClose={() => setShowPreview(false)} />}

      {/* Validation Panel */}
      {showValidation && <ValidationPanel onClose={() => setShowValidation(false)} />}
    </div>
  );
}
