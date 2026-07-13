'use client';
import React from 'react';
import { useEditorStore } from '@/store/useEditorStore';

const RULER_SIZE = 24;
const TICK_SMALL = 5;
const TICK_MEDIUM = 8;
const TICK_LARGE = 12;

interface RulerProps {
  direction: 'horizontal' | 'vertical';
  canvasWidth: number;
  canvasHeight: number;
  panX: number;
  panY: number;
  zoom: number;
}

export default function CanvasRuler({ direction, canvasWidth, canvasHeight, panX, panY, zoom }: RulerProps) {
  const isHorizontal = direction === 'horizontal';
  const length = isHorizontal ? canvasWidth : canvasHeight;
  const offset = isHorizontal ? panX : panY;

  // Calculate tick spacing based on zoom
  const getTickSpacing = () => {
    const base = 50;
    if (zoom >= 2) return 25;
    if (zoom >= 1) return 50;
    if (zoom >= 0.5) return 100;
    return 200;
  };

  const tickSpacing = getTickSpacing();

  const renderTicks = () => {
    const ticks: React.ReactNode[] = [];
    const startVal = Math.floor(-offset / zoom / tickSpacing) * tickSpacing - tickSpacing;
    const endVal = Math.ceil((length - offset) / zoom / tickSpacing) * tickSpacing + tickSpacing;

    for (let val = startVal; val <= endVal; val += tickSpacing) {
      const pos = val * zoom + offset;
      if (pos < 0 || pos > length) continue;

      // Major tick
      ticks.push(
        <div
          key={`major-${val}`}
          className="absolute"
          style={isHorizontal
            ? { left: pos, top: RULER_SIZE - TICK_LARGE, width: 1, height: TICK_LARGE }
            : { top: pos, left: RULER_SIZE - TICK_LARGE, width: TICK_LARGE, height: 1 }
          }
        >
          <div className="w-full h-full bg-[#6b6560]" />
        </div>
      );

      // Label
      ticks.push(
        <span
          key={`label-${val}`}
          className="absolute text-[8px] text-[#6b6560] font-mono select-none"
          style={isHorizontal
            ? { left: pos + 2, top: 2 }
            : { top: pos + 2, left: 2, writingMode: 'vertical-lr' as any }
          }
        >
          {val}
        </span>
      );

      // Sub-ticks
      for (let sub = 1; sub < 5; sub++) {
        const subVal = val + (tickSpacing / 5) * sub;
        const subPos = subVal * zoom + offset;
        if (subPos < 0 || subPos > length) continue;

        const isMid = sub === 2 || sub === 3;
        const tickH = isMid ? TICK_MEDIUM : TICK_SMALL;

        ticks.push(
          <div
            key={`sub-${val}-${sub}`}
            className="absolute"
            style={isHorizontal
              ? { left: subPos, top: RULER_SIZE - tickH, width: 1, height: tickH }
              : { top: subPos, left: RULER_SIZE - tickH, width: tickH, height: 1 }
            }
          >
            <div className="w-full h-full bg-[#c0b9b2]" />
          </div>
        );
      }
    }

    return ticks;
  };

  return (
    <div
      className={`absolute bg-[#FAF6EE] border-[#e8e2d9] z-20 select-none overflow-hidden ${
        isHorizontal
          ? `top-0 left-[${RULER_SIZE}px] right-0 border-b`
          : `left-0 top-[${RULER_SIZE}px] bottom-0 border-r`
      }`}
      style={isHorizontal
        ? { height: RULER_SIZE, left: RULER_SIZE }
        : { width: RULER_SIZE, top: RULER_SIZE }
      }
    >
      {renderTicks()}
    </div>
  );
}

// Corner square where rulers meet
export function RulerCorner() {
  return (
    <div
      className="absolute top-0 left-0 bg-[#FAF6EE] border-b border-r border-[#e8e2d9] z-30 flex items-center justify-center"
      style={{ width: RULER_SIZE, height: RULER_SIZE }}
    >
      <span className="text-[8px] text-[#a09890]">px</span>
    </div>
  );
}
