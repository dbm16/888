import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="divider"></div>

        <div className="copyright">
          © {new Date().getFullYear()} Designed By Dor Ben Moshe
        </div>
      </div>
    </footer>
  );
};

export default Footer;
