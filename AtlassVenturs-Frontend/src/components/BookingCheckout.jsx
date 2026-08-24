import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MessageCircle, 
  CreditCard, 
  PackageCheck, 
  X 
} from 'lucide-react';

export default function BookingCheckout({ guide, selectedDays, includeGear, totalPrice, onClose }) {
  const [step, setStep] = useState('checkout'); // 'checkout' | 'confirmed'
  const [paymentMethod, setPaymentMethod] = useState('deposit'); // 'deposit' | 'whatsapp'
  const [userNeedsGear, setUserNeedsGear] = useState(includeGear);

  const depositAmount = Math.round(totalPrice * 0.2); // 20% Deposit

  const handleBooking = (e) => {
    e.preventDefault();
    // API Call to Laravel Backend
    setStep('confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 sm:p-6">
      
      {/* Modal Container: Compact height, wider max-width (max-w-2xl) */}
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative font-['Poppins',sans-serif] max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Sticky Header with Title & Close Icon */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 sm:px-8 py-4 border-b border-stone-100 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-stone-400 uppercase block">
              {step === 'checkout' ? 'Step 1 of 2 · Checkout' : 'Confirmation'}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 leading-tight">
              {step === 'checkout' ? `Confirm Trek with ${guide.name}` : 'Trek Request Submitted'}
            </h2>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container (Scrollbar Hidden Cross-Browser) */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          
          {/* Step 1: Form & Payment Choice */}
          {step === 'checkout' && (
            <div className="space-y-6">
              
              {/* Summary Box */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-0.5">
                  <span className="text-stone-500 block">Duration:</span>
                  <span className="font-semibold text-stone-900">{selectedDays} Days</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-stone-500 block">Gear Included:</span>
                  <span className="font-semibold text-stone-900">
                    {userNeedsGear ? 'Yes (+ Rental Fee)' : 'No (Personal Gear)'}
                  </span>
                </div>
                <div className="space-y-0.5 sm:text-right border-t sm:border-t-0 sm:border-l border-stone-200 pt-2 sm:pt-0 sm:pl-4">
                  <span className="text-stone-500 block">Total Amount:</span>
                  <span className="font-bold text-sm text-stone-900">{totalPrice} MAD</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleBooking} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1.5">
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Yassine El Amrani"
                      className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1.5">
                      Phone / WhatsApp
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+212 600 000 000"
                      className="w-full p-3 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Payment Methods Options */}
                <div className="space-y-2.5 pt-2">
                  <label className="block font-semibold text-stone-700">
                    Payment Option:
                  </label>
                  
                  {/* Deposit Option */}
                  <div 
                    onClick={() => setPaymentMethod('deposit')}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'deposit'
                        ? 'border-stone-900 bg-stone-900/5 shadow-2xs'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-stone-800 shrink-0" />
                      <div>
                        <span className="font-bold block text-stone-900">
                          Pay 20% Deposit Online ({depositAmount} MAD)
                        </span>
                        <span className="text-stone-500 text-[11px] block mt-0.5">
                          Pay the remaining balance in cash to the guide.
                        </span>
                      </div>
                    </div>
                    <input 
                      type="radio" 
                      name="payment"
                      checked={paymentMethod === 'deposit'} 
                      readOnly 
                      className="accent-stone-900 cursor-pointer"
                    />
                  </div>

                  {/* WhatsApp Option */}
                  <div 
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'whatsapp'
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold block text-stone-900">
                          Direct Contact & Pay via WhatsApp
                        </span>
                        <span className="text-stone-500 text-[11px] block mt-0.5">
                          Confirm availability directly before sending deposit.
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

                {/* Buttons Action */}
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={onClose} 
                    className="w-1/3 py-3 border border-stone-300 text-stone-700 rounded-xl font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="w-2/3 py-3 bg-stone-900 hover:bg-black text-white rounded-xl font-semibold transition-all shadow-xs cursor-pointer"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Booking Confirmation + WhatsApp Contact + Gear List */}
          {step === 'confirmed' && (
            <div className="space-y-6 text-center">
              <div className="space-y-2 pt-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Your reservation request with {guide.name} has been initialized successfully.
                </p>
              </div>

              {/* Direct WhatsApp Contact Button */}
              <a 
                href={`https://wa.me/212600000000?text=Hello%20${encodeURIComponent(guide.name)},%20I%20just%20booked%20a%20${selectedDays}-day%20trek!`}
                target="_blank" 
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl text-xs transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Guide via WhatsApp</span>
              </a>

              {/* Mandatory Gear Checklist Section */}
              <div className="border-t border-stone-200 pt-5 text-left space-y-3">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-stone-700" /> Equipment Checklist
                </h3>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs space-y-3">
                  <div>
                    <span className="font-semibold text-stone-800 block mb-1">
                      Essential Personal Items (Bring Your Own):
                    </span>
                    <ul className="list-disc list-inside text-stone-600 space-y-1 pl-1">
                      <li>Sturdy hiking boots</li>
                      <li>Warm layers and waterproof jacket</li>
                      <li>Sun protection (Hat, Sunglasses)</li>
                    </ul>
                  </div>

                  <div className="border-t border-stone-200 pt-2.5">
                    <span className="font-semibold text-stone-800 block mb-1">
                      Technical Gear Status:
                    </span>
                    <p className="text-stone-500 mb-2">
                      {userNeedsGear 
                        ? "You chose to rent technical gear. Tents, sleeping bags, and poles will be provided."
                        : "You selected bringing your own technical gear."}
                    </p>

                    {!userNeedsGear && (
                      <button
                        type="button"
                        onClick={() => setUserNeedsGear(true)}
                        className="bg-stone-900 text-white text-[11px] font-semibold px-3 py-2 rounded-lg hover:bg-black transition-colors cursor-pointer"
                      >
                        Need Technical Gear? Rent Equipment (+150 MAD/day)
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <button 
                type="button" 
                onClick={onClose} 
                className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Done & Return to Site
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}