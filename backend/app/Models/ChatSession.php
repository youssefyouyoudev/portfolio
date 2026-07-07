<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ChatSession extends Model
{
    protected $fillable = [
        'session_token',
        'visitor_name',
        'visitor_contact',
        'locale',
        'lead_status',
        'ip_address',
        'user_agent',
        'page_url',
        'last_message_at',
    ];

    protected function casts(): array
    {
        return ['last_message_at' => 'datetime'];
    }

    public function messages(): HasMany
    {
        return $this->hasMany(ChatMessage::class);
    }

    public function leads(): HasMany
    {
        return $this->hasMany(ChatLead::class);
    }
}
