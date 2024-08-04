<?php

namespace App\Helpers;

use Illuminate\Contracts\Auth\Authenticatable;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Token;

class ArrayHelper
{
    public function only(array $data, array $keys): array
    {
        return array_filter($data, fn ($key) => in_array($key, $keys), ARRAY_FILTER_USE_KEY);
    }
}
