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

  return (
    <Transformer
      ref={trRef}
      boundBoxFunc={(oldBox, newBox) => {
        // limit resize
        if (newBox.width < 5 || newBox.height < 5) {
          return oldBox;
        }
        return newBox;
      }}
      borderStroke="#E85D26"
      anchorStroke="#E85D26"
      anchorFill="#FFFFFF"
      anchorSize={8 / canvasSettings.zoom}
      borderStrokeWidth={1.5 / canvasSettings.zoom}
      padding={5}
    />
  );
}
