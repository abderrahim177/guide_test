<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class CheckStatusController extends Controller
{
    public function latestStatus(Request $request)
{
    $booking = Booking::where('user_id', $request->user()->id)
                      ->latest()
                      ->first();

    if (!$booking) {
        return response()->json(['message' => 'Aucune réservation trouvée'], 404);
    }

    return response()->json([
        'booking_id' => $booking->id,
        'status' => $booking->status 
    ]);
}
}
