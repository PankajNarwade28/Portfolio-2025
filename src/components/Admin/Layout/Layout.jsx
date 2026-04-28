import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Snowfall from "react-snowfall";
import { Outlet } from "react-router-dom";

// Standardized to w-64 to match your original Sidebar design
const SIDEBAR_WIDTH = "w-64"; 

const Layout = ({ user, onLogout }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-900 text-white relative">
      
      {/* ✅ Sidebar (Stays fixed on the left naturally via flex) */}
      <aside className={`${SIDEBAR_WIDTH} flex-shrink-0 h-full border-r border-slate-800 z-40`}>
        <Sidebar />
      </aside>

      {/* ✅ Main Section (Takes up the rest of the screen) */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative z-30">
        
        {/* ✅ Navbar (Sits naturally at the top of the flex-col) */}
        <header>
          <Navbar user={user} onLogout={onLogout} />
        </header>

        {/* ✅ Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>

      {/* ✅ Snow (Overlays everything naturally) */}
      <Snowfall snowflakeCount={20} className="!fixed inset-0 pointer-events-none z-50" />
    </div>
  );
};

export default Layout;