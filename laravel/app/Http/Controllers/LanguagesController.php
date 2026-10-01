<?php

namespace App\Http\Controllers;

use App\Http\Requests\LanguagesRequest;
use App\Models\Language;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LanguagesController extends Controller
{
    public function store(LanguagesRequest $request){
        $Credintials = $request->validated();

        $Languages = Language::create([
            'title' => $Credintials['title'],
            'level' => $Credintials['level'],
            'user_id' => Auth::id()
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Language created successfuly !',
            'language' => $Languages
        ] , 201);
    }   

    public function index(Request $request){
        $Languages = Language::where('user_id' ,Auth::id())->get();
        return response()->json($Languages , 200);
    }
}
