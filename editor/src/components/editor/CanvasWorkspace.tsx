'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { Stage, Layer, Rect, Group, Line } from 'react-konva';

import TextElement from '../canvas/elements/TextElement';
import ImageElement from '../canvas/elements/ImageElement';
import ShapeElement from '../canvas/elements/ShapeElement';
import TransformerWrapper from '../canvas/TransformerWrapper';
import CanvasRuler, { RulerCorner } from '../canvas/CanvasRuler';

const PAGE_WIDTH = 600;
const PAGE_HEIGHT = 800;
const BLEED = 10;
const SAFE_AREA = 20;
const SNAP_THRESHOLD = 5;

export default function CanvasWorkspace() {
  const {
    currentPageId, pages, canvasSettings, setZoom, setPan,
    selectedElementIds, setSelectedElements, updateElement,
    showContextMenu, hideContextMenu, snapGuides, setSnapGuides, clearSnapGuides,
  } = useEditorStore();

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
    } else {
      setSelectedNodes([]);
    }
  }, [selectedElementIds]);

  if (!mounted || dimensions.width === 0) return null;

  const handleWheel = (e: any) => {
    e.evt.preventDefault();
    if (e.evt.ctrlKey) {
      const scaleBy = 1.08;
      const oldScale = canvasSettings.zoom;
      const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
      setZoom(Math.max(0.1, Math.min(newScale, 5)));
    } else {
      setPan(canvasSettings.panX - e.evt.deltaX, canvasSettings.panY - e.evt.deltaY);
    }
  };

  const checkDeselect = (e: any) => {
    // Right click - show context menu
    if (e.evt && e.evt.button === 2) {
      e.evt.preventDefault();
      return;
    }
    const clickedOnEmpty = e.target === e.target.getStage() || e.target.name() === 'page-background';
    if (clickedOnEmpty) {
      hideContextMenu();
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

  const handleMouseUp = () => {
    if (!selectionRect.visible) return;
    setSelectionRect(prev => ({ ...prev, visible: false }));
    const box = {
      x: Math.min(selectionRect.x1, selectionRect.x2),
      y: Math.min(selectionRect.y1, selectionRect.y2),
      width: Math.abs(selectionRect.x1 - selectionRect.x2),
      height: Math.abs(selectionRect.y1 - selectionRect.y2),
    };
    if (box.width < 3 || box.height < 3) return;
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

  const handleContextMenu = (e: any) => {
    e.evt.preventDefault();
    e.evt.stopPropagation();
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (containerRect) {
      showContextMenu(
        pos.x + containerRect.left,
        pos.y + containerRect.top,
      );
    }
  };

  // ============ SNAPPING ENGINE ============
  const getSnapLines = (currentId: string) => {
    const currentPage = pages.find(p => p.id === currentPageId);
    if (!currentPage || !canvasSettings.snapToObjects) return { vertical: [] as number[], horizontal: [] as number[] };

    const vertical: number[] = [];
    const horizontal: number[] = [];

    // Page edges
    vertical.push(0, PAGE_WIDTH / 2, PAGE_WIDTH);
    horizontal.push(0, PAGE_HEIGHT / 2, PAGE_HEIGHT);

    // Safe area
    vertical.push(SAFE_AREA, PAGE_WIDTH - SAFE_AREA);
    horizontal.push(SAFE_AREA, PAGE_HEIGHT - SAFE_AREA);

    // Other element edges & centers
    currentPage.elements.forEach(el => {
      if (el.id === currentId || el.hidden) return;
      vertical.push(el.x, el.x + el.width / 2, el.x + el.width);
      horizontal.push(el.y, el.y + el.height / 2, el.y + el.height);
    });

    return { vertical, horizontal };
  };

  const handleDragMove = (e: any, element: any) => {
    if (!canvasSettings.snapToObjects) return;
    const node = e.target;
    const { vertical, horizontal } = getSnapLines(element.id);
    const guides: typeof snapGuides = [];

    const nodeX = node.x();
    const nodeY = node.y();
    const nodeW = node.width() * node.scaleX();
    const nodeH = node.height() * node.scaleY();
    const nodeEdgesX = [nodeX, nodeX + nodeW / 2, nodeX + nodeW];
    const nodeEdgesY = [nodeY, nodeY + nodeH / 2, nodeY + nodeH];

    for (const vLine of vertical) {
      for (const edge of nodeEdgesX) {
        if (Math.abs(edge - vLine) < SNAP_THRESHOLD) {
          node.x(nodeX + (vLine - edge));
          guides.push({ type: 'vertical', position: vLine });
          break;
        }
      }
    }
    for (const hLine of horizontal) {
      for (const edge of nodeEdgesY) {
        if (Math.abs(edge - hLine) < SNAP_THRESHOLD) {
          node.y(nodeY + (hLine - edge));
          guides.push({ type: 'horizontal', position: hLine });
          break;
        }
      }
    }
    setSnapGuides(guides);
  };

  const handleDragEnd = (e: any, element: any) => {
    clearSnapGuides();
    updateElement(currentPageId!, element.id, {
      x: e.target.x(),
      y: e.target.y(),
    });
  };

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
      onContextMenu={(e) => e.preventDefault()}
    >
      {canvasSettings.showRulers && (
        <>
          <RulerCorner />
          <CanvasRuler
            direction="horizontal"
            canvasWidth={dimensions.width}
            canvasHeight={dimensions.height}
            panX={currentPanX}
            panY={currentPanY}
            zoom={canvasSettings.zoom}
          />
          <CanvasRuler
            direction="vertical"
            canvasWidth={dimensions.width}
            canvasHeight={dimensions.height}
            panX={currentPanX}
            panY={currentPanY}
            zoom={canvasSettings.zoom}
          />
        </>
      )}
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
        onContextMenu={handleContextMenu}
        draggable={false}
      >
        <Layer>
          {/* Canvas background grid */}
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
            {/* Page shadow */}
            <Rect
              x={0} y={0}
              width={PAGE_WIDTH} height={PAGE_HEIGHT}
              fill="black" opacity={0.1}
              shadowBlur={30} shadowColor="black" shadowOpacity={0.15}
              shadowOffsetX={0} shadowOffsetY={10}
            />
            {/* Page background */}
            <Rect
              name="page-background"
              x={0} y={0}
              width={PAGE_WIDTH} height={PAGE_HEIGHT}
              fill={currentPage?.background?.value || 'white'}
              opacity={currentPage?.background?.opacity ?? 1}
            />

            {/* Bleed area */}
            {canvasSettings.showBleed && (
              <Rect
                x={-BLEED} y={-BLEED}
                width={PAGE_WIDTH + BLEED * 2} height={PAGE_HEIGHT + BLEED * 2}
                stroke="#ff4444" strokeWidth={1 / canvasSettings.zoom}
                dash={[3, 3]} listening={false}
              />
            )}

            {/* Safe area */}
            {canvasSettings.showSafeArea && (
              <Rect
                x={SAFE_AREA} y={SAFE_AREA}
                width={PAGE_WIDTH - SAFE_AREA * 2} height={PAGE_HEIGHT - SAFE_AREA * 2}
                stroke="#E85D26" strokeWidth={1 / canvasSettings.zoom}
                dash={[5, 5]} listening={false}
              />
            )}

            {/* Grid overlay */}
            {canvasSettings.showGrid && (() => {
              const lines = [];
              const gs = canvasSettings.gridSize;
              for (let i = gs; i < PAGE_WIDTH; i += gs) {
                lines.push(
                  <Line key={`gv-${i}`} points={[i, 0, i, PAGE_HEIGHT]}
                    stroke="#ddd" strokeWidth={0.5 / canvasSettings.zoom} listening={false} />
                );
              }
              for (let i = gs; i < PAGE_HEIGHT; i += gs) {
                lines.push(
                  <Line key={`gh-${i}`} points={[0, i, PAGE_WIDTH, i]}
                    stroke="#ddd" strokeWidth={0.5 / canvasSettings.zoom} listening={false} />
                );
              }
              return lines;
            })()}

            {/* Elements */}
            {currentPage?.elements.map((el) => {
              const isSelected = selectedElementIds.includes(el.id);
              const props = {
                key: el.id,
                id: el.id,
                element: el,
                isSelected,
                onSelect: (e: any) => {
                  // Right click - select element and show context menu
                  if (e.evt && e.evt.button === 2) {
                    if (!isSelected) {
                      setSelectedElements([el.id]);
                    }
                    return;
                  }
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
                onChange: (newAttrs: any) => updateElement(currentPageId!, el.id, newAttrs),
                onDragMove: (e: any) => handleDragMove(e, el),
                onDragEnd: (e: any) => handleDragEnd(e, el),
              };

              if (el.type === 'text') return <TextElement {...props} />;
              if (el.type === 'image') return <ImageElement {...props} />;
              if (el.type === 'shape') return <ShapeElement {...props} />;
              return null;
            })}

            {/* Snap guides */}
            {snapGuides.map((guide, i) => (
              guide.type === 'vertical' ? (
                <Line
                  key={`snap-${i}`}
                  points={[guide.position, -50, guide.position, PAGE_HEIGHT + 50]}
                  stroke="#E85D26"
                  strokeWidth={1 / canvasSettings.zoom}
                  dash={[4, 4]}
                  listening={false}
                />
              ) : (
                <Line
                  key={`snap-${i}`}
                  points={[-50, guide.position, PAGE_WIDTH + 50, guide.position]}
                  stroke="#E85D26"
                  strokeWidth={1 / canvasSettings.zoom}
                  dash={[4, 4]}
                  listening={false}
                />
              )
            ))}

            {selectedNodes.length > 0 && <TransformerWrapper selectedNodes={selectedNodes} />}
          </Group>

          {/* Selection rectangle */}
          {selectionRect.visible && (
            <Rect
              x={Math.min(selectionRect.x1, selectionRect.x2)}
              y={Math.min(selectionRect.y1, selectionRect.y2)}
              width={Math.abs(selectionRect.x1 - selectionRect.x2)}
              height={Math.abs(selectionRect.y1 - selectionRect.y2)}
              fill="rgba(232, 93, 38, 0.1)"
              stroke="#E85D26"
              strokeWidth={1}
              dash={[4, 4]}
              listening={false}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
}
