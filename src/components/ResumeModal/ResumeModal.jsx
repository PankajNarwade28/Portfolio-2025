import React from "react";
import "./ResumeModal.css";

export const ResumeModal = ({ isOpen, onClose, pdfUrl }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Pankaj_Narwade_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const iframe = document.querySelector('.resume-pdf-iframe');
    if (iframe) {
      iframe.contentWindow.print();
    }
  };

  // Use Google Docs Viewer for better mobile compatibility
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + pdfUrl)}&embedded=true`;

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="resume-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="resume-modal-header">
          <h3>Resume / CV</h3>
          <div className="resume-modal-actions">
            <button className="resume-modal-btn resume-print-btn" onClick={handlePrint} title="Print">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Print
            </button>
            <button className="resume-modal-btn resume-download-btn" onClick={handleDownload} title="Download">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download
            </button>
            <button className="resume-modal-btn resume-close-btn" onClick={onClose} title="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        <div className="resume-modal-body">
          <iframe
            src={viewerUrl}
            title="Resume PDF"
            className="resume-pdf-iframe"
          />
        </div>
      </div>
    </div>
  );
};
