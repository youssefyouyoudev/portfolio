<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('chat_sessions')) {
            Schema::create('chat_sessions', function (Blueprint $table): void {
                $table->id();
                $table->uuid('session_token')->unique();
                $table->string('visitor_name')->nullable();
                $table->string('visitor_contact')->nullable();
                $table->string('locale', 12)->nullable();
                $table->string('lead_status')->default('open')->index();
                $table->string('ip_address', 45)->nullable();
                $table->text('user_agent')->nullable();
                $table->string('page_url', 500)->nullable();
                $table->timestamp('last_message_at')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('chat_messages')) {
            Schema::create('chat_messages', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('chat_session_id')->constrained('chat_sessions')->cascadeOnDelete();
                $table->string('role', 24)->index();
                $table->longText('content');
                $table->json('metadata')->nullable();
                $table->unsignedInteger('input_tokens')->nullable();
                $table->unsignedInteger('output_tokens')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('chat_leads')) {
            Schema::create('chat_leads', function (Blueprint $table): void {
                $table->id();
                $table->foreignId('chat_session_id')->nullable()->constrained('chat_sessions')->nullOnDelete();
                $table->string('name')->nullable();
                $table->string('email')->nullable();
                $table->string('whatsapp')->nullable();
                $table->string('contact')->nullable();
                $table->string('project_type')->nullable();
                $table->string('budget')->nullable();
                $table->string('deadline')->nullable();
                $table->string('source_page', 500)->nullable();
                $table->string('status')->default('new')->index();
                $table->text('notes')->nullable();
                $table->json('metadata')->nullable();
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('chatbot_knowledge')) {
            Schema::create('chatbot_knowledge', function (Blueprint $table): void {
                $table->id();
                $table->string('title');
                $table->string('type')->default('general')->index();
                $table->longText('content');
                $table->json('keywords')->nullable();
                $table->string('language', 24)->default('multilingual');
                $table->boolean('is_active')->default(true)->index();
                $table->unsignedInteger('sort_order')->default(0);
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('chatbot_settings')) {
            Schema::create('chatbot_settings', function (Blueprint $table): void {
                $table->id();
                $table->string('key')->unique();
                $table->string('label')->nullable();
                $table->json('value')->nullable();
                $table->string('group')->default('general')->index();
                $table->boolean('is_public')->default(false);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('chatbot_settings');
        Schema::dropIfExists('chatbot_knowledge');
        Schema::dropIfExists('chat_leads');
        Schema::dropIfExists('chat_messages');
        Schema::dropIfExists('chat_sessions');
    }
};
