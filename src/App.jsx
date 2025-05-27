import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import PropertyForm from './components/PropertyForm';

export default function App() {
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);

  const getDefaultProps = (type) => {
    switch (type) {
      case 'Text': return { text: 'New Text' };
      case 'Image': return { url: '' };
      case 'Button': return { text: 'Click Me', color: '#007BFF' };
      default: return {};
    }
  };

  const handleDrop = (type, position) => {
    const id = Date.now().toString();
    const newElement = {
      id,
      type,
      position,
      props: getDefaultProps(type),
    };
    setElements((prev) => [...prev, newElement]);
    setSelectedElementId(id);
  };

  const updateElementProps = (id, newProps) => {
    setElements(elements.map(el =>
      el.id === id ? { ...el, props: newProps } : el
    ));
  };

  const handleMove = (id, newPosition) => {
    setElements(elements.map(el =>
      el.id === id ? { ...el, position: newPosition } : el
    ));
  };

  const selectedElement = elements.find(el => el.id === selectedElementId);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <Canvas
        elements={elements}
        onDrop={handleDrop}
        onSelectElement={setSelectedElementId}
        selectedId={selectedElementId}
        onMove={handleMove} // 👈 Pass this to Canvas
      />
      <PropertyForm
        element={selectedElement}
        onUpdate={updateElementProps}
      />
    </div>
  );
}
