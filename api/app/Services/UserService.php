<?php

namespace App\Services;

use App\Helpers\AuthHelper;
use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;

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
