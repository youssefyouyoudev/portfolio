<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CvDownloadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['nullable', 'email:rfc,dns', 'max:160'],
            'source' => ['nullable', 'string', 'max:120'],
        ];
    }
}
