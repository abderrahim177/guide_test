<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Activity;
use Illuminate\Http\Request;

class MaterialsController extends Controller
{
    public function getmaterials($id){
    $equipments = Equipment::where('activity_id', $id)->get();
    $activity = Activity::findOrFail($id);
    return view('activity_materials', compact('equipments', 'activity'));
}
}
