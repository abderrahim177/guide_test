@extends('layouts.master')
@section('content')
<body class="bg-slate-50 text-slate-800 font-sans antialiased">

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
    <a href="{{ route('home') }}" class="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-forest-700 transition-colors">
      <i class="fa-solid fa-arrow-left text-[12px]"></i> Back to Explore
    </a>
  </div>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
          <div class="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-forest-50 shadow-inner">
            <img src="{{ asset($guideUser->avatar ?? 'guides/guide1.jpg') }}" alt="{{ $guideUser->name }}" class="w-full h-full object-cover">
          </div>
          
          <h1 class="text-xl font-bold text-forest-900 mt-4 flex items-center justify-center gap-1.5">
            {{ $guideUser->name }}
            <i class="fa-solid fa-circle-check text-sky-500 text-sm" title="Verified Guide"></i>
          </h1>
          <p class="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">Certified Local Guide</p>

          <div class="flex items-center justify-center gap-4 mt-4 py-3 bg-slate-50 rounded-2xl">
            <div class="text-center">
              <span class="block text-sm font-bold text-forest-900"><i class="fa-solid fa-star text-sand-500 mr-0.5"></i> 4.9</span>
              <span class="text-[10px] text-slate-400">Rating</span>
            </div>
            <div class="w-px h-6 bg-slate-200"></div>
            <div class="text-center">
              <span class="block text-sm font-bold text-forest-900">{{ $programs->count() }}</span>
              <span class="text-[10px] text-slate-400">Regions</span>
            </div>
          </div>

          <p class="text-sm text-slate-500 leading-relaxed mt-4">
            {{ $guideUser->bio ?? 'Passionate local guide helping travelers discover the hidden gems, authentic culture, and breathtaking wilderness across the region.' }}
          </p>

          <div class="mt-6 space-y-2">
            <a href="https://wa.me/{{ $guideUser->phone }}" target="_blank" class="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-semibold text-sm transition-all shadow-sm">
              <i class="fa-brands fa-whatsapp text-lg"></i> Instant WhatsApp Chat
            </a>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2 space-y-8">
        <div>
          <h2 class="text-2xl font-bold text-forest-900">Hosted Experiences & Regions</h2>
          <p class="text-sm text-slate-400 mt-1">Discover custom tours curated specifically by this guide.</p>
        </div>

        <div class="space-y-6">
          @forelse($programs as $program)
            <div class="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all grid grid-cols-1 md:grid-cols-12">
              <div class="md:col-span-5 relative h-48 md:h-full min-h-[180px]">
                <img src="{{ asset('places/' . $program->region?->image) }}" alt="{{ $program->region?->name }}" class="w-full h-full object-cover">                
                <span class="absolute top-3 left-3 flex items-center gap-1.5 bg-forest-900/80 backdrop-blur-sm text-white text-[10px] font-medium px-3 py-1.5 rounded-full">
                  <i class="fa-solid {{ $program->activity?->icon ?? 'fa-compass' }} text-sand-300"></i>
                  {{ $program->activity?->name }}
                </span>
              </div>

              <div class="md:col-span-7 p-6 flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <i class="fa-solid fa-location-dot text-forest-700"></i> {{ $program->region?->name }}
                  </div>
                  <h3 class="text-lg font-bold text-forest-900 mt-2">{{ $program->title }}</h3>
                  <p class="text-sm text-slate-500 line-clamp-3 mt-2 leading-relaxed">
                    {{ $program->description }}
                  </p>
                </div>

                <div class="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                  <div>
                    <span class="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">Price per day</span>
                    <span class="text-lg font-extrabold text-forest-700">{{ $program->price_per_day }} DH</span>
                  </div>
                  
                  <a href="https://wa.me/{{ $guideUser->phone }}?text=Hello {{ $guideUser->name }}, I am interested in booking your '{{ $program->title }}' tour." target="_blank" class="px-5 py-2.5 bg-forest-50 hover:bg-forest-700 text-forest-700 hover:text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1">
                    Book Region <i class="fa-solid fa-chevron-right text-[10px]"></i>
                  </a>
                </div>

              </div>
            </div>
          @empty
            <div class="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
              <i class="fa-solid fa-folder-open text-4xl text-slate-300 mb-3"></i>
              <p class="text-sm text-slate-400">No active tours registered for this guide at the moment.</p>
            </div>
          @endforelse
        </div>
      </div>

    </div>
  </main>

@endsection