<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    protected $fillable = ['title', 'slug', 'excerpt', 'content', 'tags', 'meta_title', 'meta_description', 'published_at'];

    protected function casts(): array
    {
        return ['tags' => 'array', 'published_at' => 'datetime'];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->whereNotNull('published_at')->where('published_at', '<=', now())->latest('published_at');
    }
}
