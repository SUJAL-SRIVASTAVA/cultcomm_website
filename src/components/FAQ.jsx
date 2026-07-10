import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import './FAQ.css';

const faqs = [
  { q: "Is ECHOES open to all students?", a: "Yes, ECHOES is open to students from all universities. Please bring your valid college ID." },
  { q: "Can I participate in more than one event?", a: "Yes, as long as the event timings do not clash. Please refer to the timeline." },
  { q: "Is there a registration fee?", a: "No, participation is completely free. We believe art should be accessible." },
  { q: "What is the deadline for submitting films/artwork?", a: "Submissions must be made by 11:59 PM, one week before the event date." },
  { q: "Will there be food at the venue?", a: "Yes, there will be curated food stalls offering a variety of refreshments." },
  { q: "Who do I contact for queries?", a: "You can reach out to us at echoes@culturalcommittee.edu or DM us on Instagram." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section section-padding">
      <div className="container">
        <span className="section-label">ACT 05</span>
        <h2 className="section-title">Common Queries</h2>
        
        <div className="faq-accordion">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`faq-item interactive ${openIndex === idx ? 'open' : ''}`}
              onClick={() => toggleFAQ(idx)}
            >
              <div className="faq-question">
                <h3>{faq.q}</h3>
                <span className="faq-icon">
                  {openIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </div>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
