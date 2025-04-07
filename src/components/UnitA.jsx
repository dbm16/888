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

      {/* Content */}
      <div className="hero-container">
        <div className="hero-content">
          <div className="logo-container">
            <img src="/logo.png" alt="Military Emblem" className="logounit" />
          </div>
          <div className="mission-image-container">
            <img src="/dot888.png" alt="נקודה דקורטיבית" className="dot-image" />
          </div>
          <h1 className="hero-title">מבנה וארגון</h1>
          <p className="hero-description">לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך רוגצה. לפמעט          </p>
        </div>
      </div>

      {/* בתוך ה-menu-cards-wrapper */}
<div className="menu-cards-wrapper">
  <div className='rem-die'>
    <p className="rem-description">תפריט מהיר</p>
  </div>
  
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