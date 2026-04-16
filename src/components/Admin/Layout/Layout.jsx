import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Snowfall from 'react-snowfall'
import { Outlet } from "react-router-dom";

const Layout = ({ user, onLogout }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Sidebar - FIXED */}
      <div className="w-64 fixed h-full">
        <Sidebar />
      </div>

      {/* Main Section */}
      <div className="flex-1 ml-64 flex flex-col">
        
        {/* Navbar - FIXED */}
        <div className="fixed top-0 left-64 right-0 z-50">
          <Navbar user={user} onLogout={onLogout} />
        </div>

        {/* Scrollable Content */}
        <div className="mt-16 overflow-y-auto h-screen">
          <Outlet />
        </div>

      </div>
      <Snowfall 
      snowflakeCount={30}/>
    </div>
  );
};

export default Layout;