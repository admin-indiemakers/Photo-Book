'use client';
import React from 'react';
import { Rect, Circle, Star, RegularPolygon } from 'react-konva';

interface ShapeElementProps {
  element: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
}

export default function ShapeElement({ element, isSelected, onSelect, onChange }: ShapeElementProps) {
  const shapeRef = React.useRef<any>(null);

  const handleChange = (e: any) => {
    const node = shapeRef.current;
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

  const commonProps = {
    ref: shapeRef,
    ...element,
    draggable: !element.locked,
    onClick: onSelect,
    onTap: onSelect,
    onDragEnd: (e: any) => {
      onChange({
        ...element,
        x: e.target.x(),
        y: e.target.y()
      });
    },
    onTransformEnd: handleChange,
  };

  switch (element.shapeType) {
    case 'rectangle':
      return <Rect {...commonProps} />;
    case 'circle':
      return <Circle {...commonProps} radius={element.width / 2} />;
    case 'star':
      return <Star {...commonProps} numPoints={5} innerRadius={element.width / 4} outerRadius={element.width / 2} />;
    case 'polygon':
      return <RegularPolygon {...commonProps} sides={6} radius={element.width / 2} />;
    default:
      return <Rect {...commonProps} />;
  }
}
