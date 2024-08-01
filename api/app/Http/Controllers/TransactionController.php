<?php

namespace App\Http\Controllers;

use App\Http\Requests\Transaction\TransactionCreateRequest;
use App\Http\Requests\Transaction\TransactionUpdateRequest;
use App\Http\Resources\BaseResource;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use App\Services\TransactionService;
use Illuminate\Http\Resources\Json\ResourceCollection;

class TransactionController
{
    public function __construct(
        protected TransactionService $service
    ) {}

    /**
     * Display a listing of the resource.
     *
     * @return ResourceCollection<TransactionResource>
     */
    public function list(): ResourceCollection
    {
        $transactions = $this->service->getAll();

        return TransactionResource::collection($transactions);
    }

    public function create(TransactionCreateRequest $request): TransactionResource
    {
        $transaction = $this->service->create($request->validated());

        return TransactionResource::make($transaction);
    }

    public function update(Transaction $transaction, TransactionUpdateRequest $request): TransactionResource
    {
        $transaction = $this->service->update($transaction->id, $request->validated());

        return TransactionResource::make($transaction);
    }

    public function delete(Transaction $transaction): BaseResource
    {
        $this->service->delete($transaction->id);

        return BaseResource::make(['message' => 'Deletado com sucesso']);
    }
}
