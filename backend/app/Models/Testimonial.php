<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasPortfolioOrdering;

    protected $fillable = ['name', 'role', 'company', 'quote', 'avatar', 'rating', 'is_published', 'is_featured', 'is_visible', 'sort_order'];

    protected function casts(): array
    {
        return ['is_published' => 'boolean', 'is_featured' => 'boolean', 'is_visible' => 'boolean'];
    }
}
