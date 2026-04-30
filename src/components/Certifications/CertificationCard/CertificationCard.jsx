import React, { useState } from "react"; 

const CertificationCard = ({ certification, onViewCertificate }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getTypeColor = (type) => {
    if (!type) return '#4ECDC4';
    const lowerType = type.toLowerCase();
    switch(lowerType) {
      case 'professional': return '#4ECDC4';
      case 'certification': return '#FFE66D'; 
      default: return '#4ECDC4';
    }
  };

  const getTypeIcon = (type) => {
    if (!type) return '📜';
    const lowerType = type.toLowerCase();
    switch(lowerType) {
      case 'professional': return '🏆';
      case 'certification': return '📜'; 
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
        <div className="cert-image-container">
          <img 
            src={certification.image} 
            alt={certification.title}
            className={`cert-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMkEyQTJBIi8+CjxwYXRoIGQ9Ik0xNDAgODBIMTYwVjEyMEgxNDBWODBaIiBmaWxsPSIjNEVDREM0Ii8+CjxwYXRoIGQ9Ik0xMjAgMTAwSDEwMFYxNDBIMTIwVjEwMFoiIGZpbGw9IiM0RUNEQ0QiLz4KPC9zdmc+';
            }}
          />
          {!imageLoaded && <div className="image-placeholder">Loading...</div>}
          
          {/* Only show View button if PDF link exists */}
          {certification.pdf_link && (
            <div className="image-overlay">
              <button
                onClick={() => onViewCertificate(certification)}
                className="view-cert-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                </svg>
                View Certificate
              </button>
            </div>
          )}

          <span 
            className="status-badge" 
            style={{ backgroundColor: getTypeColor(certification.type) }}
          >
            {getTypeIcon(certification.type)}
          </span>
        </div>

        <div className="cert-content">
          <div>
            <span 
              className="cert-type-badge" 
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <span className="type-icon">{getTypeIcon(certification.type)}</span>
              <span className="type-text">{certification.type ? certification.type.charAt(0).toUpperCase() + certification.type.slice(1) : ''}</span>
            </span>
          </div>

          <div className="cert-header">
            <h3 className="cert-title">{certification.title}</h3>
            <div className="cert-meta">
              <span className="cert-issuer">by {certification.issuer}</span>
              <span className="cert-divider">•</span>
              <span className="cert-date">{certification.date}</span>
            </div>
          </div>

          <div className="tech-stack">
            {certification.skills && certification.skills.map((skill, index) => (
              <span key={index} className="tech-tag">
                {skill}
              </span>
            ))}
          </div>

          {certification.credential_id && (
            <div className="credential-info mt-auto">
              <span className="credential-label">Credential ID:</span>
              <span className="credential-id">{certification.credential_id}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationCard;