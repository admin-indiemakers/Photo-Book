'use client';
import React from 'react';
import { Rect, Circle, Star, RegularPolygon, Path, Group } from 'react-konva';

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

  // Helper for custom paths defined in a 100x100 bounding box
  const renderPath = (data: string) => {
    const scaleX = element.width / 100;
    const scaleY = element.height / 100;
    return (
      <Group {...commonProps}>
        <Path
          data={data}
          fill={element.fill}
          scaleX={scaleX}
          scaleY={scaleY}
          fillRule="evenodd"
        />
      </Group>
    );
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
    case 'arch':
      return renderPath("M10,90 L10,50 A40,40 0 0,1 90,50 L90,90 Z");
    case 'diamond':
      return renderPath("M50,0 L100,50 L50,100 L0,50 Z");
    case 'badge':
      return renderPath("M50,5 L60,15 L75,12 L80,25 L93,30 L90,45 L100,55 L90,65 L93,80 L80,75 L75,88 L60,85 L50,95 L40,85 L25,88 L20,75 L7,80 L10,65 L0,55 L10,45 L7,30 L20,25 L25,12 L40,15 Z");
    case 'frame':
      // Polaroid style frame using evenodd/winding path (outer CW, inner CCW)
      return renderPath("M0,0 L100,0 L100,100 L0,100 Z M10,10 L10,75 L90,75 L90,10 Z");
    case 'divider':
      return renderPath("M0,48 L45,48 L50,40 L55,48 L100,48 L100,52 L55,52 L50,60 L45,52 L0,52 Z");
    case 'blob':
      return renderPath("M50,15 C65,15 80,30 80,50 C80,75 65,85 50,85 C25,85 15,65 15,50 C15,30 30,15 50,15 Z");
    case 'brush':
      return renderPath("M10,50 Q20,30 40,45 T80,40 Q90,40 95,50 Q90,65 75,55 T30,55 Q10,70 10,50 Z");
    case 'wave':
      return renderPath("M0,40 Q12.5,15 25,40 T50,40 T75,40 T100,40 L100,60 Q87.5,35 75,60 T50,60 T25,60 T0,60 Z");
    case 'tear':
      return renderPath("M10,10 L90,10 L90,80 L85,90 L80,75 L75,85 L65,75 L55,90 L45,80 L35,90 L25,75 L15,85 L10,80 Z");
    default:
      return <Rect {...commonProps} />;
  }
}
