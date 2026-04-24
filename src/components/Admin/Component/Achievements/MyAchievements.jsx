import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  HiOutlinePlus, HiOutlineTrash, HiOutlinePencilAlt, HiOutlineSave } from 'react-icons/hi'; 
import Loading from '../LoadingEmpty/MyLoading';
import Empty from '../LoadingEmpty/MyEmpty';
const API_BASE = process.env.REACT_APP_API_URL;

const MyAchievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null); 
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        year: new Date().getFullYear(),
        category: 'Academic',
        emoji: '🏆',
        common_highlight: 'These achievements represent my dedication to continuous learning and excellence in technology. Each milestone has shaped my growth as a developer and problem solver.'
    });

    // Fetch achievements on load
    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        setLoading(true);
        try {
        const res = await axios.get(`${API_BASE}/api/achievements`);
        console.log("Fetched achievements:", res.data);
        setAchievements(res.data);
    } catch (err) {
        console.error("Error fetching achievements:", err);
    } finally {
        setLoading(false);
    }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editId) {
                await axios.put(`${API_BASE}/api/achievements/${editId}`, formData);
            } else {
                await axios.post(`${API_BASE}/api/achievements`, formData);
            }
            setFormData({ ...formData, title: '', description: '' });
            setEditId(null);
            fetchAchievements();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteAchievement = async (id) => {
      setLoading(true);
      try {
        if (window.confirm('Delete this milestone?')) {
            await axios.delete(`${API_BASE}/api/achievements/${id}`);
            fetchAchievements();
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFormData({ ...formData, title: '', description: '' });
        setLoading(false);
      }
    };

    if(loading){
      return <Loading message={editId ? "Updating Achievement..." : "Getting Achievement..."} />;
    }

    if(!loading && achievements.length === 0)
    {
      return <Empty title="No achievements found." description="Please check Database or Backend Hosting for Achievements Data." onRetry={fetchAchievements} />;
    }
    return (
        <div className="min-h-screen bg-[#0b0f1a] text-white p-6 md:p-12 font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* FORM COLUMN */}
                <div className="lg:col-span-5">
                    <div className="bg-[#161b2c] p-8 rounded-[2rem] border border-white/5 sticky top-10">
                        <h2 className="text-2xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                            {editId ? 'Edit Milestone' : 'Add Achievement'}
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input 
                                className="w-full bg-[#111827] border border-white/5 p-4 rounded-xl outline-none focus:border-purple-500 transition-all"
                                placeholder="Title (e.g. BCA Topper)"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                required
                            />
                            <textarea 
                                className="w-full bg-[#111827] border border-white/5 p-4 rounded-xl outline-none focus:border-purple-500 transition-all h-24 resize-none"
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input 
                                    type="number"
                                    className="bg-[#111827] border border-white/5 p-4 rounded-xl outline-none"
                                    value={formData.year}
                                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                                />
                                <input 
                                    className="bg-[#111827] border border-white/5 p-4 rounded-xl outline-none"
                                    placeholder="Emoji (🏆)"
                                    value={formData.emoji}
                                    onChange={(e) => setFormData({...formData, emoji: e.target.value})}
                                />
                            </div>
                            <div className="space-y-2">
  <label className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
     Achievement Category
  </label>
  <select
    name="category"
    value={formData.category}
    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
    className="w-full bg-[#111827] border border-white/5 focus:border-purple-500 p-4 rounded-xl text-sm font-medium outline-none transition-all appearance-none cursor-pointer"
  >
    <option value="Academic" className="bg-[#111827]">Academic</option>
    <option value="Technical" className="bg-[#111827]">Technical</option>
    <option value="Programming" className="bg-[#111827]">Programming</option>
    <option value="Open Source" className="bg-[#111827]">Open Source Contribution</option>
    <option value="Leadership" className="bg-[#111827]">Leadership & Voluntering</option>
    <option value="Work" className="bg-[#111827]">Professional / Internship</option>
  </select>
</div>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-purple-600 hover:bg-purple-500 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                            >
                                {editId ? <HiOutlineSave /> : <HiOutlinePlus />}
                                {loading ? 'Processing...' : editId ? 'Update Achievement' : 'Deploy Achievement'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* LIST COLUMN */}
                <div className="lg:col-span-7 space-y-4">
                    {achievements.map((item) => (
                        <div key={item.id} className="bg-[#161b2c] p-6 rounded-2xl border border-white/5 flex justify-between items-center group">
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{item.emoji}</span>
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                    <span className="text-xs text-gray-500 font-mono">[{item.year}]</span>
                                </div>
                                <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => { setEditId(item.id); setFormData(item); }}
                                    className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg hover:bg-cyan-500 hover:text-white"
                                >
                                    <HiOutlinePencilAlt />
                                </button>
                                <button 
                                    onClick={() => deleteAchievement(item.id)}
                                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white"
                                >
                                    <HiOutlineTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyAchievements;