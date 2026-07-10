'use client';
import React, { useEffect, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';

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
      img.src = element.src;
      img.onload = () => {
        setImageObj(img);
      };
    }
  }, [element.src]);

  const handleChange = (e: any) => {
    const node = imageRef.current;
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
    <KonvaImage
      ref={imageRef}
      {...element}
      name="element-node"
      visible={!element.hidden}
      image={imageObj || undefined}
      draggable={!element.locked}
      onClick={onSelect}
      onTap={onSelect}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd || ((e: any) => {
        onChange({
          ...element,
          x: e.target.x(),
          y: e.target.y()
        });
      })}
      onTransformEnd={handleChange}
    />
  );
}
