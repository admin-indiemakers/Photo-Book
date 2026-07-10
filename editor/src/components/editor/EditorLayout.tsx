'use client';

import React, { useState } from 'react';
import TopToolbar from './TopToolbar';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import BottomStrip from './BottomStrip';
import ContextMenu from './ContextMenu';
import dynamic from 'next/dynamic';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

const CanvasWorkspace = dynamic(() => import('./CanvasWorkspace'), { ssr: false });
const PreviewMode = dynamic(() => import('./PreviewMode'), { ssr: false });
const ValidationPanel = dynamic(() => import('./ValidationPanel'), { ssr: false });

export default function EditorLayout() {
  useKeyboardShortcuts();
  const [showPreview, setShowPreview] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full bg-[#FAF6EE] text-[#1a1a18] overflow-hidden">
      {/* Top Toolbar */}
      <TopToolbar
        onPreview={() => setShowPreview(true)}
        onValidate={() => setShowValidation(true)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Center Workspace (Canvas) */}
        <main className="flex-1 relative overflow-hidden bg-[#f4efeb] border-x border-[#e8e2d9] shadow-inner">
          <CanvasWorkspace />
          
          {/* Bottom Page Strip */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
            <BottomStrip />
          </div>
        </main>

        {/* Right Sidebar (Properties) */}
        <RightSidebar />
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
