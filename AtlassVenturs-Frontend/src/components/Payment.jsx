import React, { useEffect, useState } from "react";
import {
  CreditCard,
  Wallet,
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handelFetchData = async () => {
    const token = localStorage.getItem("token");
    
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/GetPaymentInformation", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      
      setPaymentData(response.data);
      console.log("Payment Info:", response.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError("Session expired or unauthorized. Please log in again.");
      } else {
        setError(err.response?.data?.message || "Impossible de charger les informations !");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handelFetchData();
  }, []);

  // استخراج الثمن والموعد والمعلومات مباشرة من API data
  const totalAmount = paymentData?.total_price || 250;

  const bookingDetails = {
    title: paymentData?.guide_program?.activity?.name 
      ? `${paymentData.guide_program.activity.name} Experience` 
      : "High Atlas Trekking Experience",
    duration: paymentData?.start_date && paymentData?.end_date 
      ? `${paymentData.start_date} to ${paymentData.end_date}` 
      : "Select dates",
    location: paymentData?.guide_program?.region?.name || "Azilal Region",
    startDate: paymentData?.start_date || new Date().toISOString().split("T")[0],
    guideFee: totalAmount,
    guideName: paymentData?.guide?.name || "Local Guide",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-['Poppins',sans-serif] text-stone-500">
        Loading payment details...
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-white border border-emerald-200 rounded-3xl p-8 text-center space-y-4 shadow-lg font-['Poppins',sans-serif]">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-stone-900">
          Payment Successful!
        </h2>
        <p className="text-xs text-stone-500">
          Your booking with {bookingDetails.guideName} has been confirmed. We
          sent confirmation details to your WhatsApp and email.
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl text-xs transition-all shadow-md cursor-pointer"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 font-['Poppins',sans-serif] text-stone-800">
      {/* Page Title */}
      <div className="mb-8 border-b border-stone-200 pb-4">
        <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Secure Checkout
        </span>
        <h2 className="text-2xl font-extrabold text-stone-900 mt-1">
          Complete Your Adventure Booking
        </h2>
        {error && <p className="text-xs text-red-600 mt-2 font-semibold">{error}</p>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wide">
              Select Payment Method
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                  paymentMethod === "card"
                    ? "border-emerald-600 bg-emerald-50/40 shadow-xs"
                    : "border-stone-200 bg-white"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${paymentMethod === "card" ? "bg-emerald-600 text-white" : "bg-stone-100 text-stone-500"}`}
                >
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs text-stone-900 block">
                    Credit / Debit Card
                  </span>
                  <span className="text-[10px] text-stone-500">
                    Instant international payment
                  </span>
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod("deposit")}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                  paymentMethod === "deposit"
                    ? "border-emerald-600 bg-emerald-50/40 shadow-xs"
                    : "border-stone-200 bg-white"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${paymentMethod === "deposit" ? "bg-emerald-600 text-white" : "bg-stone-100 text-stone-500"}`}
                >
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-xs text-stone-900 block">
                    Pay on Arrival
                  </span>
                  <span className="text-[10px] text-stone-500">
                    Pay cash directly to {bookingDetails.guideName}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {paymentMethod === "card" && (
            <div className="bg-white border border-stone-200 p-5 rounded-3xl space-y-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="font-bold text-xs text-stone-900">
                  Card Information
                </span>
                <Lock className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-medium text-stone-600 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mohamed Alami"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-emerald-600 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-600 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="4000 1234 5678 9010"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-emerald-600 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-stone-600 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-stone-600 mb-1">
                      CVV Security Code
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="123"
                      maxLength="4"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 p-4 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <p className="text-[11px] text-stone-500 font-medium">
              Your transaction is protected with 256-bit SSL encryption. Local
              Atlas guides are verified and certified.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Confirm & Pay {totalAmount} MAD</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-emerald-50/70 border-2 border-emerald-500/30 rounded-3xl p-6 space-y-5 h-fit shadow-md">
          <h3 className="text-base font-bold text-stone-900 border-b border-emerald-200 pb-3">
            Booking Breakdown
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="font-bold text-stone-900 block text-sm">
                {bookingDetails.title}
              </span>
              <div className="flex items-center gap-2 text-stone-500 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{bookingDetails.location}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-500 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                <span>{bookingDetails.duration}</span>
              </div>
              <div className="text-stone-600 mt-2 font-medium">
                Guide:{" "}
                <strong className="text-stone-900">
                  {bookingDetails.guideName}
                </strong>
              </div>
            </div>

            <div className="border-t border-emerald-200/80 pt-3 space-y-2 font-medium text-stone-600">
              <div className="flex justify-between">
                <span>Guide & Program Fee:</span>
                <span className="font-bold text-stone-900">
                  {totalAmount} MAD
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-emerald-200 pt-4 flex items-center justify-between">
            <span className="font-bold text-stone-900 text-sm">
              Total Payable:
            </span>
            <span className="font-extrabold text-xl text-emerald-700">
              {totalAmount} MAD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}