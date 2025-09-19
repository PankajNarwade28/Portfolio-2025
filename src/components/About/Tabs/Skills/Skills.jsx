import React from "react";
import { useState, useEffect } from "react";
import { SKILLS } from "../../../../util/data";
import "./Skills.css";

// Skills component now accepts `activeTab` as a prop
export const Skills = ({ activeTab }) => {
  const [visibleSkills, setVisibleSkills] = useState({});

  useEffect(() => {
    // Exit early if the active tab is not 'skills'
    if (activeTab !== 'skills') {
      return;
    }

    // Reset visibleSkills to an empty object to re-trigger the animation
    setVisibleSkills({});

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillId = entry.target.getAttribute('data-skill-id');
          setVisibleSkills(prev => ({ ...prev, [skillId]: true }));
        }
      });
    }, { threshold: 0.5 });

    // Use a slight delay to ensure the elements are rendered before observing
    const timer = setTimeout(() => {
      const skillElements = document.querySelectorAll('.skill-progress-bar');
      skillElements.forEach(el => observer.observe(el));
    }, 100);

    // Cleanup function to disconnect the observer and clear the timer
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [activeTab]);

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
    <>
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
    </>
  );
};