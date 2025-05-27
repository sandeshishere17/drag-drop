import React, { useState } from 'react';
import Element from './Element';

export default function Canvas({ elements, onDrop, onSelectElement, selectedId, onMove }) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [draggedId, setDraggedId] = useState(null);

  const allowDrop = (e) => {
    e.preventDefault(); // Necessary to allow drop
  };

  const handleDropFromSidebar = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('type');
    if (!type) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    onDrop(type, position);
  };

  const handleDragStart = (e, id) => {
    const el = elements.find(el => el.id === id);
    if (!el) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    setDraggedId(id);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleDragEnd = (e, id) => {
    if (!draggedId) return;

    const rect = e.currentTarget.parentElement.getBoundingClientRect(); // canvas bounding box
    const newPosition = {
      x: e.clientX - rect.left - dragOffset.x,
      y: e.clientY - rect.top - dragOffset.y,
    };

    onMove(draggedId, newPosition);
    setDraggedId(null);
  };

  return (
    <div
      className="flex-1 bg-gray-100 relative"
      onDrop={handleDropFromSidebar}
      onDragOver={allowDrop}
    >
      {elements.map(el => (
        <Element
          key={el.id}
          data={el}
          isSelected={el.id === selectedId}
          onClick={() => onSelectElement(el.id)}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
}
