'use client';
import React, { useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LayoutTemplate, Type, Image as ImageIcon, Shapes, Grid3X3, FolderHeart, Sticker, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEditorStore } from '@/store/useEditorStore';

const TABS = [
  { id: 'templates', icon: LayoutTemplate, label: 'Templates' },
  { id: 'images', icon: ImageIcon, label: 'Images' },
  { id: 'layouts', icon: Grid3X3, label: 'Layouts' },
  { id: 'text', icon: Type, label: 'Text' },
  { id: 'shapes', icon: Shapes, label: 'Shapes' },
  { id: 'stickers', icon: Sticker, label: 'Stickers' },
];

const DUMMY_PHOTOS = [
  'https://picsum.photos/id/1015/400/300',
  'https://picsum.photos/id/1016/400/300',
  'https://picsum.photos/id/1018/400/300',
  'https://picsum.photos/id/1019/400/300',
  'https://picsum.photos/id/1020/400/300',
  'https://picsum.photos/id/1021/400/300',
];

export default function LeftSidebar() {
  const { addElement } = useEditorStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddText = () => {
    addElement({
      type: 'text',
      x: 150, y: 150, width: 250, height: 40,
      rotation: 0, opacity: 1, locked: false,
      text: 'Add a heading', fontSize: 32, fontFamily: 'var(--font-serif)', fill: '#1a1a18'
    });
  };

  const handleAddShape = (shapeType: string) => {
    addElement({
      type: 'shape',
      shapeType,
      x: 150, y: 150, width: 100, height: 100,
      rotation: 0, opacity: 1, locked: false,
      fill: '#E85D26'
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
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleAddImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset input
    }
  };

  return (
    <div className="w-[320px] h-full bg-[#FFFFFF] border-r border-[#e8e2d9] flex z-10 shrink-0">
      <Tabs defaultValue="templates" className="flex w-full h-full">
        <div className="w-[72px] h-full border-r border-[#e8e2d9] flex flex-col items-center py-4 gap-2 bg-[#FAF6EE]">
          <TabsList className="flex flex-col h-auto bg-transparent gap-2 w-full p-0">
            {TABS.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="w-full flex-col h-16 rounded-none data-[state=active]:bg-[#FFFFFF] data-[state=active]:text-[#E85D26] text-[#6b6560] hover:text-[#E85D26] transition-colors border-l-2 border-transparent data-[state=active]:border-[#E85D26] data-[state=active]:shadow-none"
              >
                <tab.icon size={20} className="mb-1" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <div className="flex-1 h-full bg-[#FFFFFF]">
          {TABS.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="m-0 h-full data-[state=active]:flex flex-col">
              <ScrollArea className="h-full w-full">
                <div className="p-4">
                  <h3 className="font-serif text-lg text-[#1a1a18] mb-4">{tab.label}</h3>
                  
                  {tab.id === 'text' && (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <button 
                        onClick={handleAddText}
                        className="w-full p-4 border border-[#e8e2d9] rounded-lg hover:border-[#E85D26] hover:bg-[#FAF6EE] text-left transition-colors"
                      >
                        <span className="font-serif text-xl block">Add a heading</span>
                      </button>
                    </motion.div>
                  )}

                  {tab.id === 'shapes' && (
                    <div className="grid grid-cols-2 gap-3">
                      {['rectangle', 'circle', 'star', 'polygon'].map((shape) => (
                        <motion.button 
                          key={shape}
                          whileHover={{ scale: 1.05 }} 
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddShape(shape)}
                          className="aspect-square border border-[#e8e2d9] rounded-lg flex items-center justify-center hover:border-[#E85D26] hover:bg-[#FAF6EE] transition-colors capitalize text-sm font-medium text-[#6b6560]"
                        >
                          {shape}
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {tab.id === 'images' && (
                    <div className="space-y-6">
                      {/* Upload Area */}
                      <div>
                        <h4 className="text-sm font-semibold text-[#1a1a18] mb-3">Upload your own</h4>
                        <input 
                          type="file" 
                          accept="image/*" 
                          ref={fileInputRef} 
                          className="hidden" 
                          onChange={handleFileUpload}
                        />
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={(e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); }}
                          onDrop={(e: React.DragEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const file = e.dataTransfer.files?.[0];
                            if (file && file.type.startsWith('image/')) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) handleAddImage(event.target.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="w-full py-8 border-2 border-dashed border-[#E85D26] rounded-xl flex flex-col items-center justify-center gap-3 bg-[#FAF6EE] text-[#E85D26] hover:bg-[#f4efeb] transition-colors cursor-pointer"
                        >
                          <Upload size={24} />
                          <div className="text-center">
                            <span className="font-semibold block text-sm">Click or Drag & Drop</span>
                            <span className="text-[10px] text-[#6b6560]">SVG, PNG, JPG or GIF</span>
                          </div>
                        </motion.div>
                      </div>

                      <div className="w-full h-px bg-[#e8e2d9]" />

                      {/* Random Stock Photos */}
                      <div>
                        <h4 className="text-sm font-semibold text-[#1a1a18] mb-3">Stock Photos</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {DUMMY_PHOTOS.map((src, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAddImage(src)}
                              className="w-full aspect-square rounded-md overflow-hidden border border-[#e8e2d9] hover:border-[#E85D26]"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={src} alt="dummy" className="w-full h-full object-cover" />
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {['templates', 'layouts', 'stickers'].includes(tab.id) && (
                    <div className="text-sm text-[#6b6560] border-2 border-dashed border-[#e8e2d9] rounded-lg p-8 text-center bg-[#FAF6EE]">
                      Placeholder for {tab.label} content.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
