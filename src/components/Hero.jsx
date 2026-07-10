import { useEffect, useState, useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import './Hero.css';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set event date (e.g., 2 months from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 60);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <section className="hero-section">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: ["#D4AF37", "#9B1C1C", "#C9A84C"],
            },
            move: {
              direction: "top",
              enable: true,
              outModes: {
                default: "out",
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 40,
            },
            opacity: {
              value: { min: 0.1, max: 0.5 },
              animation: {
                enable: true,
                speed: 1,
                sync: false,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      
      <div className="hero-content">
        <div className="pill-badge fade-in-up">One Night Only ✦ Campus Cultural Fest</div>
        
        <h1 className="hero-title flicker-animation">ECHOES</h1>
        
        <p className="hero-subtitle italic-sub fade-in-up delay-1">
          A Night of Art, Music & Forgotten Stories
        </p>
        
        <p className="hero-tagline spaced-caps fade-in-up delay-2">
          Some things are meant to be felt, not explained.
        </p>

        <div className="countdown fade-in-up delay-3">
          <div className="time-block">
            <span className="time-num">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="time-label">DAYS</span>
          </div>
          <span className="time-colon">:</span>
          <div className="time-block">
            <span className="time-num">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="time-label">HRS</span>
          </div>
          <span className="time-colon">:</span>
          <div className="time-block">
            <span className="time-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="time-label">MIN</span>
          </div>
          <span className="time-colon">:</span>
          <div className="time-block">
            <span className="time-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="time-label">SEC</span>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>SCROLL TO ENTER ↓</span>
      </div>
    </section>
  );
}
