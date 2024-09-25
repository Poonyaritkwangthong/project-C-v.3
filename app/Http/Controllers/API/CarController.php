<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Car;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::with(['engine', 'brand'])->get();
        // return Json Response
        return  response()->json([
            'cars' => $cars
        ], 200);
    }

    public function carall()
    {
        $cars = Car::with(['engine', 'brand'])->get();
        // return Json Response
        return  response()->json([
            'cars' => $cars
        ], 200);
    }
    public function store(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'c_name' => 'required|string|max:255',
                'c_img' => 'required|image',
                'c_detail' => 'required|string|max:255',
                'c_engine_id' => 'required|exists:engine,id',
                'c_brand_id' => 'required|exists:brand,id',
            ]
        );

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {

            try {

                $input = $request->all();
                if ($request->hasFile('c_img')) {
                    $file = $request->file('c_img');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '_' . uniqid() . '.' . $extension;
                    $destinationPath = 'images/car';
                    $file->move($destinationPath, $filename);
                    $input['c_img'] = $filename;
                }

                if (Car::create($input)) {
                    return response()->json(['status' => 200, 'message' => 'Add car successfully'], 200);
                } else {
                    return response()->json(['status' => 400, 'message' => 'Something went wrong!'], 400);
                }
            } catch (\Exception $e) {
                return response()->json(['message' => 'มีบางอย่างผิดพลาดจริงๆ!'], 500);
            }
        }
    }

    public function show($id)
    {
        $cars = Car::with(['engine', 'brand'])->find($id);
        if (!$cars) {
            return response()->json([
                'massage' => 'Car not found!'
            ], 404);
        }
        return response()->json([
            'cars' => $cars
        ], 200);
    }

    public function update(Request $request, Car $car)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'c_name' => 'required|string|max:255',
                'c_img' => 'nullable',
                'c_detail' => 'required|string|max:255',
                'c_engine_id' => 'required|exists:engine,id',
                'c_brand_id' => 'required|exists:brand,id',
            ]
        );

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {

            try {

                if ($request->hasFile('c_img')) {
                    $destination = 'images/car' . $car->c_img ;
                    if (File::exists($destination)) {
                        File::delete($destination);
                    }

                    $file = $request->file('c_img');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '_' . uniqid() . '.' . $extension;
                    $destinationPath = 'images/car';
                    $file->move($destinationPath, $filename);
                    $car->c_img = $filename;
                }
                $car->update();
                if ($car->fill($request->post())->save()) {
                    return response()->json(['status' => 200, 'message' => 'Update Car Successfully'], 200);
                } else {
                    return response()->json(['status' => 400, 'message' => 'Something went wrong!'], 400);
                }
            } catch (\Exception $e) {
                return response()->json(['message' => 'มีบางอย่างผิดพลาดจริงๆ!'], 500);
            }
        }
    }

    public function destroy($id)
    {
        $cars = Car::find($id);
        if (!$cars) {
            return response()->json([
                'message' => "Car not found"
            ], 404);
        }

        $cars->delete();

        return response()->json([
            'message' => "Car successfully deleted."
        ], 200);
    }

    public function details($name)
    {
        $cars = Car::with(['engine', 'brand'])->where('c_name', $name)->first();
        if (!$cars) {
            return response()->json([
                'massage' => 'Car not found!'
            ], 404);
        }
        return response()->json([
            'cars' => $cars
        ], 200);
    }

}
