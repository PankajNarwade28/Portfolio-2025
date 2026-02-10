import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin-dashboard">
      {/* Header */}
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <span className="admin-badge">HIGH RISK</span>
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
