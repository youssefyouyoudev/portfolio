<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectImage extends Model
{
    use HasPortfolioOrdering;

    protected $fillable = ['project_id', 'title', 'image_path', 'alt_text', 'sort_order'];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }
}
