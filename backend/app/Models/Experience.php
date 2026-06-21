<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasPortfolioOrdering;

    protected $fillable = ['role', 'company', 'location', 'type', 'date_range', 'description', 'sort_order'];

    protected function casts(): array
    {
        return ['description' => 'array'];
    }
}
