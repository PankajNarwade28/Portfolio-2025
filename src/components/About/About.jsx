import React from "react";
import "./About.css";
export const About = () => {
  return (
    <>
      <div className="hero-container" id="About">
        <div className="hero-img" data-aos="fade">
          <div className="hero-section1">
            <div className="image">
              <img
                src="./assets/images/image-05.png"
                alt=""
                className="image"
              />
            </div>
          </div>
        </div>
        <div className="hero-content about-section" data-aos="fade">
          <h1 className="heading" data-aos="fade-up">
            About Me
          </h1>
          <p className="para">
            Hello! I'm <strong className="blue">Pankaj Digambar Narwade</strong>
            , Pursuing Post Graduation in{" "}
            <b>Master of Computer Applications </b> from P.E.S's Modern College
            of Engineering Shivajinagar Pune 5 and Have graduated in
            <b> Bachelor of Computer Applications (BCA) </b> from G.S.G.College
            Umarkhed. With a strong foundation in Programming and web
            development, and a keen interest in building dynamic and responsive
            web applications, I am excited to begin my professional journey in
            the tech industry.
          </p>
          <div>
            <table>
              <tr>
                <th>Education </th>
                <th>School</th>
                <th>Marks</th>
                <th>Year</th>
              </tr>
              <tr>
                <td>MCA</td>
                <td>Modern College Pune</td>
                <td>CGPA : 8.68 [FYMCA] </td>
                <td>2024-26</td>
              </tr>
              <tr>
                <td>BCA</td>
                <td>Gsg College </td>
                <td>72.60%</td>
                <td>2021-24</td>
              </tr>
              <tr>
                <td>HSC</td>
                <td>Gsg jr College </td>
                <td>93.67%</td>
                <td>2020-21</td>
              </tr>
              <tr>
                <td>SSC</td>
                <td>MJPV </td>
                <td>84.20%</td>
                <td>2018-19</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
