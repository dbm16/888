import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    'פרק א\'': false,
    'פרק ב\'': false
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? 'auto' : 'hidden';
  };

  const toggleDropdown = (name, event) => {
    event.preventDefault();
    setDropdownOpen({
      ...dropdownOpen,
      [name]: !dropdownOpen[name]
    });
  };

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

  const dropdownItems = {
    'פרק א\'': [ 'נהלי יחידה'],
    'פרק ב\'': ['נושא 1', 'נושא 2', 'נושא 3', 'נושא 4']
  };

  const scrollToSection = (sectionId, event) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    if (menuOpen) {
      setMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="logo-container">
          <img src="/logo.png" alt="Military Emblem" className="logo" />
        </div>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>

        <Link to="/" className="nav-link">ראשי</Link>


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
                <Link
                  to="/memory"
                  className="dropdown-item"
                  onClick={() => setMenuOpen(false)}
                >
                  עמוד יזכור לזכר הנופלים
                </Link>
                {dropdownItems['פרק א\''].map((item, index) => (
                 <Link
                 to="/unita"
                 className="dropdown-item"
                 onClick={() => setMenuOpen(false)}
               >
                 מבנה וארגון
               </Link>
                ))}
              </div>
            )}
          </div>
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
                  <a
                    key={index}
                    href="#mission"
                    className="dropdown-item"
                    onClick={(e) => scrollToSection('mission', e)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a href="#mission" className="nav-link" onClick={(e) => scrollToSection('mission', e)}>פרק ג'</a>
          <a href="#mission" className="nav-link" onClick={(e) => scrollToSection('mission', e)}>פרק ד'</a>
          <a href="#mission" className="nav-link" onClick={(e) => scrollToSection('mission', e)}>פרק ה'</a>

        

         
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

export default Navbar;
