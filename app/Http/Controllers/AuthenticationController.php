<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;
use Sentinel;
use JWTAuth;

class AuthenticationController extends Controller
{
    /**
     * Register new user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function registration()
    {
        $credentials = Input::all();

        $validator = Validator::make($credentials, [
                'email' => 'required|email|unique:users',
                'password' => 'required|between:6,20',
                'department_id' => 'exists:departments,id'
            ]
        );

        if ($validator->fails())
            return response()->json(['error' => 'invalid_credentials'], 422);

        $user = Sentinel::registerAndActivate($credentials);

        return response()->json([
            'status' => 'true',
            'message' => 'Registration successful.',
            'user' => $user
        ]);

    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 422);
            }
            $user = User::where('email', $credentials['email'])->first();
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token', 'user'));
    }
}
