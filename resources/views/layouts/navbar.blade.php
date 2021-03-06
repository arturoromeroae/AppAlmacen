<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Google icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <title>{{ config('app.name', 'Logo') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-lg bg-primary">
            <div class="container-fluid">
                <a id="logo-navbar" class="navbar-brand text-navbar hover-navbar" href="#">Logo</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>

                <div id="navbarSupportedContent">

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav right-0">
                            <li class="nav-item">
                                <a class="nav-link text-navbar hover-navbar text-align" aria-current="page" href="{{ url('/') }}"><i class="material-icons" style="font-size:25px;">home</i><br>Inicio</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link text-navbar hover-navbar text-align" href="{{ url('/repuestos') }}"><i class="material-icons" style="font-size:25px;">shopping_cart</i><br>Repuestos</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link text-navbar hover-navbar text-align" href="{{ url('/almacen') }}"><i class="material-icons" style="font-size:25px;">local_shipping</i><br>Almacen</a>
                            </li>
                            
                            <li class="nav-item">
                                <a class="nav-link text-navbar hover-navbar text-align" href="{{ url('/mantenimiento') }}"><i class="material-icons" style="font-size:25px;">settings</i><br>Mantenimiento</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link text-navbar hover-navbar text-align" href="{{ url('/ventas') }}"><i class="material-icons" style="font-size:25px;">attach_money</i><br>Ventas</a>
                            </li>

                            <li class="nav-item dropdown">

                                <a id="navbarDropdown" class="nav-link dropdown-toggle text-navbar hover-navbar text-align" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    <i class="material-icons" style="font-size:25px;">account_circle</i>
                                    <br>Usuario
                                </a>

                                <div class="dropdown-menu dropdown-menu-right dropdown" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="">Cerrar Sesion</a>
                                </div>
                            </li>
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-0">
            @yield('content')
        </main>
    </div>
</body>
</html>