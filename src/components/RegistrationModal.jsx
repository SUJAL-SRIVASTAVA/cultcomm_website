import { useState } from 'react';
import { X } from 'lucide-react';
import { saveRegistration } from '../firebase/db';
import emailjs from '@emailjs/browser';
import './RegistrationModal.css';

export default function RegistrationModal({ onClose }) {
  const [mode, setMode] = useState('Solo'); // 'Solo' or 'Group'
  const [step, setStep] = useState(1); // 1 = form, 2 = confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teamSize, setTeamSize] = useState(2);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', college: '', dept: '',
    eventCategory: '', fileLink: '', instaHandle: '', creativeEcho: '',
    teamName: '', leaderEmail: '', leaderPhone: '',
    members: [],
    title: '', synopsis: '', hearAbout: '',
    accessibility: '', agreed: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMemberChange = (index, field, value) => {
    const newMembers = [...formData.members];
    if (!newMembers[index]) newMembers[index] = {};
    newMembers[index][field] = value;
    setFormData(prev => ({ ...prev, members: newMembers }));
  };

  const calculateProgress = () => {
    // simplified progress bar
    if (mode === 'Solo') {
      const required = ['fullName', 'email', 'phone', 'college', 'dept', 'eventCategory', 'creativeEcho', 'agreed'];
      const filled = required.filter(field => !!formData[field]);
      return (filled.length / required.length) * 100;
    } else {
      const required = ['teamName', 'fullName', 'leaderEmail', 'leaderPhone', 'eventCategory', 'title', 'synopsis', 'creativeEcho', 'agreed'];
      const filled = required.filter(field => !!formData[field]);
      return (filled.length / required.length) * 100;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreed) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const submitData = { ...formData, registrationType: mode };
      
      // Save to Firebase (mocked)
      await saveRegistration(submitData);

      // Send EmailJS (mocked or real if env vars provided)
      // emailjs.send(
      //   'YOUR_SERVICE_ID', 
      //   'YOUR_TEMPLATE_ID', 
      //   {
      //     to_email: mode === 'Solo' ? formData.email : formData.leaderEmail,
      //     to_name: formData.fullName,
      //     event: formData.eventCategory
      //   }, 
      //   'YOUR_PUBLIC_KEY'
      // );
      
      setStep(2); // Show confirmation
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
    setIsSubmitting(false);
  };

  if (step === 2) {
    return (
      <div className="modal-overlay">
        <div className="confirmation-screen">
          <div className="ember-particles"></div>
          <h2 className="confirm-title gold-gradient-text fade-in-up">YOUR ECHO HAS BEEN RECEIVED.</h2>
          <p className="confirm-sub italic-sub fade-in-up delay-1">
            We'll see you on the night. Check your email.
          </p>
          <button className="close-btn interactive fade-in-up delay-2" onClick={onClose}>
            RETURN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close interactive" onClick={onClose}><X size={30} /></button>
        
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}></div>
        </div>

        <div className="modal-header">
          <h2 className="modal-title">REGISTER</h2>
          <div className="mode-toggle">
            <button 
              className={`mode-btn interactive ${mode === 'Solo' ? 'active' : ''}`}
              onClick={() => setMode('Solo')}
              type="button"
            >SOLO</button>
            <button 
              className={`mode-btn interactive ${mode === 'Group' ? 'active' : ''}`}
              onClick={() => setMode('Group')}
              type="button"
            >GROUP</button>
          </div>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          
          {mode === 'Solo' ? (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>University / College *</label>
                  <input type="text" name="college" required value={formData.college} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Department & Year *</label>
                  <input type="text" name="dept" required value={formData.dept} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Event *</label>
                  <select name="eventCategory" required value={formData.eventCategory} onChange={handleChange}>
                    <option value="">Select Event...</option>
                    <option value="Open Mic">Open Mic</option>
                    <option value="Unplugged">Unplugged</option>
                    <option value="Frame by Frame">Frame by Frame</option>
                    <option value="Still Life">Still Life</option>
                    <option value="Curtain Call">Curtain Call</option>
                  </select>
                </div>
              </div>

              {(formData.eventCategory === 'Frame by Frame' || formData.eventCategory === 'Still Life') && (
                <div className="form-row">
                  <div className="form-group">
                    <label>{formData.eventCategory === 'Frame by Frame' ? 'Film Title' : 'Artwork Title'} *</label>
                    <input type="text" name="title" required value={formData.title} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Drive Link (ensure open access) *</label>
                    <input type="url" name="fileLink" required value={formData.fileLink} onChange={handleChange} />
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Team Name *</label>
                  <input type="text" name="teamName" required value={formData.teamName} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Number of Members</label>
                  <select value={teamSize} onChange={(e) => setTeamSize(parseInt(e.target.value))}>
                    {[2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Leader Full Name *</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Leader Email *</label>
                  <input type="email" name="leaderEmail" required value={formData.leaderEmail} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Leader Phone *</label>
                <input type="tel" name="leaderPhone" required value={formData.leaderPhone} onChange={handleChange} />
              </div>

              {Array.from({ length: teamSize - 1 }).map((_, i) => (
                <div className="form-row member-row" key={i}>
                  <div className="form-group">
                    <label>Member {i+2} Name</label>
                    <input type="text" onChange={(e) => handleMemberChange(i, 'name', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label>College</label>
                    <input type="text" onChange={(e) => handleMemberChange(i, 'college', e.target.value)} required />
                  </div>
                </div>
              ))}

              <div className="form-row">
                <div className="form-group">
                  <label>Event *</label>
                  <select name="eventCategory" required value={formData.eventCategory} onChange={handleChange}>
                    <option value="">Select Event...</option>
                    <option value="Curtain Call">Curtain Call (Theatre)</option>
                    <option value="Frame by Frame">Frame by Frame (Film)</option>
                    <option value="Unplugged">Unplugged (Duo)</option>
                  </select>
                </div>
              </div>

              {(formData.eventCategory === 'Curtain Call' || formData.eventCategory === 'Frame by Frame') && (
                <>
                  <div className="form-group">
                    <label>Play/Film Title *</label>
                    <input type="text" name="title" required value={formData.title} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Brief Synopsis (max 150 words) *</label>
                    <textarea name="synopsis" rows="3" required value={formData.synopsis} onChange={handleChange}></textarea>
                  </div>
                </>
              )}
            </>
          )}

          <div className="form-group">
            <label>Finish this sentence: The echo I/we want to leave behind is... (Max 100 chars) *</label>
            <input type="text" name="creativeEcho" maxLength="100" required value={formData.creativeEcho} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>How did you hear about ECHOES?</label>
              <select name="hearAbout" value={formData.hearAbout} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="Instagram">Instagram</option>
                <option value="Poster">Poster</option>
                <option value="Friend">Friend</option>
                <option value="Faculty">Faculty</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Instagram Handle (optional)</label>
              <input type="text" name="instaHandle" value={formData.instaHandle} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group checkbox-group">
            <input type="checkbox" id="agreed" name="agreed" checked={formData.agreed} onChange={handleChange} required />
            <label htmlFor="agreed">I agree to the terms and conditions of ECHOES 2025 *</label>
          </div>

          <button type="submit" className="submit-btn interactive" disabled={isSubmitting}>
            {isSubmitting ? 'SUBMITTING...' : 'SUBMIT YOUR ECHO'}
          </button>
        </form>
      </div>
    </div>
  );
}
