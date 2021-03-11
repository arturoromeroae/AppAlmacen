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

        // valores de la lista del carrito
            
        $id = $request->idTable-1; // id del producto
        $priceNew = $request->priceTable-1; // precio de venta del producto
        $cuantity = $request->cuantityTable-1; // cantidad del producto
        $subtotal = $request->subtotalTable-1; // subtotal del producto
        $totalParts = $request->resultadoTotal; // total de los productos

            $article = [
                "idProducto" => $id,
                "nuevoPrecioVenta" => floatval($priceNew),
                "cantidad" => (int)$cuantity,
                "subTotal" => floatval($subtotal)
            ];
        echo( $priceNew );

        $pro = [
            "usuario" => "test",
            "idOrigen" => 1,
            "total" => (int)$totalParts,
            "carritoDet" => [$article]
        ];

        // obtener marcas
        $selectMarca = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MARCA');
        $selectArrayMarca = $selectMarca -> json();
 
        // obtener modelos
        $selectModelo = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MODELO');
        $selectArrayModelo = $selectModelo -> json();

        // enviar productos del carrito
        $shopCar = Http::post('http://appdemo1.solarc.pe/api/Carrito/InsertaCarrito', $pro);
        echo($shopCar -> getStatusCode());

        return view('repuestos', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo'));
    }
}
