<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Transaction::insert(
            [
                [
                    'user_id' => 1,
                    'title' => 'Feira da semana',
                    'amount' => -200.00,
                    'created_at' => '2024-01-01 08:30:00',
                    'updated_at' => '2024-01-01 08:30:00',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Guarda-chuva',
                    'amount' => -30.00,
                    'created_at' => '2024-01-01 14:45:23',
                    'updated_at' => '2024-01-01 14:45:23',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Tênis esportivo',
                    'amount' => -350.00,
                    'created_at' => '2024-01-01 20:10:45',
                    'updated_at' => '2024-01-01 20:10:45',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Corte de cabelo',
                    'amount' => -50.00,
                    'created_at' => '2024-01-02 04:25:17',
                    'updated_at' => '2024-01-02 04:25:17',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Almoço em restaurante',
                    'amount' => -60.00,
                    'created_at' => '2024-01-02 11:35:12',
                    'updated_at' => '2024-01-02 11:35:12',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Plano de academia mensal',
                    'amount' => -120.00,
                    'created_at' => '2024-01-02 17:50:05',
                    'updated_at' => '2024-01-02 17:50:05',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Abastecimento de combustível',
                    'amount' => -250.00,
                    'created_at' => '2024-01-03 00:15:30',
                    'updated_at' => '2024-01-03 00:15:30',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Livro',
                    'amount' => -45.00,
                    'created_at' => '2024-01-03 08:20:25',
                    'updated_at' => '2024-01-03 08:20:25',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Assinatura de serviço de streaming',
                    'amount' => -30.00,
                    'created_at' => '2024-01-03 14:05:45',
                    'updated_at' => '2024-01-03 14:05:45',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Medicamentos',
                    'amount' => -80.00,
                    'created_at' => '2024-01-03 20:30:55',
                    'updated_at' => '2024-01-03 20:30:55',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Camiseta básica',
                    'amount' => -40.00,
                    'created_at' => '2024-01-04 05:10:15',
                    'updated_at' => '2024-01-04 05:10:15',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Passagem de ônibus',
                    'amount' => -5.00,
                    'created_at' => '2024-01-04 11:25:20',
                    'updated_at' => '2024-01-04 11:25:20',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Pizza para entrega',
                    'amount' => -70.00,
                    'created_at' => '2024-01-04 17:35:40',
                    'updated_at' => '2024-01-04 17:35:40',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Fatura do cartão de crédito',
                    'amount' => -1000.00,
                    'created_at' => '2024-01-05 00:45:50',
                    'updated_at' => '2024-01-05 00:45:50',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Compra de fraldas',
                    'amount' => -90.00,
                    'created_at' => '2024-01-05 08:20:30',
                    'updated_at' => '2024-01-05 08:20:30',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Mochila escolar',
                    'amount' => -150.00,
                    'created_at' => '2024-01-05 14:30:00',
                    'updated_at' => '2024-01-05 14:30:00',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Café da manhã na padaria',
                    'amount' => -25.00,
                    'created_at' => '2024-01-05 20:45:12',
                    'updated_at' => '2024-01-05 20:45:12',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Consulta médica',
                    'amount' => -200.00,
                    'created_at' => '2024-01-06 02:05:30',
                    'updated_at' => '2024-01-06 02:05:30',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Ingresso de cinema',
                    'amount' => -35.00,
                    'created_at' => '2024-01-06 08:15:20',
                    'updated_at' => '2024-01-06 08:15:20',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Fones de ouvido',
                    'amount' => -100.00,
                    'created_at' => '2024-01-06 14:40:45',
                    'updated_at' => '2024-01-06 14:40:45',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Salário',
                    'amount' => 3000.00,
                    'created_at' => '2024-01-06 21:00:00',
                    'updated_at' => '2024-01-06 21:00:00',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Freela de desenvolvimento',
                    'amount' => 1200.00,
                    'created_at' => '2024-01-07 03:10:00',
                    'updated_at' => '2024-01-07 03:10:00',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Camisa de inverno',
                    'amount' => -120.00,
                    'created_at' => '2024-01-07 09:30:20',
                    'updated_at' => '2024-01-07 09:30:20',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Garrafa térmica',
                    'amount' => -45.00,
                    'created_at' => '2024-01-07 15:45:35',
                    'updated_at' => '2024-01-07 15:45:35',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Bolsa de viagem',
                    'amount' => -250.00,
                    'created_at' => '2024-01-07 21:10:50',
                    'updated_at' => '2024-01-07 21:10:50',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Assinatura de revista',
                    'amount' => -20.00,
                    'created_at' => '2024-01-08 04:25:10',
                    'updated_at' => '2024-01-08 04:25:10',
                ],
                [
                    'user_id' => 1,
                    'title' => 'Lâmpada LED',
                    'amount' => -15.00,
                    'created_at' => '2024-01-08 10:30:20',
                    'updated_at' => '2024-01-08 10:30:20',
                ]
            ]
        );
    }
}
