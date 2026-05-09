import { NavLink,useNavigate } from "react-router-dom"; 
import { ExternalLink } from "lucide-react"; // Optional: assumes you use lucide-react
const Sidebar = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const baseStyle = "p-3 rounded-lg text-left transition duration-200";
  const activeStyle = "bg-slate-800 text-white";
  const inactiveStyle = "text-gray-300 hover:bg-slate-800";

  return (
    // Changed w-64 to w-full and h-screen to h-full
    <div className="w-full h-full bg-slate-900 text-white flex flex-col p-5">
      <div
        className="mobile-logo mb-6 flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105"
        onClick={() => navigate("/admin")} // Internal routing, no reload
      >
        <img
          src="../../assets/images/logo3.png"
          alt="Portfolio Logo"
          className="w-12 h-12 object-contain transition-opacity ml-3 duration-300 hover:opacity-80"
        />
        <span className="font-semibold text-gray-200 transition-colors duration-300 hover:text-blue-400">
          PORTFOLIO CMS
        </span>
      </div>

      <nav className="flex flex-col gap-4">
        {/* <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          Dashboard
        </NavLink> */}
        <NavLink
          to="/admin/my-about"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/admin/my-projects"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/admin/my-certificates"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          Certificates
        </NavLink>
        <NavLink
          to="/admin/my-skills"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          Skills
        </NavLink>

        <NavLink
          to="/admin/my-education"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          Education
        </NavLink>

        <NavLink
          to="/admin/my-achievements"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          Achievements
        </NavLink>

        <NavLink
          to="/admin/my-tech"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          Tech Stack
        </NavLink>
        <NavLink
          to="/admin/my-links"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          Social Links
        </NavLink>

        {/* Unique Floating Icon Button */}
      <NavLink
        to="/"
        className="absolute bottom-6 left-10 flex items-center justify-center w-14 h-14 
                   bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg 
                   shadow-blue-900/50 transition-all duration-300 hover:scale-110 
                   active:scale-95 group"
        title="View Portfolio"
      >
        <ExternalLink size={24} className="group-hover:rotate-12 transition-transform" />
        
        {/* Tooltip for better UX */}
        <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all 
                         bg-slate-800 text-xs py-2 px-3 rounded-md whitespace-nowrap">
          Back to Portfolio
        </span>
      </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
