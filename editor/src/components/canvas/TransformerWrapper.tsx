'use client';
import React, { useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';
import { useEditorStore } from '@/store/useEditorStore';

interface TransformerWrapperProps {
  selectedNode: any;
}

export default function TransformerWrapper({ selectedNode }: TransformerWrapperProps) {
  const trRef = useRef<any>(null);
  const { canvasSettings } = useEditorStore();

  useEffect(() => {
    if (selectedNode && trRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([selectedNode]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedNode]);

  if (!selectedNode) {
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
