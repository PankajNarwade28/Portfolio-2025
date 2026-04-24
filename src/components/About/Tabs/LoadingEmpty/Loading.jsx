import React from 'react';

const Loading = ({ message = "Synchronizing Data..." }) => {
  return (
    <div className="min-h-[600px] w-full flex flex-col items-center justify-center space-y-6 bg-[#0f172a] rounded-[2.5rem] border border-white/5 transition-all duration-500">
      {/* Themed Spinner Core */}
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Ring */}
        <div className="w-20 h-20 border-4 border-[#45cba7]/10 border-t-[#45cba7] rounded-full animate-spin" />
        
        {/* Inner Pulsing Orb */}
        <div className="absolute w-10 h-10 bg-[#45cba7]/20 rounded-full animate-pulse blur-sm" />
        <div className="absolute w-4 h-4 bg-[#45cba7] rounded-full shadow-[0_0_15px_#45cba7]" />
      </div>
      
      <div className="space-y-2 text-center">
        <span className="text-[#45cba7] font-black uppercase tracking-[0.4em] text-[10px] block animate-pulse">
          Live Connection
        </span>
        <h2 className="text-white/70 font-bold text-lg tracking-tight">
          {message}
        </h2>
      </div>
    </div>
  );
};

export default Loading;