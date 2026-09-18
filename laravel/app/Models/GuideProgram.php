<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class GuideProgram extends Model
{
    protected $table = 'guide_programe'; 
    protected $fillable = ['user_id', 'region_id', 'activity_id', 'title', 'description', 'price_per_day'];

    public function guide(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class, 'region_id');
    }

    public function activity(): BelongsTo
    {
        return $this->belongsTo(Activity::class, 'activity_id');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'guide_program_id');
    }
}
