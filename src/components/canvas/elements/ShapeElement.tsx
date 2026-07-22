'use client';
import React from 'react';
import { Rect, Circle, Star, RegularPolygon } from 'react-konva';

interface ShapeElementProps {
  element: any;
  isSelected: boolean;
  onSelect: (e: any) => void;
  onChange: (newAttrs: any) => void;
  onDragMove?: (e: any) => void;
  onDragEnd?: (e: any) => void;
}

export default function ShapeElement({ element, isSelected, onSelect, onChange, onDragMove, onDragEnd }: ShapeElementProps) {
  const shapeRef = React.useRef<any>(null);

  const handleChange = (e: any) => {
    const node = shapeRef.current;
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

  const { x, y, ...restElement } = element;

  const commonProps = {
    ref: shapeRef,
    ...restElement,
    x: element.x + element.width / 2,
    y: element.y + element.height / 2,
    offsetX: element.width / 2,
    offsetY: element.height / 2,
    name: 'element-node',
    visible: !element.hidden,
    draggable: !element.locked,
    onClick: onSelect,
    onTap: onSelect,
    onDragMove,
    onDragEnd: onDragEnd || ((e: any) => {
      onChange({
        ...element,
        x: e.target.x() - element.width / 2,
        y: e.target.y() - element.height / 2
      });
    }),
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
