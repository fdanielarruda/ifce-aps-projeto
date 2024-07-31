<?php

namespace App\Services;

use App\Helpers\AuthHelper;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Auth\Authenticatable;

class AuthService
{
    public function __construct(
        protected AuthHelper $authHelper
    ) {}

    /**
     * @throws AuthenticationException
     */
    public function authenticate(string $email, string $password): string
    {
        $data = [
            'email' => $email,
            'password' => $password
        ];

        if (!$token = auth('api')->attempt($data)) {
            throw new AuthenticationException('Credenciais inválidas');
        }

        return $token;
    }

    public function getAuthenticatedUser(): Authenticatable
    {
        return $this->authHelper->getUser();
    }

    public function logout(): void
    {
        $this->authHelper->logout();
    }

    public function refreshToken()
    {
        $token = $this->authHelper->getToken();
        return $this->authHelper->refreshToken($token);
    }
}
