<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatEquipmentsRequest;
use App\Models\Equipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CreatEquipmentsController extends Controller
{
    public function Store(CreatEquipmentsRequest $request)
    {
        $validated = $request->validated();

        $equipment = Equipment::create([
            'name'        => $validated['name'],
            'description' => $validated['description'],
            'activity_id' => $validated['activity_id'], 
        ]);

        $equipment->guides()->attach(Auth::id(), [
            'price_per_day' => $validated['price'],
            'stock'         => $validated['stock'],
        ]);

        return response()->json(['message' => 'Equipment added successfully!'], 201);
    }

    public function GetEquipments(Request $request)
    {
        $equipments = Equipment::with(['guides' => function ($query) {
            $query->where('user_id', Auth::id());
        }])->get();

        return response()->json($equipments, 200);
    }
}