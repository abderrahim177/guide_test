<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Language extends Model
{
    protected $fillable = ['title' , 'level' , 'user_id'];

    public function guide(){
        return $this->belongsTo(User::class , 'user_id');
    }
}
