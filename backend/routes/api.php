<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\HeroController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Route;

Route::apiResource('projects', ProjectController::class);
Route::apiResource('services', ServiceController::class);
Route::apiResource('clients', ClientController::class);
Route::post('uploads/projects', function (Request $request) {
    $request->validate([
        'image' => ['required', 'file', 'image', 'max:5120'],
    ]);

    $path = $request->file('image')->store('projects', 'public');

    return response()->json([
        'url' => url(Storage::url($path)),
    ]);
});
Route::get('hero', [HeroController::class, 'index']);
Route::post('hero', [HeroController::class, 'store']);
Route::put('hero', [HeroController::class, 'upsert']);
Route::patch('hero', [HeroController::class, 'upsert']);
