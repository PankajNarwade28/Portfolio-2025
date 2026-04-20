// import "./Aboutme.css";

// const AboutMe = () => {
//   return (
//      <>
//             <div className="section-header">
//               <h2 className="section-title">About Me</h2>
//               <div className="title-underline"></div>
//             </div>
//             <div className="about-content-grid">
//               <div className="about-text-content">
//                 <div className="intro-card">
//                   <div className="greeting">
//                     <span className="wave">👋</span>
//                     <h3>Hello! I'm <span className="name-highlight">Pankaj Digambar Narwade</span></h3>
//                   </div>
//                   <p className="bio-text">
//                     Currently pursuing <span className="highlight">Master of Computer Applications</span> from 
//                     P.E.S's Modern College of Engineering, Pune. I'm a passionate full-stack developer 
//                     with a strong foundation in modern web technologies and a keen interest in creating 
//                     innovative digital solutions.
//                   </p>
//                   <div className="journey-stats">
//                     <div className="stat-item">
//                       <div className="stat-number">3+</div>
//                       <div className="stat-label">Years Learning</div>
//                     </div>
//                     <div className="stat-item">
//                       <div className="stat-number">15+</div>
//                       <div className="stat-label">Projects Built</div>
//                     </div>
//                     <div className="stat-item">
//                       <div className="stat-number">8.68</div>
//                       <div className="stat-label">Current CGPA</div>
//                     </div>
//                   </div>
//                   <div className="interests-section">
//                     <h4>What Drives Me</h4>
//                     <div className="interest-tags">
//                       <span className="interest-tag">Problem Solving</span>
//                       <span className="interest-tag">Clean Code</span> 
//                       <span className="interest-tag">Responsive Designs</span>
//                       <span className="interest-tag">Team Collaboration</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="about-image-section">
//                 <div className="profile-card">
//                   <div className="profile-image-wrapper">
//                     <img 
//                       src="./assets/images/image-05.png" 
//                       alt="Pankaj Digambar Narwade" 
//                       className="profile-image"
//                     />
//                     <div className="image-border"></div>
//                   </div>
//                   <div className="card-footer">
//                     <h4>Pankaj Digambar Narwade</h4>
//                     <p>Full Stack Developer Intern</p>
//                     <div className="quick-connect">
//                       <button className="connect-btn">Let's Connect</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//   )
// }

// export default AboutMe

import { useEffect, useState } from "react";
import axios from "axios";
import "./Aboutme.css";

const AboutMe = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/about-me")
      .then(res => setProfile(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!profile) return <div className="loading">Loading...</div>;

  return (
    <>
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <div className="title-underline"></div>
      </div>
      <div className="about-content-grid">
        <div className="about-text-content">
          <div className="intro-card">
            <div className="greeting">
              <span className="wave">👋</span>
              <h3>Hello! I'm <span className="name-highlight">{profile.full_name}</span></h3>
            </div>
            <p className="bio-text">{profile.passionate_summary}</p>
            
            <div className="journey-stats">
              <div className="stat-item">
                <div className="stat-number">{profile.years_learning}+</div>
                <div className="stat-label">Years Learning</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{profile.projects_built}+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{profile.current_cgpa}</div>
                <div className="stat-label">Current CGPA</div>
              </div>
            </div>

            <div className="interests-section">
              <h4>What Drives Me</h4>
              <div className="interest-tags">
                {profile.drivers.map((tag, i) => (
                  <span key={i} className="interest-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="about-image-section">
          <div className="profile-card">
            <div className="profile-image-wrapper">
              <img 
                src={profile.profile_pic_url} 
                alt={profile.full_name} 
                className="profile-image"
              />
              <div className="image-border"></div>
            </div>
            <div className="card-footer">
              <h4>{profile.full_name}</h4>
              <p>{profile.current_role}</p>
              <div className="quick-connect">
                <button className="connect-btn">Let's Connect</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;