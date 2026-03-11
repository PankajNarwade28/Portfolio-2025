import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../util/auth";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      console.log("❌ Not authenticated, redirecting to home");
      navigate("/", { replace: true });
    } else {
      const userData = authService.getUser();
      setUser(userData);
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    console.log("✅ Logged out successfully");
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div style={{ textAlign: "center", padding: "2rem", color: "#00ff88" }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          {user && <p className="admin-user">Welcome, {user.username}!</p>}
        </div>
        <div className="admin-header-actions">
          <span className="admin-badge">HIGH RISK</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="admin-cards">
        <div className="admin-card">
          <h3>Users</h3>
          <p>128</p>
        </div>
        <div className="admin-card">
          <h3>Projects</h3>
          <p>12</p>
        </div>
        <div className="admin-card danger">
          <h3>Server Status</h3>
          <p>ONLINE</p>
        </div>
        <div className="admin-card">
          <h3>Messages</h3>
          <p>5</p>
        </div>
      </div>

      {/* Actions */}
      <div className="admin-actions">
        <button>Manage Users</button>
        <button>Manage Content</button>
        <button className="danger-btn">Shutdown Server</button>
      </div>
    </div>
  );
};

export default Admin;
