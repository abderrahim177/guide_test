<?php
namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Notificatiion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpdateStatusController extends Controller
{
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:confirmed,cancelled,pending',
        ]);
        $booking = Booking::findOrFail($id);

        $booking->update([
            'status' => $validated['status'],
        ]);

        Notificatiion::create([
            'user_id' => $booking->user_id, 
            'message' => 'Booking status Confirmed by guide successfully you can now continue your reservation !',
        ]);

        $booking->save();

        return response()->json([
            'message' => ' Booking status Confermer by guide successfully you can now continue your reservation !',
            'data'    => $booking
        ], 200);
    }

    public function refuser(Request $request, $id)
    {
        $refused = $request->validate([
            'status' => 'required|string|in:rejected,cancelled',
        ]);

        $refuseBooking = Booking::findOrFail($id);

        $refuseBooking->update([
            'status' => $refused['status'],
        ]);
        Notificatiion::create([
            'user_id' => $refuseBooking->user_id, 
            'message' => 'Booking status rejected by guide thank you for your visit !',
        ]);
        return response()->json([
            'message' => 'Booking status rejected by guide thank you for your visit !',
            'data'    => $refuseBooking
        ], 200);
    }
}
