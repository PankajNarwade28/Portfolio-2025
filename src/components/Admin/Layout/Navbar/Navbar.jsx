import { LogOut, LayoutDashboard } from "lucide-react";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="flex justify-between items-center px-8 py-3 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] text-gray-100 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-900/10">
      
      {/* Brand Identity (Matching your logo style) */}
      <div className="flex items-center gap-3">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-cyan-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-[#0d0f26] p-1.5 rounded-lg border border-white/10">
            <LayoutDashboard className="text-cyan-400" size={20} />
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">
            Portfolio <span className="text-orange-400">.</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest leading-none">
            {user?.role || "Full Stack Dev"}
          </p>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        {/* User Display - Styled like your 'Home' pill */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/30">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm font-semibold text-cyan-400">
            {user?.username || "Admin"}
          </span>
        </div>

        {/* Logout - Styled like your 'CV' button */}
        <button
          onClick={onLogout}
          className="group flex items-center gap-2 px-6 py-2 rounded-full font-bold text-white text-sm bg-gradient-to-r from-cyan-500 to-orange-400 hover:from-cyan-400 hover:to-orange-300 transition-all duration-300 shadow-lg shadow-cyan-500/20 active:scale-95"
        >
          <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
          LOGOUT
        </button>
      </div>
    </nav>
  );
};

export default Navbar;