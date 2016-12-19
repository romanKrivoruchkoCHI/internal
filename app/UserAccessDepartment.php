<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserAccessDepartment extends Model
{
    protected $table = 'users_access_departments';

    protected $fillable = ['user_id', 'department_id'];
}
