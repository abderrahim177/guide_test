<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
Route::get('/', function () {
    return view('welcome');
});
Route::get('/login' , function(){
    return view('auth.auth');
})->name('login');

Route::get('/register' , function(){
    return view('auth.auth');
})->name('register');

Route::post('/login', [AuthController::class, 'check'])->name('check_user');