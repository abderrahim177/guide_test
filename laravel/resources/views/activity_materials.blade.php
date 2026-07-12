<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gear & Materials - {{ $activity->name }}</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />

    <style>
        body {
            font-family: 'Poppins', sans-serif;
        }

        .hero-gradient {
            background: linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.85) 100%);
        }

        /* تحسين شكل أزرار السلايدر */
        .swiper-button-next,
        .swiper-button-prev {
            color: #0f172a !important;
            background: rgba(255, 255, 255, 0.9);
            width: 45px !important;
            height: 45px !important;
            border-radius: 14px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
            border: 1px solid rgba(241, 245, 249, 0.8);
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
            font-size: 16px !important;
            font-weight: bold;
        }

        .swiper-pagination-bullet-active {
            background: #059669 !important;
            /* Emerald 600 */
            width: 24px !important;
            border-radius: 4px !important;
        }
    </style>
</head>

<body class="bg-slate-50 text-slate-900 antialiased min-h-screen pb-24">

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 absolute top-0 left-0 right-0 z-50">
        <a href="{{ url()->previous() }}" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-md text-slate-700 hover:bg-white border border-white/20 text-xs font-semibold transition-all group shadow-sm">
            <i class="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-0.5"></i>
            <span>Back to Activities</span>
        </a>
    </div>

    <div class="relative h-[350px] sm:h-[480px] w-full overflow-hidden shadow-lg bg-slate-900">
        <img src="{{ asset('activities/' . $activity->image) }}" alt="{{ $activity->name }}" class="w-full h-full object-cover">
        <div class="absolute inset-0 hero-gradient flex flex-col justify-end">
            <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10 sm:pb-12">
                <div class="flex items-center gap-3 mb-3">
                    <span class="inline-flex items-center justify-center h-9 w-9 rounded-xl bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400">
                        <i class="fa-solid {{ $activity->icon ?? 'fa-compass' }} text-sm"></i>
                    </span>
                    <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest">Required Gear Guide</span>
                </div>
                <h1 class="text-white text-3xl sm:text-6xl font-black tracking-tight mb-2">{{ $activity->name }}</h1>
                <p class="text-slate-300 text-xs sm:text-base max-w-3xl font-light leading-relaxed">
                    Prepare yourself for the ultimate experience. Below is the full check-list of pro equipment and technical gear required to perform this activity safely and efficiently.
                </p>
            </div>
        </div>
    </div>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
            <div>
                <h2 class="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <i class="fa-solid fa-layer-group text-emerald-600"></i> Gear Checklist Catalog
                </h2>
                <p class="text-xs text-slate-400 mt-0.5">Swipe or click arrows to browse the required professional equipment</p>
            </div>

            <div>
                <a href="#rent-section"
                    class="inline-flex items-center gap-2.5 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg shadow-emerald-600/10 transition-all duration-300 transform hover:-translate-y-0.5 group">
                    <i class="fa-solid fa-hand-holding-dollar text-sm transition-transform group-hover:scale-110"></i>
                    <span>Rent Gear from Guide (طلب كراء المعدات)</span>
                </a>
            </div>
        </div>

        <div class="relative px-4 sm:px-8">
            <div class="swiper gearSwiper overflow-hidden pb-14">
                <div class="swiper-wrapper">

                    @forelse($equipments as $equipment)
                    <div class="swiper-slide bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-auto overflow-hidden group">

                        <div class="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
                            <img src="{{ asset('materials/' . $equipment->image) }}" alt="{{ $equipment->name }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent"></div>
                        </div>

                        <div class="p-6 flex flex-col justify-between flex-1 min-h-[160px]">
                            <div class="space-y-2">
                                <h3 class="text-base font-bold text-slate-950 group-hover:text-emerald-600 transition-colors">
                                    {{ $equipment->name }}
                                </h3>
                                <p class="text-xs text-slate-500 font-light leading-relaxed line-clamp-3">
                                    {{ $equipment->description }}
                                </p>
                            </div>

                            <div class="pt-4 mt-auto border-t border-slate-50 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                <span>Category</span>
                                <span class="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Essential</span>
                            </div>
                        </div>

                    </div>
                    @empty
                    <div class="swiper-slide col-span-full bg-white rounded-3xl p-16 text-center border border-dashed border-slate-200">
                        <i class="fa-solid fa-toolbox text-4xl text-slate-200 mb-3 block"></i>
                        <h4 class="text-sm font-bold text-slate-700">No specific gear listed</h4>
                        <p class="text-xs text-slate-400 max-w-xs mx-auto mt-1">Standard personal adventure clothes are enough for this activity.</p>
                    </div>
                    @endforelse

                </div>

                <div class="swiper-pagination !bottom-0"></div>
            </div>

            <div class="swiper-button-prev !-left-2 sm:!-left-4"></div>
            <div class="swiper-button-next !-right-2 sm:!-right-4"></div>
        </div>

        <div id="rent-section" class="mt-16 bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-slate-800">
            <div class="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10 pointer-events-none">
                <i class="fa-solid fa-hand-holding-dollar text-[200px]"></i>
            </div>

            <div class="max-w-2xl space-y-4 relative z-10">
                <span class="text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                    Hassle-Free Adventure
                </span>
                <h3 class="text-2xl sm:text-3xl font-black tracking-tight">Don't own the required technical materials?</h3>
                <p class="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                    Don't worry! You can rent all these professional supplies and technical gear directly from our local guide upon arrival at very affordable prices, with guaranteed safety and high quality.
                </p>
                <div class="pt-4 flex flex-wrap gap-4">
                    <a href="{{ route('guide_materials', ['id' => $activity->id]) }}"
                        class="px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 group">
                        <i class="fa-solid fa-boxes-stacked text-sm text-emerald-600 transition-transform group-hover:scale-110"></i>
                        <span>View Guide's Rental Gear</span>
                    </a>
                </div>
            </div>
        </div>

    </main>

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            new Swiper(".gearSwiper", {
                slidesPerView: 1,
                spaceBetween: 20,
                grabCursor: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                },
            });
        });
    </script>
</body>

</html>