import React, { useState } from "react";
import "./About.css";  
import "./style.css"
import { Skills } from "./Tabs/Skills/Skills";
import { Education } from "./Tabs/Education/Education";
import { Achievement } from "./Tabs/Achievement/Achievement";
import AboutMe from "./Tabs/Aboutme/Aboutme";

export const About = () => {
  const [activeTab, setActiveTab] = useState('about'); 

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
            <AboutMe />
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="content-section skills-section">
            <Skills activeTab={activeTab} />
          </div>
        )}

        {activeTab === 'education' && (
          <div className="content-section education-section">
           <Education />
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="content-section achievements-section">
            <Achievement />
          </div>
        )}
      </div>
    </div>
  );
};