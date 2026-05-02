import { useState, useEffect, useCallback } from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import axios from "axios";
import { toast } from "sonner";
import "./MyAboutMe.css";
import Loading from "../LoadingEmpty/MyLoading";
import Empty from "../LoadingEmpty/MyEmpty";

// Import child components

import MyCurrent from "./Tabs/MyCurrent";
import MyPersonal from "./Tabs/MyPersonal";
import MyTitles from "./Tabs/MyTitles";
import MyPreview from "./Tabs/MyPreview";

const MyAboutMe = () => {
  const [personalInfo, setPersonalInfo] = useState({
    current_company: "",
    designation: "",
    is_available: true,
    resume_url: "",
  });
  const [formData, setFormData] = useState({
    full_name: "",
    current_role: "",
    projects_built: 0,
    current_cgpa: 0,
    passionate_summary: "",
    profile_pic_url: "",
    years_learning: 0,
    drivers: [],
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  const [titles, setTitles] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [profileRes, personalRes] = await Promise.all([
          axios.get(`${API_BASE}/api/aboutme`),
          axios.get(`${API_BASE}/api/personal/info`),
        ]);

        setFormData(profileRes.data);
        setPersonalInfo(personalRes.data);
        setTitles(personalRes.data.professional_titles || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.profile_pic_url;

      if (file) {
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("folder", "About_images");

        const uploadRes = await axios.post(
          `${API_BASE}/api/upload/image`,
          uploadData
        );
        imageUrl = uploadRes.data.url;
      }

      await axios.put(`${API_BASE}/api/aboutme`, {
        ...formData,
        profile_pic_url: imageUrl,
      });

      await axios.put(`${API_BASE}/api/personal/info`, {
        ...personalInfo,
        professional_titles: titles,
      });

      toast("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      toast("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handlePdfUpload = async () => {
    if (!resumeFile) return;

    try {
      setUploadingPdf(true);

      const pdfData = new FormData();
      pdfData.append("file", resumeFile);
      pdfData.append("folder", "resumes");

      const res = await axios.post(`${API_BASE}/api/upload/pdf`, pdfData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPersonalInfo((prev) => ({
        ...prev,
        resume_url: res.data.url,
      }));

      toast("Resume uploaded ✅");
    } catch (err) {
      toast("PDF upload failed ❌");
    } finally {
      setUploadingPdf(false);
    }
  };

  const fetchTitles = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/aboutme/titles`);
      setTitles(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [API_BASE]);

  useEffect(() => {
    if (activeTab === "titles") fetchTitles();
  }, [activeTab, fetchTitles]);

  const addProfessionalTitle = () => async () => {
    if (!newTitle.trim()) {
      toast("Title cannot be empty");
      return;
    }
    await axios.post(`${API_BASE}/api/aboutme/titles`, {
      title: newTitle,
    });
    setNewTitle("");
    fetchTitles();
  };

  const deleteProfessionalTitle = (index) => async () => {
    setLoading(true);
    const dobInput = window.prompt(
      "Enter Admin DOB (DDMMYYYY) to confirm deletion:"
    );

    if (dobInput === null || dobInput.trim() === "") {
      setLoading(false);
      return;
    }

    if (dobInput !== "28102003") {
      setLoading(false);
      toast("Incorrect Admin DOB. Deletion cancelled.");
      return;
    }
    await axios.delete(`${API_BASE}/api/aboutme/titles/${index}`);
    fetchTitles();
    setLoading(false);
  };

  if (loading) {
    return <Loading message="Updating Profile Data..." />;
  }

  if (!formData.full_name) {
    return <Empty title="No profile data found. Please add your details." />;
  }

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white py-6 sm:py-10 md:py-12 px-4">
      <div className="mx-auto space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left">
          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
            Profile Management
          </h1>
          <button className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-6 py-2 rounded-xl text-sm font-bold hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <HiOutlineSparkles /> Get Portfolio Tips
          </button>
        </header>
        
        <div className="flex flex-wrap gap-3 mb-2">
          {["preview", "current", "personal", "titles"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl capitalize ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "bg-[#111827] text-gray-400"
              }`}
            >
              {tab === "current" ? "Portfolio" : tab === "titles" ? "Professional Titles" : tab === "personal" ? "Personal Info" : tab}
            </button>
          ))}
        </div>

        {activeTab === "current" && (
          <MyCurrent
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            file={file}
            setFile={setFile}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}

        {activeTab === "titles" && (
          <MyTitles
            titles={titles}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            addProfessionalTitle={addProfessionalTitle}
            deleteProfessionalTitle={deleteProfessionalTitle}
          />
        )}

        {activeTab === "preview" && (
          <MyPreview formData={formData} titles={titles} />
        )}

        {activeTab === "personal" && (
          <MyPersonal
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            resumeFile={resumeFile}
            setResumeFile={setResumeFile}
            handlePdfUpload={handlePdfUpload}
            uploadingPdf={uploadingPdf}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default MyAboutMe;