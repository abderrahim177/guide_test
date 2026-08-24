import React, { useState, useEffect, useRef } from 'react';
import { Compass, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // جلب بيانات المستخدم من localStorage عند تحميل المكون
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    navigate('/login');
  };

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
      <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
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

      {/* Auth / Profile Area */}
      {user ? (
        <div className="relative" ref={dropdownRef}>
          {/* User Avatar + Arrow Button */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-200/60 transition-all cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#1C3A27] text-amber-400 font-bold text-sm flex items-center justify-center uppercase shadow-sm">
              {user.name ? user.name.charAt(0) : 'U'}
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-gray-600 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu Card */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* User Info Header */}
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800 truncate">{user.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
              </div>

              {/* Links */}
              <div className="py-1">
                <button
                  onClick={() => { setDropdownOpen(false); navigate('/profile'); }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  Profile
                </button>
                <button
                  onClick={() => { setDropdownOpen(false); navigate('/settings'); }}
                  className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  Settings
                </button>
              </div>

              {/* Sign Out */}
              <div className="border-t border-slate-100 pt-1 mt-1">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-xs rounded-2xl text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 font-medium transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-500" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Guest Buttons */
        <div className="flex items-center gap-3 text-xs">
          <button onClick={() => navigate('/login')} className="font-semibold text-gray-700 hover:text-black transition-colors px-2 py-1 cursor-pointer">
            Connexion
          </button>
          <button onClick={() => navigate('/register')} className="bg-[#1C3A27] hover:bg-[#152c1e] text-white px-4 py-1.5 rounded-full font-medium transition-all shadow-sm cursor-pointer">
            S'inscrire
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;