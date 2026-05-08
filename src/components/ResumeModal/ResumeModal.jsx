import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { PDFViewerModal } from "../PDFViewerModal/PDFViewerModal";

/**
 * ResumeModal - Wrapper component for displaying resume using PDFViewerModal
 * This is a specific implementation for resume viewing
 */
export const ResumeModal = ({ isOpen, onClose, pdfUrl }) => {
  const [resumeUrl, setResumeUrl] = useState(pdfUrl || "");

  useEffect(() => {
    const fetchResumeUrl = async () => {
      if (!isOpen) return;

      try {
        const apiBase = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiBase}/api/links/resume`);
        const fetchedResumeUrl = response.data?.resume_url || "";
        setResumeUrl(fetchedResumeUrl);
      } catch (error) {
        console.error("Error fetching resume URL:", error);
        setResumeUrl("");
      }
    };

    fetchResumeUrl();
  }, [isOpen]);

  return (
    <PDFViewerModal 
      isOpen={isOpen}
      onClose={onClose}
      pdfUrl={resumeUrl}
      title="Resume / CV"
      downloadFileName="Pankaj_Narwade_Resume.pdf"
      showPrint={true}
      showDownload={true}
    />
  );
};

ResumeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  pdfUrl: PropTypes.string,
};
