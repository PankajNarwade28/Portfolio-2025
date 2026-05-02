import React from "react";

const MyPreview = ({ formData, titles }) => {
  return (
    <div className="bg-[#161b2c] p-6 md:p-10 rounded-2xl border border-white/5 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={formData.profile_pic_url}
          alt="profile"
          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover border"
        />

        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold">
            {formData.full_name}
          </h2>
          <p className="text-purple-400 text-sm mt-1">
            {formData.current_role}
          </p>

          <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
            {titles.map((t, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-[#111827] p-4 rounded-xl">
          <p className="text-gray-400 text-xs">Projects</p>
          <h3 className="text-xl font-bold">{formData.projects_built}</h3>
        </div>

        <div className="bg-[#111827] p-4 rounded-xl">
          <p className="text-gray-400 text-xs">CGPA</p>
          <h3 className="text-xl font-bold">{formData.current_cgpa}</h3>
        </div>

        <div className="bg-[#111827] p-4 rounded-xl">
          <p className="text-gray-400 text-xs">Experience</p>
          <h3 className="text-xl font-bold">{formData.years_learning} yrs</h3>
        </div>

        <div className="bg-[#111827] p-4 rounded-xl">
          <p className="text-gray-400 text-xs">Status</p>
          <h3 className="text-green-400 font-bold">Available</h3>
        </div>
      </div>

      {/* Drivers */}
      <div>
        <h3 className="text-sm text-purple-400 mb-2">Core Drivers</h3>
        <div className="flex flex-wrap gap-2">
          {formData.drivers.map((d, i) => (
            <span
              key={i}
              className="bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full text-xs"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div>
        <h3 className="text-sm text-purple-400 mb-2">Summary</h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          {formData.passionate_summary}
        </p>
      </div>
    </div>
  );
};

export default MyPreview;