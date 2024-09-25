<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Car;
use App\Models\Engine;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        $engines = Engine::all();
        $brands = Brand::all();
        $cars = Car::orderBy('id')->paginate(100);
        return view('car.index', ['cars' => $cars],['engines' => $engines],['brands' => $brands]);
    }
    public function home()
    {
        $engines = Engine::all();
        $brands = Brand::all();
        $cars = Car::orderBy('id')->paginate(100);
        return view('home', ['cars' => $cars],['engines' => $engines],['brands' => $brands]);
    }

    public function create()
    {
        $engines = Engine::all();
        $brands = Brand::all();
        return view('car.create',compact('engines','brands'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'c_name' => 'required',
            'c_img' => 'required',
            'c_detail' => 'required',
            'c_engine_id' => 'required',
            'c_brand_id' => 'required',
        ]);
        Car::create($request->post());

        return redirect()->route('car.index');
    }

    public function show( Car $car)
    {
        return view('car.show',compact('car'));
    }

    public function edit( Car $car)
    {
        $engines = Engine::all();
        $brands = Brand::all();
        return view('car.edit',compact('car','engines','brands'));
    }

    public function update( Request $request, Car $car)
    {
        $request->validate([
            'c_name' => 'required',
            'c_img' => 'required',
            'c_detail' => 'required',
            'c_engine_id' => 'required',
            'c_brand_id' => 'required',
        ]);
        $car->fill($request->post())->save();

        return redirect()->route('car.index');

    }

    public function destroy(Car $car)
    {
        $car->delete();
        return redirect()->route('car.index');
    }
}
