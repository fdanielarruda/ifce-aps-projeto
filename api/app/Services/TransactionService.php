<?php

namespace App\Services;

use App\Helpers\ArrayHelper;
use App\Helpers\AuthHelper;
use App\Libraries\OpenAi;
use App\Repositories\Interfaces\TransactionRepositoryInterface;

class TransactionService
{
    public function __construct(
        protected TransactionRepositoryInterface $repository,
        protected AuthHelper $authHelper,
        protected ArrayHelper $arrayHelper,

        protected OpenAi $openAi
    ) {}

    public function getAll()
    {
        $data['user_id'] = $this->authHelper->getId();

        return $this->repository->list($data);
    }

    public function organizeByCategories(array $request)
    {
        $request['user_id'] = $this->authHelper->getId();

        $transactions = $this->repository->list($request);

        if ($transactions->isEmpty()) {
            return [];
        }

        $messages = [
            $this->openAi->createSystemMessage("Salve esse dataset"),
            $this->openAi->createSystemMessage(json_encode($transactions)),
            $this->openAi->createUserMessage("Classifique por categorias as receitas e despesas informadas de uma forma mais ambragente, no final me retorne um json com o título da categoria e o somatório gasto. Separa por receitas e despesas."),
            $this->openAi->createUserMessage("Retorne apenas um data JSON, sem formatação."),
            $this->openAi->createUserMessage("{'name':'example'}"),
        ];

        $response = $this->openAi->make($messages);

        $data = $response['choices'][0]['message']['content'] ?? "";

        return json_decode($data, true);
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
        $updatedData = $this->arrayHelper->only($data, ['title', 'amount']);

        $this->repository->update($id, $updatedData);

        if (isset($data['goals'])) {
            $this->repository->syncGoals($id, $data['goals']);
        }

        return $this->repository->findOne($id);
    }

    public function delete(int $id)
    {
        return $this->repository->delete($id);
    }
}
