import { useEffect, useState } from "react";
import axios from "axios"; 
import StatusCard from "../../Layout/StatusCard/StatusCard";

const Dashboard = () => {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [dbStatus, setDbStatus] = useState("Checking...");

  const fetchStatus = async () => {
    try {
      const res1 = await axios.get(
        "http://localhost:5000/api/status/backend"
      );
      setBackendStatus(res1.data.status);
    } catch {
      setBackendStatus("OFFLINE");
    }

    try {
      const res2 = await axios.get(
        "http://localhost:5000/api/status/database"
      );
      setDbStatus(res2.data.status);
    } catch {
      setDbStatus("DISCONNECTED");
    }
  };

  useEffect(() => {
    fetchStatus();

    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      {/* Top Cards */}
      <div className="flex gap-6 flex-wrap">
        <StatusCard title="Backend Server" status={backendStatus} />
        <StatusCard title="Database (Supabase)" status={dbStatus} />
      </div>
    </div>
  );
};

export default Dashboard;