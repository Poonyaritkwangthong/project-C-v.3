<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\BrandAPIController;
use App\Http\Controllers\CarAPIController;
use App\Http\Controllers\EngineAPIController;
use App\Http\Controllers\API\CarController;
use App\Http\Controllers\API\BrandController;
use App\Http\Controllers\API\EngineController;
use App\Http\Controllers\API\LikeCarController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::resource('/cars',CarController::class);

Route::resource('/brands',BrandController::class);

Route::resource('/engines',EngineController::class);

Route::get('/likes',[LikeCarController::class,'index']);
Route::get('/cardetail/{name}',[CarController::class,'details']);
Route::get('/carall',[CarController::class,'carall']);

Route::post('/register',[AuthController::class, 'register']);
Route::post('/login',[AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
Route::get('/user',[AuthController::class,'user']);
Route::get('/liked',[LikeCarController::class,'like']);
Route::get('/likecount',[LikeCarController::class,'LikeChart']);
Route::delete('/unlike/{id}',[LikeCarController::class,'destroy']);
Route::post('/likes',[LikeCarController::class,'store']);
Route::post('/logout',[AuthController::class,'logout']);
});
