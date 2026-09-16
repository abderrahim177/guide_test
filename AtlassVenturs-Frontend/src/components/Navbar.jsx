import React, { useState, useEffect, useRef } from "react";
import {
  Compass,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Bell,
  Info,
  CreditCard,
  Loader2, // <-- تم إضافة Loader2 هنا بنجاح
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("hero");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const guideData = location.state?.guideData || {};
  const bookingDetails = location.state?.bookingDetails || {};

  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkBookingStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }
      const response = await axios.get(
        `http://127.0.0.1:8000/api/bookings/latest`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const status = response.data.status || response.data.booking?.status;
      if (status === "confirmed") {
        setIsApproved(true);
      }
    } catch (err) {
      console.error(
        "Erreur lors de la vérification:",
        err.response?.status || err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBookingStatus();
  }, []);

  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: {
        guideData,
        bookingDetails,
      },
    });
  };

  // States dial Notifications
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Your trek booking to M'goun has been confirmed.",
      time: "2h ago",
      read: false,
    },
    {
      id: 2,
      text: "New local guide added in Ait Bougmez.",
      time: "1d ago",
      read: false,
    },
  ]);

  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 left-0 w-full bg-[#FAF9F6] text-[#111612] px-6 py-2.5 flex items-center justify-between shadow-sm z-50 border-b border-gray-200/50">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="bg-[#1C3A27] p-1.5 rounded-md text-white">
          <Compass className="w-4 h-4" />
        </div>
        <span className="text-lg font-bold tracking-tight">AtlasVenture</span>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 font-medium text-xs text-gray-600">
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, "hero")}
          className={`transition-colors relative pb-0.5 ${
            activeTab === "hero"
              ? "text-[#111612] font-semibold border-b-2 border-[#1C3A27]"
              : "hover:text-[#1C3A27]"
          }`}
        >
          Accueil
        </a>

        <a
          href="#guides"
          onClick={(e) => scrollToSection(e, "guides")}
          className={`transition-colors relative pb-0.5 ${
            activeTab === "guides"
              ? "text-[#111612] font-semibold border-b-2 border-[#1C3A27]"
              : "hover:text-[#1C3A27]"
          }`}
        >
          Nos Guides
        </a>

        <a
          href="#footer"
          onClick={(e) => scrollToSection(e, "footer")}
          className={`transition-colors relative pb-0.5 ${
            activeTab === "footer"
              ? "text-[#111612] font-semibold border-b-2 border-[#1C3A27]"
              : "hover:text-[#1C3A27]"
          }`}
        >
          About Us
        </a>

        {/* Loading Spinner or Payment Button */}
        {loading ? (
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs text-stone-500 bg-stone-100 rounded-xl border border-stone-200">
            <Loader2 className="w-4 h-4 animate-spin text-[#1C3A27]" />
            <span>Vérification...</span>
          </div>
        ) : (
          isApproved && (
            <button
              onClick={handleProceedToPayment}
              className="bg-green-500 hover:bg-green-400 text-stone-900 px-3 py-1.5 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-2 border border-emerald-300"
            >
              <CreditCard className="w-4 h-4" />
              <span>Procéder au Paiement</span>
            </button>
          )
        )}
      </nav>

      {/* User Section / Guest Buttons */}
      {user ? (
        <div className="flex items-center gap-3">
          {/* Notification Bell Component */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-full hover:bg-gray-200/60 transition-all cursor-pointer focus:outline-none text-gray-700 flex items-center justify-center"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white ring-2 ring-[#FAF9F6]">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800">
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[10px] text-[#1C3A27] font-semibold hover:underline cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-xs text-slate-400">
                        Aucune notification pour le moment
                      </p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`px-4 py-2.5 transition-colors flex gap-2.5 items-start ${!notif.read ? "bg-emerald-50/40" : "hover:bg-slate-50"}`}
                      >
                        <div className="p-1.5 bg-emerald-100/60 text-[#1C3A27] rounded-full shrink-0 mt-0.5">
                          <Info className="w-3 h-3" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-700 leading-snug">
                            {notif.text}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            {notif.time}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-200/60 transition-all cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#1C3A27] text-amber-400 font-bold text-sm flex items-center justify-center uppercase shadow-sm">
                {user.name ? user.name.charAt(0) : "U"}
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-gray-600 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {user.email}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/settings");
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    Settings
                  </button>
                </div>

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
        </div>
      ) : (
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={() => navigate("/login")}
            className="font-semibold text-gray-700 hover:text-black transition-colors px-2 py-1 cursor-pointer"
          >
            Connexion
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-[#1C3A27] hover:bg-[#152c1e] text-white px-4 py-1.5 rounded-full font-medium transition-all shadow-sm cursor-pointer"
          >
            S'inscrire
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;