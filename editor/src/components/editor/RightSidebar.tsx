'use client';
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { useEditorStore } from '@/store/useEditorStore';

export default function RightSidebar() {
  const { selectedElementIds, pages, currentPageId, updateElement } = useEditorStore();
  const hasSelection = selectedElementIds.length === 1; // Only single selection for now
  
  const currentPage = pages.find(p => p.id === currentPageId);
  const selectedElement = hasSelection ? currentPage?.elements.find(el => el.id === selectedElementIds[0]) : null;

  const handleUpdate = (key: string, value: any) => {
    if (currentPageId && selectedElement) {
      updateElement(currentPageId, selectedElement.id, { [key]: value });
    }
  };

  return (
    <div className="w-[280px] h-full bg-[#FFFFFF] border-l border-[#e8e2d9] z-10 shrink-0 flex flex-col">
      <div className="p-4 border-b border-[#e8e2d9]">
        <h3 className="font-serif text-lg text-[#1a1a18]">Properties</h3>
      </div>
      
      <ScrollArea className="flex-1 w-full">
        {selectedElement ? (
          <div className="p-4 space-y-6">
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-[#1a1a18] uppercase tracking-wider">Position & Size</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#6b6560]">X</label>
                  <input 
                    type="number" 
                    value={Math.round(selectedElement.x)} 
                    onChange={(e) => handleUpdate('x', Number(e.target.value))}
                    className="w-full h-8 px-2 text-sm border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#6b6560]">Y</label>
                  <input 
                    type="number" 
                    value={Math.round(selectedElement.y)} 
                    onChange={(e) => handleUpdate('y', Number(e.target.value))}
                    className="w-full h-8 px-2 text-sm border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#6b6560]">W</label>
                  <input 
                    type="number" 
                    value={Math.round(selectedElement.width)} 
                    onChange={(e) => handleUpdate('width', Number(e.target.value))}
                    className="w-full h-8 px-2 text-sm border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#6b6560]">H</label>
                  <input 
                    type="number" 
                    value={Math.round(selectedElement.height)} 
                    onChange={(e) => handleUpdate('height', Number(e.target.value))}
                    className="w-full h-8 px-2 text-sm border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-[#e8e2d9]" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-semibold text-[#1a1a18] uppercase tracking-wider">Rotation</h4>
                <span className="text-xs text-[#6b6560]">{Math.round(selectedElement.rotation || 0)}°</span>
              </div>
              <Slider 
                value={[selectedElement.rotation || 0]} 
                min={-180} max={180} step={1}
                onValueChange={(val: any) => handleUpdate('rotation', val[0])}
                className="[&_[role=slider]]:border-[#E85D26] [&_[role=slider]]:bg-white [&_.bg-primary]:bg-[#E85D26]"
              />
            </div>

            <Separator className="bg-[#e8e2d9]" />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-semibold text-[#1a1a18] uppercase tracking-wider">Opacity</h4>
                <span className="text-xs text-[#6b6560]">{Math.round((selectedElement.opacity ?? 1) * 100)}%</span>
              </div>
              <Slider 
                value={[selectedElement.opacity ?? 1]} 
                min={0} max={1} step={0.05}
                onValueChange={(val: any) => handleUpdate('opacity', val[0])}
                className="[&_[role=slider]]:border-[#E85D26] [&_[role=slider]]:bg-white [&_.bg-primary]:bg-[#E85D26]"
              />
            </div>

            {selectedElement.type === 'text' && (
              <>
                <Separator className="bg-[#e8e2d9]" />
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-[#1a1a18] uppercase tracking-wider">Text Properties</h4>
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#6b6560]">Content</label>
                    <textarea 
                      value={selectedElement.text} 
                      onChange={(e) => handleUpdate('text', e.target.value)}
                      className="w-full p-2 text-sm border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none min-h-[80px]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#6b6560]">Font Size</label>
                    <input 
                      type="number" 
                      value={selectedElement.fontSize} 
                      onChange={(e) => handleUpdate('fontSize', Number(e.target.value))}
                      className="w-full h-8 px-2 text-sm border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center p-8 space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#f4efeb] flex items-center justify-center mb-2">
              <div className="w-4 h-4 border-2 border-dashed border-[#6b6560]" />
            </div>
            <p className="text-sm font-medium text-[#1a1a18]">No selection</p>
            <p className="text-xs text-[#6b6560]">Select an element to view and edit its properties.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
