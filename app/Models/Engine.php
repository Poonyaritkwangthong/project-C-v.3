<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Engine extends Model
{
    use HasFactory;
    protected $table = 'engine';
    protected $fillable = [
        'e_type',
        'e_detail',
        'e_hp',
        'e_img'
    ];
}
