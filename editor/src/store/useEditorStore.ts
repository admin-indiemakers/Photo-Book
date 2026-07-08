import { create } from 'zustand';

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
  [key: string]: any; // Specific properties for text/image/shape
}

export interface Page {
  id: string;
  name: string;
  elements: EditorElement[];
}

interface CanvasSettings {
  zoom: number;
  panX: number;
  panY: number;
  showGrid: boolean;
  showSafeArea: boolean;
  showBleed: boolean;
}

interface EditorState {
  pages: Page[];
  currentPageId: string | null;
  selectedElementIds: string[];
  canvasSettings: CanvasSettings;
  
  // Actions
  addPage: () => void;
  setCurrentPage: (id: string) => void;
  setZoom: (zoom: number) => void;
  setPan: (x: number, y: number) => void;
  toggleGrid: () => void;
  toggleSafeArea: () => void;
  toggleBleed: () => void;
  setSelectedElements: (ids: string[]) => void;
  updateElement: (pageId: string, elementId: string, attrs: any) => void;
  duplicatePage: (id: string) => void;
  deletePage: (id: string) => void;
  deleteSelectedElements: () => void;
  addElement: (element: any) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
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
        fontFamily: 'var(--font-sans)',
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
  selectedElementIds: [],
  canvasSettings: {
    zoom: 1,
    panX: 0,
    panY: 0,
    showGrid: false,
    showSafeArea: true,
    showBleed: false,
  },

  addPage: () =>
    set((state) => {
      const newPage = {
        id: `page-${Date.now()}`,
        name: `Page ${state.pages.length + 1}`,
        elements: [],
      };
      return { pages: [...state.pages, newPage], currentPageId: newPage.id };
    }),

  setCurrentPage: (id) => set({ currentPageId: id }),

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

  setSelectedElements: (ids) => set({ selectedElementIds: ids }),

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

  duplicatePage: (id) =>
    set((state) => {
      const pageToDuplicate = state.pages.find((p) => p.id === id);
      if (!pageToDuplicate) return state;
      const newPage = {
        ...pageToDuplicate,
        id: `page-${Date.now()}`,
        name: `${pageToDuplicate.name} (Copy)`,
        elements: pageToDuplicate.elements.map(el => ({ ...el, id: `el-${Date.now()}-${Math.random()}` }))
      };
      const index = state.pages.findIndex((p) => p.id === id);
      const newPages = [...state.pages];
      newPages.splice(index + 1, 0, newPage);
      return { pages: newPages, currentPageId: newPage.id };
    }),

  deletePage: (id) =>
    set((state) => {
      if (state.pages.length <= 1) return state; // Prevent deleting last page
      const newPages = state.pages.filter((p) => p.id !== id);
      const nextCurrent = state.currentPageId === id ? newPages[0].id : state.currentPageId;
      return { pages: newPages, currentPageId: nextCurrent };
    }),

  deleteSelectedElements: () =>
    set((state) => {
      if (!state.currentPageId || state.selectedElementIds.length === 0) return state;
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

  addElement: (element) =>
    set((state) => {
      if (!state.currentPageId) return state;
      const newElement = {
        ...element,
        id: `el-${Date.now()}-${Math.random()}`
      };
      return {
        pages: state.pages.map(page => {
          if (page.id !== state.currentPageId) return page;
          return {
            ...page,
            elements: [...page.elements, newElement]
          };
        }),
        selectedElementIds: [newElement.id]
      };
    })
}));
