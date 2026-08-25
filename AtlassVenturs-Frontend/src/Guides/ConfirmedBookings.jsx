import React from 'react';
import { Calendar, MapPin, Users, CheckCircle2 } from 'lucide-react';

export default function ConfirmedBookings() {
  const confirmedList = [
    { id: 'CONF-01', client: 'Sarah Connor', place: 'Toubkal Summit', date: '15 Oct 2026', group: 3, price: '$450' },
    { id: 'CONF-02', client: 'Mark Evans', place: 'Ourika Valley', date: '22 Oct 2026', group: 2, price: '$200' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Confirmed Bookings</h1>
        <p className="text-slate-500 text-xs">Manage your upcoming confirmed trips and schedules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {confirmedList.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold uppercase">Confirmed</span>
                <h3 className="font-bold text-slate-900 text-sm mt-1">{item.client}</h3>
              </div>
              <span className="font-bold text-emerald-800 text-sm">{item.price}</span>
            </div>
            
            <div className="space-y-1 text-slate-600 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.place}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{item.group} Hikers</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}