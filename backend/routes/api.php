<?php

use App\Http\Controllers\Api\PortfolioController;
use Illuminate\Support\Facades\Route;

Route::middleware('throttle:api')->group(function (): void {
    Route::get('/profile', [PortfolioController::class, 'profile']);
    Route::get('/settings', [PortfolioController::class, 'settings']);
    Route::get('/stats', [PortfolioController::class, 'stats']);
    Route::get('/services', [PortfolioController::class, 'services']);
    Route::get('/projects', [PortfolioController::class, 'projects']);
    Route::get('/projects/{project:slug}', [PortfolioController::class, 'project']);
    Route::get('/skills', [PortfolioController::class, 'skills']);
    Route::get('/experiences', [PortfolioController::class, 'experiences']);
    Route::get('/education', [PortfolioController::class, 'education']);
    Route::get('/certifications', [PortfolioController::class, 'certifications']);
    Route::get('/languages', [PortfolioController::class, 'languages']);
    Route::get('/blog-posts', [PortfolioController::class, 'blogPosts']);
    Route::get('/blog-posts/{blogPost:slug}', [PortfolioController::class, 'blogPost']);
});

Route::post('/contact', [PortfolioController::class, 'contact'])->middleware('throttle:contact');
Route::post('/cv-download', [PortfolioController::class, 'cvDownload'])->middleware('throttle:cv-download');
