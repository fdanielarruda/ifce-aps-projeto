<?php

namespace App\Repositories\Eloquent;

use App\Models\Goal;
use App\Repositories\Interfaces\GoalRepositoryInterface;

class GoalRepository extends BaseRepository implements GoalRepositoryInterface
{
    public function __construct(Goal $model)
    {
        parent::__construct($model);
    }

    public function list(array $data = [])
    {
        $query = $this->model->query();

        if (isset($data['user_id'])) {
            $query->where('user_id', $data['user_id']);
        }

        if (!isset($data['show_completed']) || $data['show_completed'] == "false") {
            $query->where('completed_at', null);
        }

        $query->orderBy('id', 'desc');
        $query->with('transactions');

        return $query->get();
    }
}
