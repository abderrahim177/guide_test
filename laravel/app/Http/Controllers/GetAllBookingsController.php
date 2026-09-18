<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GetAllBookingsController extends Controller
{
    public function store(Request $request)
    {
        $bookings = Booking::with(['client', 'program'])
            ->whereHas('program', function ($query) {
                $query->where('user_id', Auth::id()); 
            })->get();
        return response()->json($bookings , 200);
    }
}