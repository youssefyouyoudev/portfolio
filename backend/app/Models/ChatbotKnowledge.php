<?php

namespace App\Models;

use App\Models\Concerns\HasPortfolioOrdering;
use Illuminate\Database\Eloquent\Model;

class ChatbotKnowledge extends Model
{
    use HasPortfolioOrdering;

    protected $table = 'chatbot_knowledge';

    protected $fillable = [
        'title',
        'type',
        'content',
        'keywords',
        'language',
        'is_active',
        'sort_order',
    ];

    protected function casts(): array
    {
        return ['keywords' => 'array', 'is_active' => 'boolean'];
    }
}
