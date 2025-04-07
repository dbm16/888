import React, { useState, useEffect } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgroundImages = [
    './image1.png',
    '/image2.png',
    '/image3.png',
    '/image2.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const scrollToMission = () => {
    const missionSection = document.getElementById('mission');
    if (missionSection) {
      missionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      {/* רקע מתחלף */}
      <div className="hero-background-container">
        {backgroundImages.map((bgImage, index) => (
          <div
            key={index}
            className={`hero-background ${index === currentBgIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>
        ))}
      </div>

      {/* תוכן */}
      <div className="container hero-container">
        <div className="hero-content">
          <div className="logo-container">
            <img src="/logo.png" alt="Military Emblem" className="logounit" />
          </div>
          <div className="mission-image-container">
            <img src="/dot888.png" alt="נקודה דקורטיבית" className="dot-image" />
          </div>
          <h1 className="hero-title">סדרי ממדית</h1>
          <p className="hero-description">
            אתר ניהול הידע של היחידה הרב ממדית המאגד את כלל הנהלים , הפקודות והתרבות הארגונית של היחידה.
          </p>
          <button className="cta-button" onClick={scrollToMission}>ראה עוד</button>
        </div>
      </div>

     

      <div className="support-action">
        <button className="support-button">תמיכה 888</button>
      </div>
    </section>
  );
};

export default HeroSection;
