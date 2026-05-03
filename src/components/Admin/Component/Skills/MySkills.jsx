import { useEffect, useState } from "react";
import {
  Trash2,
  Plus,
  Save,
  X,
  Sparkles,
  Code,
  Award,
  Edit2,
} from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import Loading from "../LoadingEmpty/MyLoading";
import Empty from "../LoadingEmpty/MyEmpty";
import { toast } from "sonner";
const API_BASE = process.env.REACT_APP_API_URL;
const ManageSkills = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for Category Form
  const [newCategory, setNewCategory] = useState("");
  const [iconFile, setIconFile] = useState(null);
  const [editingModal, setEditingModal] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null); // Stores {id, title, icon_url}
  const [editCategoryFile, setEditCategoryFile] = useState(null);

  // State for Skill Form
  const [newSkill, setNewSkill] = useState({
    skill_name: "",
    emoji: "",
    print_statement: "",
    order_index: 1,
    category_id: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/categories`);
      // Ensure skills are sorted by order_index when they arrive
      const sortedData = (res.data || []).map((cat) => ({
        ...cat,
        skill_items:
          cat.skill_items?.sort((a, b) => a.order_index - b.order_index) || [],
      }));
      setData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- REORDER LOGIC ---
  const onDragEnd = async (result, categoryId) => {
    setLoading(true);
    if (!result.destination) return;

    const categoryIndex = data.findIndex((cat) => cat.id === categoryId);
    const newItems = Array.from(data[categoryIndex].skill_items);

    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = newItems.map((item, index) => ({
      id: item.id,
      order_index: index + 1,
      category_id: item.category_id, // 👈 REQUIRED
    }));
    // Optimistic UI Update
    const newData = [...data];
    newData[categoryIndex].skill_items = newItems;
    setData(newData);

    console.log("Reorder API response:", newData);

    try {
      const response = await axios.put(`${API_BASE}/api/skills/reorder`, {
        items: updatedItems,
      });
      console.log("Sending items:", updatedItems);
      console.log("Response:", response.data);
      // SAFETY CHECK: Ensure response and response.data exist
      if (response?.data?.success) {
        console.log("Reorder saved!");
      }
    } catch (err) {
      // This catches the 403 or 500 errors gracefully
      console.error("Failed to save order:", err.response?.data || err.message);
      fetchData(); // Rollback UI
    } finally {
      setLoading(false);
    }
  };

  // --- API ACTIONS ---
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(`${API_BASE}/api/upload/image`, formData);
    return res.data;
  };

  const getImageUrl = (icon) => {
    try {
      return typeof icon === "string" && icon.startsWith("{")
        ? JSON.parse(icon).url
        : icon;
    } catch {
      return icon;
    }
  };

  const addCategory = async () => {
    if (!newCategory.trim()) return alert("Enter a category title");
    let iconUrl = iconFile ? await uploadImage(iconFile) : "";
    try {
      await axios.post(`${API_BASE}/api/categories`, {
        title: newCategory,
        icon_url: iconUrl,
        order_index: data.length + 1,
      });
      setNewCategory("");
      setIconFile(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const addSkill = async () => {
    setLoading(true);
    if (!newSkill.skill_name.trim() || !newSkill.category_id)
      return alert("Required fields missing");
    try {
      await axios.post(`${API_BASE}/api/skills`, newSkill);
      setNewSkill({
        skill_name: "",
        percentage: "",
        emoji: "",
        print_statement: "",
        order_index: 1,
        category_id: "",
      });
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    // 1. Prompt the user for the admin DOB
    const dobInput = window.prompt(
      "Enter Admin DOB (DDMMYYYY) to confirm deletion:",
    );

    // 2. If the user clicks "Cancel" or leaves it blank, abort
    if (dobInput === null || dobInput.trim() === "") {
      setLoading(false);
      return;
    }

    // 3. Verify the DOB
    if (dobInput !== "28102003") {
      setLoading(false);
      toast("Incorrect Admin DOB. Deletion cancelled.");
      return;
    }
    await axios.delete(`${API_BASE}/api/categories/${id}`);
    fetchData();
    setLoading(false);
  };

  const deleteSkill = async (id) => {
    setLoading(true);
    // 1. Prompt the user for the admin DOB
    const dobInput = window.prompt(
      "Enter Admin DOB (DDMMYYYY) to confirm deletion:",
    );

    // 2. If the user clicks "Cancel" or leaves it blank, abort
    if (dobInput === null || dobInput.trim() === "") {
      setLoading(false);
      return;
    }

    // 3. Verify the DOB
    if (dobInput !== "28102003") {
      setLoading(false);
      toast("Incorrect Admin DOB. Deletion cancelled.");
      return;
    }
    await axios.delete(`${API_BASE}/api/skills/${id}`);
    fetchData();
    setLoading(false);
  };

  // --- NEW: EDIT SKILL LOGIC ---
  const updateSkill = async () => {
    if (!editingModal.skill_name.trim() || !editingModal.category_id) {
      return alert("Required fields missing");
    }
    setLoading(true);
    try {
      await axios.put(
        `${API_BASE}/api/skills/${editingModal.id}`,
        editingModal,
      );
      setEditingModal(null); // Close modal
      fetchData(); // Refresh list
      toast.success("Skill updated successfully!");
    } catch (err) {
      console.error("Failed to update skill:", err);
      toast.error("Failed to update skill");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!categoryToEdit.title.trim()) return toast.error("Title is required");

    setLoading(true);
    try {
      let finalIconUrl = categoryToEdit.icon_url;

      // 1. If a new file is selected, upload it first
      if (editCategoryFile) {
        finalIconUrl = await uploadImage(editCategoryFile);
      }

      // 2. Send update to API
      await axios.put(`${API_BASE}/api/categories/${categoryToEdit.id}`, {
        title: categoryToEdit.title,
        icon_url: finalIconUrl,
      });

      toast.success("Category updated!");
      setCategoryToEdit(null);
      setEditCategoryFile(null);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading message="Updating Skill Data..." />;
  }

  if (!data.length) {
    return <Empty message="No skill data found. Please add your skills." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] text-gray-100 p-6">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Skills Management
          </h1>
          <a
            href="https://emojidb.org/backend-emojis"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 rounded-lg"
          >
            <Sparkles size={18} /> Get Emojis
          </a>
        </div>

        {/* Forms Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Add Category Card */}
          <div className="bg-cyan-900/20 border border-cyan-500/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
              <Award size={20} /> Add Category
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full bg-white/5 border border-gray-600/30 rounded-lg px-4 py-3 mb-4"
            />
            <div className="flex gap-2">
              <input
                type="file"
                onChange={(e) => setIconFile(e.target.files[0])}
                className="text-sm flex-1"
              />
              <button
                onClick={addCategory}
                className="bg-cyan-500 px-6 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus size={18} />
                Add
              </button>
            </div>
          </div>

          {/* Add Skill Card */}
          <div className="bg-purple-900/20 border border-purple-500/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
              <Code size={20} /> Add Skill
            </h2>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                placeholder="Name"
                value={newSkill.skill_name}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, skill_name: e.target.value })
                }
                className="bg-white/5 border border-gray-600/30 rounded-lg px-3 py-2"
              />
              <input
                placeholder="Percentage"
                value={newSkill.percentage}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, percentage: e.target.value })
                }
                className="bg-white/5 border border-gray-600/30 rounded-lg px-3 py-2"
              />
              <input
                placeholder="Emoji"
                value={newSkill.emoji}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, emoji: e.target.value })
                }
                className="bg-white/5 border border-gray-600/30 rounded-lg px-3 py-2"
              />
              <select
                value={newSkill.category_id}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, category_id: e.target.value })
                }
                className="bg-[#1a1f3a] border border-gray-600/30 rounded-lg px-3 py-2"
              >
                <option value="">Select Category</option>
                {data.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Print Statement"
                value={newSkill.print_statement || ""}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, print_statement: e.target.value })
                }
                className="col-span-2 bg-white/5 border border-gray-600/30 rounded-lg px-3 py-2"
              ></textarea>
            </div>
            <button
              onClick={addSkill}
              className="w-full bg-purple-500 py-3 rounded-lg flex items-center justify-center gap-2"
            >
              <Save size={18} /> Save Skill
            </button>
          </div>
        </div>

        {/* Display List */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-6">
            {data.map((cat) => (
              <div
                key={cat.id}
                className="bg-white/5 border border-gray-700/30 rounded-2xl p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={getImageUrl(cat.icon_url)}
                      alt=""
                      className="w-10 h-10 object-contain"
                    />
                    <h2 className="text-2xl font-bold">{cat.title}</h2>
                  </div>
                  <div>
                    {/* Change this in your category map */}
                    <button
                      onClick={() => setCategoryToEdit(cat)} // Open the new modal
                      className="text-cyan-400 hover:text-cyan-300 p-2 transition-colors"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="text-red-400 p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                <DragDropContext onDragEnd={(res) => onDragEnd(res, cat.id)}>
                  <Droppable droppableId={String(cat.id)}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-3"
                      >
                        {cat.skill_items?.map((skill, index) => (
                          <Draggable
                            key={skill.id}
                            draggableId={String(skill.id)}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps} // container stays draggable
                                className={`flex items-center justify-between p-4 bg-white/5 border rounded-xl transition-colors ${
                                  snapshot.isDragging
                                    ? "border-cyan-500 bg-cyan-500/10"
                                    : "border-gray-700/20"
                                }`}
                              >
                                <div className="flex items-center gap-4">
                                  <div className="text-2xl">
                                    {skill.emoji || "💡"}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-semibold">
                                        {skill.skill_name}
                                      </span>
                                      <span className="text-xs text-cyan-400">
                                        {skill.percentage}
                                      </span>
                                    </div>
                                    <code className="text-[10px] text-green-400">
                                      {skill.print_statement}
                                    </code>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 ">
                                  {/* Drag handle (four dots) */}
                                  <span
                                    {...provided.dragHandleProps}
                                    className="cursor-grab text-gray-400 hover:text-white transition-colors p-1"
                                    title="Drag to reorder"
                                  >
                                    ⋮⋮
                                  </span>
                                  {/* Edit button for skill */}
                                  <button
                                    onClick={() => setEditingModal(skill)}
                                    className="text-gray-400 hover:text-cyan-400 transition-colors p-1"
                                    title="Edit skill"
                                  >
                                    <Edit2 size={16} />
                                  </button>
                                  <button
                                    onClick={() => deleteSkill(skill.id)}
                                    className="text-gray-500 hover:text-red-400"
                                  >
                                    <X size={18} />
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
              </div>
            ))}
          </div>
        )}

        {/* --- EDIT MODAL OVERLAY --- */}
        {editingModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1a1f3a] border border-cyan-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
                <Edit2 size={20} /> Edit Skill
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Skill Name
                  </label>
                  <input
                    placeholder="Name"
                    value={editingModal.skill_name}
                    onChange={(e) =>
                      setEditingModal({
                        ...editingModal,
                        skill_name: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-gray-600/30 rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Percentage / Proficiency
                  </label>
                  <input
                    placeholder="Percentage"
                    value={editingModal.percentage || ""}
                    onChange={(e) =>
                      setEditingModal({
                        ...editingModal,
                        percentage: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-gray-600/30 rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Emoji
                  </label>
                  <input
                    placeholder="Emoji"
                    value={editingModal.emoji || ""}
                    onChange={(e) =>
                      setEditingModal({
                        ...editingModal,
                        emoji: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-gray-600/30 rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Print Statement (Optional)
                  </label>
                  <textarea
                    placeholder="Print Statement"
                    value={editingModal.print_statement || ""}
                    onChange={(e) =>
                      setEditingModal({
                        ...editingModal,
                        print_statement: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-gray-600/30 rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 text-white min-h-[80px]"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setEditingModal(null)}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-gray-600/30 py-3 rounded-lg text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={updateSkill}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg text-white font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- EDIT CATEGORY MODAL --- */}
        {categoryToEdit && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[60] p-4">
            <div className="bg-[#1a1f3a] border border-cyan-500/40 rounded-3xl p-8 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                  <Award size={24} /> Edit Category
                </h2>
                <button
                  onClick={() => setCategoryToEdit(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Title Input */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Category Title
                  </label>
                  <input
                    type="text"
                    value={categoryToEdit.title}
                    onChange={(e) =>
                      setCategoryToEdit({
                        ...categoryToEdit,
                        title: e.target.value,
                      })
                    }
                    className="w-full bg-white/5 border border-gray-600/30 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500 text-white"
                  />
                </div>

                {/* Current Image Preview */}
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">
                    Icon / Image
                  </label>
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-gray-600/20">
                    <img
                      src={
                        editCategoryFile
                          ? URL.createObjectURL(editCategoryFile)
                          : getImageUrl(categoryToEdit.icon_url)
                      }
                      alt="Preview"
                      className="w-12 h-12 object-contain bg-black/20 rounded-lg p-1"
                    />
                    <div className="flex-1">
                      <input
                        type="file"
                        onChange={(e) => setEditCategoryFile(e.target.files[0])}
                        className="text-xs text-gray-400 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button
                  onClick={() => {
                    setCategoryToEdit(null);
                    setEditCategoryFile(null);
                  }}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 py-3 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateCategory}
                  className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
                >
                  <Save size={20} /> Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSkills;
