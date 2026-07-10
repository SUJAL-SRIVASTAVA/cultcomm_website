import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Prizes.css';

gsap.registerPlugin(ScrollTrigger);

const prizes = [
  { category: "Open Mic", amount: "₹5,000", extra: "+ Trophy" },
  { category: "Unplugged", amount: "₹6,000", extra: "+ Trophy" },
  { category: "Frame by Frame", amount: "₹7,000", extra: "+ Screening Rights" },
  { category: "Still Life", amount: "₹4,000", extra: "+ Featured Exhibition Spot" },
  { category: "Curtain Call", amount: "₹10,000", extra: "+ Perpetual Trophy" },
];

export default function Prizes() {
  useEffect(() => {
    const items = gsap.utils.toArray('.prize-item');
    items.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  return (
    <section className="prizes-section section-padding">
      <div className="container">
        <span className="section-label">ACT 04</span>
        <h2 className="section-title">What You Take Home</h2>
        
        <div className="prizes-list">
          {prizes.map((prize, idx) => (
            <div key={idx} className="prize-item interactive">
              <div className="prize-category">{prize.category}</div>
              <div className="prize-reward">
                <span className="prize-amount">{prize.amount}</span>
                <span className="prize-extra">{prize.extra}</span>
              </div>
            </div>
          ))}
        </div>
        
        <p className="participation-note">All participants receive a Certificate of Participation.</p>
      </div>
    </section>
  );
}
