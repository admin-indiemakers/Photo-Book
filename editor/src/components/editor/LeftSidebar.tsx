'use client';
import React, { useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
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

const DUMMY_PHOTOS = [
  'https://picsum.photos/id/1015/400/300',
  'https://picsum.photos/id/1016/400/300',
  'https://picsum.photos/id/1018/400/300',
  'https://picsum.photos/id/1019/400/300',
  'https://picsum.photos/id/1020/400/300',
  'https://picsum.photos/id/1021/400/300',
  'https://picsum.photos/id/1022/400/300',
  'https://picsum.photos/id/1023/400/300',
];

const TEXT_PRESETS = [
  { label: 'Add a heading', fontSize: 32, fontFamily: 'var(--font-serif)', fill: '#1a1a18' },
  { label: 'Add subheading', fontSize: 20, fontFamily: 'var(--font-sans)', fill: '#6b6560' },
  { label: 'Add body text', fontSize: 14, fontFamily: 'var(--font-sans)', fill: '#1a1a18' },
  { label: 'CAPTION', fontSize: 10, fontFamily: 'var(--font-sans)', fill: '#a09890', fontStyle: 'bold', letterSpacing: 3 },
];

const SHAPE_ITEMS = [
  { type: 'rectangle', label: 'Rectangle', preview: '▬' },
  { type: 'circle', label: 'Circle', preview: '●' },
  { type: 'star', label: 'Star', preview: '★' },
  { type: 'polygon', label: 'Hexagon', preview: '⬡' },
];

const SHAPE_COLORS = ['#E85D26', '#fdc930', '#1a1a18', '#4CAF50', '#2196F3', '#9C27B0', '#FF9800', '#607D8B'];

export default function LeftSidebar() {
  const { addElement } = useEditorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    addElement({
      type: 'image',
      src,
      x: 100, y: 100, width: 200, height: 150,
      rotation: 0, opacity: 1, locked: false,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              handleAddImage(event.target.result as string);
            }
          };
          reader.readAsDataURL(file);
        }
      });
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-[320px] h-full bg-[#FFFFFF] border-r border-[#e8e2d9] flex z-10 shrink-0">
      <Tabs defaultValue="images" className="flex w-full h-full">
        {/* Icon strip */}
        <div className="w-[64px] h-full border-r border-[#e8e2d9] flex flex-col py-3 gap-1 bg-[#FAF6EE] overflow-y-auto shrink-0">
          <TabsList className="flex flex-col items-center justify-start h-auto bg-transparent gap-1 w-full p-0">
            {TABS.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="w-full flex-col h-14 rounded-none data-[state=active]:bg-[#FFFFFF] data-[state=active]:text-[#E85D26] text-[#6b6560] hover:text-[#E85D26] transition-colors border-l-2 border-transparent data-[state=active]:border-[#E85D26] data-[state=active]:shadow-none"
              >
                <tab.icon size={18} className="mb-0.5" />
                <span className="text-[9px] font-medium leading-tight">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Content area */}
        <div className="flex-1 h-full bg-[#FFFFFF] min-w-0">
          {/* === IMAGES TAB === */}
          <TabsContent value="images" className="m-0 h-full data-[state=active]:flex flex-col">
            <ScrollArea className="h-full w-full">
              <div className="p-4 space-y-5">
                <h3 className="font-serif text-lg text-[#1a1a18]">Photos</h3>

                {/* Upload Area */}
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
                      const files = e.dataTransfer.files;
                      if (files) {
                        Array.from(files).forEach(file => {
                          if (file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) handleAddImage(event.target.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        });
                      }
                    }}
                    className="w-full py-6 border-2 border-dashed border-[#E85D26] rounded-xl flex flex-col items-center justify-center gap-2 bg-[#FAF6EE] text-[#E85D26] hover:bg-[#f4efeb] transition-colors cursor-pointer group"
                  >
                    <Upload size={22} className="group-hover:scale-110 transition-transform" />
                    <div className="text-center">
                      <span className="font-semibold block text-xs">Upload Photos</span>
                      <span className="text-[10px] text-[#6b6560]">Click or drag & drop • Multiple files</span>
                    </div>
                  </div>
                </div>

                <div className="w-full h-px bg-[#e8e2d9]" />

                {/* Stock Photos */}
                <div>
                  <h4 className="text-xs font-semibold text-[#1a1a18] mb-3">Stock Photos</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {DUMMY_PHOTOS.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => handleAddImage(src)}
                        className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-[#e8e2d9] hover:border-[#E85D26] hover:shadow-md transition-all group"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={`Stock photo ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* === TEXT TAB === */}
          <TabsContent value="text" className="m-0 h-full data-[state=active]:flex flex-col">
            <ScrollArea className="h-full w-full">
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
            </ScrollArea>
          </TabsContent>

          {/* === SHAPES TAB === */}
          <TabsContent value="shapes" className="m-0 h-full data-[state=active]:flex flex-col">
            <ScrollArea className="h-full w-full">
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

                <div className="w-full h-px bg-[#e8e2d9]" />

                <div>
                  <h4 className="text-xs font-semibold text-[#1a1a18] mb-3">Quick Colors</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {SHAPE_COLORS.map(color => (
                      <button
                        key={color}
                        onClick={() => handleAddShape('rectangle', color)}
                        className="aspect-square rounded-lg border border-[#e8e2d9] hover:scale-110 transition-transform hover:shadow-md"
                        style={{ backgroundColor: color }}
                        title={`Add ${color} rectangle`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          {/* === PLACEHOLDER TABS === */}
          {['templates', 'layouts', 'stickers'].map(tabId => (
            <TabsContent key={tabId} value={tabId} className="m-0 h-full data-[state=active]:flex flex-col">
              <ScrollArea className="h-full w-full">
                <div className="p-4">
                  <h3 className="font-serif text-lg text-[#1a1a18] mb-4 capitalize">{tabId}</h3>
                  <div className="text-sm text-[#6b6560] border-2 border-dashed border-[#e8e2d9] rounded-lg p-8 text-center bg-[#FAF6EE]">
                    {tabId === 'templates' && 'Pre-designed page templates coming soon.'}
                    {tabId === 'layouts' && 'Multi-photo layouts coming soon.'}
                    {tabId === 'stickers' && 'Decorative stickers coming soon.'}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
