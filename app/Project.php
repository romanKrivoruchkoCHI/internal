<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    // Project types
    const TYPE_INNER = 0;
    const TYPE_OUTER = 1;
    const TYPE_FAKE = 2;
    
    // Project statuses
    const STATUS_OPEN = 0;
    const STATUS_CLOSED = 1;
    
    const PAGE_LIMIT = 35;
    
    protected $fillable = ['name', 'description', 'start_date', 'close_date', 'type', 'status', 'redmine_id'];
}