import React from "react";
import "./ProjectFile.css";
export const ProjectFile = ({ title, tech, image, link }) => {
  return (
    <>
      <div className="ProjectFile-content" data-aos="flip-up">
        <div className="project-image">
          <img src={image} alt="" />
        </div>
        <div className="project-info">
          <div>
            <h4>{title}</h4>
            <p>{tech}</p>
          </div>
          <div className="livedemo">
            <a href={link} target="_blank" rel="noreferrer">
              Demo
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
