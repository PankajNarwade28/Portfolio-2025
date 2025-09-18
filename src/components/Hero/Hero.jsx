import React, { useState, useEffect } from "react";
import "./Hero.css";
export const Hero = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  const words = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Problem Solver"];

   
  // Custom typewriter effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentFullWord = words[currentWord];
      
      if (!isDeleting) {
        if (currentChar < currentFullWord.length) {
          setDisplayText(currentFullWord.slice(0, currentChar + 1));
          setCurrentChar(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (currentChar > 0) {
          setDisplayText(currentFullWord.slice(0, currentChar - 1));
          setCurrentChar(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setCurrentWord(prev => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [currentChar, isDeleting, currentWord, words]);

  const techStack = [
    { name: "MongoDB", icon: "🍃", color: "#47A248" },
    { name: "Express.js", icon: "⚡", color: "#000000" },
    { name: "React", icon: "⚛️", color: "#61DAFB" },
    { name: "Node.js", icon: "🟢", color: "#339933" },
    { name: "HTML5", icon: "📄", color: "#E34F26" },
    { name: "CSS3", icon: "🎨", color: "#1572B6" },
    { name: "JavaScript", icon: "📜", color: "#F7DF1E" },
    { name: "SQL", icon: "🗄️", color: "#336791" }
  ];

  return (
    <div className="hero-container" id="Home">
      {/* Animated Background */}
      <div className="hero-background">
        <div className="grid-overlay"></div>
        <div className="floating-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={`particle particle-${i}`}></div>
          ))}
        </div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="hero-content-wrapper">
        {/* Left Content */}
        <div className="hero-content">
          <div className="content-animation">
            <div className="badge">
              <span className="badge-dot"></span>
              Available for opportunities
            </div>
            
            <h3 className="subtitle">
              Full Stack Developer  <i >Intern </i>
              <span className="company-highlight">@Media Urbana</span>
            </h3>
            
            <h1 className="main-title">
              Building the 
              <span className="gradient-text"> future </span>
              powered by 
              <span className="gradient-text"> technology</span>
              <span className="title-decoration">🚀</span>
            </h1>
            
            <p className="description">
              Passionate <span className="highlight">IT professional</span> dedicated to 
              crafting innovative digital solutions with clean code and creative problem-solving.
              <span className="emoji-highlight"> ✨💻</span>
            </p>

            <div className="typewriter-container">
              <span className="typewriter-label">I'm a </span>
              <span className="typewriter-text">
                {displayText}
                <span className="cursor">|</span>
              </span>
            </div>

          <div className="action-buttons">
  <a href="https://github.com/PankajNarwade28?tab=repositories" target="_blank"  style={{color: "inherit", textDecoration: "none"}}>
    <button className="btn-primary">
      <span>View My Work</span> 
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  </a>
  <a href="#Contact2" style={{color: "inherit", textDecoration: "none"}}>
    <button className="btn-secondary">
      <span>Contact Me</span>
    </button>
  </a>
</div>

            <div className="social-links">
              <a href="https://www.linkedin.com/in/pankaj-narwade-13a053260" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://github.com/PankajNarwade28/" className="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
             <a href="https://instagram.com/mr_pankaj_narwade_patil" className="social-link">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.67 1.636 4.85 4.85.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.148 3.252-1.636 4.67-4.85 4.85-.944.056-1.298.07-4.85.07s-3.906-.014-4.85-.07c-3.252-.148-4.67-1.636-4.85-4.85-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.148-3.252 1.636-4.67 4.85-4.85zm0-2.163c-3.259 0-3.668.014-4.944.072-4.358.211-6.775 2.671-6.996 6.996-.058 1.276-.073 1.685-.073 4.944s.015 3.668.073 4.944c.221 4.325 2.638 6.784 6.996 6.996 1.276.058 1.685.072 4.944.072s3.668-.014 4.944-.072c4.357-.212 6.773-2.671 6.995-6.996.058-1.276.072-1.684.072-4.944s-.014-3.668-.072-4.944c-.222-4.325-2.64-6.783-6.995-6.996-1.277-.058-1.685-.072-4.944-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.442.645-1.442 1.442s.646 1.442 1.442 1.442 1.442-.645 1.442-1.442-.646-1.442-1.442-1.442z"/>
  </svg>
</a>
            </div>
          </div>
        </div>

        {/* Right Content - Enhanced Image Section */}
        <div className="hero-image-section">
          <div className="image-container">
            {/* Floating Tech Icons */}
            <div className="floating-tech-stack">
              {techStack.map((tech, index) => (
                <div 
                  key={index} 
                  className={`floating-tech-icon tech-${index}`}
                  style={{ '--delay': `${index * 0.5}s` }}
                >
                  <div className="tech-icon-inner">
                    <span className="tech-emoji">{tech.icon}</span>
                    <span className="tech-name">{tech.name}</span>
                  </div>
                  <div className="tech-glow" style={{ '--tech-color': tech.color }}></div>
                </div>
              ))}
            </div>

            {/* Main Profile Image */}
            <div className="profile-image-container">
              <div className="image-backdrop"></div>
              <div className="image-ring ring-1"></div>
              <div className="image-ring ring-2"></div>
              <div className="image-ring ring-3"></div>
              <img
                src="./assets/images/image-04.png"
                alt="Pankaj Digambar Narwade"
                className="profile-image"
              />
              <div className="image-glow"></div>
            </div>

            {/* Coding Activity Indicator */}
            <div className="activity-indicator">
              <div className="activity-dot"></div>
              <span>Currently coding...</span>
            </div>

            {/* Stats Display */}
            {/* <div className="stats-display">
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">3+</span>
                <span className="stat-label">Years Exp</span>
              </div>
            </div> */}
            
          </div>
          
        </div>
      </div>

      <style jsx>{`
        .hero-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a23 0%, #1a1a3e 50%, #2d2d5f 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          padding: 2rem;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 180, 216, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 180, 216, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        .floating-particles {
          position: absolute;
          inset: 0;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(0, 180, 216, 0.6);
          border-radius: 50%;
          animation: particleFloat 6s ease-in-out infinite;
        }

        .particle:nth-child(odd) {
          background: rgba(251, 133, 0, 0.6);
          animation-duration: 8s;
        }

        ${Array.from({ length: 20 }, (_, i) => `
          .particle-${i} {
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 6}s;
            animation-duration: ${4 + Math.random() * 4}s;
          }
        `).join('')}

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.3;
          animation: orbFloat 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #00b4d8, transparent);
          top: -150px;
          right: -150px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, #fb8500, transparent);
          bottom: -100px;
          left: -100px;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, #8338ec, transparent);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 4s;
        }

        .hero-content-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          z-index: 2;
          position: relative;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .content-animation {
          animation: slideInLeft 1s ease-out;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 180, 216, 0.1);
          border: 1px solid rgba(0, 180, 216, 0.3);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          color: #00b4d8;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          width: fit-content;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #00ff00;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .subtitle {
          font-size: 1.2rem;
          color: #ccc;
          margin-bottom: 1rem;
          font-weight: 400;
        }

        .company-highlight {
          color: #fb8500;
          font-weight: 600;
        }

        .main-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          color: white;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          font-weight: 700;
        }

        .gradient-text {
          background: linear-gradient(45deg, #00b4d8, #fb8500);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .title-decoration {
          font-size: 0.8em;
          margin-left: 0.5rem;
        }

        .description {
          font-size: 1.1rem;
          color: #ccc;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .highlight {
          color: #00b4d8;
          font-weight: 600;
        }

        .emoji-highlight {
          font-size: 1.2em;
        }

        .typewriter-container {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          color: white;
        }

        .typewriter-label {
          color: #ccc;
        }

        .typewriter-text {
          color: #fb8500;
          font-weight: 600;
        }

        .cursor {
          animation: blink 1s infinite;
          color: #00b4d8;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .btn-primary, .btn-secondary {
          padding: 1rem 2rem;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary {
          background: linear-gradient(45deg, #00b4d8, #fb8500);
          color: white;
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, #fb8500, #00b4d8);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .btn-primary:hover::before {
          opacity: 1;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 180, 216, 0.4);
        }

        .btn-primary span, .btn-primary svg {
          position: relative;
          z-index: 1;
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #00b4d8;
          color: #00b4d8;
          transform: translateY(-2px);
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ccc;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
        }

        .social-link:hover {
          background: rgba(0, 180, 216, 0.2);
          color: #00b4d8;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 180, 216, 0.3);
        }

        .hero-image-section {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .image-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          height: 500px;
        }

        .floating-tech-stack {
          position: absolute;
          inset: 0;
        }

        .floating-tech-icon {
          position: absolute;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: techFloat 6s ease-in-out infinite;
          animation-delay: var(--delay);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .floating-tech-icon:hover {
          transform: scale(1.1) translateY(-5px);
          background: rgba(255, 255, 255, 0.1);
        }

        .tech-icon-inner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: white;
        }

        .tech-emoji {
          font-size: 1.5rem;
        }

        .tech-name {
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .tech-glow {
          position: absolute;
          inset: -2px;
          border-radius: 17px;
          background: linear-gradient(45deg, var(--tech-color), transparent);
          opacity: 0;
          z-index: -1;
          transition: opacity 0.3s ease;
        }

        .floating-tech-icon:hover .tech-glow {
          opacity: 0.3;
        }

        .tech-0 { top: 10%; left: 10%; }
        .tech-1 { top: 5%; right: 15%; }
        .tech-2 { top: 30%; left: -10%; }
        .tech-3 { top: 25%; right: -5%; }
        .tech-4 { bottom: 35%; left: 5%; }
        .tech-5 { bottom: 30%; right: 10%; }
        .tech-6 { bottom: 10%; left: 15%; }
        .tech-7 { bottom: 5%; right: 20%; }

        .profile-image-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
        }

        .image-backdrop {
          position: absolute;
          inset: -20px;
          background: linear-gradient(45deg, #00b4d8, #fb8500);
          border-radius: 50%;
          filter: blur(20px);
          opacity: 0.3;
          animation: backdropPulse 3s ease-in-out infinite;
        }

        .image-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid transparent;
          animation: ringRotate 8s linear infinite;
        }

        .ring-1 {
          inset: -10px;
          border-top: 2px solid #00b4d8;
          border-right: 2px solid #00b4d8;
        }

        .ring-2 {
          inset: -20px;
          border-bottom: 2px solid #fb8500;
          border-left: 2px solid #fb8500;
          animation-direction: reverse;
          animation-duration: 6s;
        }

        .ring-3 {
          inset: -30px;
          border-top: 2px solid rgba(131, 56, 236, 0.8);
          border-right: 2px solid rgba(131, 56, 236, 0.8);
          animation-duration: 10s;
        }

        .profile-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 2;
        }

        .image-glow {
          position: absolute;
          inset: -5px;
          background: linear-gradient(45deg, #00b4d8, #fb8500);
          border-radius: 50%;
          opacity: 0;
          z-index: 1;
          animation: imageGlow 4s ease-in-out infinite;
        }

        .activity-indicator {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 255, 0, 0.1);
          border: 1px solid rgba(0, 255, 0, 0.3);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #00ff00;
          font-size: 0.8rem;
          backdrop-filter: blur(10px);
        }

        .activity-dot {
          width: 8px;
          height: 8px;
          background: #00ff00;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .stats-display {
          position: absolute;
          top: 20px;
          right: -50px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 10px;
          text-align: center;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          min-width: 80px;
        }

        .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: bold;
          color: #fb8500;
        }

        .stat-label {
          font-size: 0.7rem;
          color: #ccc;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }

        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }

        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }

        @keyframes gridMove {
          from { transform: translateX(0); }
          to { transform: translateX(50px); }
        }

        @keyframes techFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes backdropPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.5; }
        }

        @keyframes imageGlow {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.2; }
        }

        @media (max-width: 1024px) {
          .hero-content-wrapper {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }

          .stats-display {
            position: relative;
            top: auto;
            right: auto;
            flex-direction: row;
            justify-content: center;
            margin-top: 2rem;
          }

          .floating-tech-icon .tech-name {
            display: none;
          }

          .floating-tech-icon {
            padding: 0.5rem;
          }
          .action-buttons {
            justify-content: center;
          }
           .social-links {
            justify-content: center;
          } 
        }

        @media (max-width: 768px) {
          .hero-container {
            padding: 1rem;
          }

          .main-title {
            font-size: 2rem;
          }

          .action-buttons {
            flex-direction: column;
            align-items: center;
          }

          .btn-primary, .btn-secondary {
            width: 200px;
            justify-content: center;
          }

          .image-container {
            height: 400px;
          }

          .profile-image-container {
            width: 250px;
            height: 250px;
          }

         
        }

        @media (max-width: 480px) {
          .floating-tech-icon {
            display: none;
          }

          .stats-display {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};