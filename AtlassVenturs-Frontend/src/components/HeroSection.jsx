import React, { useEffect, useState } from "react";
import {
  MapPin,
  Search,
  ShieldCheck,
  Star,
  Users,
  ChevronDown,
  ArrowDown,
  LogIn,
} from "lucide-react";
import axios from "axios";
import { Await } from "react-router-dom";

const HeroSection = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [data , setdata] = useState([])
  const [loading , setloading] = useState(false)
  const [error , seterror] = useState(false)
  const locations = [
    { id: "bin_el_ouidane", name: "Bin El Ouidane" },
    { id: "ouzoud", name: "Ouzoud Waterfalls" },
    { id: "Bougmaze", name: "Bougmaze / High Atlas" },
    { id: "Zawit_Ahansale", name: "Merzouga Dunes" },
  ];

  const activities = [
    { id: "trekking", name: "Trekking & Hiking" },
    { id: "camping", name: "Mountain Camping" },
    { id: "kayak", name: "Lake Kayaking" },
    { id: "climbing", name: "Rock Climbing" },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    setloading(true)
      const token = localStorage.getItem('token')
      try{
        const response = await axios.get('/places' , {
          headers: { 
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
         },
        });
        const dataArray = Array.isArray(response.data)
        ? res.data
        : res.data.data || [];

        setdata(response.data)
      }catch(err){
      console.log(err);
      seterror('imposible de charger data')
    }finally{
      setloading(false)
    }

    useEffect(()=> {
      handleSearch()
    }, [])

    console.log("Searching for:", {
      location: selectedLocation,
      activity: selectedActivity,
    });
  };

  // Scroll function for arrow indicator
  const handleScrollDown = () => {
    const guidesSection = document.getElementById("guides");
    if (guidesSection) {
      guidesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-53px)] bg-[#111612] text-white font-sans flex flex-col justify-between">
      {/* ----------------- BACKGROUND IMAGE (WITH OVERFLOW HIDDEN ONLY HERE) ----------------- */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div
          className="w-full h-full bg-cover bg-center scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop')`,
          }}
        ></div>
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111612]/75 via-[#111612]/60 to-[#111612]"></div>
      </div>

      {/* ----------------- HERO CONTENT ----------------- */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
            Explore Morocco with{" "}
            <span className="italic font-serif font-normal text-[#D4AF37]">
              Expert Local Guides
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-200 text-xs md:text-sm max-w-md mx-auto font-light leading-relaxed opacity-90 drop-shadow">
            From Toubkal summits to Sahara dunes — every trail led by someone
            who calls it home.
          </p>

          {/* ----------------- SEARCH FILTER BAR (ACTIVE) ----------------- */}
          <form onSubmit={handleSearch} className="pt-4">
            <div className="bg-[#FAF9F6] text-gray-800 p-1.5 md:p-2 rounded-xl md:rounded-full shadow-2xl max-w-xl mx-auto flex flex-col md:flex-row items-center gap-1 border border-white/20">
              {/* Location Select */}
              <div className="flex-1 w-full flex items-center gap-2 px-3 py-1.5 border-b md:border-b-0 md:border-r border-gray-200/80">
                <MapPin className="w-4 h-4 text-[#1C3A27] shrink-0" />
                <div className="text-left w-full">
                  <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-gray-800 outline-none cursor-pointer appearance-none pr-4"
                  >
                    <option value="">Select a location</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
                <ChevronDown className="w-3 h-3 text-gray-400 pointer-events-none -ml-3" />
              </div>

              {/* Activity Select */}
              <div className="flex-1 w-full flex items-center gap-2 px-3 py-1.5">
                <span className="text-sm">🧗</span>
                <div className="text-left w-full">
                  <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                    Activity
                  </label>
                  <select
                    value={selectedActivity}
                    onChange={(e) => setSelectedActivity(e.target.value)}
                    className="w-full bg-transparent text-xs font-semibold text-gray-800 outline-none cursor-pointer appearance-none pr-4"
                  >
                    <option value="">Select an activity</option>
                    {activities.map((act) => (
                      <option key={act.id} value={act.id}>
                        {act.name}
                      </option>
                    ))}
                  </select>
                </div>
                <ChevronDown className="w-3 h-3 text-gray-400 pointer-events-none -ml-3" />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full md:w-auto bg-[#1C3A27] hover:bg-[#152c1e] text-white px-5 py-2.5 rounded-lg md:rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md shrink-0 cursor-pointer active:scale-95"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* ----------------- TRUST BADGES ----------------- */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-[11px] text-gray-300 opacity-90">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Certified guides</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              <span>4.9 avg rating</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>12k+ travelers</span>
            </div>
          </div>
        </div>
      </main>

      {/* Scroll Indicator */}
      <footer className="relative z-10 pb-4 text-center">
        <div
          onClick={handleScrollDown}
          className="inline-flex flex-col items-center gap-0.5 text-[9px] text-gray-400 tracking-widest uppercase cursor-pointer hover:text-white transition-colors"
        >
          <span>Scroll</span>
          <ArrowDown className="w-2.5 h-2.5 animate-bounce" />
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;
