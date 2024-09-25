<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarShowController extends Controller
{
    //
    public function index()
    {
        $cars = Car::take(2)->get();
        return view('/home',compact('cars'));
    }
}
