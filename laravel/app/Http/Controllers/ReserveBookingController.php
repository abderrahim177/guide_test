<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class ReserveBookingController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'guide_program_id' => 'required|exists:guide_programe,id',
            'start_date'       => 'required|date',
            'end_date'         => 'required|date|after_or_equal:start_date',
            'total_price'      => 'required|numeric',
        ]);

        try {
            $booking = Booking::create([
                'user_id'          => $request->user()->id,
                'guide_program_id' => $validated['guide_program_id'],
                'start_date'       => $validated['start_date'],
                'end_date'         => $validated['end_date'],
                'total_price'      => $validated['total_price'],
            ]);

            return response()->json([
                'message' => 'Booking created successfully',
                'data'    => $booking
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'line'  => $e->getLine(),
            ], 500);
        }
    }
}