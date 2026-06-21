<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasPortfolioOrdering;

    protected $fillable = ['title', 'slug', 'description', 'audience_tag', 'icon', 'sort_order'];
}
