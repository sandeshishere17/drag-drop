import React from 'react';

export default function Sidebar() {
  const elements = ['Text', 'Image', 'Button'];

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('type', type);
  };

  return (
    <div className="w-1/6 bg-gray-200 p-4">
      <h2 className="text-lg font-bold mb-4">Elements</h2>
      {elements.map(el => (
        <div
          key={el}
          className="p-2 bg-white mb-2 border cursor-pointer"
          draggable
          onDragStart={(e) => handleDragStart(e, el)}
        >
          {el}
        </div>
      ))}
    </div>
  );
}
