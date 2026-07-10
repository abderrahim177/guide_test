<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>EcoTour — Explore Morocco</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,500&display=swap" rel="stylesheet">

<!-- Tailwind -->
<script src="https://cdn.tailwindcss.com"></script>
<!-- FontAwesome -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<!-- Alpine -->
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.13.5/cdn.min.js"></script>

<script>
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: { poppins: ['Poppins','sans-serif'] },
        colors: {
          forest: { 50:'#EEF5F0',100:'#DCEBE1',300:'#7EB596',500:'#357A52',600:'#276140',700:'#1E4A31',800:'#153823',900:'#0F2A1D' },
          sand: { 300:'#E3CFA3', 500:'#C7A165' },
          sky: { 100:'#E7F3F5', 300:'#B7D9E1', 500:'#5A96A6' }
        },
        boxShadow: {
          soft: '0 2px 14px rgba(15,42,29,0.06)',
          card: '0 14px 34px rgba(15,42,29,0.12)',
          float: '0 24px 60px rgba(15,42,29,0.18)'
        },
        borderRadius: { '2xl':'1.25rem','3xl':'1.75rem' }
      }
    }
  }
</script>

<style>
  html { scroll-behavior: smooth; }
  body { font-family: 'Poppins', sans-serif; font-size: 14px; color:#1F2A24; background:#F7F5F0; }
  .no-scrollbar::-webkit-scrollbar{ display:none; }
  .no-scrollbar{ -ms-overflow-style:none; scrollbar-width:none; }
  [x-cloak]{ display:none !important; }
  .card-img-wrap img{ transition: transform .7s cubic-bezier(.16,1,.3,1); }
  .card-hover:hover .card-img-wrap img{ transform: scale(1.09); }
  .card-hover:hover{ transform: translateY(-4px); }
  .card-hover{ transition: transform .35s ease, box-shadow .35s ease; }
</style>
</head>

<body class="antialiased">

<div x-data="{ mobileOpen:false, scrolled:false }"
     x-init="window.addEventListener('scroll', () => scrolled = window.scrollY > 12)">

  <!-- ============ HEADER (Glassmorphism, sticky) ============ -->
 <header class="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100" 
        x-data="{ activeTab: 'home' }">
  <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
    <!-- Logo -->
    <div class="flex items-center gap-2 cursor-pointer">
      <div class="w-8 h-8 rounded-lg bg-forest-800 flex items-center justify-center text-white font-bold text-base">
        <i class="fa-solid fa-compass text-[14px]"></i>
      </div>
      <span class="text-sm font-bold text-forest-900 tracking-tight">Eco<span class="text-sand-500">Tour</span></span>
    </div>

    <!-- Navigation Menu (Animated Active Border) -->
     <nav class="hidden md:flex items-center gap-8 font-medium text-slate-600 text-[12.5px] relative h-full">

      <a href="#" @click="activeTab = 'home'" :class="activeTab === 'home' ? 'text-forest-800 font-semibold' : 'hover:text-forest-800'" class="relative py-5 transition-colors">

        Accueil

        <span x-show="activeTab === 'home'" x-transition class="absolute bottom-0 left-0 w-full h-[2px] bg-forest-800"></span>

      </a>

      <a href="#destinations" @click="activeTab = 'guides'" :class="activeTab === 'guides' ? 'text-forest-800 font-semibold' : 'hover:text-forest-800'" class="relative py-5 transition-colors">

        Nos Guides

        <span x-show="activeTab === 'guides'" x-transition class="absolute bottom-0 left-0 w-full h-[2px] bg-forest-800"></span>

      </a>

      <a href="#" @click="activeTab = 'gear'" :class="activeTab === 'gear' ? 'text-forest-800 font-semibold' : 'hover:text-forest-800'" class="relative py-5 transition-colors">

        Équipements

        <span x-show="activeTab === 'gear'" x-transition class="absolute bottom-0 left-0 w-full h-[2px] bg-forest-800"></span>

      </a>

      <a href="#" @click="activeTab = 'about'" :class="activeTab === 'about' ? 'text-forest-800 font-semibold' : 'hover:text-forest-800'" class="relative py-5 transition-colors">

        À propos

        <span x-show="activeTab === 'about'" x-transition class="absolute bottom-0 left-0 w-full h-[2px] bg-forest-800"></span>

      </a>

    </nav>

<div class="flex items-center gap-4">
  @auth
  @if(auth()->user()->role_id == 1)
    <a href="{{ url('/admin') }}" class="text-[12.5px] font-medium text-forest-800">
      <i class="fa-solid fa-gauge mr-1"></i> Admin Dashboard
    </a>

  @elseif(auth()->user()->role_id == 2)
    <a href="{{ url('/guide/dashboard') }}" class="text-[12.5px] font-medium text-forest-800">
      <i class="fa-solid fa-compass mr-1"></i> Guide Dashboard
    </a>

  @else

  <div class="relative" x-data="{ openProfile: false }" @click.away="openProfile = false">
    
    <button @click="openProfile = !openProfile" 
            class="flex items-center gap-2 focus:outline-none group">
      
      <div class="w-8 h-8 rounded-full bg-forest-100 border border-forest-200 flex items-center justify-center text-forest-800 font-bold text-xs shadow-sm group-hover:border-forest-400 transition-all">
        {{ strtoupper(substr(auth()->user()->name, 0, 1)) }}
      </div>
      
      <i class="fa-solid fa-chevron-down text-[10px] text-slate-400 group-hover:text-slate-600 transition-colors"></i>
    </button>

    <div x-show="openProfile" 
         x-transition:enter="transition ease-out duration-100"
         x-transition:enter-start="opacity-0 transform scale-95 translate-y-1"
         x-transition:enter-end="opacity-100 transform scale-100 translate-y-0"
         x-transition:leave="transition ease-in duration-75"
         x-transition:leave-start="opacity-100 transform scale-100 translate-y-0"
         x-transition:leave-end="opacity-0 transform scale-95 translate-y-1"
         class="absolute right-0 mt-2.5 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50 origin-top-right"
         x-cloak>
         
      <div class="px-4 py-2 border-b border-slate-50">
        <p class="text-[12px] font-semibold text-slate-800 truncate">{{ auth()->user()->name }}</p>
        <p class="text-[10px] text-slate-400 truncate font-light">{{ auth()->user()->email }}</p>
      </div>

      <a href="{{ url('/profile') }}" 
         class="flex items-center gap-2.5 px-4 py-2 text-[12px] text-slate-600 hover:bg-slate-50 hover:text-forest-800 transition-colors">
        <i class="fa-solid fa-user text-slate-400 text-[11px]"></i>
        Mon Profil
      </a>

      <a href="#" 
         class="flex items-center gap-2.5 px-4 py-2 text-[12px] text-slate-600 hover:bg-slate-50 hover:text-forest-800 transition-colors">
        <i class="fa-solid fa-bookmark text-slate-400 text-[11px]"></i>
        Mes Réservations
      </a>

      <div class="h-[1px] bg-slate-100 my-1"></div>

      <a href="{{ route('logout') }}" 
         class="flex items-center gap-2.5 px-4 py-2 text-[12px] text-red-500 hover:bg-red-50/50 font-medium transition-colors">
        <i class="fa-solid fa-arrow-right-from-bracket text-[11px]"></i>
        Déconnexion
      </a>
      
    </div>
  </div>
@endif
@endauth

  @guest
    <a href="{{ url('/login') }}" class="text-[12.5px] font-medium text-slate-600 hover:text-forest-800">Connexion</a>
    <a href="{{ url('/register') }}" class="bg-forest-800 text-white px-4 py-2 rounded-xl text-[12.5px] font-semibold hover:bg-forest-700">S'inscrire</a>
  @endguest
</div>
  </div>
</header>
  @yield('content')
  </body>
</html>