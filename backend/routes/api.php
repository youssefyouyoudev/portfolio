<?php

use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\CmsController;
use App\Http\Controllers\Api\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:api')->group(function (): void {
    Route::get('/profile', [PortfolioController::class, 'profile']);
    Route::get('/settings', [PortfolioController::class, 'settings']);
    Route::get('/hero', [PortfolioController::class, 'hero']);
    Route::get('/about', [PortfolioController::class, 'about']);
    Route::get('/navigation', [PortfolioController::class, 'navigation']);
    Route::get('/footer', [PortfolioController::class, 'footer']);
    Route::get('/stats', [PortfolioController::class, 'stats']);
    Route::get('/services', [PortfolioController::class, 'services']);
    Route::get('/projects', [PortfolioController::class, 'projects']);
    Route::get('/projects/featured', [PortfolioController::class, 'featuredProjects']);
    Route::get('/projects/{project:slug}', [PortfolioController::class, 'project']);
    Route::get('/skills', [PortfolioController::class, 'skills']);
    Route::get('/experiences', [PortfolioController::class, 'experiences']);
    Route::get('/education', [PortfolioController::class, 'education']);
    Route::get('/certifications', [PortfolioController::class, 'certifications']);
    Route::get('/languages', [PortfolioController::class, 'languages']);
    Route::get('/blog', [PortfolioController::class, 'blogPosts']);
    Route::get('/blog/featured', [PortfolioController::class, 'featuredBlogPosts']);
    Route::get('/blog/{blogPost:slug}', [PortfolioController::class, 'blogPost']);
    Route::get('/blog-posts', [PortfolioController::class, 'blogPosts']);
    Route::get('/blog-posts/{blogPost:slug}', [PortfolioController::class, 'blogPost']);
    Route::get('/testimonials', [PortfolioController::class, 'testimonials']);
});

Route::post('/contact', [PortfolioController::class, 'contact'])->middleware('throttle:contact');
Route::post('/cv-download', [PortfolioController::class, 'cvDownload'])->middleware('throttle:cv-download');

Route::prefix('admin')->group(function (): void {
    Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login');

    Route::middleware(['auth:sanctum', 'admin'])->group(function (): void {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/dashboard', [CmsController::class, 'dashboard']);
        Route::post('/media/upload', [CmsController::class, 'upload']);
        Route::post('/projects/{project}/images', [CmsController::class, 'attachProjectImage']);
        Route::patch('/contact-messages/{message}/mark', [CmsController::class, 'markMessage']);

        Route::get('/{resource}', [CmsController::class, 'index']);
        Route::post('/{resource}', [CmsController::class, 'store']);
        Route::get('/{resource}/{id}', [CmsController::class, 'show'])->whereNumber('id');
        Route::put('/{resource}/{id}', [CmsController::class, 'update'])->whereNumber('id');
        Route::patch('/{resource}/{id}', [CmsController::class, 'update'])->whereNumber('id');
        Route::delete('/{resource}/{id}', [CmsController::class, 'destroy'])->whereNumber('id');
        Route::patch('/{resource}/{id}/publish', [CmsController::class, 'publish'])->whereNumber('id');
        Route::patch('/{resource}/{id}/feature', [CmsController::class, 'feature'])->whereNumber('id');
        Route::post('/{resource}/reorder', [CmsController::class, 'reorder']);
    });
});
