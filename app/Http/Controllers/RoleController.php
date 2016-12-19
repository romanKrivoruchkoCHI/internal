<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Sentinel;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Get list of roles
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRoles()
    {
        $rolesList = Sentinel::getRoleRepository()->get();

        return response()->json([
            'status' => true,
            'data' => $rolesList
        ]);
    }

    /**
     * Create new role or update existing
     *
     * @param Request $request
     * @param bool $role
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function createUpdateRole(Request $request, $role = false)
    {
        try {
            if (!$role) {
                $role = Sentinel::getRoleRepository()->createModel()->create([
                    'name' => $request->get('role_name'),
                    'slug' => $request->get('role_slug'),
                ]);

                $response = response()->json([
                    'status' => true,
                    'message' => 'Role created successfully.',
                    'data' => $role
                ]);
            } else {
                $role = Sentinel::findRoleById($role);

                if ($role) {
                    $role->name = $request->get('role_name');
                    $role->slug = $request->get('role_slug');
                    $role->save();

                    $response = response()->json([
                        'status' => true,
                        'data' => $role,
                        'message' => 'Role updated successfully.'
                    ]);
                } else {
                    $response = response()->json([
                        'status' => false,
                        'message' => 'Role not found.'
                    ], 404);
                }
            }
        } catch (QueryException $e) {
            $response = response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 422);
        }

        return $response;
    }

    /**
     * Get list of permissions
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPermissions()
    {
        $roles = Sentinel::getRoleRepository()->get();
        $permissions = [];

        foreach ($roles as $role) {
            $permissions = array_merge($permissions, array_keys($role->permissions));
        }

        return response()->json([
            'status' => true,
            'data' => $permissions
        ]);
    }

    /**
     * Add new permission to role
     *
     * @param Request $request
     * @param $role
     *
     * @return array|\Illuminate\Http\JsonResponse
     */
    public function addPermissionsToRole(Request $request, $role)
    {

        try {
            $role = Sentinel::findRoleById($role);
            $permissions = array_merge($role->permissions, [$request->get('permission') => true]);

            $role->permissions = $permissions;
            $role->save();

            $response = response()->json([
                'status' => true,
                'data' => $role,
                'message' => 'Permissions added.'
            ]);
        } catch (QueryException $e) {
            $response = response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ], 422);
        }
        
        return $response;
    }
}