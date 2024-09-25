<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;
use Illuminate\Support\Facades\DB;

class CarAPIController extends Controller
{
    public function index()
    {
        $cars = DB::table('car')
        ->join('engine','car.c_engine_id','=','engine.id')
        ->join('brand','car.c_brand_id','=','brand.id')
        ->select('car.*','brand.b_name','engine.e_type')
        ->get();
        return $cars;
    }
    public function store(Request $request)
    {
        return Car::create($request->all());
    }
    public function show($id)
    {
        $car = DB::table('car')
        ->join('engine','car.c_engine_id','=','engine.id')
        ->join('brand','car.c_brand_id','=','brand.id')
        ->select('car.*','brand.b_name','engine.e_type')
        ->where('car','=',$id)
        ->get();
        return $car;
    }
    public function update(Request $request, $id)
    {
        $car = Car::find($id);
        $car->update($request->all());
        return $car;
    }
    public function destroy($id)
    {
        return Car::destroy($id);
    }
    public function search($name)
    {
        return Car::where('c_name','like','%'.$name.'%')->get();
    }
}
