<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    use HasPortfolioOrdering;

    protected $fillable = ['name', 'level', 'sort_order'];
}
