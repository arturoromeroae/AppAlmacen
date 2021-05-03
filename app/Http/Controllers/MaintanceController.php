<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

use App\Http\Controllers\Controller;

class MaintanceController extends Controller
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
        $products = HTTP::get('http://appdemo1.solarc.pe/api/Productos/GetProductos');
        $productsArray = $products -> json();

        $selectMarca = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MARCA');
        $selectArrayMarca = $selectMarca -> json();

        $selectModelo = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MODELO');
        $selectArrayModelo = $selectModelo -> json();

        return view('mantenimiento', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo'));
    }

    public function sender(Request $request){
        // valores de los inputs del formulario de mantenimiento
        $code = $request->code; // codigo del producto
        $name = $request->name; // nombre del producto
        $price = $request->price; // precio base del producto
        $brand = $request->select_marca; // marca del producto
        $model = $request->select_modelo; // modelo del producto
        $description = $request->description; // descrpcion del producto
        $cuantity = $request->cuantity; // cantidad del producto
        $photo = $request->image_product; // imagen del producto

        // array del formulario de mantenimiento
        $product = [
            'codProd' => $code,
            'nombreProducto' => $name,
            'descripcion' => $description,
            'idMarca' => $brand,
            'idModelo' => $model,
            'idUnidadMedida' => 1,
            'idTienda' => 1,
            'precioBase' => $price,
            'imagen' => $photo,
            'rutaImagen' => 'string',
            'idProducto' => 0,
            'stock' => $cuantity,
        ];
        // obtener productos
        $products = HTTP::get('http://appdemo1.solarc.pe/api/Productos/GetProductos');
        $productsArray = $products -> json();

        // obtener marcas
        $selectMarca = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MARCA');
        $selectArrayMarca = $selectMarca -> json();

        // obtener modelos
        $selectModelo = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MODELO');
        $selectArrayModelo = $selectModelo -> json();

        // enviar form mantenimiento
        $res = Http::post('http://appdemo1.solarc.pe/api/Productos/Productos', $product);

        if(($res -> successful()) == true){
            $result_maintance = 'Se agregaron los <strong>productos correctamente!</strong>';
            $products = HTTP::get('http://appdemo1.solarc.pe/api/Productos/GetProductos');
            $productsArray = $products -> json();
        }else{
            $result_maintance = '<strong>Se produjo un error</strong>';
        };
        header("Refresh:0");
        return view('mantenimiento', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo'));

    //    $code_product = $request -> code_product;
    //    $name_product = $request -> name_product;
    //    $price_base_product = $request -> price_base_product;
    //    $cuantity_product = $request -> cuantity_product;
    //    $image_product = $request -> image_product;
    //    $description_product = $request -> description_product;
    }

    public function put_product($id, Request $request){

        $codeModal = $request->codeModal; // codigo del producto
        $nameModal = $request->nameModal; // nombre del producto
        $priceModal = $request->priceModal; // precio base del producto
        $brandModal = $request->selectModalMarca; // marca del producto
        $modelModal = $request->selectModalModelo; // modelo del producto
        $descriptionModal = $request->descriptionModal; // descrpcion del producto
        $cuantityModal = $request->stockModal; // cantidad del producto
        $photoModal = $request->image_product; // imagen del producto
        $idModal = $request->idModal; // cantidad del producto

        $products = HTTP::get('http://appdemo1.solarc.pe/api/Productos/GetProductos');
        $productsArray = $products -> json();
        $pro = [
            'codProd' => $codeModal ,
            'nombreProducto' => $nameModal,
            'descripcion' => $descriptionModal,
            'precioBase' => $priceModal,
            'idMarca' => (int)$brandModal,
            'idModelo' => (int)$modelModal,
            'idUnidadMedida' => 1,
            'idTienda' => 1,
            'imagen' => $photoModal,
            'rutaImagen' => "string",
            'idProducto' => $idModal,
        ];

        $bran = [
            'valor' => $codeModal,
            'nombreProducto' => $nameModal,
            'descripcion' => $descriptionModal,
            'precioBase' => (int)$priceModal,
        ];

        // obtener marcas
        $selectMarca = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MARCA');
        $selectArrayMarca = $selectMarca -> json();

        // obtener modelos
        $selectModelo = HTTP::get('http://appdemo1.solarc.pe/api/Maestro/GetParametros?tabla=MODELO');
        $selectArrayModelo = $selectModelo -> json();

        $r = Http::post('http://appdemo1.solarc.pe/api/Productos/ActualizarProducto', $pro);

        if( ($r -> getStatusCode()) == 200 ){
            $result_maintance = '<strong>Se modificó</strong> el producto.';
            // obtener productos
            $products = HTTP::get('http://appdemo1.solarc.pe/api/Productos/GetProductos');
            $productsArray = $products -> json();
        }else{
            $result_maintance = '<strong>Error</strong> al modificar el producto.';
        }

        return view('mantenimiento', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo', 'result_maintance'));
    }
}
