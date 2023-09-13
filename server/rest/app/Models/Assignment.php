<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;
    protected $fillable = [
        "title",
        "subject",
        "assignment_uuid",
        "description",
        "link",
        "content",
        "solution"
    ];
}
 