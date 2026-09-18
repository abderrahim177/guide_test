import axios from "axios";
import { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, AlertCircle, RefreshCw, User, Calendar, MapPin } from "lucide-react";

export default function InconfirmedBooking() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleGetData = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/Inconfirmed_Booking', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          "Content-Type": 'application/json'
        }
      });
      
      const result = Array.isArray(response.data) ? response.data : response.data.data || [];
      setData(result);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch unconfirmed bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 font-['Poppins',sans-serif] text-stone-800">
      
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Pending Approval
          </span>
          <h2 className="text-2xl font-extrabold text-stone-900 mt-1">
            Unconfirmed Bookings
          </h2>
        </div>
        <button 
          onClick={handleGetData}
          className="flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-4 py-2 rounded-xl text-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-center gap-3 text-red-700 text-xs mb-6">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12 text-stone-400 text-xs font-medium">
          Loading unconfirmed bookings...
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && data.length === 0 && (
        <div className="bg-stone-50 border border-stone-200 rounded-3xl p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-stone-900 text-sm">No Pending Bookings</h3>
          <p className="text-xs text-stone-500">All customer bookings have been processed and confirmed.</p>
        </div>
      )}

      {/* Data Grid / Cards */}
      {!loading && data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item, index) => (
            <div 
              key={item.id || index} 
              className="bg-white border border-stone-200 rounded-2xl p-5 shadow-2xs hover:border-amber-300 transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center text-amber-700">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">
                      {item.title || item.package_name || "Trekking Adventure"}
                    </h4>
                    <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full font-bold uppercase">
                      Pending Action
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-amber-600 text-sm">
                  {item.total_price || item.price || 0} MAD
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-stone-400" />
                  <span>Client: <strong className="text-stone-900">{item.client_name || item.user?.name || "N/A"}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>Dates: <strong className="text-stone-900">{item.start_date || 'N/A'} to {item.end_date || 'N/A'}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>Location: <strong className="text-stone-900">{item.location || "Azilal Region"}</strong></span>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-3 flex items-center gap-2">
                <button 
                  onClick={() => { /* Add your confirm logic here */ }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Confirm</span>
                </button>
                <button 
                  onClick={() => { /* Add your cancel logic here */ }}
                  className="flex-1 bg-stone-100 hover:bg-red-50 text-stone-700 hover:text-red-600 font-bold py-2 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Decline</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}