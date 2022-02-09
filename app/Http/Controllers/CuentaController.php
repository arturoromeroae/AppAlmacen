<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

use App\Http\Controllers\Controller;

class CuentaController extends Controller
{
    public function cuenta()
    {
        return view('cuenta');
    }
}