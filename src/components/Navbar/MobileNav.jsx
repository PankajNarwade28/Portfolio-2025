import React from "react";
import "./MobileNav.css";
export const MobileNav = ({ isOpen, toggleMenu }) => {
  return (
    <>
      <div
        className={`mobile-menu ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <div className="mobile-menu-container" data-aos="fade-down">
          <img src="./assets/images/logo3.png" alt="" className="nav-logo" />
          <hr className="hr" />
          <ul>
            <li>
              <a href="#Home" className="menu-item">
                Home
              </a>
            </li>
            <li>
              <a href="#About" className="menu-item">
                About
              </a>
            </li>
            <li>
              <a href="#Skills" className="menu-item">
                Skills
              </a>
            </li>
            <li>
              <a href="#Project" className="menu-item">
                Projects
              </a>
            </li>
            <li>
              <a href="#Contact" className="menu-item">
                Contact
              </a>
            </li>
            <button className="nav-btn">
              {" "}
              <a
                target="_blank"
                href="https://drive.google.com/file/d/1hHBZyi7EDDNChn9IywUOeVfoOcatq2z8/view?usp=sharing" 
                rel="noreferrer"
              >
                Resume
              </a>
            </button>
          </ul>
        </div>
      </div>
    </>
  );
};
