<?php

namespace App\Http\Controllers;

use App\Department;
use Illuminate\Http\Request;
use App\UserAccessDepartment;

class DepartmentController extends Controller
{
    /**
     * Get list of departments
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDepartments()
    {
        $result = Department::all();

        return response()->json([
            'status' => true,
            'data' => $result
        ]);
    }

    /**
     * Add user to department
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function addUserToDepartment(Request $request)
    {
        $departmentId = $request->get('department_id');
        $userId = $request->get('user_id');

        UserAccessDepartment::create(['user_id' => $userId, 'department_id' => $departmentId]);

        return response()->json([
            'status' => true,
            'message' => 'User added to department.'
        ]);
    }
}