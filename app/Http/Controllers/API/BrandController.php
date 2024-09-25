<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Brand;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class BrandController extends Controller
{
   public function index()
   {
        $brands = Brand::all();
            return response()->json([
            'brands' => $brands
        ], 200);
   }
   public function store(Request $request)
   {

    $validator = Validator::make(
        $request->all(),
        [
            'b_name' => 'required|string|max:255',
            'b_img' => 'required|image',
            'b_location' => 'required|string|max:255',
            'founded_year' => 'required|string|max:255',
        ]
    );

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    } else {

        try {

            $input = $request->all();
            if ($request->hasFile('b_img')) {
                $file = $request->file('b_img');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '_' . uniqid() . '.' . $extension;
                $destinationPath = 'images/brand';
                $file->move($destinationPath, $filename);
                $input['b_img'] = $filename;
            }

            if (Brand::create($input)) {
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
    $brands = Brand::find($id);
    if (!$brands) {
        return response()->json([
            'message' => 'Brand not found!'
        ], 404);
    }
    return response()->json([
        'brands' => $brands
    ], 200);
   }

   public function update(Request $request, Brand $brand)
   {
    $validator = Validator::make(
        $request->all(),
        [
            'b_name' => 'required|string|max:255',
            'b_img' => 'nullable',
            'b_location' => 'required|string|max:255',
            'founded_year' => 'required|string|max:255',
        ]
    );

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    } else {

        try {

            if ($request->hasFile('b_img')) {
                $destination = 'images/brand' . $brand->b_img ;
                if (File::exists($destination)) {
                    File::delete($destination);
                }

                $file = $request->file('b_img');
                $extension = $file->getClientOriginalExtension();
                $filename = time() . '_' . uniqid() . '.' . $extension;
                $destinationPath = 'images/brand';
                $file->move($destinationPath, $filename);
                $brand->b_img = $filename;
            }
            $brand->update();
            if ($brand->fill($request->post())->save()) {
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
    $brands = Brand::find($id);
    if (!$brands) {
        return response()->json([
            'message' => 'Brand not found!'
        ], 404);
    }
    $brands->delete();
    return response()->json([
        'message' => "Brand successfully deleted."
    ], 200);
   }
}
