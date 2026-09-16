import React, { useEffect, useState } from "react";
import {
  Clock,
  Compass,
  ArrowRight,
  BellRing,
  CheckCircle2,
  CreditCard,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const PendingRequestPage = () => {
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
        console.error(
          "Token non trouvé dans localStorage. Veuillez vous reconnecter.",
        );
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
      console.log(response.data);
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

  return (
    <>
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Connexion en cours ...</span>
        </>
      ) : (
        <div className="min-h-screen bg-[#FAF9F6] text-[#111612] font-['Poppins',sans-serif] flex flex-col justify-between p-6">
          {/* Main Content Card */}
          <div className="max-w-md w-full mx-auto bg-white rounded-3xl border border-stone-200 shadow-xl p-8 text-center space-y-6 my-auto">
            {!isApproved ? (
              <>
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping opacity-75"></div>
                  <div className="relative w-20 h-20 bg-amber-50 text-amber-600 rounded-full border border-amber-200 flex items-center justify-center shadow-inner">
                    <Clock
                      className="w-9 h-9 animate-spin"
                      style={{ animationDuration: "8s" }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full border border-amber-200 uppercase tracking-wider">
                    En attente de validation
                  </span>
                  <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                    Votre demande est en cours de traitement
                  </h1>
                  <p className="text-xs text-stone-500 leading-relaxed px-2">
                    Le guide local examine actuellement votre requête. L'accès
                    aux paiements et au panier sera déverrouillé dès que le
                    guide aura validé votre demande.
                  </p>
                </div>

                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 text-left space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0 mt-0.5">
                      <BellRing className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-stone-800">
                        Notification en temps réel
                      </p>
                      <p className="text-[11px] text-stone-500">
                        Vous recevrez une alerte instantanée dès l'approbation.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse opacity-75"></div>
                  <div className="relative w-20 h-20 bg-emerald-50 text-[#1C3A27] rounded-full border border-emerald-200 flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 bg-emerald-50 text-[#1C3A27] text-[10px] font-bold rounded-full border border-emerald-200 uppercase tracking-wider">
                    Demande Validée !
                  </span>
                  <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                    Le guide a accepté votre voyage
                  </h1>
                  <p className="text-xs text-stone-500 leading-relaxed px-2">
                    Félicitations ! Votre demande a été validée avec succès.
                    Vous pouvez maintenant procéder au paiement pour confirmer
                    définitivement votre réservation.
                  </p>
                </div>
              </>
            )}

            {/* Actions */}
            <div className="space-y-2 pt-2">
              {isApproved && (
                <button
                  onClick={handleProceedToPayment}
                  className="w-full bg-green-500 hover:bg-green-400 text-stone-900 py-3 rounded-2xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 border border-emerald-300 animate-bounce"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Procéder au Paiement</span>
                </button>
              )}

              <button
                onClick={() => navigate("/")}
                className="w-full bg-[#1C3A27] hover:bg-[#152c1e] text-white py-3 rounded-2xl text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Retour à l'accueil</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Footer minimal */}
          <div className="text-center text-[10px] text-stone-400">
            &copy; {new Date().getFullYear()} AtlasVenture. Tous droits
            réservés.
          </div>
        </div>
      )}
    </>
  );
};
export default PendingRequestPage;
