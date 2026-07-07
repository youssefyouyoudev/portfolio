<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;
use App\Http\Requests\CvDownloadRequest;
use App\Http\Resources\BlogPostResource;
use App\Http\Resources\PortfolioResource;
use App\Http\Resources\ProjectResource;
use App\Models\AboutSection;
use App\Models\BlogPost;
use App\Models\Certification;
use App\Models\ContactMessage;
use App\Models\CvDownload;
use App\Models\Education;
use App\Models\Experience;
use App\Models\FooterSetting;
use App\Models\HeroSection;
use App\Models\Language;
use App\Models\MenuItem;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Skill;
use App\Models\Stat;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;

class PortfolioController extends Controller
{
    public function profile(): JsonResponse
    {
        return response()->json([
            'name' => 'Youssef Youyou',
            'title' => 'Senior Full-Stack Web Developer',
            'positioning' => 'Full-Stack Developer from Nador, Morocco | Laravel, React & Next.js Developer | SaaS, Dashboard & Business Automation Developer',
            'location' => 'Nador, Morocco',
            'availability' => 'Available for freelance, remote and business web projects in Morocco and internationally.',
            'email' => 'contact@youssefyouyou.com',
            'website' => 'https://youssefyouyou.com',
            'github' => 'https://github.com/youssefyouyoudev',
            'linkedin' => 'https://linkedin.com/in/youssefyouyoudev',
            'summary' => 'I build production-ready Laravel APIs, React/Next.js interfaces, SaaS platforms, admin dashboards, business automation tools, and SEO-friendly websites for businesses in Morocco and worldwide.',
        ]);
    }

    public function settings(): JsonResponse
    {
        return response()->json(Setting::query()->where('is_public', true)->get()->mapWithKeys(fn (Setting $setting) => [$setting->key => $setting->value]));
    }

    public function hero(): JsonResponse
    {
        return response()->json(HeroSection::query()->published()->ordered()->first());
    }

    public function about(): JsonResponse
    {
        return response()->json(AboutSection::query()->published()->latest()->first());
    }

    public function navigation()
    {
        return PortfolioResource::collection(MenuItem::query()->where('is_visible', true)->ordered()->get());
    }

    public function footer(): JsonResponse
    {
        return response()->json(FooterSetting::query()->where('is_visible', true)->get()->mapWithKeys(fn (FooterSetting $setting) => [$setting->key => $setting->value]));
    }

    public function stats()
    {
        return PortfolioResource::collection(Stat::query()->ordered()->get());
    }

    public function services()
    {
        return PortfolioResource::collection(Service::query()->where('is_visible', true)->ordered()->get());
    }

    public function projects()
    {
        return ProjectResource::collection(Project::query()->published()->with('images')->ordered()->get());
    }

    public function featuredProjects()
    {
        return ProjectResource::collection(Project::query()->published()->featured()->homepage()->with('images')->ordered()->get());
    }

    public function project(Project $project): ProjectResource
    {
        abort_unless($project->is_published, 404);

        return ProjectResource::make($project->load('images'));
    }

    public function skills()
    {
        return response()->json(Skill::query()->where('is_visible', true)->ordered()->get()->groupBy('category'));
    }

    public function experiences()
    {
        return PortfolioResource::collection(Experience::query()->where('is_visible', true)->ordered()->get());
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
        return BlogPostResource::collection(BlogPost::query()->with('category')->published()->get());
    }

    public function featuredBlogPosts()
    {
        return BlogPostResource::collection(BlogPost::query()->with('category')->published()->where('is_featured', true)->get());
    }

    public function blogPost(BlogPost $blogPost): BlogPostResource
    {
        abort_if(! $blogPost->is_published || $blogPost->published_at === null || $blogPost->published_at->isFuture(), 404);

        return BlogPostResource::make($blogPost->load('category', 'tagModels'));
    }

    public function testimonials()
    {
        return PortfolioResource::collection(Testimonial::query()->where('is_visible', true)->where('is_published', true)->ordered()->get());
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
