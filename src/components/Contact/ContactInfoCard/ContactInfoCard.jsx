import React from "react";
import "./ContactInfoCard.css";
export const ContactInfoCard = ({ iconUrl, text, link }) => {
  return (
    <>
      <a href={link} className="anchor" target="_blank">
        <div className="contactinfo">
          <div className="icon">
            <img src={iconUrl} alt="" />
          </div>
          <p>{text}</p>
        </div>
      </a>
    </>
  );
};
