import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    // הפעלת אנימציה מלאה לפני הניווט
    const animationTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000); // 3 שניות עד תחילת האנימציית סיום
    
    // המתנה נוספת לפני הניווט בפועל
    const navigationTimer = setTimeout(() => {
      navigate('/home', { replace: true }); // השתמש ב-replace כדי למנוע ניווט חזרה
    }, 3800); // זמן כולל: 3 שניות אנימציה מקורית + 0.8 שניות לדעיכה
    
    return () => {
      clearTimeout(animationTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);
  
  return (
    <div className={`splash-screen ${animationComplete ? 'fade-out' : ''}`}>
      <div className="logo-container">
        <div className="logo-wrapper">
          <div className="logo-text">
            <img src="./logo.png" alt="Logo" className="splash-logo" />
          </div>
        </div>
        
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;