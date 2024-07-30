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
}
