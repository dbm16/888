import React, { useState, useEffect } from 'react';
import './Gantt.css';
const Gantt = () => {
  const [activeDot, setActiveDot] = useState(0);


  return (
    <section className="gantt-section">
      <div className="container gantt-container">
        <div className="gantt-content">
          <img src="/gantt.png" alt="נקודה דקורטיבית" className="dot-image" />
          <h2 className="mission-title">גאנט יחידתי</h2>

        </div>

        <div className="gantt-image-container desktop-only">
          <img src="/ganttback.png" className="gantt-image" />
        </div>
      </div>
    </section>
  );
};

export default Gantt;
