<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

use App\Http\Controllers\Controller;

class BillController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function bill(Request $request)
    {
        // obtener productos
        $products = HTTP::get('http://appdemo1.solarc.pe/api/Productos/GetProductos');
        $productsArray = $products -> json();
        $selects = $request->count; // selects del producto

        // obtener marcas
        $selectMarca = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MARCA');
        $selectArrayMarca = $selectMarca -> json();

        // obtener modelos
        $selectModelo = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MODELO');
        $selectArrayModelo = $selectModelo -> json();

        // obtener clientes
        $selectClientes = HTTP::get('http://appdemo1.solarc.pe/api/Cliente/GetClientes');
        $selectArrayClientes = $selectClientes -> json();

        // valores de la lista del carrito
        // $all_products = $request->except('_token', 'resultadoTotal', 'count');
        // $count = $request->count; // contador de productos en lista
        // $id = $request->idTable1; // id del producto
        // $priceNew = $request->priceTable; // precio de venta del producto
        // $cuantity = $request->cuantityTable1; // cantidad del producto
        // $subtotal = $request->subtotalTable1; // subtotal del producto
        // $totalParts = $request->resultadoTotal; // total de los productos

        return view('facturas', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo', 'selectArrayClientes', 'selectArrayCarrito'));
    }

}
