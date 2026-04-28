import { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { toast } from "sonner";
import { HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";

const API_BASE = process.env.REACT_APP_API_URL;

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form, setForm] = useState({
    title: "",
    tech: "",
    description: "",
    github_url: "",
    live_demo_url: "",
    thumbnail_url: "",
    category: "",
    status: "completed",
  });

  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  /* ================= FETCH ================= */
  const fetchProjects = async () => {
    const res = await axios.get(`${API_BASE}/api/projects`);
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.thumbnail_url;

    if (file) {
      // Sanitize file name
      const safeFileName = file.name
        .trim() // remove leading/trailing spaces
        .replace(/\s+/g, "_") // replace spaces with underscores
        .replace(/[^a-zA-Z0-9._-]/g, ""); // remove unsupported characters

      const fd = new FormData();
      fd.append("file", new File([file], safeFileName, { type: file.type }));
      fd.append("folder", "project_images");

      try {
        const upload = await axios.post(`${API_BASE}/api/upload/image`, fd);
        imageUrl = upload.data.url;
      } catch (err) {
        const errorMsg =
          err.response?.data?.message || err.message || "Image upload failed!";
        toast(errorMsg);
        return; // stop submission if upload fails
      }
    }

    const payload = {
      ...form,
      thumbnail_url: imageUrl,
      order_index: projects.length + 1,
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/api/projects/${editingId}`, payload);
        toast("Project updated successfully!");
      } else {
        await axios.post(`${API_BASE}/api/projects`, payload);
        toast("Project created successfully!");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || "Something went wrong!";
      toast(errorMsg);
    }

    setForm({
      title: "",
      tech: "",
      description: "",
      github_url: "",
      live_demo_url: "",
      thumbnail_url: "",
      category: "",
      status: "completed",
    });

    setEditingId(null);
    setFile(null);
    setIsFormVisible(false); // Close modal on submit
    fetchProjects();
  };

  /* ================= DELETE ================= */
  const deleteProject = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );
    if (!confirmed) return; // stop if user cancels

    try {
      await axios.delete(`${API_BASE}/api/projects/${id}`);
      toast("Project deleted successfully!");
      fetchProjects();
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete project!";
      toast(errorMsg);
    }
  };

  /* ================= EDIT ================= */
  const editProject = (p) => {
    setForm(p);
    setEditingId(p.id);
    setFile(null); // Clear any pending file from a previous action
  };

  /* ================= DRAG ================= */
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(projects);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    const updated = items.map((item, index) => ({
      ...item,
      order_index: index + 1,
    }));

    setProjects(updated);

    await axios.put(`${API_BASE}/api/projects/reorder`, updated);
  };

  return (
    <div className="p-2 text-white relative min-h-screen">
      {/* HEADER / ADD BUTTON */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={() => {
            // Reset form for a new project
            setForm({
              title: "",
              tech: "",
              description: "",
              github_url: "",
              live_demo_url: "",
              thumbnail_url: "",
              category: "",
              status: "completed",
            });
            setEditingId(null);
            setFile(null);
            setIsFormVisible(true);
          }}
          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded transition-colors shadow"
        >
          + Add New Project
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid gap-4"
            >
              {projects.map((p, index) => (
                <Draggable key={p.id} draggableId={p.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps} // only draggable container
                      className="p-3 bg-[#1e293b] rounded flex justify-between items-center shadow"
                    >
                      <div className="flex gap-3 items-center min-w-0">
                        <span className="text-gray-500 font-mono text-sm font-bold w-4 text-center">
                          {index + 1}
                        </span>
                        <img
                          src={p.thumbnail_url}
                          alt={p.title}
                          className="w-10 h-10 rounded object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold truncate">
                              {p.title}
                            </h3>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                p.status === "completed"
                                  ? "bg-green-900/50 text-green-400"
                                  : p.status === "in-progress"
                                    ? "bg-blue-900/50 text-blue-400"
                                    : "bg-gray-800 text-gray-400"
                              }`}
                            >
                              {p.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 truncate">
                            {p.category} • {p.tech}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0 ml-2 items-center">
                        {/* Drag handle (four dots) */}
                        <span
                          {...provided.dragHandleProps}
                          className="cursor-grab text-gray-400 hover:text-white transition-colors p-1"
                          title="Drag to reorder"
                        >
                          ⋮⋮⋮
                        </span>

                        <button
                          onClick={() => {
                            editProject(p);
                            setIsFormVisible(true);
                          }}
                          className="text-gray-400 hover:text-white transition-colors p-1"
                          title="Edit Project"
                        >
                          <HiOutlinePencil size={18} />
                        </button>

                        <button
                          onClick={() => deleteProject(p.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="Delete Project"
                        >
                          <HiOutlineTrash size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* POPUP MODAL FORM */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-[#1e293b] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700">
            <div className="sticky top-0 bg-[#1e293b] border-b border-slate-700 p-5 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={() => setIsFormVisible(false)}
                className="text-gray-400 hover:text-white transition-colors text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Row 1: Title & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Title *
                  </label>
                  <input
                    required
                    placeholder="Project Name"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-800 rounded border border-slate-700 focus:border-purple-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Category
                  </label>
                  <select
                    value={form.category || ""}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-800 rounded border border-slate-700 focus:border-purple-500 outline-none transition-colors"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI">AI</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Tech & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Tech Stack
                  </label>
                  <input
                    placeholder="React, Node.js, Tailwind..."
                    value={form.tech}
                    onChange={(e) => setForm({ ...form, tech: e.target.value })}
                    className="w-full p-2.5 bg-slate-800 rounded border border-slate-700 focus:border-purple-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Status
                  </label>
                  <select
                    value={form.status || "completed"}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-800 rounded border border-slate-700 focus:border-purple-500 outline-none transition-colors"
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Briefly describe the project..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full p-2.5 bg-slate-800 rounded border border-slate-700 focus:border-purple-500 outline-none transition-colors resize-y"
                />
              </div>

              {/* Row 3: URLs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    GitHub URL
                  </label>
                  <input
                    placeholder="https://github.com/..."
                    value={form.github_url}
                    onChange={(e) =>
                      setForm({ ...form, github_url: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-800 rounded border border-slate-700 focus:border-purple-500 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    placeholder="https://..."
                    value={form.live_demo_url}
                    onChange={(e) =>
                      setForm({ ...form, live_demo_url: e.target.value })
                    }
                    className="w-full p-2.5 bg-slate-800 rounded border border-slate-700 focus:border-purple-500 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Thumbnail Image
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="flex-1 p-2.5 bg-slate-800 rounded border border-slate-700 text-sm 
                 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 
                 file:bg-slate-700 file:text-white hover:file:bg-slate-600 transition-colors"
                  />

                  {/* Preview if available */}
                  {(file || form.thumbnail_url) && (
                    <img
                      src={
                        file ? URL.createObjectURL(file) : form.thumbnail_url
                      }
                      alt="Thumbnail Preview"
                      className="h-20 object-cover rounded border border-slate-700 shrink-0"
                    />
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  className="px-5 py-2.5 rounded bg-slate-700 hover:bg-slate-600 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded bg-purple-600 hover:bg-purple-500 transition-colors font-medium shadow-lg shadow-purple-900/20"
                >
                  {editingId ? "Update Project" : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProjects;
