<?php

namespace App\Http\Controllers;

use App\Models\Notificatiion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $Notification = Notificatiion::where('user_id', Auth::id())->where('is_read' , false)->get();
        return response()->json($Notification, 200);
    }

    public function is_read(Request $request)
    {
        try {
            $user = $request->user();
            Notificatiion::where('user_id', $user->id)->update(['is_read' => true]);
            return response()->json([
                'message' => 'Notifications updated successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
