<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        foreach (['admin_id', 'company_id', 'user_id', 'client_id'] as $column) {
            if (Schema::hasTable('projects') && Schema::hasColumn('projects', $column)) {
                DB::statement("ALTER TABLE projects MODIFY {$column} BIGINT UNSIGNED NULL");
            }
        }
    }

    public function down(): void
    {
        //
    }
};
