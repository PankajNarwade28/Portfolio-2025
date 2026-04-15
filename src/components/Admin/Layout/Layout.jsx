import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

 
    

import { Outlet } from "react-router-dom";

const Layout = ({ user, onLogout }) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-slate-100 min-h-screen">
        <Navbar user={user} onLogout={onLogout} />

        {/* THIS IS IMPORTANT */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;