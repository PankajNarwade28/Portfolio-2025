import { useEffect, useState } from "react";
import axios from "axios";
import "./Aboutme.css";
import Loading from "../LoadingEmpty/Loading";
import Empty from "../LoadingEmpty/Empty";
const API_BASE = process.env.REACT_APP_API_URL;
console.log("API Base URL:", API_BASE);

const AboutMe = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
const fetchProfile = async () => {
  try {
    setLoading(true);

    const res = await axios.get(`${API_BASE}/api/about-me`);

    setProfile(res.data);
    console.log("Profile data loaded:", res.data);
  } catch (err) {
    console.error("Connection Interrupted:", err);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <Loading message="Loading About Me..." />;
  if (!profile)
    return (
      <Empty
        title="No Profile Found"
        description="It seems the profile information is currently unavailable." 
        onRetry={fetchProfile}
      />
    );

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