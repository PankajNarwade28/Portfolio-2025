import React from "react";
import { useState, useEffect } from "react";
import {  getSkillPrintStatement } from "../../../../util/data";
import axios from "axios";
import "./Skills.css";
import Loading from "../LoadingEmpty/Loading";
import Empty from "../LoadingEmpty/Empty";

// Skills component now accepts `activeTab` as a prop
export const Skills = ({ activeTab }) => {
  const [visibleSkills, setVisibleSkills] = useState({});
  const [skillsData, setSkillsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data Effect
  useEffect(() => {
    fetchSkills();
  }, []);
  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/skills");
      setSkillsData(res.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };
  // 2. Animation Effect (The Robust Part)
  useEffect(() => {
    // Only proceed if we are on the skills tab AND loading is finished
    if (activeTab !== "skills" || loading || !skillsData.length) {
      return;
    }

    // Reset state to ensure fresh animation
    setVisibleSkills({});

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillId = entry.target.dataset.skillId;
            setVisibleSkills((prev) => ({ ...prev, [skillId]: true }));
          }
        });
      },
      { threshold: 0.1 }, // Lower threshold is more reliable for small bars
    );

    // Use a slight delay to allow React to finish the paint cycle
    const timer = setTimeout(() => {
      const skillElements = document.querySelectorAll(
        ".skill-progress-bar-container",
      );
      skillElements.forEach((el) => observer.observe(el));
    }, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [activeTab, loading, skillsData]); // Re-run when loading finishes or data changes

  const parseIcon = (icon) => {
    try {
      return icon.startsWith("{") ? JSON.parse(icon).url : icon;
    } catch {
      return icon;
    }
  };

  if (loading) return <Loading message="Loading Skill Section..." />;
  if (skillsData.length === 0)
    return (
      <Empty
        title="No Skills Found"
        description="It seems the Skill section is currently empty."
        onRetry={fetchSkills}
      />
    );
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
              {category.skill_items
                ?.slice() // avoid mutating original array
                .sort((a, b) => a.order_index - b.order_index) // 👈 KEY FIX
                .map((skill, skillIndex) => {
                  const skillId = `${categoryIndex}-${skillIndex}`; // 👈 IMPORTANT (add back)
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
                              <span className="tooltip-title">
                                {skill.skill_name}
                              </span>
                              <span className="tooltip-code">
                                {/* Use the statement from DB, or fallback to util */}
                                {skill.print_statement ||
                                  getSkillPrintStatement(skill.skill_name)}
                              </span>
                            </span>
                          </span>
                          <span className="skill-name">{skill.skill_name}</span>
                        </div>
                        <span className="skill-percentage">
                          {skill.percentage}
                        </span>
                      </div>
                      {!loading && skillsData.length > 0 && (
                        <div className="skill-progress-wrapper bg-white/5 rounded-full h-2 w-full overflow-hidden relative">
                          {/* 1. The Container Observed by IntersectionObserver */}
                          <div
                            className="skill-progress-bar-container h-full w-full relative"
                            data-skill-id={skillId}
                          >
                            {/* 2. The Colored Progress Bar */}
                            <div
                              className="h-full transition-all duration-1000 ease-out relative z-10"
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
                                boxShadow: visibleSkills[skillId]
                                  ? "0 0 10px rgba(78, 205, 196, 0.2)"
                                  : "none",
                              }}
                            />

                            {/* 3. The Full-Width Glass Shimmer (Sibling to the bar) */}
                            {visibleSkills[skillId] && (
                              <div className="glass-shimmer-full absolute inset-0 w-full h-full z-20" />
                            )}
                          </div>
                        </div>
                      )}{" "}
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
