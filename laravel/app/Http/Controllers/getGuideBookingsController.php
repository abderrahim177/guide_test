<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class getGuideBookingsController extends Controller
{
    public function getGuideBookings($guideId)
{
    $bookings = Booking::whereHas('guideProgram', function($q) use ($guideId) {
        $q->where('guide_id', $guideId);
    })
    ->with('user:id,name') 
    ->select('id', 'user_id', 'start_date', 'end_date', 'status', 'total_price', 'phone')
    ->get();

    return response()->json($bookings , 200);
}
}
