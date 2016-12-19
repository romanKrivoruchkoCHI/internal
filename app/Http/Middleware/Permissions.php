<?php
namespace App\Http\Middleware;

use App\User;
use App\UserAccessDepartment;
use Closure;

class Permissions
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $authUserId = \Auth::user()->id;
        $userId = $request->get('id');

        if ($authUserId) {
            $validator = \Validator::make($request->all(),
                ['id' => 'required']
            );

            if ($validator->fails())
                return response()->json($validator->errors(), 422);

            $user = User::select(['department_id'])->where(['id' => $userId])->first();
            if (!empty($user)) {
                $authUser = UserAccessDepartment::select(['department_id'])
                    ->where(['user_id' => $authUserId, 'department_id' => $user->department_id])
                    ->first();
                if (empty($authUser) && $authUserId != $userId) {
                    return response()->json(['error' => 'Forbidden.'], 403);
                }
            } else {
                return response()->json(['error' => 'User not found.'], 404);
            }
        } else {
            return response()->json(['error' => 'Unauthorized.'], 401);
        }

        return $next($request);
    }
}
