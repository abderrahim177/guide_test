@extends('layouts.master')

@section('content')
<!-- ألوان الهوية البصرية الجديدة الفاخرة (Premium Carbon & Sand Accent) -->
<style>
  .premium-carbon-gradient {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  }
  .accent-sand-text { color: #dfb76c; }
  .accent-sand-bg { background-color: #fdfaf4; }
  .accent-sand-border { border-color: #f5ebd5; }
</style>

<div class="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen">
  
  <!-- ================= PREMIUM HEADER BANNER ================= -->
  <div class="premium-carbon-gradient text-white relative overflow-hidden shadow-sm py-12 sm:py-14 border-b border-slate-900/10">
    <!-- خلفيات هندسية ناعمة للمظهر المودرن -->
    <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/[0.02] rounded-full blur-2xl"></div>
    <div class="absolute left-1/3 top-0 w-60 h-24 bg-slate-700/[0.05] rounded-full blur-3xl"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- زر الرجوع العصري والمحترف -->
      <div class="mb-6">
        <a href="{{ route('home') }}" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 hover:border-white/10 text-xs font-medium transition-all group shadow-sm">
          <i class="fa-solid fa-angle-left transition-transform group-hover:-translate-x-0.5"></i>
          <span>Retour à l'accueil</span>
        </a>
      </div>

      <div class="relative flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
        
        <!-- شعار الحرف الأول أو الصورة الشخصية في حالة وجودها -->
        <div class="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-white/10 shadow-xl flex-shrink-0 relative">
          @if(Auth::user()->avatar)
            <img src="{{ asset(Auth::user()->avatar) }}" alt="{{ Auth::user()->name }}" class="w-full h-full object-cover">
          @else
            <div class="w-full h-full bg-slate-800 text-white flex items-center justify-center text-3xl md:text-4xl font-extrabold tracking-wide uppercase select-none border border-slate-700">
              {{ mb_substr(Auth::user()->name, 0, 1, 'utf-8') }}
            </div>
          @endif
        </div>

        <!-- معلومات المستخدم الأساسية -->
        <div class="flex-grow pb-2">
          <h1 class="text-2xl md:text-3xl font-bold tracking-tight flex items-center justify-center md:justify-start gap-2">
            {{ Auth::user()->name }}
            <i class="fa-solid fa-circle-check text-sky-400 text-sm md:text-base" title="Verified Profile"></i>
          </h1>
          <p class="text-slate-400 text-sm mt-1.5 font-light flex items-center justify-center md:justify-start gap-1.5">
            <i class="fa-regular fa-envelope text-xs text-slate-500"></i> {{ Auth::user()->email }}
          </p>
          @if(Auth::user()->phone)
          <p class="text-slate-400 text-xs mt-1 font-light flex items-center justify-center md:justify-start gap-1.5">
            <i class="fa-solid fa-phone text-[10px] text-slate-500"></i> {{ Auth::user()->phone }}
          </p>
          @endif
        </div>

        <!-- زر تعديل البروفايل -->
        <div class="md:pb-2">
          <button class="bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all border border-white/10 flex items-center gap-2">
            <i class="fa-regular fa-pen-to-square"></i> Edit Profile
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ================= MAIN CONTENT CONTAINER ================= -->
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      
      <!-- القسم الأيسر: نظرة عامة والإعدادات -->
      <div class="space-y-6 lg:col-span-1">
        
        <!-- كارت تفاصيل الحساب -->
        <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <i class="fa-solid fa-chart-pie text-slate-500"></i> Account Overview
          </h2>
          <div class="space-y-4">
            <div class="flex justify-between items-center py-2 border-b border-slate-50">
              <span class="text-xs text-slate-400 font-medium">Member Since</span>
              <span class="text-xs font-semibold text-slate-700">{{ Auth::user()->created_at ? Auth::user()->created_at->format('M Y') : 'July 2026' }}</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-slate-50">
              <span class="text-xs text-slate-400 font-medium">Account Status</span>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md">Active</span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-xs text-slate-400 font-medium">Verified Phone</span>
              <span class="text-xs font-semibold text-slate-700">{{ Auth::user()->phone ? 'Yes' : 'Not Provided' }}</span>
            </div>
          </div>
        </div>

        <!-- كارت الأمان والإعدادات -->
        <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
            <i class="fa-solid fa-shield-halved text-slate-500"></i> Safety & Settings
          </h2>
          <div class="space-y-2">
            <button class="w-full text-left text-xs font-medium text-slate-600 hover:text-slate-900 py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between">
              <span>Change Password</span> <i class="fa-solid fa-chevron-right text-[9px] text-slate-300"></i>
            </button>
            <button class="w-full text-left text-xs font-medium text-slate-600 hover:text-slate-900 py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between">
              <span>Notification Preferences</span> <i class="fa-solid fa-chevron-right text-[9px] text-slate-300"></i>
            </button>
            <button class="w-full text-left text-xs font-medium text-slate-600 hover:text-slate-900 py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between">
              <span>Privacy Settings</span> <i class="fa-solid fa-chevron-right text-[9px] text-slate-300"></i>
            </button>
          </div>
        </div>

      </div>

      <!-- القسم الأيمن: السيرة الذاتية والمعلومات الشخصية الكاملة -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- كارت النبذة الشخصية (Bio) -->
        <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <i class="fa-solid fa-bookmark text-slate-500"></i> About Me / Biography
          </h2>
          <p class="text-sm text-slate-500 leading-relaxed font-light">
            {{ Auth::user()->bio ?? "You haven't written a biography yet. Share your interests, experiences, or what you are looking for to help the community get to know you better!" }}
          </p>
        </div>

        <!-- كارت البيانات الشخصية المنظم والمحترف -->
        <div class="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <i class="fa-regular fa-user text-slate-500"></i> Personal Information
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- حقل الاسم بالكامل -->
            <div>
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
              <div class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-700">
                {{ Auth::user()->name }}
              </div>
            </div>

            <!-- حقل البريد الإلكتروني -->
            <div>
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
              <div class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-700">
                {{ Auth::user()->email }}
              </div>
            </div>

            <!-- حقل رقم الهاتف -->
            <div>
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
              <div class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-700">
                {{ Auth::user()->phone ?? '— No Phone Provided —' }}
              </div>
            </div>

            <!-- حقل نوع الرتبة / الحساب -->
            <div>
              <label class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Account Role Type</label>
              <div class="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 flex items-center gap-2">
                <i class="fa-solid {{ Auth::user()->role_id == 2 ? 'fa-compass text-slate-700' : 'fa-person-hiking text-slate-600' }} text-xs"></i>
                {{ Auth::user()->role_id == 2 ? 'Professional Guide Manager' : 'Standard Tourist Account' }}
              </div>
            </div>
          </div>

          <div class="mt-8 accent-sand-bg border accent-sand-border rounded-2xl p-4 flex items-start gap-3">
            <i class="fa-solid fa-circle-info accent-sand-text text-sm mt-0.5"></i>
            <div class="text-xs text-slate-500 leading-relaxed">
              <span class="font-semibold text-slate-900 block mb-0.5">Need to update verified details?</span>
              To modify secure information such as registered email accounts or specialized guide certifications, please get in touch with our system administration.
            </div>
          </div>

        </div>

      </div>

    </div>
  </main>
</div>
@endsection