<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProjectResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $caseStudy = $this->case_study ?? [];
        $coverImage = $this->absoluteUrl($this->cover_image);

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'category' => $this->category,
            'subtitle' => $this->subtitle,
            'project_type' => $this->project_type,
            'summary' => $this->summary,
            'shortDescription' => $this->summary,
            'full_description' => $this->full_description,
            'business_value' => $this->business_value,
            'businessValue' => $this->business_value,
            'stack' => $this->stack,
            'techStack' => $this->stack,
            'features' => $this->features,
            'keyFeatures' => $this->features,
            'problems_solved' => $this->problems_solved,
            'challengesSolved' => $this->problems_solved,
            'case_study' => $this->case_study,
            'businessProblem' => $caseStudy['business_problem'] ?? null,
            'solution' => $caseStudy['solution'] ?? null,
            'myRole' => $this->my_role ?? ($caseStudy['role'] ?? null),
            'targetUsers' => $caseStudy['target_users'] ?? null,
            'impact' => $caseStudy['impact'] ?? $this->business_value,
            'learned' => $caseStudy['learned'] ?? null,
            'recruiterSignal' => $caseStudy['recruiter_signal'] ?? null,
            'status' => $this->status,
            'live_url' => $this->live_url,
            'github_url' => $this->github_url,
            'client_name' => $this->client_name,
            'completed_at' => $this->completed_at?->toDateString(),
            'cover_image' => $coverImage,
            'image' => $coverImage,
            'imageAlt' => $this->title.' project preview',
            'is_featured' => $this->is_featured,
            'show_on_homepage' => $this->show_on_homepage,
            'is_published' => $this->is_published,
            'caseStudyUrl' => '/projects/'.$this->slug,
            'seoTitle' => $this->seo_title,
            'seoDescription' => $this->seo_description,
            'ogImage' => $this->absoluteUrl($this->og_image),
            'sort_order' => $this->sort_order,
            'updated_at' => $this->updated_at?->toAtomString(),
            'images' => ProjectImageResource::collection($this->whenLoaded('images')),
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
