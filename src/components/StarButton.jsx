import React from 'react';
import './StarButton.css';

const StarButton = ({ onClick, className, x, y }) => {
  return (
    <button 
      className={`star-button ${className || ''}`} 
      onClick={onClick}
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)' // Centers the button on the coordinates
      }}
    >
      <span className="star-icon">★</span>
    </button>
  );
};

export default StarButton;