<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlaceController;
use App\Http\Controllers\GuideController;
use App\Http\Controllers\GetaileController;
use App\Http\Controllers\MaterialsController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckStatusController;
use App\Http\Controllers\ConfirmedBookingsController;
use App\Http\Controllers\CreatEquipmentsController;
use App\Http\Controllers\GetAllBookingsController;
use App\Http\Controllers\ReserveBookingController;
use App\Http\Controllers\UpdateStatusController;
use App\Http\Controllers\getGuideBookingsController;
use App\Http\Controllers\GetInconfirmedBookingController;

// 1. Authentication (Register & Login)
Route::post('/register', [AuthController::class, 'save']);
Route::post('/login', [AuthController::class, 'check']);

Route::get('/guides', [GuideController::class, 'getGuides']);
Route::get('/places', [PlaceController::class, 'index']);
Route::get('/details/{id}', [GetaileController::class, 'details']);
Route::get('/details_places/{id}', [PlaceController::class, 'details_places']);
Route::get('/materials/{id}', [MaterialsController::class, 'getmaterials']);
Route::get('/guide_materials/{activity_id}/{guide_id}', [MaterialsController::class, 'guideMaterilas']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::middleware(\App\Http\Middleware\RoleMiddleware::class . ':3')->group(function () {
        Route::post('/cart/add', [CartController::class, 'addToBasket']);
        Route::post('/bookings' , [ReserveBookingController::class , 'store']);
        Route::get('/profile' , [AuthController::class , 'me']);
        // Route::get('/bookings/{id}/status', [CheckStatusController::class, 'checkStatus']);
        Route::get('/bookings/latest', [CheckStatusController::class, 'latestStatus']);
    }); 

    // Admin / Provider (Role 2)
    Route::middleware(\App\Http\Middleware\RoleMiddleware::class . ':2')->group(function () {
        Route::post('/create', [CreatEquipmentsController::class, 'store']);
        Route::get('/GetAllEquipments' , [CreatEquipmentsController::class, "GetEquipments"]);
        Route::get('/Activities' , [MaterialsController::class, 'getActivities']);
        Route::get('/GetAllBooking' , [GetAllBookingsController::class , 'store']);
        Route::patch('/bookings/{id}/status', [UpdateStatusController::class, 'update']);
        Route::patch('/bookingsRefuse/{id}/status', [UpdateStatusController::class, 'refuser']);
        Route::get('/ConfirmedBooking' , [ConfirmedBookingsController::class , 'ConfirmedBooking']);  
        Route::get('/getGuideBookings' , [getGuideBookingsController::class , 'getGuideBookings']); 
        Route::get('/Inconfirmed_Booking' , [GetInconfirmedBookingController::class , 'index']); 
    }); 

    Route::post('/logout', [AuthController::class, 'logout']);
});