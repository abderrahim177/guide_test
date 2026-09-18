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
}