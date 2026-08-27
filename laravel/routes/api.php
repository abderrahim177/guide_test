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
use App\Http\Controllers\CreatEquipmentsController;
use App\Http\Controllers\ReserveBookingController;

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
| Protected Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::middleware(\App\Http\Middleware\RoleMiddleware::class . ':3')->group(function () {
        Route::get('/guides', [GuideController::class, 'getGuides']);
        Route::get('/places', [PlaceController::class, 'index']);
        Route::get('/materials/{id}', [MaterialsController::class, 'getmaterials']);
        Route::get('/guide_materials/{activity_id}/{guide_id}', [MaterialsController::class, 'guideMaterilas']);
        Route::post('/cart/add', [CartController::class, 'addToBasket']);
        Route::post('/bookings' , [ReserveBookingController::class , 'store']);
    }); 

    Route::middleware(\App\Http\Middleware\RoleMiddleware::class . ':2')->group(function () {
        Route::post('/create', [CreatEquipmentsController::class, 'store']);
        Route::get('/GetAllEquipments' , [CreatEquipmentsController::class, "GetEquipments"]);
        Route::get('/Activities' , [MaterialsController::class, 'getActivities']);
    }); 

    Route::post('/logout', [AuthController::class, 'logout']);
});