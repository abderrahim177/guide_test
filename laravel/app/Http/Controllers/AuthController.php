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
    // 1. Register (Inscription)
    public function save(registerRequest $request) 
    {
        $credentials = $request->validated();
        
        // Hash password
        $credentials['password'] = Hash::make($credentials['password']);
        $credentials['role_id'] = $request->role_id ?? 3;
        // Create user
        $user = User::create($credentials);

        // Kriya token f Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    // 2. Login (Connexion)
    public function check(loginRequest $request)
    {
        $credentials = $request->validated();

        // Verifier email o password
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'votre information est incorrecte !'
            ], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();

        // Delete les anciens tokens (Optionnel)
        $user->tokens()->delete();

        // Kriya token jdid
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login success',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 200);
    }

    // 3. Logout (Déconnexion)
    public function logout(Request $request)
    {
        // Supprimer l-token lli khaddamm bih dbba
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully!'
        ], 200);
    }
}