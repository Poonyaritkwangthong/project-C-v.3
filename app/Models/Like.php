<?php

namespace App\Models;
use App\Models\Car;
use App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;
    protected $table = 'like';
    protected $fillable = [
        'user_id',
        'car_id',
    ];

    public function car() {
        return $this->belongsTo(Car::class,'car_id');
    }

    public function user() {
        return $this->belongsTo(User::class,'user_id');
    }

}

