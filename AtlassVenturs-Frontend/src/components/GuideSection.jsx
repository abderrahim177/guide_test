import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Languages, Star, CheckCircle2, ArrowRight } from 'lucide-react';

const guidesData = [
  {
    id: 1,
    name: 'Youssef Ait Lahcen',
    role: 'High-Mountain Guide',
    location: 'Ait Bouguemez',
    languages: 'Arabic · French · English',
    rating: 4.9,
    reviews: 38,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Nadia El Fassi',
    role: 'Cultural Trek Leader',
    location: 'Ouzoud · Demnate',
    languages: 'Arabic · French · Spanish',
    rating: 5.0,
    reviews: 24,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    name: 'Omar Toudite',
    role: 'Trail & Canyon Specialist',
    location: 'Cathedral Rock',
    languages: 'Tamazight · French · English',
    rating: 4.8,
    reviews: 51,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
];

export default function GuidesSection() {
  const navigate = useNavigate();

  const handleGuideClick = (guide) => {
    // التوجيه لصفحة المرشد مع تمرير البيانات عبر state
    navigate(`/guides/${guide.id}`, { state: { guideData: guide } });
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-10 font-['Poppins',sans-serif] bg-[#FAF8F5]">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-widest text-[#C86D44] uppercase mb-1 block">
            MEET THE LOCALS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A2B] tracking-tight leading-tight mb-2">
            Guides who know every path
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
            Every AtlasVenture guide is local, certified, and committed to sharing the mountains with care.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/guides')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1E3A2B] hover:opacity-80 transition-opacity cursor-pointer self-start md:self-end shrink-0"
        >
          <span>Meet all guides</span>
          <ArrowRight className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {guidesData.map((guide) => (
          <div
            key={guide.id}
            className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs flex flex-col justify-between"
          >
            {/* Image Frame - الكليك هنا كيديك لصفحة المرشد */}
            <div 
              onClick={() => handleGuideClick(guide)}
              className="w-full h-64 bg-stone-100 overflow-hidden cursor-pointer group relative"
            >
              <img
                src={guide.image}
                alt={guide.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                
              </div>
            </div>

            {/* Details Section */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Header: Name + Verified Check */}
                <div className="flex items-center justify-between mb-0.5">
                  <h3 
                    onClick={() => handleGuideClick(guide)}
                    className="text-base font-bold text-[#1E3A2B] tracking-tight cursor-pointer hover:underline"
                  >
                    {guide.name}
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-[#0284C7] fill-[#0284C7]/10 stroke-[2]" />
                </div>

                {/* Role */}
                <p className="text-xs text-stone-400 mb-4">
                  {guide.role}
                </p>

                {/* Location & Languages */}
                <div className="space-y-2 text-xs text-[#C86D44]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-stone-700">{guide.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Languages className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-stone-700">{guide.languages}</span>
                  </div>
                </div>
              </div>

              {/* Footer: Rating & Action */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-stone-900">
                  <Star className="w-4 h-4 text-[#C86D44] fill-[#C86D44]" />
                  <span>
                    {guide.rating.toFixed(1)}{' '}
                    <span className="text-stone-400 font-normal">({guide.reviews})</span>
                  </span>
                </div>

                {/* زر View Profile كيديك للصفحة */}
                <button
                  type="button"
                  onClick={() => handleGuideClick(guide)}
                  className="text-[#1E3A2B] font-bold hover:underline cursor-pointer bg-transparent border-none p-0"
                >
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}