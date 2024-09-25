<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::orderBy('id')->paginate('100');
        return view('brand.index',['brands' => $brands]);
    }

    public function create()
    {
        return view('brand.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'b_name' => 'required',
            'b_img' => 'required',
            'b_location' => 'required',
            'founded_year' => 'required',
        ]);
        Brand::create($request->post());

        return redirect()->route('brand.index');

    }

    public function show(Brand $brand)
    {
        return view('brand.show',compact('brand'));

    }
    public function edit(Brand $brand)
    {
        return view('brand.edit',compact('brand'));
    }

    public function update(Request $request,Brand $brand)
    {
        $request->validate([
            'b_name' => 'required',
            'b_img' => 'required',
            'b_location' => 'required',
            'founded_year' => 'required',
        ]);
        $brand->fill($request->post())->save();

        return redirect()->route('brand.index');
    }

    public function destroy(Brand $brand)
    {
        $brand->delete();
        return redirect()->route('brand.index');
    }
}
