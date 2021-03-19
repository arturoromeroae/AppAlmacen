<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StockController;
use App\Http\Controllers\MaintanceController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\SpareController;
use App\Http\Controllers\BillController;

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

Route::get('/almacen', [StockController::class, 'stock'])->name('almacen');

Route::any('/almacen/{id}', [StockController::class, 'put_stock'])->name('stock.edit');

Route::get('/mantenimiento', [MaintanceController::class, 'index'])->name('mantenimiento');

Route::post('/mantenimiento', [MaintanceController::class, 'sender'])->name('mantenimiento.add');

Route::any('/mantenimiento/{id}', [MaintanceController::class, 'put_product'])->name('mantenimiento.edit');

Route::get('/ventas', [SalesController::class, 'index'])->name('ventas');

Route::any('/facturas', [BillController::class, 'bill'])->name('facturas');

Route::get('/repuestos', [SpareController::class, 'index'])->name('repuestos');

Route::any('/repuestos/{id}', [SpareController::class, 'shop'])->name('repuestos.post');
