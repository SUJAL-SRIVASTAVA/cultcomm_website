import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Timeline.css';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { time: "NOW", title: "Registrations Open" },
  { time: "1 WEEK BEFORE", title: "Last Date to Register" },
  { time: "3 DAYS BEFORE", title: "Shortlist Announced (Film & Theatre)" },
  { time: "6:00 PM", title: "Doors Open" },
  { time: "7:00 PM", title: "Performances Begin" },
  { time: "ALL EVENING", title: "Gallery Walk (Still Life)" },
  { time: "10:00 PM", title: "Closing Ceremony & Recognition" }
];

export default function Timeline() {
  const lineRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const items = gsap.utils.toArray('.milestone-item');
    
    // Animate the vertical line drawing down
    gsap.fromTo(lineRef.current,
      { height: 0 },
      {
        height: '100%',
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
        }
      }
    );

    // Animate each milestone dot and text pulsing in
    items.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        }
      );
    });
  }, []);

  return (
    <section id="timeline" className="timeline-section section-padding">
      <div className="container" ref={containerRef}>
        <span className="section-label">ACT 03</span>
        <h2 className="section-title">The Rundown</h2>
        
        <div className="timeline-container">
          <div className="timeline-line-bg"></div>
          <div className="timeline-line-active" ref={lineRef}></div>
          
          {milestones.map((ms, idx) => (
            <div key={idx} className="milestone-item">
              <div className="milestone-dot"></div>
              <div className="milestone-content">
                <span className="milestone-time">{ms.time}</span>
                <h4 className="milestone-title">{ms.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
