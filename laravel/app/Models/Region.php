<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Region extends Model
{
    protected $table = 'region'; 
    protected $fillable = ['name', 'description', 'image'];

    public function programs(): HasMany
    {
        return $this->hasMany(GuideProgram::class, 'region_id');
    }

}
