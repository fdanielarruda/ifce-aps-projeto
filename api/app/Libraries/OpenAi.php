<?php

namespace App\Libraries;

use Exception;
use Illuminate\Support\Facades\Http;

class OpenAi
{
    private static $instance = null;

    private function __construct() {}

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

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
}