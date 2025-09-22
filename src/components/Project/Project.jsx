import React, { useState, useEffect, useRef } from "react";
import "./Project.css";
import { PROJECTS } from "../../util/project.js";
import { FaGithub, FaLink } from 'react-icons/fa';

const ProjectCard = ({ title, tech, image, github, liveDemo, description, category, status }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const techArray = tech.split(', ').slice(0, 4);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#4ECDC4';
      case 'in-progress': return '#FFE66D';
      case 'planning': return '#FF6B6B';
      default: return '#4ECDC4';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'planning': return '📋';
      default: return '✅';
    }
  };

  return (
    <div 
      className={`project-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-inner">
        <div className="project-image-container">
          <img 
            src={image} 
            alt={title}
            className={`project-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMkEyQTJBIi8+CjxwYXRoIGQ9Ik0xNDAgODBIMTYwVjEyMEgxNDBWODBaIiBmaWxsPSIjNEVDREM0Ii8+CjxwYXRoIGQ9Ik0xMjAgMTAwSDEwMFYxNDBIMTIwVjEwMFoiIGZpbGw9IiM0RUMEQ0QiLz4KPHA+UHJvamVjdCBJbWFnZTwvcD4KPC9zdmc+';
            }}
          />
          {!imageLoaded && <div className="image-placeholder">Loading...</div>}
          <div className="image-overlay">
           {liveDemo ? (
              <a href={liveDemo} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
              <button className="view-project-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              View Project
            </button></a> 
            ) : (
              <span className="overlay-btn disabled">
                 
                <button className="view-project-btn" style={{ cursor: 'not-allowed' }} disabled>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <circle cx="12" cy="12" r="10"/>
  <path d="M4.93 4.93l14.14 14.14"/>
</svg>
              No Demo            </button>
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
  {github && (
    <a
      href={github}
      target="_blank"
      rel="noopener noreferrer"
      className="action-btn primary"
    >
      <FaGithub />
      Code
    </a>
  )}
  {liveDemo && (
    <a
      href={liveDemo}
      target="_blank"
      rel="noopener noreferrer"
      className="action-btn secondary"
    >
      <FaLink />
      Live Demo
    </a>
  )}
  {!github && !liveDemo && (
    <button className="action-btn disabled secondary" style={{ cursor: 'not-allowed' }} disabled>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
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

export const Project = () => {
  const [filter, setFilter] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const observerRef = useRef();

  // Filter and sort projects
  const filteredProjects = PROJECTS
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.tech.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (filter === "all") return matchesSearch;
      
      const projectTech = project.tech.toLowerCase();
      const projectCategory = project.category.toLowerCase();
      
      return matchesSearch && (
        projectTech.includes(filter.toLowerCase()) ||
        projectCategory.includes(filter.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === "newest") return 0;
      if (sortBy === "oldest") return 0;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return 0;
    });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setVisibleProjects(6);
  };

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleProjects(prev => prev + 3);
      setIsLoading(false);
    }, 500);
  };

  const filterOptions = [
    { value: "all", label: "All Projects", icon: "🔥" },
    { value: "react", label: "React", icon: "⚛️" },
    { value: "full stack", label: "Full Stack", icon: "🚀" },
    { value: "frontend", label: "Frontend", icon: "🎨" }
  ];

  // Check if there are more projects to load
  const hasMoreProjects = visibleProjects < filteredProjects.length;

  return (
    <div className="projects-section" id="Project">
      <div className="projects-background">
        <div className="floating-particles">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`particle particle-${i}`}></div>
          ))}
        </div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="projects-container">
        <div className="projects-header">
          <div className="header-content">
            <h1 className="section-title">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="section-subtitle">
              Explore my journey through code - from concept to creation
            </p>
          </div>
        </div>

        <div className="projects-controls">
          <div className="filter-container">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                className={`filter-btn ${filter === option.value ? "active" : ""}`}
                onClick={() => handleFilterChange(option.value)}
              >
                <span className="filter-icon">{option.icon}</span>
                <span className="filter-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="results-info">
          <div className="results-text">
            Showing <span className="highlight">{Math.min(visibleProjects, filteredProjects.length)}</span> of{" "}
            <span className="highlight">{filteredProjects.length}</span> projects
            {searchTerm && (
              <span className="search-info">
                {" "}for "<span className="search-term">{searchTerm}</span>"
              </span>
            )}
          </div>
        </div>

        <div className="projects-grid">
          {filteredProjects.slice(0, visibleProjects).map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              className="project-item"
              style={{ '--delay': `${index * 0.1}s` }}
            >
              <ProjectCard {...project} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreProjects && (
          <div className="load-more-container">
            <button 
              className={`load-more-btn ${isLoading ? 'loading' : ''}`}
              onClick={loadMore}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Load More Projects</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5V19M5 12L12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
            <div className="load-more-info">
              Showing {Math.min(visibleProjects, filteredProjects.length)} of {filteredProjects.length} projects
            </div>
          </div>
        )}

        {/* No more projects message */}
        {!hasMoreProjects && filteredProjects.length > 6 && (
          <div className="no-more-projects">
            <div className="no-more-icon">🎉</div>
            <p>You've seen all {filteredProjects.length} projects!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;