// No lucide-react dependency needed for footer icons
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-marquee">
        <div className="marquee-content">
          ECHOES ✦ ART ✦ MUSIC ✦ THEATRE ✦ POETRY ✦ CULTURE ✦ MEMORY ✦ IDENTITY ✦ ECHOES ✦ ART ✦ MUSIC ✦ THEATRE ✦ POETRY ✦ CULTURE ✦ MEMORY ✦ IDENTITY ✦
        </div>
      </div>
      
      <div className="footer-content container">
        <div className="footer-brand">
          <h3>CULTURAL COMMITTEE</h3>
          <p>Nirma University</p>
        </div>
        
        <div className="footer-socials">
          <a href="https://www.instagram.com/cultcomm_imnu/" target="_blank" rel="noopener noreferrer" className="interactive" aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://share.google/8cnUEonQtSkqnTja7" target="_blank" rel="noopener noreferrer" className="interactive" aria-label="LinkedIn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="#" className="interactive" aria-label="YouTube">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
          </a>
        </div>
      </div>
      
      <div className="footer-bottom container">
        <p>Produced with love by the Cultural Committee.</p>
        <p>&copy; 2025 All rights reserved. | Created by <a href="https://www.linkedin.com/in/sujal-srivastava-27b790303" target="_blank" rel="noopener noreferrer" className="creator-link">Sujal Srivastava</a></p>
      </div>
    </footer>
  );
}
