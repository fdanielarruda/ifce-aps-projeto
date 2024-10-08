<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'amount'
    ];

    protected $hidden = ['pivot'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function goals()
    {
        return $this->belongsToMany(Goal::class);
    }
}
