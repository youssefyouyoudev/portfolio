<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'tags' => $this->tags,
            'meta_title' => $this->meta_title,
            'meta_description' => $this->meta_description,
            'published_at' => $this->published_at?->toAtomString(),
        ];
    }
}
