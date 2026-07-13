<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Activity;
use Illuminate\Http\Request;
use App\Models\GuideEquipment;
use App\Models\User;
class MaterialsController extends Controller
{
   public function getmaterials($id)
{
    $activity = Activity::findOrFail($id);
    $equipments = Equipment::where('activity_id', $id)->get();
    
    $firstEquipment = $equipments->first();
    $guide = null;
    if ($firstEquipment) {
        $currentGuide = GuideEquipment::where('equipment_id', $firstEquipment->id)->first();  
        if ($currentGuide) {
            $guide = User::find($currentGuide->user_id);
        }
    }
    return view('activity_materials', compact('equipments', 'activity', 'guide'));
}

public function guideMaterilas($activity_id, $guide_id)
{
    $rentalItems = Equipment::where('activity_id', $activity_id)
        ->whereHas('guides', function($query) use ($guide_id) {
            $query->where('user_id', $guide_id);
        })
        ->with(['guides' => function($query) use ($guide_id) {
            $query->where('user_id', $guide_id);
        }])
        ->get();

    $activity = Activity::find($activity_id);
    $guide = User::find($guide_id);

    return view('guide_materials_page', compact('rentalItems', 'activity', 'guide'));
}
}
