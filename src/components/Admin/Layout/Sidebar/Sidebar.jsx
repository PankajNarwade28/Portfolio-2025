import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const baseStyle = "p-3 rounded-lg text-left transition duration-200";
  const activeStyle = "bg-slate-800 text-white";
  const inactiveStyle = "text-gray-300 hover:bg-slate-800";

  return (
    // Changed w-64 to w-full and h-screen to h-full
    <div className="w-full h-full bg-slate-900 text-white flex flex-col p-5">
      <h2 className="text-2xl font-bold mb-8">Patil CMS</h2>

      <nav className="flex flex-col gap-4">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          Dashboard
        </NavLink>
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

        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
          }
        >
          View Portfolio
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
