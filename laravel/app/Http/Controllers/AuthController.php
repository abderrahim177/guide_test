<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\registerRequest;
use App\Http\Requests\loginRequest;
use App\Models\User; 
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
    public function save(registerRequest $request) {
        $credentials = $request->validated();
        $credentials['password'] = Hash::make($credentials['password']);
        User::create($credentials);
        return redirect()->route('/')->with('success', 'Account created successfully! You can now log in.');
    }

    public function check(loginRequest $request){
        $credentials = $request->validated();
        
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/');
        }
        return back()->withErrors([
            'email' => 'votre information et incorrect !',
        ]);
    }
    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login')->with('success', 'Logged out successfully!');
    }
}
