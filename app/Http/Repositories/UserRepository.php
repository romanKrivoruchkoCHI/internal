<?php

namespace App\Http\Repositories;

use App\User;

class UserRepository
{
    /**
     * Get list of users
     *
     * @param $params
     *
     * @return mixed
     */
    public function getUsers($params)
    {
        $orderFields = ['last_name', 'department_id'];
        $whereStatement = [];
        $orWhereStatement = [];
        $orderBy = 'last_name';
        $orderSort = 'asc';
        $offset = 0;
        $limit = User::PAGE_LIMIT;

        if (isset($params['name'])) {
            $whereStatement[] = ['last_name', 'like', '%' . $params['name'] . '%'];
            $orWhereStatement[] = ['first_name', 'like', '%' . $params['name'] . '%'];
        }

        if (isset($params['email'])) {
            $whereStatement[] = ['email', 'like', '%' . $params['email'] . '%'];
        }

        if (isset($params['department_id'])) {
            $whereStatement[] = ['department_id', '=', $params['department_id']];
        }

        if (isset($params['order_by']) && (isset($params['order_sort'])) && in_array($params['order_by'], $orderFields)) {
            $orderBy = $params['order_by'];
            $orderSort = $params['order_sort'];
        }

        if (isset($params['page'])) {
            $offset = $offset + ($params['page'] - 1) * $limit;
        }

        $query = User::with('department')
            ->where(function ($query) use ($whereStatement, $orWhereStatement) {
                $query->where($whereStatement)->orWhere($orWhereStatement);
            });

        if (isset($params['technology'])) {
            $technologies = explode(',', $params['technology']);

            foreach ($technologies as $technology) {
                $query->whereHas('technologies', function ($query) use ($technology) {
                    $query->where('name', $technology);
                });
            }
        }

        $pages = ceil($query->count() / $limit);

        $result = $query
            ->orderBy($orderBy, $orderSort)
            ->limit($limit)
            ->offset($offset)
            ->get();

        return ['users' => $result, 'pages' => $pages];
    }
}