import React, { useState, useEffect, useCallback } from 'react';
import './styles.css'; 

// Main App Component
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <HeroSection />
      <MissionSection />
      <Footer />
    </div>
  );
};

// Navigation Bar Component with Dropdowns
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    'פרק א\'': false,
    'פרק ב\'': false
  });
  
  // Handle scroll event for navbar background with throttling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // Add throttling to improve performance
    let timeoutId;
    const throttledScroll = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 100);
      }
    };
    
    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(timeoutId);
    };
  }, []);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = menuOpen ? 'auto' : 'hidden';
  };
  
  // Toggle dropdown
  const toggleDropdown = (name, event) => {
    event.preventDefault();
    setDropdownOpen({
      ...dropdownOpen,
      [name]: !dropdownOpen[name]
    });
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        setDropdownOpen({
          'פרק א\'': false,
          'פרק ב\'': false
        });
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
        setMenuOpen(false);
        document.body.style.overflow = 'auto';
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);
  
  // Dropdown content
  const dropdownItems = {
    'פרק א\'': ['תת פרק 1', 'תת פרק 2', 'תת פרק 3'],
    'פרק ב\'': ['נושא 1', 'נושא 2', 'נושא 3', 'נושא 4']
  };
  
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="logo-container">
          <img src="/logo.png" alt="Military Emblem" className="logo" />
        </div>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a href="#" className="nav-link">פרק ו'</a>
          <a href="#" className="nav-link">פרק ה'</a>
          <a href="#" className="nav-link">פרק ד'</a>
          <a href="#" className="nav-link">פרק ג'</a>
          
          <div className="nav-dropdown">
            <a 
              href="#" 
              className={`nav-link dropdown-toggle ${dropdownOpen['פרק ב\''] ? 'active' : ''}`}
              onClick={(e) => toggleDropdown('פרק ב\'', e)}
            >
              פרק ב' 
            </a>
            {dropdownOpen['פרק ב\''] && (
              <div className="dropdown-menu">
                {dropdownItems['פרק ב\''].map((item, index) => (
                  <a key={index} href="#" className="dropdown-item">{item}</a>
                ))}
              </div>
            )}
          </div>
          
          <div className="nav-dropdown">
            <a 
              href="#" 
              className={`nav-link dropdown-toggle ${dropdownOpen['פרק א\''] ? 'active' : ''}`}
              onClick={(e) => toggleDropdown('פרק א\'', e)}
            >
              פרק א'
            </a>
            {dropdownOpen['פרק א\''] && (
              <div className="dropdown-menu">
                {dropdownItems['פרק א\''].map((item, index) => (
                  <a key={index} href="#" className="dropdown-item">{item}</a>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="search-container">
          <input type="text" placeholder="חיפוש באתר" className="search-input" />
          <button className="search-button">
            <i className="search-icon">🔍</i>
          </button>
        </div>
        
        <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

// Hero Section Component with Background Image Slider
const HeroSection = () => {
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
  // Array of background images
  const backgroundImages = [
    './image1.png',
    '/image2.png',
    '/image3.png',
    '/image2.png'
  ];
  
  // Function to rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [backgroundImages.length]);
  
  // Scroll to different sections based on side navigation
  const handleNavClick = (index) => {
    setActiveNavItem(index);
    // Scroll to appropriate section logic would go here
  };
  
  return (
    <section className="hero-section" id="section-0">
      {/* Background image slider */}
      <div className="hero-background-container">
        {backgroundImages.map((bgImage, index) => (
          <div 
            key={index}
            className={`hero-background ${index === currentBgIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${bgImage})` }}
          ></div>
        ))}
      </div>
      
     
      
      <div className="container hero-container">
        <div className="hero-content">
          <div className="logo-container">
          <img src="/logo.png" alt="Military Emblem" className="logounit" />
        </div>
          <div className="mission-image-container">
            <img src="/dot888.png" alt="Decorative Dot" className="dot-image" />
          </div>
          <h1 className="hero-title">סדרי ממדית</h1>
          <p className="hero-description">
            אתר ניהול הידע של היחידה הרב ממדית המאגד את כלל הנהלים , הפקודות והתרבות הארגונית של היחידה.
          </p>
          <button className="cta-button">ראה עוד</button>
        </div>
      </div>
      
      <div className="support-action">
        <button className="support-button">תמיכה 888</button>
      </div>
    </section>
  );
};

// Mission Section Component
const MissionSection = () => {
  const [activeDot, setActiveDot] = useState(0);
  
  const slides = [
    {
      title: "ייעוד היחידה",
      content: "לאכן איכורים זאתה כאן אשם המבדקנדים שייכללו אלינו להכשיל ולהכריע את אויב. הכשכש נקודות מהוות, יכולת נתונה דיאל. גורמים, פעולות ברגע נקבץ לאסטרף בכך. הסכמי מהווה חלק, תמעיכה כורכת והשגת מטרות אירגון טקטית, מבצעי אודות מקצוה, מדרש והשגת מטרות שמגביל לנו להלן.",
      image: "/one.png"
    },
    {
      title: "חזון היחידה",
      content: "לאכן איכורים זאתה כאן אשם המבדקנדים שייכללו אלינו להכשיל ולהכריע את אויב. הכשכש נקודות מהוות, יכולת נתונה דיאל. גורמים, פעולות ברגע נקבץ לאסטרף בכך. הסכמי מהווה חלק, תמעיכה כורכת והשגת מטרות אירגון טקטית, מבצעי אודות מקצוה, מדרש והשגת מטרות שמגביל לנו להלן.",
       image: "/two.png"
    },
    {
      title: "ערכי היחידה",
      content: "לאכן איכורים זאתה כאן אשם המבדקנדים שייכללו אלינו להכשיל ולהכריע את אויב. הכשכש נקודות מהוות, יכולת נתונה דיאל. גורמים, פעולות ברגע נקבץ לאסטרף בכך. הסכמי מהווה חלק, תמעיכה כורכת והשגת מטרות אירגון טקטית, מבצעי אודות מקצוה, מדרש והשגת מטרות שמגביל לנו להלן.",
       image: "/one.png"
    }
  ];
  
  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % slides.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [slides.length]);
  
  return (
    <section className="mission-section" id="section-1">
      <div className="container mission-container">
        <div className="mission-content">
        <img src="/dotone.png" alt="Decorative Dot" className="dot-image" />
          <h2 className="mission-title">{slides[activeDot].title}</h2>
          <p className="mission-description">{slides[activeDot].content}</p>
          <div className="pagination-dots">
            {slides.map((slide, index) => (
              <button 
                key={index}
                className={`pagination-dot ${activeDot === index ? 'active' : ''}`}
                onClick={() => setActiveDot(index)}
                aria-label={`Go to slide ${index + 1}`}
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

// Footer Component
const Footer = () => {
  return (
    <footer className="footer" id="section-4">
      <div className="container">
        <div className="divider"></div>
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo.png" alt="Military Emblem" className="logo" />
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h3>קישורים מהירים</h3>
              <a href="#">פרק א'</a>
              <a href="#">פרק ב'</a>
              <a href="#">פרק ג'</a>
            </div>
            <div className="footer-column">
              <h3>צור קשר</h3>
              <p>דואר אלקטרוני: support@military.gov</p>
              <p>טלפון: 03-888-8888</p>
            </div>
          </div>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} כל הזכויות שמורות
        </div>
      </div>
    </footer>
  );
};

export default App;