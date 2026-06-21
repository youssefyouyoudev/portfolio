<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasPortfolioOrdering;

    protected $fillable = ['name', 'category', 'level', 'icon', 'sort_order'];
}
