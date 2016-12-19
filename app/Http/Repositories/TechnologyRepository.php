<?php

namespace App\Http\Repositories;

use App\Technologies;

class TechnologyRepository
{
    /**
     * Get list of technologies
     *
     * @param $params
     *
     * @return mixed
     */
    public function getTechnologies($params)
    {
        $whereStatement = [];
        $orderBy = 'name';
        $orderSort = 'asc';
        $offset = 0;
        $limit = Technologies::PAGE_LIMIT;

        if (isset($params['name'])) {
            $whereStatement[] = ['name', 'like', '%' . $params['name'] . '%'];
        }

        if (isset($params['order_by']) && (isset($params['order_sort']))) {
            $orderSort = $params['order_sort'];
        }

        if (isset($params['page'])) {
            $offset = $offset + ($params['page'] - 1) * $limit;
        }

        $query = Technologies::where($whereStatement);
        $pages = ceil($query->count() / $limit);

        $result = $query->orderBy($orderBy, $orderSort)
            ->limit($limit)
            ->offset($offset)
            ->get();

        return ['technologies' => $result, 'pages' => $pages];
    }
}