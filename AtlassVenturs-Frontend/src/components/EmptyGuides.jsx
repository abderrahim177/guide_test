import React from 'react';
import { Compass, SearchX } from 'lucide-react';

const EmptyState = ({ message, onReset }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4 bg-white rounded-2xl border border-stone-200/60 shadow-sm my-6 text-center">
      {/* Icon Container */}
      <div className="relative mb-4">
        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-[#1C3A27]">
          <Compass className="w-8 h-8 opacity-40 animate-pulse" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm border border-stone-100 text-rose-500">
          <SearchX className="w-4 h-4" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-stone-800 tracking-tight mb-1">
        No Guides Found
      </h3>

      {/* Description */}
      <p className="text-xs text-stone-500 max-w-sm leading-relaxed mb-6">
        {message || "We couldn't find any local guides matching your search criteria. Try adjusting your filters or search terms."}
      </p>

      {/* Action Button (Optional Reset Filter) */}
      {onReset && (
        <button
          onClick={onReset}
          className="bg-[#1C3A27] hover:bg-[#152c1e] text-white text-xs font-medium px-5 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;