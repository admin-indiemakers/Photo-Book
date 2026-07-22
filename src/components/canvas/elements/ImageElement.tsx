'use client';
import React, { useEffect, useState } from 'react';
import { Image as KonvaImage, Group, Rect, Path } from 'react-konva';

interface ImageElementProps {
  element: any;
  isSelected: boolean;
  onSelect: (e: any) => void;
  onChange: (newAttrs: any) => void;
  onDragMove?: (e: any) => void;
  onDragEnd?: (e: any) => void;
}

export default function ImageElement({ element, isSelected, onSelect, onChange, onDragMove, onDragEnd }: ImageElementProps) {
  const imageRef = React.useRef<any>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (element.src) {
      const img = new window.Image();
      if (!element.src.startsWith('data:')) {
        img.crossOrigin = 'Anonymous';
      }
      img.onload = () => {
        setImageObj(img);
      };
      img.src = element.src;
    }
  }, [element.src]);

  const handleChange = (e: any) => {
    const node = imageRef.current;
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

  const { src, x, y, ...restElement } = element;

  return (
    <Group
      ref={imageRef}
      {...restElement}
      x={element.x + element.width / 2}
      y={element.y + element.height / 2}
      offsetX={0}
      offsetY={0}
      width={element.width}
      height={element.height}
      name="element-node"
      visible={!element.hidden}
      draggable={!element.locked}
      onClick={onSelect}
      onTap={onSelect}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd || ((e: any) => {
        onChange({
          ...element,
          x: e.target.x() - element.width / 2,
          y: e.target.y() - element.height / 2
        });
      })}
      onTransformEnd={handleChange}
    >
      {(element.isPlaceholder && !element.src) ? (
        <Group>
          <Rect
            x={-element.width / 2}
            y={-element.height / 2}
            width={element.width}
            height={element.height}
            fill="#FAF6EE"
            stroke="#e8e2d9"
            strokeWidth={2}
            dash={[5, 5]}
          />
          {/* Simple image icon path scaled to center */}
          <Path
            x={-12}
            y={-12}
            data="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
            fill="#a09890"
            scale={{ x: 1, y: 1 }}
          />
        </Group>
      ) : (
        <KonvaImage
          x={-element.width / 2}
          y={-element.height / 2}
          width={element.width}
          height={element.height}
          image={imageObj || undefined}
          cornerRadius={element.cornerRadius || 0}
          stroke={element.stroke || ''}
          strokeWidth={element.strokeWidth || 0}
        />
      )}
    </Group>
  );
}
