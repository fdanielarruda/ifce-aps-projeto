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
        protected ArrayHelper $arrayHelper
    ) {}

    public function getAll()
    {
        $data['user_id'] = $this->authHelper->getId();

        return $this->repository->list($data);
    }

    public function organizeByCategories(array $request)
    {
        $openAi = OpenAi::getInstance();

        $request['user_id'] = $this->authHelper->getId();

        $transactions = $this->repository->list($request);

        if ($transactions->isEmpty()) {
            return [];
        }

        $messages = [
            $openAi->createMessage("system", "Salve esse dataset"),
            $openAi->createMessage("system", json_encode($transactions)),
            $openAi->createMessage("user", "Classifique por categorias as receitas e despesas informadas de uma forma mais abrangente, no final me retorne um json com o título da categoria e o somatório gasto. Separa por receitas e despesas."),
            $openAi->createMessage("user", "Retorne apenas um data JSON, sem formatação."),
            $openAi->createMessage("user", "Se não tiver nenhum valor na categoria não a retorne."),
            $openAi->createMessage("user", "{'name':'example'}"),
        ];

        $response = $openAi->make($messages);

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
