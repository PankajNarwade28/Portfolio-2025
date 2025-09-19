import React from 'react'
import { EDUCATION } from "../../../../util/data";
import "./Education.css";
export const Education = () => {
  return (
    <>
         <div className="section-header">
              <h2 className="section-title">Educational Journey</h2>
              <div className="title-underline"></div>
            </div>
            <div className="education-timeline">
              {EDUCATION.map((edu, index) => (
                <div key={edu.id} className={`timeline-item ${edu.status}`}>
                  <div className="timeline-connector">
                    <div className="timeline-dot"></div>
                    {index < EDUCATION.length - 1 && <div className="timeline-line"></div>}
                  </div>
                  <div className="education-card">
                    <div className="card-header">
                      <div className="duration-badge">{edu.duration}</div>
                      {edu.status === 'current' && (
                        <div className="current-badge">
                          <div className="pulse-dot"></div>
                          <span>Current</span>
                        </div>
                      )}
                    </div>
                    <div className="card-content">
                      <h3 className="degree-title">{edu.degree}</h3>
                      <p className="institution">
                        {edu.institution}
                        <span className="location">📍 {edu.location}</span>
                      </p>
                      <p className="description">{edu.description}</p>
                    </div>
                    <div className="card-footer">
                      <div className="grade-display">
                        <span className="grade-label">Grade:</span>
                        <span className="grade-value">{edu.grade}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
    </>
  )
}
