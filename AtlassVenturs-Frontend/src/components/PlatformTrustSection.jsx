import React from "react";
import {
  ShieldCheck,
  Compass,
  Award,
  Users,
  BadgeCheck,
  HeartHandshake,
  Lock,
  Sparkles,
  TreePine,
  MapPin,
} from "lucide-react";

export default function PlatformTrustSection() {
  const whyUsFeatures = [
    {
      icon: BadgeCheck,
      title: "Certified Local Guides",
      desc: "Every guide on our platform holds official certifications and licenses from the Ministry of Tourism.",
    },
    {
      icon: TreePine,
      title: "Sustainable Ecotourism",
      desc: "We prioritize protecting the Atlas ecosystem and directly supporting local mountain communities.",
    },
    {
      icon: HeartHandshake,
      title: "Transparent & Fair Pricing",
      desc: "No hidden fees or middlemen. Connect directly with guides and book at clear, upfront rates.",
    },
    {
      icon: Lock,
      title: "Safe & Reliable Bookings",
      desc: "Enjoy flexible booking policies paired with rigorous safety standards and technical gear compliance.",
    },
  ];

  const whatWeOffer = [
    {
      icon: Compass,
      title: "Curated Trekking Routes",
      desc: "Comprehensive itineraries exploring Ait Bouguemez, Zaouiat Ahansal, Taghia Canyons, and Ouzoud Waterfalls.",
    },
    {
      icon: Sparkles,
      title: "Technical Gear Rental",
      desc: "Option to rent high-quality tents, sleeping bags, and trekking poles directly with your booking.",
    },
    {
      icon: Users,
      title: "Authentic Atlas Cultural Experiences",
      desc: "Savor local cuisine and stay in traditional gîtes to truly connect with Amazigh culture.",
    },
  ];

  return (
    <section className="py-16 bg-stone-50 border-t border-stone-200/60 font-['Poppins',sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION 1: WHY CHOOSE US */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Why AtlasVenture?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Why Choose Our Platform for Your Next Adventure?
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              We connect you directly with certified local guides in the Azilal and High Atlas region for safe, authentic, and unforgettable journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUsFeatures.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-emerald-500/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: WHAT WE OFFER */}
        <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-10 shadow-xs space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
            <div>
              <span className="text-emerald-600 font-bold text-xs uppercase tracking-wider block mb-1">
                Services & Features
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                What We Offer on Our Platform
              </h3>
            </div>
            <div className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-xl text-stone-700 text-xs font-semibold">
              <MapPin className="w-4 h-4 text-emerald-600" />
              Béni Mellal-Khénifra / Azilal Province
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whatWeOffer.map((offer, idx) => {
              const Icon = offer.icon;
              return (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 shrink-0 mt-1">
                    <Icon className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-stone-900">
                      {offer.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {offer.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: PLATFORM POLICY & COMMITMENT */}
        <div className="bg-emerald-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-800/80 text-emerald-200 text-xs font-medium px-3.5 py-1 rounded-full border border-emerald-700">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Quality & Safety Commitment
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Uncompromised Safety & Complete Transparency
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
                Our platform enforces high safety standards across all mountain treks. We verify the identity and professional credentials of every guide before activating their profile, backed by authentic traveler reviews to maintain service quality.
              </p>
            </div>

            <div className="bg-emerald-800/50 backdrop-blur-md p-6 rounded-2xl border border-emerald-700/60 space-y-4 text-xs text-emerald-50">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-amber-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-white">100% Trusted Experience</h4>
                  <p className="text-[11px] text-emerald-200">Direct booking with no hidden intermediaries</p>
                </div>
              </div>
              <div className="border-t border-emerald-700/60 pt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Flexible cancellation & clear policies</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Dedicated support for all inquiries</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}