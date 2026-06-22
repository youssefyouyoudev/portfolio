<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('education')) {
            Schema::create('education', function (Blueprint $table): void {
                $table->id();
                $table->string('title');
                $table->string('institution');
                $table->string('date_range');
                $table->text('description')->nullable();
                $table->unsignedInteger('sort_order')->default(0);
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('certifications')) {
            Schema::create('certifications', function (Blueprint $table): void {
                $table->id();
                $table->string('title');
                $table->string('issuer')->nullable();
                $table->year('year');
                $table->unsignedInteger('sort_order')->default(0);
                $table->timestamps();
            });
        }

        if (! Schema::hasTable('languages')) {
            Schema::create('languages', function (Blueprint $table): void {
                $table->id();
                $table->string('name');
                $table->string('level');
                $table->unsignedInteger('sort_order')->default(0);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        //
    }
};
