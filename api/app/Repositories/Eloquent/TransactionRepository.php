<?php

namespace App\Repositories\Eloquent;

use App\Models\Transaction;
use App\Repositories\Interfaces\TransactionRepositoryInterface;
use Illuminate\Support\Facades\DB;

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
            $query->where($data);
        }

        return $query->orderBy('id', 'desc')->get();
    }
}
