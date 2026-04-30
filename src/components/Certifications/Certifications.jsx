import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Certifications.css";
import { PDFViewerModal } from "../PDFViewerModal/PDFViewerModal";
import CertificationCard from "./CertificationCard/CertificationCard.jsx";

const API_BASE = process.env.REACT_APP_API_URL;

export const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [visibleCertifications, setVisibleCertifications] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Fetch from backend on component mount
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/certificates`);
        setCertifications(res.data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const handleViewCertificate = (certification) => {
    setSelectedCertificate(certification);
  };

  const handleCloseCertificate = () => {
    setSelectedCertificate(null);
  };

  // Filter certifications based on selected type
  const filteredCertifications = certifications.filter(cert => {
    if (filter === "all") return true;
    return cert.type?.toLowerCase() === filter.toLowerCase();
  });

  const loadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCertifications(prev => prev + 3);
      setIsLoadingMore(false);
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

        {/* LOADING STATE */}
        {isInitialLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="loading-spinner w-10 h-10 border-4 border-t-[#4ECDC4] border-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="results-info">
              <div className="results-text">
                Showing <span className="highlight">{Math.min(visibleCertifications, filteredCertifications.length)}</span> of{" "}
                <span className="highlight">{filteredCertifications.length}</span> certifications
              </div>
            </div>

            <div className="certifications-grid">
              {filteredCertifications.slice(0, visibleCertifications).map((certification, index) => (
                <div
                  key={certification.id}
                  className="certification-item"
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  <CertificationCard 
                    certification={certification} 
                    onViewCertificate={handleViewCertificate}
                  />
                </div>
              ))}
            </div>

            {/* EMPTY STATE (If no certs match filter) */}
            {filteredCertifications.length === 0 && (
              <div className="text-center text-gray-400 py-10">
                No certifications found for this category.
              </div>
            )}

            {hasMoreCertifications && (
              <div className="load-more-container">
                <button 
                  className={`load-more-btn ${isLoadingMore ? 'loading' : ''}`}
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

            {!hasMoreCertifications && filteredCertifications.length > 6 && (
              <div className="no-more-certifications">
                <div className="no-more-icon">🎉</div>
                <p>You've seen all {filteredCertifications.length} certifications!</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* PDF MODAL */}
      {selectedCertificate && (
        <PDFViewerModal 
          isOpen={!!selectedCertificate}
          onClose={handleCloseCertificate}
          pdfUrl={selectedCertificate.pdf_link} // Changed to match backend DB schema
          title={selectedCertificate.title}
          downloadFileName={`${selectedCertificate.title.replace(/\s+/g, '_')}_Certificate.pdf`}
          showPrint={false}
          showDownload={false}
        />
      )}
    </div>
  );
};

export default Certifications;