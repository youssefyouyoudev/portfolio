<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('projects') && Schema::hasColumn('projects', 'company_id')) {
            DB::statement('ALTER TABLE projects MODIFY company_id BIGINT UNSIGNED NULL');
        }

        foreach (['name', 'description', 'url', 'image', 'type'] as $column) {
            if (Schema::hasTable('projects') && Schema::hasColumn('projects', $column)) {
                DB::statement("ALTER TABLE projects MODIFY {$column} TEXT NULL");
            }
        }
    }

    public function down(): void
    {
        //
    }
};
