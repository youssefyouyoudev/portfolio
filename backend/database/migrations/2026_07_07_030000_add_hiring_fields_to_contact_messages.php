<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contact_messages', function (Blueprint $table): void {
            if (! Schema::hasColumn('contact_messages', 'contact_as')) {
                $table->string('contact_as')->nullable()->after('preferred_contact_method');
            }
            if (! Schema::hasColumn('contact_messages', 'engagement_type')) {
                $table->string('engagement_type')->nullable()->after('contact_as');
            }
        });
    }

    public function down(): void
    {
        Schema::table('contact_messages', function (Blueprint $table): void {
            if (Schema::hasColumn('contact_messages', 'engagement_type')) {
                $table->dropColumn('engagement_type');
            }
            if (Schema::hasColumn('contact_messages', 'contact_as')) {
                $table->dropColumn('contact_as');
            }
        });
    }
};
