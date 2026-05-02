import React from "react";

const MyPersonal = ({
  personalInfo,
  setPersonalInfo,
  resumeFile,
  setResumeFile,
  handlePdfUpload,
  uploadingPdf,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#161b2c] p-6 md:p-8 rounded-2xl space-y-8"
    >
      <h2 className="text-xl md:text-2xl font-bold">Personal Information</h2>

      {/* ================= BASIC INFO ================= */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Company */}
        <div className="space-y-1">
          <label className="text-xs text-gray-400">Company</label>
          <input
            value={personalInfo.current_company}
            onChange={(e) =>
              setPersonalInfo({
                ...personalInfo,
                current_company: e.target.value,
              })
            }
            placeholder="Current Company"
            className="input"
          />
        </div>

        {/* Designation */}
        <div className="space-y-1">
          <label className="text-xs text-gray-400">Designation</label>
          <input
            value={personalInfo.designation}
            onChange={(e) =>
              setPersonalInfo({
                ...personalInfo,
                designation: e.target.value,
              })
            }
            placeholder="Designation"
            className="input"
          />
        </div>

        {/* Availability */}
        <div className="space-y-1">
          <label className="text-xs text-gray-400">Availability</label>
          <select
            value={personalInfo.is_available}
            onChange={(e) =>
              setPersonalInfo({
                ...personalInfo,
                is_available: e.target.value === "true",
              })
            }
            className="input"
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>
        </div>
      </div>

      {/* ================= RESUME SECTION ================= */}
      <div className="bg-[#111827] p-5 rounded-xl border border-white/5 space-y-4">
        <h3 className="text-sm font-semibold text-purple-400">
          Resume Upload
        </h3>

        {/* File Input */}
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setResumeFile(e.target.files[0])}
          className="input"
        />

        {/* Selected File Name */}
        {resumeFile && (
          <p className="text-xs text-gray-400">Selected: {resumeFile.name}</p>
        )}

        {/* Upload Button */}
        <button
          type="button"
          onClick={handlePdfUpload}
          disabled={uploadingPdf || !resumeFile}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm disabled:opacity-50"
        >
          {uploadingPdf ? "Uploading..." : "Upload Resume"}
        </button>

        {/* Uploaded PDF Preview */}
        {personalInfo.resume_url && (
          <div className="space-y-3 mt-4">
            <a
              href={personalInfo.resume_url}
              target="_blank"
              rel="noreferrer"
              className="text-green-400 text-xs underline"
            >
              Open Full Resume
            </a>

            <div className="w-full h-40 md:h-52 rounded-lg overflow-hidden border border-gray-700">
              <iframe
                src={personalInfo.resume_url}
                title="Resume Preview"
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* ================= SAVE BUTTON ================= */}
      <button
        type="submit"
        disabled={uploadingPdf}
        className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold disabled:opacity-50"
      >
        Save Personal Info
      </button>
    </form>
  );
};

export default MyPersonal;