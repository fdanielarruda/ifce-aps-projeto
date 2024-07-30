<?php

namespace App\Repositories\Interfaces;

interface GoalRepositoryInterface
{
    public function findByColumn(string $column, $data);
    public function findOne(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}
