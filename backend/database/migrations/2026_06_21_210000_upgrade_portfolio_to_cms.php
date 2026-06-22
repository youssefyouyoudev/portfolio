<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->ensureBaselineTables();

        $this->table('users', function (Blueprint $table): void {
            $this->addColumnIfMissing($table, 'is_admin', fn () => $table->boolean('is_admin')->default(false));
        });

        $this->table('settings', function (Blueprint $table): void {
            $this->addColumnIfMissing($table, 'label', fn () => $table->string('label')->nullable());
            $this->addColumnIfMissing($table, 'sort_order', fn () => $table->unsignedInteger('sort_order')->default(0));
        });

        $this->table('projects', function (Blueprint $table): void {
            $this->addColumnIfMissing($table, 'subtitle', fn () => $table->string('subtitle')->nullable());
            $this->addColumnIfMissing($table, 'full_description', fn () => $table->longText('full_description')->nullable());
            $this->addColumnIfMissing($table, 'project_type', fn () => $table->string('project_type')->default('Personal Project'));
            $this->addColumnIfMissing($table, 'my_role', fn () => $table->text('my_role')->nullable());
            $this->addColumnIfMissing($table, 'status', fn () => $table->string('status')->default('Concept'));
            $this->addColumnIfMissing($table, 'live_url', fn () => $table->string('live_url')->nullable());
            $this->addColumnIfMissing($table, 'github_url', fn () => $table->string('github_url')->nullable());
            $this->addColumnIfMissing($table, 'client_name', fn () => $table->string('client_name')->nullable());
            $this->addColumnIfMissing($table, 'completed_at', fn () => $table->date('completed_at')->nullable());
            $this->addColumnIfMissing($table, 'show_on_homepage', fn () => $table->boolean('show_on_homepage')->default(true));
            $this->addColumnIfMissing($table, 'is_published', fn () => $table->boolean('is_published')->default(true));
            $this->addColumnIfMissing($table, 'seo_title', fn () => $table->string('seo_title')->nullable());
            $this->addColumnIfMissing($table, 'seo_description', fn () => $table->text('seo_description')->nullable());
            $this->addColumnIfMissing($table, 'og_image', fn () => $table->string('og_image')->nullable());
            $this->addColumnIfMissing($table, 'deleted_at', fn () => $table->softDeletes());
        });

        $this->table('project_images', function (Blueprint $table): void {
            $this->addColumnIfMissing($table, 'is_cover', fn () => $table->boolean('is_cover')->default(false));
        });

        $this->table('skills', function (Blueprint $table): void {
            $this->addColumnIfMissing($table, 'is_featured', fn () => $table->boolean('is_featured')->default(false));
            $this->addColumnIfMissing($table, 'is_visible', fn () => $table->boolean('is_visible')->default(true));
            $this->addColumnIfMissing($table, 'icon_path', fn () => $table->string('icon_path')->nullable());
        });

        $this->table('services', function (Blueprint $table): void {
            $this->addColumnIfMissing($table, 'features', fn () => $table->json('features')->nullable());
            $this->addColumnIfMissing($table, 'price_label', fn () => $table->string('price_label')->nullable());
            $this->addColumnIfMissing($table, 'cta_text', fn () => $table->string('cta_text')->nullable());
            $this->addColumnIfMissing($table, 'cta_link', fn () => $table->string('cta_link')->nullable());
            $this->addColumnIfMissing($table, 'is_visible', fn () => $table->boolean('is_visible')->default(true));
        });

        $this->table('experiences', function (Blueprint $table): void {
            $this->addColumnIfMissing($table, 'start_date', fn () => $table->date('start_date')->nullable());
            $this->addColumnIfMissing($table, 'end_date', fn () => $table->date('end_date')->nullable());
            $this->addColumnIfMissing($table, 'is_current', fn () => $table->boolean('is_current')->default(false));
            $this->addColumnIfMissing($table, 'technologies', fn () => $table->json('technologies')->nullable());
            $this->addColumnIfMissing($table, 'company_logo', fn () => $table->string('company_logo')->nullable());
            $this->addColumnIfMissing($table, 'is_visible', fn () => $table->boolean('is_visible')->default(true));
        });

        $this->table('blog_posts', function (Blueprint $table): void {
            $this->addColumnIfMissing($table, 'featured_image', fn () => $table->string('featured_image')->nullable());
            $this->addColumnIfMissing($table, 'blog_category_id', fn () => $table->foreignId('blog_category_id')->nullable());
            $this->addColumnIfMissing($table, 'author', fn () => $table->string('author')->default('Youssef Youyou'));
            $this->addColumnIfMissing($table, 'reading_time', fn () => $table->unsignedSmallInteger('reading_time')->default(1));
            $this->addColumnIfMissing($table, 'is_featured', fn () => $table->boolean('is_featured')->default(false));
            $this->addColumnIfMissing($table, 'is_published', fn () => $table->boolean('is_published')->default(true));
            $this->addColumnIfMissing($table, 'seo_title', fn () => $table->string('seo_title')->nullable());
            $this->addColumnIfMissing($table, 'seo_description', fn () => $table->text('seo_description')->nullable());
            $this->addColumnIfMissing($table, 'og_image', fn () => $table->string('og_image')->nullable());
            $this->addColumnIfMissing($table, 'canonical_url', fn () => $table->string('canonical_url')->nullable());
            $this->addColumnIfMissing($table, 'meta_robots', fn () => $table->string('meta_robots')->default('index,follow'));
            $this->addColumnIfMissing($table, 'sort_order', fn () => $table->unsignedInteger('sort_order')->default(0));
            $this->addColumnIfMissing($table, 'deleted_at', fn () => $table->softDeletes());
        });

        $this->table('contact_messages', function (Blueprint $table): void {
            $this->addColumnIfMissing($table, 'business_goal', fn () => $table->string('business_goal')->nullable());
            $this->addColumnIfMissing($table, 'timeline', fn () => $table->string('timeline')->nullable());
            $this->addColumnIfMissing($table, 'archived_at', fn () => $table->timestamp('archived_at')->nullable());
            $this->addColumnIfMissing($table, 'deleted_at', fn () => $table->softDeletes());
        });

        $this->table('testimonials', function (Blueprint $table): void {
            $this->addColumnIfMissing($table, 'avatar', fn () => $table->string('avatar')->nullable());
            $this->addColumnIfMissing($table, 'rating', fn () => $table->unsignedTinyInteger('rating')->nullable());
            $this->addColumnIfMissing($table, 'is_featured', fn () => $table->boolean('is_featured')->default(false));
            $this->addColumnIfMissing($table, 'is_visible', fn () => $table->boolean('is_visible')->default(true));
        });

        $this->createTable('hero_sections', function (Blueprint $table): void {
            $table->id();
            $table->string('headline');
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->json('badges')->nullable();
            $table->json('cta_buttons')->nullable();
            $table->string('image_path')->nullable();
            $table->boolean('show_image')->default(true);
            $table->boolean('is_published')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        $this->createTable('about_sections', function (Blueprint $table): void {
            $table->id();
            $table->string('title')->nullable();
            $table->text('short_bio')->nullable();
            $table->longText('body')->nullable();
            $table->json('highlights')->nullable();
            $table->json('cards')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        $this->createTable('blog_categories', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        $this->createTable('blog_tags', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        $this->createTable('blog_post_tag', function (Blueprint $table): void {
            $table->foreignId('blog_post_id')->constrained()->cascadeOnDelete();
            $table->foreignId('blog_tag_id')->constrained()->cascadeOnDelete();
            $table->primary(['blog_post_id', 'blog_tag_id']);
        });

        $this->createTable('media', function (Blueprint $table): void {
            $table->id();
            $table->string('disk')->default('public');
            $table->string('path');
            $table->string('url');
            $table->string('name');
            $table->string('mime_type');
            $table->unsignedBigInteger('size');
            $table->string('alt_text')->nullable();
            $table->json('meta')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });

        $this->createTable('menu_items', function (Blueprint $table): void {
            $table->id();
            $table->string('label');
            $table->string('url');
            $table->boolean('is_external')->default(false);
            $table->boolean('open_in_new_tab')->default(false);
            $table->boolean('is_visible')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        $this->createTable('footer_settings', function (Blueprint $table): void {
            $table->id();
            $table->string('key')->unique();
            $table->json('value')->nullable();
            $table->boolean('is_visible')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('footer_settings');
        Schema::dropIfExists('menu_items');
        Schema::dropIfExists('media');
        Schema::dropIfExists('blog_post_tag');
        Schema::dropIfExists('blog_tags');
        Schema::dropIfExists('blog_categories');
        Schema::dropIfExists('about_sections');
        Schema::dropIfExists('hero_sections');
    }

    private function table(string $table, callable $callback): void
    {
        if (Schema::hasTable($table)) {
            Schema::table($table, $callback);
        }
    }

    private function createTable(string $table, callable $callback): void
    {
        if (! Schema::hasTable($table)) {
            Schema::create($table, $callback);
        }
    }

    private function addColumnIfMissing(Blueprint $table, string $column, callable $definition): void
    {
        if (! Schema::hasColumn($table->getTable(), $column)) {
            $definition();
        }
    }

    private function ensureBaselineTables(): void
    {
        $this->createTable('blog_posts', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt');
            $table->longText('content')->nullable();
            $table->json('tags')->nullable();
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        $this->createTable('contact_messages', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('company')->nullable();
            $table->string('project_type');
            $table->string('budget_range');
            $table->text('message');
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
        });

        $this->createTable('project_images', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('project_id')->nullable();
            $table->string('title');
            $table->string('image_path');
            $table->string('alt_text')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        $this->createTable('skills', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('category');
            $table->unsignedTinyInteger('level')->default(70);
            $table->string('icon')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        $this->createTable('services', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('audience_tag')->default('B2B/B2C');
            $table->string('icon')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        $this->createTable('experiences', function (Blueprint $table): void {
            $table->id();
            $table->string('role');
            $table->string('company')->nullable();
            $table->string('location')->nullable();
            $table->string('type')->nullable();
            $table->string('date_range')->nullable();
            $table->json('description')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        $this->createTable('testimonials', function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('role')->nullable();
            $table->string('company')->nullable();
            $table->text('quote');
            $table->boolean('is_published')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        $this->createTable('stats', function (Blueprint $table): void {
            $table->id();
            $table->string('label');
            $table->string('value');
            $table->string('description')->nullable();
            $table->string('type')->default('counter');
            $table->json('payload')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        $this->table('projects', function (Blueprint $table): void {
            $this->addColumnIfMissing($table, 'category', fn () => $table->string('category')->default('Project'));
            $this->addColumnIfMissing($table, 'summary', fn () => $table->text('summary')->nullable());
            $this->addColumnIfMissing($table, 'business_value', fn () => $table->text('business_value')->nullable());
            $this->addColumnIfMissing($table, 'stack', fn () => $table->json('stack')->nullable());
            $this->addColumnIfMissing($table, 'features', fn () => $table->json('features')->nullable());
            $this->addColumnIfMissing($table, 'problems_solved', fn () => $table->json('problems_solved')->nullable());
            $this->addColumnIfMissing($table, 'case_study', fn () => $table->json('case_study')->nullable());
            $this->addColumnIfMissing($table, 'cover_image', fn () => $table->string('cover_image')->nullable());
            $this->addColumnIfMissing($table, 'is_featured', fn () => $table->boolean('is_featured')->default(false));
            $this->addColumnIfMissing($table, 'sort_order', fn () => $table->unsignedInteger('sort_order')->default(0));
        });
    }
};
