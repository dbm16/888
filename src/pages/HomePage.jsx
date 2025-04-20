import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import MissionSection from '../components/MissionSection';
import Gantt from '../components/Gantt';

const HomePage = () => {
  return (
    <div className="snap-container">
      <Navbar />
      <div className="snap-section" id="hero">
        <HeroSection />
      </div>
      <div className="snap-section" id="mission">
        <MissionSection />
      </div>
      <div className="snap-section" id="gantt">
        <Gantt />
      </div>
    </div>
  );
};

export default HomePage;
