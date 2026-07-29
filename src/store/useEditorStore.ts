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
  moveElementBetweenPages: (elementId: string, sourcePageId: string, targetPageId: string, newAttrs: any) => void;
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
        zoom: 0.42,
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

      loadTemplate: async (templateId: string) => {
        const state = get();
        const canvasWidth = state.canvasSettings.width || 600;
        const canvasHeight = state.canvasSettings.height || 800;
        const numPages = 12;
        let pagesConfig = ['cover', 'split-h', 'full', 'grid-4', 'collage-1', 'text-heavy', 'scattered', 'split-v', 'film-strip', 'grid-9', 'collage-2', 'full'];
        
        try {
          const { supabase } = await import('@/lib/supabase');
          const { data } = await supabase.from('products').select('attributes').eq('name', 'Signature Photo Book').single();
          if (data?.attributes?.templates) {
            const tpl = data.attributes.templates.find((t: any) => t.id === templateId);
            if (tpl?.pagesConfig) {
              pagesConfig = tpl.pagesConfig;
            }
          }
        } catch(e) {
          console.error('Failed to load template config', e);
        }
        
        const palettes: Record<string, { primary: string, bg: string, text: string }> = {
          'wanderlust': { primary: '#E85D26', bg: '#fdfbf7', text: '#2d3748' },
          'wedding-bliss': { primary: '#e5c1c1', bg: '#ffffff', text: '#333333' },
          'little-one': { primary: '#a7c7e7', bg: '#f0f8ff', text: '#4a5568' },
          'family-time': { primary: '#8fbc8f', bg: '#fafafa', text: '#2d3748' },
          'portfolio': { primary: '#111111', bg: '#eeeeee', text: '#000000' },
          'default': { primary: '#E85D26', bg: '#FFFFFF', text: '#1a1a18' }
        };
        const palette = palettes[templateId] || palettes['default'];
        const templateImages: Record<string, string[]> = {
          'wedding-bliss': [
            'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
            'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80',
            'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80',
            'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&q=80'
          ],
          'wanderlust': [
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80',
            'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
            'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=600&q=80',
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80',
            'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=600&q=80'
          ],
          'little-one': [
            'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80',
            'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80',
            'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=600&q=80',
            'https://images.unsplash.com/photo-1484665754804-74b091211472?w=600&q=80',
            'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80'
          ],
          'portfolio': [
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
            'https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=600&q=80',
            'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=600&q=80',
            'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&q=80',
            'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80'
          ],
          'family-time': [
            'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80',
            'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&q=80',
            'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80',
            'https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?w=600&q=80'
          ],
          'milestones': [
            'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
            'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80',
            'https://images.unsplash.com/photo-1530103862676-de88800bb883?w=600&q=80',
            'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600&q=80'
          ],
          'year-in-review': [
            'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=600&q=80',
            'https://images.unsplash.com/photo-1489533119213-66a5cd877091?w=600&q=80',
            'https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=600&q=80'
          ],
          'recipe-book': [
            'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80',
            'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&q=80',
            'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&q=80'
          ],
          'default': [
            'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80'
          ]
        };
        const defaultImages = templateImages[templateId] || templateImages['default'];
        const pages: Page[] = [];

        let imageCounter = 0;

        const getLayoutElements = (layoutType: string, i: number, W: number, H: number, p: number = 20) => {
          const cw = W - 2 * p;
          const ch = H - 2 * p;
          const elements: EditorElement[] = [];
          
          const getImg = (idSuffix: string, x: number, y: number, w: number, h: number, rot = 0) => {
            const src = defaultImages[imageCounter % defaultImages.length];
            imageCounter++;
            return {
              id: `el-${i}-${idSuffix}`, type: 'image' as const, src, isPlaceholder: true,
              x, y, width: w, height: h, rotation: rot, opacity: 1, locked: false
            };
          };

          const getText = (idSuffix: string, text: string, fontSize: number, x: number, y: number, w: number, h: number, fontFam = "'DM Sans', sans-serif") => ({
            id: `el-${i}-${idSuffix}`, type: 'text' as const, text, fontSize, fontFamily: fontFam, fill: palette.text,
            x, y, width: w, height: h, rotation: 0, opacity: 1, locked: false, textAlign: 'center'
          });

          if (layoutType === 'cover' || layoutType === 'title-img') {
            elements.push(getImg('bg', 0, 0, W, H));
            elements[0].isPlaceholder = false;
            elements[0].opacity = 0.8;
            elements.push(getText('title', templateId.toUpperCase().replace('-', ' '), 48, 0, H*0.4, W, 100, "'Instrument Serif', serif"));
            elements.push(getText('sub', 'A beautiful journey', 18, 0, H*0.5, W, 50));
            if (elements[1]) elements[1].fill = '#ffffff';
            if (elements[2]) elements[2].fill = '#ffffff';
          } else if (layoutType === 'split-h') {
            elements.push(getImg('top', p, p, cw, (ch-10)/2));
            elements.push(getImg('bot', p, p+(ch-10)/2+10, cw, (ch-10)/2));
          } else if (layoutType === 'split-v') {
            elements.push(getImg('l', p, p, (cw-10)/2, ch));
            elements.push(getImg('r', p+(cw-10)/2+10, p, (cw-10)/2, ch));
          } else if (layoutType === 'grid-4') {
            const sizeX = (cw-10)/2;
            const sizeY = (ch-10)/2;
            elements.push(getImg('tl', p, p, sizeX, sizeY));
            elements.push(getImg('tr', p+sizeX+10, p, sizeX, sizeY));
            elements.push(getImg('bl', p, p+sizeY+10, sizeX, sizeY));
            elements.push(getImg('br', p+sizeX+10, p+sizeY+10, sizeX, sizeY));
          } else if (layoutType === 'collage-1') {
            elements.push(getImg('t', p, p, cw, ch*0.6));
            elements.push(getImg('bl', p, p+ch*0.6+10, (cw-10)/2, ch*0.4-10));
            elements.push(getImg('br', p+(cw-10)/2+10, p+ch*0.6+10, (cw-10)/2, ch*0.4-10));
          } else if (layoutType === 'text-heavy') {
            elements.push(getText('title', 'Our Story', 36, p, p, cw, 60, "'Instrument Serif', serif"));
            elements.push(getImg('img', p, p+70, cw, ch*0.4));
            elements.push(getText('body1', 'Lorem ipsum dolor sit amet...', 14, p, p+70+ch*0.4+20, (cw-10)/2, ch*0.5));
            elements.push(getText('body2', 'Consectetur adipiscing elit...', 14, p+(cw-10)/2+10, p+70+ch*0.4+20, (cw-10)/2, ch*0.5));
          } else if (layoutType === 'scattered') {
            elements.push(getImg('img1', p+cw*0.05, p+ch*0.05, cw*0.45, ch*0.4, -8));
            elements.push(getImg('img2', p+cw*0.4, p+ch*0.15, cw*0.5, ch*0.45, 5));
            elements.push(getImg('img3', p+cw*0.15, p+ch*0.55, cw*0.55, ch*0.35, -3));
          } else if (layoutType === 'film-strip') {
            const h = (ch-30)/4;
            elements.push(getImg('f1', p, p, cw, h));
            elements.push(getImg('f2', p, p+h+10, cw, h));
            elements.push(getImg('f3', p, p+(h+10)*2, cw, h));
            elements.push(getImg('f4', p, p+(h+10)*3, cw, h));
          } else if (layoutType === 'grid-9') {
            const sizeX = (cw-20)/3;
            const sizeY = (ch-20)/3;
            for(let row=0; row<3; row++) {
               for(let col=0; col<3; col++) {
                  elements.push(getImg(`g9-${row}-${col}`, p + col*(sizeX+10), p + row*(sizeY+10), sizeX, sizeY));
               }
            }
          } else if (layoutType === 'collage-2') {
            elements.push(getImg('l', p, p, cw*0.6, ch));
            elements.push(getImg('tr', p+cw*0.6+10, p, cw-cw*0.6-10, (ch-10)/2));
            elements.push(getImg('br', p+cw*0.6+10, p+(ch-10)/2+10, cw-cw*0.6-10, (ch-10)/2));
          } else if (layoutType === 'full') {
            elements.push(getImg('full', 0, 0, W, H));
          } else {
             elements.push(getImg('def', p, p, cw, ch));
          }

          return elements;
        };

        for (let i = 0; i < Math.min(numPages, pagesConfig.length); i++) {
          pages.push({
            id: `page-${i}`,
            name: i === 0 ? 'Cover' : `Page ${i}`,
            elements: getLayoutElements(pagesConfig[i], i, canvasWidth, canvasHeight),
            background: { type: 'solid', value: palette.bg }
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
          const oldWidth = state.canvasSettings.width || 600;
          const oldHeight = state.canvasSettings.height || 800;
          const scaleX = width / oldWidth;
          const scaleY = height / oldHeight;

          const updatedPages = state.pages.map(page => ({
            ...page,
            elements: page.elements.map(el => {
              const scaledEl: EditorElement = {
                ...el,
                x: el.x * scaleX,
                y: el.y * scaleY,
                width: el.width * scaleX,
                height: el.height * scaleY,
              };
              if (el.type === 'text' && el.fontSize) {
                scaledEl.fontSize = el.fontSize * Math.min(scaleX, scaleY);
              }
              return scaledEl;
            })
          }));

          return {
            canvasSettings: { ...state.canvasSettings, width, height, layoutLabel: label },
            pages: updatedPages
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

      moveElementBetweenPages: (elementId, sourcePageId, targetPageId, newAttrs) =>
        set((state) => {
          let elementToMove: EditorElement | null = null;
          const newPages = state.pages.map((page) => {
            if (page.id === sourcePageId) {
              elementToMove = page.elements.find(el => el.id === elementId) || null;
              if (elementToMove) {
                 elementToMove = { ...elementToMove, ...newAttrs };
              }
              return { ...page, elements: page.elements.filter(el => el.id !== elementId) };
            }
            return page;
          });
          
          if (!elementToMove) return state;

          return {
            pages: newPages.map((page) => {
              if (page.id === targetPageId) {
                return { ...page, elements: [...page.elements, elementToMove!] };
              }
              return page;
            }),
            currentPageId: targetPageId
          };
        }),

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
