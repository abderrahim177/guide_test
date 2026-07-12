<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Activity extends Model
{
    protected $fillable = ['name', 'icon'];

    public function programs(): HasMany
    {
        return $this->hasMany(GuideProgram::class, 'activity_id');
    }
    
    public function Equipments(){
        return $this->hasMany(Equipment::class);
    }
}
