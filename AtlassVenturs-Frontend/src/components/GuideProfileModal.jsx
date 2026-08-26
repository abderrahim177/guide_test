import React, { useState, useRef } from "react";
import {
  MapPin,
  Languages,
  Star,
  ShieldCheck,
  Award,
  CheckCircle,
  Calendar as CalendarIcon,
  CheckCircle2,
  MessageCircle,
  CreditCard,
  PackageCheck,
  ChevronDown,
  X,
} from "lucide-react";

export default function GuideProfilePage({ guideData }) {
  const guide = guideData || {
    id: 1,
    name: "Youssef Ait Lahcen",
    role: "High-Mountain & Cultural Guide",
    location: "Azilal & Ait Bouguemez",
    languages: "Arabic, Tamazight, French, English",
    rating: 4.9,
    reviews: 38,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
  };

  const todayStr = new Date().toISOString().split("T")[0];

  // Booking Form States
  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(todayStr);
  const [includeGear, setIncludeGear] = useState(false);

  // Interactive UI States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [step, setStep] = useState("checkout"); // 'checkout' | 'confirmed'
  const [paymentMethod, setPaymentMethod] = useState("deposit"); // 'deposit' | 'whatsapp'
  const [userNeedsGear, setUserNeedsGear] = useState(false);

  const cardRef = useRef(null);

  // Calculations
  const calculateDays = () => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 1;
  };

  const selectedDays = calculateDays();
  const basePricePerDay = 350;
  const gearPricePerDay = 150;

  const currentGearStatus = isCheckoutOpen ? userNeedsGear : includeGear;
  const totalPrice =
    (basePricePerDay + (currentGearStatus ? gearPricePerDay : 0)) * selectedDays;
  const depositAmount = Math.round(totalPrice * 0.2);

  // Handlers
  const handleStartDateChange = (e) => {
    const newStart = e.target.value;
    setStartDate(newStart);
    if (endDate && new Date(newStart) > new Date(endDate)) {
      setEndDate(newStart);
    }
  };

  const handleToggleCheckout = () => {
    if (!isCheckoutOpen) {
      setUserNeedsGear(includeGear);
      setIsCheckoutOpen(true);
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 200);
    } else {
      setIsCheckoutOpen(false);
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setStep("confirmed");
  };

  return (
    <div className="min-h-screen bg-stone-50/50 text-stone-800 font-['Poppins',sans-serif] pb-16">
      
      {/* 1. HEADER SECTION */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={guide.image}
                alt={guide.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-stone-200 shadow-xs"
              />
              <span
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full shadow-sm"
                title="Certified Guide"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
                  {guide.name}
                </h1>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-emerald-200">
                  Verified Guide
                </span>
              </div>

              <p className="text-xs font-medium text-stone-600">
                {guide.role}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  {guide.location}
                </span>
                <span className="flex items-center gap-1">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* 2. UNIFIED PAPER CARD WITH SAME LIGHT GREEN BACKGROUND */}
        <section 
          ref={cardRef} 
          className="max-w-4xl mx-auto bg-emerald-50/70 rounded-3xl border-2 border-emerald-500/30 shadow-md overflow-hidden transition-all duration-300"
        >
          {/* TOP HALF: MAIN BAR */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-200/80 pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full mb-1">
                  Quick Booking
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                  Select Dates & Reserve Trek
                </h2>
              </div>
              <div className="text-xs text-stone-600 font-medium bg-white/80 px-3.5 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
                Base Rate: <strong className="text-stone-900 font-bold">{basePricePerDay} MAD</strong> / day
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Start Date */}
              <div className="space-y-1.5 bg-white p-3.5 rounded-2xl border border-emerald-200/80 shadow-xs hover:border-emerald-500 transition-colors">
                <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-emerald-600" />
                  Start Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="w-full text-xs font-semibold text-stone-900 bg-stone-50 p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
                />
              </div>

              {/* End Date */}
              <div className="space-y-1.5 bg-white p-3.5 rounded-2xl border border-emerald-200/80 shadow-xs hover:border-emerald-500 transition-colors">
                <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-emerald-600" />
                  End Date
                </label>
                <input
                  type="date"
                  min={startDate || todayStr}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full text-xs font-semibold text-stone-900 bg-stone-50 p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
                />
              </div>

              {/* Gear Rental Switch */}
              <div className="bg-white p-3.5 rounded-2xl border border-emerald-200/80 shadow-xs flex items-start justify-between gap-3 hover:border-emerald-500 transition-colors">
                <div className="space-y-1">
                  <label htmlFor="gear-light" className="cursor-pointer font-bold text-xs text-stone-900 block">
                    Gear Rental <span className="text-emerald-600 font-semibold">(+150 MAD/day)</span>
                  </label>
                  <p className="text-[11px] text-stone-500 leading-snug">
                    Includes backpack, tent, sleeping bag & poles.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="gear-light"
                  checked={isCheckoutOpen ? userNeedsGear : includeGear}
                  onChange={(e) => {
                    setIncludeGear(e.target.checked);
                    setUserNeedsGear(e.target.checked);
                  }}
                  className="mt-0.5 h-5 w-5 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer shrink-0"
                />
              </div>

            </div>

            {/* Summary & Action Button */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs">
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Duration</span>
                  <span className="font-bold text-stone-900 text-sm">{selectedDays} {selectedDays === 1 ? 'Day' : 'Days'}</span>
                </div>
                <div className="h-8 w-px bg-emerald-200" />
                <div>
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Total Price</span>
                  <span className="font-extrabold text-emerald-700 text-xl">{totalPrice} MAD</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleCheckout}
                className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{isCheckoutOpen ? "Hide Details" : "Book Trek Now"}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-500 ease-in-out ${isCheckoutOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {/* BOTTOM HALF: EXPANDABLE ACCORDION (UNFOLD WITH MATCHING BACKGROUND) */}
          <div
            className={`grid transition-all duration-500 ease-in-out origin-top border-t border-emerald-300/60 ${
              isCheckoutOpen
                ? "grid-rows-[1fr] opacity-100 scale-y-100"
                : "grid-rows-[0fr] opacity-0 scale-y-95 pointer-events-none"
            }`}
          >
            <div className="overflow-hidden">
              {/* Top Section Sub-Header (Integrated Color) */}
              <div className="bg-emerald-100/80 border-b border-emerald-200/80 px-6 sm:px-8 py-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase block">
                    {step === 'checkout' ? 'Step 2 of 2 · Final Details' : 'Status · Request Received'}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-emerald-950 leading-tight">
                    {step === 'checkout' ? `Complete Booking with ${guide.name}` : 'Trek Reserved Successfully!'}
                  </h3>
                </div>
              </div>

              {/* Accordion Inner Content */}
              <div className="p-6 sm:p-8 space-y-6">
                {step === 'checkout' ? (
                  <div className="space-y-6">
                    {/* Live Summary Bar */}
                    <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 text-xs grid grid-cols-1 sm:grid-cols-3 gap-4 shadow-2xs">
                      <div>
                        <span className="text-stone-500 block font-medium">Dates & Duration:</span>
                        <span className="font-bold text-stone-900">{startDate} → {endDate} ({selectedDays} Days)</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block font-medium">Technical Gear:</span>
                        <span className="font-bold text-stone-900">
                          {userNeedsGear ? 'Rented (+150 MAD/day)' : 'Self Provided'}
                        </span>
                      </div>
                      <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-emerald-200/80 pt-2 sm:pt-0 sm:pl-4">
                        <span className="text-stone-500 block font-medium">Total Amount:</span>
                        <span className="font-black text-base text-emerald-700">{totalPrice} MAD</span>
                      </div>
                    </div>

                    {/* Booking Form */}
                    <form onSubmit={handleBookingSubmit} className="space-y-5 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-stone-700 mb-1.5">Full Name</label>
                          <input
                            required
                            type="text"
                            placeholder="e.g. Yassine El Amrani"
                            className="w-full p-3 bg-white border border-emerald-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-stone-700 mb-1.5">Phone / WhatsApp</label>
                          <input
                            required
                            type="tel"
                            placeholder="+212 600 000 000"
                            className="w-full p-3 bg-white border border-emerald-200/90 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                          />
                        </div>
                      </div>

                      {/* Payment Options Selection */}
                      <div className="space-y-3 pt-2">
                        <label className="block font-bold text-stone-800">Payment Preference:</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          
                          <div
                            onClick={() => setPaymentMethod('deposit')}
                            className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                              paymentMethod === 'deposit'
                                ? 'border-emerald-600 bg-white shadow-xs'
                                : 'border-emerald-200/80 hover:border-emerald-400 bg-white/60'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <CreditCard className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold block text-stone-900">
                                  Pay Deposit ({depositAmount} MAD)
                                </span>
                                <span className="text-stone-500 text-[11px] block mt-0.5 leading-tight">
                                  Pay remaining balance in cash.
                                </span>
                              </div>
                            </div>
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentMethod === 'deposit'}
                              readOnly
                              className="accent-emerald-600 cursor-pointer"
                            />
                          </div>

                          <div
                            onClick={() => setPaymentMethod('whatsapp')}
                            className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                              paymentMethod === 'whatsapp'
                                ? 'border-emerald-600 bg-white shadow-xs'
                                : 'border-emerald-200/80 hover:border-emerald-400 bg-white/60'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold block text-stone-900">
                                  Confirm on WhatsApp
                                </span>
                                <span className="text-stone-500 text-[11px] block mt-0.5 leading-tight">
                                  Chat & confirm details first.
                                </span>
                              </div>
                            </div>
                            <input
                              type="radio"
                              name="payment"
                              checked={paymentMethod === 'whatsapp'}
                              readOnly
                              className="accent-emerald-600 cursor-pointer"
                            />
                          </div>

                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-3">
                        <button
                          type="button"
                          onClick={() => setIsCheckoutOpen(false)}
                          className="w-1/3 py-3.5 bg-white border border-emerald-200 text-stone-700 rounded-xl font-bold hover:bg-emerald-100/50 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-md active:scale-98 cursor-pointer"
                        >
                          Submit Reservation Request
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  /* Step 2: Confirmation Screen */
                  <div className="space-y-6 text-center">
                    <div className="space-y-2 pt-2">
                      <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto animate-bounce" />
                      <h4 className="text-base font-bold text-stone-900">Your Booking Request is Sent!</h4>
                      <p className="text-xs text-stone-600 max-w-md mx-auto">
                        Your reservation request for {selectedDays} days with {guide.name} has been received.
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/212600000000?text=Hello%20${encodeURIComponent(
                        guide.name
                      )},%20I%20just%20submitted%20a%20booking%20request%20for%20${selectedDays}%20days%20(${startDate}%20to%20${endDate})!`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl text-xs transition-colors shadow-md"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Contact {guide.name} on WhatsApp Now</span>
                    </a>

                    <div className="border-t border-emerald-200/80 pt-5 text-left space-y-3">
                      <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                        <PackageCheck className="w-4 h-4 text-emerald-700" /> Essential Trekking Checklist
                      </h4>

                      <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 text-xs space-y-3 shadow-2xs">
                        <div>
                          <span className="font-bold text-stone-800 block mb-1">
                            Personal Essentials (Bring Yourself):
                          </span>
                          <ul className="list-disc list-inside text-stone-600 space-y-1 pl-1">
                            <li>Sturdy hiking boots & wool socks</li>
                            <li>Thermal base layers and wind/waterproof jacket</li>
                            <li>Sun protection (Sunglasses, Sunscreen, Cap)</li>
                          </ul>
                        </div>

                        <div className="border-t border-emerald-100 pt-2.5">
                          <span className="font-bold text-stone-800 block mb-1">
                            Technical Gear Status:
                          </span>
                          <p className="text-stone-600 mb-2">
                            {userNeedsGear
                              ? "✓ You rented technical gear. Tents, sleeping bags & trekking poles will be provided by the guide."
                              : "You chose to bring your own technical gear."}
                          </p>
                          {!userNeedsGear && (
                            <button
                              type="button"
                              onClick={() => setUserNeedsGear(true)}
                              className="bg-emerald-900 text-white text-[11px] font-bold px-3.5 py-2 rounded-xl hover:bg-emerald-950 transition-colors cursor-pointer"
                            >
                              Add Technical Gear (+150 MAD/day)
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsCheckoutOpen(false);
                        setStep("checkout");
                      }}
                      className="w-full py-3 bg-white hover:bg-emerald-100/50 text-stone-800 border border-emerald-200/80 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Done & Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. DETAILS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                About the Guide
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Certified mountain guide born in the High Atlas with over 8 years
                of experience leading treks across Azilal, Ait Bouguemez, and
                Mount Toubkal. Dedicated to delivering safe, authentic, and rich
                local cultural experiences.
              </p>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-stone-700" /> Certifications & Licenses
                </h4>
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

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
                <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-stone-700" /> Covered Regions
                </h4>
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

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
              <h4 className="text-sm font-bold text-stone-900">Why book with this guide?</h4>
              <ul className="text-xs text-stone-600 space-y-2.5">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Local native expert of High Atlas trails
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Multi-language fluency
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Certified safety equipment handled
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}