<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Technologies extends Model
{
    const PAGE_LIMIT = 35;

    protected $fillable = ['name', 'keywords'];

    /**
     * Technology info
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function technology()
    {
        return $this->belongsToMany('App\SentinelUser');
    }
}
