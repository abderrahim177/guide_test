<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\GuideController;
use App\Http\Controllers\GetaileController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MaterialsController;
use App\Http\Controllers\CartController;

/*
|--------------------------------------------------------------------------
| Public Routes (Ayy waḥed y-qdar y-dkhol lihum bla Token)
|--------------------------------------------------------------------------
*/

// Authentication (Register & Login)
Route::post('/register', [AuthController::class, 'save']);
Route::post('/login', [AuthController::class, 'check']);

// Home page & Places (Public endpoints)
Route::get('/guides', [GuideController::class, 'getGuides']);
Route::get('/places', [PlaceController::class, 'index']);
Route::get('/details/{id}', [GetaileController::class, 'details']);
Route::get('/details_places/{id}', [PlaceController::class, 'details_places']);

// Materials & Equipment (Public view)
Route::get('/materials/{id}', [MaterialsController::class, 'getmaterials']);
Route::get('/guide_materials/{activity_id}/{guide_id}', [MaterialsController::class, 'guideMaterilas']);


/*
|--------------------------------------------------------------------------
| Protected Routes (Khass l-user y-kun connecté b Sanctum Token)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // User Info & Profile
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::get('/profile', [ProfileController::class, 'profile']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Cart / Basket Actions
    Route::post('/cart/add', [CartController::class, 'addToBasket']);
});