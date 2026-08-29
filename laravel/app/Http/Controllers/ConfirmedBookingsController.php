<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class ConfirmedBookingsController extends Controller
{
    public function ConfirmedBooking(){
        $BookingConfirmed = Booking::where("status" , "confirmed")->get();
        return response()->json($BookingConfirmed ,200);
    }
    }
