<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ChatLead;
use App\Models\ChatSession;
use App\Models\ChatbotSetting;
use App\Services\ChatbotResponder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ChatbotController extends Controller
{
    public function settings(): JsonResponse
    {
        $enabled = (bool) (ChatbotSetting::value('enabled', ['value' => true])['value'] ?? true);

        return response()->json([
            'enabled' => $enabled,
            'welcome_message' => ChatbotSetting::value('welcome_message', [
                'text' => "Hi, I'm Youssef's AI assistant. I can help you explore his services, projects, skills, and contact options.",
            ])['text'],
            'quick_actions' => ChatbotSetting::value('quick_actions', [
                'items' => ['View Services', 'See Projects', 'Request a Quote', 'Contact Youssef', 'Website Pricing', 'Business Automation'],
            ])['items'],
        ]);
    }

    public function message(Request $request, ChatbotResponder $responder): JsonResponse
    {
        abort_if(! (bool) (ChatbotSetting::value('enabled', ['value' => true])['value'] ?? true), 403, 'Chatbot is currently disabled.');

        $data = $request->validate([
            'message' => ['required', 'string', 'min:1', 'max:1200'],
            'session_id' => ['nullable', 'uuid'],
            'page_url' => ['nullable', 'string', 'max:500'],
            'locale' => ['nullable', 'string', 'max:12'],
        ]);

        $session = $this->session($request, $data);
        $session->messages()->create([
            'role' => 'user',
            'content' => $data['message'],
            'metadata' => ['page_url' => $data['page_url'] ?? null],
        ]);

        $reply = $responder->reply($session, $data['message']);
        $session->messages()->create([
            'role' => 'assistant',
            'content' => $reply['content'],
            'metadata' => $reply['metadata'],
            'input_tokens' => $reply['input_tokens'],
            'output_tokens' => $reply['output_tokens'],
        ]);
        $session->update(['last_message_at' => now()]);

        return response()->json([
            'session_id' => $session->session_token,
            'message' => $reply['content'],
            'lead_prompt' => $responder->shouldAskForLead($data['message']),
        ]);
    }

    public function lead(Request $request): JsonResponse
    {
        $data = $request->validate([
            'session_id' => ['nullable', 'uuid'],
            'name' => ['required', 'string', 'max:160'],
            'email' => ['nullable', 'email', 'required_without_all:whatsapp,contact', 'max:180'],
            'whatsapp' => ['nullable', 'string', 'required_without_all:email,contact', 'max:80'],
            'contact' => ['nullable', 'string', 'required_without_all:email,whatsapp', 'max:180'],
            'project_type' => ['required', 'string', 'max:160'],
            'budget' => ['nullable', 'string', 'max:120'],
            'deadline' => ['nullable', 'string', 'max:120'],
            'source_page' => ['nullable', 'string', 'max:500'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $session = isset($data['session_id'])
            ? ChatSession::query()->where('session_token', $data['session_id'])->first()
            : null;

        $lead = ChatLead::query()->create([
            'chat_session_id' => $session?->id,
            'name' => $data['name'],
            'email' => $data['email'] ?? null,
            'whatsapp' => $data['whatsapp'] ?? null,
            'contact' => $data['contact'] ?? null,
            'project_type' => $data['project_type'],
            'budget' => $data['budget'] ?? null,
            'deadline' => $data['deadline'] ?? null,
            'source_page' => $data['source_page'] ?? $session?->page_url,
            'notes' => $data['notes'] ?? null,
            'metadata' => [
                'ip_address' => $request->ip(),
                'user_agent' => substr((string) $request->userAgent(), 0, 1000),
            ],
        ]);

        if ($session) {
            $session->update([
                'visitor_name' => $data['name'] ?? $session->visitor_name,
                'visitor_contact' => $data['email'] ?? $data['whatsapp'] ?? $data['contact'] ?? $session->visitor_contact,
                'lead_status' => 'qualified',
            ]);

            $session->messages()->create([
                'role' => 'system',
                'content' => 'Lead captured from chatbot widget.',
                'metadata' => ['chat_lead_id' => $lead->id],
            ]);
        }

        return response()->json([
            'message' => 'Thanks. Youssef can review your project details and reply with a realistic next step.',
            'lead_id' => $lead->id,
        ], 201);
    }

    private function session(Request $request, array $data): ChatSession
    {
        $token = $data['session_id'] ?? (string) Str::uuid();

        return ChatSession::query()->firstOrCreate([
            'session_token' => $token,
        ], [
            'locale' => $data['locale'] ?? null,
            'page_url' => $data['page_url'] ?? null,
            'ip_address' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 1000),
            'last_message_at' => now(),
        ]);
    }
}
