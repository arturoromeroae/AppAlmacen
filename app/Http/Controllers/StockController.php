<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

use App\Http\Controllers\Controller;



class StockController extends Controller
{
    
    public function stock(Request $request)
    {
        if (($request->priceModal) == NULL && ($request->stockModal) == NULL) {
            $priceBase = 0;
            $stock = 0;
        } elseif (($request->priceModal) == NULL && ($request->stockModal) != NULL){
            $priceBase = 0;
            $stock = $request->stockModal;
        } elseif (($request->priceModal) != NULL && ($request->stockModal) == NULL){
            $priceBase = $request->priceModal;
            $stock = 0;
        } else {
            $priceBase = $request->priceModal;
            $stock = $request->stockModal;
        }

        $priceModal = $priceBase;

        $products = HTTP::get('http://appdemo1.solarc.pe/api/Productos/GetProductos');
        $productsArray = $products -> json();

        $selectMarca = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MARCA');
        $selectArrayMarca = $selectMarca -> json();

        $selectModelo = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MODELO');
        $selectArrayModelo = $selectModelo -> json();

        return view('almacen', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo', 'priceModal'));
    }

    public function put_stock($id, Request $request){

        if (($request->priceModal) == NULL && ($request->stockModal) == NULL) {
            $priceBase = 0;
            $stock = 0;
        } elseif (($request->priceModal) == NULL && ($request->stockModal) != NULL){
            $priceBase = 0;
            $stock = $request->stockModal;
        } elseif (($request->priceModal) != NULL && ($request->stockModal) == NULL){
            $priceBase = $request->priceModal;
            $stock = 0;
        } else {
            $priceBase = $request->priceModal;
            $stock = $request->stockModal;
        }

        // asignacion de variables
        $codeModal = $request->codeModal; // codigo del producto
        $cuantityModal = $stock; // cantidad del producto
        $idModal = $request->idModal; // cantidad del producto
        $priceModal = $priceBase; // cantidad del producto
        $idUser = "test"; // id del usuario

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

        $pri = [
            'idProducto' => $idModal,
            'codProd' => $codeModal,
            'porcentaje' => $priceModal,
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
        $r_price = Http::post('http://appdemo1.solarc.pe/api/Productos/ActualizaPrecioBase', $pri);

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
