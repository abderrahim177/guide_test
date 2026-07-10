<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\registerRequest;
use App\Http\Requests\loginRequest;
use App\Models\User; 
use Illuminate\Support\Facades\Hash;
use App\Models\Post;
class AuthController extends Controller
{
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
}
