<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\RequestException;

use App\Http\Controllers\Controller;

class UsersController extends Controller
{
    public function users()
    {
        return view('usuarios');
    }
}