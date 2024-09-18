<?php

namespace App\Repositories\Eloquent;

use App\Models\Transaction;
use App\Repositories\Interfaces\TransactionRepositoryInterface;

class TransactionRepository extends BaseRepository implements TransactionRepositoryInterface
{
    public function __construct(Transaction $model)
    {
        parent::__construct($model);
    }

    public function list(array $data = [])
    {
        $query = $this->model->query();

        if (isset($data)) {
            if ($data['date_start']) {
                $query->where('created_at', '>=', $data['date_start'] . ' 00:00:00');
                unset($data['date_start']);
            }
            
            if ($data['date_end']) {
                $query->where('created_at', '<=', $data['date_end'] . ' 23:59:59');
                unset($data['date_end']);
            }

            $query->where($data);
        }

        return $query->orderBy('id', 'desc')->get();
    }

    public function findOne(int $id)
    {
        return $this->model->find($id)->load(['goals']);
    }

    public function syncGoals(int $id, array $goals)
    {
        $transaction = $this->findOne($id);

        if ($transaction) {
            $transaction->goals()->sync($goals);
        }
    }
}
