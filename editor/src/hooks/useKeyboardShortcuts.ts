'use client';
import { useEffect } from 'react';
import { useEditorStore } from '@/store/useEditorStore';

export function useKeyboardShortcuts() {
  const { deleteSelectedElements } = useEditorStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if inside an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        deleteSelectedElements();
      }

      // Undo/Redo placeholders
      if (e.ctrlKey && e.key === 'z') {
        if (e.shiftKey) {
          console.log('Redo triggered');
        } else {
          console.log('Undo triggered');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [deleteSelectedElements]);
}
