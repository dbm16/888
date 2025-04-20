import React, { useState, useEffect, useRef } from 'react';
import './UnitA.css';
const Remember = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const backgroundImages = [
    './image1.png',
    '/image2.png',
    '/image3.png',
    '/image2.png'
  ];
  


  // Effect for background image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  // Effect for handling screen resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const getBackgroundStyle = (image) => {
    // For ultra-wide screens, use cover with custom positioning
    if (screenWidth > 1920) {
      return { 
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      };
    }
    
    // Default style
    return { backgroundImage: `url(${image})` };
  };

  return (
    <section className="rememb-section">
      {/* Background slider */}
      <div className="hero-background-containerr">
        {backgroundImages.map((bgImage, index) => (
          <div
            key={index}
            className={`hero-background ${index === currentBgIndex ? 'active' : ''}`}
            style={getBackgroundStyle(bgImage)}
          ></div>
        ))}
      </div>

      <div className="unit-container">
        <div className="unit-content">
          
        
          <h1 className="unit-title">מבנה וארגון</h1>
        </div>
      </div>

<div className="menu-cards-wrapper">
 
  {/* הוספת מיכל הכפתורים */}
  <div className="menu-buttons-container">
    <button className="menu-button glow-effect">הצגת היחידה</button>
    <button className="menu-button candle-effect">מבנה וארגון</button>
    <button className="menu-button glow-effect">תקינת אמצעים</button>
    <button className="menu-button candle-effect">תו תקן אבן דרך</button>
    <button className="menu-button glow-effect">מצעים לדיונים</button>
    <button className="menu-button candle-effect">פקודות למופעים חוזרים</button>
  </div>
</div>
      
  
    </section>
  );
};

export default Remember;