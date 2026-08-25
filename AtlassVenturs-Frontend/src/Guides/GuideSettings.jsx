import React from 'react';
import { User, Mail, Shield, Save } from 'lucide-react';

export default function GuideSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Profile & Settings</h1>
        <p className="text-slate-500 text-xs">Update your public guide profile and credentials.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4 max-w-2xl">
        <div className="space-y-1">
          <label className="text-slate-700 font-semibold text-xs">Full Name</label>
          <input type="text" defaultValue="Ayoub Amrani" className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20" />
        </div>

        <div className="space-y-1">
          <label className="text-slate-700 font-semibold text-xs">Bio & Certification</label>
          <textarea rows={3} defaultValue="Certified Mountain Guide with over 8 years of hiking experience across the High Atlas." className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20" />
        </div>

        <button className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>
    </div>
  );
}