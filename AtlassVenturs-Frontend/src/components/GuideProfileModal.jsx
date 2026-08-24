import React, { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Languages,
  Star,
  ShieldCheck,
  Award,
  CheckCircle,
  Calendar,
} from "lucide-react";
import BookingCheckout from "./BookingCheckout";

export default function GuideProfilePage({ guideData }) {
  // بيانات افتراضية
  const guide = guideData || {
    name: "Youssef Ait Lahcen",
    role: "High-Mountain & Cultural Guide",
    location: "Azilal & Ait Bouguemez",
    languages: "Arabic, Tamazight, French, English",
    rating: 4.9,
    reviews: 38,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
  };

  const [includeGear, setIncludeGear] = useState(false);
  const [selectedDays, setSelectedDays] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);

  // حساب التكلفة الإجمالية
  const basePricePerDay = 350; // MAD / day
  const gearPricePerDay = 150; // MAD / day
  const totalPrice =
    (basePricePerDay + (includeGear ? gearPricePerDay : 0)) * selectedDays;

  return (
    <div className="min-h-screen bg-stone-50/50 text-stone-800 font-['Poppins',sans-serif]">
      
      {/* Top Bar Navigation */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Guides</span>
          </button>
          <span className="text-xs font-medium text-stone-500">
            Official Guide Profile
          </span>
        </div>
      </div>

      {/* Main Page Content Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
            
            {/* Guide Info Summary */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border border-stone-200 shadow-xs"
                />
                <span
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow-sm"
                  title="Certified Guide"
                >
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                    {guide.name}
                  </h1>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-emerald-200">
                    Verified Guide
                  </span>
                </div>

                <p className="text-sm font-medium text-stone-600">
                  {guide.role}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-500 pt-1">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    {guide.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-stone-400" />
                    {guide.languages}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {guide.rating} ({guide.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column (2 Cols wide on large screens) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Biography */}
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                About the Guide
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                Certified mountain guide born in the High Atlas with over 8 years
                of experience leading treks across Azilal, Ait Bouguemez, and
                Mount Toubkal. Dedicated to delivering safe, authentic, and rich
                local cultural experiences.
              </p>
            </section>

            {/* Certifications & Regions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Certifications */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-stone-700" /> Certifications & Licenses
                </h3>
                <ul className="space-y-3 text-xs text-stone-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>CFAMM Mountain & Nature Guide Diploma</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Wilderness First Aid & Rescue Certified</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Official Ministry of Tourism License</span>
                  </li>
                </ul>
              </div>

              {/* Covered Regions */}
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-stone-700" /> Covered Regions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Ait Bouguemez",
                    "Ouzoud Falls",
                    "Zaouiat Ahansal",
                    "Cathedral Rock",
                    "Taghia Canyons",
                  ].map((region, idx) => (
                    <span
                      key={idx}
                      className="bg-stone-100 text-stone-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-stone-200"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column (Booking Card Sticky) */}
          <div className="lg:col-span-1 lg:sticky lg:top-20">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
              
              <div className="border-b border-stone-100 pb-4">
                <h2 className="text-base font-bold text-stone-900">
                  Book Your Trek
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Customize duration and additional services
                </p>
              </div>

              {/* Duration selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  Trek Duration (Days)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="14"
                    value={selectedDays}
                    onChange={(e) =>
                      setSelectedDays(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-full p-2.5 border border-stone-300 rounded-xl text-sm font-semibold text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Equipment Rental Checkbox */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="gear"
                    checked={includeGear}
                    onChange={(e) => setIncludeGear(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900 cursor-pointer"
                  />
                  <label htmlFor="gear" className="text-xs cursor-pointer space-y-1">
                    <span className="font-bold text-stone-800 block">
                      Include Gear Rental (+150 MAD/day)
                    </span>
                    <span className="text-stone-500 block leading-relaxed">
                      Trekking backpack, hiking poles, all-weather tent, and thermal sleeping bag.
                    </span>
                  </label>
                </div>
              </div>

              {/* Price Calculation & Checkout Button */}
              <div className="border-t border-stone-100 pt-5 space-y-4">
                <div className="flex items-baseline justify-between text-xs text-stone-500">
                  <span>Base Guide Rate:</span>
                  <span className="font-medium text-stone-800">{basePricePerDay} MAD / day</span>
                </div>

                {includeGear && (
                  <div className="flex items-baseline justify-between text-xs text-stone-500">
                    <span>Gear Rental:</span>
                    <span className="font-medium text-stone-800">{gearPricePerDay} MAD / day</span>
                  </div>
                )}

                <div className="flex items-baseline justify-between pt-2 border-t border-dashed border-stone-200">
                  <span className="text-sm font-bold text-stone-900">Total Price:</span>
                  <span className="text-2xl font-bold text-stone-900">
                    {totalPrice} <span className="text-xs font-normal text-stone-500">MAD</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-stone-900 hover:bg-black text-white text-sm font-semibold py-3.5 rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                >
                  Book Trek Now
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Checkout Modal Overlay */}
      {showCheckout && (
        <BookingCheckout
          guide={guide}
          selectedDays={selectedDays}
          includeGear={includeGear}
          totalPrice={totalPrice}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}