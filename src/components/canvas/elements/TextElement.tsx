'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Text } from 'react-konva';
import { Html } from 'react-konva-utils';

interface TextElementProps {
  element: any;
  isSelected: boolean;
  onSelect: (e: any) => void;
  onChange: (newAttrs: any) => void;
  onDragMove?: (e: any) => void;
  onDragEnd?: (e: any) => void;
}

export default function TextElement({ element, isSelected, onSelect, onChange, onDragMove, onDragEnd }: TextElementProps) {
  const textRef = useRef<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: any) => {
    const node = textRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    const newWidth = Math.max(5, node.width() * scaleX);
    const newHeight = Math.max(5, node.height() * scaleY);

    onChange({
      ...element,
      x: node.x() - newWidth / 2,
      y: node.y() - newHeight / 2,
      width: newWidth,
      height: newHeight,
      rotation: node.rotation()
    });
  };

  const handleDblClick = () => {
    if (element.locked) return;
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <>
        <Text
          ref={textRef}
          {...element}
          name="element-node"
          visible={false}
        />
        <Html
          groupProps={{
            x: element.x + element.width / 2,
            y: element.y + element.height / 2,
            offsetX: element.width / 2,
            offsetY: element.height / 2,
            rotation: element.rotation || 0,
          }}
          divProps={{
            style: { opacity: element.opacity ?? 1 },
          }}
        >
          <textarea
            autoFocus
            value={element.text}
            onChange={(e) => onChange({ ...element, text: e.target.value })}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsEditing(false);
              e.stopPropagation();
            }}
            style={{
              width: `${element.width}px`,
              minHeight: `${element.height}px`,
              fontSize: `${element.fontSize || 16}px`,
              fontFamily: element.fontFamily || 'sans-serif',
              fontWeight: element.fontStyle?.includes('bold') ? 'bold' : 'normal',
              fontStyle: element.fontStyle?.includes('italic') ? 'italic' : 'normal',
              color: element.fill || '#1a1a18',
              textAlign: (element.align as any) || 'left',
              lineHeight: element.lineHeight || 1.2,
              letterSpacing: `${element.letterSpacing || 0}px`,
              border: '2px solid #E85D26',
              borderRadius: '4px',
              padding: '4px',
              background: 'rgba(255,255,255,0.95)',
              outline: 'none',
              resize: 'none',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(232,93,38,0.15)',
            }}
          />
        </Html>
      </>
    );
  }

  const { height, x, y, ...restElement } = element;

  return (
    <Text
      ref={textRef}
      {...restElement}
      x={element.x + element.width / 2}
      y={element.y + (element.height || 0) / 2}
      offsetX={element.width / 2}
      offsetY={(element.height || 0) / 2}
      name="element-node"
      visible={!element.hidden}
      draggable={!element.locked}
      onClick={onSelect}
      onTap={onSelect}
      onDblClick={handleDblClick}
      onDblTap={handleDblClick}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd || ((e: any) => {
        onChange({
          ...element,
          x: e.target.x() - element.width / 2,
          y: e.target.y() - (element.height || 0) / 2
        });
      })}
      onTransformEnd={handleChange}
    />
  );
}
