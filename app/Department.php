<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    /**
     * Get user in department
     */
    public function users()
    {
        return $this->hasMany('App\SentinelUser');
    }
}
