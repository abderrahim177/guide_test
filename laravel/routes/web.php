<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
Route::get('/', function () {
    return view('welcome');
})->name('/');
Route::get('/login' , function(){
    return view('auth.login');
})->name('login');

Route::get('/register' , function(){
    return view('auth.register');
})->name('register');

Route::post('/login', [AuthController::class, 'check'])->name('check_user');

Route::post('/register' , [AuthController::class , 'save'])->name('save.user');

Route::get('/logout' , [AuthController::class , 'logout'])->name('logout');