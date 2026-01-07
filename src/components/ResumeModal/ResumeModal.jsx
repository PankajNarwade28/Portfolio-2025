import React from "react";
import { PDFViewerModal } from "../PDFViewerModal/PDFViewerModal";

/**
 * ResumeModal - Wrapper component for displaying resume using PDFViewerModal
 * This is a specific implementation for resume viewing
 */
export const ResumeModal = ({ isOpen, onClose, pdfUrl }) => {
  return (
    <PDFViewerModal 
      isOpen={isOpen}
      onClose={onClose}
      pdfUrl={pdfUrl}
      title="Resume / CV"
      downloadFileName="Pankaj_Narwade_Resume.pdf"
      showPrint={true}
      showDownload={true}
    />
  );
};
