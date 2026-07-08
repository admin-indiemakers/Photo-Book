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
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const stageRef = useRef<any>(null);

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
    if (selectedElementIds.length > 0 && stageRef.current) {
      const node = stageRef.current.findOne(`#${selectedElementIds[0]}`);
      setSelectedNode(node || null);
    } else {
      setSelectedNode(null);
    }
  }, [selectedElementIds]);

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
    }
  };

  const PAGE_WIDTH = 600;
  const PAGE_HEIGHT = 800;
  
  const initialPanX = (dimensions.width - PAGE_WIDTH) / 2;
  const initialPanY = (dimensions.height - PAGE_HEIGHT) / 2;
  
  const currentPanX = canvasSettings.panX || initialPanX;
  const currentPanY = canvasSettings.panY || initialPanY;

  const currentPage = pages.find(p => p.id === currentPageId);

  return (
    <div className="absolute inset-0 w-full h-full" ref={containerRef}>
      <Stage
        ref={stageRef}
        width={dimensions.width}
        height={dimensions.height}
        onWheel={handleWheel}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
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
                onSelect: () => setSelectedElements([el.id]),
                onChange: (newAttrs: any) => updateElement(currentPageId!, el.id, newAttrs)
              };

              if (el.type === 'text') return <TextElement {...props} />;
              if (el.type === 'image') return <ImageElement {...props} />;
              if (el.type === 'shape') return <ShapeElement {...props} />;
              return null;
            })}

            {selectedNode && <TransformerWrapper selectedNode={selectedNode} />}
          </Group>
        </Layer>
      </Stage>
    </div>
  );
}
