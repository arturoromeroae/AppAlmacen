<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

use App\Http\Controllers\Controller;



class StockController extends Controller
{
    
    public function stock()
    {
        $products = HTTP::get('http://appdemo1.solarc.pe/api/Productos/GetProductos');
        $productsArray = $products -> json();

        $selectMarca = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MARCA');
        $selectArrayMarca = $selectMarca -> json();

        $selectModelo = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MODELO');
        $selectArrayModelo = $selectModelo -> json();

        return view('almacen', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo'));
    }

    public function put_stock($id, Request $request){

        // asignacion de variables
        $codeModal = $request->codeModal; // codigo del producto
        $cuantityModal = $request->stockModal; // cantidad del producto
        $idModal = $request->idModal; // cantidad del producto
        $idUser = Auth::id();

        // obtener productos
        $products = HTTP::get('http://appdemo1.solarc.pe/api/Productos/GetProductos');
        $productsArray = $products -> json();

        // envio de datos
        $pro = [
            'idProducto' => $idModal,
            'codProd' => $codeModal,
            'cantidad' => $cuantityModal,
            'idOrigen' => 0,
            'usuario' => $idUser
        ];

        // obtener marcas
        $selectMarca = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MARCA');
        $selectArrayMarca = $selectMarca -> json();
 
        // obtener modelos
        $selectModelo = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MODELO');
        $selectArrayModelo = $selectModelo -> json();

        // metodo para envio de datos
        $r = Http::post('http://appdemo1.solarc.pe/api/Productos/ActualizaStock', $pro);

        if( ($r -> getStatusCode()) == 200 ){
            $result = '<strong>Se modificó</strong> el producto.';
            // obtener productos
            $products = HTTP::get('http://appdemo1.solarc.pe/api/Productos/GetProductos');
            $productsArray = $products -> json();
        }else{
            $result = '<strong>Error</strong> al modificar el producto.';
        }

        return view('almacen', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo', 'result'));
    }
}
