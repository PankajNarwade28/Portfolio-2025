import React, { useState } from "react";
import "./Skills.css";
import { SKILLS } from "../../util/data";
import { Skillcard } from "./Skillcard/Skillcard";
import { Skillinfocard } from "./Skillinfocard/Skillinfocard";

export const Skills = () => {
  const [selectedSkill, setselectedSkill] = useState(SKILLS[0]);
  const handleSelectSkill = (data) => {
    setselectedSkill(data);
  };
  return (
    <>
      <h1 className="heading" id="Skills" data-aos="fade-up">
        Skills
      </h1>
      <section className="skills-container" data-aos="fade-right">
        <h5>Technical Proficiency</h5>
        <div className="skills-content">
          <div className="skills">
            {SKILLS.map((item) => {
              return (
                <Skillcard
                  title={item.title}
                  iconUrl={item.icon}
                  isActive={selectedSkill.title === item.title}
                  key={item.title}
                  onClick={() => {
                    handleSelectSkill(item);
                  }}
                />
              );
            })}
          </div>
          <div className="skills-info" data-aos="fade-left">
            <Skillinfocard
              heading={selectedSkill.title}
              skills={selectedSkill.skills}
            />
          </div>
        </div>
      </section>
    </>
  );
};
