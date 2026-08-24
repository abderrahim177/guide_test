<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\GuideProgram;

class GetaileController extends Controller
{
    public function details($id)
    {
        // 1. Djib l-guide awla rje' 404 error b JSON ila ma-kanch
        $guideUser = User::findOrFail($id);

        // 2. Djib l-programs dyal l-guide m'a l-relations (region, activity)
        $programs = GuideProgram::with(['region', 'activity'])
            ->where('user_id', $id)
            ->get();

        // 3. Rje' les données b JSON l React
        return response()->json([
            'status'  => 'success',
            'guide'   => $guideUser,
            'programs' => $programs
        ], 200);
    }
}