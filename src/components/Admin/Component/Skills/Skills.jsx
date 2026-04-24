import { useEffect, useState } from "react";
import { Trash2, Plus, Save, X, Sparkles, Code, Award } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import Loading from "../LoadingEmpty/Loading";
import Empty from "../LoadingEmpty/Empty";
const API_BASE = process.env.REACT_APP_API_URL; 
const ManageSkills = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for Category Form
  const [newCategory, setNewCategory] = useState("");
  const [iconFile, setIconFile] = useState(null);

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
      const response = await axios.put(
        `${API_BASE}/api/skills/reorder`,
        {
          items: updatedItems,
        },
      );
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
    }finally {
      setLoading(false);
    }
  };

  // --- API ACTIONS ---
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(
      `${API_BASE}/api/upload/image`,
      formData,
    );
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
    if (window.confirm("Delete category?")) {
      await axios.delete(`${API_BASE}/api/categories/${id}`);
      fetchData();
    }
    setLoading(false);
  };

  const deleteSkill = async (id) => {
    setLoading(true);
    if (window.confirm("Delete skill?")) {
      await axios.delete(`${API_BASE}/api/skills/${id}`);
      fetchData();
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Loading message="Updating Skill Data..." />
    )
  }

  if(!data.length) {
    return (
      <Empty message="No skill data found. Please add your skills." />
    )
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
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="text-red-400 p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* DRAG AND DROP AREA */}
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
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`flex items-center justify-between p-4 bg-white/5 border rounded-xl transition-colors ${snapshot.isDragging ? "border-cyan-500 bg-cyan-500/10" : "border-gray-700/20"}`}
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
                                <button
                                  onClick={() => deleteSkill(skill.id)}
                                  className="text-gray-500 hover:text-red-400"
                                >
                                  <X size={18} />
                                </button>
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
      </div>
    </div>
  );
};

export default ManageSkills;
