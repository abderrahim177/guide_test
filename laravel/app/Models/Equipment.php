<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    public function activity(){
        return $this->belongsTo(Activity::class);
    }
    public function guides()
{
    return $this->belongsToMany(User::class, 'guide_equipments', 'equipment_id', 'user_id')
                ->withPivot('price_per_day', 'stock') 
                ->withTimestamps();
}
}
