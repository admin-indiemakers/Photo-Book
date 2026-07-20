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

const CanvasWorkspace = dynamic(() => import('./CanvasWorkspace'), { ssr: false });
const PreviewMode = dynamic(() => import('./PreviewMode'), { ssr: false });
const ValidationPanel = dynamic(() => import('./ValidationPanel'), { ssr: false });

export default function EditorLayout() {
  useKeyboardShortcuts();
  const searchParams = useSearchParams();
  const templateId = searchParams?.get('template');
  const { loadTemplate, isHydrated } = useEditorStore();

  React.useEffect(() => {
    if (isHydrated && templateId) {
      loadTemplate(templateId);
    }
  }, [templateId, loadTemplate, isHydrated]);

  const [showPreview, setShowPreview] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

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

          {/* Bottom Page Strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <BottomStrip />
          </div>
        </main>

        {/* Floating Left Dock */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="pointer-events-auto">
            <LeftSidebar />
          </div>
        </div>

        {/* Floating Right Inspector */}
        <div className="absolute right-6 top-6 bottom-24 z-20 pointer-events-none">
          <div className="pointer-events-auto h-full">
            <RightSidebar />
          </div>
        </div>
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
