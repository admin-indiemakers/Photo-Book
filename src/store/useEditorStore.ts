'use client';
import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { get, set as idbSet, del } from 'idb-keyval';

export type ElementType = 'image' | 'text' | 'shape';

export interface EditorElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  locked: boolean;
  hidden?: boolean;
  [key: string]: any; // Specific properties for text/image/shape
}

export interface Page {
  id: string;
  name: string;
  elements: EditorElement[];
  background?: {
    type: 'solid' | 'gradient' | 'image';
    value: string; // color hex, gradient css, or image url
    opacity?: number;
  };
}

interface CanvasSettings {
  zoom: number;
  panX: number;
  panY: number;
  showGrid: boolean;
  showSafeArea: boolean;
  showBleed: boolean;
  showRulers: boolean;
  snapToGrid: boolean;
  snapToObjects: boolean;
  gridSize: number;
  width: number;
  height: number;
  layoutLabel: string;
}

// History
interface HistoryEntry {
  pages: Page[];
  currentPageId: string | null;
  selectedElementIds: string[];
  timestamp: number;
  label: string;
}

// Clipboard
interface ClipboardData {
  elements: EditorElement[];
}

// Context menu
interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
}

// Snap guides
export interface SnapGuide {
  type: 'vertical' | 'horizontal';
  position: number; // x or y coordinate
}

// Auto-save status
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface EditorState {
  pages: Page[];
  currentPageId: string | null; // Keep for fallback compatibility
  currentSpreadIndex: number;
  flipDirection: number;
  selectedElementIds: string[];
  canvasSettings: CanvasSettings;
  clipboard: ClipboardData | null;
  contextMenu: ContextMenuState;
  snapGuides: SnapGuide[];
  saveStatus: SaveStatus;
  lastSavedAt: number | null;
  isHydrated: boolean;
  setHydrated: () => void;

  // History
  history: HistoryEntry[];
  historyIndex: number;
  _pushHistory: (label: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Page/Spread actions
  addPage: () => void;
  setCurrentPage: (id: string) => void;
  goToNextSpread: () => void;
  goToPrevSpread: () => void;
  loadTemplate: (templateId: string) => void;
  duplicatePage: (id: string) => void;
  deletePage: (id: string) => void;
  reorderPages: (fromIndex: number, toIndex: number) => void;
  updatePageBackground: (pageId: string, bg: Page['background']) => void;
  applyLayout: (pageId: string, elements: Omit<EditorElement, 'id'>[]) => void;

  // Canvas
  setZoom: (zoom: number) => void;
  setPan: (x: number, y: number) => void;
  toggleGrid: () => void;
  toggleSafeArea: () => void;
  toggleBleed: () => void;
  toggleRulers: () => void;
  toggleSnapToGrid: () => void;
  toggleSnapToObjects: () => void;
  setCanvasSize: (width: number, height: number, label: string) => void;

  // Selection
  setSelectedElements: (ids: string[]) => void;

  // Element CRUD
  addElement: (element: any, targetPageId?: string) => void;
  updateElement: (pageId: string, elementId: string, attrs: any) => void;
  deleteSelectedElements: () => void;

  // Clipboard
  copySelectedElements: () => void;
  pasteElements: () => void;
  duplicateSelectedElements: () => void;

  // Z-ordering
  bringForward: () => void;
  bringToFront: () => void;
  sendBackward: () => void;
  sendToBack: () => void;

  // Lock/Unlock & Hide/Show
  toggleLockSelected: () => void;
  toggleHideSelected: () => void;

  // Move selected with arrow keys
  moveSelected: (dx: number, dy: number) => void;

  // Context menu
  showContextMenu: (x: number, y: number) => void;
  hideContextMenu: () => void;

  // Snap guides
  setSnapGuides: (guides: SnapGuide[]) => void;
  clearSnapGuides: () => void;

  // Save status
  setSaveStatus: (status: SaveStatus) => void;
}

// Custom IndexedDB storage for Zustand to handle large base64 images
const idbStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await idbSet(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

const MAX_HISTORY = 100;

const generateId = () => `el-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      pages: [{
        id: 'page-1',
        name: 'Page 1',
        elements: [
          {
            id: 'element-1',
            type: 'text',
            x: 100,
            y: 100,
            width: 300,
            height: 50,
            rotation: 0,
            opacity: 1,
            locked: false,
            text: 'World-Class Photo Book Editor',
            fontSize: 24,
            fontFamily: "'DM Sans', sans-serif",
            fill: '#E85D26'
          },
          {
            id: 'element-2',
            type: 'shape',
            shapeType: 'rectangle',
            x: 100,
            y: 200,
            width: 150,
            height: 100,
            rotation: -10,
            opacity: 1,
            locked: false,
            fill: '#fdc930',
            cornerRadius: 10
          }
        ]
      }],
      currentPageId: 'page-1',
      currentSpreadIndex: 0,
      flipDirection: 1,
      selectedElementIds: [],
      canvasSettings: {
        zoom: 1,
        panX: 0,
        panY: 0,
        showGrid: false,
        showSafeArea: true,
        showBleed: true,
        showRulers: true,
        snapToGrid: true,
        snapToObjects: true,
        gridSize: 20,
        width: 600,
        height: 800,
        layoutLabel: 'Portrait (6x8)'
      },
      clipboard: null,
      contextMenu: { visible: false, x: 0, y: 0 },
      snapGuides: [],
      saveStatus: 'idle' as SaveStatus,
      lastSavedAt: null,
      isHydrated: false,
      setHydrated: () => set({ isHydrated: true }),

      // ============ HISTORY ============
      history: [],
      historyIndex: -1,

      _pushHistory: (label: string) => {
        const state = get();
        const entry: HistoryEntry = {
          pages: JSON.parse(JSON.stringify(state.pages)),
          currentPageId: state.currentPageId,
          selectedElementIds: [...state.selectedElementIds],
          timestamp: Date.now(),
          label,
        };
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(entry);
        if (newHistory.length > MAX_HISTORY) newHistory.shift();
        set({ history: newHistory, historyIndex: newHistory.length - 1 });
      },

      undo: () => {
        const state = get();
        if (state.historyIndex <= 0) return;
        // Save current state if we haven't yet
        if (state.historyIndex === state.history.length - 1) {
          const currentEntry: HistoryEntry = {
            pages: JSON.parse(JSON.stringify(state.pages)),
            currentPageId: state.currentPageId,
            selectedElementIds: [...state.selectedElementIds],
            timestamp: Date.now(),
            label: 'current',
          };
          const newHistory = [...state.history, currentEntry];
          set({ history: newHistory });
        }
        const prevIndex = state.historyIndex - 1;
        const entry = state.history[prevIndex];
        if (!entry) return;
        set({
          pages: JSON.parse(JSON.stringify(entry.pages)),
          currentPageId: entry.currentPageId,
          selectedElementIds: entry.selectedElementIds,
          historyIndex: prevIndex,
        });
      },

      redo: () => {
        const state = get();
        if (state.historyIndex >= state.history.length - 1) return;
        const nextIndex = state.historyIndex + 1;
        const entry = state.history[nextIndex];
        if (!entry) return;
        set({
          pages: JSON.parse(JSON.stringify(entry.pages)),
          currentPageId: entry.currentPageId,
          selectedElementIds: entry.selectedElementIds,
          historyIndex: nextIndex,
        });
      },

      canUndo: () => get().historyIndex > 0,
      canRedo: () => get().historyIndex < get().history.length - 1,

      // ============ PAGES ============
      addPage: () =>
        set((state) => {
          get()._pushHistory('Add page');
          const newPage1: Page = {
            id: `page-${Date.now()}-1`,
            name: `Page ${state.pages.length + 1}`,
            elements: [],
            background: { type: 'solid', value: '#FFFFFF' }
          };
          const newPage2: Page = {
            id: `page-${Date.now()}-2`,
            name: `Page ${state.pages.length + 2}`,
            elements: [],
            background: { type: 'solid', value: '#FFFFFF' }
          };
          
          const newPages = [...state.pages, newPage1, newPage2];
          const newSpreadIndex = Math.ceil((newPages.length - 1) / 2);
          
          return { 
            pages: newPages, 
            currentPageId: newPage2.id,
            currentSpreadIndex: newSpreadIndex,
            flipDirection: 1
          };
        }),

      setCurrentPage: (id) => set({ currentPageId: id, selectedElementIds: [] }),
      
      goToNextSpread: () => set((state) => {
        const newIndex = state.currentSpreadIndex + 1;
        const rightPageIndex = newIndex === 0 ? 0 : (newIndex - 1) * 2 + 2;
        const targetPage = state.pages[rightPageIndex] || state.pages[state.pages.length - 1];
        return { 
          currentSpreadIndex: newIndex, 
          flipDirection: 1,
          currentPageId: targetPage?.id || state.currentPageId
        };
      }),
      
      goToPrevSpread: () => set((state) => {
        const newIndex = Math.max(0, state.currentSpreadIndex - 1);
        const rightPageIndex = newIndex === 0 ? 0 : (newIndex - 1) * 2 + 2;
        const targetPage = state.pages[rightPageIndex] || state.pages[state.pages.length - 1];
        return { 
          currentSpreadIndex: newIndex, 
          flipDirection: -1,
          currentPageId: targetPage?.id || state.currentPageId
        };
      }),

      loadTemplate: (templateId: string) => {
        // Basic template mock data based on ID
        const pages: Page[] = [];
        const numPages = 10; // example default
        for (let i = 0; i < numPages; i++) {
          pages.push({
            id: `page-${i}`,
            name: i === 0 ? 'Cover' : `Page ${i}`,
            elements: [],
            background: { type: 'solid', value: i === 0 ? '#E85D26' : '#FFFFFF' }
          });
        }
        set({ pages, currentSpreadIndex: 0, flipDirection: 1, currentPageId: pages[0]?.id || null });
      },

      duplicatePage: (id) =>
        set((state) => {
          get()._pushHistory('Duplicate page');
          const pageToDuplicate = state.pages.find((p) => p.id === id);
          if (!pageToDuplicate) return state;
          const newPage: Page = {
            ...pageToDuplicate,
            id: `page-${Date.now()}`,
            name: `${pageToDuplicate.name} (Copy)`,
            elements: pageToDuplicate.elements.map((el) => ({ ...el, id: generateId() }))
          };
          const index = state.pages.findIndex((p) => p.id === id);
          const newPages = [...state.pages];
          newPages.splice(index + 1, 0, newPage);
          return { pages: newPages, currentPageId: newPage.id };
        }),

      deletePage: (id) =>
        set((state) => {
          if (state.pages.length <= 1) return state;
          get()._pushHistory('Delete page');
          const newPages = state.pages.filter((p) => p.id !== id);
          const nextCurrent = state.currentPageId === id ? newPages[0].id : state.currentPageId;
          return { pages: newPages, currentPageId: nextCurrent, selectedElementIds: [] };
        }),

      reorderPages: (fromIndex, toIndex) =>
        set((state) => {
          get()._pushHistory('Reorder pages');
          const newPages = [...state.pages];
          const [moved] = newPages.splice(fromIndex, 1);
          newPages.splice(toIndex, 0, moved);
          return { pages: newPages };
        }),

      applyLayout: (pageId, elements) =>
        set((state) => {
          get()._pushHistory('Apply layout');
          const newElements: EditorElement[] = elements.map(el => ({ ...el, id: generateId() } as EditorElement));
          return {
            pages: state.pages.map(p =>
              p.id === pageId ? { ...p, elements: newElements } : p
            ),
            selectedElementIds: []
          };
        }),

      // ============ CANVAS ============
      setZoom: (zoom) =>
        set((state) => ({ canvasSettings: { ...state.canvasSettings, zoom } })),

      setPan: (x, y) =>
        set((state) => ({ canvasSettings: { ...state.canvasSettings, panX: x, panY: y } })),

      toggleGrid: () =>
        set((state) => ({
          canvasSettings: { ...state.canvasSettings, showGrid: !state.canvasSettings.showGrid },
        })),

      toggleSafeArea: () =>
        set((state) => ({
          canvasSettings: { ...state.canvasSettings, showSafeArea: !state.canvasSettings.showSafeArea },
        })),

      toggleBleed: () =>
        set((state) => ({
          canvasSettings: { ...state.canvasSettings, showBleed: !state.canvasSettings.showBleed },
        })),

      toggleRulers: () =>
        set((state) => ({
          canvasSettings: { ...state.canvasSettings, showRulers: !state.canvasSettings.showRulers },
        })),

      toggleSnapToGrid: () =>
        set((state) => ({
          canvasSettings: { ...state.canvasSettings, snapToGrid: !state.canvasSettings.snapToGrid },
        })),

      toggleSnapToObjects: () =>
        set((state) => ({ canvasSettings: { ...state.canvasSettings, snapToObjects: !state.canvasSettings.snapToObjects } })),

      setCanvasSize: (width: number, height: number, label: string) =>
        set((state) => {
          get()._pushHistory('Set canvas size');
          return {
            canvasSettings: { ...state.canvasSettings, width, height, layoutLabel: label }
          };
        }),

      // ============ SELECTION ============
      setSelectedElements: (ids) => set({ selectedElementIds: ids }),

      // ============ ELEMENTS ============
      addElement: (element, targetPageId?: string) =>
        set((state) => {
          let pageId = targetPageId || state.currentPageId;
          const isCover = state.currentSpreadIndex === 0;
          const leftPageIndex = isCover ? -1 : (state.currentSpreadIndex - 1) * 2 + 1;
          const rightPageIndex = isCover ? 0 : (state.currentSpreadIndex - 1) * 2 + 2;
          
          const validIds = [state.pages[leftPageIndex]?.id, state.pages[rightPageIndex]?.id].filter(Boolean);
          
          if (!pageId || !validIds.includes(pageId)) {
             pageId = validIds[validIds.length - 1]; // Default to the right-most page in spread
          }
          if (!pageId) return state;

          get()._pushHistory('Add element');
          const newElement = { ...element, id: generateId() };
          return {
            pages: state.pages.map(page => {
              if (page.id !== pageId) return page;
              return { ...page, elements: [...page.elements, newElement] };
            }),
            currentPageId: pageId,
            selectedElementIds: [newElement.id]
          };
        }),

      updateElement: (pageId, elementId, attrs) =>
        set((state) => ({
          pages: state.pages.map((page) => {
            if (page.id !== pageId) return page;
            return {
              ...page,
              elements: page.elements.map((el) => {
                if (el.id !== elementId) return el;
                return { ...el, ...attrs };
              }),
            };
          }),
        })),

      deleteSelectedElements: () =>
        set((state) => {
          if (!state.currentPageId || state.selectedElementIds.length === 0) return state;
          get()._pushHistory('Delete elements');
          return {
            pages: state.pages.map(page => {
              if (page.id !== state.currentPageId) return page;
              return {
                ...page,
                elements: page.elements.filter(el => !state.selectedElementIds.includes(el.id))
              };
            }),
            selectedElementIds: []
          };
        }),

      // ============ CLIPBOARD ============
      copySelectedElements: () => {
        const state = get();
        if (!state.currentPageId || state.selectedElementIds.length === 0) return;
        const currentPage = state.pages.find(p => p.id === state.currentPageId);
        if (!currentPage) return;
        const elements = currentPage.elements.filter(el => state.selectedElementIds.includes(el.id));
        set({ clipboard: { elements: JSON.parse(JSON.stringify(elements)) } });
      },

      pasteElements: () =>
        set((state) => {
          if (!state.clipboard || !state.currentPageId) return state;
          get()._pushHistory('Paste elements');
          const newElements = state.clipboard.elements.map(el => ({
            ...el,
            id: generateId(),
            x: el.x + 20,
            y: el.y + 20,
          }));
          return {
            pages: state.pages.map(page => {
              if (page.id !== state.currentPageId) return page;
              return { ...page, elements: [...page.elements, ...newElements] };
            }),
            selectedElementIds: newElements.map(el => el.id),
          };
        }),

      duplicateSelectedElements: () =>
        set((state) => {
          if (!state.currentPageId || state.selectedElementIds.length === 0) return state;
          get()._pushHistory('Duplicate elements');
          const currentPage = state.pages.find(p => p.id === state.currentPageId);
          if (!currentPage) return state;
          const toDuplicate = currentPage.elements.filter(el => state.selectedElementIds.includes(el.id));
          const newElements = toDuplicate.map(el => ({
            ...el,
            id: generateId(),
            x: el.x + 20,
            y: el.y + 20,
          }));
          return {
            pages: state.pages.map(page => {
              if (page.id !== state.currentPageId) return page;
              return { ...page, elements: [...page.elements, ...newElements] };
            }),
            selectedElementIds: newElements.map(el => el.id),
          };
        }),

      // ============ Z-ORDER ============
      bringForward: () =>
        set((state) => {
          if (!state.currentPageId || state.selectedElementIds.length === 0) return state;
          get()._pushHistory('Bring forward');
          return {
            pages: state.pages.map(page => {
              if (page.id !== state.currentPageId) return page;
              const els = [...page.elements];
              for (let i = els.length - 2; i >= 0; i--) {
                if (state.selectedElementIds.includes(els[i].id)) {
                  [els[i], els[i + 1]] = [els[i + 1], els[i]];
                }
              }
              return { ...page, elements: els };
            })
          };
        }),

      bringToFront: () =>
        set((state) => {
          if (!state.currentPageId || state.selectedElementIds.length === 0) return state;
          get()._pushHistory('Bring to front');
          return {
            pages: state.pages.map(page => {
              if (page.id !== state.currentPageId) return page;
              const selected = page.elements.filter(el => state.selectedElementIds.includes(el.id));
              const rest = page.elements.filter(el => !state.selectedElementIds.includes(el.id));
              return { ...page, elements: [...rest, ...selected] };
            })
          };
        }),

      sendBackward: () =>
        set((state) => {
          if (!state.currentPageId || state.selectedElementIds.length === 0) return state;
          get()._pushHistory('Send backward');
          return {
            pages: state.pages.map(page => {
              if (page.id !== state.currentPageId) return page;
              const els = [...page.elements];
              for (let i = 1; i < els.length; i++) {
                if (state.selectedElementIds.includes(els[i].id)) {
                  [els[i - 1], els[i]] = [els[i], els[i - 1]];
                }
              }
              return { ...page, elements: els };
            })
          };
        }),

      sendToBack: () =>
        set((state) => {
          if (!state.currentPageId || state.selectedElementIds.length === 0) return state;
          get()._pushHistory('Send to back');
          return {
            pages: state.pages.map(page => {
              if (page.id !== state.currentPageId) return page;
              const selected = page.elements.filter(el => state.selectedElementIds.includes(el.id));
              const rest = page.elements.filter(el => !state.selectedElementIds.includes(el.id));
              return { ...page, elements: [...selected, ...rest] };
            })
          };
        }),

      // ============ LOCK/HIDE ============
      toggleLockSelected: () =>
        set((state) => {
          if (!state.currentPageId || state.selectedElementIds.length === 0) return state;
          return {
            pages: state.pages.map(page => {
              if (page.id !== state.currentPageId) return page;
              return {
                ...page,
                elements: page.elements.map(el => {
                  if (!state.selectedElementIds.includes(el.id)) return el;
                  return { ...el, locked: !el.locked };
                })
              };
            })
          };
        }),

      toggleHideSelected: () =>
        set((state) => {
          if (!state.currentPageId || state.selectedElementIds.length === 0) return state;
          return {
            pages: state.pages.map(page => {
              if (page.id !== state.currentPageId) return page;
              return {
                ...page,
                elements: page.elements.map(el => {
                  if (!state.selectedElementIds.includes(el.id)) return el;
                  return { ...el, hidden: !el.hidden };
                })
              };
            }),
            selectedElementIds: []
          };
        }),

      // ============ MOVE ============
      moveSelected: (dx, dy) =>
        set((state) => {
          if (!state.currentPageId || state.selectedElementIds.length === 0) return state;
          return {
            pages: state.pages.map(page => {
              if (page.id !== state.currentPageId) return page;
              return {
                ...page,
                elements: page.elements.map(el => {
                  if (!state.selectedElementIds.includes(el.id) || el.locked) return el;
                  return { ...el, x: el.x + dx, y: el.y + dy };
                })
              };
            })
          };
        }),

      // ============ CONTEXT MENU ============
      showContextMenu: (x, y) => set({ contextMenu: { visible: true, x, y } }),
      hideContextMenu: () => set({ contextMenu: { visible: false, x: 0, y: 0 } }),

      // ============ SNAP GUIDES ============
      setSnapGuides: (guides) => set({ snapGuides: guides }),
      clearSnapGuides: () => set({ snapGuides: [] }),

      // ============ SAVE STATUS ============
      setSaveStatus: (status) => set({ saveStatus: status, lastSavedAt: status === 'saved' ? Date.now() : get().lastSavedAt }),

      // ============ PAGE BACKGROUND ============
      updatePageBackground: (pageId, bg) =>
        set((state) => ({
          pages: state.pages.map(page => {
            if (page.id !== pageId) return page;
            return { ...page, background: bg };
          }),
        })),
    }),
    {
      name: 'memorize-photo-book-storage',
      storage: createJSONStorage(() => idbStorage),
      partialize: (state) => ({
        pages: state.pages,
        canvasSettings: state.canvasSettings,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setSaveStatus('saved');
          state.setHydrated();
        }
      }
    }
  )
);
