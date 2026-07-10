'use client';
import React from 'react';
import { Text } from 'react-konva';

interface TextElementProps {
  element: any;
  isSelected: boolean;
  onSelect: (e: any) => void;
  onChange: (newAttrs: any) => void;
}

export default function TextElement({ element, isSelected, onSelect, onChange }: TextElementProps) {
  const textRef = React.useRef<any>(null);

  const handleChange = (e: any) => {
    const node = textRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    onChange({
      ...element,
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      rotation: node.rotation()
    });
  };

  return (
    <Text
      ref={textRef}
      {...element}
      draggable={!element.locked}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e: any) => {
        onChange({
          ...element,
          x: e.target.x(),
          y: e.target.y()
        });
      }}
      onTransformEnd={handleChange}
    />
  );
}
