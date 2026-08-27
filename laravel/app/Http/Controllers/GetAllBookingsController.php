<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class GetAllBookingsController extends Controller
{
    public function store(Request $request){
        $Bokkings = Booking::with(['client' , 'program'])->get();
        return response()->json($Bokkings , 200);
    }
}
