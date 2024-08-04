<?php

namespace App\Repositories\Interfaces;

interface TransactionRepositoryInterface
{
    public function list(array $data = []);
    public function findOne(int $id);
    public function create(array $data);
    public function syncGoals(int $id, array $goals);
    public function update(int $id, array $data);
    public function delete(int $id);
}
