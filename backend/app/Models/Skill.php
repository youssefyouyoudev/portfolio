<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasPortfolioOrdering;

    protected $fillable = ['name', 'category', 'level', 'icon', 'icon_path', 'is_featured', 'is_visible', 'sort_order'];

    protected function casts(): array
    {
        return ['is_featured' => 'boolean', 'is_visible' => 'boolean'];
    }
}
