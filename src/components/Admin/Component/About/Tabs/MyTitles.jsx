import React from "react";

const MyTitles = ({
  titles,
  newTitle,
  setNewTitle,
  addProfessionalTitle,
  deleteProfessionalTitle,
}) => {
  return (
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
          onClick={addProfessionalTitle()}
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
              onClick={deleteProfessionalTitle(index)}
              className="text-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTitles;