<?php

namespace App\Repository\Eloquent;

use Illuminate\Database\Eloquent\Model;

class BaseRepository
{
    public function __construct(
        protected Model $model
    ) {}

    public function create(array $data)
    {
        return $this->model->create($data);
    }
}
