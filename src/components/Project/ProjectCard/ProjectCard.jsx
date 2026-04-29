import React, { useState } from "react";
import { FaGithub, FaLink } from "react-icons/fa"; 

const ProjectCard = ({
  title,
  tech,
  description,
  category,
  status,
  thumbnail_url,  // Matches your backend exactly
  github_url,     // Matches your backend exactly
  live_demo_url   // Matches your backend exactly
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Safely handle the tech string
  const techArray = tech ? tech.split(", ").slice(0, 4) : [];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "#4ECDC4";
      case "in-progress":
        return "#FFE66D";
      case "planning":
        return "#FF6B6B";
      default:
        return "#4ECDC4";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "✅";
      case "in-progress":
        return "🔄";
      case "planning":
        return "📋";
      default:
        return "✅";
    }
  };

  return (
    <div
      className={`project-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-inner">
        <div className="project-image-container">
          <img
            src={thumbnail_url}
            alt={title}
            className={`project-image ${imageLoaded ? "loaded" : ""}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              setImageLoaded(true); 
              e.target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMkEyQTJBIi8+CjxwYXRoIGQ9Ik0xNDAgODBIMTYwVjEyMEgxNDBWODBaIiBmaWxsPSIjNEVDREM0Ii8+CjxwYXRoIGQ9Ik0xMjAgMTAwSDEwMFYxNDBIMTIwVjEwMFoiIGZpbGw9IiM0RUMEQ0QiLz4KPHA+UHJvamVjdCBJbWFnZTwvcD4KPC9zdmc+";
            }}
          />
          {!imageLoaded && <div className="image-placeholder">Loading...</div>}
          <div className="image-overlay">
            {live_demo_url ? (
              <a
                href={live_demo_url}
                style={{ textDecoration: "none" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="view-project-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{ cursor: "pointer" }}
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  View Project
                </button>
              </a>
            ) : (
              <span className="overlay-btn disabled">
                <button
                  className="view-project-btn"
                  style={{ cursor: "not-allowed" }}
                  disabled
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M4.93 4.93l14.14 14.14" />
                  </svg>
                  No Demo{" "}
                </button>
              </span>
            )}
          </div>
        </div>

        <div className="project-content">
          <div className="project-header">
            <div className="project-title-section">
              <h3 className="project-title">{title}</h3>
              <span className="project-category">{category}</span>
            </div>
            <div className="project-status">
              <span
                className="status-indicator"
                style={{ backgroundColor: getStatusColor(status) }}
              >
                {getStatusIcon(status)}
              </span>
            </div>
          </div>

          <p className="project-description">{description}</p>

          <div className="tech-stack">
            {techArray.map((technology, index) => (
              <span key={index} className="tech-tag">
                {technology.trim()}
              </span>
            ))}
          </div>

          <div className="project-actions">
            {github_url && (
              <a
                href={github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn primary"
              >
                <FaGithub />
                Code
              </a>
            )}
            
            {live_demo_url && (
              <a
                href={live_demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn secondary"
              >
                <FaLink />
                Live Demo
              </a>
            )}
            
            {!github_url && !live_demo_url && (
              <button
                className="action-btn disabled secondary"
                style={{ cursor: "not-allowed" }}
                disabled
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M4.93 4.93l14.14 14.14" />
                </svg>
                Not Available
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;