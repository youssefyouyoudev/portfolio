<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'category' => $this->category,
            'summary' => $this->summary,
            'business_value' => $this->business_value,
            'stack' => $this->stack,
            'features' => $this->features,
            'problems_solved' => $this->problems_solved,
            'case_study' => $this->case_study,
            'cover_image' => $this->cover_image,
            'is_featured' => $this->is_featured,
            'images' => ProjectImageResource::collection($this->whenLoaded('images')),
        ];
    }
}
