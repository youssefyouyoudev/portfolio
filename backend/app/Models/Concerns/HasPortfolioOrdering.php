<?php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Builder;

trait HasPortfolioOrdering
{
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
