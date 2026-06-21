<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CvDownload extends Model
{
    protected $fillable = ['email', 'source', 'ip_address', 'user_agent'];
}
