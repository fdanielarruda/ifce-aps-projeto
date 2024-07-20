<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\AuthLoginRequest;
use App\Http\Requests\Auth\AuthRegisterRequest;
use App\Http\Resources\BaseResource;
use App\Http\Resources\TokenResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Faker\Provider\Base;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(AuthRegisterRequest $request): UserResource
    {
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return UserResource::make($user);
    }

    /**
     * @throws AuthenticationException
     */
    public function login(AuthLoginRequest $request): TokenResource
    {
        $credentials = $request->only(['email', 'password']);

        if (!$token = auth('api')->attempt($credentials)) {
            throw new AuthenticationException('Unauthorized');
        }

        return TokenResource::make($token);
    }

    public function me(): UserResource
    {
        $user = auth('api')->user();

        return UserResource::make($user);
    }

    public function logout(): BaseResource
    {
        auth('api')->logout();

        return BaseResource::make(['message' => 'Successfully logged out']);
    }

    public function refresh(): TokenResource
    {
        $token = JWTAuth::getToken();
        $newToken = JWTAuth::refresh($token);

        return TokenResource::make($newToken);
    }
}
