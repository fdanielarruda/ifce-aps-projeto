<?php

namespace App\Services;

use App\Helpers\AuthHelper;
use App\Models\User;
use App\Repository\Interfaces\UserRepositoryInterface;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Contracts\Auth\Authenticatable;

class UserService
{
    public function __construct(
        protected UserRepositoryInterface $repository,
        protected AuthHelper $authHelper
    ) {}

    public function create(array $data): User
    {
        return $this->repository->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
    }
}
