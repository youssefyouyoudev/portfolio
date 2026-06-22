<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactMessage extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', 'email', 'company', 'business_goal', 'project_type', 'budget_range',
        'timeline', 'message', 'ip_address', 'user_agent', 'read_at', 'archived_at',
    ];

    protected function casts(): array
    {
        return ['read_at' => 'datetime', 'archived_at' => 'datetime'];
    }
}
