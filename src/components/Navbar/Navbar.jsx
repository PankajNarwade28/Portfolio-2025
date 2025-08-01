import React, { useState } from "react";
import "./Navbar.css";
import { MobileNav } from "./MobileNav";
export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <>
      <MobileNav isOpen={openMenu} toggleMenu={toggleMenu} />
      <nav className="nav-container" id="Home" data-aos="fade-down">
        <div className="nav-content">
          <img src="./assets/images/logo3.png" alt="" className="nav-logo" />
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
              <a
                href="https://drive.google.com/file/d/1hHBZyi7EDDNChn9IywUOeVfoOcatq2z8/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </a>
            </button>
          </ul>
          <button className="menu-btn" onClick={toggleMenu}>
            <span className="material-symbol-outlined fs18">
              {openMenu ? (
                <img
                  src="./assets/images/close.png"
                  alt=""
                  className="mobile-menu-logo"
                />
              ) : (
                <img
                  src="./assets/images/menu.png"
                  alt=""
                  className="mobile-menu-logo"
                />
              )}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
