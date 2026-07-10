'use client';
import React, { useEffect, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';

interface ImageElementProps {
  element: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
}

export default function ImageElement({ element, isSelected, onSelect, onChange }: ImageElementProps) {
  const imageRef = React.useRef<any>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (element.src) {
      const img = new window.Image();
      img.src = element.src;
      img.crossOrigin = 'Anonymous';
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
      image={imageObj || undefined}
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
