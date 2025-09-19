import React from 'react'
import "./Achievement.css"
import { ACHIEVEMENTS } from "../../../../util/data";
export const Achievement = () => {
  return (
    <>
        <div className="section-header">
              <h2 className="section-title">Key Achievements</h2>
              <div className="title-underline"></div>
            </div>
            <div className="achievements-grid">
              {ACHIEVEMENTS.map((achievement, index) => (
                <div key={achievement.id} className="achievement-card" style={{'--delay': `${index * 0.1}s`}}>
                  <div className="achievement-header">
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-year">{achievement.year}</div>
                  </div>
                  <div className="achievement-content">
                    <h3 className="achievement-title">{achievement.title}</h3>
                    <p className="achievement-description">{achievement.description}</p>
                  </div>
                  <div className="achievement-footer">
                    <span className="achievement-category">{achievement.category}</span>
                  </div>
                  <div className="achievement-glow"></div>
                </div>
              ))}
            </div>
            <div className="achievements-summary">
              <div className="summary-card">
                <h4>Journey Highlights</h4>
                <p>These achievements represent my dedication to continuous learning and excellence in technology. Each milestone has shaped my growth as a developer and problem solver.</p>
                <div className="summary-stats">
                  <div className="summary-stat">
                    <span className="stat-number">{ACHIEVEMENTS.length}</span>
                    <span className="stat-label">Major Achievements</span>
                  </div>
                  <div className="summary-stat">
                    <span className="stat-number">4</span>
                    <span className="stat-label">Categories</span>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}
