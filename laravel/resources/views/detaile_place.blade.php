<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ $region->name }} - Activities</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,500&display=swap" rel="stylesheet">

  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.13.5/cdn.min.js"></script>
</head>
<style>
  .hero-gradient {
    background: linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.9) 100%);
  }
</style>

<body class="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen pb-16">

 <!-- 1. زر الرجوع دابا ولا فوق الصورة وطاير فوق منها (Absolute Position) -->
<div class="absolute top-6 left-0 right-0 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <a href="{{ url()->previous() }}" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/40 backdrop-blur-md text-white hover:bg-slate-900/60 border border-white/10 text-xs font-semibold transition-all group shadow-md">
    <i class="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-0.5"></i>
    <span>Back to Destination Guide</span>
  </a>
</div>

<!-- 2. الـ Hero Section دابا شاد الشاشة كاملة من الحافة للحافة ومن الفوق كاع (Full Width & Top 0) -->
<div class="relative h-[350px] sm:h-[500px] w-full overflow-hidden shadow-2xl mb-10 group bg-slate-900">
  
  <!-- Image Component -->
  <img src="{{ asset('places/' . $region->image) }}" 
       alt="{{ $region->name }}" 
       class="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-1000 ease-out opacity-85">
  
  <!-- Premium Dual Gradient Overlay (زدنا ف الـ pt-32 باش النص ما يتداخلش مع الزر لفو9) -->
  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex flex-col justify-end pb-12 pt-32">
    
    <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl space-y-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        
        <!-- Glassmorphic Subtitle Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
          <span class="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          <span class="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Explore Destination</span>
        </div>
        
        <!-- Title -->
        <h1 class="text-white text-4xl sm:text-7xl font-black tracking-tight drop-shadow-xl leading-none">
          {{ $region->name }}
        </h1>
        
        <!-- Description -->
        <p class="text-slate-200/90 text-sm sm:text-base font-light leading-relaxed max-w-2xl drop-shadow-md line-clamp-3 pt-1">
          {{ $region->description ?? 'Discover the top outdoor activities and professional experiences available in this breathtaking region.' }}
        </p>
        
      </div>
    </div>
    
  </div>
  
  <!-- Top Ambient Glow Line -->
  <div class="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
</div>

<!-- 3. عاد هنايا كتفتح الـ main ديالك اللي غاتحط فيه السلايدر وباقي البيانات المحمية بـ Container -->
<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
  <!-- الكود ديال الأنشطة والمعدات حطو هنا لداخل -->
</main>

    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-slate-950 tracking-tight flex items-center gap-2">
          <i class="fa-solid fa-person-running text-emerald-600"></i> Available Outdoor Activities
        </h2>
        <p class="text-xs text-slate-400 mt-1">Select an activity to view required gear and materials</p>
      </div>
      <span class="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 font-semibold rounded-xl border border-emerald-100">
        {{ $region->activities->count() }} Activities Found
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      @forelse($region->activities as $activity)
      <div class="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">

        <div class="relative h-48 w-full overflow-hidden bg-slate-100">
          <img src="{{ asset('activities/' . $activity->image) }}" alt="{{ $activity->name }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">

          <div class="absolute top-4 left-4 h-9 w-9 rounded-xl bg-white/90 backdrop-blur-md text-slate-800 flex items-center justify-center shadow-sm border border-white/20">
            <i class="fa-solid {{ $activity->icon ?? 'fa-compass' }} text-sm text-emerald-600"></i>
          </div>
        </div>

        <div class="p-5 flex-grid flex flex-col justify-between flex-1 space-y-4">
          <div>
            <h3 class="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-1">
              {{ $activity->name }}
            </h3>
            <p class="text-xs text-slate-400 font-medium">Available in {{ $region->name }}</p>
          </div>

          <div class="pt-2">
            <a href="{{ route('activity_materials', ['id' => $activity->id]) }}"
              class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-950 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group/btn">
              <i class="fa-solid fa-toolbox text-[13px] text-slate-400 group-hover/btn:text-white transition-colors"></i>
              <span>Show Required Materials</span>
              <i class="fa-solid fa-arrow-right text-[10px] opacity-60 group-hover/btn:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </div>

      </div>
      @empty
      <div class="col-span-full bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
        <div class="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-3 border border-slate-100">
          <i class="fa-solid fa-map-location-dot text-xl text-slate-300"></i>
        </div>
        <h4 class="text-sm font-bold text-slate-700 mb-1">No activities listed yet</h4>
        <p class="text-xs text-slate-400 max-w-xs mx-auto">We haven't linked any specific outdoor activities to this destination yet. Check back soon!</p>
      </div>
      @endforelse
    </div>

  </main>

</body>

</html>