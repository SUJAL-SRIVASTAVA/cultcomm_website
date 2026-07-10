import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Performances.css';

gsap.registerPlugin(ScrollTrigger);

const tracks = [
  {
    id: 1,
    title: "OPEN MIC",
    category: "SPOKEN WORD",
    description: "Spoken word, poetry, stand-up, storytelling. Solo performers. 5 minutes on stage. No filters."
  },
  {
    id: 2,
    title: "UNPLUGGED",
    category: "MUSIC",
    description: "Acoustic music performances. Solo or duo. Original compositions preferred. Instruments welcome."
  },
  {
    id: 3,
    title: "FRAME BY FRAME",
    category: "FILM",
    description: "Short film screening + live commentary. Submit a 3–7 min film. Theme: 'What We Carry.'"
  },
  {
    id: 4,
    title: "STILL LIFE",
    category: "EXHIBITION",
    description: "A visual art exhibition. Submit physical or digital artwork for display. Theme: 'Echoes of Self.'"
  },
  {
    id: 5,
    title: "CURTAIN CALL",
    category: "THEATRE",
    description: "One-act play competition. Groups of 4–8. 10–15 minutes. No props limit."
  }
];

export default function Performances() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.performance-card');
    
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <section id="events" className="performances-section section-padding">
      <div className="container" ref={containerRef}>
        <span className="section-label">ACT 02</span>
        <h2 className="section-title">What's On Stage</h2>
        
        <div className="cards-grid">
          {tracks.map((track) => (
            <div key={track.id} className="performance-card interactive">
              <div className="card-header">
                <span className="card-category">{track.category}</span>
                <span className="card-icon">✦</span>
              </div>
              <h3 className="card-title">{track.title}</h3>
              <p className="card-desc">{track.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
