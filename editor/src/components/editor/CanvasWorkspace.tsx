'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { Stage, Layer, Rect, Group } from 'react-konva';

import TextElement from '../canvas/elements/TextElement';
import ImageElement from '../canvas/elements/ImageElement';
import ShapeElement from '../canvas/elements/ShapeElement';
import TransformerWrapper from '../canvas/TransformerWrapper';

export default function CanvasWorkspace() {
  const { currentPageId, pages, canvasSettings, setZoom, setPan, selectedElementIds, setSelectedElements, updateElement } = useEditorStore();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedNodes, setSelectedNodes] = useState<any[]>([]);
  const stageRef = useRef<any>(null);
  const [selectionRect, setSelectionRect] = useState({ x1: 0, y1: 0, x2: 0, y2: 0, visible: false });

  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (stageRef.current) {
      const nodes = selectedElementIds.map(id => stageRef.current.findOne(`#${id}`)).filter(Boolean);
      setSelectedNodes(nodes);
    }
  }, [selectedElementIds]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        useEditorStore.getState().deleteSelectedElements();
      }
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'a' || e.key === 'A') {
          if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
          e.preventDefault();
          const state = useEditorStore.getState();
          const page = state.pages.find(p => p.id === state.currentPageId);
          if (page) {
            state.setSelectedElements(page.elements.map(el => el.id));
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!mounted || dimensions.width === 0) return null;

  const handleWheel = (e: any) => {
    e.evt.preventDefault();
    if (e.evt.ctrlKey) {
      const scaleBy = 1.1;
      const oldScale = canvasSettings.zoom;
      const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
      setZoom(Math.max(0.1, Math.min(newScale, 5)));
    } else {
      setPan(canvasSettings.panX - e.evt.deltaX, canvasSettings.panY - e.evt.deltaY);
    }
  };

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage() || e.target.name() === 'page-background';
    if (clickedOnEmpty) {
      setSelectedElements([]);
      const pos = e.target.getStage().getPointerPosition();
      setSelectionRect({ x1: pos.x, y1: pos.y, x2: pos.x, y2: pos.y, visible: true });
    }
  };

  const handleMouseMove = (e: any) => {
    if (!selectionRect.visible) return;
    const pos = e.target.getStage().getPointerPosition();
    setSelectionRect(prev => ({ ...prev, x2: pos.x, y2: pos.y }));
  };

  const handleMouseUp = (e: any) => {
    if (!selectionRect.visible) return;
    setSelectionRect(prev => ({ ...prev, visible: false }));
    const box = {
      x: Math.min(selectionRect.x1, selectionRect.x2),
      y: Math.min(selectionRect.y1, selectionRect.y2),
      width: Math.abs(selectionRect.x1 - selectionRect.x2),
      height: Math.abs(selectionRect.y1 - selectionRect.y2),
    };
    if (box.width === 0 || box.height === 0) return;
    const shapes = stageRef.current.find('.element-node');
    const selected = shapes.filter((shape: any) => {
      const rect = shape.getClientRect({ relativeTo: stageRef.current });
      return (
        rect.x >= box.x && rect.y >= box.y &&
        rect.x + rect.width <= box.x + box.width &&
        rect.y + rect.height <= box.y + box.height
      );
    });
    if (selected.length > 0) {
      setSelectedElements(selected.map((s: any) => s.id()));
    }
  };

  const PAGE_WIDTH = 600;
  const PAGE_HEIGHT = 800;
  
  const initialPanX = (dimensions.width - PAGE_WIDTH) / 2;
  const initialPanY = (dimensions.height - PAGE_HEIGHT) / 2;
  
  const currentPanX = canvasSettings.panX || initialPanX;
  const currentPanY = canvasSettings.panY || initialPanY;

  const currentPage = pages.find(p => p.id === currentPageId);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          // Adjust drop coordinates based on canvas pan/zoom
          const rect = containerRef.current?.getBoundingClientRect();
          let x = 100;
          let y = 100;
          if (rect) {
            const rawX = e.clientX - rect.left;
            const rawY = e.clientY - rect.top;
            x = (rawX - currentPanX) / canvasSettings.zoom;
            y = (rawY - currentPanY) / canvasSettings.zoom;
          }
          
          useEditorStore.getState().addElement({
            type: 'image',
            src: event.target.result as string,
            x, y, width: 200, height: 150,
            rotation: 0, opacity: 1, locked: false,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full" 
      ref={containerRef}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <Stage
        ref={stageRef}
        width={dimensions.width}
        height={dimensions.height}
        onWheel={handleWheel}
        onMouseDown={checkDeselect}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={checkDeselect}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        draggable={false}
      >
        <Layer>
          {canvasSettings.showGrid && (
            <Rect
              x={0} y={0}
              width={dimensions.width} height={dimensions.height}
              fillPatternImage={undefined}
            />
          )}
          
          <Group 
            x={currentPanX} y={currentPanY} 
            scaleX={canvasSettings.zoom} scaleY={canvasSettings.zoom}
          >
            <Rect
              x={0} y={0}
              width={PAGE_WIDTH} height={PAGE_HEIGHT}
              fill="black" opacity={0.1}
              shadowBlur={30} shadowColor="black" shadowOpacity={0.15}
              shadowOffsetX={0} shadowOffsetY={10}
            />
            <Rect
              name="page-background"
              x={0} y={0}
              width={PAGE_WIDTH} height={PAGE_HEIGHT}
              fill="white"
            />
            
            {canvasSettings.showSafeArea && (
              <Rect
                x={20} y={20}
                width={PAGE_WIDTH - 40} height={PAGE_HEIGHT - 40}
                stroke="#E85D26" strokeWidth={1 / canvasSettings.zoom}
                dash={[5, 5]} listening={false}
              />
            )}
            
            {currentPage?.elements.map((el) => {
              const isSelected = selectedElementIds.includes(el.id);
              const props = {
                key: el.id,
                id: el.id,
                element: el,
                isSelected,
                onSelect: (e: any) => {
                  if (e.evt && e.evt.shiftKey) {
                    if (isSelected) {
                      setSelectedElements(selectedElementIds.filter(id => id !== el.id));
                    } else {
                      setSelectedElements([...selectedElementIds, el.id]);
                    }
                  } else {
                    setSelectedElements([el.id]);
                  }
                },
                onChange: (newAttrs: any) => updateElement(currentPageId!, el.id, newAttrs)
              };

              if (el.type === 'text') return <TextElement {...props} />;
              if (el.type === 'image') return <ImageElement {...props} />;
              if (el.type === 'shape') return <ShapeElement {...props} />;
              return null;
            })}

            {selectedNodes.length > 0 && <TransformerWrapper selectedNodes={selectedNodes} />}
          </Group>
          {selectionRect.visible && (
            <Rect
              x={Math.min(selectionRect.x1, selectionRect.x2)}
              y={Math.min(selectionRect.y1, selectionRect.y2)}
              width={Math.abs(selectionRect.x1 - selectionRect.x2)}
              height={Math.abs(selectionRect.y1 - selectionRect.y2)}
              fill="rgba(232, 93, 38, 0.2)"
              stroke="#E85D26"
              strokeWidth={1}
              listening={false}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}
