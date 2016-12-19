<?php

namespace App\Http\Controllers;

use App\Department;
use App\Technologies;
use App\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{

    /**
     * @param $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserProfile($userId)
    {
        $userInfo = User::find($userId);
        $userInfo->technologies = $userInfo->technologies;// need to load by query

        $response = response()->json([
            'user' => $userInfo,
            'technologies' => Technologies::all()->keyBy('name'),
            'departments' => Department::all()
        ]);

        return response()->json($response);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveUser(Request $request)
    {
        $data = $request->all();

        $validator = \Validator::make($data, [
                'first_name' => 'between:2,30',
                'last_name' => 'between:2,30',
                'department_id' => 'exists:departments,id'
            ]
        );

        if ($validator->fails())
            return response()->json(['error' => $validator->errors()], 422);

        $user = User::find($data['id']);
        $user->first_name = $data['first_name'];
        $user->last_name = $data['last_name'];
        $user->department_id = $data['department_id'];
        $user->technologies()->sync(array_keys($data['technologies']));
        $user->save();

        return response()->json($user);
    }
}