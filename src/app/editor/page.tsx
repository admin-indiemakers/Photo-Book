import React, { Suspense } from 'react';
import EditorLayout from '@/components/editor/EditorLayout';

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-[#FAF6EE]">
      <Suspense fallback={
        <div className="flex flex-col h-full w-full items-center justify-center text-[#1a1a18]">
          <div className="animate-pulse text-lg font-editorial">Loading Book Editor...</div>
        </div>
      }>
        <EditorLayout />
      </Suspense>
    </main>
  );
}
