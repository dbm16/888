import React from 'react';
import './ErrorPopup.css';

const ErrorPopup = ({ onClose, imageUrl = './err404.png' }) => {
  return (
    <div className="error-popup-overlay" onClick={onClose}>
      <div className="error-popup-container" onClick={(e) => e.stopPropagation()}>
        {/* Top image with fixed container */}
        <div className="error-image-container">
          <img 
            src={imageUrl} 
            alt="Error Illustration" 
            className="error-top-image"
          />
        </div>
        
        {/* Text content in its own container */}
        <div className="error-text-content">
          {/* Hebrew text content */}
          <h2 className="error-headline">אופס :)</h2>
          
          <p className="error-description">אין גישה לאתר זה, נא לפנות למשו"ב 888 לקבלת הרשאות בכפוף לאישור ב"ם</p>
        </div>
        
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="error-close-button"
        >
          סגור
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;