import React from 'react';

export default function PropertyForm({ element, onUpdate }) {
  if (!element) return <div className="w-1/4 bg-white p-4 border-l">Select an element to edit</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onUpdate(element.id, { ...element.props, [name]: value });
  };

  return (
    <div className="w-1/4 bg-white p-4 border-l">
      <h2 className="text-lg font-bold mb-4">Edit Properties</h2>
      {element.type === 'Text' || element.type === 'Button' ? (
        <>
          <label>Text</label>
          <input name="text" value={element.props.text} onChange={handleChange} className="border p-1 w-full mb-2" />
        </>
      ) : null}
      {element.type === 'Image' && (
        <>
          <label>Image URL</label>
          <input name="url" value={element.props.url} onChange={handleChange} className="border p-1 w-full mb-2" />
        </>
      )}
      {element.type === 'Button' && (
        <>
          <label>Color</label>
          <input name="color" value={element.props.color} onChange={handleChange} className="border p-1 w-full" />
        </>
      )}
    </div>
  );
}
