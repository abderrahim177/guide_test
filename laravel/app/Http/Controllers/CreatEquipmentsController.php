<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatEquipmentsRequest;
use App\Models\Equipment;
use App\Models\GuideEquipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CreatEquipmentsController extends Controller
{
    public function Store(CreatEquipmentsRequest $request){
        $Equipments = $request->validated();

        $equipment =Equipment::create([
            "name" => $Equipments['name'],
            "description" => $Equipments['description'],
            "Activity_id" => $Equipments["Activity_id"]
        ]);
        GuideEquipment::create([
            "user_id" => Auth::id(),
            "equipment_id" => $equipment->id,
            "price_per_day" => $Equipments['price'],
            "stock" => $Equipments['stock']
        ]);

        return response()->json(['message' => 'Equipment added successfully!'], 201);
    }
}
