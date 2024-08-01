<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\TransactionController;

Route::group(['middleware' => 'api'], function () {
    Route::group(['prefix' => 'auth'], function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
        Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api');
        Route::get('/me', [AuthController::class, 'me'])->middleware('auth:api');
    });

    Route::group(['middleware' => 'auth:api'], function () {
        Route::group(['prefix' => 'goals'], function () {
            Route::get('/', [GoalController::class, 'list']);
            Route::post('/', [GoalController::class, 'create']);
            Route::put('/{goal}', [GoalController::class, 'update']);
            Route::patch('/{goal}/completed_at', [GoalController::class, 'updateCompletedAt']);
            Route::delete('/{goal}', [GoalController::class, 'delete']);
        });

        Route::group(['prefix' => 'transactions'], function () {
            Route::get('/', [TransactionController::class, 'list']);
            Route::post('/', [TransactionController::class, 'create']);
            Route::put('/{transaction}', [TransactionController::class, 'update']);
            Route::delete('/{transaction}', [TransactionController::class, 'delete']);
        });
    });
});
