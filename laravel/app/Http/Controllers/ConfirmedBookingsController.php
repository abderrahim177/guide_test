<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConfirmedBookingsController extends Controller
{
    public function ConfirmedBooking(){
        $BookingConfirmed = Booking::with('client')->where("status" , "confirmed")->whereHas('program', function ($query) {
            $query->where('user_id', Auth::id()); 
            })->get();;
        return response()->json($BookingConfirmed ,200);
    }
    }
