<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\GuideController;
use App\Http\Controllers\GetaileController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MaterialsController;
Route::get('/', [GuideController::class, 'getGuides'])->name('home');
Route::middleware('guest')->group(function () {    
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/login', [AuthController::class, 'check'])->name('check_user');
    Route::post('/register', [AuthController::class, 'save'])->name('save.user');
});

Route::middleware('auth')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('/places', [PlaceController::class, 'getPlaces']);
    Route::get('/GetLocation', [PlaceController::class, 'GetLocation']);
    Route::get('/details{id}', [GetaileController::class, 'details'])->name('details');
    Route::get('/profile' , [ProfileController::class , 'profile'])->name('profile');
    Route::get('/details_places/{id}', [PlaceController::class , 'details_places'])->name('detaile_place');
    Route::get('/materilas/{id}/materils' , [MaterialsController::class , 'getmaterials'])->name('activity_materials');
    Route::get('/guide_materilas/{id}' , [MaterialsController::class , 'guideMaterilas'])->name('guide_materials');
});

