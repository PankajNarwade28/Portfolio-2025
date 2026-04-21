import React from 'react';

const Empty = ({ 
  title = "Data Stream Offline", 
  description = "The requested information could not be retrieved from the database.", 
  onRetry 
}) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-[#161e31]  border border-[#45cba7]/10 p-10 text-center shadow-2xl">
      {/* Visual Indicator */}
      <div className="mb-8 relative">
        <div className="w-24 h-24 rounded-[2rem] bg-slate-800/50 flex items-center justify-center border border-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-500">
          <span className="text-4xl filter grayscale opacity-40">📂</span>
        </div>
        {/* Decorative Glow */}
        <div className="absolute -inset-4 bg-[#45cba7]/5 blur-2xl rounded-full -z-10" />
      </div>

      <div className="max-w-sm space-y-3">
        <h2 className="text-[#45cba7] text-2xl font-black tracking-tight uppercase">
          {title}
        </h2>
        <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
          "{description}"
        </p>
      </div>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="mt-10 px-10 py-4 rounded-2xl bg-transparent border-2 border-[#45cba7]/50 text-[#45cba7] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#45cba7] hover:text-[#161e31] hover:border-[#45cba7] transition-all duration-300 active:scale-95 shadow-lg shadow-[#45cba7]/5"
        >
          Re-establish Link
        </button>
      )}
    </div>
  );
};

export default Empty;