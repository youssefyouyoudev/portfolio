<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatLead extends Model
{
    protected $fillable = [
        'chat_session_id',
        'name',
        'email',
        'whatsapp',
        'contact',
        'project_type',
        'budget',
        'deadline',
        'source_page',
        'status',
        'notes',
        'metadata',
    ];

    protected function casts(): array
    {
        return ['metadata' => 'array'];
    }

    public function session(): BelongsTo
    {
        return $this->belongsTo(ChatSession::class, 'chat_session_id');
    }
}
