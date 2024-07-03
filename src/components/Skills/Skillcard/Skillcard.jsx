import React from "react";
import "./Skillcard.css";

export const Skillcard = ({ title, iconUrl, isActive, onClick }) => {
  return (
    <>
      <div
        className={`skill-card ${isActive ? "active" : ""}`}
        onClick={() => {
          onClick();
        }}
      >
        <div className="skills-icon">
          <img src={iconUrl} alt={title} />
        </div>
        <span>{title}</span>
      </div>
    </>
  );
};
