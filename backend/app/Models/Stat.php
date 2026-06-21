<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;

class Stat extends Model
{
    use HasPortfolioOrdering;

    protected $fillable = ['label', 'value', 'description', 'type', 'payload', 'sort_order'];

    protected function casts(): array
    {
        return ['payload' => 'array'];
    }
}
