<?php

namespace App\Models;

use App\Models\GuideProgram;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    protected $fillable = [
    'user_id',
    'guide_program_id',
    'start_date',
    'end_date',
    'phone',
    'total_price',
];

    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function program(): BelongsTo
    {
        return $this->belongsTo(GuideProgram::class, 'guide_program_id');
    }
}