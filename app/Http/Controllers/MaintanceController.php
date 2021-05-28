<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\UploadedFile;

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
        
        $this->validate($request, [
            'image_product' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $photo = $request->file('image_product'); // imagen del producto
        $new_name = rand() . '.' . $photo->getClientOriginalExtension(); // nombre de las imagenes
        $photo->move(public_path("images"), $new_name);
        $route_img = public_path("images"); // ruta de imagenes

        if( $model == 0 && $brand == 0 ){
            $modelProduct = 1;
            $brandProduct = 1;
        }elseif($model == 0 && $brand != 0){
            $modelProduct = 1;
            $brandProduct = $brand;
        }elseif($model != 0 && $brand == 0){
            $modelProduct = $model;
            $brandProduct = 1;
        }else{
            $modelProduct = $model;
            $brandProduct = $brand;
        }

        // array del formulario de mantenimiento
        $product = [
            'codProd' => $code,
            'nombreProducto' => $name,
            'descripcion' => $description,
            'idMarca' => (int)$brandProduct,
            'idModelo' => (int)$modelProduct,
            'idUnidadMedida' => 1,
            'idTienda' => 1,
            'precioBase' => (float)$price,
            'imagen' => $new_name,
            'rutaImagen' => $route_img,
            'idProducto' => 0,
            'cantidad' => (int)$cuantity,
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

        if(($res -> getStatusCode()) == 200 ){
            $result_maintance = 
            '
            <div class="alert alert-success alert-dismissible fade show alert-form mt-5" role="alert">
                Se <strong>agregó</strong> el producto <strong>correctamente!</strong>.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            ';
            $products = HTTP::get('http://appdemo1.solarc.pe/api/Productos/GetProductos');
            $productsArray = $products -> json();
            print_r($product);
        }else{
            $result_maintance = 
            '
            <div class="alert alert-danger alert-dismissible fade show alert-form mt-5" role="alert">
                <strong>Se produjo un error</strong>.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            ';
            echo $res->getBody();
            print_r($product);
        };
        return view('mantenimiento', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo', 'result_maintance'));

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
            'idMarca' => (int)$brandModal,
            'idModelo' => (int)$modelModal,
            'idUnidadMedida' => 1,
            'idTienda' => 1,
            'precioBase' => (float)$priceModal,
            'imagen' => 'string',
            'rutaImagen' => 'string',
            'idProducto' => $idModal,
            'cantidad' => (int)$cuantityModal
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
            $result_maintance = 
            '
            <div class="alert alert-success alert-dismissible fade show alert-form mt-5" role="alert">
                <strong>Se modificó</strong> el producto.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            ';
            // obtener productos
            $products = HTTP::get('http://appdemo1.solarc.pe/api/Productos/GetProductos');
            $productsArray = $products -> json();
            
        }else{
            $result_maintance = 
            '
            <div class="alert alert-danger alert-dismissible fade show alert-form mt-5" role="alert">
                <strong>Error</strong> al modificar el producto.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            ';
        }

        return view('mantenimiento', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo', 'result_maintance'));
    }
}
