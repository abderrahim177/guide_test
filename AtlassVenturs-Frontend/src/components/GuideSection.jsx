import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapPin, Languages, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import EmptyGuide from './EmptyGuides';
import axios from 'axios';
import Guide from './Guide';

const guideExample =   {
            "id": 2,
            "user_id": 13,
            "region_id": 1,
            "activity_id": 2,
            "title": "",
            "description": "",
            "price_per_day": "230.00",
            "created_at": null,
            "updated_at": null,
            "guide": {
                "id": 13,
                "name": "Nadia ElFassi",
                "email": "NadiaElFassi@gmail.com",
                "email_verified_at": null,
                "role_id": 2,
                "avatar": null,
                "phone": "0661221329",
                "bio": null,
                "created_at": null,
                "updated_at": "2026-09-17T09:21:11.000000Z"
            },
            "region": {
                "id": 1,
                "name": "bin_el_ouidane",
                "description": null,
                "image": null,
                "created_at": null,
                "updated_at": null
            },
            "activity": {
                "id": 2,
                "image": null,
                "name": "camping",
                "icon": null,
                "created_at": null,
                "updated_at": null
            }
        }
/**
 * @typedef {typeof guideExample} Guide
 */



export default function GuidesSection() {
  const [data, setdata] = useState([guideExample]);
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const GetGuides = async () => {
    setloading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/guides', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const result = response.data.guides || [];
      
      setdata(result);
      console.log(result);
    } catch (err) {
      console.error(err);
      seterror('impossible de charger data !');
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    GetGuides();
  }, []);

  const [params] = useSearchParams()

  const filter = {location:params.get('location')  , activity:params.get("activity")}
  const filteredGuides = data.filter(guide=>{
    if(!filter.location && !filter.activity) return true

    const matchesActivity =  filter.activity === guide.activity.name
    const matchesLocation =  filter.location === guide.region.name

    return matchesActivity || matchesLocation 
  })
  
  const handleGuideClick = (guide) => {
    navigate(`/guides/${guide.id}`, { state: { guideData: guide } });
  };
  return (
    <section id='guides' className="w-full max-w-6xl mx-auto px-4 py-10 font-['Poppins',sans-serif] bg-[#FAF8F5]">
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

      {/* Loading & Error States */}
      {loading && <p className="text-center text-stone-500 py-6">Loading guides...</p>}
      {error && <p className="text-center text-red-500 py-6">{error}</p>}

      {/* Guides Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredGuides.length === 0 ? (
          <EmptyGuide />
        ) : (
          filteredGuides.map((item) => {
          return (
           <Guide key={item.id} handleGuideClick={handleGuideClick} item={item} />
          );
        })
        )}
        
      </div>
    </section>
  );
}