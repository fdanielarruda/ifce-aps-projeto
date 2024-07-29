<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Requests\Auth\AuthRegisterRequest;
use App\Http\Resources\BaseResource;
use App\Http\Resources\TokenResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\AuthService;
use App\Services\UserService;
use Faker\Provider\Base;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct(
        protected UserService $service,
        protected AuthService $authService
    ) {}

    public function register(AuthRegisterRequest $request): UserResource
    {
        $user = $this->service->create($request->validated());

        return UserResource::make($user);
    }

    /**
     * @throws AuthenticationException
     */
    public function login(AuthLoginRequest $request): TokenResource
    {
        $token = $this->authService->authenticate($request->email, $request->password);

        return TokenResource::make($token);
    }

    public function me(): UserResource
    {
        $user = $this->authService->getAuthenticatedUser();

        return UserResource::make($user);
    }

    public function logout(): BaseResource
    {
        $this->authService->logout();

        return BaseResource::make(['message' => 'Successfully logged out']);
    }

    public function refresh(): TokenResource
    {
        $newToken = $this->authService->refreshToken();

        return TokenResource::make($newToken);
    }
}
