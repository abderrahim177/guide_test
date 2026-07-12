<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Activity;
use Illuminate\Http\Request;
use App\Models\GuideEquipment;
class MaterialsController extends Controller
{
    public function getmaterials($id){
    $equipments = Equipment::where('activity_id', $id)->get();
    $activity = Activity::findOrFail($id);
    return view('activity_materials', compact('equipments', 'activity'));
}
public function guideMaterilas($id)
{
    $rentalItems = GuideEquipment::with(['equipment', 'guide'])
        ->whereHas('equipment', function($query) use ($id) {
            $query->where('activity_id', $id);
        })
        ->get();

    return view('guide_materials_page', compact('rentalItems'));
}
}
