import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles.css';
import HomePage from './pages/HomePage';
import Memory from './pages/Memory';
import SplashScreen from './pages/SplashScreen';
import UnitAPage from './pages/UnitAPage';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    // Hide splash screen after 3.5 seconds (slightly longer than the animation)
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Router>
      <Routes>
        {/* Splash screen route */}
        <Route 
          path="/" 
          element={showSplash ? <SplashScreen /> : <Navigate to="/home" />} 
        />
        {/* Home page route */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/unita" element={<UnitAPage/>} />
      </Routes>
    </Router>
  );
};

export default App;