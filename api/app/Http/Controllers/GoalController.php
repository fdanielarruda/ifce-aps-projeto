<?php

namespace App\Http\Controllers;

use App\Http\Requests\Goal\GoalCreateRequest;
use App\Http\Requests\Goal\GoalUpdateCompletedAtRequest;
use App\Http\Requests\Goal\GoalUpdateRequest;
use App\Http\Resources\BaseResource;
use App\Http\Resources\GoalResource;
use App\Models\Goal;
use App\Services\GoalService;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Request;

class GoalController
{
    public function __construct(
        protected GoalService $service
    ) {}

    /**
     * Display a listing of the resource.
     *
     * @return ResourceCollection<GoalResource>
     */
    public function list(Request $request): ResourceCollection
    {
        $goals = $this->service->getAll($request->only('show_completed'));

        return GoalResource::collection($goals);
    }

    public function create(GoalCreateRequest $request): GoalResource
    {
        $goal = $this->service->create($request->validated());

        return GoalResource::make($goal);
    }

    public function update(Goal $goal, GoalUpdateRequest $request): GoalResource
    {
        $goal = $this->service->update($goal->id, $request->validated());

        return GoalResource::make($goal);
    }

    public function updateCompletedAt(Goal $goal, GoalUpdateCompletedAtRequest $request): GoalResource
    {
        $goal = $this->service->updateCompletedAt($goal->id, $request->is_completed);

        return GoalResource::make($goal);
    }

    public function delete(Goal $goal): BaseResource
    {
        $this->service->delete($goal->id);

        return BaseResource::make(['message' => 'Deletado com sucesso']);
    }
}
