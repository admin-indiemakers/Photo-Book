'use client';
import React, { useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';
import { useEditorStore } from '@/store/useEditorStore';

interface TransformerWrapperProps {
  selectedNodes: any[];
}

export default function TransformerWrapper({ selectedNodes }: TransformerWrapperProps) {
  const trRef = useRef<any>(null);
  const { canvasSettings } = useEditorStore();

  useEffect(() => {
    if (selectedNodes.length > 0 && trRef.current) {
      trRef.current.nodes(selectedNodes);
      trRef.current.getLayer().batchDraw();
    } else if (trRef.current) {
      trRef.current.nodes([]);
    }
  }, [selectedNodes]);

  if (selectedNodes.length === 0) {
    return null;
  }

  const invZoom = 1 / canvasSettings.zoom;

  return (
    <Transformer
      ref={trRef}
      boundBoxFunc={(oldBox, newBox) => {
        if (newBox.width < 5 || newBox.height < 5) {
          return oldBox;
        }
        return newBox;
      }}
      borderStroke="#E85D26"
      anchorStroke="#E85D26"
      anchorFill="#FFFFFF"
      anchorSize={Math.max(6, 8 * invZoom)}
      anchorCornerRadius={2 * invZoom}
      borderStrokeWidth={1.5 * invZoom}
      borderDash={[]}
      rotateAnchorOffset={20 * invZoom}
      rotateAnchorCursor="grab"
      enabledAnchors={[
        'top-left', 'top-center', 'top-right',
        'middle-left', 'middle-right',
        'bottom-left', 'bottom-center', 'bottom-right',
      ]}
      rotateEnabled={true}
      padding={2}
      ignoreStroke={true}
      keepRatio={false}
    />
  );
}
