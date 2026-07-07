<?php

namespace App\Services;

use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Models\ChatbotKnowledge;
use App\Models\ChatbotSetting;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ChatbotResponder
{
    public function reply(ChatSession $session, string $message): array
    {
        $context = $this->knowledgeContext($message);
        $messages = $this->messages($session, $context);

        if (filled(config('services.openai.key'))) {
            try {
                $response = Http::withToken(config('services.openai.key'))
                    ->acceptJson()
                    ->timeout((int) config('services.openai.timeout', 20))
                    ->post(rtrim((string) config('services.openai.base_url'), '/').'/chat/completions', [
                        'model' => config('services.openai.model'),
                        'messages' => $messages,
                        'temperature' => 0.35,
                        'max_tokens' => 520,
                    ]);

                if ($response->successful()) {
                    $payload = $response->json();
                    $content = trim((string) data_get($payload, 'choices.0.message.content'));

                    if ($content !== '') {
                        return [
                            'content' => $content,
                            'metadata' => [
                                'provider' => 'openai',
                                'model' => config('services.openai.model'),
                                'finish_reason' => data_get($payload, 'choices.0.finish_reason'),
                            ],
                            'input_tokens' => data_get($payload, 'usage.prompt_tokens'),
                            'output_tokens' => data_get($payload, 'usage.completion_tokens'),
                        ];
                    }
                }

                Log::warning('Chatbot AI request failed.', [
                    'status' => $response->status(),
                    'body' => Str::limit($response->body(), 500),
                ]);
            } catch (\Throwable $exception) {
                Log::warning('Chatbot AI request exception.', ['message' => $exception->getMessage()]);
            }
        }

        return [
            'content' => $this->fallbackReply($message),
            'metadata' => ['provider' => 'local_fallback'],
            'input_tokens' => null,
            'output_tokens' => null,
        ];
    }

    public function shouldAskForLead(string $message): bool
    {
        return Str::contains(Str::lower($message), [
            'price', 'pricing', 'quote', 'estimate', 'cost', 'budget', 'hire', 'contact',
            'project', 'website', 'dashboard', 'saas', 'automation', 'devis', 'prix',
            'projet', 'whatsapp', 'بغيت', 'ثمن', 'مشروع',
        ]);
    }

    private function messages(ChatSession $session, string $context): array
    {
        $history = $session->messages()
            ->whereIn('role', ['user', 'assistant'])
            ->latest()
            ->limit(8)
            ->get()
            ->reverse()
            ->map(fn (ChatMessage $chatMessage) => [
                'role' => $chatMessage->role,
                'content' => $chatMessage->content,
            ])
            ->values()
            ->all();

        return [
            ['role' => 'system', 'content' => $this->systemPrompt($context)],
            ...$history,
        ];
    }

    private function systemPrompt(string $context): string
    {
        $basePrompt = (string) ChatbotSetting::value('system_prompt', [
            'text' => 'You are the AI assistant of Youssef Youyou, a Moroccan full-stack developer. Youssef builds modern websites, Laravel/Next.js applications, admin dashboards, APIs, automation systems, AI integrations, booking platforms, portfolio websites, and business tools. Your job is to help visitors understand his skills, projects, services, pricing, and contact options. Be clear, professional, friendly, and focused on converting visitors into qualified leads. If the user wants a project, collect their name, contact, project type, budget, and deadline. Do not invent fake experience. If something is unknown, say that Youssef can confirm it directly.',
        ])['text'];

        return $basePrompt.PHP_EOL.PHP_EOL.implode(PHP_EOL, [
            'Rules:',
            '- Keep answers short, helpful and conversion-focused.',
            '- Reply in the visitor language when clear. English, French, Arabic and Moroccan Darija are supported.',
            '- Give flexible estimates only. Do not promise fixed prices without scope.',
            '- Never invent clients, testimonials, awards, rankings, traffic, revenue or screenshots.',
            '- If the visitor shows project intent, ask for name, email or WhatsApp, project type, budget and deadline.',
            '- Prefer links: /#services, /projects, /work-with-me, /contact.',
            '',
            'Portfolio context:',
            $context,
        ]);
    }

    private function knowledgeContext(string $message): string
    {
        $normalized = Str::lower($message);

        $knowledge = ChatbotKnowledge::query()
            ->where('is_active', true)
            ->ordered()
            ->limit(18)
            ->get()
            ->map(fn (ChatbotKnowledge $item) => "- {$item->type}: {$item->title} - ".Str::limit(strip_tags($item->content), 700))
            ->implode(PHP_EOL);

        $services = Service::query()
            ->where('is_visible', true)
            ->ordered()
            ->limit(12)
            ->get(['title', 'description', 'audience_tag'])
            ->map(fn (Service $service) => "- {$service->title}: {$service->description} ({$service->audience_tag})")
            ->implode(PHP_EOL);

        $projects = Project::query()
            ->where('is_published', true)
            ->ordered()
            ->limit(8)
            ->get(['title', 'category', 'summary', 'business_value'])
            ->map(fn (Project $project) => "- {$project->title}: {$project->category}. {$project->summary} Value: {$project->business_value}")
            ->implode(PHP_EOL);

        $skills = Skill::query()
            ->where('is_visible', true)
            ->ordered()
            ->limit(35)
            ->get(['name', 'category'])
            ->groupBy('category')
            ->map(fn ($items, string $category) => "- {$category}: ".$items->pluck('name')->implode(', '))
            ->implode(PHP_EOL);

        $pricing = $this->pricingContext($normalized);

        return trim(implode(PHP_EOL.PHP_EOL, array_filter([
            'Youssef Youyou: Senior Full-Stack Web Developer from Nador, Morocco. Focus: Laravel, React, Next.js, APIs, SaaS platforms, admin dashboards, business automation, SEO, Nginx, Cloudflare and deployment.',
            'Contact: /contact or /work-with-me. Email: contact@youssefyouyou.com. GitHub and LinkedIn are linked in the portfolio footer.',
            $pricing,
            "Editable chatbot knowledge:\n".$knowledge,
            "Services:\n".$services,
            "Projects:\n".$projects,
            "Skills:\n".$skills,
        ])));
    }

    private function pricingContext(string $message): string
    {
        $ranges = ChatbotSetting::value('pricing_ranges', [
            'website' => 'Small business website or landing page: flexible estimate after scope; usually depends on pages, content, SEO and admin editing.',
            'dashboard' => 'Admin dashboard/internal tool: estimate depends on modules, roles, reports, data model and integrations.',
            'saas' => 'SaaS MVP: estimate depends on users, subscriptions, dashboards, API complexity and launch plan.',
            'automation' => 'Business automation: estimate depends on workflow complexity, files, reports and replacement of manual steps.',
        ]);

        if (! Str::contains($message, ['price', 'pricing', 'quote', 'estimate', 'cost', 'budget', 'devis', 'prix', 'ثمن'])) {
            return '';
        }

        return "Pricing guidance:\n".collect($ranges)->map(fn ($value, $key) => "- {$key}: {$value}")->implode(PHP_EOL)."\nAlways encourage requesting a quote because scope matters.";
    }

    private function fallbackReply(string $message): string
    {
        $lower = Str::lower($message);

        if (Str::contains($lower, ['price', 'pricing', 'quote', 'estimate', 'cost', 'budget', 'devis', 'prix', 'ثمن'])) {
            return 'Pricing depends on the scope, modules, design level and deployment needs. Youssef can estimate websites, Laravel/React dashboards, SaaS MVPs, APIs and automation projects after a short brief. Share your name, email or WhatsApp, project type, budget range and deadline, or use /work-with-me.';
        }

        if (Str::contains($lower, ['project', 'portfolio', 'case study', 'rifitv', 'erplus'])) {
            return 'Youssef has case studies for RiFiTV, ERPlus, digital archiving, SaaS dashboards, e-commerce/client portals, Excel/VBA automation and his portfolio admin system. You can open /projects or tell me what type of project you want to compare.';
        }

        if (Str::contains($lower, ['service', 'website', 'dashboard', 'api', 'saas', 'automation'])) {
            return 'Youssef builds business websites, Laravel APIs, React/Next.js dashboards, SaaS platforms, admin panels, booking systems, client portals, SEO-ready landing pages and business automation tools. The fastest next step is /work-with-me or /#services.';
        }

        if (Str::contains($lower, ['contact', 'email', 'whatsapp', 'hire'])) {
            return 'You can contact Youssef through /contact or /work-with-me. For a project request, send the business goal, current problem, project type, budget range and ideal deadline.';
        }

        return 'I can help you explore Youssef’s services, projects, skills, pricing direction and contact options. Ask about Laravel, React/Next.js, dashboards, SaaS, APIs, automation, SEO, deployment, or request a quote.';
    }
}
