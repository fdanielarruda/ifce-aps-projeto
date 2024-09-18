<?php

namespace App\Libraries;

use Exception;
use Illuminate\Support\Facades\Http;

class OpenAi
{
    public function make($messages)
    {
        $url = env('OPENAI_API_URL');
        $token = env('OPENAI_API_KEY');
        $model = env('OPENAI_API_MODEL');

        $data = [
            "model" => $model,
            "messages" => $messages,
            "temperature" => 0.2
        ];

        $response = Http::withHeaders(['Authorization' => "Bearer $token"])->post($url, $data);

        if ($response->failed()) {
            throw new Exception('Erro ao executar a requisição');
        }

        return $response->json();
    }

    public function createSystemMessage($content)
    {
        return [
            "role" => "system",
            "content" => $content
        ];
    }

    public function createUserMessage($content)
    {
        return [
            "role" => "user",
            "content" => $content
        ];
    }
}
