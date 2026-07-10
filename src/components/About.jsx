import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    
    gsap.fromTo(el, 
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section id="about" className="about-section section-padding" ref={sectionRef}>
      <div className="container">
        <span className="section-label">ACT 01</span>
        <h2 className="section-title">What is ECHOES?</h2>
        
        <div className="about-content" ref={textRef}>
          <p>
            ECHOES is a curated cultural evening where art, music, theatre, and spoken word collide. 
            This is not your typical loud college fest. It is an immersive, intentional space designed 
            for those who want to feel something real. 
          </p>
          <p>
            Late-night museum meets underground concert. Every performance and installation answers a 
            single question: <em>What echo do you leave behind?</em>
          </p>
        </div>
      </div>

      <div className="marquee-container">
        <div className="marquee-content">
          ART ✦ MUSIC ✦ THEATRE ✦ POETRY ✦ DANCE ✦ IDENTITY ✦ MEMORY ✦ CULTURE ✦ ART ✦ MUSIC ✦ THEATRE ✦ POETRY ✦ DANCE ✦ IDENTITY ✦ MEMORY ✦ CULTURE ✦
        </div>
      </div>
    </section>
  );
}
