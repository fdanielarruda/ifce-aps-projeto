<?php

namespace App\Services;

use App\Helpers\AuthHelper;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Auth\Authenticatable;

class UserService
{
    public function __construct(
        protected AuthHelper $authHelper
    ) {}

    public function create(array $data): User
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
    }
}
