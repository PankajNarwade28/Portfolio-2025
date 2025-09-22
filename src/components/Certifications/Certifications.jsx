import React, { useState, useEffect } from "react";
import "./Certifications.css";
import { CERTIFICATIONS } from "../../util/certification";


const CertificationCard = ({ certification }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getTypeColor = (type) => {
    switch(type) {
      case 'Professional': return '#4ECDC4';
      case 'Certification': return '#FFE66D'; 
      default: return '#4ECDC4';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Professional': return '🏆';
      case 'Certification': return '📜'; 
      default: return '📜';
    }
  };

  return (
    <div 
      className={`certification-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-inner">
        {/* Card Header with Image */}
        <div className="cert-image-container">
          <img 
            src={certification.image} 
            alt={certification.title}
            className={`cert-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMkEyQTJBIi8+CjxwYXRoIGQ9Ik0xNDAgODBIMTYwVjEyMEgxNDBWODBaIiBmaWxsPSIjNEVDREM0Ii8+CjxwYXRoIGQ9Ik0xMjAgMTAwSDEwMFYxNDBIMTIwVjEwMFoiIGZpbGw9IiM0RUNEQ0QiLz4KPHRleHQgeD0iMTUwIiB5PSIxNzAiIGZpbGw9IiNDQ0MiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2VydGlmaWNhdGU8L3RleHQ+Cjwvc3ZnPg==';
            }}
          />
          {!imageLoaded && <div className="image-placeholder">📜</div>}
          
          {/* Hover Overlay with View Certificate Button */}
          <div className={`image-overlay ${isHovered ? 'visible' : ''}`}>
            <a 
              href={certification.verifyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="view-cert-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
              View Certificate
            </a>
          </div>
          
          {/* Status Badge */}
          <div className="status-badge">
            <span className="status-icon">✅</span>
            <span className="status-text">{certification.status}</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="cert-content">
          {/* Type Badge */}
          <div className="cert-type-badge" style={{ backgroundColor: getTypeColor(certification.type) }}>
            <span className="type-icon">{getTypeIcon(certification.type)}</span>
            <span className="type-text">{certification.type}</span>
          </div>

          {/* Title and Issuer */}
          <div className="cert-header">
            <h3 className="cert-title">{certification.title}</h3>
            <div className="cert-meta">
              <span className="cert-issuer">by {certification.issuer}</span>
              <span className="cert-divider">•</span>
              <span className="cert-date">{certification.date}</span>
            </div>
          </div>

          {/* Credential ID */}
          <div className="credential-info">
            <span className="credential-label">Credential ID:</span>
            <span className="credential-id">{certification.credentialId}</span>
          </div>

          {/* Skills */}
          <div className="cert-skills">
            <div className="skills-list-inline">
              {certification.skills.map((skill, index) => (
                <span key={index} className="skill-tag-small">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export const Certifications = () => {
  const [filter, setFilter] = useState("all");
  const [visibleCertifications, setVisibleCertifications] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  // Filter certifications
  const filteredCertifications = CERTIFICATIONS.filter(cert => {
    if (filter === "all") return true;
    return cert.type.toLowerCase() === filter.toLowerCase();
  });

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCertifications(prev => prev + 3);
      setIsLoading(false);
    }, 500);
  };

  const filterOptions = [
    { value: "all", label: "All Certifications", icon: "📚" },
    { value: "professional", label: "Professional", icon: "🏆" },
    { value: "certification", label: "Certification", icon: "📜" }, 
  ];

  const hasMoreCertifications = visibleCertifications < filteredCertifications.length;

  return (
    <div className="certifications-section" id="Certification">
      <div className="certifications-background">
        <div className="floating-particles">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={`particle particle-${i}`}></div>
          ))}
        </div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="certifications-container">
        {/* Header */}
        <div className="certifications-header">
          <div className="header-content">
            <h1 className="section-title">
              My <span className="gradient-text">Certifications</span>
            </h1>
            <p className="section-subtitle">
              Professional certifications and achievements that validate my expertise
            </p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="certifications-controls">
          <div className="cert-filter-container">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                className={`cert-filter-btn ${filter === option.value ? "active" : ""}`}
                onClick={() => {
                  setFilter(option.value);
                  setVisibleCertifications(6);
                }}
              >
                <span className="cert-filter-icon">{option.icon}</span>
                <span className="cert-filter-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="results-info">
          <div className="results-text">
            Showing <span className="highlight">{Math.min(visibleCertifications, filteredCertifications.length)}</span> of{" "}
            <span className="highlight">{filteredCertifications.length}</span> certifications
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="certifications-grid">
          {filteredCertifications.slice(0, visibleCertifications).map((certification, index) => (
            <div
              key={certification.id}
              className="certification-item"
              style={{ '--delay': `${index * 0.1}s` }}
            >
              <CertificationCard certification={certification} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMoreCertifications && (
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
                  <span>Load More Certifications</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5V19M5 12L12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
            <div className="load-more-info">
              Showing {Math.min(visibleCertifications, filteredCertifications.length)} of {filteredCertifications.length} certifications
            </div>
          </div>
        )}

        {/* No more certifications message */}
        {!hasMoreCertifications && filteredCertifications.length > 6 && (
          <div className="no-more-certifications">
            <div className="no-more-icon">🎉</div>
            <p>You've seen all {filteredCertifications.length} certifications!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Certifications;