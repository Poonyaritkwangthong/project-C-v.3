<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Engine;
use App\Models\Brand;

class Car extends Model
{
    use HasFactory;
    protected $table = 'car';
    protected $fillable = [
        'c_name',
        'c_img',
        'c_detail',
        'c_engine_id',
        'c_brand_id'
    ];
    public function engine() {
        return $this->belongsTo(Engine::class,'c_engine_id');
    }
    public function brand() {
        return $this->belongsTo(Brand::class,'c_brand_id');
    }
}
