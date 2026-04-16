import { useEffect, useState } from "react";
import axios from "axios";

const ManageSkills = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for Category Form
  const [newCategory, setNewCategory] = useState("");
  const [iconFile, setIconFile] = useState(null);

  // State for Skill Form
  const [newSkill, setNewSkill] = useState({
    skill_name: "",
    percentage: "",
    emoji: "",
    print_statement: "", // Added to match your JSX
    order_index: 1,
    category_id: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/categories"); 
      setData(res.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/upload/image", {
      method: "POST",
      body: formData,
    });

    return await res.json();
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

    let iconUrl = "";
    if (iconFile) {
      iconUrl = await uploadImage(iconFile);
    }

    try {
      await axios.post("http://localhost:5000/api/categories", {
        title: newCategory,
        icon_url: iconUrl,
        order_index: data.length + 1,
      });

      setNewCategory("");
      setIconFile(null);
      fetchData();
    } catch (err) {
      console.error("Add category failed", err);
    }
  };

  const addSkill = async () => {
    if (!newSkill.skill_name.trim() || !newSkill.category_id) {
      return alert("Skill name and Category are required");
    }

    try {
      await axios.post("http://localhost:5000/api/skills", newSkill);
      // Reset form
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
      console.error("Add skill failed", err);
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure? This will delete the category.")) {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchData();
    }
  };
  const deleteSkill = async (id) => {
    if (window.confirm("Are you sure? This will delete the skill.")) {
      
    await axios.delete(`http://localhost:5000/api/skills/${id}`); 
    fetchData();
    }
    
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
    <div className="flex">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Skills Management
      </h1>
        <a href="https://emojidb.org/backend-emojis" target="_blank" rel="noopener noreferrer" className="ml-auto text-blue-600 hover:underline">Get Your Emojis Here </a>
          
    </div>
      {/* --- Add Category --- */}
      <div className="mb-10 p-4 border rounded-lg bg-blue-50">
        <h2 className="text-sm font-bold uppercase text-blue-600 mb-3">
          Add Category
        </h2>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Category Title"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border p-2 rounded flex-1 min-w-[200px]"
          />
          <input
            type="file"
            onChange={(e) => setIconFile(e.target.files[0])}
            className="text-sm self-center"
          />
          <button
            onClick={addCategory}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* --- Add Skill --- */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
        <h2 className="text-sm font-bold uppercase text-gray-600 mb-3">
          Add Skill
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <input
            placeholder="Skill Name"
            value={newSkill.skill_name}
            onChange={(e) =>
              setNewSkill({ ...newSkill, skill_name: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            placeholder="Percentage (e.g. 90%)"
            value={newSkill.percentage}
            onChange={(e) =>
              setNewSkill({ ...newSkill, percentage: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            placeholder="Emoji (✨)"
            value={newSkill.emoji}
            onChange={(e) =>
              setNewSkill({ ...newSkill, emoji: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            placeholder="Print Statement (console.log...)"
            value={newSkill.print_statement}
            onChange={(e) =>
              setNewSkill({ ...newSkill, print_statement: e.target.value })
            }
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Order Index"
            value={newSkill.order_index}
            onChange={(e) =>
              setNewSkill({ ...newSkill, order_index: Number(e.target.value) })
            }
            className="border p-2 rounded"
          />
          <select
            onChange={(e) =>
              setNewSkill({ ...newSkill, category_id: e.target.value })
            }
            className="border p-2 rounded"
          >
            <option value="">Select Category</option>

            {data.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={addSkill}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Save Skill
        </button>
      </div>

      <hr className="mb-8" />

      {/* --- Display logic --- */}
      {loading ? (
        <p className="text-center text-gray-500 py-10">
          Loading portfolio data...
        </p>
      ) : data.length === 0 ? (
        <div className="text-center p-10 border-2 border-dashed rounded-lg">
          <p className="text-gray-500 text-lg">
            Empty! Create your first category to get started.
          </p>
        </div>
      ) : (
        data.map((cat) => (
          <div
            key={cat.id}
            className="mb-6 p-4 border rounded bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <div className="flex items-center gap-3">
                {cat.icon_url && (
                    
                  <img
                    src={getImageUrl(cat.icon_url)  || cat.icon_url}
                    alt=""
                    className="w-6 h-6 object-contain"
                  />
                )}
                <h2 className="font-bold text-xl text-gray-800">{cat.title}</h2>
              </div>
              <button
                onClick={() => deleteCategory(cat.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Delete Category
              </button>
            </div>

            <div className="space-y-3">
              {!cat.skill_items || cat.skill_items.length === 0 ? (
                <p className="text-sm italic text-gray-400">
                  No skills added yet.
                </p>
              ) : (
                cat.skill_items.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded border border-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{skill.emoji || "💡"}</span>
                      <span className="font-medium text-gray-700">
                        {skill.skill_name}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({skill.percentage})
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      {skill.print_statement && (
                        <code className="hidden sm:block text-[10px] bg-gray-800 text-green-400 px-2 py-1 rounded">
                          {skill.print_statement}
                        </code>
                      )}
                      <button
                        onClick={() => deleteSkill(skill.id)}
                        className="text-red-400 hover:text-red-600 font-bold px-2"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageSkills;
