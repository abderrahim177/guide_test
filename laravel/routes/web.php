<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlaceController;

Route::get('/', [PlaceController::class, 'index']);

Route::get('/login' , function(){
    return view('auth.login');
})->name('login');

Route::get('/register' , function(){
    return view('auth.register');
})->name('register');

Route::post('/login', [AuthController::class, 'check'])->name('check_user');

Route::post('/register' , [AuthController::class , 'save'])->name('save.user');

Route::get('/logout' , [AuthController::class , 'logout'])->name('logout');

Route::get('/places' , [PlaceController::class , 'getPlaces']);

Route::get('/GetLocation' , [PlaceController::class , 'GetLocation']);