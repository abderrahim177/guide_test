import React, { useState } from 'react';
import { Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const navigate = useNavigate();
  const scrollToSection = (e, id) => {
    e.preventDefault();
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <header className="sticky top-0 left-0 w-full bg-[#FAF9F6] text-[#111612] px-6 py-2.5 flex items-center justify-between shadow-sm z-50 border-b border-gray-200/50">
      
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="bg-[#1C3A27] p-1.5 rounded-md text-white">
          <Compass className="w-4 h-4" />
        </div>
        <span className="text-lg font-bold tracking-tight">EcoTour</span>
      </div>

      {/* Nav Links */}
      <nav className="hidden md:flex items-center gap-6 font-medium text-xs text-gray-600">
      <a
        href="#hero"
        onClick={(e) => scrollToSection(e, 'hero')}
        className={`transition-colors relative pb-0.5 ${
          activeTab === 'hero'
            ? 'text-[#111612] font-semibold border-b-2 border-[#1C3A27]'
            : 'hover:text-[#1C3A27]'
        }`}
      >
        Accueil
      </a>

      <a
        href="#guides"
        onClick={(e) => scrollToSection(e, 'guides')}
        className={`transition-colors relative pb-0.5 ${
          activeTab === 'guides'
            ? 'text-[#111612] font-semibold border-b-2 border-[#1C3A27]'
            : 'hover:text-[#1C3A27]'
        }`}
      >
        Nos Guides
      </a>

      <a
        href="#footer"
        onClick={(e) => scrollToSection(e, 'footer')}
        className={`transition-colors relative pb-0.5 ${
          activeTab === 'footer'
            ? 'text-[#111612] font-semibold border-b-2 border-[#1C3A27]'
            : 'hover:text-[#1C3A27]'
        }`}
      >
        About Us
      </a>
    </nav>

      {/* Auth Buttons */}
      <div className="flex items-center gap-3 text-xs">
        <button onClick={() => navigate('/login')} className="font-semibold text-gray-700 hover:text-black transition-colors px-2 py-1">
          Connexion
        </button>
        <button onClick={() => navigate('/register')} className="bg-[#1C3A27] hover:bg-[#152c1e] text-white px-4 py-1.5 rounded-full font-medium transition-all shadow-sm">
          S'inscrire
        </button>
      </div>
    </header>
  );
};

export default Navbar;