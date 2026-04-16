import React from "react";
import { useState, useEffect } from "react"; 
import { SKILLS , getSkillPrintStatement} from "../../../../util/data";
import axios from "axios";
import "./Skills.css";

// Skills component now accepts `activeTab` as a prop
export const Skills = ({ activeTab }) => {
  const [visibleSkills, setVisibleSkills] = useState({});
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/skills");
        setSkillsData(res.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  useEffect(() => {
    // Exit early if the active tab is not 'skills'
    if (activeTab !== "skills") {
      return;
    }

    // Reset visibleSkills to an empty object to re-trigger the animation
    setVisibleSkills({});

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // const skillId = entry.target.getAttribute("data-skill-id");
            const skillId = entry.target.dataset.skillId; // Using dataset for cleaner access
            setVisibleSkills((prev) => ({ ...prev, [skillId]: true }));
          }
        });
      },
      { threshold: 0.5 },
    );

    // Use a slight delay to ensure the elements are rendered before observing
    const timer = setTimeout(() => {
      const skillElements = document.querySelectorAll(".skill-progress-bar");
      skillElements.forEach((el) => observer.observe(el));
    }, 100);

    // Cleanup function to disconnect the observer and clear the timer
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [activeTab]);

  // const getSkillIcon = (skillName) => {
  //   const icons = {
  //     HTML5: "🌐",
  //     CSS3: "🎨",
  //     JS: "⚡",
  //     "React.js": "⚛️",
  //     "Node.js": "🟢",
  //     "Express.js": "🚂",
  //     MongoDB: "🍃",
  //     Oracle: "🔵",
  //     MySql: "🐬",
  //     "Git & Github": "📦",
  //     "Visual Studio Code": "💻",
  //     Bootstrap: "🅱️",
  //     Eclipse: "🌑",
  //     ShadCN: "✨",
  //     "Font Awesome": "🅰️",
  //     Postman: "📬",
  //     CPP: "💻",
  //     "Core Java": "☕",
  //     Python: "🐍",
  //     "Next.js": "➡️",
  //   };
  //   return icons[skillName] || "🛠️";
  // };

  const parseIcon = (icon) => {
  try {
    return icon.startsWith("{") ? JSON.parse(icon).url : icon;
  } catch {
    return icon;
  }
};

  // const getSkillPrintStatement = (skillName) => {
  //   const printStatements = {
  //     'HTML5': '<h1>HTML5</h1>',
  //     'CSS3': '.css { content: "CSS3"; }',
  //     'JS': 'console.log("JavaScript");',
  //     'React.js': 'console.log(<React.js />);',
  //     'Node.js': 'console.log("Node.js");',
  //     'Express.js': 'app.get("/", () => "Express.js");',
  //     'MongoDB': 'db.collection.find({name: "MongoDB"})',
  //     'Oracle': 'SELECT * FROM Oracle;',
  //     'MySql': 'SELECT "MySQL" FROM database;',
  //     'Git & Github': 'git commit -m "Git & Github"',
  //     'Visual Studio Code': '// VS Code: Coding...',
  //     'Bootstrap': '<div class="bootstrap">Bootstrap</div>',
  //     'Eclipse': '// Eclipse IDE',
  //     'ShadCN': '<ShadCN>UI Component</ShadCN>',
  //     'Font Awesome': '<i class="fa">Font Awesome</i>',
  //     'Postman': 'GET /api/postman',
  //     'CPP': 'cout << "C++" << endl;',
  //     'Core Java': ' ',
  //     'Python': 'print("Python")',
  //     'Next.js': 'export default Next.js',
  //   };
  //   return printStatements[skillName] || `print("${skillName}")`;
  // };

  if(loading) {
    return <div className="skills-loading text-white text-center text-lg">Loading skills...</div>;
  }
  if (skillsData.length === 0) {
    return <div className="skills-loading text-white text-center text-lg">No skills data available.</div>;
  }
  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Technical Proficiency</h2>
        <div className="title-underline"></div>
      </div>
      <div className="skills-grid">
        {skillsData.map((category, categoryIndex) => (
        <div
          key={category.id} // Use database ID instead of title
          className={`skill-category skill-category-${categoryIndex}`}
        >
          <div className="category-header">
            <div className="category-icon">
              {/* category.icon_url comes from your database */}
              <img src={parseIcon(category.icon_url)} alt={category.title} />
            </div>
            <h3 className="category-title">{category.title}</h3>
          </div>

          <div className="skills-list">
            {category.skill_items?.map((skill, skillIndex) => {
              const skillId = `${categoryIndex}-${skillIndex}`;
              return (
                <div key={skill.id} className="skill-item">
                  <div className="skill-header">
                    <div className="skill-info">
                      <span className="skill-icon-wrapper">
                        <span className="skill-icon">
                          {/* Use the emoji stored in the DB */}
                          {skill.emoji || "💡"}
                        </span>
                        <span className="skill-icon-tooltip">
                          <span className="tooltip-title">{skill.skill_name}</span>
                          <span className="tooltip-code">
                            {/* Use the statement from DB, or fallback to util */}
                            {skill.print_statement || getSkillPrintStatement(skill.skill_name)}
                          </span>
                        </span>
                      </span>
                      <span className="skill-name">{skill.skill_name}</span>
                    </div>
                    <span className="skill-percentage">{skill.percentage}</span>
                  </div>

                    <div className="skill-progress">
                      <div
                        className="skill-progress-bar"
                        data-skill-id={skillId}
                        style={{
                          width: visibleSkills[skillId]
                            ? `${Number.parseInt(skill.percentage)}%`
                            : "0%",
                          backgroundColor:
                            categoryIndex === 0
                              ? "#4ECDC4"
                              : categoryIndex === 1
                                ? "#45B7D1"
                                : categoryIndex === 2
                                  ? "#96CEB4"
                                  : "#FFEAA7",
                        }}
                      ></div>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
        {/* {SKILLS.map((category, categoryIndex) => (
          <div
            key={category.title}
            className={`skill-category skill-category-${categoryIndex}`}
          >
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
                        <span className="skill-icon-wrapper">
                          <span className="skill-icon">
                            {getSkillIcon(skill.skill)}
                          </span>
                          <span className="skill-icon-tooltip">
                            <span className="tooltip-title">{skill.skill}</span>
                             <span className="tooltip-code">
                              {getSkillPrintStatement(skill.skill)}
                            </span>
                          </span>
                        </span>
                        <span className="skill-name">{skill.skill}</span>
                      </div>
                      <span className="skill-percentage">
                        {skill.percentage}
                      </span>
                    </div>
                    <div className="skill-progress">
                      <div
                        className="skill-progress-bar"
                        data-skill-id={skillId}
                        style={{
                          width: visibleSkills[skillId]
                            ? skill.percentage
                            : "0%",
                          backgroundColor:
                            categoryIndex === 0
                              ? "#4ECDC4"
                              : categoryIndex === 1
                                ? "#45B7D1"
                                : categoryIndex === 2
                                  ? "#96CEB4"
                                  : "#FFEAA7",
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))} */}
      </div>
    </>
  );
};
