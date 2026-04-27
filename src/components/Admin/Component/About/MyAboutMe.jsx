import { useState, useEffect,useCallback} from "react";
import {
  HiOutlineUser,
  HiOutlineCloudUpload,
  HiOutlineSparkles,
  HiOutlineTerminal,
  HiOutlineDatabase,
} from "react-icons/hi"; 
import axios from "axios";
import "./MyAboutMe.css";
import Loading from "../LoadingEmpty/MyLoading";
import Empty from "../LoadingEmpty/MyEmpty";
import { toast } from "sonner";
const ManageAboutMe = () => {
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
  const [activeTab, setActiveTab] = useState("current");
  const [titles, setTitles] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setLoading(true);
    // Load current data on mount
    axios
      .get(`${API_BASE}/api/about-me`)
      .then((res) => setFormData(res.data))
      .catch((err) => console.error("Error loading profile:", err))
      .finally(() => setLoading(false));
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
        uploadData.append("folder", "About_images"); // Match this with backend req.body.folder
        const uploadRes = await axios.post(
          `${API_BASE}/api/upload/image`,
          uploadData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        imageUrl = uploadRes.data.url;
      }

      const finalData = { ...formData, profile_pic_url: imageUrl };
      await axios.put(`${API_BASE}/api/about-me`, finalData);

      toast("Profile updated successfully!");
    } catch (err) {
      toast("Failed to update: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTitles = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/about-me/titles`);
      setTitles(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [API_BASE]);

  useEffect(() => {
    if (activeTab === "titles") fetchTitles();
  }, [activeTab , fetchTitles]);

  if (loading) {
    return <Loading message="Updating Profile Data..." />;
  }

  if (!formData.full_name) {
    return <Empty title="No profile data found. Please add your details." />;
  }

  return (
    <div className="h-full bg-[#0b0f1a] text-white py-10 md:py-12 font-sans selection:bg-purple-500/30">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-tight">
            Profile Management
          </h1>
          <button className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 px-6 py-2 rounded-xl text-sm font-bold hover:bg-cyan-500 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <HiOutlineSparkles /> Get Portfolio Tips
          </button>
        </header>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("current")}
            className={`px-6 py-2 rounded-xl ${
              activeTab === "current"
                ? "bg-purple-600 text-white"
                : "bg-[#111827] text-gray-400"
            }`}
          >
            Current
          </button>

          <button
            onClick={() => setActiveTab("titles")}
            className={`px-6 py-2 rounded-xl ${
              activeTab === "titles"
                ? "bg-purple-600 text-white"
                : "bg-[#111827] text-gray-400"
            }`}
          >
            Professional Titles
          </button>
        </div>
        {activeTab === "current" && (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* LEFT COLUMN: Visuals */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#161b2c] p-8 rounded-[2rem] border border-white/5 shadow-2xl flex flex-col items-center">
                <h3 className="text-purple-400 text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                  <HiOutlineCloudUpload /> Avatar Module
                </h3>

                <div className="relative group">
                  <div className="w-56 h-56 rounded-[3rem] bg-[#1f2937] overflow-hidden border-4 border-[#111827] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-[1.02]">
                    {file ? (
                      /* 1. Show the new file being uploaded */
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : formData.profile_pic_url ? (
                      /* 2. If no new file, show the existing profile picture from your database */
                      <img
                        src={formData.profile_pic_url}
                        alt="Current Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      /* 3. Fallback if both are empty */
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
                        <HiOutlineTerminal size={64} className="opacity-20" />
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    id="p-img"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                  />

                  <label
                    htmlFor="p-img"
                    className="absolute -bottom-2 -right-2 bg-cyan-500 text-white p-4 rounded-2xl shadow-lg cursor-pointer hover:scale-110 transition-transform"
                  >
                    <HiOutlineCloudUpload size={24} />
                  </label>
                </div>

                <div className="mt-8 w-full bg-[#111827] p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] text-gray-500 font-mono text-center">
                    System.out.println("Ready to Upload");
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Fields */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-[#161b2c] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                      <HiOutlineUser /> Professional Alias
                    </label>
                    <input
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="w-full bg-[#111827] border border-white/5 focus:border-purple-500 p-4 rounded-2xl text-sm font-medium outline-none transition-all placeholder:text-gray-700"
                      placeholder="Enter full name"
                    />
                  </div>

                  {/* CGPA */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                      <HiOutlineDatabase /> Current CGPA
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="current_cgpa"
                      value={formData.current_cgpa}
                      onChange={handleInputChange}
                      className="w-full bg-[#111827] border border-white/5 focus:border-purple-500 p-4 rounded-2xl text-sm font-medium outline-none transition-all"
                    />
                  </div>

                  {/* Projects */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                      <HiOutlineTerminal /> Projects Built
                    </label>
                    <input
                      type="number"
                      name="projects_built"
                      value={formData.projects_built}
                      onChange={handleInputChange}
                      className="w-full bg-[#111827] border border-white/5 focus:border-purple-500 p-4 rounded-2xl text-sm font-medium outline-none transition-all"
                    />
                  </div>
                  {/* Years of Learning */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                      <HiOutlineTerminal /> Years of Learning
                    </label>
                    <input
                      type="number"
                      name="years_learning"
                      value={formData.years_learning}
                      onChange={handleInputChange}
                      className="w-full bg-[#111827] border border-white/5 focus:border-purple-500 p-4 rounded-2xl text-sm font-medium outline-none transition-all"
                    />
                  </div>

                  {/* Drivers */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                      <HiOutlineSparkles /> Core Drivers
                    </label>
                    <input
                      value={formData.drivers.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          drivers: e.target.value.split(", "),
                        })
                      }
                      className="w-full bg-[#111827] border border-white/5 focus:border-purple-500 p-5 rounded-[1.5rem] text-sm font-medium outline-none transition-all resize-none"
                      placeholder="Innovation, Reliability..."
                    />
                  </div>

                  {/* Summary */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                      Passionate Summary
                    </label>
                    <textarea
                      rows="4"
                      name="passionate_summary"
                      value={formData.passionate_summary}
                      onChange={handleInputChange}
                      className="w-full bg-[#111827] border border-white/5 focus:border-purple-500 p-5 rounded-[1.5rem] text-sm font-medium outline-none transition-all resize-none"
                      placeholder="Describe your technical journey..."
                    />
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-10">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all shadow-[0_10px_30px_rgba(168,85,247,0.3)] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <HiOutlineDatabase />{" "}
                    {loading ? "Updating System..." : "Save Profile Data"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {activeTab === "titles" && (
          <div className="bg-[#161b2c] p-8 rounded-2xl border border-white/5 space-y-6">
            <h2 className="text-xl font-bold">Manage Professional Titles</h2>

            {/* Add New */}
            <div className="flex gap-3">
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Add new title"
                className="flex-1 p-3 rounded-lg bg-[#111827] border border-gray-600"
              />
              <button
                onClick={async () => {
                  await axios.post(`${API_BASE}/api/about-me/titles`, {
                    title: newTitle,
                  });
                  setNewTitle("");
                  fetchTitles();
                }}
                className="bg-green-600 px-4 rounded-lg"
              >
                Add
              </button>
            </div>

            {/* List */}
            <div className="space-y-3">
              {titles.map((t, index) => (
                <div
                  key={index}
                  className="flex justify-between bg-[#111827] p-3 rounded-lg"
                >
                  <span>{t}</span>
                  <button
                    onClick={async () => {
                      await axios.delete(
                        `${API_BASE}/api/about-me/titles/${index}`,
                      );
                      fetchTitles();
                    }}
                    className="text-red-400"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAboutMe;
