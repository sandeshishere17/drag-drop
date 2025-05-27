import React from 'react';

export default function Element({ data, onClick, isSelected, onDragStart, onDragEnd }) {
  const style = {
    position: 'absolute',
    left: data.position.x,
    top: data.position.y,
    border: isSelected ? '2px solid blue' : 'none',
    padding: '5px',
    cursor: 'move',
  };

  const commonProps = {
    draggable: true,
    onClick,
    onDragStart: (e) => onDragStart(e, data.id),
    onDragEnd: (e) => onDragEnd(e, data.id),
  };

  switch (data.type) {
    case 'Text':
      return <div style={style} {...commonProps}>{data.props.text}</div>;
    case 'Image':
      return <img src={data.props.url || 'https://via.placeholder.com/100'} alt="" style={{ ...style, width: 100 }} {...commonProps} />;
    case 'Button':
      return (
        <button style={{ ...style, backgroundColor: data.props.color, color: 'white' }} {...commonProps}>
          {data.props.text}
        </button>
      );
    default:
      return null;
  }
}
