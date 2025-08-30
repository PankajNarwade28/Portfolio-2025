import React from "react";
import { Typewriter } from "react-simple-typewriter";
import "./Hero.css";

export const Hero = () => {
  return (
    <>
      <div className="hero-container">
        <div className="hero-content" data-aos="fade-right">
          <h3>Full Stack web Developer @Media Urbana</h3>
          <h2>Building a future powered by technology! 🌈🚀 </h2>
          <p>
            Aspiring IT professional 👩‍💻✨ <br />
            Passionate about coding and creativity! 💻
          </p>

          <p className="p-typewriter">
            I'm a{" "}
            <span className="typewriter">
              <Typewriter
                words={[
                  "Frontend Developer ",
                  "Backend Developer",
                  "Full Stack Developer",
                ]}
                loop={100}
                cursor
                cursorStyle="/"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </p>
        </div>
        <div className="hero-img" data-aos="fade-left">
          <div className="hero-section1">
            <div className="tech-icons">
              <div className="tech-icon">
                <img src="./assets/images/mongo.png" alt="" />
              </div>
              <div className="tech-icon">
                <img src="./assets/images/express.png" alt="" />
              </div>
              <div className="tech-icon">
                <img src="./assets/images/react.png" alt="" />
              </div>
              <div className="tech-icon">
                <img src="./assets/images/node.png" alt="" />
              </div>
            </div>
            <div className="image">
              <img
                src="./assets/images/image-04.png"
                alt=""
                className="image"
              />
            </div>
          </div>
          <div className="hero-section2">
            <div className="tech-icons">
              <img src="./assets/images/html.png" alt="" />
            </div>
            <div className="tech-icons">
              <img src="./assets/images/css.png" alt="" />
            </div>
            <div className="tech-icons">
              <img src="./assets/images/js.png" alt="" />
            </div>
            <div className="tech-icons">
              <img src="./assets/images/sql.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
