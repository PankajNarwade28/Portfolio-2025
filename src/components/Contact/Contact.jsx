import React, {  useState } from "react"; 
import "./Contact.css";
import contactInfo from "../../util/contact"; 
import ContactForm from "./ContactForm/ContactForm"; 

import { ToastContainer, toast } from "react-toastify";
import { ContactInfoCard } from "./ContactInfoCard/ContactInfoCard";


// Main Contact Component
export const Contact = () => { 
  const [activeCard] = useState(null);
  const [loading, setLoading] = useState(false);

  

  return (
    <div className="contact-section" id="Contact">
    
      
     {/* ToastContainer placed at the top-right of the entire page */}
      <ToastContainer position="top-right" />
      
      {/* Full-screen loader overlay with blur */}
{loading && (
  <div className="loader-overlay-refined">
    <div className="loader-content-refined">
      <div className="spinner-container-svg">
        <svg viewBox="0 0 100 100" className="animated-svg-spinner">
          <path 
            className="spinner-path path-1" 
            d="M 20 50 A 30 30 0 0 1 50 20 A 30 30 0 0 1 80 50" 
            fill="none" 
            stroke="white" 
            strokeWidth="8" 
            strokeLinecap="round"
          />
          <path 
            className="spinner-path path-2" 
            d="M 20 50 A 30 30 0 0 0 50 80 A 30 30 0 0 0 80 50" 
            fill="none" 
            stroke="white" 
            strokeWidth="8" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="loading-text">Sending Your Message...</p>
    </div>
  </div>
)}
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

      <div className="contact-container" >
        {/* Header Section */}
        <div className="contact-header" id="Contact2">
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
        <div className="contact-content-grid" >
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
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
             <ContactForm setLoading={setLoading} toast={toast}  />
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section" >
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