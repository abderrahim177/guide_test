<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuideEquipment extends Model
{
    protected $fillable = [
        'user_id',
        'equipment_id',
        'price_per_day',
        'stock'
    ];
    public function equipment()
    {
        return $this->belongsTo(Equipment::class, 'equipment_id');
    }
    public function guide()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
