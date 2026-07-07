<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc,dns', 'max:160'],
            'company' => ['nullable', 'string', 'max:160'],
            'country_city' => ['nullable', 'string', 'max:160'],
            'business_goal' => ['nullable', 'string', 'max:220'],
            'current_problem' => ['nullable', 'string', 'max:240'],
            'project_type' => ['required', Rule::in(['B2B website', 'B2C website', 'SaaS', 'Admin dashboard', 'E-commerce', 'API integration', 'Internal tool', 'Digital archiving', 'Automation', 'Other'])],
            'budget_range' => ['required', Rule::in(['Small project', 'Medium project', 'Large project', 'Not sure yet'])],
            'timeline' => ['nullable', 'string', 'max:120'],
            'preferred_contact_method' => ['nullable', Rule::in(['Email', 'WhatsApp on request', 'Google Meet', 'Phone call if needed'])],
            'contact_as' => ['nullable', Rule::in(['Business owner', 'Agency', 'Recruiter', 'Startup founder', 'Developer/team', 'Other'])],
            'engagement_type' => ['nullable', Rule::in(['Freelance project', 'Remote job', 'Part-time contract', 'Consultation', 'Maintenance/fix', 'Long-term collaboration'])],
            'message' => ['required', 'string', 'min:20', 'max:3000'],
            'website' => ['nullable', 'prohibited'],
        ];
    }
}
