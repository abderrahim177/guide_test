import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    terms: false,
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors([]);

  if (!formData.terms) {
    setErrors(["Veuillez accepter les conditions d'utilisation."]);
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post('http://localhost:8000/api/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    }
  } catch (err) {
    console.error('Register Error:', err);
    if (err.response?.data?.errors) {
      const validationErrors = Object.values(err.response.data.errors).flat();
      setErrors(validationErrors);
    } else {
      setErrors([err.response?.data?.message || 'Une erreur est survenue.']);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-[85vh] bg-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200/60 overflow-hidden flex flex-col md:flex-row min-h-[550px]">
        
        {/* Left Side: Banner / Image Section */}
        <div className="md:w-1/2 relative min-h-[250px] md:min-h-full flex flex-col justify-between p-8 text-white overflow-hidden bg-emerald-950">
          
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80" 
              alt="Nature Background"
              className="w-full h-full object-cover opacity-40 scale-105 hover:scale-100 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-900/40"></div>
          </div>

          {/* Logo Header */}
          <div className="relative z-10 flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400 font-bold text-sm shadow-inner">
              <i className="fa-solid fa-compass"></i>
            </div>
            <span className="text-sm font-bold tracking-tight text-white">
              Eco<span className="text-amber-400">Tour</span>
            </span>
          </div>

          {/* Center Content */}
          <div className="relative z-10 my-auto space-y-3 py-6">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-400 block">
              Rejoignez la communauté
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight leading-snug">
              Commencez votre <br />prochaine aventure.
            </h2>
            <p className="text-slate-300 text-xs font-normal leading-relaxed max-w-xs">
              Accédez à des guides locaux experts, louez du matériel professionnel et explorez le Maroc comme jamais auparavant.
            </p>
          </div>

          {/* Footer Badges */}
          <div className="relative z-10 flex items-center gap-4 text-slate-300 text-xs pt-2 border-t border-white/10">
            <span className="flex items-center gap-1.5"><i className="fa-solid fa-shield-check text-amber-400"></i> 100% Sécurisé</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><i className="fa-solid fa-leaf text-amber-400"></i> Eco-Friendly</span>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-sm mx-auto w-full space-y-5">
            
            {/* Header Text */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Créer un compte</h3>
              <p className="text-slate-500 text-xs mt-1">Rejoignez-nous pour planifier votre prochaine aventure.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Full Name Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  Nom Complet
                </label>
                <div className="relative flex items-center">
                  <i className="fa-solid fa-user absolute left-3.5 text-slate-400 text-sm"></i>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                    placeholder="Ahmed Alami" 
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  Adresse Email
                </label>
                <div className="relative flex items-center">
                  <i className="fa-solid fa-envelope absolute left-3.5 text-slate-400 text-sm"></i>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    placeholder="exemple@domaine.com" 
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                  Mot de passe
                </label>
                <div className="relative flex items-center">
                  <i className="fa-solid fa-lock absolute left-3.5 text-slate-400 text-sm"></i>
                  <input 
                    type="password" 
                    name="password" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                    placeholder="Minimum 8 caractères" 
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-600 focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600/20 transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-1">
                <input 
                  type="checkbox" 
                  id="terms" 
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required 
                  className="w-4 h-4 rounded border-slate-300 text-emerald-800 focus:ring-emerald-600 mt-0.5 accent-emerald-800 cursor-pointer"
                />
                <label htmlFor="terms" className="text-[11px] text-slate-600 font-normal leading-snug select-none cursor-pointer">
                  J'accepte les <a href="#terms" className="text-emerald-800 font-semibold hover:underline">Conditions d'utilisation</a> et la <a href="#privacy" className="text-emerald-800 font-semibold hover:underline">Politique de confidentialité</a>.
                </label>
              </div>

              {/* Submit Button */}
              <button 
              onClick={handleSubmit}
                type="submit" 
                className="w-full bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white font-semibold py-3 rounded-xl text-xs transition-all shadow-md shadow-emerald-900/10 mt-2 cursor-pointer"
              >
                Créer mon compte
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center pt-1">
              <p className="text-slate-500 text-xs font-normal">
                Vous avez déjà un compte ? 
                <Link to="/login" className="text-emerald-800 font-bold hover:underline ml-1">
                  Se connecter
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}