'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Type, Image as ImageIcon, Shapes, Grid3X3, Sticker, Upload, LayoutTemplate } from 'lucide-react';
import { useEditorStore } from '@/store/useEditorStore';

const TABS = [
  { id: 'images', icon: ImageIcon, label: 'Photos' },
  { id: 'text', icon: Type, label: 'Text' },
  { id: 'shapes', icon: Shapes, label: 'Shapes' },
  { id: 'layouts', icon: Grid3X3, label: 'Layouts' },
  { id: 'templates', icon: LayoutTemplate, label: 'Templates' },
  { id: 'stickers', icon: Sticker, label: 'Stickers' },
];

const TEXT_PRESETS = [
  { label: 'Add a heading', fontSize: 32, fontFamily: "'DM Serif Display', serif", fill: '#1a1a18' },
  { label: 'Add subheading', fontSize: 20, fontFamily: "'DM Sans', sans-serif", fill: '#6b6560' },
  { label: 'Add body text', fontSize: 14, fontFamily: "'DM Sans', sans-serif", fill: '#1a1a18' },
  { label: 'CAPTION', fontSize: 10, fontFamily: "'DM Sans', sans-serif", fill: '#a09890', fontStyle: 'bold', letterSpacing: 3 },
];

const SHAPE_ITEMS = [
  { type: 'rectangle', label: 'Rectangle', preview: '▬' },
  { type: 'circle', label: 'Circle', preview: '●' },
  { type: 'star', label: 'Star', preview: '★' },
  { type: 'polygon', label: 'Hexagon', preview: '⬡' },
];

const SHAPE_COLORS = ['#E85D26', '#fdc930', '#1a1a18', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#607D8B'];

const STICKER_CATEGORIES = [
  {
    name: "Featured Stickers",
    stickers: [
      { name: "Vintage Camera", url: "/stickers/travel.png" },
      { name: "Wedding Rings", url: "/stickers/wedding.png" },
      { name: "Birthday Cake", url: "/stickers/birthday.png" },
      { name: "Sunflower", url: "/stickers/nature.png" }
    ]
  }
];

const getLayouts = (W: number, H: number) => {
  const p = 20; // padding
  const cw = W - 2 * p; // content width
  const ch = H - 2 * p; // content height

  return [
    {
      id: 'full', name: 'Full Page',
      elements: [
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p, width: cw, height: ch, rotation: 0, opacity: 1, locked: false }
      ]
    },
    {
      id: 'split-h', name: 'Split Horizontal',
      elements: [
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p, width: cw, height: (ch - 10) / 2, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p + (ch - 10) / 2 + 10, width: cw, height: (ch - 10) / 2, rotation: 0, opacity: 1, locked: false }
      ]
    },
    {
      id: 'split-v', name: 'Split Vertical',
      elements: [
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p, width: (cw - 10) / 2, height: ch, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p + (cw - 10) / 2 + 10, y: p, width: (cw - 10) / 2, height: ch, rotation: 0, opacity: 1, locked: false }
      ]
    },
    {
      id: 'grid-4', name: 'Grid 2x2',
      elements: [
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p, width: (cw - 10) / 2, height: (ch - 10) / 2, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p + (cw - 10) / 2 + 10, y: p, width: (cw - 10) / 2, height: (ch - 10) / 2, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p + (ch - 10) / 2 + 10, width: (cw - 10) / 2, height: (ch - 10) / 2, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p + (cw - 10) / 2 + 10, y: p + (ch - 10) / 2 + 10, width: (cw - 10) / 2, height: (ch - 10) / 2, rotation: 0, opacity: 1, locked: false }
      ]
    },
    {
      id: 'title-img', name: 'Title & Image',
      elements: [
        { type: 'text', text: 'Page Title', fontSize: Math.max(24, Math.floor(cw * 0.08)), fontFamily: "'DM Serif Display', serif", fill: '#1a1a18', x: p, y: p, width: cw, height: Math.floor(ch * 0.1), rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p + Math.floor(ch * 0.1) + 10, width: cw, height: ch - Math.floor(ch * 0.1) - 10, rotation: 0, opacity: 1, locked: false }
      ]
    },
    {
      id: 'collage-1', name: 'Collage (1 Top, 2 Bottom)',
      elements: [
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p, width: cw, height: Math.floor(ch * 0.6), rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p + Math.floor(ch * 0.6) + 10, width: (cw - 10) / 2, height: ch - Math.floor(ch * 0.6) - 10, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p + (cw - 10) / 2 + 10, y: p + Math.floor(ch * 0.6) + 10, width: (cw - 10) / 2, height: ch - Math.floor(ch * 0.6) - 10, rotation: 0, opacity: 1, locked: false }
      ]
    },
    {
      id: 'collage-2', name: 'Collage (1 Left, 2 Right)',
      elements: [
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p, width: Math.floor(cw * 0.6), height: ch, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p + Math.floor(cw * 0.6) + 10, y: p, width: cw - Math.floor(cw * 0.6) - 10, height: (ch - 10) / 2, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p + Math.floor(cw * 0.6) + 10, y: p + (ch - 10) / 2 + 10, width: cw - Math.floor(cw * 0.6) - 10, height: (ch - 10) / 2, rotation: 0, opacity: 1, locked: false }
      ]
    },
    {
      id: 'scattered', name: 'Polaroids',
      elements: [
        { type: 'image', isPlaceholder: true, src: '', x: p + cw * 0.05, y: p + ch * 0.05, width: cw * 0.45, height: ch * 0.4, rotation: -8, opacity: 1, locked: false, cornerRadius: 4, strokeWidth: 10, stroke: '#FFFFFF' },
        { type: 'image', isPlaceholder: true, src: '', x: p + cw * 0.4, y: p + ch * 0.15, width: cw * 0.5, height: ch * 0.45, rotation: 5, opacity: 1, locked: false, cornerRadius: 4, strokeWidth: 10, stroke: '#FFFFFF' },
        { type: 'image', isPlaceholder: true, src: '', x: p + cw * 0.15, y: p + ch * 0.55, width: cw * 0.55, height: ch * 0.35, rotation: -3, opacity: 1, locked: false, cornerRadius: 4, strokeWidth: 10, stroke: '#FFFFFF' }
      ]
    },
    {
      id: 'film-strip', name: 'Film Strip',
      elements: [
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p, width: cw, height: (ch - 30) / 4, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p + (ch - 30) / 4 + 10, width: cw, height: (ch - 30) / 4, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p + ((ch - 30) / 4 + 10) * 2, width: cw, height: (ch - 30) / 4, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p + ((ch - 30) / 4 + 10) * 3, width: cw, height: (ch - 30) / 4, rotation: 0, opacity: 1, locked: false }
      ]
    },
    {
      id: 'text-heavy', name: 'Article',
      elements: [
        { type: 'text', text: 'Our Journey', fontSize: Math.max(24, Math.floor(cw * 0.08)), fontFamily: "'Playfair Display', serif", fill: '#1a1a18', x: p, y: p, width: cw, height: Math.floor(ch * 0.1), rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p + Math.floor(ch * 0.1) + 10, width: cw, height: Math.floor(ch * 0.4), rotation: 0, opacity: 1, locked: false },
        { type: 'text', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.', fontSize: 14, fontFamily: "'DM Sans', sans-serif", fill: '#4a4744', x: p, y: p + Math.floor(ch * 0.5) + 20, width: (cw - 10) / 2, height: ch - Math.floor(ch * 0.5) - 20, rotation: 0, opacity: 1, locked: false, align: 'left' },
        { type: 'text', text: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.', fontSize: 14, fontFamily: "'DM Sans', sans-serif", fill: '#4a4744', x: p + (cw - 10) / 2 + 10, y: p + Math.floor(ch * 0.5) + 20, width: (cw - 10) / 2, height: ch - Math.floor(ch * 0.5) - 20, rotation: 0, opacity: 1, locked: false, align: 'left' }
      ]
    },
    {
      id: 'grid-9', name: 'Grid 3x3',
      elements: [
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p, width: (cw - 20) / 3, height: (ch - 20) / 3, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p + (cw - 20) / 3 + 10, y: p, width: (cw - 20) / 3, height: (ch - 20) / 3, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p + ((cw - 20) / 3 + 10) * 2, y: p, width: (cw - 20) / 3, height: (ch - 20) / 3, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p + (ch - 20) / 3 + 10, width: (cw - 20) / 3, height: (ch - 20) / 3, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p + (cw - 20) / 3 + 10, y: p + (ch - 20) / 3 + 10, width: (cw - 20) / 3, height: (ch - 20) / 3, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p + ((cw - 20) / 3 + 10) * 2, y: p + (ch - 20) / 3 + 10, width: (cw - 20) / 3, height: (ch - 20) / 3, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p, y: p + ((ch - 20) / 3 + 10) * 2, width: (cw - 20) / 3, height: (ch - 20) / 3, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p + (cw - 20) / 3 + 10, y: p + ((ch - 20) / 3 + 10) * 2, width: (cw - 20) / 3, height: (ch - 20) / 3, rotation: 0, opacity: 1, locked: false },
        { type: 'image', isPlaceholder: true, src: '', x: p + ((cw - 20) / 3 + 10) * 2, y: p + ((ch - 20) / 3 + 10) * 2, width: (cw - 20) / 3, height: (ch - 20) / 3, rotation: 0, opacity: 1, locked: false }
      ]
    }
  ];
};

export default function LeftSidebar() {
  const { addElement, applyLayout, currentPageId, pages, selectedElementIds, updateElement, canvasSettings } = useEditorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState('images');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  // Generate dynamic layouts based on current page size
  const layouts = getLayouts(canvasSettings.width || 600, canvasSettings.height || 800);

  useEffect(() => {
    if (selectedElementIds.length === 1 && currentPageId) {
      const page = pages.find(p => p.id === currentPageId);
      if (page) {
        const el = page.elements.find(e => e.id === selectedElementIds[0]);
        if (el?.type === 'image' && el.isPlaceholder) {
          setActiveTab('images');
        }
      }
    }
  }, [selectedElementIds, currentPageId, pages]);

  const handleAddText = (preset: typeof TEXT_PRESETS[0]) => {
    addElement({
      type: 'text',
      x: 150, y: 150, width: 300, height: preset.fontSize * 1.5,
      rotation: 0, opacity: 1, locked: false,
      text: preset.label, fontSize: preset.fontSize,
      fontFamily: preset.fontFamily, fill: preset.fill,
      fontStyle: preset.fontStyle || 'normal',
      letterSpacing: preset.letterSpacing || 0,
    });
  };

  const handleAddShape = (shapeType: string, fill?: string) => {
    addElement({
      type: 'shape',
      shapeType,
      x: 150, y: 150, width: 120, height: 120,
      rotation: 0, opacity: 1, locked: false,
      fill: fill || '#E85D26',
    });
  };

  const handleAddImage = (src: string) => {
    if (currentPageId && selectedElementIds.length === 1) {
      const page = pages.find(p => p.id === currentPageId);
      if (page) {
        const selectedEl = page.elements.find(e => e.id === selectedElementIds[0]);
        if (selectedEl && selectedEl.type === 'image' && selectedEl.isPlaceholder) {
          updateElement(currentPageId, selectedEl.id, { src, isPlaceholder: false });
          return;
        }
      }
    }

    const offset = Math.random() * 30 - 15;
    addElement({
      type: 'image',
      src,
      x: 200 + offset, y: 325 + offset, width: 200, height: 150,
      rotation: 0, opacity: 1, locked: false,
    });
  };

  const processFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const src = event.target.result as string;
            setUploadedPhotos(prev => [src, ...prev]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleAddSticker = (url: string) => {
    addElement({
      type: 'image',
      src: url,
      isPlaceholder: false,
      x: 150, y: 150, width: 200, height: 200,
      rotation: 0, opacity: 1, locked: false,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-[320px] h-full bg-[#FFFFFF] border-r border-[#e8e2d9] flex z-10 shrink-0">
      <div className="w-[64px] h-full border-r border-[#e8e2d9] flex flex-col py-3 gap-1 bg-[#FAF6EE] overflow-y-auto shrink-0 items-center justify-start">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex-col h-14 rounded-none flex items-center justify-center transition-colors border-l-2 ${isActive
                ? 'bg-[#FFFFFF] text-[#E85D26] border-[#E85D26]'
                : 'bg-transparent text-[#6b6560] border-transparent hover:text-[#E85D26]'
                }`}
            >
              <tab.icon size={18} className="mb-0.5" />
              <span className="text-[9px] font-medium leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 h-full bg-[#FFFFFF] min-w-0 flex flex-col">
        {activeTab === 'images' && (
          <div className="flex-1 overflow-y-auto w-full h-full">
            <div className="p-4 space-y-5">
              <h3 className="font-serif text-lg text-[#1a1a18]">Photos</h3>

              <div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); }}
                  onDrop={(e: React.DragEvent) => {
                    e.preventDefault();
                    e.stopPropagation();
                    processFiles(e.dataTransfer.files);
                  }}
                  className="w-full py-6 border-2 border-dashed border-[#E85D26] rounded-xl flex flex-col items-center justify-center gap-2 bg-[#FAF6EE] text-[#E85D26] hover:bg-[#f4efeb] transition-colors cursor-pointer group"
                >
                  <Upload size={22} className="group-hover:scale-110 transition-transform" />
                  <div className="text-center">
                    <span className="font-semibold block text-xs">Upload Photos</span>
                    <span className="text-[10px] text-[#6b6560]">Click or drag & drop</span>
                  </div>
                </div>
              </div>

              {uploadedPhotos.length > 0 && (
                <>
                  <div className="w-full h-px bg-[#e8e2d9]" />
                  <div>
                    <h4 className="text-xs font-semibold text-[#1a1a18] mb-3">Your Uploads</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {uploadedPhotos.map((src, i) => (
                        <button
                          key={i}
                          onClick={() => handleAddImage(src)}
                          className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#e8e2d9] hover:border-[#E85D26] hover:shadow-md transition-all group relative bg-[#FAF6EE]"
                        >
                          <img src={src} alt={`Upload ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="text-white opacity-0 group-hover:opacity-100 font-medium text-xs drop-shadow-md">Add</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === 'text' && (
          <div className="flex-1 overflow-y-auto w-full h-full">
            <div className="p-4 space-y-3">
              <h3 className="font-serif text-lg text-[#1a1a18]">Text</h3>
              {TEXT_PRESETS.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => handleAddText(preset)}
                  className="w-full p-3 border border-[#e8e2d9] rounded-lg hover:border-[#E85D26] hover:bg-[#FAF6EE] text-left transition-all hover:shadow-sm"
                >
                  <span style={{
                    fontSize: Math.min(preset.fontSize, 24),
                    fontFamily: preset.fontFamily,
                    color: preset.fill,
                    fontWeight: preset.fontStyle === 'bold' ? 'bold' : 'normal',
                    letterSpacing: preset.letterSpacing ? `${preset.letterSpacing}px` : undefined,
                  }}>
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* === SHAPES TAB === */}
        {activeTab === 'shapes' && (
          <div className="flex-1 overflow-y-auto w-full h-full">
            <div className="p-4 space-y-5">
              <h3 className="font-serif text-lg text-[#1a1a18]">Shapes</h3>
              <div className="grid grid-cols-2 gap-3">
                {SHAPE_ITEMS.map((shape) => (
                  <button
                    key={shape.type}
                    onClick={() => handleAddShape(shape.type)}
                    className="aspect-square border border-[#e8e2d9] rounded-lg flex flex-col items-center justify-center hover:border-[#E85D26] hover:bg-[#FAF6EE] transition-all hover:shadow-sm gap-1"
                  >
                    <span className="text-2xl text-[#E85D26]">{shape.preview}</span>
                    <span className="text-[10px] font-medium text-[#6b6560]">{shape.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === LAYOUTS TAB === */}
        {activeTab === 'layouts' && (
          <div className="flex-1 overflow-y-auto w-full h-full">
            <div className="p-4 space-y-4">
              <h3 className="font-serif text-lg text-[#1a1a18]">Page Layouts</h3>
              <p className="text-xs text-[#a09890] leading-relaxed">
                Click a layout to apply it to the selected page. It will automatically fit the page dimensions.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {layouts.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => {
                      if (currentPageId) {
                        applyLayout(currentPageId, layout.elements as any);
                      }
                    }}
                    className="aspect-[3/4] bg-[#FAF6EE] rounded-xl border border-[#e8e2d9] hover:border-[#E85D26] hover:shadow-md transition-all flex flex-col items-center justify-center p-2 group relative overflow-hidden"
                  >
                    <div className="flex-1 w-full border border-dashed border-[#d2cec5] rounded relative overflow-hidden bg-[#FAF6EE]">
                      {/* Mini preview logic */}
                      {layout.id === 'full' && (
                         <div className="absolute inset-1 border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9]" />
                      )}
                      {layout.id === 'split-h' && (
                        <>
                          <div className="absolute top-1 left-1 right-1 bottom-1/2 border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9] mb-0.5" />
                          <div className="absolute top-1/2 left-1 right-1 bottom-1 border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9] mt-0.5" />
                        </>
                      )}
                      {layout.id === 'split-v' && (
                        <>
                          <div className="absolute top-1 left-1 bottom-1 right-1/2 border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9] mr-0.5" />
                          <div className="absolute top-1 left-1/2 bottom-1 right-1 border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9] ml-0.5" />
                        </>
                      )}
                      {layout.id === 'grid-4' && (
                        <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full p-1">
                          {[1,2,3,4].map(i => <div key={i} className="border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9]" />)}
                        </div>
                      )}
                      {layout.id === 'title-img' && (
                        <>
                          <div className="absolute top-1 left-1 right-1 h-3 border border-solid border-[#b3aea6] rounded bg-white" />
                          <div className="absolute top-5 left-1 right-1 bottom-1 border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9]" />
                        </>
                      )}
                      {layout.id === 'collage-1' && (
                        <>
                          <div className="absolute top-1 left-1 right-1 bottom-[40%] border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9]" />
                          <div className="absolute top-[62%] left-1 right-[52%] bottom-1 border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9]" />
                          <div className="absolute top-[62%] left-[52%] right-1 bottom-1 border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9]" />
                        </>
                      )}
                      {layout.id === 'collage-2' && (
                        <>
                          <div className="absolute top-1 left-1 right-[40%] bottom-1 border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9]" />
                          <div className="absolute top-1 left-[62%] right-1 bottom-[52%] border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9]" />
                          <div className="absolute top-[52%] left-[62%] right-1 bottom-1 border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9]" />
                        </>
                      )}
                      {layout.id === 'scattered' && (
                        <div className="relative w-full h-full p-1 flex items-center justify-center">
                          <div className="absolute w-8 h-8 border border-solid border-[#b3aea6] bg-white shadow-sm rotate-[-15deg] translate-x-[-8px] translate-y-[-8px]" />
                          <div className="absolute w-8 h-8 border border-solid border-[#b3aea6] bg-white shadow-sm rotate-[10deg] translate-x-[8px] translate-y-[-4px]" />
                          <div className="absolute w-8 h-8 border border-solid border-[#b3aea6] bg-white shadow-sm rotate-[-5deg] translate-y-[8px]" />
                        </div>
                      )}
                      {layout.id === 'film-strip' && (
                        <div className="grid grid-cols-1 grid-rows-4 gap-[2px] w-full h-full p-1">
                          {[1,2,3,4].map(i => <div key={i} className="border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9]" />)}
                        </div>
                      )}
                      {layout.id === 'text-heavy' && (
                        <>
                          <div className="absolute top-1 left-1 right-1 h-2 border border-solid border-[#b3aea6] rounded bg-white" />
                          <div className="absolute top-4 left-1 right-1 bottom-[40%] border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9]" />
                          <div className="absolute top-[62%] left-1 right-[52%] h-4 border border-solid border-[#e8e2d9] rounded bg-[#f4efeb]" />
                          <div className="absolute top-[62%] left-[52%] right-1 h-4 border border-solid border-[#e8e2d9] rounded bg-[#f4efeb]" />
                        </>
                      )}
                      {layout.id === 'grid-9' && (
                        <div className="grid grid-cols-3 grid-rows-3 gap-[2px] w-full h-full p-1">
                          {[1,2,3,4,5,6,7,8,9].map(i => <div key={i} className="border border-dashed border-[#b3aea6] rounded bg-[#e8e2d9]" />)}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-[#6b6560] group-hover:text-[#E85D26]">{layout.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === TEMPLATES TAB === */}
        {activeTab === 'templates' && (
          <div className="flex-1 overflow-y-auto w-full h-full">
            <div className="p-4">
              <h3 className="font-serif text-lg text-[#1a1a18] mb-4 capitalize">Templates</h3>
              <div className="text-sm text-[#6b6560] border-2 border-dashed border-[#e8e2d9] rounded-lg p-8 text-center bg-[#FAF6EE]">
                Pre-designed page templates coming soon.
              </div>
            </div>
          </div>
        )}

        {/* === STICKERS TAB === */}
        {activeTab === 'stickers' && (
          <div className="flex-1 overflow-y-auto w-full h-full">
            <div className="p-4 space-y-6">
              <h3 className="font-serif text-lg text-[#1a1a18]">Stickers</h3>
              
              {STICKER_CATEGORIES.map((category, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="text-[10px] font-semibold text-[#a09890] uppercase tracking-widest">{category.name}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {category.stickers.map((sticker, i) => (
                      <button
                        key={i}
                        onClick={() => handleAddSticker(sticker.url)}
                        className="aspect-square flex items-center justify-center border border-[#e8e2d9] rounded-xl bg-white hover:border-[#E85D26] hover:shadow-md transition-all group overflow-hidden relative"
                        title={`Add ${sticker.name}`}
                      >
                        <img 
                          src={sticker.url} 
                          alt={sticker.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
