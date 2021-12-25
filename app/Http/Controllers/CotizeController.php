<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CotizeController extends Controller
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

        $cotizaciones = HTTP::get('http://appdemo1.solarc.pe/api/Cotiza/ConsultaCotiza?IdSede=1&Usuario=JGONZALES&TipoComprobante=4&FechaDesde=2021.12.01&FechaHasta=2021.12.23');
        $cotizacionesArray = $cotizaciones -> json();

        return view('cotizar', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo', 'cotizacionesArray'));
    }

    public function shopCotize($id, Request $request)
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
        

        // obtener carrito
        $selectCarrito = HTTP::get("http://appdemo1.solarc.pe/api/Carrito/GetCarrito?IdCarrito={}");
        $selectArrayCarrito = $selectCarrito -> json();
        $igv = 0.18;
        
        return view('facturas', compact('productsArray', 'selectArrayMarca', 'selectArrayModelo', 'selectArrayCarrito', 'idResponse', 'igv'));
    }
}