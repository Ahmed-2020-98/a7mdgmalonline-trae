<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Project::query()->latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate($this->rules());
        $project = Project::create($validated);

        return response()->json($project, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return response()->json($project);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $validated = $request->validate($this->rules(true));
        $project->update($validated);

        return response()->json($project->refresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(['deleted' => true]);
    }

    private function rules(bool $isUpdate = false): array
    {
        $presence = $isUpdate ? 'sometimes' : 'required';

        return [
            'name' => [$presence, 'string', 'max:255'],
            'description' => [$presence, 'string'],
            'images' => [$presence, 'array'],
            'images.*' => ['string'],
            'url' => [$presence, 'string', 'max:2048'],
            'cta_label' => [$presence, 'string', 'max:255'],
            'category' => [$presence, 'string', 'max:255'],
        ];
    }
}
