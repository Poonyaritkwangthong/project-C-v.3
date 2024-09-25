<?php

namespace App\Http\Controllers\APi;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Engine;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;


class EngineController extends Controller
{
    public function index()
    {
        $engines = Engine::all();
        return response()->json([
            'engines' => $engines
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'e_type' => 'required|string|max:255',
                'e_detail' => 'required|string|max:255',
                'e_hp' => 'required|string|max:255',
                'e_img' => 'required|image',
            ]
        );

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {

            try {

                $input = $request->all();
                if ($request->hasFile('e_img')) {
                    $file = $request->file('e_img');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '_' . uniqid() . '.' . $extension;
                    $destinationPath = 'images/engine';
                    $file->move($destinationPath, $filename);
                    $input['e_img'] = $filename;
                }

                if (Engine::create($input)) {
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
        $engines = Engine::find($id);
        if (!$engines) {
            return response()->json([
                'message' => 'Engine not found!'
            ], 404);
        }
        return response()->json([
            'engines' => $engines
        ], 200);
    }

    public function update(Request $request, Engine $engine)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'e_type' => 'required|string|max:255',
                'e_detail' => 'required|string|max:255',
                'e_hp' => 'required|string|max:255',
                'e_img' => 'nullable',
            ]
        );

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {

            try {

                if ($request->hasFile('e_img')) {
                    $destination = 'images/engine' . $engine->e_img ;
                    if (File::exists($destination)) {
                        File::delete($destination);
                    }

                    $file = $request->file('e_img');
                    $extension = $file->getClientOriginalExtension();
                    $filename = time() . '_' . uniqid() . '.' . $extension;
                    $destinationPath = 'images/engine';
                    $file->move($destinationPath, $filename);
                    $engine->e_img = $filename;
                }
                $engine->update();
                if ($engine->fill($request->post())->save()) {
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
        $engines = Engine::find($id);
        if (!$engines ) {
            return response()->json([
                'message' => 'Engine not found!'
            ], 404);
        }
        $engines->delete();

        return response()->json([
            'message' => "Engine succesfully daleted."
        ], 200);
    }
}
