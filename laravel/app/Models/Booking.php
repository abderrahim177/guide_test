<?php

namespace App\Models;
use App\Models\GuidePrograme;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Booking extends Model
{
    protected $fillable = ['user_id', 'guide_program_id', 'start_date', 'end_date', 'total_price'];

    // الحجز تابع لـ سائح (User)
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // الحجز تابع لـ برنامج معين
    public function program(): BelongsTo
    {
        return $this->belongsTo(GuideProgram::class, 'guide_program_id');
    }
}
