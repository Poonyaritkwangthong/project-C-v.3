<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\EngineController;
use App\Http\Controllers\CarshowController;
use Illuminate\Support\Facades\Route;
Route::get('/home',[CarshowController::class,'index']);

Route::get('/admin',function(){
    return view('admin');
});
Route::resource('brand',BrandController::class);
Route::resource('engine',EngineController::class);
Route::resource('car',CarController::class);
