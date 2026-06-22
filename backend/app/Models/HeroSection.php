<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class HeroSection extends Model
{
    use HasPortfolioOrdering;

    protected $fillable = ['headline', 'subtitle', 'description', 'badges', 'cta_buttons', 'image_path', 'show_image', 'is_published', 'sort_order'];

    protected function casts(): array
    {
        return ['badges' => 'array', 'cta_buttons' => 'array', 'show_image' => 'boolean', 'is_published' => 'boolean'];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }
}
