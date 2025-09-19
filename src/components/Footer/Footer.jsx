import React, { useState, useEffect } from "react";
import "./Footer.css"; 
export const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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

  const quickActions = [
  { name: "Download Resume", href: "https://drive.google.com/file/d/1mXPYjUQn2j71N-a7M9XZoeKCWGTIm4HY/view?usp=sharing", icon: "/assets/images/download.png" },
  { name: "Email Me", href: "mailto:pankajnarwade258@gmail.com", icon: "/assets/images/email.png" }
];

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/pankaj-narwade-13a053260", icon: "/assets/images/linkedin.png" },
  { name: "GitHub", url: "https://github.com/PankajNarwade28", icon: "/assets/images/github.png" },
  { name: "Twitter", url: "https://leetcode.com/Pankaj_Narwade_28", icon: "/assets/images/leetcode.png" },
  { name: "Instagram", url: "https://instagram.com/mr_pankaj_narwade_patil", icon: "/assets/images/instagram.png" }
];
  const handleEmailClick = () => {
    window.location.href = "mailto:pankajnarwade258@gmail.com";
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
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
                <span className="email-text">pankajnarwade258@gmail.com</span>
                <svg className="email-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
 
          </div>

          {/* Navigation Links */}
          <div className={`footer-nav ${isVisible ? 'animate-in' : ''}`}>
           

            <div className="nav-section">
              <h3 className="nav-title">Quick Actions</h3>
              <ul className="nav-links">
                {quickActions.map((action, index) => (
                  <li key={action.name} style={{ '--animation-delay': `${index * 0.1}s` }}>
                    <a href={action.href} className="nav-link" target={action.href.startsWith('http') ? '_blank' : '_self'}>
                      <span className="link-icon"><i class={action.icon}></i></span>

                      <span className="link-text">{action.name}</span>
                    </a>
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
  <img src={social.icon} alt={social.name + ' icon'} style={{ width: 32, height: 32 }} />
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
    </footer>
  );
};