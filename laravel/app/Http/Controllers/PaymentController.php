<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function index(Request $request){
    $PaymentInfo = Booking::with(['client' , 'program.guide'])
        ->where('user_id', Auth::id())
        ->latest()
        ->first();
    if (!$PaymentInfo) {
        return response()->json(['message' => 'No active orders found'], 404);
    }
    return response()->json($PaymentInfo, 200);
}
}
