<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostResource;
use App\Http\Resources\ProjectResource;
use App\Models\AboutSection;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use App\Models\BlogTag;
use App\Models\ContactMessage;
use App\Models\Experience;
use App\Models\FooterSetting;
use App\Models\HeroSection;
use App\Models\Media;
use App\Models\MenuItem;
use App\Models\Project;
use App\Models\ProjectImage;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Skill;
use App\Models\Testimonial;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CmsController extends Controller
{
    public function dashboard(): JsonResponse
    {
        return response()->json([
            'totals' => [
                'projects' => Project::query()->count(),
                'published_projects' => Project::query()->where('is_published', true)->count(),
                'blog_posts' => BlogPost::query()->count(),
                'unread_contact_messages' => ContactMessage::query()->whereNull('read_at')->count(),
                'media' => Media::query()->count(),
            ],
            'latest_messages' => ContactMessage::query()->latest()->limit(5)->get(),
            'latest_blog_posts' => BlogPostResource::collection(BlogPost::query()->latest()->limit(5)->get()),
        ]);
    }

    public function index(string $resource, Request $request): JsonResponse
    {
        $model = $this->model($resource);
        $query = $model::query();

        if (method_exists($model, 'scopeOrdered')) {
            $query->ordered();
        } else {
            $query->latest();
        }

        $perPage = min((int) $request->integer('per_page', 30), 100);

        return response()->json($query->paginate($perPage));
    }

    public function show(string $resource, int $id): JsonResponse
    {
        $record = $this->model($resource)::query()->findOrFail($id);

        return response()->json($record);
    }

    public function store(string $resource, Request $request): JsonResponse
    {
        $model = $this->model($resource);
        $data = $this->validated($resource, $request);
        $record = $model::query()->create($data);

        $this->syncRelations($resource, $record, $request);

        return response()->json($record->fresh(), 201);
    }

    public function update(string $resource, int $id, Request $request): JsonResponse
    {
        $record = $this->model($resource)::query()->findOrFail($id);
        $record->update($this->validated($resource, $request, $record));

        $this->syncRelations($resource, $record, $request);

        return response()->json($record->fresh());
    }

    public function destroy(string $resource, int $id): JsonResponse
    {
        $record = $this->model($resource)::query()->findOrFail($id);
        $record->delete();

        return response()->json(['message' => 'Deleted.']);
    }

    public function publish(string $resource, int $id, Request $request): JsonResponse
    {
        $record = $this->model($resource)::query()->findOrFail($id);
        $value = $request->boolean('is_published', true);
        $column = $record->getConnection()->getSchemaBuilder()->hasColumn($record->getTable(), 'is_published') ? 'is_published' : 'is_visible';
        $record->forceFill([$column => $value])->save();

        return response()->json($record);
    }

    public function feature(string $resource, int $id, Request $request): JsonResponse
    {
        $record = $this->model($resource)::query()->findOrFail($id);
        $record->forceFill(['is_featured' => $request->boolean('is_featured', true)])->save();

        return response()->json($record);
    }

    public function reorder(string $resource, Request $request): JsonResponse
    {
        $data = $request->validate(['items' => ['required', 'array'], 'items.*.id' => ['required', 'integer'], 'items.*.sort_order' => ['required', 'integer']]);
        $model = $this->model($resource);

        foreach ($data['items'] as $item) {
            $model::query()->whereKey($item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return response()->json(['message' => 'Order updated.']);
    }

    public function upload(Request $request): JsonResponse
    {
        $data = $request->validate([
            'file' => ['required', 'file', 'mimes:jpg,jpeg,png,webp,gif,svg,pdf', 'max:8192'],
            'alt_text' => ['nullable', 'string', 'max:180'],
            'directory' => ['nullable', 'string', 'max:80'],
        ]);

        $file = $data['file'];
        $directory = trim($data['directory'] ?? 'media', '/');
        $path = $file->store($directory, 'public');
        $media = Media::query()->create([
            'disk' => 'public',
            'path' => $path,
            'url' => Storage::disk('public')->url($path),
            'name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType() ?: 'application/octet-stream',
            'size' => $file->getSize() ?: 0,
            'alt_text' => $data['alt_text'] ?? null,
            'meta' => ['extension' => $file->getClientOriginalExtension()],
        ]);

        return response()->json($media, 201);
    }

    public function attachProjectImage(Project $project, Request $request): JsonResponse
    {
        $data = $request->validate([
            'image_path' => ['required', 'string', 'max:500'],
            'title' => ['nullable', 'string', 'max:160'],
            'alt_text' => ['nullable', 'string', 'max:180'],
            'is_cover' => ['boolean'],
            'sort_order' => ['integer'],
        ]);

        $image = $project->images()->create([
            'title' => $data['title'] ?? $project->title,
            'image_path' => $data['image_path'],
            'alt_text' => $data['alt_text'] ?? null,
            'is_cover' => $data['is_cover'] ?? false,
            'sort_order' => $data['sort_order'] ?? 0,
        ]);

        if ($image->is_cover) {
            $project->update(['cover_image' => $image->image_path]);
        }

        return response()->json($image, 201);
    }

    public function markMessage(ContactMessage $message, Request $request): JsonResponse
    {
        $message->update([
            'read_at' => $request->boolean('read', true) ? now() : null,
            'archived_at' => $request->boolean('archived', false) ? now() : null,
        ]);

        return response()->json($message);
    }

    private function model(string $resource): string
    {
        return [
            'settings' => Setting::class,
            'hero' => HeroSection::class,
            'about' => AboutSection::class,
            'skills' => Skill::class,
            'services' => Service::class,
            'projects' => Project::class,
            'blog-posts' => BlogPost::class,
            'blog-categories' => BlogCategory::class,
            'blog-tags' => BlogTag::class,
            'experiences' => Experience::class,
            'testimonials' => Testimonial::class,
            'contact-messages' => ContactMessage::class,
            'media' => Media::class,
            'menu-items' => MenuItem::class,
            'footer-settings' => FooterSetting::class,
        ][$resource] ?? abort(404, 'Unknown admin resource.');
    }

    private function validated(string $resource, Request $request, ?Model $record = null): array
    {
        $id = $record?->getKey();
        $rules = [
            'settings' => ['key' => ['required', 'string', 'max:120', Rule::unique('settings', 'key')->ignore($id)], 'label' => ['nullable', 'string', 'max:160'], 'value' => ['nullable'], 'group' => ['required', 'string', 'max:80'], 'is_public' => ['boolean'], 'sort_order' => ['integer']],
            'hero' => ['headline' => ['required', 'string', 'max:180'], 'subtitle' => ['nullable', 'string', 'max:180'], 'description' => ['nullable', 'string'], 'badges' => ['nullable', 'array'], 'cta_buttons' => ['nullable', 'array'], 'image_path' => ['nullable', 'string', 'max:500'], 'show_image' => ['boolean'], 'is_published' => ['boolean'], 'sort_order' => ['integer']],
            'about' => ['title' => ['nullable', 'string', 'max:180'], 'short_bio' => ['nullable', 'string'], 'body' => ['nullable', 'string'], 'highlights' => ['nullable', 'array'], 'cards' => ['nullable', 'array'], 'is_published' => ['boolean']],
            'skills' => ['name' => ['required', 'string', 'max:120'], 'category' => ['required', 'string', 'max:80'], 'level' => ['required', 'integer', 'between:0,100'], 'icon' => ['nullable', 'string', 'max:120'], 'icon_path' => ['nullable', 'string', 'max:500'], 'is_featured' => ['boolean'], 'is_visible' => ['boolean'], 'sort_order' => ['integer']],
            'services' => ['title' => ['required', 'string', 'max:160'], 'slug' => ['nullable', 'string', 'max:180', Rule::unique('services', 'slug')->ignore($id)], 'description' => ['required', 'string'], 'features' => ['nullable', 'array'], 'audience_tag' => ['nullable', 'string', 'max:80'], 'icon' => ['nullable', 'string', 'max:120'], 'price_label' => ['nullable', 'string', 'max:120'], 'cta_text' => ['nullable', 'string', 'max:120'], 'cta_link' => ['nullable', 'url', 'max:500'], 'is_visible' => ['boolean'], 'sort_order' => ['integer']],
            'projects' => ['title' => ['required', 'string', 'max:180'], 'slug' => ['nullable', 'string', 'max:200', Rule::unique('projects', 'slug')->ignore($id)], 'category' => ['required', 'string', 'max:180'], 'subtitle' => ['nullable', 'string', 'max:180'], 'project_type' => ['nullable', 'string', 'max:80'], 'summary' => ['required', 'string'], 'full_description' => ['nullable', 'string'], 'business_value' => ['required', 'string'], 'my_role' => ['nullable', 'string'], 'status' => ['nullable', 'string', 'max:80'], 'stack' => ['nullable', 'array'], 'features' => ['nullable', 'array'], 'problems_solved' => ['nullable', 'array'], 'case_study' => ['nullable', 'array'], 'cover_image' => ['nullable', 'string', 'max:500'], 'live_url' => ['nullable', 'url', 'max:500'], 'github_url' => ['nullable', 'url', 'max:500'], 'client_name' => ['nullable', 'string', 'max:160'], 'completed_at' => ['nullable', 'date'], 'is_featured' => ['boolean'], 'show_on_homepage' => ['boolean'], 'is_published' => ['boolean'], 'seo_title' => ['nullable', 'string', 'max:180'], 'seo_description' => ['nullable', 'string'], 'og_image' => ['nullable', 'string', 'max:500'], 'sort_order' => ['integer']],
            'blog-posts' => ['title' => ['required', 'string', 'max:180'], 'slug' => ['nullable', 'string', 'max:200', Rule::unique('blog_posts', 'slug')->ignore($id)], 'excerpt' => ['required', 'string'], 'content' => ['nullable', 'string'], 'featured_image' => ['nullable', 'string', 'max:500'], 'blog_category_id' => ['nullable', 'exists:blog_categories,id'], 'tags' => ['nullable', 'array'], 'author' => ['nullable', 'string', 'max:120'], 'reading_time' => ['nullable', 'integer', 'min:1'], 'is_featured' => ['boolean'], 'is_published' => ['boolean'], 'published_at' => ['nullable', 'date'], 'seo_title' => ['nullable', 'string', 'max:180'], 'seo_description' => ['nullable', 'string'], 'og_image' => ['nullable', 'string', 'max:500'], 'canonical_url' => ['nullable', 'url', 'max:500'], 'meta_robots' => ['nullable', 'string', 'max:80'], 'sort_order' => ['integer']],
            'blog-categories' => ['name' => ['required', 'string', 'max:120'], 'slug' => ['nullable', 'string', 'max:140', Rule::unique('blog_categories', 'slug')->ignore($id)], 'description' => ['nullable', 'string'], 'sort_order' => ['integer']],
            'blog-tags' => ['name' => ['required', 'string', 'max:120'], 'slug' => ['nullable', 'string', 'max:140', Rule::unique('blog_tags', 'slug')->ignore($id)]],
            'experiences' => ['role' => ['required', 'string', 'max:180'], 'company' => ['nullable', 'string', 'max:180'], 'location' => ['nullable', 'string', 'max:180'], 'type' => ['nullable', 'string', 'max:80'], 'date_range' => ['nullable', 'string', 'max:120'], 'description' => ['nullable', 'array'], 'start_date' => ['nullable', 'date'], 'end_date' => ['nullable', 'date'], 'is_current' => ['boolean'], 'technologies' => ['nullable', 'array'], 'company_logo' => ['nullable', 'string', 'max:500'], 'is_visible' => ['boolean'], 'sort_order' => ['integer']],
            'testimonials' => ['name' => ['required', 'string', 'max:160'], 'role' => ['nullable', 'string', 'max:160'], 'company' => ['nullable', 'string', 'max:160'], 'quote' => ['required', 'string'], 'avatar' => ['nullable', 'string', 'max:500'], 'rating' => ['nullable', 'integer', 'between:1,5'], 'is_published' => ['boolean'], 'is_featured' => ['boolean'], 'is_visible' => ['boolean'], 'sort_order' => ['integer']],
            'contact-messages' => ['read_at' => ['nullable', 'date'], 'archived_at' => ['nullable', 'date']],
            'media' => ['alt_text' => ['nullable', 'string', 'max:180'], 'meta' => ['nullable', 'array']],
            'menu-items' => ['label' => ['required', 'string', 'max:120'], 'url' => ['required', 'string', 'max:500'], 'is_external' => ['boolean'], 'open_in_new_tab' => ['boolean'], 'is_visible' => ['boolean'], 'sort_order' => ['integer']],
            'footer-settings' => ['key' => ['required', 'string', 'max:120', Rule::unique('footer_settings', 'key')->ignore($id)], 'value' => ['nullable'], 'is_visible' => ['boolean']],
        ][$resource] ?? abort(404);

        $data = $request->validate($rules);

        if (isset($data['title']) && array_key_exists('slug', $rules) && blank($data['slug'] ?? null)) {
            $data['slug'] = Str::slug($data['title']);
        }

        if ($resource === 'blog-posts' && blank($data['reading_time'] ?? null)) {
            $data['reading_time'] = max(1, (int) ceil(str_word_count(strip_tags((string) ($data['content'] ?? ''))) / 220));
        }

        return $data;
    }

    private function syncRelations(string $resource, Model $record, Request $request): void
    {
        if ($resource === 'blog-posts' && $request->has('tag_ids')) {
            $request->validate(['tag_ids' => ['array'], 'tag_ids.*' => ['integer', 'exists:blog_tags,id']]);
            $record->tagModels()->sync($request->input('tag_ids', []));
        }
    }
}
