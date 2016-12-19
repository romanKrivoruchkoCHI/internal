<?php

namespace App\Http\Repositories;

use App\Project;

class ProjectRepository
{
    /**
     * Get list of projects
     *
     * @param $params
     *
     * @return mixed
     */
    public function getProjects($params)
    {
        $orderFields = ['name', 'type', 'status'];
        $whereStatement = [];
        $orderBy = 'name';
        $orderSort = 'asc';
        $offset = 0;
        $limit = Project::PAGE_LIMIT;
        
        if (isset($params['name'])) {
            $whereStatement[] = ['name', 'like', '%' . $params['name'] . '%'];
        }

        if (isset($params['type'])) {
            $whereStatement[] = ['type', '=', $params['type']];
        }

        if (isset($params['status'])) {
            $whereStatement[] = ['status', '=', $params['status']];
        }

        if (isset($params['order_by']) && (isset($params['order_sort'])) && in_array($params['order_by'], $orderFields)) {
            $orderBy = $params['order_by'];
            $orderSort = $params['order_sort'];
        }

        if (isset($params['page'])) {
            $offset = $offset + ($params['page'] - 1) * $limit;
        }

        $result = Project::where($whereStatement)
            ->orderBy($orderBy, $orderSort)
            ->limit($limit)
            ->offset($offset)
            ->get();
        
        $pages = ceil(Project::count() / $limit);

        return ['projects' => $result, 'pages' => $pages];
    }
}