<?php

namespace App\Http\Controllers;

use App\Models\Hero;
use Illuminate\Http\Request;

class HeroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Hero::query()->latest()->first());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate($this->rules());
        $hero = Hero::create($validated);

        return response()->json($hero, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Hero $hero)
    {
        return response()->json($hero);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Hero $hero)
    {
        $validated = $request->validate($this->rules(true));
        $hero->update($validated);

        return response()->json($hero->refresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Hero $hero)
    {
        $hero->delete();

        return response()->json(['deleted' => true]);
    }

    public function upsert(Request $request)
    {
        $validated = $request->validate($this->rules());
        $hero = Hero::query()->latest()->first();
        if ($hero) {
            $hero->update($validated);

            return response()->json($hero->refresh());
        }

        $hero = Hero::create($validated);

        return response()->json($hero, 201);
    }

    private function rules(bool $isUpdate = false): array
    {
        $presence = $isUpdate ? 'sometimes' : 'required';

        return [
            'title' => [$presence, 'string', 'max:255'],
            'description' => [$presence, 'string'],
            'cta_label' => [$presence, 'string', 'max:255'],
            'cta_href' => [$presence, 'string', 'max:2048'],
            'secondary_cta_label' => [$presence, 'string', 'max:255'],
            'secondary_cta_href' => [$presence, 'string', 'max:2048'],
            'image_src' => [$presence, 'string', 'max:2048'],
            'image_alt' => [$presence, 'string', 'max:255'],
        ];
    }
}
