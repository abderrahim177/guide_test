<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\Activity;
use Illuminate\Http\Request;
use App\Models\GuideEquipment;
use App\Models\User;

class MaterialsController extends Controller
{
    // 1. Djib l-materials d waḥed l-activity
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

        // Rje' JSON response l React
        return response()->json([
            'status'     => 'success',
            'activity'   => $activity,
            'equipments' => $equipments,
            'guide'      => $guide
        ], 200);
    }

    // 2. Djib l-materials d waḥed l-guide f waḥed l-activity spéficique
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

        $activity = Activity::findOrFail($activity_id);
        $guide    = User::findOrFail($guide_id);

        // Rje' JSON response l React
        return response()->json([
            'status'      => 'success',
            'activity'    => $activity,
            'guide'       => $guide,
            'rentalItems' => $rentalItems
        ], 200);
    }
    public function getActivities(Request $request){
        $activities = Activity::all();
        return response()->json($activities , 200);
    }
}