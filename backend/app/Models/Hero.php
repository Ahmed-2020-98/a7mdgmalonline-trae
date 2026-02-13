<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hero extends Model
{
    protected $fillable = [
        'title',
        'description',
        'cta_label',
        'cta_href',
        'secondary_cta_label',
        'secondary_cta_href',
        'image_src',
        'image_alt',
    ];
}
