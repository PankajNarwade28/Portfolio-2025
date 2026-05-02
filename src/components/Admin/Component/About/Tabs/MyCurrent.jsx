import React from "react";
import {
  HiOutlineUser,
  HiOutlineCloudUpload,
  HiOutlineSparkles,
  HiOutlineTerminal,
  HiOutlineDatabase,
} from "react-icons/hi";

const MyCurrent = ({
  formData,
  setFormData,
  handleInputChange,
  file,
  setFile,
  handleSubmit,
  loading,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8"
    >
      {/* LEFT COLUMN: Visuals */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-[#161b2c] p-8 rounded-[2rem] border border-white/5 shadow-2xl flex flex-col items-center">
          <h3 className="text-purple-400 text-xs font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
            <HiOutlineCloudUpload /> Avatar Module
          </h3>

          <div className="relative group">
            <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-[3rem] bg-[#1f2937] overflow-hidden border-4 border-[#111827] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-[1.02]">
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : formData.profile_pic_url ? (
                <img
                  src={formData.profile_pic_url}
                  alt="Current Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
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
          <div className="mt-6">
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
  );
};

export default MyCurrent;