<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use App\Models\Certification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use RequestParseBodyException;

class ProfileController extends Controller
{
    public function AddCertificat(ProfileRequest $request)
    {
        if (!$request->user()) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
        try{
        $Credintials = $request->validated();
        $Certificate = Certification::create([
            'user_id' => Auth::id(),
            'title' => $Credintials['title'],
            'year' => $Credintials['year']
        ]);
        if (!$Certificate) {
            return response()->json([
                'status' => 'Error',
                'message' => 'the Certificate does not created Check your informations !',
            ],422);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Certificate Created Succsessfuly',
            'certificate' => $Certificate
        ], 201);
        }catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'line'  => $e->getLine(),
                'file'  => $e->getFile(),
            ], 500);
        }  
    }

    public function GetCertificates(Request $request){
        $Certificates = Certification::all();
        return response()->json($Certificates, 200);
    }
}
