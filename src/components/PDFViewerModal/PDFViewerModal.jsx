import React, { useState, useEffect, useCallback } from "react";
import "./PDFViewerModal.css";

/**
 * PDFViewerModal - A reusable, future-proof PDF viewer component
 * 
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback when modal is closed
 * @param {string} pdfUrl - URL or path to the PDF file
 * @param {string} title - Title to display in modal header (optional)
 * @param {string} downloadFileName - Custom filename for downloads (optional)
 * @param {boolean} showPrint - Show/hide print button (default: true)
 * @param {boolean} showDownload - Show/hide download button (default: true)
 * @param {object} customStyles - Custom styles for the modal (optional)
 */
export const PDFViewerModal = ({ 
  isOpen, 
  onClose, 
  pdfUrl, 
  title = "PDF Viewer",
  downloadFileName = "document.pdf",
  showPrint = true,
  showDownload = true,
  customStyles = {}
}) => {
  const [viewerType, setViewerType] = useState('google'); // 'google', 'native', or 'fallback'
  const [isLoading, setIsLoading] = useState(true);

  const detectBestViewer = useCallback(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    
    // For local PDFs, use native viewer with mobile-friendly settings
    // Google Viewer only works with publicly accessible URLs
    if (pdfUrl.startsWith('http') && (isMobile || isIOS)) {
      setViewerType('google'); // Use Google Viewer for external mobile PDFs
    } else {
      setViewerType('native'); // Use native browser PDF viewer for all local files
    }
    
    setTimeout(() => setIsLoading(false), 500);
  }, [pdfUrl]);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Detect best viewer method
      detectBestViewer();
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      
      // Disable screenshot attempts
      const handleKeyDown = (e) => {
        // Prevent PrintScreen, Windows+Shift+S, Command+Shift+4, etc.
        if (
          e.key === 'PrintScreen' ||
          (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5')) ||
          (e.ctrlKey && e.shiftKey && e.key === 'S') ||
          (e.metaKey && e.shiftKey && e.key === 'S')
        ) {
          e.preventDefault();
          alert('Screenshots are disabled for certificate viewing');
          return false;
        }
      };

      const handleContextMenu = (e) => {
        e.preventDefault();
        return false;
      };

      // Add event listeners
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('contextmenu', handleContextMenu);

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('contextmenu', handleContextMenu);
      };
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, detectBestViewer]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = downloadFileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const iframe = document.querySelector('.pdf-viewer-iframe');
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.print();
      } catch (e) {
        // Fallback: open in new window and print
        window.open(pdfUrl, '_blank');
      }
    }
  };

  const getPDFViewerUrl = () => {
    const fullUrl = pdfUrl.startsWith('http') 
      ? pdfUrl 
      : `${window.location.origin}${pdfUrl}`;

    switch(viewerType) {
      case 'google':
        return `https://docs.google.com/viewer?url=${encodeURIComponent(fullUrl)}&embedded=true`;
      case 'native':
        // Add parameters to force inline viewing on mobile
        return `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&zoom=page-fit`;
      default:
        return pdfUrl;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="pdf-viewer-modal-overlay" onClick={onClose} style={customStyles.overlay}>
      <div className="pdf-viewer-modal-container" onClick={(e) => e.stopPropagation()} style={customStyles.container}>
        {/* Header */}
        <div className="pdf-viewer-modal-header" style={customStyles.header}>
          <div className="pdf-viewer-title-section">
            <h3 className="pdf-viewer-title">{title}</h3>
            <span className="pdf-viewer-device-badge">{viewerType === 'google' ? 'Mobile View' : 'Desktop View'}</span>
          </div>
          
          <div className="pdf-viewer-actions">
            {showPrint && (
              <button 
                className="pdf-viewer-btn pdf-viewer-print-btn" 
                onClick={handlePrint} 
                title="Print PDF"
                aria-label="Print PDF"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
                <span>Print</span>
              </button>
            )}
            
            {showDownload && (
              <button 
                className="pdf-viewer-btn pdf-viewer-download-btn" 
                onClick={handleDownload} 
                title="Download PDF"
                aria-label="Download PDF"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download</span>
              </button>
            )}
            
            <button 
              className="pdf-viewer-btn pdf-viewer-close-btn" 
              onClick={onClose} 
              title="Close"
              aria-label="Close PDF Viewer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Body */}
        <div className="pdf-viewer-modal-body" style={customStyles.body}>
          {isLoading && (
            <div className="pdf-viewer-loader">
              <div className="pdf-viewer-spinner"></div>
              <p>Loading PDF...</p>
            </div>
          )}
          
          <iframe
            src={getPDFViewerUrl()}
            title={title}
            className="pdf-viewer-iframe"
            onLoad={() => setIsLoading(false)}
            style={{ opacity: isLoading ? 0 : 1 }}
          />
        </div>

        {/* Footer Info */}
        <div className="pdf-viewer-footer">
          <span className="pdf-viewer-info">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            Tip: Use Ctrl+P (Cmd+P on Mac) to print, or click the download button to save
          </span>
        </div>
      </div>
    </div>
  );
};
