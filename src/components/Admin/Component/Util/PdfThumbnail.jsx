const PdfThumbnail = ({ url }) => {
  if (!url) return null;

  return (
    // Added 'relative' to keep the overlay contained, and 'w-full h-full' to fit the parent wrapper.
    <div className="relative w-full h-full rounded-md overflow-hidden border border-slate-600 bg-slate-900 flex items-center justify-center">
      {/* PDF Preview */}
      {/* Replaced PdfThumbnail with a direct iframe and increased height to h-96 (or custom like h-[500px]) */}
      <div className="w-full h-96 rounded-md border border-slate-600 overflow-hidden bg-slate-900">
        <iframe
          src={url} // Notice we removed the #toolbar=0 so the PDF controls appear
          title="Full PDF Document"
          className="w-full h-full"
        />
      </div>
      {/* Overlay (Click to open) */}
      <div
        onClick={() => window.open(url, "_blank")}
        className="absolute inset-0 cursor-pointer hover:bg-white/5 transition-colors"
      />
    </div>
  );
};

export default PdfThumbnail;
