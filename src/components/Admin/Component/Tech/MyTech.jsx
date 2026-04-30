import { useEffect, useState } from "react"; 
import { toast } from "sonner";
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_URL; 

export default function MyTech() {
  const [techStack, setTechStack] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  // ✅ Fetch
  const fetchTech = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/personal/tech`);
      setTechStack(res.data);
    } catch (err) {
      toast.error("Failed to load");
    }
  };

  useEffect(() => {
    fetchTech();
  }, []);

  // ✅ Edit
  const handleEdit = (tech) => {
    setEditingId(tech.id);
    setFormData(tech);
  };

  // ✅ Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Update API call
  const handleUpdate = async (id) => {
    try {
      await axios.put(`${API_BASE}/api/personal/tech/${id}`, formData);
      console.log("Updated Tech:", formData);
      toast.success("Updated ✅");
      setEditingId(null);
      fetchTech();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl mb-4">Manage Tech</h2>

      {techStack.map((tech) => (
        <div key={tech.id} className="bg-[#0b0f1a] p-4 mb-3 rounded">

          {editingId === tech.id ?(
  <div className="bg-[#0b0f1a] border border-gray-700 rounded-2xl p-5 shadow-lg space-y-4">

    {/* Header */}
    <div className="flex items-center gap-3">
      <div className="text-3xl">{formData.icon_symbol || "✨"}</div>
      <h3 className="text-lg font-semibold text-white">Edit Tech</h3>
    </div>

    {/* Inputs */}
    <div className="grid md:grid-cols-2 gap-4">
      
      <div>
        <label className="text-sm text-gray-400">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mt-1 p-2 rounded-lg bg-[#111827] border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">Emoji</label>
        <input
          name="icon_symbol"
          value={formData.icon_symbol}
          onChange={handleChange}
          className="w-full mt-1 p-2 rounded-lg bg-[#111827] border border-gray-600 text-white focus:ring-2 focus:ring-purple-500 outline-none"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">Hex Color</label>
        <input
          name="hex_color"
          value={formData.hex_color}
          onChange={handleChange}
          className="w-full mt-1 p-2 rounded-lg bg-[#111827] border border-gray-600 text-white focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400">Code Example</label>
        <input
          name="code_example"
          value={formData.code_example}
          onChange={handleChange}
          className="w-full mt-1 p-2 rounded-lg bg-[#111827] border border-gray-600 text-white focus:ring-2 focus:ring-yellow-500 outline-none"
        />
      </div>

    </div>

    {/* Preview */}
    <div className="flex items-center gap-3 p-3 rounded-lg bg-[#111827] border border-gray-700">
      <span className="text-2xl">{formData.icon_symbol}</span>
      <div>
        <p className="font-medium">{formData.name}</p>
        <p className="text-xs text-gray-400">{formData.code_example}</p>
      </div>
      <div
        className="ml-auto w-5 h-5 rounded-full"
        style={{ background: formData.hex_color }}
      ></div>
    </div>

    {/* Buttons */}
    <div className="flex justify-end gap-3 pt-2">
      <button
        onClick={() => setEditingId(null)}
        className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition"
      >
        Cancel
      </button>

      <button
        onClick={() => handleUpdate(tech.id)}
        className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition"
      >
        Save Changes
      </button>
    </div>

  </div>
) : (
            <div className="flex justify-between">
              <div>
                {tech.icon_symbol} {tech.name}
              </div>
              <button onClick={() => handleEdit(tech)}>Edit</button>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}