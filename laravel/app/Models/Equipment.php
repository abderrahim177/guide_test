<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    protected $table = 'equipment';

    protected $fillable = [
        'name',
        'description',
        'image',
        'activity_id',
    ];
    
    public function activity(){
        return $this->belongsTo(Activity::class);
    }
    public function guides()
{
    return $this->belongsToMany(User::class, 'guide_equipment', 'equipment_id', 'user_id')
                ->withPivot('price_per_day', 'stock') 
                ->withTimestamps();
}
}
