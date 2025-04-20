import React, { useState, useEffect } from 'react';
import './MissionSection.css';
const MissionSection = () => {
  const [activeDot, setActiveDot] = useState(0);

  const slides = [
    {
      title: "ייעוד היחידה",
      content: "לאכן איכורים זאתה כאן אשם המבדקנדים שייכללו אלינו להכשיל ולהכריע את אויב. הכשכש נקודות מהוות, יכולת נתונה דיאל...",
      image: "/one.png"
    },
    {
      title: "חזון היחידה",
      content: "לאכן איכורים זאתה כאן אשם המבדקנדים שייכללו אלינו להכשיל ולהכריע את אויב. הכשכש נקודות מהוות, יכולת נתונה דיאל...",
      image: "/two.png"
    },
    {
      title: "ערכי היחידה",
      content: "לאכן איכורים זאתה כאן אשם המבדקנדים שייכללו אלינו להכשיל ולהכריע את אויב. הכשכש נקודות מהוות, יכולת נתונה דיאל...",
      image: "/one.png"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="mission-section">
      <div className="container mission-container">
        <div className="mission-content">
          <img src="/dotone.png" alt="נקודה דקורטיבית" className="dot-image" />
          <h2 className="mission-title">{slides[activeDot].title}</h2>
          <p className="mission-description">{slides[activeDot].content}</p>

          <div className="pagination-dots">
            {slides.map((slide, index) => (
              <button
                key={index}
                className={`pagination-dot ${activeDot === index ? 'active' : ''}`}
                onClick={() => setActiveDot(index)}
                aria-label={`מעבר לשקופית ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        <div className="mission-image-container desktop-only">
          <img src={slides[activeDot].image} alt={slides[activeDot].title} className="mission-image" />
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
