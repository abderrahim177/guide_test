@extends('layouts.master')

@section('content')
<style>
  .hero-gradient {
    background: linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.9) 100%);
  }
  .accent-sand-text { color: #d9a74a; }
  .accent-sand-bg { background-color: #fefcf6; }
  .accent-sand-border { border-color: #f3ebd4; }
  .badge-forest { background-color: #f0f7f4; color: #1e4632; }
</style>

<div class="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen pb-16">
  
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
    <a href="{{ url()->previous() }}" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/60 text-xs font-semibold transition-all group shadow-sm">
      <i class="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-0.5"></i>
      <span>Back to Guide Profile</span>
    </a>
  </div>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    
    <div class="relative h-[280px] sm:h-[380px] w-full rounded-3xl overflow-hidden shadow-md mb-8">
      <img src="{{ asset('places/' . $region->image) }}" alt="{{ $region->name }}" class="w-full h-full object-cover">
      <div class="absolute inset-0 hero-gradient flex flex-col justify-end p-6 sm:p-8">
        <span class="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Destination Overview</span>
        <h1 class="text-white text-3xl sm:text-5xl font-black tracking-tight">{{ $region->name }}</h1>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <div class="lg:col-span-8 space-y-8">
        
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
          <h2 class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <i class="fa-solid fa-circle-info text-slate-400"></i> About this Destination
          </h2>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            {{ $region->description ?? 'No description available for this beautiful region yet.' }}
          </p>
        </div>

        <div>
          <h2 class="text-base font-bold text-slate-900 tracking-tight mb-4 flex items-center gap-2">
            <i class="fa-solid fa-user-shield text-slate-500"></i> Available Expert Guides & Programs
          </h2>
          
          <div class="space-y-6">
            @forelse($region->programs as $program)
              <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6 hover:border-slate-200 transition-all">
                
                <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                      <img src="{{ asset($program->guide?->avatar ?? 'guides/guide1.jpg') }}" class="w-full h-full object-cover">
                    </div>
                    <div>
                      <h4 class="text-sm font-bold text-slate-900">{{ $program->guide?->name ?? 'Local Guide' }}</h4>
                      <span class="text-[10px] text-slate-400 font-medium">Certified Guide</span>
                    </div>
                  </div>
                  
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full badge-forest text-[10px] font-bold uppercase tracking-wider">
                    <i class="fa-solid {{ $program->activity?->icon ?? 'fa-compass' }}"></i>
                    {{ $program->activity?->name ?? 'Adventure' }}
                  </span>
                </div>

                <div>
                  <h3 class="text-lg font-bold text-slate-900 mb-2">{{ $program->title }}</h3>
                  <p class="text-slate-500 text-sm font-light leading-relaxed">{{ $program->description }}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <h5 class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <i class="fa-solid fa-toolbox text-slate-400"></i> Required Gear (Bring with you)
                    </h5>
                    <p class="text-xs text-slate-600 leading-relaxed">
                      {{ $program->required_materials ?? 'Standard personal adventure clothes and comfortable tracking shoes.' }}
                    </p>
                  </div>

                  <div class="p-4 accent-sand-bg accent-sand-border border rounded-2xl">
                    <h5 class="text-[11px] font-bold accent-sand-text uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <i class="fa-solid fa-hand-holding-dollar"></i> Available for Rent (Chez le Guide)
                    </h5>
                    <p class="text-xs text-slate-700 font-medium leading-relaxed">
                      {{ $program->available_rental_materials ?? 'Camping kits or technical gear available on request. Check availability with the guide.' }}
                    </p>
                  </div>
                </div>

                <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span class="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Price per day</span>
                    <span class="text-xl font-extrabold text-slate-900">{{ $program->price_per_day }} <span class="text-xs font-semibold text-slate-500">DH</span></span>
                  </div>
                  
                  <a href="https://wa.me/{{ $program->guide?->phone }}?text=Hello {{ $program->guide?->name }}, I want to book your program ({{ urlencode($program->title) }}) in {{ urlencode($region->name) }}" 
                     target="_blank" 
                     class="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2">
                    <i class="fa-brands fa-whatsapp text-sm"></i> Book Experience
                  </a>
                </div>

              </div>
            @empty
              <div class="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
                <i class="fa-solid fa-folder-open text-4xl text-slate-300 mb-3"></i>
                <p class="text-sm text-slate-400">No active guide programs registered for this specific destination yet.</p>
              </div>
            @endforelse
          </div>
        </div>

      </div>

      <div class="lg:col-span-4 lg:sticky lg:top-6">
        <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-md space-y-4">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Quick Destination Stats</h3>
          
          <div class="space-y-3">
            <div class="flex justify-between items-center py-2 border-b border-slate-50">
              <span class="text-xs text-slate-500 font-medium">Total Active Guides</span>
              <span class="text-xs font-bold text-slate-800">{{ $region->programs->count() }} Registered</span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-xs text-slate-500 font-medium">Safety Level</span>
              <span class="text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md">Highly Verified</span>
            </div>
          </div>
          
          <div class="pt-2">
            <p class="text-[11px] text-slate-400 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              <i class="fa-solid fa-shield-halved text-slate-400 mr-1"></i> All experiences are hosted by local residents holding legal touring certificates.
            </p>
          </div>
        </div>
      </div>

    </div>
  </main>
</div>
@endsection