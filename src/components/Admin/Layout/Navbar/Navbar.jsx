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

        <button
    onClick={onLogout}
    className=" flex items-center justify-between w-full px-5 py-3 
               bg-gradient-to-r from-orange-600 to-red-600 
               hover:from-orange-500 hover:to-red-500 
               text-white rounded-xl font-bold shadow-lg 
               shadow-orange-900/30 transition-all duration-300 
               hover:translate-x-1 active:scale-[0.98] group"
  >
    <span className="tracking-wider">LOGOUT </span>
    <LogOut 
      size={20} 
      className="group-hover:translate-x-1 transition-transform duration-300" 
    />
  </button>
      </div>
    </nav>
  );
};

export default Navbar;