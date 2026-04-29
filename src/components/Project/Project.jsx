import React, { useEffect, useState } from "react";
import "./Project.css"; 
import axios from "axios";
import ProjectCard from "./ProjectCard/ProjectCard.jsx"; 

const API_URL = process.env.REACT_APP_API_URL;
 
export const Project = () => {
  const [filter, setFilter] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects exactly ONCE when the main component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/projects`);
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;

    const tech = project.tech?.toLowerCase() || "";
    const category = project.category?.toLowerCase() || "";

    return tech.includes(filter) || category.includes(filter);
  });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setVisibleProjects(6); // Reset visible projects count when filter changes
  };

  const loadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleProjects((prev) => prev + 3);
      setIsLoadingMore(false);
    }, 100);
  };

  const filterOptions = [
    { value: "all", label: "All Projects", icon: "🔥" },
    { value: "react", label: "React", icon: "⚛️" },
    { value: "full stack", label: "Full Stack", icon: "🚀" },
    { value: "frontend", label: "Frontend", icon: "🎨" },
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
                className={`filter-btn ${
                  filter === option.value ? "active" : ""
                }`}
                onClick={() => handleFilterChange(option.value)}
              >
                <span className="filter-icon">{option.icon}</span>
                <span className="filter-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", color: "white", padding: "2rem" }}>
            <h2>Loading projects...</h2>
          </div>
        ) : (
          <>
            <div className="results-info">
              <div className="results-text">
                Showing{" "}
                <span className="highlight">
                  {Math.min(visibleProjects, filteredProjects.length)}
                </span>{" "}
                of <span className="highlight">{filteredProjects.length}</span>{" "}
                projects
              </div>
            </div>

            <div className="projects-grid">
              {filteredProjects.slice(0, visibleProjects).map((project, index) => (
                <div
                  key={`${project._id || project.id || index}`}
                  className="project-item"
                  style={{ "--delay": `${index * 0.1}s` }}
                >
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMoreProjects && (
              <div className="load-more-container">
                <button
                  className={`load-more-btn ${isLoadingMore ? "loading" : ""}`}
                  onClick={loadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <span>Load More Projects</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 5V19M5 12L12 19L19 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>
                <div className="load-more-info">
                  Showing {Math.min(visibleProjects, filteredProjects.length)} of{" "}
                  {filteredProjects.length} projects
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
          </>
        )}
      </div>
    </div>
  );
};

export default Project;