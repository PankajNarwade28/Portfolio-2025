import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";
import Loading from "../LoadingEmpty/MyLoading";
import Empty from "../LoadingEmpty/MyEmpty";
// import PdfThumbnail from "../Util/PdfThumbnail"; // Un-comment if you use it later

const API_BASE = process.env.REACT_APP_API_URL;

const MyCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    issuer: "",
    date: "",
    pdf_link: "",
    credential_id: "",
    skills: "",
    image: "",
    status: "Verified",
    type: "certification",
  });

  const [file, setFile] = useState(null); // For Thumbnail Image
  const [pdfFile, setPdfFile] = useState(null); // For PDF Document

  /* ================= FETCH ================= */
  const fetchCertificates = async () => {
    setLoading(true);
    try {
    const res = await axios.get(`${API_BASE}/api/certificates`);
    setCertificates(res.data);
    } catch (err) {
      console.error(err);
      toast("Error fetching certificates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Default to existing image if no new file is selected
    let imageUrl = form.image;

    /* ================= IMAGE UPLOAD ================= */
    if (file) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "certificates");

      try {
        // Ensure you have this global route in your backend,
        // or update it to match your specific image upload route.
        const upload = await axios.post(`${API_BASE}/api/upload/image`, fd);
        imageUrl = upload.data.url;
      } catch (err) {
        toast("Image upload failed!");
        return;
      }
    }

    const payload = {
      ...form,
      image: imageUrl, // Uses the new URL, or keeps the existing one
      skills: form.skills ? form.skills.split(",").map((s) => s.trim()) : [],
    };

    try {
      let res;

      /* ================= CREATE / UPDATE ================= */
      if (editingId) {
        res = await axios.put(
          `${API_BASE}/api/certificates/${editingId}`,
          payload,
        );
        toast("Updated successfully!");
      } else {
        res = await axios.post(`${API_BASE}/api/certificates`, payload);
        toast("Created successfully!");
      }

      const certId = editingId || res.data.id;

      
      /* ================= PDF UPLOAD ================= */
      if (pdfFile) {
        const fd = new FormData();
        fd.append("file", pdfFile);

        // CHANGE axios.post to axios.put here 👇
        await axios.put(
          `${API_BASE}/api/certificates/${certId}/upload-pdf`,
          fd
        );
        toast("PDF uploaded ✅");
      }
    } catch (err) {
      console.error(err);
      toast("Error saving data");
    }

    /* ================= RESET ================= */
    setForm({
      title: "",
      issuer: "",
      date: "",
      pdf_link: "",
      credential_id: "",
      skills: "",
      image: "",
      status: "Verified",
      type: "certification",
    });

    setEditingId(null);
    setFile(null);
    setPdfFile(null);
    setIsFormVisible(false);
    fetchCertificates();
  };

  /* ================= DELETE ================= */
  const deleteCertificate = async (id) => {
    // 1. Prompt the user for the admin DOB
    const dobInput = window.prompt(
      "Enter Admin DOB (DDMMYYYY) to confirm deletion:",
    );

    // 2. If the user clicks "Cancel" or leaves it blank, abort
    if (dobInput === null || dobInput.trim() === "") {
      return;
    }

    // 3. Verify the DOB
    if (dobInput !== "28102003") {
      toast("Incorrect Admin DOB. Deletion cancelled.");
      return;
    }

    // 4. Proceed with deletion if correct
    try {
      await axios.delete(`${API_BASE}/api/certificates/${id}`);
      toast("Deleted!");
      fetchCertificates();
    } catch (err) {
      console.error(err);
      toast("Error deleting certificate");
    }
  };
  /* ================= EDIT ================= */
  const editCertificate = (c) => {
    setForm({
      ...c,
      skills: c.skills?.join(", ") || "",
    });
    setEditingId(c.id);
    setIsFormVisible(true);
  };


  if(loading) {
    return (
      <Loading  message="Fetching Certificates"/>  
    )
  }

  if(certificates.length === 0) {
    return (
      <Empty message="No certificates added yet!" onRetry={fetchCertificates}/>
    )
  }
  return (
    <div className="p-4 text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Certificates</h1>
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded font-medium"
        >
          + Add Certificate
        </button>
      </div>

      {/* LIST */}
      <div className="grid gap-6">
        {certificates.map((c) => (
          <div
            key={c.id}
            className="flex flex-col md:flex-row bg-slate-800 p-5 rounded-xl shadow-lg border border-slate-700 gap-6"
          >
            {/* LEFT SECTION: Info & Actions */}
            {/* min-w-0 prevents flexbox from blowing out with long text */}
            <div className="flex-1 min-w-0 flex flex-col justify-start">
              <div className="flex justify-between items-start gap-4">
                {/* Thumbnail & Text Wrapper */}
                <div className="flex gap-4 items-start min-w-0">
                  {/* Thumbnail Image */}
                  {c.image ? (
                    <img
                      src={c.image}
                      className="w-30 h-24 rounded-lg object-cover bg-slate-700 border border-slate-600 shrink-0 shadow-sm"
                      alt={c.title}
                    />
                  ) : (
                    <div className="w-30 h-24 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center text-xs text-gray-400 shrink-0 shadow-sm">
                      No Img
                    </div>
                  )}

                  {/* Text Details */}
                  <div className="min-w-0 flex-1">
                    <h3
                      className="text-xl font-bold text-gray-100 truncate"
                      title={c.title}
                    >
                      {c.title}
                    </h3>
                    <p className="text-lg text-gray-400 mt-1">
                      <span className="text-gray-300 font-medium">
                        {c.issuer}
                      </span>{" "}
                      • {c.date}
                    </p>

                    {/* Optional: Render Skills to balance the layout height */}
                    {c.skills && c.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {c.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-lg font-medium bg-slate-700 text-blue-300 rounded-full border border-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 shrink-0 ml-2">
                  <button
                    onClick={() => editCertificate(c)}
                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-slate-700 rounded-lg transition"
                    title="Edit Certificate"
                  >
                    <HiOutlinePencil size={20} />
                  </button>
                  <button
                    onClick={() => deleteCertificate(c.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition"
                    title="Delete Certificate"
                  >
                    <HiOutlineTrash size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION: PDF Preview */}
            {c.pdf_link && (
              <div className="w-full md:w-1/3 lg:w-2/5 shrink-0 flex flex-col gap-3 border-t md:border-t-0 md:border-l border-slate-700 pt-5 md:pt-0 md:pl-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Document Preview
                  </span>
                  <a
                    href={c.pdf_link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-green-400 hover:text-green-300 underline font-medium"
                  >
                    Open in new tab
                  </a>
                </div>

                {/* Changed min-h to absolute h-[...] for safer iframe rendering */}
                <div className="w-full h-[250px] md:h-[300px] rounded-lg overflow-hidden border border-slate-600 bg-slate-900 shadow-inner">
                  <iframe
                    src={c.pdf_link}
                    title={`${c.title} PDF Document`}
                    className="w-full h-full border-none"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-slate-800 p-6 rounded-lg w-full max-w-2xl space-y-6 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-4 border-b border-slate-700 pb-2">
              {editingId ? "Edit" : "Add"} Certificate
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Title</label>
                <input
                  placeholder="e.g. Full Stack Web Dev"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:border-green-500 text-white"
                />
              </div>

              {/* Issuer */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Issuer</label>
                <input
                  placeholder="e.g. ApnaCollege"
                  value={form.issuer}
                  onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                  className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:border-green-500 text-white"
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:border-green-500 text-gray-200"
                />
              </div>

              {/* Type */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:border-green-500 text-gray-200"
                >
                  <option value="certification">Certifications</option>
                  <option value="professional">Professional</option>
                </select>
              </div>

              {/* Credential ID - Spans full width */}
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm text-gray-400">
                  Credential ID (Optional)
                </label>
                <input
                  placeholder="e.g. 6826e4cb400a2f3f..."
                  value={form.credential_id}
                  onChange={(e) =>
                    setForm({ ...form, credential_id: e.target.value })
                  }
                  className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:border-green-500 text-white"
                />
              </div>

              {/* Skills - Spans full width */}
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-sm text-gray-400">
                  Skills (comma separated)
                </label>
                <input
                  placeholder="React, Node.js, MongoDB"
                  value={form.skills}
                  onChange={(e) => setForm({ ...form, skills: e.target.value })}
                  className="w-full p-2.5 bg-slate-700 border border-slate-600 rounded focus:outline-none focus:border-green-500 text-white"
                />
              </div>

              {/* IMAGE UPLOAD INPUT */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">
                  Thumbnail Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full p-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-gray-200 hover:file:bg-slate-600 cursor-pointer"
                />
              </div>

              {/* PDF UPLOAD INPUT */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-400">
                  Certificate Document (PDF)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                  className="w-full p-2 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-gray-200 hover:file:bg-slate-600 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-700">
              <button
                type="button"
                onClick={() => setIsFormVisible(false)}
                className="bg-gray-600 hover:bg-gray-500 transition px-5 py-2 rounded font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-500 transition px-5 py-2 rounded font-medium"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MyCertificates;
