import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

export default function GuideCalendar() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">My Calendar</h1>
        <p className="text-slate-500 text-xs">Set your availability and blocked dates.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center justify-center min-h-[300px] text-center">
        <CalendarIcon className="w-12 h-12 text-slate-300 mb-2" />
        <h3 className="font-bold text-slate-800 text-sm">Calendar View Integrator</h3>
        <p className="text-slate-400 text-xs max-w-sm mt-1">
          Select days on your schedule to set as unavailable or block specific dates for personal trips.
        </p>
      </div>
    </div>
  );
}