<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $roleId)
    {
        if (!Auth::check()) {
            return response()->json([
                'message' => 'Unauthenticated.'
            ], 401);
        }

        if ((int)Auth::user()->role_id !== (int)$roleId) {
            return response()->json([
                'message' => 'Access denied. You do not have permission for this resource.',
                'user_role_id' => Auth::user()->role_id,
                'required_role_id' => (int)$roleId
            ], 403);
        }

        return $next($request);
    }
}