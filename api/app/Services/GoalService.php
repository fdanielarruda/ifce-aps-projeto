<?php

namespace App\Services;

use App\Helpers\AuthHelper;
use App\Repositories\Interfaces\GoalRepositoryInterface;

class GoalService
{
    public function __construct(
        protected GoalRepositoryInterface $repository,
        protected AuthHelper $authHelper
    ) {}

    public function getAll(array $filter)
    {
        $data = [
            'user_id' => $this->authHelper->getId(),
            'show_completed' => $filter['show_completed'] ?? null
        ];

        return $this->repository->list($data);
    }

    public function create(array $data)
    {
        $user_id = $this->authHelper->getId();

        return $this->repository->create([
            'user_id' => $user_id,
            'title' => $data['title'],
            'description' => $data['description'],
            'due_date' => $data['due_date']
        ]);
    }

    public function update(int $id, array $data)
    {
        $this->repository->update($id, $data);

        return $this->repository->findOne($id);
    }

    public function updateCompletedAt(int $id, bool $is_completed)
    {
        $data['completed_at'] = $is_completed ? date('Y-m-d H:i:s') : null;

        $this->repository->update($id, $data);

        return $this->repository->findOne($id);
    }

    public function delete(int $id)
    {
        return $this->repository->delete($id);
    }
}
