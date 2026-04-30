import { useEffect, useState } from "react";
import axios from "axios"; 
import StatusCard from "../../Layout/StatusCard/StatusCard";
import { HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineMail } from "react-icons/hi";

const API_BASE = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [dbStatus, setDbStatus] = useState("Checking...");
  
  // New state for database summary
  const [summary, setSummary] = useState({
    counts: { certifications: 0, projects: 0, messages: 0 },
    recentActivity: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const res1 = await axios.get(`${API_BASE}/api/status/backend`);
      setBackendStatus(res1.data.status);
    } catch {
      setBackendStatus("OFFLINE");
    }

    try {
      const res2 = await axios.get(`${API_BASE}/api/status/database`);
      setDbStatus(res2.data.status);
    } catch {
      setDbStatus("DISCONNECTED");
    }
  };

  // Fetch summary data from your new backend endpoint
  const fetchSummary = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/dashboard/summary`);
      setSummary(res.data);
    } catch (error) {
      console.error("Failed to fetch dashboard summary", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    fetchSummary();

    const interval = setInterval(fetchStatus, 30000); // Check status every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 text-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Admin Dashboard</h1>
        <p className="text-sm text-gray-400">System status and portfolio overview.</p>
      </div>

      {/* SECTION 1: System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatusCard title="Backend Server" status={backendStatus} />
        <StatusCard title="Database (Supabase)" status={dbStatus} />
      </div>

      {/* SECTION 2: Database Summary Stats */}
      <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-700 pb-2">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center gap-4 shadow-lg">
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
            <HiOutlineAcademicCap size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Certifications</p>
            <h3 className="text-2xl font-bold">{isLoading ? "-" : summary.counts.certifications}</h3>
          </div>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center gap-4 shadow-lg">
          <div className="p-3 bg-purple-500/20 text-purple-400 rounded-lg">
            <HiOutlineBriefcase size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Projects</p>
            <h3 className="text-2xl font-bold">{isLoading ? "-" : summary.counts.projects}</h3>
          </div>
        </div>

        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center gap-4 shadow-lg">
          <div className="p-3 bg-green-500/20 text-green-400 rounded-lg">
            <HiOutlineMail size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-400">New Messages</p>
            <h3 className="text-2xl font-bold">{isLoading ? "-" : summary.counts.messages}</h3>
          </div>
        </div>

      </div>

      {/* SECTION 3: Recent Activity / Data List */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg overflow-hidden">
        <div className="p-5 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">Recent Certifications</h2>
        </div>
        <div className="p-0 overflow-x-auto">
          {isLoading ? (
            <div className="p-6 text-center text-gray-400">Loading data...</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/50 text-gray-400">
                <tr>
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Issuer</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {summary.recentActivity.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-700/30 transition">
                    <td className="p-4 font-medium text-gray-200">{item.title}</td>
                    <td className="p-4 text-gray-400">{item.issuer}</td>
                    <td className="p-4 text-gray-400">{item.date}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${item.type === 'certification' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                        {item.type}
                      </span>
                    </td>
                  </tr>
                ))}
                {summary.recentActivity.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-6 text-center text-gray-500">No recent activity found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;