import React from 'react';
import './StarButton.css';

const StarButton = ({ onClick, className }) => {
  return (
    <button 
      className={`star-button ${className || ''}`} 
      onClick={onClick}
    >
      <span className="star-icon">★</span>
    </button>
  );
};

export default StarButton;