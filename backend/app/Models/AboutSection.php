<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class AboutSection extends Model
{
    protected $fillable = ['title', 'short_bio', 'body', 'highlights', 'cards', 'is_published'];

    protected function casts(): array
    {
        return ['highlights' => 'array', 'cards' => 'array', 'is_published' => 'boolean'];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }
}
