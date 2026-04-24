import React from "react";
import "./Achievement.css";
import axios from "axios";
import Empty from "../LoadingEmpty/Empty";
import Loading from "../LoadingEmpty/Loading";
const API_BASE = process.env.REACT_APP_API_URL;
export const Achievement = () => {
  const [achievements, setAchievements] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/achievements`);
      setAchievements(response.data);
      console.log("Fetched achievements:", response.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAchievements();
  }, []);

  if (loading) {
    return <Loading message="Loading Achievements" />;
  }

  if (!achievements.length) {
    return (
      <Empty
        title="No achievements found."
        description="Check Backend on Hosting Platform or Database."
        onRetry={fetchAchievements}
      />
    );
  }

  return (
    <>
      <div className="section-header">
        <h2 className="section-title">Key Achievements</h2>
        <div className="title-underline"></div>
      </div>
      <div className="achievements-grid">
        {achievements.map((achievement, index) => (
          <div
            key={achievement.id}
            className="achievement-card"
            style={{ "--delay": `${index * 0.1}s` }}
          >
            <div className="achievement-header">
              <div className="achievement-icon">{achievement.emoji}</div>
              <div className="achievement-year">
                {achievement.year || "Current"}
              </div>
            </div>
            <div className="achievement-content">
              <h3 className="achievement-title">{achievement.title}</h3>
              <p className="achievement-description">
                {achievement.description}
              </p>
            </div>
            <div className="achievement-footer">
              <span className="achievement-category">
                {achievement.category}
              </span>
            </div>
            <div className="achievement-glow"></div>
          </div>
        ))}
      </div>
      <div className="achievements-summary">
        <div className="summary-card">
          <h4>Journey Highlights</h4>
          {/* <p>These achievements represent my dedication to continuous learning and excellence in technology. Each milestone has shaped my growth as a developer and problem solver.</p> */}
          {achievements.length > 0 && <p>{achievements[0].common_highlight}</p>}
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="stat-number">{achievements.length}</span>
              <span className="stat-label">Major Achievements</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number">
                {Number.parseInt(
                  [...new Set(achievements.map((a) => a.category))].length,
                )}{" "}
              </span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
