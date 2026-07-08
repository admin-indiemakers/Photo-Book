'use client';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LayoutTemplate, Type, Image as ImageIcon, Shapes, Grid3X3, FolderHeart, Sticker } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEditorStore } from '@/store/useEditorStore';

const TABS = [
  { id: 'templates', icon: LayoutTemplate, label: 'Templates' },
  { id: 'layouts', icon: Grid3X3, label: 'Layouts' },
  { id: 'uploads', icon: FolderHeart, label: 'Uploads' },
  { id: 'text', icon: Type, label: 'Text' },
  { id: 'shapes', icon: Shapes, label: 'Shapes' },
  { id: 'stickers', icon: Sticker, label: 'Stickers' },
  { id: 'photos', icon: ImageIcon, label: 'Photos' },
];

export default function LeftSidebar() {
  const { addElement } = useEditorStore();

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

                  {tab.id !== 'text' && tab.id !== 'shapes' && (
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
