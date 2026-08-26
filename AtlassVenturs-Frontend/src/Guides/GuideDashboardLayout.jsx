import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Inbox,
  CheckCircle2,
  Package,
  Calendar,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Compass,
  ShieldCheck,
} from "lucide-react";

export default function GuideDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Mock Guide Profile
  const guideInfo = {
    name: "Ayoub Amrani",
    role: "Certified Mountain Guide",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    isVerified: true,
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { name: "Booking Requests", path: "/guide/requests", icon: Inbox, badge: "3" },
    { name: "Confirmed Bookings", path: "/guide/confirmed", icon: CheckCircle2 },
    { name: "Equipment for Rent", path: "/guide/equipment", icon: Package },
    { name: "My Calendar", path: "/guide/calendar", icon: Calendar },
    { name: "Profile & Settings", path: "/guide/settings", icon: Settings },
  ];

  return (
    // h-screen w-screen overflow-hidden لضمان عدم سكرول الصفحة كاملة
    <div className="h-screen w-screen overflow-hidden bg-slate-50 text-slate-800 font-sans flex flex-col text-xs">
      
      {/* ----------------- HEADER (Fixe) ----------------- */}
      <header className="h-14 bg-white border-b border-slate-200 shrink-0 px-4 flex items-center justify-between shadow-sm z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-900 text-amber-400 flex items-center justify-center font-bold text-xs shadow-sm">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-slate-900 tracking-tight">
              Eco<span className="text-emerald-700">Tour</span>{" "}
              <span className="text-[10px] text-slate-400 font-normal ml-1">
                | Guide Portal
              </span>
            </span>
          </Link>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-4">
          <button className="relative p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
          </button>

          <div className="h-4 w-[1px] bg-slate-200"></div>

          <div className="flex items-center gap-2.5">
            <img
              src={guideInfo.avatar}
              alt={guideInfo.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-200"
            />
            <div className="hidden sm:block text-left">
              <div className="flex items-center gap-1 font-semibold text-slate-900 text-[11px]">
                {guideInfo.name}
                {guideInfo.isVerified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                )}
              </div>
              <p className="text-[10px] text-slate-400 font-normal">
                {guideInfo.role}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Mobile Backdrop Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/40 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ----------------- ASIDE / SIDEBAR (Fixe) ----------------- */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-20 w-60 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 transition-transform duration-300 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } pt-14 md:pt-0 h-full`}
        >
          <div className="p-3 space-y-4 overflow-y-auto">
            {/* Guide Quick Profile Box */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                AA
              </div>
              <div className="overflow-hidden">
                <h4 className="font-semibold text-slate-900 truncate text-xs">
                  {guideInfo.name}
                </h4>
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{" "}
                  Available
                </span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Main Menu
              </p>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-all ${
                        isActive
                          ? "bg-emerald-800 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="bg-amber-500 text-slate-950 font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Logout Section */}
          <div className="p-3 border-t border-slate-100 shrink-0">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-xs"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* ----------------- CONTENT AREA (Scrollable) ----------------- */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 h-full">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}