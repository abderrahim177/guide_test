<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activity;
use App\Models\Region;

class PlaceController extends Controller 
{
    // 1. Djib les places (Activities) o les locations (Regions)
    public function index() 
    {
        $places = Activity::all();   
        $locations = Region::all();  
        return response()->json([
            'status'    => 'success',
            'places'    => $places,
            'locations' => $locations
        ], 200);
    }

    // 2. Djib details d waḥed l-region m'a les programs, activities o guides
    public function details_places($id)
    {
        $region = Region::with(['programs.activity', 'programs.guide'])
            ->findOrFail($id);

        return response()->json([
            'status' => 'success',
            'region' => $region
        ], 200);
    }
}