<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\GuideProgram;

class GetaileController extends Controller
{
    public function details($id)
    {
        // 1. جلب بيانات المرشد أو إظهار 404 إذا لم يكن موجوداً
        $guideUser = User::findOrFail($id);

        // 2. جلب جميع البرامج السياحية التابعة لهذا المرشد مع مناطقها وأنشطتها
        $programs = GuideProgram::with(['region', 'activity'])
            ->where('user_id', $id)
            ->get();

        // 3. إرسال البيانات إلى صفحة التفاصيل
        return view('details', compact('guideUser', 'programs'));
    }
}