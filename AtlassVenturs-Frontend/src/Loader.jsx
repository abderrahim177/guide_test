import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#111612] text-[#FAF9F6] transition-opacity duration-700">
      <div className="relative flex items-center justify-center w-24 h-24 mb-6">
        <div className="absolute inset-0 border-4 border-dashed border-[#FAF9F6]/20 rounded-full animate-[spin_8s_linear_infinite]"></div>
        
        <div className="absolute inset-2 border-2 border-emerald-500 border-t-transparent rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
        
        <div className="w-8 h-8 bg-emerald-600 rounded-lg rotate-45 animate-pulse shadow-lg flex items-center justify-center">
          <div className="w-3 h-3 bg-[#111612] rounded-full"></div>
        </div>
      </div>

      <h2 className="text-sm font-bold tracking-widest uppercase text-emerald-400 animate-pulse">
        AtlasVenture
      </h2>
      <p className="text-[11px] text-gray-400 mt-1">Préparation de votre voyage...</p>
    </div>
  );
};

export default Loader;