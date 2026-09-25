import { CheckCircle2, Languages, MapPin, Star } from "lucide-react";

const staticImages = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
];
const Guide = ({ item, handleGuideClick }) => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs flex flex-col justify-between">
      <div
        onClick={() => handleGuideClick(item)}
        className="w-full h-64 bg-stone-100 overflow-hidden cursor-pointer group relative"
      >
        <img
          src={staticImages[item.id % staticImages.length]}
          alt={item.guide?.id}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header: Name + Verified Check */}
          <div className="flex items-center justify-between mb-0.5">
            <h3
              onClick={() => handleGuideClick(item)}
              className="text-base font-bold text-[#1E3A2B] tracking-tight cursor-pointer hover:underline"
            >
              {item.guide?.name}
            </h3>
            <CheckCircle2 className="w-4 h-4 text-[#0284C7] fill-[#0284C7]/10 stroke-[2]" />
          </div>

          {/* Role / Activity Name */}
          <p className="text-xs text-stone-400 mb-4 capitalize">
            {item.activity?.name
              ? `${item.activity.name} Specialist`
              : "Mountain Guide"}
          </p>

          {/* Location & Languages */}
          <div className="space-y-2 text-xs text-[#C86D44]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="text-stone-700 capitalize">
                {item.region?.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Languages className="w-3.5 h-3.5 shrink-0" />
              <span className="text-stone-700">Arabic · French · English</span>
            </div>
          </div>
        </div>

        {/* Footer: Price & Rating */}
        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-stone-900">
            <Star className="w-4 h-4 text-[#C86D44] fill-[#C86D44]" />
            <span>
              4.9 <span className="text-stone-400 font-normal">(38)</span>
            </span>
          </div>

          <span className="font-bold text-[#1E3A2B]">
            {item.price_per_day} MAD / day
          </span>
        </div>
      </div>
    </div>
  );
};

export default Guide;
