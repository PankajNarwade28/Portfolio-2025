import React, { useState, useEffect } from "react";
import "./About.css";
import { SKILLS, ACHIEVEMENTS, EDUCATION } from "../../util/data";

export const About = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [visibleSkills, setVisibleSkills] = useState({});

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (activeTab !== 'skills') {
      return; // Only run this effect for the skills tab
    }
    
    // Reset the state to trigger re-animation
    setVisibleSkills({});

    const observer = new window.IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillId = entry.target.getAttribute('data-skill-id');
          setVisibleSkills(prev => ({ ...prev, [skillId]: true }));
        }
      });
    }, { threshold: 0.5 }); // Added threshold to improve observation

    const skillElements = document.querySelectorAll('.skill-progress-bar');
    skillElements.forEach(el => observer.observe(el));

    // Cleanup function to disconnect the observer
    return () => observer.disconnect();
  }, [activeTab]); // This effect now runs whenever the activeTab changes

  const getSkillIcon = (skillName) => {
    const icons = {
      'HTML5': '🌐',
      'CSS3': '🎨',
      'JS': '⚡',
      'React.js': '⚛️',
      'Node.js': '🟢',
      'Express.js': '🚂',
      'MongoDB': '🍃',
      'Oracle': '🔵',
      'MySql': '🐬',
      'Git & Github': '📦',
      'Visual Studio Code': '💻',
      'Bootstrap': '🅱️',
      'Eclipse': '🌑',
      'ShadCN': '✨',
      'Font Awesome': '🅰️',
      'Postman': '📬',
      'CPP': '💻',
      'Core Java': '☕',
      'Python': '🐍',
      'Next.js': '➡️',
    };
    return icons[skillName] || '🛠️';
  };

  return (
    <div className="about-container" id="About">
      <div className="about-background">
        <div className="floating-particles">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className={`particle particle-${i}`}></div>
          ))}
        </div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="section-navigation">
        <div className="nav-container-about">
          {[
            { id: 'about', label: 'About Me', icon: '👨‍💻' },
            { id: 'skills', label: 'Skills', icon: '🛠️' },
            { id: 'education', label: 'Education', icon: '🎓' },
            { id: 'achievements', label: 'Achievements', icon: '🏆' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="content-wrapper">
        {activeTab === 'about' && (
          <div className="content-section about-section">
            <div className="section-header">
              <h2 className="section-title">About Me</h2>
              <div className="title-underline"></div>
            </div>
            <div className="about-content-grid">
              <div className="about-text-content">
                <div className="intro-card">
                  <div className="greeting">
                    <span className="wave">👋</span>
                    <h3>Hello! I'm <span className="name-highlight">Pankaj Digambar Narwade</span></h3>
                  </div>
                  <p className="bio-text">
                    Currently pursuing <span className="highlight">Master of Computer Applications</span> from 
                    P.E.S's Modern College of Engineering, Pune. I'm a passionate full-stack developer 
                    with a strong foundation in modern web technologies and a keen interest in creating 
                    innovative digital solutions.
                  </p>
                  <div className="journey-stats">
                    <div className="stat-item">
                      <div className="stat-number">3+</div>
                      <div className="stat-label">Years Learning</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">15+</div>
                      <div className="stat-label">Projects Built</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">8.68</div>
                      <div className="stat-label">Current CGPA</div>
                    </div>
                  </div>
                  <div className="interests-section">
                    <h4>What Drives Me</h4>
                    <div className="interest-tags">
                      <span className="interest-tag">Problem Solving</span>
                      <span className="interest-tag">Clean Code</span> 
                      <span className="interest-tag">Responsive Designs</span>
                      <span className="interest-tag">Team Collaboration</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-image-section">
                <div className="profile-card">
                  <div className="profile-image-wrapper">
                    <img 
                      src="./assets/images/image-05.png" 
                      alt="Pankaj Digambar Narwade" 
                      className="profile-image"
                    />
                    <div className="image-border"></div>
                  </div>
                  <div className="card-footer">
                    <h4>Pankaj Digambar Narwade</h4>
                    <p>Full Stack Developer Intern</p>
                    <div className="quick-connect">
                      <button className="connect-btn">Let's Connect</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="content-section skills-section">
            <div className="section-header">
              <h2 className="section-title">Technical Proficiency</h2>
              <div className="title-underline"></div>
            </div>
            <div className="skills-grid">
              {SKILLS.map((category, categoryIndex) => (
                <div key={category.title} className={`skill-category skill-category-${categoryIndex}`}>
                  <div className="category-header">
                    <div className="category-icon">
                      <img src={category.icon} alt={category.title} />
                    </div>
                    <h3 className="category-title">{category.title}</h3>
                  </div>
                  <div className="skills-list">
                    {category.skills.map((skill, skillIndex) => {
                      const skillId = `${categoryIndex}-${skillIndex}`;
                      return (
                        <div key={skill.skill} className="skill-item">
                          <div className="skill-header">
                            <div className="skill-info">
                              <span className="skill-icon">{getSkillIcon(skill.skill)}</span>
                              <span className="skill-name">{skill.skill}</span>
                            </div>
                            <span className="skill-percentage">{skill.percentage}</span>
                          </div>
                          <div className="skill-progress">
                            <div 
                              className="skill-progress-bar"
                              data-skill-id={skillId}
                              style={{
                                width: visibleSkills[skillId] ? skill.percentage : '0%',
                                backgroundColor: categoryIndex === 0 ? '#4ECDC4' : 
                                               categoryIndex === 1 ? '#45B7D1' : 
                                               categoryIndex === 2 ? '#96CEB4' : '#FFEAA7'
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="content-section education-section">
            <div className="section-header">
              <h2 className="section-title">Educational Journey</h2>
              <div className="title-underline"></div>
            </div>
            <div className="education-timeline">
              {EDUCATION.map((edu, index) => (
                <div key={edu.id} className={`timeline-item ${edu.status}`}>
                  <div className="timeline-connector">
                    <div className="timeline-dot"></div>
                    {index < EDUCATION.length - 1 && <div className="timeline-line"></div>}
                  </div>
                  <div className="education-card">
                    <div className="card-header">
                      <div className="duration-badge">{edu.duration}</div>
                      {edu.status === 'current' && (
                        <div className="current-badge">
                          <div className="pulse-dot"></div>
                          <span>Current</span>
                        </div>
                      )}
                    </div>
                    <div className="card-content">
                      <h3 className="degree-title">{edu.degree}</h3>
                      <p className="institution">
                        {edu.institution}
                        <span className="location">📍 {edu.location}</span>
                      </p>
                      <p className="description">{edu.description}</p>
                    </div>
                    <div className="card-footer">
                      <div className="grade-display">
                        <span className="grade-label">Grade:</span>
                        <span className="grade-value">{edu.grade}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="content-section achievements-section">
            <div className="section-header">
              <h2 className="section-title">Key Achievements</h2>
              <div className="title-underline"></div>
            </div>
            <div className="achievements-grid">
              {ACHIEVEMENTS.map((achievement, index) => (
                <div key={achievement.id} className="achievement-card" style={{'--delay': `${index * 0.1}s`}}>
                  <div className="achievement-header">
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-year">{achievement.year}</div>
                  </div>
                  <div className="achievement-content">
                    <h3 className="achievement-title">{achievement.title}</h3>
                    <p className="achievement-description">{achievement.description}</p>
                  </div>
                  <div className="achievement-footer">
                    <span className="achievement-category">{achievement.category}</span>
                  </div>
                  <div className="achievement-glow"></div>
                </div>
              ))}
            </div>
            <div className="achievements-summary">
              <div className="summary-card">
                <h4>Journey Highlights</h4>
                <p>These achievements represent my dedication to continuous learning and excellence in technology. Each milestone has shaped my growth as a developer and problem solver.</p>
                <div className="summary-stats">
                  <div className="summary-stat">
                    <span className="stat-number">{ACHIEVEMENTS.length}</span>
                    <span className="stat-label">Major Achievements</span>
                  </div>
                  <div className="summary-stat">
                    <span className="stat-number">4</span>
                    <span className="stat-label">Categories</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};