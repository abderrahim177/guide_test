<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class GetInconfirmedBookingController extends Controller
{
    public function index(Request $request){
        $Inconfirmed = Booking::where('status' , 'rejected')->get();
        return response()->json($Inconfirmed , 200);
    }
}
