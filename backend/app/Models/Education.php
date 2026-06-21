<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;

class Education extends Model
{
    use HasPortfolioOrdering;

    protected $table = 'education';

    protected $fillable = ['title', 'institution', 'date_range', 'description', 'sort_order'];
}
