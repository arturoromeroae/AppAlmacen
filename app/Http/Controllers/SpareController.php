<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SpareController extends Controller
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
    public function index()
    {
        // obtener productos
        $products = HTTP::get('http://appdemo1.solarc.pe/api/Productos/GetProductos');
        $productsArray = $products -> json();

        // obtener marcas
        $selectMarca = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MARCA');
        $selectArrayMarca = $selectMarca -> json();
 
        // obtener modelos
        $selectModelo = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MODELO');
        $selectArrayModelo = $selectModelo -> json();

        return view('repuestos', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo'));
    }

    public function shop($id, Request $request)
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

        // valores de la lista del carrito

        $all_products = $request->except('_token', 'resultadoTotal', 'count');
        $count = $request->count; // contador de productos en lista
        $id = $request->idTable1; // id del producto
        $priceNew = $request->priceTable; // precio de venta del producto
        $cuantity = $request->cuantityTable1; // cantidad del producto
        $subtotal = $request->subtotalTable1; // subtotal del producto
        $totalParts = $request->resultadoTotal; // total de los productos

        for ($i = 1; $i <= $count ; $i++) {
            $article = [
            "idProducto" => $all_products["idTable{$i}"],
            "nuevoPrecioVenta" => $all_products["priceTable{$i}"],
            "cantidad" => $all_products["cuantityTable{$i}"],
            "subTotal" => $all_products["subtotalTable{$i}"]
            ];

            $pro = [
                "usuario" => "test",
                "idOrigen" => 1,
                "total" => floatval($totalParts),
                "carritoDet" => [$article]
            ];
        }

        // enviar productos del carrito
        $shopCar = Http::post('http://appdemo1.solarc.pe/api/Carrito/InsertaCarrito', $pro);

        return view('repuestos', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo'));
    }
}
