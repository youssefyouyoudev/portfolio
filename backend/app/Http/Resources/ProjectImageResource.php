<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProjectImageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'image_path' => $this->absoluteUrl($this->image_path),
            'url' => $this->absoluteUrl($this->image_path),
            'alt_text' => $this->alt_text,
            'is_cover' => $this->is_cover ?? false,
            'sort_order' => $this->sort_order,
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
