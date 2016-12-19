<?php

namespace App\Http\Controllers;

use App\Department;
use App\User;
use Illuminate\Http\Request;
use App\Http\Repositories\UserRepository;

class UserController extends Controller
{
    /**
     * @var UserRepository
     */
    private $user;

    /**
     * UserController constructor.
     * @param UserRepository $user
     */
    public function __construct(UserRepository $user)
    {
        $this->user = $user;
    }

    /**
     * Get list of users
     *
     * @param Request $request
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsers(Request $request)
    {
        $queryParams = $request->all();
        $result = $this->user->getUsers($queryParams);

        return response()->json([
            'status' => true,
            'data' => $result['users'],
            'pages' => $result['pages'],
            'departments' => Department::all()
        ]);
    }

    /**
     * Get user by id
     * 
     * @param $userId
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser($userId)
    {
        $userInfo = User::find($userId);

        return response()->json([
            'status' => true,
            'data' => [
                'user' => $userInfo,
                'technologies' => $userInfo->technologies
            ]
        ]);
    }
}