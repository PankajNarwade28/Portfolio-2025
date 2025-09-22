import React, { useState, useEffect } from "react";
import { resumeLink } from "../../util/resume";
import "./Navbar.css";
export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [progress,setProgress] = useState(0);
  // // Handle scroll effect
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     setScrolled(scrollPosition > 50);

  //     // Update active section based on scroll position
  //     const sections = ["Home", "About",  "Project", "Contact","Footer"];
  //     const currentSection = sections.find(section => {
  //       const element = document.getElementById(section);
  //       if (element) {
  //         const rect = element.getBoundingClientRect();
  //         return rect.top <= 100 && rect.bottom >= 100;
  //       }
  //       return false;
  //     });

  //     if (currentSection) {
  //       setActiveSection(currentSection);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // Handle scroll effect
useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setScrolled(scrollPosition > 50);

    // Update active section based on scroll position
    const sections = ["Home", "About", "Project", "Contact", "Footer"];
    const currentSection = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 80 && rect.bottom >= 100;
      }
      return false;
    });

    if (currentSection) {
      setActiveSection(currentSection);
    }

    // 🔥 Scroll progress calculation
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;

    // If near footer → force 100%
    const footer = document.getElementById("Footer");
    if (footer) {
      const rect = footer.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setProgress(100);
      } else {
        setProgress(scrolled);
      }
    } else {
      setProgress(scrolled);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    closeMenu();

    // Smooth scroll to section with offset for navbar height
    const element = document.getElementById(sectionId);
    if (element) {
      const navbar = document.querySelector('.navbar');
      const navbarHeight = navbar ? navbar.offsetHeight : 80; // fallback to 80px
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementTop - navbarHeight,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: "Home", label: "Home", icon: "🏠" },
    { id: "About", label: "About", icon: "👨‍💻" }, 
    { id: "Project", label: "Projects", icon: "🚀" },
    { id: "Contact", label: "Contact", icon: "📧" }
  ];

  return (
    <>
      {/* Mobile Navigation Overlay */}
      <div className={`mobile-overlay ${openMenu ? 'active' : ''}`} onClick={closeMenu}></div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo Section */}
          <div className="nav-brand" onClick={() => handleNavClick('Home')}>
            <div className="logo-container">
              <img src="./assets/images/logo3.png" alt="Portfolio Logo" className="nav-logo" />
              <div className="logo-glow"></div>
            </div>
            <div className="brand-text">
              <span className="brand-name">Portfolio</span>
              <span className="brand-tagline">Full Stack Dev</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-menu">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.id} className="nav-item">
                  <a
                    href={`#${item.id}`}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-text">{item.label}</span>
                    <div className="nav-indicator"></div>
                  </a>
                </li>
              ))}
            </ul>

            {/* Resume Button */}
            <a
              href={resumeLink}
              target="_blank"
              rel="noreferrer"
              className="resume-btn"
            >
              <span className="btn-icon">📄</span>
              <span>CV</span>
              <div className="btn-shine"></div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className={`mobile-menu-btn ${openMenu ? 'active' : ''}`} onClick={toggleMenu}>
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="scroll-progress">
          <div
            className="progress-bar"
            style={{
              width: `${Math.min((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%`
            }}
          ></div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${openMenu ? 'active' : ''}`}>
        <div className="mobile-nav-header">
          <div className="mobile-logo">
            <img src="./assets/images/logo3.png" alt="Portfolio Logo" />
            <span>Portfolio</span>
          </div>
          <button className="mobile-close-btn" onClick={closeMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mobile-nav-content">
          <ul className="mobile-nav-list">
            {navItems.map((item, index) => (
              <li key={item.id} className="mobile-nav-item" style={{ '--delay': `${index * 0.1}s` }}>
                <a
                  href={`#${item.id}`}
                  className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  <span className="mobile-nav-icon">{item.icon}</span>
                  <span className="mobile-nav-text">{item.label}</span>
                  <svg className="mobile-nav-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-nav-footer">
            <a
              href={resumeLink}
              target="_blank"
              rel="noreferrer"
              className="mobile-resume-btn"
              onClick={closeMenu}
            >
              <span>📄</span>
              <span>Download Resume</span>
            </a>

            <div className="mobile-social-links">
              <a href="https://www.linkedin.com/in/pankaj-narwade-13a053260" className="mobile-social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://github.com/PankajNarwade28/" className="mobile-social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
  href="https://www.instagram.com/mr_pankaj_narwade_patil/"
  className="mobile-social-link"
  target="_blank"
  rel="noopener noreferrer"
>
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 
      0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 
      3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 
      0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 
      3a5 5 0 100 10 5 5 0 000-10zm0 
      2a3 3 0 110 6 3 3 0 010-6zm4.5-3a1.5 
      1.5 0 100 3 1.5 1.5 0 000-3z"/>
  </svg>
</a>

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(10, 10, 35, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          animation: slideDown 0.6s ease-out;
        }

        .navbar.scrolled {
          background: rgba(10, 10, 35, 0.95);
          box-shadow: 0 8px 32px rgba(0, 180, 216, 0.1);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .nav-brand:hover {
          transform: scale(1.05);
        }

        .logo-container {
          position: relative;
          width: 50px;
          height: 50px;
        }

        .nav-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 10px;
          position: relative;
          z-index: 2;
        }

        .logo-glow {
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #00b4d8, #fb8500);
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
          animation: logoGlow 4s ease-in-out infinite;
        }

        .nav-brand:hover .logo-glow {
          opacity: 0.3;
        }

        .brand-text {
          display: flex;
          flex-direction: column;
          color: white;
        }

        .brand-name {
          font-size: 1.2rem;
          font-weight: 700;
          background: linear-gradient(45deg, #00b4d8, #fb8500);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-tagline {
          font-size: 0.7rem;
          color: #ccc;
          font-weight: 400;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-list {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          color: #ccc;
          text-decoration: none;
          border-radius: 25px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }

        .nav-link.active {
          color: #00b4d8;
          background: rgba(0, 180, 216, 0.1);
          border: 1px solid rgba(0, 180, 216, 0.3);
        }

        .nav-icon {
          font-size: 1.1rem;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .nav-link:hover .nav-icon,
        .nav-link.active .nav-icon {
          opacity: 1;
        }

        .nav-text {
          font-size: 0.95rem;
          font-weight: 500;
        }

        .nav-indicator {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 20px;
          height: 2px;
          background: linear-gradient(45deg, #00b4d8, #fb8500);
          border-radius: 1px;
          transition: transform 0.3s ease;
        }

        .nav-link.active .nav-indicator {
          transform: translateX(-50%) scaleX(1);
        }

        .resume-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(45deg, #00b4d8, #fb8500);
          color: white;
          text-decoration: none;
          border-radius: 25px;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          border: none;
          cursor: pointer;
        }

        .resume-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 180, 216, 0.4);
        }

        .btn-icon {
          font-size: 1.1rem;
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }

        .resume-btn:hover .btn-shine {
          left: 100%;
        }

        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .mobile-menu-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
        }

        .hamburger {
          width: 20px;
          height: 15px;
          position: relative;
        }

        .hamburger span {
          display: block;
          width: 100%;
          height: 2px;
          background: white;
          border-radius: 1px;
          position: absolute;
          transition: all 0.3s ease;
        }

        .hamburger span:nth-child(1) {
          top: 0;
        }

        .hamburger span:nth-child(2) {
          top: 50%;
          transform: translateY(-50%);
        }

        .hamburger span:nth-child(3) {
          bottom: 0;
        }

        .mobile-menu-btn.active .hamburger span:nth-child(1) {
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
        }

        .mobile-menu-btn.active .hamburger span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-btn.active .hamburger span:nth-child(3) {
          bottom: 50%;
          transform: translateY(50%) rotate(-45deg);
        }

        .scroll-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(45deg, #00b4d8, #fb8500);
          transition: width 0.1s ease;
        }

        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(5px);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav {
          position: fixed;
          top: 0;
          right: -100%; /* Changed from -400px to -100% to push it fully off-screen */
          width: 85vw; /* Changed from 350px to a fluid width */
          max-width: 400px; /* Added a max-width to prevent it from getting too wide on tablets */
          height: 100vh;
          background: linear-gradient(135deg, #0a0a23 0%, #1a1a3e 100%);
          z-index: 1001;
          transition: right 0.3s ease;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-nav.active {
          right: 0;
        }

        .mobile-nav-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          font-weight: 700;
        }

        .mobile-logo img {
          width: 35px;
          height: 35px;
          border-radius: 8px;
        }

        .mobile-close-btn {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fb8500;
        }

        .mobile-nav-content {
          padding: 2rem 0;
          height: calc(100vh - 165px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .mobile-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mobile-nav-item {
          margin-bottom: 0.5rem;
          animation: slideInRight 0.5s ease-out;
          animation-delay: var(--delay);
          animation-fill-mode: both;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          color: #ccc;
          text-decoration: none;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          color: white;
          background: rgba(0, 180, 216, 0.1);
          border-left-color: #00b4d8;
        }

        .mobile-nav-link .mobile-nav-icon {
          font-size: 1.2rem;
          margin-right: 1rem;
        }

        .mobile-nav-text {
          flex: 1;
          font-weight: 500;
        }

        .mobile-nav-arrow {
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .mobile-nav-link:hover .mobile-nav-arrow,
        .mobile-nav-link.active .mobile-nav-arrow {
          opacity: 1;
          transform: translateX(5px);
        }

        .mobile-nav-footer {
          padding: 0 1.5rem;
        }

        .mobile-resume-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          padding: 1rem;
          background: linear-gradient(45deg, #00b4d8, #fb8500);
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          margin-bottom: 1.5rem;
          transition: transform 0.3s ease;
        }

        .mobile-resume-btn:hover {
          transform: translateY(-2px);
        }

        .mobile-social-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .mobile-social-link {
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ccc;
          transition: all 0.3s ease;
        }

        .mobile-social-link:hover {
          background: rgba(0, 180, 216, 0.2);
          color: #00b4d8;
          transform: translateY(-2px);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes logoGlow {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
        }

        @media (max-width: 1024px) {
          .nav-container {
            padding: 0 1.5rem;
          }

          .nav-menu {
            gap: 1rem;
          }

          .nav-list {
            gap: 0;
          }

          .nav-text {
            display: none;
          }

          .brand-text {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .mobile-nav.active{
          width: 100vw; /* Ensure mobile nav takes full width on smaller screens */
          }
          .mobile-nav {
          max-width: 500px; /* Remove max-width constraint */
          }
          .nav-container {
            height: 70px;
            padding: 0 1rem;
          }

          .nav-menu {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          /* This media query block is no longer needed due to the general mobile-nav changes */
          /* .mobile-nav {
            width: 100vw;
            right: -100vw;
          }

          .mobile-nav.active {
            right: 0;
          } */
        }

        @media (max-width: 480px) {
          .nav-container {
            height: 60px;
          }

          .logo-container {
            width: 40px;
            height: 40px;
          }

          .mobile-menu-btn {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </>
  );
};