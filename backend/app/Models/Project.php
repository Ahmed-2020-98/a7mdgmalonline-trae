<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'name',
        'description',
        'images',
        'url',
        'cta_label',
        'category',
    ];

    protected $casts = [
        'images' => 'array',
    ];
}
