import React, { useState } from 'react';
import { 
  User, Mail, Shield, Save, Award, Globe, 
  Upload, Trash2, Plus, CheckCircle2, FileText, Loader2 
} from 'lucide-react';

export default function GuideSettings() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Profile State
  const [profile, setProfile] = useState({
    name: 'Ayoub Amrani',
    bio: 'Certified Mountain Guide with over 8 years of hiking experience across the High Atlas.',
    language: 'en', // 'en' | 'fr' | 'ar'
  });

  // Certifications State
  const [certifications, setCertifications] = useState([
    { id: 1, title: 'Certified Mountain Guide (Royal Moroccan Skiing & Mountaineering Federation)', year: '2018', fileName: 'guide_cert_2018.pdf' },
    { id: 2, title: 'Wilderness First Aid & CPR Certification', year: '2021', fileName: 'first_aid_cert.pdf' }
  ]);

  const [newCert, setNewCert] = useState({ title: '', year: '', file: null });

  // Handlers
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAddCert = (e) => {
    e.preventDefault();
    if (!newCert.title || !newCert.year) return;

    const certToAdd = {
      id: Date.now(),
      title: newCert.title,
      year: newCert.year,
      fileName: newCert.file ? newCert.file.name : 'document.pdf'
    };

    setCertifications([...certifications, certToAdd]);
    setNewCert({ title: '', year: '', file: null });
  };

  const handleRemoveCert = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
  };

  const handleSaveAll = () => {
    setLoading(true);
    // Simulation API Call
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl pb-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Profile & Settings</h1>
          <p className="text-slate-500 text-xs">Manage your guide profile, certifications, and system preferences.</p>
        </div>
        
        {/* Top Save Button */}
        <button
          onClick={handleSaveAll}
          disabled={loading}
          className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all active:scale-95 shadow-sm disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {loading ? 'Saving Changes...' : 'Save Settings'}
        </button>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Settings and certifications saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Public Profile & Preferences */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Section 1: Basic Information */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <User className="w-4 h-4 text-emerald-800" />
              <h2 className="font-bold text-slate-900 text-sm">Personal Profile</h2>
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-semibold text-xs">Full Name *</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 font-medium"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-700 font-semibold text-xs">Bio & Presentation *</label>
              <textarea
                rows={4}
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
                placeholder="Describe your expertise, favorite trekking routes, and background..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 font-medium resize-none"
              />
            </div>
          </div>

          {/* Section 2: Certifications */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Award className="w-4 h-4 text-emerald-800" />
              <h2 className="font-bold text-slate-900 text-sm">Official Certifications & Degrees</h2>
            </div>

            {/* List of saved certifications */}
            <div className="space-y-2.5">
              {certifications.map((cert) => (
                <div 
                  key={cert.id} 
                  className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/70 rounded-xl hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{cert.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                        <span className="font-semibold text-slate-600">Year: {cert.year}</span>
                        <span>•</span>
                        <span className="truncate max-w-[150px]">{cert.fileName}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveCert(cert.id)}
                    className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    title="Remove certification"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Certification Form */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Add New Certificate</p>
              <div className="p-3.5 bg-slate-50/50 border border-dashed border-slate-200 rounded-xl space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Certificate Title (e.g. First Aid)"
                    value={newCert.title}
                    onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                    className="col-span-2 p-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-700"
                  />
                  <input
                    type="text"
                    placeholder="Year (e.g. 2023)"
                    value={newCert.year}
                    onChange={(e) => setNewCert({ ...newCert, year: e.target.value })}
                    className="p-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-emerald-700"
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <label className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 cursor-pointer hover:bg-slate-100 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span className="truncate max-w-[180px]">
                      {newCert.file ? newCert.file.name : 'Upload Document (PDF / Image)'}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      className="hidden"
                      onChange={(e) => setNewCert({ ...newCert, file: e.target.files[0] })}
                    />
                  </label>

                  <button
                    onClick={handleAddCert}
                    type="button"
                    className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: System Preferences */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Globe className="w-4 h-4 text-emerald-800" />
              <h2 className="font-bold text-slate-900 text-sm">System Language</h2>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] text-slate-500">
                Select your preferred language for the guide dashboard and system notifications.
              </p>

              <div className="space-y-2 pt-1">
                {[
                  { id: 'en', label: 'English', desc: 'Default system language' },
                  { id: 'fr', label: 'Français', desc: 'Langue du système' },
                  { id: 'ar', label: 'العربية', desc: 'لغة النظام' },
                ].map((lang) => (
                  <label
                    key={lang.id}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      profile.language === lang.id
                        ? 'bg-emerald-50/50 border-emerald-600/60 ring-1 ring-emerald-600/30'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="language"
                        value={lang.id}
                        checked={profile.language === lang.id}
                        onChange={handleProfileChange}
                        className="text-emerald-800 focus:ring-emerald-700"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-800">{lang.label}</div>
                        <div className="text-[10px] text-slate-500">{lang.desc}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-2">
            <h3 className="text-xs font-bold flex items-center gap-1.5 text-emerald-400">
              <Shield className="w-4 h-4" /> Guide Verification
            </h3>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Uploading updated official certificates speeds up your profile verification badge and increases visitor trust on AtlasVenture.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}