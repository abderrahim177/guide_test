<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activity;
use App\Models\Region;

class PlaceController extends Controller{
    public function index(){
        $places = Activity::all();   
        $locations = Region::all();  
        return view('welcome', compact('places', 'locations'));
    }

   public function details_places($id)
{
    $region =Region::with(['programs.activity', 'programs.guide'])
        ->findOrFail($id);

    return view('detaile_place', compact('region'));
}
}
