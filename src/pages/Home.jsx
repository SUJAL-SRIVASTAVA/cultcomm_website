import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Performances from '../components/Performances';
import Timeline from '../components/Timeline';
import Prizes from '../components/Prizes';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import RegistrationModal from '../components/RegistrationModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Smooth scroll logic can be added globally if needed, 
  // but GSAP ScrollTrigger works on standard scroll anyway.
  
  return (
    <div className="home-page">
      <Navbar onRegisterClick={() => setIsModalOpen(true)} />
      
      <main>
        <Hero />
        <About />
        <Performances />
        <Timeline />
        <Prizes />
        <FAQ />
      </main>
      
      <Footer />
      
      {isModalOpen && (
        <RegistrationModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
