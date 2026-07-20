'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import { Stage, Layer, Rect, Group, Line, Text } from 'react-konva';
import { motion, AnimatePresence } from 'framer-motion';

import TextElement from '../canvas/elements/TextElement';
import ImageElement from '../canvas/elements/ImageElement';
import ShapeElement from '../canvas/elements/ShapeElement';
import TransformerWrapper from '../canvas/TransformerWrapper';
import CanvasRuler, { RulerCorner } from '../canvas/CanvasRuler';

const BLEED = 10;
const SAFE_AREA = 20;
const SNAP_THRESHOLD = 5;

export default function CanvasWorkspace() {
  const {
    currentPageId, currentSpreadIndex, flipDirection, pages, canvasSettings, setZoom, setPan,
    selectedElementIds, setSelectedElements, updateElement,
    showContextMenu, hideContextMenu, snapGuides, setSnapGuides, clearSnapGuides, isHydrated
  } = useEditorStore();

  const PAGE_WIDTH = canvasSettings.width || 600;
  const PAGE_HEIGHT = canvasSettings.height || 800;
  const SPREAD_WIDTH = PAGE_WIDTH * 2;

  // Determine current pages in the spread
  const isCover = currentSpreadIndex === 0;
  const leftPageIndex = isCover ? -1 : (currentSpreadIndex - 1) * 2 + 1;
  const rightPageIndex = isCover ? 0 : (currentSpreadIndex - 1) * 2 + 2;
  const leftPage = pages[leftPageIndex];
  const rightPage = pages[rightPageIndex];

  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedNodes, setSelectedNodes] = useState<any[]>([]);
  const stageRef = useRef<any>(null);
  const spreadGroupRef = useRef<any>(null);
  const [selectionRect, setSelectionRect] = useState({ x1: 0, y1: 0, x2: 0, y2: 0, visible: false });

  // Native Konva animation for smooth spread transitions
  useEffect(() => {
    if (spreadGroupRef.current) {
      const node = spreadGroupRef.current;
      node.opacity(0);
      node.x(flipDirection === 1 ? 40 : -40);

      node.to({
        x: 0,
        opacity: 1,
        duration: 0.4,
        easing: (t: number, b: number, c: number, d: number) => {
          // easeOutQuart
          return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        }
      });
    }
  }, [currentSpreadIndex, flipDirection]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isHydrated) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();

    // Add a small delay for safety in case layout shifts
    const timer = setTimeout(updateDimensions, 50);

    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, [mounted, isHydrated]);

  useEffect(() => {
    if (stageRef.current) {
      const nodes = selectedElementIds.map(id => stageRef.current.findOne(`#${id}`)).filter(Boolean);
      setSelectedNodes(nodes);
    } else {
      setSelectedNodes([]);
    }
  }, [selectedElementIds]);

  if (!mounted || !isHydrated) return null;

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
    if (!canvasSettings.snapToObjects) return { vertical: [] as number[], horizontal: [] as number[] };

    const vertical: number[] = [];
    const horizontal: number[] = [];

    const activeWidth = isCover ? PAGE_WIDTH : SPREAD_WIDTH;

    // Page edges
    vertical.push(0, PAGE_WIDTH, activeWidth);
    horizontal.push(0, PAGE_HEIGHT / 2, PAGE_HEIGHT);

    // Safe area
    vertical.push(SAFE_AREA, PAGE_WIDTH - SAFE_AREA, PAGE_WIDTH + SAFE_AREA, activeWidth - SAFE_AREA);
    horizontal.push(SAFE_AREA, PAGE_HEIGHT - SAFE_AREA);

    // Other element edges & centers
    [leftPage, rightPage].forEach((page, index) => {
      if (!page) return;
      const isRight = index === 1;
      const offsetX = isCover ? 0 : (isRight ? PAGE_WIDTH : 0);
      page.elements.forEach(el => {
        if (el.id === currentId || el.hidden) return;
        const x = el.x + offsetX;
        vertical.push(x, x + el.width / 2, x + el.width);
        horizontal.push(el.y, el.y + el.height / 2, el.y + el.height);
      });
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

  const handleDragEnd = (e: any, element: any, isRightPage: boolean) => {
    clearSnapGuides();
    const newX = e.target.x();
    // Re-normalize X if it was dropped on the other side? For now keep it within its original page.
    updateElement(isRightPage ? rightPage!.id : leftPage!.id, element.id, {
      x: newX,
      y: e.target.y(),
    });
  };

  const ACTIVE_SPREAD_WIDTH = isCover ? PAGE_WIDTH : SPREAD_WIDTH;
  const initialPanX = (dimensions.width - ACTIVE_SPREAD_WIDTH * canvasSettings.zoom) / 2;
  const initialPanY = (dimensions.height - PAGE_HEIGHT * canvasSettings.zoom) / 2;
  // If panX or panY are way off, or default, let's just use initialPanX/Y for now to force center.
  // We can do this by just ignoring canvasSettings.panX/Y if they lead to an off-screen book.
  const currentPanX = initialPanX;
  const currentPanY = initialPanY;

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
          let targetPageId = rightPage?.id || leftPage?.id;
          if (rect) {
            const rawX = e.clientX - rect.left;
            const rawY = e.clientY - rect.top;
            x = (rawX - currentPanX) / canvasSettings.zoom;
            y = (rawY - currentPanY) / canvasSettings.zoom;

            // Check if dropped on left page
            if (!isCover && x < PAGE_WIDTH && leftPage) {
              targetPageId = leftPage.id;
            } else if (!isCover && x >= PAGE_WIDTH && rightPage) {
              x -= PAGE_WIDTH;
              targetPageId = rightPage.id;
            } else if (isCover && rightPage) {
              targetPageId = rightPage.id;
            }
          }
          useEditorStore.getState().addElement({
            type: 'image',
            src: event.target.result as string,
            x, y, width: 200, height: 150,
            rotation: 0, opacity: 1, locked: false,
          }, targetPageId);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!mounted || !isHydrated) return null;

  return (
    <div
      className="absolute inset-0 w-full h-full bg-[#E5E0D8] overflow-hidden"
      ref={containerRef}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onContextMenu={(e) => e.preventDefault()}
    >
      {dimensions.width > 0 && (
        <>
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10, background: 'rgba(0,0,0,0.5)', color: 'white', padding: 5, fontSize: 10 }}>
            Debug: Spread={currentSpreadIndex}, Pages={pages.length}, Left={leftPageIndex}, Right={rightPageIndex} | Pan: {currentPanX}, {currentPanY} | Dim: {dimensions.width}x{dimensions.height}
          </div>
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
                <Group ref={spreadGroupRef}>
                  {/* Premium Hardcover Backing */}
                  <Rect
                    x={-16} y={-16}
                    width={ACTIVE_SPREAD_WIDTH + 32} height={PAGE_HEIGHT + 32}
                    fill="#9C9181"
                    cornerRadius={isCover ? [0, 8, 8, 0] : 8}
                    shadowColor="rgba(0,0,0,0.4)" shadowBlur={50} shadowOffsetY={25} shadowOffsetX={15}
                  />

                  {/* Page Stack Illusion (Left side, only if spread) */}
                  {!isCover && (
                    <Rect
                      x={-8} y={-8}
                      width={8} height={PAGE_HEIGHT + 16}
                      fillLinearGradientStartPoint={{ x: -8, y: 0 }}
                      fillLinearGradientEndPoint={{ x: 0, y: 0 }}
                      fillLinearGradientColorStops={[0, '#D4CBBB', 0.5, '#F5EFE6', 1, '#D4CBBB']}
                      cornerRadius={[2, 0, 0, 2]}
                    />
                  )}

                  {/* Page Stack Illusion (Right side) */}
                  <Rect
                    x={ACTIVE_SPREAD_WIDTH} y={-8}
                    width={8} height={PAGE_HEIGHT + 16}
                    fillLinearGradientStartPoint={{ x: ACTIVE_SPREAD_WIDTH, y: 0 }}
                    fillLinearGradientEndPoint={{ x: ACTIVE_SPREAD_WIDTH + 8, y: 0 }}
                    fillLinearGradientColorStops={[0, '#D4CBBB', 0.5, '#F5EFE6', 1, '#D4CBBB']}
                    cornerRadius={[0, 2, 2, 0]}
                  />

                  {/* Page Stack Illusion (Top edge) */}
                  <Rect
                    x={isCover ? 0 : -8} y={-8}
                    width={isCover ? ACTIVE_SPREAD_WIDTH + 8 : ACTIVE_SPREAD_WIDTH + 16} height={8}
                    fillLinearGradientStartPoint={{ x: 0, y: -8 }}
                    fillLinearGradientEndPoint={{ x: 0, y: 0 }}
                    fillLinearGradientColorStops={[0, '#D4CBBB', 0.5, '#F5EFE6', 1, '#D4CBBB']}
                    cornerRadius={isCover ? [0, 2, 0, 0] : [2, 2, 0, 0]}
                  />

                  {/* Page Stack Illusion (Bottom edge) */}
                  <Rect
                    x={isCover ? 0 : -8} y={PAGE_HEIGHT}
                    width={isCover ? ACTIVE_SPREAD_WIDTH + 8 : ACTIVE_SPREAD_WIDTH + 16} height={8}
                    fillLinearGradientStartPoint={{ x: 0, y: PAGE_HEIGHT }}
                    fillLinearGradientEndPoint={{ x: 0, y: PAGE_HEIGHT + 8 }}
                    fillLinearGradientColorStops={[0, '#D4CBBB', 0.5, '#F5EFE6', 1, '#D4CBBB']}
                    cornerRadius={isCover ? [0, 0, 2, 0] : [0, 0, 2, 2]}
                  />

                  {/* Base Page Shadow */}
                  <Rect
                    x={0} y={0}
                    width={ACTIVE_SPREAD_WIDTH} height={PAGE_HEIGHT}
                    fill="#ffffff"
                    shadowColor="rgba(0,0,0,0.15)" shadowBlur={15} shadowOffsetY={0} shadowOffsetX={0}
                  />

                  {/* Render Pages */}
                  {[leftPage, rightPage].map((page, index) => {
                    const isRight = index === 1;
                    if (isCover && !isRight) return null; // Cover has no left side

                    const offsetX = isCover ? 0 : (isRight ? PAGE_WIDTH : 0);

                    if (!page) {
                      // Contextual Layout Guard for missing page in spread
                      return (
                        <Group key={`fallback-${index}`} x={offsetX} y={0}>
                          <Rect
                            x={0} y={0}
                            width={PAGE_WIDTH} height={PAGE_HEIGHT}
                            fill="#FFFFFF"
                            opacity={0.5}
                            stroke="#e8e2d9"
                            strokeWidth={1}
                            dash={[5, 5]}
                          />
                          <Text
                            x={0} y={PAGE_HEIGHT / 2 - 10}
                            width={PAGE_WIDTH}
                            text={isRight ? "End of Book" : "Blank Page"}
                            align="center"
                            fill="#a09890"
                            fontSize={14}
                          />
                        </Group>
                      );
                    }

                    return (
                      <Group key={page.id} x={offsetX} y={0}>
                        <Rect
                          name="page-background"
                          x={0} y={0}
                          width={PAGE_WIDTH} height={PAGE_HEIGHT}
                          fill={page.background?.value || 'white'}
                          opacity={page.background?.opacity ?? 1}
                        />

                        {/* Elements */}
                        {page.elements.map((el) => {
                          const isSelected = selectedElementIds.includes(el.id);
                          const props = {
                            id: el.id,
                            element: el,
                            isSelected,
                            onSelect: (e: any) => {
                              if (e.evt && e.evt.button === 2) {
                                if (!isSelected) setSelectedElements([el.id]);
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
                            onChange: (newAttrs: any) => updateElement(page.id, el.id, newAttrs),
                            onDragMove: (e: any) => handleDragMove(e, el),
                            onDragEnd: (e: any) => handleDragEnd(e, el, isRight),
                          };

                          if (el.type === 'text') return <TextElement key={el.id} {...props} />;
                          if (el.type === 'image') return <ImageElement key={el.id} {...props} />;
                          if (el.type === 'shape') return <ShapeElement key={el.id} {...props} />;
                          return null;
                        })}
                      </Group>
                    );
                  })}

                  {/* Realistic Spine Crease Effect */}
                  {!isCover && (
                    <Group x={PAGE_WIDTH} y={0}>
                      {/* Deep center crease */}
                      <Rect x={-15} y={0} width={30} height={PAGE_HEIGHT}
                        fillLinearGradientStartPoint={{ x: -15, y: 0 }}
                        fillLinearGradientEndPoint={{ x: 15, y: 0 }}
                        fillLinearGradientColorStops={[
                          0, 'rgba(0,0,0,0)',
                          0.45, 'rgba(0,0,0,0.3)',
                          0.5, 'rgba(0,0,0,0.6)',
                          0.55, 'rgba(0,0,0,0.3)',
                          1, 'rgba(0,0,0,0)'
                        ]}
                        listening={false}
                      />
                      {/* Left Page Bulge Highlight */}
                      <Rect x={-50} y={0} width={35} height={PAGE_HEIGHT}
                        fillLinearGradientStartPoint={{ x: -50, y: 0 }}
                        fillLinearGradientEndPoint={{ x: -15, y: 0 }}
                        fillLinearGradientColorStops={[0, 'rgba(255,255,255,0)', 1, 'rgba(255,255,255,0.7)']}
                        listening={false}
                      />
                      {/* Right Page Drop Shadow (from left page / light source) */}
                      <Rect x={15} y={0} width={50} height={PAGE_HEIGHT}
                        fillLinearGradientStartPoint={{ x: 15, y: 0 }}
                        fillLinearGradientEndPoint={{ x: 65, y: 0 }}
                        fillLinearGradientColorStops={[0, 'rgba(0,0,0,0.15)', 1, 'rgba(0,0,0,0)']}
                        listening={false}
                      />
                    </Group>
                  )}

                  {/* Global Lighting Overlay */}
                  <Rect
                    x={0} y={0}
                    width={ACTIVE_SPREAD_WIDTH} height={PAGE_HEIGHT}
                    fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                    fillLinearGradientEndPoint={{ x: ACTIVE_SPREAD_WIDTH, y: PAGE_HEIGHT }}
                    fillLinearGradientColorStops={[
                      0, 'rgba(255,255,255,0.15)',
                      0.5, 'rgba(255,255,255,0)',
                      1, 'rgba(0,0,0,0.05)'
                    ]}
                    listening={false}
                  />
                </Group>

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
        </>
      )}
    </div>
  );
}
