<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasPortfolioOrdering;

    protected $fillable = ['name', 'role', 'company', 'quote', 'is_published', 'sort_order'];

    protected function casts(): array
    {
        return ['is_published' => 'boolean'];
    }
}
