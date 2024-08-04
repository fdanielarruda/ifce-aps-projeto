<?php

namespace App\Services;

use App\Helpers\AuthHelper;
use App\Repositories\Interfaces\TransactionRepositoryInterface;

class TransactionService
{
    public function __construct(
        protected TransactionRepositoryInterface $repository,
        protected AuthHelper $authHelper
    ) {}

    public function getAll()
    {
        $data['user_id'] = $this->authHelper->getId();

        return $this->repository->list($data);
    }

    public function create(array $data)
    {
        $user_id = $this->authHelper->getId();

        $transaction = $this->repository->create([
            'user_id' => $user_id,
            'title' => $data['title'],
            'amount' => $data['amount']
        ]);

        $this->repository->syncGoals($transaction->id, $data['goals'] ?? []);

        return $this->repository->findOne($transaction->id);
    }

    public function update(int $id, array $data)
    {
        $this->repository->update($id, $data);

        return $this->repository->findOne($id);
    }

    public function delete(int $id)
    {
        return $this->repository->delete($id);
    }
}
