<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FooterSetting extends Model
{
    protected $fillable = ['key', 'value', 'is_visible'];

    protected function casts(): array
    {
        return ['value' => 'array', 'is_visible' => 'boolean'];
    }
}
