<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasPortfolioOrdering;

    protected $fillable = ['title', 'slug', 'category', 'summary', 'business_value', 'stack', 'features', 'problems_solved', 'case_study', 'cover_image', 'is_featured', 'sort_order'];

    protected function casts(): array
    {
        return [
            'stack' => 'array',
            'features' => 'array',
            'problems_solved' => 'array',
            'case_study' => 'array',
            'is_featured' => 'boolean',
        ];
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class)->ordered();
    }
}
