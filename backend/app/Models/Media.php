<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model
{
    use SoftDeletes;

    protected $table = 'media';

    protected $fillable = ['disk', 'path', 'url', 'name', 'mime_type', 'size', 'alt_text', 'meta'];

    protected function casts(): array
    {
        return ['meta' => 'array'];
    }
}
