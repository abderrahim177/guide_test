<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use App\Models\GuideEquipment;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MaterialsController extends Controller
{

    public function getmaterials(Request $request){
        $Equipments = GuideEquipment::with(['equipment', 'guide'])->get();
        return response()->json($Equipments, 200);
    }

    public function getActivities(Request $request){
        $Activities = Activity::all();
        return response()->json($Activities , 200);
    }
}
