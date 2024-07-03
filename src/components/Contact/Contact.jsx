import React from "react";
import "./Contact.css";
import { ContactInfoCard } from "./ContactInfoCard/ContactInfoCard";
import { Contactform } from "./Contactform/Contactform";

export const Contact = () => {
  return (
    <>
      <h1 className="heading" id="Contact">
        Contact Me
      </h1>
      <div className="contact-container">
        <div className="icon-content" data-aos="fade-right">
          <ContactInfoCard
            iconUrl="./assets/images/email.png"
            text="pankajnarwade258@gmail.com"
            link="mailto:pankajnarwade258@gmail.com"
          />{" "}
          <ContactInfoCard
            iconUrl="./assets/images/github.png"
            text=" PankajNarwade28"
            link="https://github.com/PankajNarwade28/"
          />
          <ContactInfoCard
            iconUrl="./assets/images/linkedin.png"
            text=" pankaj-narwade-13a053260"
            link="https://www.linkedin.com/in/pankaj-narwade-13a053260"
          />
        </div>
        <div className="contact-flex1" data-aos="fade-left">
          <Contactform />
        </div>
      </div>
    </>
  );
};
