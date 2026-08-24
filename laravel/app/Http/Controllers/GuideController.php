<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GuideProgram;
use App\Models\Region;
use App\Models\Activity;

class GuideController extends Controller
{
    public function getGuides()
    {
        // 1. Djib les programs d les guides m'a l-relations
        $guides = GuideProgram::with(['guide', 'region', 'activity'])->get();

        // 2. Djib les regions o les activities d l-filtrage
        $locations = Region::all(); 
        $places = Activity::all(); 
        
        // 3. Rje' les données b JSON l React
        return response()->json([
            'status'    => 'success',
            'guides'    => $guides,
            'locations' => $locations,
            'places'    => $places
        ], 200);
    }
}