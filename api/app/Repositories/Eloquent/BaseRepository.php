<?php

namespace App\Repositories\Eloquent;

use Illuminate\Database\Eloquent\Model;

class BaseRepository
{
    public function __construct(
        protected Model $model
    ) {}

    public function list(array $data = [])
    {
        return $this->model->all();
    }

    public function findByColumn(string $column, $data)
    {
        return $this->model->where($column, $data)->get();
    }

    public function findOne(int $id)
    {
        return $this->model->find($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->model->find($id)->update($data);
    }

    public function delete(int $id)
    {
        return $this->model->destroy($id);
    }
}
