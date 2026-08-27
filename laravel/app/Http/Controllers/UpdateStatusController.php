<?php



namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

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
        $booking->save();
        return response()->json([
            'message' => 'Booking status updated successfully',
            'data'    => $booking
        ], 200);
    }
}
