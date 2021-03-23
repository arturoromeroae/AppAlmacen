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

        // obtener carrito
        $selectCarrito = HTTP::get('http://appdemo1.solarc.pe/api/Carrito/GetCarrito');
        $selectArrayCarrito = $selectCarrito -> json();

        return view('repuestos', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo', 'selectArrayCarrito'));
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
        $pr = [];

        for ($i = 1; $i <= $count ; $i++) {
            $article = [
            "idProducto" => $all_products["idTable{$i}"],
            "nuevoPrecioVenta" => $all_products["priceTable{$i}"],
            "cantidad" => $all_products["cuantityTable{$i}"],
            "subTotal" => $all_products["subtotalTable{$i}"]
            ];
            array_push($pr, $article);
        }

        $pro = [
            "usuario" => "test",
            "idOrigen" => 1,
            "total" => floatval($totalParts),
            "carritoDet" => $pr
        ];

        // enviar productos del carrito
        $shopCar = Http::post('http://appdemo1.solarc.pe/api/Carrito/InsertaCarrito', $pro);
        $response = $shopCar->json();
        $idResponse = $response['data'];

        // obtener carrito
        $selectCarrito = HTTP::get("http://appdemo1.solarc.pe/api/Carrito/GetCarrito?IdCarrito={$idResponse}");
        $selectArrayCarrito = $selectCarrito -> json();
        $igv = 0.18;
        
        return view('facturas', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo', 'selectArrayCarrito', 'idResponse', 'igv'));
    }

    public function send($product, Request $request)
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
        $pr = [];

        for ($i = 1; $i <= $count ; $i++) {
            $article = [
            "idProducto" => $all_products["idTable{$i}"],
            "nuevoPrecioVenta" => $all_products["priceTable{$i}"],
            "cantidad" => $all_products["cuantityTable{$i}"],
            "subTotal" => $all_products["subtotalTable{$i}"]
            ];
            array_push($pr, $article);
        }

        $pro = [
            "usuario" => "test",
            "idOrigen" => 1,
            "total" => floatval($totalParts),
            "carritoDet" => $pr
        ];

        // enviar productos del carrito
        $shopCar = Http::post('http://appdemo1.solarc.pe/api/Carrito/InsertaCarrito', $pro);
        $response = $shopCar->json();
        $idResponse = $response['data'];

        // obtener carrito
        $selectCarrito = HTTP::get("http://appdemo1.solarc.pe/api/Carrito/GetCarrito?IdCarrito={$idResponse}");
        $selectArrayCarrito = $selectCarrito -> json();
        $igv = 0.18;

        $all_products_bill = $request->except('_token');
        $count = $request->count; // contador de productos en lista
        date_default_timezone_set("America/Lima");
        $fecha = date("Y/m/d H:i:s");
        $blpr = [];

        if (($all_products_bill['discountBill']) == 'no') {
            $discountValuePor = 0;
            $discountValue = 0;
        }elseif (($all_products_bill['discountBill']) == 'sol') {
            $discountValuePor = 0;
            $discountValue = $all_products_bill['value-discount-bill'];
        }elseif (($all_products_bill['discountBill']) == 'por') {
            $discountValuePor = $all_products_bill['value-discount-bill'];
            $discountValue = 0;
        }

        for ($i = 1; $i <= $count ; $i++) {
            $ar = [
                "idVentaCab" => $all_products_bill['idBill'],
                "idProducto" => $all_products_bill["idTable{$i}"],
                "cantidad" => $all_products_bill["cuantityTable{$i}"],
                "precioVenta" => $all_products_bill["priceTable{$i}"],
                "valorVenta" => 1300,
                "subTotal" => $all_products_bill["subtotalTable{$i}"],
                "total" => $all_products_bill["totalTable{$i}"],
                "idOrigen" => 1
            ];
            array_push($blpr, $ar);
        }

        $billProducts = [
            "fecha" => "$fecha",
            "idCliente" => $all_products_bill['clientBill'],
            "tipoVenta" => $all_products_bill['selectBill'],
            "subTotal" => $all_products_bill['subtotalBill'],
            "igv" => $all_products_bill['igvBill'],
            "total" => $all_products_bill['totalBill'],
            "vuelto" => $all_products_bill['backBill'],
            "porcDscto" => $discountValuePor,
            "valorDscto" => $discountValue,
            "valorVenta" => 0,
            "idSede" => 1,
            "idPedCab" => $all_products_bill['idBill'],
            "usuario" => "string",
            "rucCliente" => $all_products_bill['rucBill'],
            "razonSocial" => $all_products_bill['razonBill'],
            "idOrigen" => 1,
            "ventaDet" => $blpr
        ];

        // enviar factura
        $shopBill = Http::post('http://appdemo1.solarc.pe/api/Venta/InsertaVenta', $billProducts);
        $responseBill = $shopBill->json();
        
        return view('repuestos', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo', 'selectArrayCarrito', 'idResponse', 'igv'));
    }
}
