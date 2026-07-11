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
    $guides = GuideProgram::with(['guide', 'region', 'activity'])->get();
    $locations = Region::all(); 
    $places = Activity::all(); 
    
    return view('welcome', compact('guides', 'locations', 'places'));
}
}