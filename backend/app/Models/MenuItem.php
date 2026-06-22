<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasPortfolioOrdering;

    protected $fillable = ['label', 'url', 'is_external', 'open_in_new_tab', 'is_visible', 'sort_order'];

    protected function casts(): array
    {
        return ['is_external' => 'boolean', 'open_in_new_tab' => 'boolean', 'is_visible' => 'boolean'];
    }
}
