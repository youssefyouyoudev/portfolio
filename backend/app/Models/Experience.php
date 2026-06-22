<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasPortfolioOrdering;

    protected $fillable = [
        'role', 'company', 'location', 'type', 'date_range', 'description',
        'start_date', 'end_date', 'is_current', 'technologies', 'company_logo',
        'is_visible', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'description' => 'array',
            'start_date' => 'date',
            'end_date' => 'date',
            'is_current' => 'boolean',
            'technologies' => 'array',
            'is_visible' => 'boolean',
        ];
    }
}
