'use client';
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useEditorStore, EditorElement } from '@/store/useEditorStore';
import {
  Lock, Unlock, Eye, EyeOff, Trash2, CopyPlus,
  AlignLeft, AlignCenter, AlignRight,
  AlignStartVertical, AlignCenterVertical, AlignEndVertical,
  FlipHorizontal, FlipVertical,
  ArrowUp, ArrowDown, ChevronsUp, ChevronsDown,
  Layers, Settings2, GripVertical,
} from 'lucide-react';

type TabType = 'properties' | 'layers';

const BG_PRESETS = [
  '#FFFFFF', '#FAF6EE', '#F5F0E8', '#F0EBE3',
  '#1a1a18', '#2c2c2a', '#3d3d3b',
  '#E85D26', '#fdc930', '#4CAF50', '#2196F3',
  '#9C27B0', '#FF9800', '#795548', '#607D8B',
  '#FFF3E0', '#E8F5E9', '#E3F2FD', '#FCE4EC',
];

// ============ PAGE BACKGROUND PANEL ============
function PageBackgroundPanel() {
  const { pages, currentPageId, updatePageBackground } = useEditorStore();
  const currentPage = pages.find(p => p.id === currentPageId);
  const bg = currentPage?.background;

  return (
    <div className="p-4 space-y-5">
      <div className="space-y-1">
        <h4 className="text-[10px] font-semibold text-[#a09890] uppercase tracking-widest">Page Properties</h4>
        <p className="text-xs text-[#6b6560]">No element selected. Edit the page background below.</p>
      </div>

      <Separator className="bg-[#e8e2d9]" />

      <div className="space-y-3">
        <h4 className="text-[10px] font-semibold text-[#a09890] uppercase tracking-widest">Background Color</h4>
        <div className="grid grid-cols-5 gap-1.5">
          {BG_PRESETS.map(color => (
            <button
              key={color}
              className={`w-full aspect-square rounded-md border-2 transition-all hover:scale-110 ${bg?.value === color ? 'border-[#E85D26] ring-1 ring-[#E85D26]/30' : 'border-[#e8e2d9]'
                }`}
              style={{ backgroundColor: color }}
              onClick={() => {
                if (currentPageId) {
                  updatePageBackground(currentPageId, { type: 'solid', value: color, opacity: 1 });
                }
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="color"
            value={bg?.value || '#FFFFFF'}
            onChange={(e) => {
              if (currentPageId) {
                updatePageBackground(currentPageId, { type: 'solid', value: e.target.value, opacity: bg?.opacity ?? 1 });
              }
            }}
            className="w-7 h-7 rounded border border-[#e8e2d9] cursor-pointer"
          />
          <input
            type="text"
            value={bg?.value || '#FFFFFF'}
            onChange={(e) => {
              if (currentPageId) {
                updatePageBackground(currentPageId, { type: 'solid', value: e.target.value, opacity: bg?.opacity ?? 1 });
              }
            }}
            className="flex-1 h-7 px-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none bg-[#faf8f5] font-mono"
          />
        </div>
      </div>

      <Separator className="bg-[#e8e2d9]" />

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-[10px] font-semibold text-[#a09890] uppercase tracking-widest">Opacity</h4>
          <span className="text-[10px] text-[#6b6560] tabular-nums">{Math.round((bg?.opacity ?? 1) * 100)}%</span>
        </div>
        <Slider
          value={[bg?.opacity ?? 1]}
          min={0} max={1} step={0.05}
          onValueChange={(val: any) => {
            if (currentPageId) {
              updatePageBackground(currentPageId, { type: 'solid', value: bg?.value || '#FFFFFF', opacity: val[0] });
            }
          }}
          className="[&_[role=slider]]:border-[#E85D26] [&_[role=slider]]:bg-white [&_.bg-primary]:bg-[#E85D26]"
        />
      </div>
    </div>
  );
}

// ============ PROPERTIES TAB ============
function PropertiesPanel() {
  const { selectedElementIds, pages, currentPageId, updateElement,
    toggleLockSelected, duplicateSelectedElements, deleteSelectedElements,
    bringForward, bringToFront, sendBackward, sendToBack,
  } = useEditorStore();

  const currentPage = pages.find(p => p.id === currentPageId);
  const selectedElement = selectedElementIds.length === 1
    ? currentPage?.elements.find(el => el.id === selectedElementIds[0])
    : null;

  const handleUpdate = (key: string, value: any) => {
    if (currentPageId && selectedElement) {
      updateElement(currentPageId, selectedElement.id, { [key]: value });
    }
  };

  if (!selectedElement) {
    return (
      <PageBackgroundPanel />
    );
  }

  return (
    <div className="p-4 space-y-5">
      {/* Quick Actions Bar */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-7 w-7 text-[#6b6560] hover:text-[#E85D26]"
          onClick={duplicateSelectedElements} title="Duplicate">
          <CopyPlus size={14} />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-[#6b6560] hover:text-[#E85D26]"
          onClick={toggleLockSelected} title={selectedElement.locked ? 'Unlock' : 'Lock'}>
          {selectedElement.locked ? <Lock size={14} /> : <Unlock size={14} />}
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="h-7 w-7 text-[#6b6560] hover:text-[#E85D26]"
          onClick={bringForward} title="Bring Forward"><ArrowUp size={14} /></Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-[#6b6560] hover:text-[#E85D26]"
          onClick={sendBackward} title="Send Backward"><ArrowDown size={14} /></Button>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-600"
          onClick={deleteSelectedElements} title="Delete">
          <Trash2 size={14} />
        </Button>
      </div>

      <Separator className="bg-[#e8e2d9]" />

      {/* Position & Size */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-semibold text-[#a09890] uppercase tracking-widest">Position & Size</h4>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'X', key: 'x' },
            { label: 'Y', key: 'y' },
            { label: 'W', key: 'width' },
            { label: 'H', key: 'height' },
          ].map(({ label, key }) => (
            <div key={key} className="space-y-1">
              <label className="text-[10px] text-[#a09890] uppercase">{label}</label>
              <input
                type="number"
                value={Math.round(selectedElement[key])}
                onChange={(e) => handleUpdate(key, Number(e.target.value))}
                className="w-full h-7 px-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none bg-[#faf8f5]"
              />
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-[#e8e2d9]" />

      {/* Rotation */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-[10px] font-semibold text-[#a09890] uppercase tracking-widest">Rotation</h4>
          <span className="text-[10px] text-[#6b6560] tabular-nums">{Math.round(selectedElement.rotation || 0)}°</span>
        </div>
        <Slider
          value={[selectedElement.rotation || 0]}
          min={-180} max={180} step={1}
          onValueChange={(val: any) => handleUpdate('rotation', val[0])}
          className="[&_[role=slider]]:border-[#E85D26] [&_[role=slider]]:bg-white [&_.bg-primary]:bg-[#E85D26]"
        />
      </div>

      <Separator className="bg-[#e8e2d9]" />

      {/* Opacity */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="text-[10px] font-semibold text-[#a09890] uppercase tracking-widest">Opacity</h4>
          <span className="text-[10px] text-[#6b6560] tabular-nums">{Math.round((selectedElement.opacity ?? 1) * 100)}%</span>
        </div>
        <Slider
          value={[selectedElement.opacity ?? 1]}
          min={0} max={1} step={0.05}
          onValueChange={(val: any) => handleUpdate('opacity', val[0])}
          className="[&_[role=slider]]:border-[#E85D26] [&_[role=slider]]:bg-white [&_.bg-primary]:bg-[#E85D26]"
        />
      </div>

      {/* === TEXT PROPERTIES === */}
      {selectedElement.type === 'text' && (
        <>
          <Separator className="bg-[#e8e2d9]" />
          <div className="space-y-3">
            <h4 className="text-[10px] font-semibold text-[#a09890] uppercase tracking-widest">Typography</h4>
            <div className="space-y-2">
              <select
                value={selectedElement.fontFamily || 'var(--font-sans)'}
                onChange={(e) => handleUpdate('fontFamily', e.target.value)}
                className="w-full h-7 px-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none bg-[#faf8f5]"
              >
                <option value="var(--font-sans)">Sans Serif</option>
                <option value="var(--font-serif)">Serif</option>
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Verdana">Verdana</option>
              </select>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#a09890]">Size</label>
                  <input
                    type="number"
                    value={selectedElement.fontSize || 16}
                    onChange={(e) => handleUpdate('fontSize', Number(e.target.value))}
                    className="w-full h-7 px-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none bg-[#faf8f5]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#a09890]">Line Height</label>
                  <input
                    type="number"
                    step="0.1"
                    value={selectedElement.lineHeight || 1.2}
                    onChange={(e) => handleUpdate('lineHeight', Number(e.target.value))}
                    className="w-full h-7 px-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none bg-[#faf8f5]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#a09890]">Letter Spacing</label>
                  <input
                    type="number"
                    step="0.5"
                    value={selectedElement.letterSpacing || 0}
                    onChange={(e) => handleUpdate('letterSpacing', Number(e.target.value))}
                    className="w-full h-7 px-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none bg-[#faf8f5]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#a09890]">Weight</label>
                  <select
                    value={selectedElement.fontStyle || 'normal'}
                    onChange={(e) => handleUpdate('fontStyle', e.target.value)}
                    className="w-full h-7 px-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none bg-[#faf8f5]"
                  >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                    <option value="italic">Italic</option>
                    <option value="bold italic">Bold Italic</option>
                  </select>
                </div>
              </div>
              {/* Alignment */}
              <div className="flex gap-1">
                {['left', 'center', 'right'].map(align => (
                  <Button key={align} variant={selectedElement.align === align ? 'secondary' : 'ghost'} size="icon"
                    className="h-7 w-7 text-[#6b6560]"
                    onClick={() => handleUpdate('align', align)}>
                    {align === 'left' && <AlignLeft size={14} />}
                    {align === 'center' && <AlignCenter size={14} />}
                    {align === 'right' && <AlignRight size={14} />}
                  </Button>
                ))}
              </div>
              {/* Color */}
              <div className="space-y-1">
                <label className="text-[10px] text-[#a09890]">Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={selectedElement.fill || '#1a1a18'}
                    onChange={(e) => handleUpdate('fill', e.target.value)}
                    className="w-7 h-7 rounded border border-[#e8e2d9] cursor-pointer"
                  />
                  <input
                    type="text"
                    value={selectedElement.fill || '#1a1a18'}
                    onChange={(e) => handleUpdate('fill', e.target.value)}
                    className="flex-1 h-7 px-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none bg-[#faf8f5] font-mono"
                  />
                </div>
              </div>
              {/* Content */}
              <div className="space-y-1">
                <label className="text-[10px] text-[#a09890]">Content</label>
                <textarea
                  value={selectedElement.text}
                  onChange={(e) => handleUpdate('text', e.target.value)}
                  className="w-full p-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none min-h-[60px] bg-[#faf8f5]"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* === SHAPE PROPERTIES === */}
      {selectedElement.type === 'shape' && (
        <>
          <Separator className="bg-[#e8e2d9]" />
          <div className="space-y-3">
            <h4 className="text-[10px] font-semibold text-[#a09890] uppercase tracking-widest">Fill & Stroke</h4>
            <div className="space-y-2">
              <div className="space-y-1">
                <label className="text-[10px] text-[#a09890]">Fill Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={selectedElement.fill || '#E85D26'}
                    onChange={(e) => handleUpdate('fill', e.target.value)}
                    className="w-7 h-7 rounded border border-[#e8e2d9] cursor-pointer" />
                  <input type="text" value={selectedElement.fill || '#E85D26'}
                    onChange={(e) => handleUpdate('fill', e.target.value)}
                    className="flex-1 h-7 px-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none bg-[#faf8f5] font-mono" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#a09890]">Stroke Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={selectedElement.stroke || '#000000'}
                    onChange={(e) => handleUpdate('stroke', e.target.value)}
                    className="w-7 h-7 rounded border border-[#e8e2d9] cursor-pointer" />
                  <input type="text" value={selectedElement.stroke || ''}
                    onChange={(e) => handleUpdate('stroke', e.target.value)}
                    placeholder="none"
                    className="flex-1 h-7 px-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none bg-[#faf8f5] font-mono" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-[#a09890]">Stroke Width</label>
                  <input type="number" value={selectedElement.strokeWidth || 0} min={0}
                    onChange={(e) => handleUpdate('strokeWidth', Number(e.target.value))}
                    className="w-full h-7 px-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none bg-[#faf8f5]" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-[#a09890]">Corner Radius</label>
                  <input type="number" value={selectedElement.cornerRadius || 0} min={0}
                    onChange={(e) => handleUpdate('cornerRadius', Number(e.target.value))}
                    className="w-full h-7 px-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none bg-[#faf8f5]" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* === IMAGE PROPERTIES === */}
      {selectedElement.type === 'image' && (
        <>
          <Separator className="bg-[#e8e2d9]" />
          <div className="space-y-3">
            <h4 className="text-[10px] font-semibold text-[#a09890] uppercase tracking-widest">Image</h4>
            <div className="space-y-2">
              <div className="space-y-1">
                <label className="text-[10px] text-[#a09890]">Border Radius</label>
                <input type="number" value={selectedElement.cornerRadius || 0} min={0}
                  onChange={(e) => handleUpdate('cornerRadius', Number(e.target.value))}
                  className="w-full h-7 px-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none bg-[#faf8f5]" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#a09890]">Border Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={selectedElement.stroke || '#000000'}
                    onChange={(e) => handleUpdate('stroke', e.target.value)}
                    className="w-7 h-7 rounded border border-[#e8e2d9] cursor-pointer" />
                  <input type="text" value={selectedElement.stroke || ''}
                    onChange={(e) => handleUpdate('stroke', e.target.value)}
                    placeholder="none"
                    className="flex-1 h-7 px-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none bg-[#faf8f5] font-mono" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-[#a09890]">Border Width</label>
                <input type="number" value={selectedElement.strokeWidth || 0} min={0}
                  onChange={(e) => handleUpdate('strokeWidth', Number(e.target.value))}
                  className="w-full h-7 px-2 text-xs border border-[#e8e2d9] rounded-md focus:border-[#E85D26] focus:outline-none bg-[#faf8f5]" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ============ LAYERS TAB ============
function LayersPanel() {
  const {
    pages, currentPageId, selectedElementIds, setSelectedElements,
    updateElement, toggleLockSelected, toggleHideSelected,
    bringForward, sendBackward, deleteSelectedElements,
  } = useEditorStore();

  const currentPage = pages.find(p => p.id === currentPageId);
  // Show layers in reverse order (top layer first)
  const elements = currentPage ? [...currentPage.elements].reverse() : [];

  const getElementLabel = (el: EditorElement) => {
    if (el.type === 'text') return el.text?.slice(0, 20) || 'Text';
    if (el.type === 'image') return 'Image';
    if (el.type === 'shape') return el.shapeType || 'Shape';
    return 'Element';
  };

  const getElementIcon = (el: EditorElement) => {
    if (el.type === 'text') return 'T';
    if (el.type === 'image') return '🖼';
    if (el.type === 'shape') return '◆';
    return '•';
  };

  return (
    <div className="p-2">
      {elements.length === 0 ? (
        <div className="text-center text-xs text-[#a09890] py-8">No elements on this page</div>
      ) : (
        <div className="space-y-0.5">
          {elements.map((el) => {
            const isSelected = selectedElementIds.includes(el.id);
            return (
              <div
                key={el.id}
                className={`group flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors text-xs ${isSelected
                  ? 'bg-[#E85D26]/10 text-[#E85D26]'
                  : 'hover:bg-[#f4efeb] text-[#1a1a18]'
                  } ${el.hidden ? 'opacity-40' : ''}`}
                onClick={() => setSelectedElements([el.id])}
              >
                <span className="w-5 text-center text-sm flex-shrink-0">{getElementIcon(el)}</span>
                <span className="flex-1 truncate text-[11px]">{getElementLabel(el)}</span>
                <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="p-0.5 hover:text-[#E85D26]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedElements([el.id]);
                      setTimeout(() => {
                        useEditorStore.getState().toggleLockSelected();
                      }, 0);
                    }}
                    title={el.locked ? 'Unlock' : 'Lock'}
                  >
                    {el.locked ? <Lock size={11} /> : <Unlock size={11} />}
                  </button>
                  <button
                    className="p-0.5 hover:text-[#E85D26]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedElements([el.id]);
                      setTimeout(() => {
                        useEditorStore.getState().toggleHideSelected();
                      }, 0);
                    }}
                    title={el.hidden ? 'Show' : 'Hide'}
                  >
                    {el.hidden ? <EyeOff size={11} /> : <Eye size={11} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


// ============ MAIN SIDEBAR ============
export default function RightSidebar() {
  const [activeTab, setActiveTab] = useState<TabType>('properties');

  return (
    <div className="w-[280px] h-full bg-[#FFFFFF] border-l border-[#e8e2d9] z-10 shrink-0 flex flex-col">
      {/* Tab Switcher */}
      <div className="flex border-b border-[#e8e2d9]">
        <button
          className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors border-b-2 ${activeTab === 'properties'
            ? 'border-[#E85D26] text-[#E85D26]'
            : 'border-transparent text-[#6b6560] hover:text-[#1a1a18]'
            }`}
          onClick={() => setActiveTab('properties')}
        >
          <Settings2 size={14} /> Design
        </button>
        <button
          className={`flex-1 py-3 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 transition-colors border-b-2 ${activeTab === 'layers'
            ? 'border-[#E85D26] text-[#E85D26]'
            : 'border-transparent text-[#6b6560] hover:text-[#1a1a18]'
            }`}
          onClick={() => setActiveTab('layers')}
        >
          <Layers size={14} /> Layers
        </button>
      </div>

      <ScrollArea className="flex-1 w-full">
        {activeTab === 'properties' && <PropertiesPanel />}
        {activeTab === 'layers' && <LayersPanel />}
      </ScrollArea>
    </div>
  );
}
