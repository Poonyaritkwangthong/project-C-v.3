<?php

namespace App\Http\Controllers;

use App\Models\Engine;
use Illuminate\Http\Request;


class EngineController extends Controller
{
    public function index()
    {
        $engines = Engine::orderBy('id')->paginate('100');
        return view('engine.index',['engines' => $engines]);
    }

    public function create()
    {
        return view('engine.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'e_type' => 'required',
            'e_detail' => 'required',
            'e_hp' => 'required',
            'e_img' => 'required',
        ]);
        Engine::create($request->post());

        return redirect()->route('engine.index');
    }

    public function show( Engine $engine)
    {
        return view('engine.show',compact('engine'));
    }

    public function edit( Engine $engine)
    {
        return view('engine.edit',compact('engine'));
    }

    public function update( Request $request, Engine $engine)
    {
        $request->validate([
            'e_type' => 'required',
            'e_detail' => 'required',
            'e_hp' => 'required',
            'e_img' => 'required',
        ]);
        $engine->fill($request->post())->save();

        return redirect()->route('engine.index');

    }

    public function destroy(Engine $engine)
    {
        $engine->delete();
        return redirect()->route('engine.index');
    }
}
