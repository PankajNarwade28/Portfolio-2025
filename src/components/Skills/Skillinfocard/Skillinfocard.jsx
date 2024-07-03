import React from "react";
import "./Skillinfocard.css";
export const Skillinfocard = ({ heading, skills }) => {
  return (
    <div className="skills-info-card">
      <h6>{heading}</h6>
      <div className="skills-info-content">
        {skills.map((item, index) => {
          return (
            <React.Fragment key={`Skill_${index}`}>
              <div className="skills-info">
                <p>{item.skill}</p>
                <p className="percentage"> {item.percentage}</p>
              </div>
              <div
                className="skills-progress-bg"
                style={{ width: item.percentage }}
              ></div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
