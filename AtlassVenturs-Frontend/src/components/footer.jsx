import React from 'react';
import { Mountain, Heart, Globe, Users, Phone, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B2A1C] text-stone-200 font-['Poppins',sans-serif]  ">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand / Logo */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              {/* Logo */}
              <div className="flex items-center gap-3 mb-6">
                <Mountain className="w-6 h-6 text-white stroke-[1.8]" />
                <span className="text-xl font-bold tracking-tight text-[#C86D44]">
                  venture
                </span>
              </div>

              {/* Tagline */}
              <p className="text-xs text-stone-300 leading-relaxed font-normal max-w-xs">
                Small adventures. Big landscapes.<br />
                Travel well in the High Atlas.
              </p>
            </div>

            {/* Social / Share Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-stone-600/60 flex items-center justify-center hover:bg-stone-800/50 transition-colors text-white cursor-pointer"
                aria-label="Share"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg border border-stone-600/60 flex items-center justify-center hover:bg-stone-800/50 transition-colors text-white cursor-pointer"
                aria-label="Share"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Explore Azilal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-tight mb-4">
              Explore Azilal
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <a href="#happy-valley" className="hover:text-white transition-colors">
                  Happy Valley
                </a>
              </li>
              <li>
                <a href="#ouzoud-falls" className="hover:text-white transition-colors">
                  Ouzoud Falls
                </a>
              </li>
              <li>
                <a href="#cathedral-rock" className="hover:text-white transition-colors">
                  Cathedral Rock
                </a>
              </li>
              <li>
                <a href="#local-villages" className="hover:text-white transition-colors">
                  Local villages
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Promise */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-tight mb-4">
              Our promise
            </h4>
            <ul className="space-y-3 text-xs text-stone-300">
              <li className="flex items-center gap-2.5">
                <Heart className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                <span>Keep it local</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                <span>Leave no trace</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Users className="w-3.5 h-3.5 text-stone-300 shrink-0" />
                <span>Share fairly</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Mountain Emergency */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-tight mb-4">
              Mountain emergency
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed mb-4">
              For urgent assistance in the region, contact local authorities.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C86D44]">
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span>150 · Civil Protection</span>
            </div>
          </div>

        </div>

        {/* Bottom Line Divider & Copyright */}
        <div className="pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400">
          <p>© 2024 AtlasVenture · Azilal, Morocco</p>
          <p>Built with respect for the mountains.</p>
        </div>

      </div>
    </footer>
  );
}