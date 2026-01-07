# PDF Viewer Modal - Usage Guide

## Overview
A future-proof, reusable PDF viewer component that displays PDFs inline within your website. Optimized for both desktop and mobile devices with automatic device detection and best viewer selection.

## Features
- ✅ Cross-platform compatibility (Desktop, Mobile, Tablet)
- ✅ Automatic device detection (Google Viewer for mobile, Native for desktop)
- ✅ Print and Download functionality
- ✅ Loading states with spinner
- ✅ Customizable styling
- ✅ Keyboard accessible
- ✅ Responsive design
- ✅ No external PDF redirects on mobile

## Basic Usage

```jsx
import { PDFViewerModal } from './components/PDFViewerModal/PDFViewerModal';

function YourComponent() {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsPdfOpen(true)}>
        View PDF
      </button>

      <PDFViewerModal 
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        pdfUrl="/assets/pdf/your-document.pdf"
        title="My Document"
        downloadFileName="my-document.pdf"
      />
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | boolean | required | Controls modal visibility |
| `onClose` | function | required | Callback when modal is closed |
| `pdfUrl` | string | required | URL or path to PDF file |
| `title` | string | "PDF Viewer" | Title shown in modal header |
| `downloadFileName` | string | "document.pdf" | Filename for downloads |
| `showPrint` | boolean | true | Show/hide print button |
| `showDownload` | boolean | true | Show/hide download button |
| `customStyles` | object | {} | Custom inline styles |

## Advanced Examples

### 1. Resume Viewer
```jsx
<PDFViewerModal 
  isOpen={isResumeOpen}
  onClose={() => setIsResumeOpen(false)}
  pdfUrl="/assets/pdf/resume.pdf"
  title="Resume / CV"
  downloadFileName="John_Doe_Resume.pdf"
/>
```

### 2. Certificate Viewer
```jsx
<PDFViewerModal 
  isOpen={isCertOpen}
  onClose={() => setIsCertOpen(false)}
  pdfUrl="/assets/certificates/aws-cert.pdf"
  title="AWS Certification"
  downloadFileName="AWS_Certificate.pdf"
  showPrint={false}
/>
```

### 3. Project Documentation
```jsx
<PDFViewerModal 
  isOpen={isDocOpen}
  onClose={() => setIsDocOpen(false)}
  pdfUrl="https://example.com/docs/project-spec.pdf"
  title="Project Specifications"
  downloadFileName="Project_Specs.pdf"
  showPrint={true}
  showDownload={true}
/>
```

### 4. Custom Styling
```jsx
<PDFViewerModal 
  isOpen={isPdfOpen}
  onClose={() => setIsPdfOpen(false)}
  pdfUrl="/path/to/pdf"
  title="Custom Styled PDF"
  customStyles={{
    overlay: { backgroundColor: 'rgba(0, 100, 200, 0.9)' },
    header: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    container: { maxWidth: '1400px', height: '95vh' }
  }}
/>
```

## Device Detection
The component automatically detects the user's device:
- **Mobile/Tablet**: Uses Google Docs Viewer for better compatibility
- **Desktop**: Uses native browser PDF renderer for better performance

## Browser Support
- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Opera
- ✅ Samsung Internet

## Future Enhancements
You can easily extend this component with:
- Zoom controls
- Page navigation
- Search functionality
- Annotation tools
- Multiple PDF support (carousel)
- Thumbnail preview
- Full-screen mode

## Example: Multiple PDFs
```jsx
const documents = [
  { id: 1, title: 'Resume', url: '/pdf/resume.pdf', filename: 'resume.pdf' },
  { id: 2, title: 'Cover Letter', url: '/pdf/cover.pdf', filename: 'cover.pdf' },
  { id: 3, title: 'Portfolio', url: '/pdf/portfolio.pdf', filename: 'portfolio.pdf' }
];

function DocumentGallery() {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <>
      {documents.map(doc => (
        <button key={doc.id} onClick={() => setSelectedDoc(doc)}>
          View {doc.title}
        </button>
      ))}

      {selectedDoc && (
        <PDFViewerModal 
          isOpen={!!selectedDoc}
          onClose={() => setSelectedDoc(null)}
          pdfUrl={selectedDoc.url}
          title={selectedDoc.title}
          downloadFileName={selectedDoc.filename}
        />
      )}
    </>
  );
}
```

## Tips
1. For external PDFs, ensure CORS is properly configured
2. Keep PDF file sizes reasonable for mobile users
3. Use descriptive titles for accessibility
4. Test on actual mobile devices for best results
5. Consider adding loading states in parent component
