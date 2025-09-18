import React, { useRef, useState, useEffect } from "react"; 
import "./Contact.css";
import contactInfo from "../../util/contact";
import emailjs from "@emailjs/browser";
// ContactInfoCard Component
const ContactInfoCard = ({ iconUrl, text, link, platform, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (platform === 'email') {
      window.location.href = link;
    } else {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const getPlatformColor = (platform) => {
    switch(platform) {
      case 'email': return '#4ECDC4';
      case 'github': return '#333';
      case 'linkedin': return '#0077B5';
      case 'leetcode': return '#FFA116';
      default: return '#4ECDC4';
    }
  };

  return (
    <div 
      className={`contact-info-card ${isActive ? 'active' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ '--platform-color': getPlatformColor(platform) }}
    >
      <div className="card-icon">
        <img src={iconUrl} alt={platform} />
        <div className="icon-glow"></div>
      </div>
      <div className="card-content">
        <h4 className="platform-name">{platform.charAt(0).toUpperCase() + platform.slice(1)}</h4>
        <p className="contact-text">{text}</p>
        <div className="hover-indicator">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

// ContactForm Component
const ContactForm = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    user_email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState({ show: false, message: '', type: '' });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.user_email.trim()) {
      newErrors.user_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
      newErrors.user_email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const showNotification = (message, type) => {
    setShowToast({ show: true, message, type });
    setTimeout(() => {
      setShowToast({ show: false, message: '', type: '' });
    }, 4000);
  };
 
  const sendEmail = async (e) => {
  e.preventDefault();

  if (!validateForm()) return; // assuming this function exists

  setLoading(true);

  try {
    await emailjs.sendForm(
      "service_b2kobwd",
      "template_6aj4f45",
      form.current,
      {
        publicKey: "PiuldxkokUNi2N_rt",
      }
    );
    // Success handling
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      setFormData({ first_name: '', last_name: '', user_email: '', message: '' });
  } catch (error) {
      showNotification('Failed to send message. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
};
  return (
    <div className="contact-form-container">
      <div className="form-header">
        <h3>Let's Work Together</h3>
        <p>Have a project in mind? Let's discuss how we can bring your ideas to life.</p>
      </div>

      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="John"
              value={formData.first_name}
              onChange={handleInputChange}
              className={errors.first_name ? 'error' : ''}
              autoComplete="given-name"
            />
            {errors.first_name && <span className="error-message">{errors.first_name}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Doe"
              value={formData.last_name}
              onChange={handleInputChange}
              className={errors.last_name ? 'error' : ''}
              autoComplete="family-name"
            />
            {errors.last_name && <span className="error-message">{errors.last_name}</span>}
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="user_email">Email Address</label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            placeholder="john.doe@example.com"
            value={formData.user_email}
            onChange={handleInputChange}
            className={errors.user_email ? 'error' : ''}
            autoComplete="email"
          />
          {errors.user_email && <span className="error-message">{errors.user_email}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            rows="5"
            placeholder="Tell me about your project, ideas, or just say hello..."
            value={formData.message}
            onChange={handleInputChange}
            className={errors.message ? 'error' : ''}
          ></textarea>
          <div className="character-count">
            {formData.message.length}/500
          </div>
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        <button type="submit" disabled={loading} className={`send-btn ${loading ? 'loading' : ''}`}>
          {loading ? (
            <>
              <div className="spinner"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>
      </form>

      {/* Custom Toast Notification */}
      {showToast.show && (
        <div className={`toast-notification ${showToast.type}`}>
          <div className="toast-icon">
            {showToast.type === 'success' ? '✅' : '❌'}
          </div>
          <span>{showToast.message}</span>
          <button 
            className="toast-close"
            onClick={() => setShowToast({ show: false, message: '', type: '' })}
          >
            ×
          </button>
        </div>
      )}

      {loading && (
        <div className="loader-overlay">
          <div className="loader-content">
            <div className="loader-spinner"></div>
            <span>Sending your message...</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Contact Component
export const Contact = () => {
  const [activeCard, setActiveCard] = useState(null);

  

  return (
    <div className="contact-section" id="Contact">
      {/* Animated Background */}
      <div className="contact-background">
        <div className="floating-particles">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`particle particle-${i}`}></div>
          ))}
        </div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="contact-container">
        {/* Header Section */}
        <div className="contact-header">
          <h1 className="section-title">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="section-subtitle">
            Ready to turn your ideas into reality? I'm just a message away.
          </p>
          <div className="availability-status">
            <div className="status-dot"></div>
            <span>Available for new opportunities</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="contact-content-grid">
          {/* Contact Information Cards */}
          <div className="contact-info-section">
            <h2 className="info-section-title">Get In Touch</h2>
            <p className="info-section-subtitle">
              Choose your preferred way to connect with me
            </p>
            
            <div className="contact-info-cards">
              {contactInfo.map((info, index) => (
                <ContactInfoCard 
                  key={info.platform}
                  {...info}
                  isActive={activeCard === index}
                />
              ))}
            </div>

            <div className="additional-info">
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div className="info-text">
                  <span className="info-label">Location</span>
                  <span className="info-value">Pune, Maharashtra, India</span>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">⏰</div>
                <div className="info-text">
                  <span className="info-label">Response Time</span>
                  <span className="info-value">Within 24 hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <ContactForm />
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="cta-content">
            <h3>Prefer a quick chat?</h3>
            <p>Feel free to reach out directly via email or connect on social media</p>
            <div className="cta-buttons">
              <a href="mailto:pankajnarwade258@gmail.com" className="cta-btn primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Send Quick Email
              </a>
              <a href="https://www.linkedin.com/in/pankaj-narwade-13a053260" target="_blank" rel="noopener noreferrer" className="cta-btn secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2"/>
                  <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2"/>
                </svg>
                LinkedIn Message
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        

        ${Array.from({ length: 10 }, (_, i) => `
          .particle-${i} {
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 12}s;
          }
        `).join('')}

        
      `}</style>
    </div>
  );
};