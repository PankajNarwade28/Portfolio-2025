import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../util/auth";  
import AdminLayout from "./Layout/Layout";
import Dashboard from "./Component/Dashboard/Dashboard"; 
const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/");
    } else {
      setUser(authService.getUser());
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <AdminLayout user={user} onLogout={handleLogout}>
      <Dashboard />
    </AdminLayout>
  );
};

export default Admin;