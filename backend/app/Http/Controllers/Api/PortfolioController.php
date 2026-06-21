<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Http\Requests\CvDownloadRequest;
use App\Http\Resources\BlogPostResource;
use App\Http\Resources\PortfolioResource;
use App\Http\Resources\ProjectResource;
use App\Models\BlogPost;
use App\Models\Certification;
use App\Models\ContactMessage;
use App\Models\CvDownload;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Language;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Skill;
use App\Models\Stat;
use Illuminate\Http\JsonResponse;

class PortfolioController extends Controller
{
    public function profile(): JsonResponse
    {
        return response()->json([
            'name' => 'Youssef Youyou',
            'title' => 'Junior Full-Stack Web Developer',
            'positioning' => 'Laravel Backend Developer | React/Next.js Frontend Developer | API Integration | Admin Dashboards | SaaS | B2B/B2C Web Platforms | Deployment & SEO',
            'location' => 'Nador, Morocco',
            'availability' => 'Available for Marrakech, Morocco, remote work, freelance, B2B/B2C projects, and pre-hiring internship.',
            'email' => 'contact@youssefyouyou.com',
            'website' => 'https://youssefyouyou.com',
            'github' => 'https://github.com/youssefyouyoudev',
            'linkedin' => 'https://linkedin.com/in/youssefyouyoudev',
            'summary' => 'I build modern Laravel, React/Next.js, API-driven, SEO-ready and production-deployed web platforms for businesses, startups, and digital projects.',
        ]);
    }

    public function settings(): JsonResponse
    {
        return response()->json(Setting::query()->where('is_public', true)->get()->mapWithKeys(fn (Setting $setting) => [$setting->key => $setting->value]));
    }

    public function stats()
    {
        return PortfolioResource::collection(Stat::query()->ordered()->get());
    }

    public function services()
    {
        return PortfolioResource::collection(Service::query()->ordered()->get());
    }

    public function projects()
    {
        return ProjectResource::collection(Project::query()->with('images')->ordered()->get());
    }

    public function project(Project $project): ProjectResource
    {
        return ProjectResource::make($project->load('images'));
    }

    public function skills()
    {
        return PortfolioResource::collection(Skill::query()->ordered()->get()->groupBy('category'));
    }

    public function experiences()
    {
        return PortfolioResource::collection(Experience::query()->ordered()->get());
    }

    public function education()
    {
        return PortfolioResource::collection(Education::query()->ordered()->get());
    }

    public function certifications()
    {
        return PortfolioResource::collection(Certification::query()->ordered()->get());
    }

    public function languages()
    {
        return PortfolioResource::collection(Language::query()->ordered()->get());
    }

    public function blogPosts()
    {
        return BlogPostResource::collection(BlogPost::query()->published()->get());
    }

    public function blogPost(BlogPost $blogPost): BlogPostResource
    {
        abort_if($blogPost->published_at === null || $blogPost->published_at->isFuture(), 404);

        return BlogPostResource::make($blogPost);
    }

    public function contact(ContactRequest $request): JsonResponse
    {
        ContactMessage::query()->create($request->safe()->merge([
            'ip_address' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 1000),
        ])->all());

        return response()->json(['message' => 'Message received. I will reply as soon as possible.'], 201);
    }

    public function cvDownload(CvDownloadRequest $request): JsonResponse
    {
        CvDownload::query()->create($request->safe()->merge([
            'ip_address' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 1000),
        ])->all());

        $cvUrl = Setting::query()->where('key', 'cv_file')->value('value')['url'] ?? '/cv/youssef-youyou-cv.pdf';

        return response()->json([
            'message' => 'CV download tracked.',
            'download_url' => $cvUrl,
        ], 201);
    }
}
