<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    use HasPortfolioOrdering;

    protected $fillable = ['title', 'issuer', 'year', 'sort_order'];
}
