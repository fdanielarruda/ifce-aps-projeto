<?php

namespace App\Repositories\Interfaces;

interface TransactionRepositoryInterface
{
    public function list(array $data = []);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}
