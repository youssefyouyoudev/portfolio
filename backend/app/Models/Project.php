<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasPortfolioOrdering, SoftDeletes;

    protected $fillable = [
        'title', 'slug', 'category', 'subtitle', 'project_type', 'summary', 'full_description',
        'business_value', 'my_role', 'status', 'stack', 'features', 'problems_solved',
        'case_study', 'cover_image', 'live_url', 'github_url', 'client_name', 'completed_at',
        'is_featured', 'show_on_homepage', 'is_published', 'seo_title', 'seo_description',
        'og_image', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'stack' => 'array',
            'features' => 'array',
            'problems_solved' => 'array',
            'case_study' => 'array',
            'completed_at' => 'date',
            'is_featured' => 'boolean',
            'show_on_homepage' => 'boolean',
            'is_published' => 'boolean',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    public function scopeHomepage(Builder $query): Builder
    {
        return $query->where('show_on_homepage', true);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class)->ordered();
    }
}
