<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Technologies;
use App\Http\Repositories\TechnologyRepository;

class TechnologiesController extends Controller
{
    private $technologies;

    public function __construct(TechnologyRepository $technologies)
    {
        $this->technologies = $technologies;
    }

    /**
     * Get list of technologies
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTechnologies(Request $request)
    {
        $queryParams = $request->all();
        $result = $this->technologies->getTechnologies($queryParams);
        $response = response()->json([
            'status' => true,
            'data' => $result['technologies'],
            'pages' => $result['pages']
        ]);

        return $response;
    }

    /**
     * Get technology by id
     *
     * @param $technologyId
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTechnology($technologyId)
    {
        $result = Technologies::find($technologyId);

        return response()->json([
            'status' => true,
            'data' => $result['technologies'],
            'pages' => $result['pages'],
        ]);
    }

    /**
     * Add new technology
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function addTechnology(Request $request)
    {
        $name = $request->get('name');
        $keywords = $request->get('keywords');
        $result = Technologies::create(['name' => $name, 'keywords' => $keywords]);

        return response()->json([
            'status' => true,
            'data' => $result
        ]);
    }
}
