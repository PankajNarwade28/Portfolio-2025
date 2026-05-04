import React, { useState, useEffect } from "react";
import "./Footer.css"; 
import { ResumeModal } from "../ResumeModal/ResumeModal";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_URL; 

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [apiLinks, setApiLinks] = useState([]);
  const [resumeLink, setResumeLink] = useState("");

  useEffect(() => {
    // Fetch links from API
    axios.get(`${API_BASE}/api/personal/links`)
      .then((res) => setApiLinks(res.data))
      .catch((err) => console.error("Error fetching links:", err));

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.querySelector('.footer-container');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  const fetchResumeLink = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/links/resume`);
    console.log("Resume Link Response:", response.data);

    return response.data[0]?.resume_url; // ✅ correct
  } catch (error) {
    console.error("Error fetching resume link:", error);
    return null;
  }
};

useEffect(() => {
  const getResumeLink = async () => {
    const link = await fetchResumeLink();
    console.log("Fetched Resume Link:", link);
    setResumeLink(link); // ✅ already string
  };
  getResumeLink();
}, []);

  // Helper to extract links based on platform name
  const getLink = (platform) => {
    const linkObj = apiLinks.find((l) => l.platform === platform);
    return linkObj ? linkObj.link_url : "";
  };

  const emailUrl = getLink("email");
  const emailDisplay = emailUrl ? emailUrl.replace("mailto:", "") : "Loading..."; 

  const quickActions = [
    { name: "Download Resume", action: () => setIsPdfOpen(true), icon: "/assets/images/download.png" },
    { name: "Email Me", href: emailUrl, icon: "/assets/images/email.png" }
  ];

  // Dynamically generate social links based on the API response
  const socialPlatforms = ["linkedin", "github", "leetcode", "instagram", "youtube"];
  const socialLinks = apiLinks
    .filter((link) => socialPlatforms.includes(link.platform))
    .map((link) => ({
      name: link.display_text,
      url: link.link_url,
      icon: `/assets/images/${link.platform}.png`
    }));

  const handleEmailClick = () => {
    if (emailUrl) window.location.href = emailUrl;
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container" id="Footer">
      {/* 3D Background Effects */}
      <div className="footer-background">
        <div className="footer-grid-overlay"></div>
        <div className="footer-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={`footer-particle particle-${i % 5}`}></div>
          ))}
        </div>
        <div className="footer-gradient-orb orb-1"></div>
        <div className="footer-gradient-orb orb-2"></div>
        <div className="footer-gradient-orb orb-3"></div>
        <div className="floating-shapes">
          <div className="shape-cube"></div>
          <div className="shape-pyramid"></div>
          <div className="shape-sphere"></div>
        </div>
      </div>

      <div className="footer-content">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className={`footer-brand ${isVisible ? 'animate-in' : ''}`}>
            <div className="brand-logo">
              <div className="logo-container">
                <div className="logo-backdrop"></div>
                <div className="logo-symbol">P</div>
                <div className="logo-glow"></div>
              </div>
              <div className="brand-text">
                <h2 className="brand-name">Pankaj.Dev</h2>
                <p className="brand-tagline">Full Stack Developer</p>
              </div>
            </div>
            
            <div className="contact-info">
              <p className="contact-text">Ready to collaborate?</p>
              <button className="contact-email-btn" onClick={handleEmailClick}>
                <span className="email-text">{emailDisplay}</span>
                <svg className="email-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className={`footer-nav ${isVisible ? 'animate-in' : ''}`}>
            <div className="footer-nav-section">
              <h3 className="footer-nav-title">Quick Actions</h3>
              <ul className="footer-nav-links">
                {quickActions.map((action, index) => (
                  <li key={action.name} style={{ '--animation-delay': `${index * 0.1}s` }}>
                    {action.action ? (
                      <button onClick={action.action} className="footer-nav-link">
                        <span className="link-icon"><i className={action.icon}></i></span>
                        <span className="link-text">{action.name}</span>
                      </button>
                    ) : (
                      <a href={action.href} className="footer-nav-link" target={action.href?.startsWith('http') ? '_blank' : '_self'} rel={action.href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
                        <span className="link-icon"><i className={action.icon}></i></span>
                        <span className="link-text">{action.name}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social & Newsletter */}
          <div className={`footer-social ${isVisible ? 'animate-in' : ''}`}>
            <h3 className="social-title">Let's Connect</h3>
            <p className="social-description">
              Follow my journey and stay updated with my latest projects and insights.
            </p>
            
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  style={{ '--animation-delay': `${index * 0.1}s` }}
                >
                 <div className="social-icon-wrapper">
                  <img src={social.icon} alt={social.name + ' icon'} className="social-icon-img" />
                </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>© {currentYear} Pankaj Narwade, All rights reserved.</p>
              <div className="tech-stack">
                <span>Built with</span>
                <div className="tech-icons">
                  <span className="tech-icon" title="React">⚛️</span>
                  <span className="tech-icon" title="Node.js">🚀</span>
                </div>
                <span>& ❤️</span>
              </div>
            </div>
            
            <div className="footer-actions">
              <div className="theme-toggle">
                <button className="theme-btn" aria-label="Toggle theme">
                  <span className="theme-icon">🌙</span>
                </button>
              </div>
              
              <button className="scroll-top-btn" onClick={handleScrollToTop} aria-label="Scroll to top">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="footer-line"></div>
          
          <div className="footer-final">
            <p className="made-with-love">
              Designed & Developed with passion in Pune, India 🇮🇳
            </p>
          </div>
        </div>
      </div>

      <ResumeModal 
        isOpen={isPdfOpen} 
        onClose={() => setIsPdfOpen(false)} 
        pdfUrl={resumeLink} 
      />
    </footer>
  );
};