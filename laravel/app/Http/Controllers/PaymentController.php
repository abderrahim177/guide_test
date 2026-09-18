<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function index(Request $request){
    $PaymentInfo = Order::with(['client', 'guide'])
        ->where('user_id', Auth::id())
        ->latest()
        ->first();

    if (!$PaymentInfo) {
        return response()->json(['message' => 'No active orders found'], 404);
    }
    return response()->json($PaymentInfo, 200);
}
}
