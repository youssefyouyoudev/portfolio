<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contact_messages', function (Blueprint $table): void {
            if (! Schema::hasColumn('contact_messages', 'country_city')) {
                $table->string('country_city')->nullable()->after('company');
            }

            if (! Schema::hasColumn('contact_messages', 'current_problem')) {
                $table->string('current_problem')->nullable()->after('business_goal');
            }

            if (! Schema::hasColumn('contact_messages', 'preferred_contact_method')) {
                $table->string('preferred_contact_method')->nullable()->after('timeline');
            }
        });
    }

    public function down(): void
    {
        Schema::table('contact_messages', function (Blueprint $table): void {
            foreach (['country_city', 'current_problem', 'preferred_contact_method'] as $column) {
                if (Schema::hasColumn('contact_messages', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
