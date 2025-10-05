import React from 'react';
import './StarButton.css';

const StarButton = ({ onClick, className, style }) => {
  return (
    <button 
      className={`star-button ${className || ''}`} 
      onClick={onClick}
      style={style}
    >
      <span className="star-icon">★</span>
    </button>
  );
};

export default StarButton;