import { useEffect, useState } from "react";
import { Trash2, Plus, Edit2, Save, X, Upload, Sparkles, Code, Award } from 'lucide-react';
 
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
     <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] text-gray-100 p-6">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>
 
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Skills Management
            </h1>
            <p className="text-gray-400 text-sm">Manage your professional skillset with style</p>
          </div>
          <a 
            href="https://emojidb.org/backend-emojis" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
          >
            <Sparkles size={18} />
            <span className="text-sm font-medium">Get Emojis</span>
          </a>
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Add Category Card */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Award className="text-cyan-400" size={24} />
              </div>
              <h2 className="text-xl font-bold text-cyan-400">Add Category</h2>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Category Title (e.g., Frontend Development)"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-white/5 border border-gray-600/30 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
              
              <div className="flex items-center gap-3">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3 bg-white/5 border border-gray-600/30 rounded-lg px-4 py-3 hover:border-cyan-500/50 transition-all">
                    <Upload size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {iconFile ? iconFile.name : 'Upload Icon'}
                    </span>
                  </div>
                  <input
                    type="file"
                    onChange={(e) => setIconFile(e.target.files[0])}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
                
                <button
                  onClick={addCategory}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg hover:shadow-cyan-500/50 flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>
            </div>
          </div>
 
          {/* Add Skill Card */}
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Code className="text-purple-400" size={24} />
              </div>
              <h2 className="text-xl font-bold text-purple-400">Add Skill</h2>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Skill Name"
                  value={newSkill.skill_name}
                  onChange={(e) => setNewSkill({ ...newSkill, skill_name: e.target.value })}
                  className="bg-white/5 border border-gray-600/30 rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
                <input
                  placeholder="Percentage (90%)"
                  value={newSkill.percentage}
                  onChange={(e) => setNewSkill({ ...newSkill, percentage: e.target.value })}
                  className="bg-white/5 border border-gray-600/30 rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  placeholder="Emoji (✨)"
                  value={newSkill.emoji}
                  onChange={(e) => setNewSkill({ ...newSkill, emoji: e.target.value })}
                  className="bg-white/5 border border-gray-600/30 rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
                <input
                  type="number"
                  placeholder="Order Index"
                  value={newSkill.order_index}
                  onChange={(e) => setNewSkill({ ...newSkill, order_index: Number(e.target.value) })}
                  className="bg-white/5 border border-gray-600/30 rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              
              <input
                placeholder="Print Statement (console.log...)"
                value={newSkill.print_statement}
                onChange={(e) => setNewSkill({ ...newSkill, print_statement: e.target.value })}
                className="w-full bg-white/5 border border-gray-600/30 rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
              
              <select
                onChange={(e) => setNewSkill({ ...newSkill, category_id: e.target.value })}
                value={newSkill.category_id}
                className="w-full bg-white/5 border border-gray-600/30 rounded-lg px-4 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
              >
                <option value="" className="bg-[#1a1f3a]">Select Category</option>
                {data.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-[#1a1f3a]">
                    {cat.title}
                  </option>
                ))}
              </select>
              
              <button
                onClick={addSkill}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2"
              >
                <Save size={18} />
                Save Skill
              </button>
            </div>
          </div>
        </div>
 
        {/* Categories and Skills Display */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400">Loading portfolio data...</p>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20 bg-white/5 backdrop-blur-sm border-2 border-dashed border-gray-600/30 rounded-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={32} className="text-cyan-400" />
            </div>
            <p className="text-gray-400 text-lg mb-2">No categories yet</p>
            <p className="text-gray-500 text-sm">Create your first category to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {data.map((cat) => (
              <div
                key={cat.id}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-cyan-500/30 transition-all duration-300 group"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700/30">
                  <div className="flex items-center gap-4">
                    {cat.icon_url && (
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300">
                        <img
                          src={getImageUrl(cat.icon_url) || cat.icon_url}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        {cat.title}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        {cat.skill_items?.length || 0} skills
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-300 flex items-center gap-2 border border-red-500/20 hover:border-red-500/40"
                  >
                    <Trash2 size={16} />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
 
                {/* Skills List */}
                <div className="space-y-3">
                  {!cat.skill_items || cat.skill_items.length === 0 ? (
                    <div className="text-center py-8 bg-white/[0.02] rounded-xl border border-dashed border-gray-700/30">
                      <p className="text-sm text-gray-500">No skills added yet</p>
                    </div>
                  ) : (
                    cat.skill_items.map((skill, index) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between bg-gradient-to-r from-white/[0.03] to-transparent hover:from-cyan-500/10 hover:to-purple-500/5 p-4 rounded-xl border border-gray-700/20 hover:border-cyan-500/30 transition-all duration-300 group/skill"
                        style={{animationDelay: `${index * 50}ms`}}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-xl group-hover/skill:scale-110 transition-transform duration-300">
                            {skill.emoji || "💡"}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-semibold text-gray-200">
                                {skill.skill_name}
                              </span>
                              <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
                                {skill.percentage}
                              </span>
                            </div>
                            {skill.print_statement && (
                              <code className="text-xs bg-gray-900/50 text-green-400 px-3 py-1 rounded border border-green-500/20 font-mono inline-block">
                                {skill.print_statement}
                              </code>
                            )}
                          </div>
                        </div>
 
                        <button
                          onClick={() => deleteSkill(cat.id, skill.id)}
                          className="w-8 h-8 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-300 flex items-center justify-center border border-red-500/20 hover:border-red-500/40 opacity-0 group-hover/skill:opacity-100"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSkills;
