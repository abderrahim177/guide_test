<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Available Rental Gear - Professional Marketplace</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <script src="https://cdn.tailwindcss.com"></script>

    <style>
        body {
            font-family: 'Poppins', sans-serif;
        }

        /* تحسين شكل السكرول بار ف المتصفحات الحديثة */
        .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #cbd5e1 #f1f5f9;
        }

        /* تخصيص السكرول بار لـ Webkit (Chrome, Safari, Edge) */
        .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
    </style>
</head>

<body class="bg-slate-50 text-slate-900 antialiased pb-12">

    <header class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

            <a href="{{ url()->previous() }}" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all border border-slate-200/60">
                <i class="fa-solid fa-arrow-left"></i>
                <span class="hidden sm:inline">Back</span>
            </a>

            <div class="text-center">
                <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-widest block mb-0.5">Local Guides Equipment</span>
                <h1 class="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Gear Rental Marketplace</h1>
            </div>

            <button onclick="toggleCartModal(true)" class="relative p-3 bg-slate-900 text-white hover:bg-slate-800 rounded-xl shadow-md transition-all group flex items-center gap-2">
                <i class="fa-solid fa-basket-shopping text-sm transition-transform group-hover:scale-110"></i>
                <span class="text-xs font-bold hidden sm:inline">My Basket</span>
                <span id="cart-count" class="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-white shadow-sm animate-pulse">0</span>
            </button>

        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div class="mb-8 p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-xl border border-slate-800">
            <div class="space-y-1">
                <h2 class="text-lg font-bold tracking-tight">Professional Gear & Kits Available For Hire</h2>
                <p class="text-xs text-slate-400 font-light">Select the essential items you need. Collect them securely directly from your guide on site.</p>
            </div>
            <div class="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2.5 rounded-2xl text-xs text-amber-400 font-semibold self-start sm:self-auto">
                <i class="fa-solid fa-shield-halved text-sm"></i>
                <span>Guaranteed Safety Inspected Items</span>
            </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            @forelse($rentalItems as $equipment)
            {{-- الساروت هنا: خاصها تسالي بـ endphp باش ما تبانش ف الصفحة --}}
            @php
            $currentGuide = $equipment->guides->first();
            @endphp

            <div class="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group">

                <div class="relative aspect-[4/3] bg-slate-50 overflow-hidden">
                    <img src="{{ asset('materials/' . $equipment->image) }}" alt="{{ $equipment->name }}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">

                    <div class="absolute top-3 left-3 px-2 py-1 rounded-md bg-slate-900/60 backdrop-blur-md text-[10px] font-semibold text-white border border-white/10">
                        Stock: <span class="text-emerald-400 font-bold">{{ $currentGuide->pivot->stock ?? 0 }} pcs</span>
                    </div>
                </div>

                <div class="p-5 flex flex-col flex-1 justify-between space-y-4">
                    <div class="space-y-1.5">
                        <span class="text-[9px] font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1">
                            <i class="fa-solid fa-user-tie text-emerald-600"></i> Guide: {{ $guide->name ?? ($currentGuide->name ?? 'Unknown') }}
                        </span>
                        <h3 class="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                            {{ $equipment->name }}
                        </h3>
                        <p class="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed">
                            {{ $equipment->description ?? 'No extra technical details provided.' }}
                        </p>
                    </div>

                    <div class="pt-3 border-t border-slate-50 flex items-center justify-between">
                        <div>
                            <span class="text-xs text-slate-400 block text-[9px] uppercase tracking-wider font-semibold">Per Day</span>
                            <span class="text-base font-black text-slate-950">{{ number_format($currentGuide->pivot->price_per_day ?? 0, 2) }} <span class="text-xs font-bold text-emerald-600">DH</span></span>
                        </div>

                        <button
                            class="add-to-cart-btn inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white text-xs font-bold rounded-xl transition-all duration-200"
                            data-id="{{ $equipment->id }}"
                            data-equipment-id="{{ $equipment->id }}"
                            data-guide-id="{{ $guide->id ?? ($currentGuide->id ?? '') }}"
                            data-name="{{ $equipment->name }}"
                            data-image="{{ asset('materials/' . $equipment->image) }}"
                            data-price="{{ $currentGuide->pivot->price_per_day ?? 0 }}"
                            data-guide-name="{{ $guide->name ?? ($currentGuide->name ?? '') }}">
                            <i class="fa-solid fa-plus text-[10px]"></i>
                            <span>Add to Basket</span>
                        </button>
                    </div>
                </div>

            </div>
            @empty
            <div class="col-span-full bg-white border border-dashed border-slate-200 rounded-3xl p-16 text-center shadow-inner">
                <i class="fa-solid fa-boxes-open text-4xl text-slate-300 mb-3 block"></i>
                <h4 class="text-sm font-bold text-slate-700">No rental inventory listed</h4>
                <p class="text-xs text-slate-400 max-w-xs mx-auto mt-1">This guide doesn't have rental assets for this activity yet.</p>
            </div>
            @endforelse

        </div>
    </main>

    <div id="cart-modal" class="fixed inset-0 top-0 left-0 right-0 bottom-0 z-50 bg-slate-900/60 backdrop-blur-sm hidden flex justify-end transition-all duration-300">

        <div class="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">

            <div class="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-basket-shopping text-emerald-600 text-base"></i>
                    <h2 class="text-base font-bold text-slate-950">Selected Rental Gear</h2>
                </div>
                <button onclick="toggleCartModal(false)" class="h-8 w-8 rounded-xl bg-white hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center border border-slate-200/60 shadow-sm transition-all">
                    <i class="fa-solid fa-xmark text-xs"></i>
                </button>
            </div>

            <div id="cart-items-container" class="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            </div>

            <div class="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                <div class="flex items-center justify-between text-slate-900">
                    <span class="text-xs font-medium text-slate-500">Estimated Daily Total:</span>
                    <span id="cart-total-price" class="text-lg font-black text-slate-950">0.00 <span class="text-xs font-bold text-emerald-600">DH</span></span>
                </div>

                <button onclick="confirmRentalOrder()" class="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all text-center block uppercase tracking-wider">
                    <i class="fa-solid fa-square-check mr-1.5 text-sm"></i> Confirm Rental Request
                </button>
            </div>

        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        // Global Memory Array to keep cart state
        let globalCart = [];

        /**
         * دالة إظهار وإخفاء الـ Modal باستعمال كلاس hidden
         */
        function toggleCartModal(show) {
            const modal = document.getElementById('cart-modal');

            if (show) {
                modal.classList.remove('hidden');
                renderCartDOM();
            } else {
                modal.classList.add('hidden');
            }
        }

        /**
         * دالة إضافة المعدات للسلة
         */
        function addToCart(id, name, img, price, guide) {
            const existingItem = globalCart.find(item => item.id === id);

            if (existingItem) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Already in Basket!',
                    text: `"${name}" has already been added to your selection.`,
                    confirmButtonColor: '#059669',
                    customClass: {
                        popup: 'rounded-2xl'
                    }
                });
                return;
            }

            globalCart.push({
                id,
                name,
                img,
                price,
                guide
            });

            Swal.fire({
                icon: 'success',
                title: 'Added to Basket',
                text: `"${name}" successfully added.`,
                showConfirmButton: false,
                timer: 1500,
                position: 'top-end',
                toast: true
            });

            updateCartStatusCounters();
        }

        /**
         * حذف عنصر من السلة
         */
        function removeCartItem(id) {
            globalCart = globalCart.filter(item => item.id !== id);
            updateCartStatusCounters();
            renderCartDOM();
        }

        /**
         * تحديث العداد
         */
        function updateCartStatusCounters() {
            document.getElementById('cart-count').innerText = globalCart.length;
        }

        /**
         * بناء وعرض عناصر السلة ديناميكياً داخل الـ Modal
         */
        function renderCartDOM() {
            const container = document.getElementById('cart-items-container');
            const totalLabel = document.getElementById('cart-total-price');

            container.innerHTML = '';
            let runningSum = 0;

            if (globalCart.length === 0) {
                container.innerHTML = `
      <div class="text-center py-16 text-slate-300">
        <i class="fa-solid fa-basket-shopping text-3xl mb-2 block"></i>
        <p class="text-xs font-medium text-slate-400">Your rental selection is empty.</p>
      </div>`;
                totalLabel.innerHTML = `0.00 <span class="text-xs font-bold text-emerald-600">DH</span>`;
                return;
            }

            globalCart.forEach(item => {
                runningSum += item.price;

                const element = document.createElement('div');
                element.className = "flex items-center gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100 shadow-sm relative group";
                element.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="w-12 h-12 rounded-lg object-cover bg-white border border-slate-200">
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-slate-900 truncate">${item.name}</h4>
        <span class="text-[9px] text-slate-400 font-medium block">Guide: ${item.guide}</span>
        <span class="text-xs font-bold text-slate-950 block mt-0.5">${item.price.toFixed(2)} DH</span>
      </div>
      <button onclick="removeCartItem(${item.id})" class="h-7 w-7 rounded-lg bg-red-50 hover:bg-red-500 text-red-600 hover:text-white flex items-center justify-center transition-colors">
        <i class="fa-solid fa-trash-can text-[10px]"></i>
      </button>
    `;
                container.appendChild(element);
            });

            totalLabel.innerHTML = `${runningSum.toFixed(2)} <span class="text-xs font-bold text-emerald-600">DH</span>`;
        }

        /**
         * تأكيد طلب الكراء
         */
        function confirmRentalOrder() {
            if (globalCart.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Empty Request',
                    text: 'Kindly select at least one item before confirming.',
                    confirmButtonColor: '#ef4444'
                });
                return;
            }

            toggleCartModal(false);

            Swal.fire({
                icon: 'success',
                title: 'Rental Order Confirmed!',
                text: 'Your gear reservation request has been sent successfully.',
                confirmButtonColor: '#059669',
                customClass: {
                    popup: 'rounded-2xl'
                }
            }).then(() => {
                globalCart = [];
                updateCartStatusCounters();
            });
        }

        /**
         * ربط أزرار الـ Add to Cart بالـ Data Attributes
         */
        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.add-to-cart-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    const name = this.getAttribute('data-name');
                    const img = this.getAttribute('data-image');
                    const price = parseFloat(this.getAttribute('data-price'));
                    const guide = this.getAttribute('data-guide');

                    addToCart(id, name, img, price, guide);
                });
            });
        });
    </script>
</body>

</html>