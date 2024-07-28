<?php

namespace App\Helpers;

use Illuminate\Contracts\Auth\Authenticatable;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Token;

class AuthHelper
{
    public function getId()
    {

    }

    public function getUser(): Authenticatable
    {
        return auth('api')->user();
    }

    public function logout(): void
    {
        auth('api')->logout();
    }

    public function getToken(): Token
    {
        return JWTAuth::getToken();
    }

    public function refreshToken(string $token): string
    {
        return JWTAuth::refresh($token);
    }
}
