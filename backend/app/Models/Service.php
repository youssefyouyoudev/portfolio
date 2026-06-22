<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasPortfolioOrdering;

    protected $fillable = ['title', 'slug', 'description', 'features', 'audience_tag', 'icon', 'price_label', 'cta_text', 'cta_link', 'is_visible', 'sort_order'];

    protected function casts(): array
    {
        return ['features' => 'array', 'is_visible' => 'boolean'];
    }
}
