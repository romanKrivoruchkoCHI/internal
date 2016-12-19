<?php

namespace App\Http\Controllers;

use App\Project;
use Illuminate\Http\Request;
use App\Http\Repositories\ProjectRepository;

class ProjectController extends Controller
{
    private $project;

    public function __construct(ProjectRepository $project)
    {
        $this->project = $project;
    }

    /**
     * Get list of projects
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProjects(Request $request)
    {
        $queryParams = $request->all();
        $result = $this->project->getProjects($queryParams);

        return response()->json([
            'status' => true,
            'data' => $result['projects'],
            'pages' => $result['pages']
        ]);
    }

    /**
     * Get project by id
     *
     * @param $projectId
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getProject($projectId)
    {
        $result = Project::find($projectId);

        return response()->json([
            'status' => true,
            'data' => $result
        ]);
    }

    /**
     * Edit project
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function editProject(Request $request)
    {
        $data = $request->all();

        $validator = \Validator::make($data, [
                'name' => 'required|max:255',
                'start_date' => 'before:close_date',
                'close_date' => 'after:start_date',
                'type' => 'numeric',
                'status' => 'numeric',
            ]
        );

        if ($validator->fails())
            return response()->json(['error' => $validator->errors()], 422);

        $project = Project::find($request->get('id'));
        $project->name = $data['name'];
        $project->description = $data['description'];
        $project->start_date = $data['start_date'];
        $project->close_date = $data['close_date'];
        $project->type = $data['type'];
        $project->status = $data['status'];
        $project->save();

        return response()->json($project);
    }
}