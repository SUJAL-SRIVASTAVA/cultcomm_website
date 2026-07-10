import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar({ onRegisterClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <a href="#" className="interactive">ECHOES</a>
        </div>
        
        <div className="nav-links">
          <a href="#about" className="interactive">About</a>
          <a href="#events" className="interactive">Events</a>
          <a href="#timeline" className="interactive">Timeline</a>
          <a href="#faq" className="interactive">FAQ</a>
        </div>

        <div className="nav-actions">
          <button className="nav-register-btn interactive" onClick={onRegisterClick}>
            REGISTER NOW
          </button>
        </div>
      </div>
    </nav>
  );
}
