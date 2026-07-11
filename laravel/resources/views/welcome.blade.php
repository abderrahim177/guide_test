@extends('layouts.master')
@section('content')
<section class="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
  <img
    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80"
    onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1800&q=80';"
    alt="Moroccan mountain landscape"
    class="absolute inset-0 w-full h-full object-cover">
  <div class="absolute inset-0 bg-gradient-to-b from-forest-900/60 via-forest-900/35 to-forest-900/80"></div>
  <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"></div>

  <div class="relative z-10 h-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center">
    <span class="inline-flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur-md text-white text-[10.5px] font-semibold tracking-[0.14em] uppercase px-4 py-2 rounded-full mb-6">
      <i class="fa-solid fa-mountain-sun text-[10px] text-sand-300"></i>
      Local Berber Guides · High Atlas &amp; Beyond
    </span>

    <h1 class="text-white font-semibold leading-[1.15] text-[34px] sm:text-[46px] lg:text-[54px] tracking-tight max-w-3xl">
      Explore Morocco with
      <span class="italic font-medium text-sand-300">Expert Local Guides</span>
    </h1>

    <p class="text-white/75 text-[13.5px] sm:text-[14.5px] mt-5 max-w-md font-light">
      From Toubkal summits to Sahara dunes — every trail led by someone who calls it home.
    </p>

    <!-- Search bar -->
    <div class="mt-10 w-full max-w-2xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-float p-2 flex flex-col sm:flex-row items-stretch gap-2">

      <div class="flex items-center gap-3 flex-1 px-4 py-3 sm:border-r border-slate-100">
        <i class="fa-solid fa-location-dot text-forest-500 text-[13px]"></i>
        <div class="text-left w-full">
          <label class="block text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Location</label>

          <select class="text-[12.5px] font-medium text-slate-800 bg-transparent outline-none w-full cursor-pointer">
            <option value="">Select a location</option>
            @foreach($locations as $location)
            <option value="{{ $location->id }}">{{ $location->name }}</option>
            @endforeach
          </select>

        </div>
      </div>

      <div class="flex items-center gap-3 flex-1 px-4 py-3 sm:border-r border-slate-100">
        <i class="fa-solid fa-person-hiking text-forest-500 text-[13px]"></i>
        <div class="text-left w-full">
          <label class="block text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Activity</label>

          <select class="text-[12.5px] font-medium text-slate-800 bg-transparent outline-none w-full cursor-pointer">
            <option value="">Select an activity</option>
            @foreach($places as $place)
            <option value="{{ $place->id }}">{{ $place->name }}</option>
            @endforeach
          </select>

        </div>
      </div>

      <button class="flex items-center justify-center gap-2 bg-forest-800 hover:bg-forest-700 transition-colors text-white text-[12.5px] font-semibold px-6 py-3 rounded-xl">
        <i class="fa-solid fa-magnifying-glass text-[11px]"></i> Search
      </button>

    </div>

    <div class="flex items-center gap-6 mt-8 text-white/70 text-[10.5px] font-medium">
      <span class="flex items-center gap-1.5"><i class="fa-solid fa-shield-heart text-sand-300"></i> Certified guides</span>
      <span class="flex items-center gap-1.5"><i class="fa-solid fa-star text-sand-300"></i> 4.9 avg rating</span>
      <span class="flex items-center gap-1.5"><i class="fa-solid fa-people-group text-sand-300"></i> 12k+ travelers</span>
    </div>
  </div>

  <!-- Scroll cue -->
  <div class="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 text-white/60 text-[10px] flex flex-col items-center gap-2">
    <span class="tracking-[0.2em] uppercase">Scroll</span>
    <i class="fa-solid fa-arrow-down animate-bounce"></i>
  </div>
</section>

<!-- ============ DESTINATIONS SLIDER ============ -->
<section id="destinations" class="max-w-7xl mx-auto px-6 py-20 sm:py-24">
  <div class="flex items-end justify-between mb-10 flex-wrap gap-5">
    <div>
      <span class="inline-flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.14em] uppercase text-forest-600 mb-3">
        <span class="w-4 h-[1.5px] bg-sand-500"></span> Curated Escapes
      </span>
      <h2 class="text-[26px] sm:text-[30px] font-semibold text-forest-900 tracking-tight">Destinations Nature Populaires</h2>
      <p class="text-slate-500 text-[12.5px] mt-2 max-w-md font-light">Hand-picked landscapes across Morocco, each paired with a local expert.</p>
    </div>

    <!-- Slider controls -->
    <div class="flex items-center gap-3" x-data>
      <button @click="$refs.slider.scrollBy({left:-320, behavior:'smooth'})"
        class="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-forest-700 hover:bg-forest-800 hover:text-white hover:border-forest-800 transition-all shadow-soft">
        <i class="fa-solid fa-arrow-left text-[12px]"></i>
      </button>
      <button @click="$refs.slider.scrollBy({left:320, behavior:'smooth'})"
        class="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-forest-700 hover:bg-forest-800 hover:text-white hover:border-forest-800 transition-all shadow-soft">
        <i class="fa-solid fa-arrow-right text-[12px]"></i>
      </button>
    </div>

    <div x-ref="slider" x-data
      class="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-1 px-1">

      @foreach($guides as $guide)
      <div class="card-hover snap-start flex-shrink-0 w-[260px] sm:w-[280px] bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card border border-slate-100">

        <div class="card-img-wrap relative h-[170px] overflow-hidden">
          <img src="{{ asset($guide->guide?->avatar ?? 'guides/guide1.jpg') }}" alt="{{ $guide->guide?->name ?? 'Guide' }}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"></div>

          <span class="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-[10.5px] font-semibold text-forest-800 px-2.5 py-1 rounded-full shadow-soft">
            <i class="fa-solid fa-star text-sand-500 text-[9px]"></i> <span>4.9</span>
          </span>

          <span class="absolute bottom-3 left-3 flex items-center gap-1.5 bg-forest-900/70 backdrop-blur-sm text-white text-[9.5px] font-medium px-2.5 py-1.5 rounded-full">
            <i class="fa-solid text-[10px] text-sand-300 {{ $guide->activity?->icon }}"></i> <span>{{ $guide->activity?->name }}</span>
          </span>
        </div>

        <div class="p-4">
          <div class="flex items-center gap-1.5 text-[9.5px] font-semibold text-slate-400 uppercase tracking-wide">
            <i class="fa-solid fa-location-dot text-[9px]"></i> <span>{{ $guide->region?->name }}</span>
          </div>

          <h3 class="text-[14.5px] font-semibold text-forest-900 mt-1.5">
            {{ $guide->guide?->name ?? 'Unknown Guide' }}
          </h3>
          <div class="flex items-center justify-between mt-3.5 pt-3 border-t border-slate-100">
            <div class="text-[13px] font-bold text-forest-700">
              <span>{{ $guide->price_per_day }} DH</span> <span class="text-[10px] font-normal text-slate-400">/ day</span>
            </div>

            <a href="#"  class="w-8 h-8 rounded-full bg-forest-50 hover:bg-forest-800 text-forest-700 hover:text-white flex items-center justify-center transition-colors">
              <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </a>
          </div>
        </div>
      </div>
      @endforeach

      <div class="snap-start flex-shrink-0 w-[260px] sm:w-[280px] rounded-2xl bg-forest-800 flex flex-col items-center justify-center text-center text-white p-6">
        <i class="fa-solid fa-compass text-[22px] text-sand-300 mb-4"></i>
        <p class="text-[13px] font-semibold">Explore all destinations</p>
        <p class="text-[10.5px] text-white/60 mt-1.5 font-light">Curated escapes across Azilal</p>
        <button class="mt-5 text-[11px] font-semibold bg-white text-forest-800 px-4 py-2 rounded-xl">View all →</button>
      </div>
    </div>
</section>

<!-- ============ FOOTER (Professional & Modern) ============ -->
<!-- هاد الفوتر متناسق 100% مع ألوان الهيدر والطبيعة وتصميمو عصري -->
<footer class="bg-slate-900 text-slate-400 text-xs py-16 border-t border-slate-800">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

    <!-- Column 1: Brand -->
    <div class="space-y-4">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
          <i class="fa-solid fa-compass"></i>
        </div>
        <span class="text-sm font-bold text-white tracking-tight">Eco<span class="text-sand-300">Tour</span></span>
      </div>
      <p class="text-[11.5px] text-slate-400 leading-relaxed font-light">
        Découvrez le Maroc de manière authentique avec des guides locaux certifiés. Randonnées, aventures et partage.
      </p>
      <div class="flex items-center gap-3 text-slate-500 pt-2">
        <a href="#" class="hover:text-sand-300 transition-colors"><i class="fa-brands fa-instagram text-sm"></i></a>
        <a href="#" class="hover:text-sand-300 transition-colors"><i class="fa-brands fa-facebook text-sm"></i></a>
        <a href="#" class="hover:text-sand-300 transition-colors"><i class="fa-brands fa-x-twitter text-sm"></i></a>
      </div>
    </div>

    <!-- Column 2: Quick Links -->
    <div>
      <h4 class="text-white font-semibold text-[12.5px] tracking-wide uppercase mb-4">Plateforme</h4>
      <ul class="space-y-2.5 font-light text-[12px]">
        <li><a href="#" class="hover:text-white transition-colors">Trouver un Guide</a></li>
        <li><a href="#" class="hover:text-white transition-colors">Louer du Matériel</a></li>
        <li><a href="#" class="hover:text-white transition-colors">Destinations</a></li>
        <li><a href="#" class="hover:text-white transition-colors">Destinations Populaires</a></li>
      </ul>
    </div>

    <!-- Column 3: Support -->
    <div>
      <h4 class="text-white font-semibold text-[12.5px] tracking-wide uppercase mb-4">Support</h4>
      <ul class="space-y-2.5 font-light text-[12px]">
        <li><a href="#" class="hover:text-white transition-colors">Centre d'aide</a></li>
        <li><a href="#" class="hover:text-white transition-colors">Devenir Guide Certifié</a></li>
        <li><a href="#" class="hover:text-white transition-colors">Conditions d'utilisation</a></li>
        <li><a href="#" class="hover:text-white transition-colors">Politique de Confidentialité</a></li>
      </ul>
    </div>

    <!-- Column 4: Newsletter -->
    <div class="space-y-3">
      <h4 class="text-white font-semibold text-[12.5px] tracking-wide uppercase mb-3">Newsletter</h4>
      <p class="text-[11.5px] text-slate-400 font-light">Inscrivez-vous pour recevoir les dernières aventures et offres.</p>
      <form class="flex gap-2 pt-1">
        <input type="email" placeholder="Votre email" class="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-[12px] focus:outline-none focus:border-emerald-500 text-white placeholder-slate-500">
        <button type="submit" class="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-3 py-2 rounded-xl transition-colors shrink-0">
          <i class="fa-solid fa-paper-plane text-[11px]"></i>
        </button>
      </form>
    </div>

  </div>

  <!-- Bottom Copyright -->
  <div class="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
    <p>© 2026 EcoTour. Tous droits réservés.</p>
    <p class="font-light">Fait avec <i class="fa-solid fa-heart text-red-500/80 mx-0.5"></i> pour les amoureux de la nature.</p>
  </div>
</footer>

@endsection