import React, { useState, useEffect } from "react";
import {
  HiOutlineAcademicCap,
  HiOutlineCalendar,
  HiOutlineLocationMarker, 
  HiOutlineDatabase,
  HiOutlinePlusCircle,
} from "react-icons/hi";
import axios from "axios";
import Loading from "../LoadingEmpty/MyLoading";
import Empty from "../LoadingEmpty/MyEmpty";
import { toast } from "sonner";
import { useCallback } from "react";

const API_BASE = process.env.REACT_APP_API_URL;


const initialForm = {
  degree: "",
  field_of_study: "",
  college_name: "",
  start_year: "",
  end_year: "",
  is_current: false,
  specialization: "",
  grade_type: "",
  grade_value: "",
  grade_extra: "",
  location: "",
  order_index: 0,
};

const ManageEducation = () => {
  const [educationList, setEducationList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

 const fetchEducation = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/education`);
      setEducationList(res.data);
      console.log("Fetched education data:", res.data);

      // Auto-select first item on initial load
      if (res.data.length > 0 && selectedId === null) {
        setSelectedId(res.data[0].id);
        setFormData(res.data[0]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, [selectedId]); // include dependencies used inside

  useEffect(() => {
    fetchEducation();
  }, [fetchEducation]);

  const handleSelect = (edu) => {
    setSelectedId(edu.id);
    setFormData({ ...edu }); // Spread to ensure a fresh object reference
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;

    // Ensure numeric fields are saved as numbers
    if (["start_year", "end_year", "order_index"].includes(name)) {
      newValue = value === "" ? "" : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (selectedId && !String(selectedId).startsWith("temp-")) {
        await axios.put(`${API_BASE}/api/education/${selectedId}`, formData);
      } else {
        await axios.post(`${API_BASE}/api/education`, formData);
      } 
    toast("Education history synced successfully!"); 
      fetchEducation();
    } catch (err) { 
        toast("Failed to sync: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const createNewEntry = () => {
    const tempId = `temp-${Date.now()}`;
    setSelectedId(tempId);
    setFormData({ ...initialForm, degree: "New Entry" });
  };

  const resetForm = () => {
    if (selectedId) {
      const existing = educationList.find((edu) => edu.id === selectedId);
      if (existing) {
        setFormData(existing);
        toast("Form reset to last saved state.");
      } else {
        setFormData(initialForm);
        toast("No saved data found, form cleared.");
      }
    } else {
      setFormData(initialForm);
    }
  };
  if (loading && educationList.length === 0)
    return <Loading message="Loading Timeline..." />;

  if(!loading && educationList.length === 0)
    return <Empty title="No education history found." description="Please check Database or Backend Hosting for Education Data." onRetry={fetchEducation} />;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex justify-between items-end border-b border-white/5 pb-6">
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Academic History
            </h2>
            <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-bold">
              Manage your educational timeline
            </p>
          </div>
          <button
            type="button"
            onClick={createNewEntry}
            className="bg-white/5 hover:bg-white/10 text-gray-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
          >
            <HiOutlinePlusCircle size={14} /> New Entry
          </button>
        </header>

        {/* Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {educationList.map((edu) => (
            <button
              key={edu.id}
              type="button"
              onClick={() => handleSelect(edu)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden group
                ${
                  selectedId === edu.id
                    ? "bg-[#a855f7]/10 border-[#a855f7] shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                    : "bg-[#161b2c] border-transparent hover:border-white/10"
                }`}
            >
              <div className="text-xs font-black uppercase tracking-tighter truncate leading-none mb-1">
                {edu.degree || "Untitled"} <span>{edu.field_of_study}</span>
              </div>
              <div className="text-[10px] text-gray-500 truncate">
                {edu.college_name || "Institution"}
              </div>
              {selectedId === edu.id && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-[#a855f7] rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#161b2c] p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Degree */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 flex items-center gap-2 ml-1">
                <HiOutlineAcademicCap size={14} /> Degree / Title
              </label>
              <input
                name="degree"
                value={formData.degree || ""}
                onChange={handleInputChange}
                className="bg-[#0b0f1a] border border-white/5 focus:border-purple-500 p-4 rounded-2xl text-sm font-medium outline-none transition-all text-white"
              />
            </div>

            {/* Field of Study */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 flex items-center gap-2 ml-1">
                Field of Study
              </label>
              <input
                name="field_of_study"
                value={formData.field_of_study || ""}
                onChange={handleInputChange}
                className="bg-[#0b0f1a] border border-white/5 focus:border-purple-500 p-4 rounded-2xl text-sm font-medium outline-none transition-all text-white"
              />
            </div>

            {/* Institution */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 flex items-center gap-2 ml-1">
                Institution
              </label>
              <input
                name="college_name"
                value={formData.college_name || ""}
                onChange={handleInputChange}
                className="bg-[#0b0f1a] border border-white/5 focus:border-purple-500 p-4 rounded-2xl text-sm font-medium outline-none transition-all text-white"
              />
            </div>

            {/* Location */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 flex items-center gap-2 ml-1">
                <HiOutlineLocationMarker size={14} /> Location
              </label>
              <input
                name="location"
                value={formData.location || ""}
                onChange={handleInputChange}
                className="bg-[#0b0f1a] border border-white/5 focus:border-purple-500 p-4 rounded-2xl text-sm font-medium outline-none transition-all text-white"
              />
            </div>
          </div>

          <div className="h-px bg-white/5 w-full" />

          {/* Timeline & Grades */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 flex items-center gap-2 ml-1">
                <HiOutlineCalendar size={14} /> Start Year
              </label>
              <input
                type="number"
                name="start_year"
                value={formData.start_year || ""}
                onChange={handleInputChange}
                className="bg-[#0b0f1a] border border-white/5 focus:border-purple-500 p-4 rounded-2xl text-sm font-medium outline-none transition-all text-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 flex items-center gap-2 ml-1">
                End Year
              </label>
              <input
                type="number"
                name="end_year"
                disabled={formData.is_current}
                value={formData.is_current ? "" : formData.end_year || ""}
                onChange={handleInputChange}
                className="bg-[#0b0f1a] border border-white/5 focus:border-purple-500 p-4 rounded-2xl text-sm font-medium outline-none transition-all text-white disabled:opacity-30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 flex items-center gap-2 ml-1">
                Grade Type
              </label>
              <input
                name="grade_type"
                value={formData.grade_type || ""}
                onChange={handleInputChange}
                className="bg-[#0b0f1a] border border-white/5 focus:border-purple-500 p-4 rounded-2xl text-sm font-medium outline-none transition-all text-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 flex items-center gap-2 ml-1">
                <HiOutlineDatabase size={14} /> Score
              </label>
              <input
                name="grade_value"
                value={formData.grade_value || ""}
                onChange={handleInputChange}
                className="bg-[#0b0f1a] border border-white/5 focus:border-purple-500 p-4 rounded-2xl text-sm font-medium outline-none transition-all text-white"
              />
            </div>
          </div>

          {/* Current Status Toggle */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-4 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  name="is_current"
                  checked={formData.is_current || false}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div
                  className={`w-12 h-6 rounded-full transition-colors ${formData.is_current ? "bg-purple-600" : "bg-[#0b0f1a]"}`}
                />
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.is_current ? "translate-x-6" : ""}`}
                />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-purple-400 transition-colors">
                Currently Enrolled
              </span>
            </label>
          </div>

          {/* Specialization */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-400 ml-1">
              Specialization & Notes
            </label>
            <textarea
              name="specialization"
              value={formData.specialization || ""}
              onChange={handleInputChange}
              rows="4"
              className="bg-[#0b0f1a] border border-white/5 focus:border-purple-500 p-5 rounded-[1.5rem] text-sm font-medium outline-none transition-all resize-none text-white"
            />
          </div>

          <footer className="pt-6 flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-[0_10px_20px_rgba(168,85,247,0.2)] active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? "Processing..." : "Commit Changes"}
            </button>
            <button
              type="reset"
              onClick={() => {
                resetForm();
              }}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-[0_10px_20px_rgba(168,85,247,0.2)] active:scale-95 transition-all disabled:opacity-50"
            >
              Current State
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default ManageEducation;
