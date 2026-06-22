<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class BlogPostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $featuredImage = $this->absoluteUrl($this->featured_image);

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'featured_image' => $featuredImage,
            'category' => $this->whenLoaded('category', fn () => $this->category?->name),
            'tags' => $this->tags,
            'author' => $this->author,
            'reading_time' => $this->reading_time ?: max(1, (int) ceil(str_word_count(strip_tags((string) $this->content)) / 220)),
            'is_featured' => $this->is_featured,
            'is_published' => $this->is_published,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'seo_title' => $this->seo_title ?? $this->meta_title,
            'seo_description' => $this->seo_description ?? $this->meta_description,
            'og_image' => $this->absoluteUrl($this->og_image) ?? $featuredImage,
            'canonical_url' => $this->canonical_url,
            'meta_robots' => $this->meta_robots,
            'published_at' => $this->published_at?->toAtomString(),
        ];
    }

    private function absoluteUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, '/images/')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}
