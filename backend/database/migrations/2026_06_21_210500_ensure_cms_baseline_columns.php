<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->table('projects', function (Blueprint $table): void {
            $this->addColumnIfMissing($table, 'title', fn () => $table->string('title')->default('Untitled project'));
            $this->addColumnIfMissing($table, 'slug', fn () => $table->string('slug')->nullable()->unique());
            $this->addColumnIfMissing($table, 'category', fn () => $table->string('category')->default('Project'));
            $this->addColumnIfMissing($table, 'summary', fn () => $table->text('summary')->nullable());
            $this->addColumnIfMissing($table, 'business_value', fn () => $table->text('business_value')->nullable());
            $this->addColumnIfMissing($table, 'stack', fn () => $table->json('stack')->nullable());
            $this->addColumnIfMissing($table, 'features', fn () => $table->json('features')->nullable());
            $this->addColumnIfMissing($table, 'problems_solved', fn () => $table->json('problems_solved')->nullable());
            $this->addColumnIfMissing($table, 'sort_order', fn () => $table->unsignedInteger('sort_order')->default(0));
        });
    }

    public function down(): void
    {
        //
    }

    private function table(string $table, callable $callback): void
    {
        if (Schema::hasTable($table)) {
            Schema::table($table, $callback);
        }
    }

    private function addColumnIfMissing(Blueprint $table, string $column, callable $definition): void
    {
        if (! Schema::hasColumn($table->getTable(), $column)) {
            $definition();
        }
    }
};
