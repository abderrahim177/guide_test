<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\GuideController;
use App\Http\Controllers\GetaileController;
use Illuminate\Support\Facades\Route;

// ==========================================
// 1. الصفحة الرئيسية (تأكد أنها خارج الـ Middleware ومفتوحة للجميع)
// ==========================================
Route::get('/', [GuideController::class, 'getGuides'])->name('home');


// ==========================================
// 2. روابط الضيوف (Guest - اللي ما مدايرينش اللوجين)
// ==========================================
Route::middleware('guest')->group(function () {
    // إذا كان عندك روابط GET لعرض صفحات اللوجين، تأكد أنها هنا، مثلاً:
    // Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    
    Route::post('/login', [AuthController::class, 'check'])->name('check_user');
    Route::post('/register', [AuthController::class, 'save'])->name('save.user');
});


// ==========================================
// 3. روابط المحمية (Auth - خاصة بالناس اللي داروا اللوجين)
// ==========================================
Route::middleware('auth')->group(function () {
    
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    
    Route::get('/places', [PlaceController::class, 'getPlaces']);
    Route::get('/GetLocation', [PlaceController::class, 'GetLocation']);
    
    Route::get('/details{id}', [GetaileController::class, 'details'])->name('details');
});