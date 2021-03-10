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
        for ($i = 1; $i <= $selects; $i++) {
            
            $id = $request->idTable-$i; // id del producto
            $priceNew = $request->priceTable-$i; // precio de venta del producto
            $cuantity = $request->cuantityTable-$i; // cantidad del producto
            $subtotal = $request->subtotalTable-$i; // subtotal del producto
        }
            $totalParts = $request->resultadoTotal; // total de los productos

            $article = [
                "idProducto" => $id,
                "nuevoPrecioVenta" => floatval($priceNew),
                "cantidad" => (int)$cuantity,
                "subTotal" => floatval($subtotal)
            ];

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
