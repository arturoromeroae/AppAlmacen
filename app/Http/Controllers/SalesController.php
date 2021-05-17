<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SalesController extends Controller
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
        $comprobantes = HTTP::get('http://appdemo1.solarc.pe/api/Venta/ConsultaVenta?IdSede=1&Usuario=string&TipoComprobante=1&FechaDesde=2021.05.14&FechaHasta=2021.05.14');
        $comprobantesArray = $comprobantes -> json();

        return view('ventas', compact('comprobantesArray'));
    }
}
