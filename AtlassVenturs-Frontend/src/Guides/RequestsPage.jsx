import React, { useEffect, useState } from "react";
import {
  Users,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Check,
  X,
  Calendar,
  MapPin,
} from "lucide-react";
import axios from "axios";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/GetAllBooking', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const bookingsData = Array.isArray(response.data)
        ? response.data
        : response.data.data || [];
        console.log(bookingsData);
        
      setRequests(bookingsData);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/bookings/${id}/status`,
        { status: "confirmed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: "confirmed" } : req))
      );
    } catch (err) {
      console.error("Failed to confirm booking", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/bookings/${id}/status`,
        { status: "rejected" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req))
      );
    } catch (err) {
      console.error("Failed to reject booking", err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Booking Requests
          </h1>
          <p className="text-slate-500 text-xs">
            Review incoming requests, contact visitors, and confirm reservations.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
              Pending
            </p>
            <h3 className="text-lg font-bold text-slate-900">
              {requests.filter((r) => (r.status || "pending") === "pending").length} Requests
            </h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
              Confirmed
            </p>
            <h3 className="text-lg font-bold text-slate-900">
              {requests.filter((r) => r.status === "confirmed").length} Trips
            </h3>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
              Total Hikers
            </p>
            <h3 className="text-lg font-bold text-slate-900">
              {requests.reduce((sum, req) => sum + (Number(req.group_size) || 1), 0)} Travelers
            </h3>
          </div>
        </div>
      </div>

      {loading && <p className="text-xs text-slate-500">Loading requests...</p>}
      {error && <p className="text-xs text-red-500">Error fetching requests.</p>}

      {/* Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            Received Requests
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3.5">Visitor</th>
                <th className="p-3.5">Destination & Date</th>
                <th className="p-3.5">Group</th>
                <th className="p-3.5">Contact</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {requests.map((req) => {
                const currentStatus = req.status || "pending";

                return (
                  <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">
                        {req.client?.name || req.visitorName || "Client"}
                      </div>
                      <div className="text-[10px] text-slate-400 font-normal">
                        REQ-{req.id}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-1 text-slate-800 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        {req.program?.title || req.program?.name || req.place || "Destination"}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {req.start_date ? `${req.start_date} to ${req.end_date}` : req.date}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md font-semibold text-[11px]">
                        {req.group_size || req.groupSize || 1} people
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        {req.phone && (
                          <a
                            href={`tel:${req.phone}`}
                            className="p-1.5 bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                        )}
                      
                      </div>
                    </td>
                    <td className="p-3.5">
                      
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                          {req.status}
                        </span>
                    </td>
                    <td className="p-3.5 text-right">
                      {currentStatus === "pending" ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleConfirm(req.id)}
                            className="bg-emerald-800 hover:bg-emerald-900 text-white px-2.5 py-1.5 rounded-lg font-semibold text-[11px] flex items-center gap-1 transition-all shadow-sm"
                          >
                            <Check className="w-3.5 h-3.5" /> Confirm
                          </button>
                          <button
                            onClick={() => handleReject(req.id)}
                            className="bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 p-1.5 rounded-lg transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-normal">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}