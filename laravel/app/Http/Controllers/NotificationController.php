<?php

namespace App\Http\Controllers;

use App\Models\Notificatiion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index(Request $request){
        $Notification = Notificatiion::where('user_id' , Auth::id())->get();
        return response()->json($Notification , 200);
    }
}
