@extends('layouts.master')
@section('content')

<div class="min-h-[85vh] bg-slate-50/60 flex items-center justify-center py-12 px-6" 
     x-data="{ authPage: 'login' }"> <div class="bg-white w-full max-w-4xl rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[550px]">
    
    <div class="md:w-1/2 relative bg-forest-900 flex flex-col justify-between p-8 text-white overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=800&q=80" 
             class="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700">
        <div class="absolute inset-0 bg-gradient-to-b from-forest-900/50 to-forest-950/90"></div>
      </div>

      <div class="relative z-10 flex items-center gap-2 cursor-pointer">
        <div class="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-forest-900 font-bold text-xs">
          <i class="fa-solid fa-compass text-[12px]"></i>
        </div>
        <span class="text-xs font-bold tracking-tight text-white">Eco<span class="text-sand-300">Tour</span></span>
      </div>

      <div class="relative z-10 my-auto space-y-3 pt-12">
        <span class="text-[9px] font-bold tracking-[0.2em] uppercase text-sand-300 block">Rejoignez la communauté</span>
        <h2 class="text-xl md:text-2xl font-semibold tracking-tight leading-tight">
          Commencez votre <br>prochaine aventure avec nous.
        </h2>
        <p class="text-white/70 text-[11.5px] font-light max-w-xs">
          Accédez à des guides locaux experts, louez du matériel professionnel et explorez le Maroc comme jamais auparavant.
        </p>
      </div>

      <div class="relative z-10 flex items-center gap-4 text-white/50 text-[10px]">
        <span><i class="fa-solid fa-shield-check text-sand-300 mr-1"></i> 100% Sécurisé</span>
        <span>•</span>
        <span><i class="fa-solid fa-heart text-sand-300 mr-1"></i> Eco-Friendly</span>
      </div>
    </div>

    <div class="md:w-1/2 p-8 sm:p-10 flex flex-col justify-center relative bg-white">
      
      <div x-show="authPage === 'login'" x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0 transform translate-x-4" x-transition:enter-end="opacity-100 transform translate-x-0" class="space-y-6">
        <div>
          <h3 class="text-lg font-bold text-forest-900 tracking-tight">Connexion</h3>
          <p class="text-slate-400 text-[11.5px] mt-1 font-light">Ravi de vous revoir ! Connectez-vous à votre compte.</p>
        </div>

        <form action="{{ route('login') }}" method="POST" class="space-y-4">
          @csrf
          <div class="space-y-1">
            <label class="text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider">Adresse Email</label>
            <div class="relative flex items-center">
              <i class="fa-solid fa-envelope absolute left-3.5 text-slate-400 text-[11px]"></i>
              <input type="email" name="email" required placeholder="exemple@domaine.com" 
                     class="w-full bg-slate-50 border border-slate-100 focus:border-forest-500 rounded-xl pl-10 pr-4 py-2.5 text-[12px] focus:outline-none transition-all placeholder-slate-400 font-medium text-slate-800">
            </div>
          </div>

          <div class="space-y-1">
            <div class="flex items-center justify-between">
              <label class="text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider">Mot de passe</label>
              <a href="#" class="text-[11px] text-forest-600 hover:underline">Mot de passe oublié ?</a>
            </div>
            <div class="relative flex items-center">
              <i class="fa-solid fa-lock absolute left-3.5 text-slate-400 text-[11px]"></i>
              <input type="password" name="password" required placeholder="••••••••" 
                     class="w-full bg-slate-50 border border-slate-100 focus:border-forest-500 rounded-xl pl-10 pr-4 py-2.5 text-[12px] focus:outline-none transition-all placeholder-slate-400 font-medium text-slate-800">
            </div>
          </div>

          <div class="flex items-center gap-2 pt-1">
            <input type="checkbox" id="remember" class="rounded border-slate-300 text-forest-800 focus:ring-forest-500 w-3.5 h-3.5 accent-forest-800">
            <label Security id="remember" class="text-[11.5px] text-slate-500 font-light select-none">Se souvenir de moi</label>
          </div>

          <button type="submit" class="w-full bg-forest-800 hover:bg-forest-700 text-white font-semibold py-2.5 rounded-xl text-[12.5px] transition-colors shadow-sm shadow-forest-100 mt-2">
            Se connecter
          </button>
        </form>

        <div class="text-center pt-2">
          <p class="text-slate-400 text-[12px] font-light">
            Vous n'avez pas de compte ? 
            <button @click="authPage = 'register'" class="text-forest-700 font-semibold hover:underline focus:outline-none ml-1">S'inscrire</button>
          </p>
        </div>
      </div>

      <div x-show="authPage === 'register'" x-cloak x-transition:enter="transition ease-out duration-300" x-transition:enter-start="opacity-0 transform translate-x-4" x-transition:enter-end="opacity-100 transform translate-x-0" class="space-y-5">
        <div>
          <h3 class="text-lg font-bold text-forest-900 tracking-tight">Créer un compte</h3>
          <p class="text-slate-400 text-[11.5px] mt-1 font-light">Rejoignez-nous pour planifier votre prochaine aventure.</p>
        </div>

        <form action="{{ route('register') }}" method="POST" class="space-y-3.5">
          @csrf
          <div class="space-y-1">
            <label class="text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider">Nom Complet</label>
            <div class="relative flex items-center">
              <i class="fa-solid fa-user absolute left-3.5 text-slate-400 text-[11px]"></i>
              <input type="text" name="name" required placeholder="Ahmed Alami" 
                     class="w-full bg-slate-50 border border-slate-100 focus:border-forest-500 rounded-xl pl-10 pr-4 py-2.5 text-[12px] focus:outline-none transition-all placeholder-slate-400 font-medium text-slate-800">
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider">Adresse Email</label>
            <div class="relative flex items-center">
              <i class="fa-solid fa-envelope absolute left-3.5 text-slate-400 text-[11px]"></i>
              <input type="email" name="email" required placeholder="exemple@domaine.com" 
                     class="w-full bg-slate-50 border border-slate-100 focus:border-forest-500 rounded-xl pl-10 pr-4 py-2.5 text-[12px] focus:outline-none transition-all placeholder-slate-400 font-medium text-slate-800">
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-[10.5px] font-semibold text-slate-500 uppercase tracking-wider">Mot de passe</label>
            <div class="relative flex items-center">
              <i class="fa-solid fa-lock absolute left-3.5 text-slate-400 text-[11px]"></i>
              <input type="password" name="password" required placeholder="Minimum 8 caractères" 
                     class="w-full bg-slate-50 border border-slate-100 focus:border-forest-500 rounded-xl pl-10 pr-4 py-2.5 text-[12px] focus:outline-none transition-all placeholder-slate-400 font-medium text-slate-800">
            </div>
          </div>

          <div class="flex items-start gap-2 pt-1">
            <input type="checkbox" id="terms" required class="rounded border-slate-300 text-forest-800 focus:ring-forest-500 w-3.5 h-3.5 mt-0.5 accent-forest-800">
            <label for="terms" class="text-[11px] text-slate-500 font-light leading-snug select-none">
              J'accepte les <a href="#" class="text-forest-600 font-medium hover:underline">Conditions d'utilisation</a> et la <a href="#" class="text-forest-600 font-medium hover:underline">Politique de confidentialité</a>.
            </label>
          </div>

          <button type="submit" class="w-full bg-forest-800 hover:bg-forest-700 text-white font-semibold py-2.5 rounded-xl text-[12.5px] transition-colors shadow-sm shadow-forest-100 mt-2">
            Créer mon compte
          </button>
        </form>

        <div class="text-center pt-1">
          <p class="text-slate-400 text-[12px] font-light">
            Vous avez déjà un compte ? 
            <button @click="authPage = 'login'" class="text-forest-700 font-semibold hover:underline focus:outline-none ml-1">Se connecter</button>
          </p>
        </div>
      </div>

    </div>
  </div>

</div>

<style>
  [x-cloak] { display: none !important; }
</style>

@endsection