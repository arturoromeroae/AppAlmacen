<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/almacen', [App\Http\Controllers\StockController::class, 'stock'])->name('almacen');

Route::any('/almacen/{id}', [App\Http\Controllers\StockController::class, 'put_stock'])->name('stock.edit');

Route::get('/mantenimiento', [App\Http\Controllers\MaintanceController::class, 'index'])->name('mantenimiento');

Route::post('/mantenimiento', [App\Http\Controllers\MaintanceController::class, 'sender'])->name('mantenimiento.add');

Route::any('/mantenimiento/{id}', [App\Http\Controllers\MaintanceController::class, 'put_product'])->name('mantenimiento.edit');

Route::get('/ventas', [App\Http\Controllers\SalesController::class, 'index'])->name('ventas');

Route::get('/repuestos', [App\Http\Controllers\SpareController::class, 'index'])->name('repuestos');
