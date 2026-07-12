<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    // العلاقة مع الـ Role (كل مستخدم عنده دور واحد)
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    // العلاقة مع البرامج (المرشد عنده بزاف ديال البرامج)
    public function programs(): HasMany
    {
        // حددنا السميّة ديال الجدول 'guide_programe' حيت عندك بالمفرد
        return $this->hasMany(GuideProgram::class, 'user_id');
    }

    // العلاقة مع الحجوزات (السائح يقدر يدير بزاف ديال الحجوزات)
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'user_id');
    }
    public function rentalEquipments()
{
    return $this->belongsToMany(Equipment::class, 'guide_equipments', 'user_id', 'equipment_id')
                ->withPivot('price_per_day', 'stock') // باش تقدر تقرا الثمن والكمية
                ->withTimestamps();
}
}
