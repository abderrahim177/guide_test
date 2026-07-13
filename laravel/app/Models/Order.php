<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Order extends Model
{
    protected $fillable = [
        'user_id',
        'guide_id',
        'total_price',
        'status',
    ];
    // العلاقة مع الكليان
    public function client(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // العلاقة مع الكويد
    public function guide(): BelongsTo
    {
        return $this->belongsTo(User::class, 'guide_id');
    }
    
    // العلاقة مع المعدات اللي تكرات ف هاد الطلب
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
    
}
