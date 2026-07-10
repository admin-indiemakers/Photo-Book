'use client';
import { useEffect } from 'react';
import { useEditorStore } from '@/store/useEditorStore';

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if inside an input/textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      const state = useEditorStore.getState();
      const isCtrl = e.ctrlKey || e.metaKey;

      // === Delete / Backspace ===
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        state.deleteSelectedElements();
        return;
      }

      // === Ctrl combos ===
      if (isCtrl) {
        switch (e.key.toLowerCase()) {
          case 'c':
            e.preventDefault();
            state.copySelectedElements();
            return;
          case 'v':
            e.preventDefault();
            state.pasteElements();
            return;
          case 'd':
            e.preventDefault();
            state.duplicateSelectedElements();
            return;
          case 'a':
            e.preventDefault();
            const page = state.pages.find(p => p.id === state.currentPageId);
            if (page) {
              state.setSelectedElements(page.elements.filter(el => !el.hidden).map(el => el.id));
            }
            return;
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              state.redo();
            } else {
              state.undo();
            }
            return;
          case 'y':
            e.preventDefault();
            state.redo();
            return;
          case ']':
            e.preventDefault();
            if (e.shiftKey) {
              state.bringToFront();
            } else {
              state.bringForward();
            }
            return;
          case '[':
            e.preventDefault();
            if (e.shiftKey) {
              state.sendToBack();
            } else {
              state.sendBackward();
            }
            return;
          case 'l':
            e.preventDefault();
            state.toggleLockSelected();
            return;
        }
      }

      // === Arrow keys ===
      const MOVE_SMALL = 1;
      const MOVE_LARGE = 10;
      const move = e.shiftKey ? MOVE_LARGE : MOVE_SMALL;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          state.moveSelected(-move, 0);
          return;
        case 'ArrowRight':
          e.preventDefault();
          state.moveSelected(move, 0);
          return;
        case 'ArrowUp':
          e.preventDefault();
          state.moveSelected(0, -move);
          return;
        case 'ArrowDown':
          e.preventDefault();
          state.moveSelected(0, move);
          return;
      }

      // === Escape to deselect ===
      if (e.key === 'Escape') {
        state.setSelectedElements([]);
        state.hideContextMenu();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
