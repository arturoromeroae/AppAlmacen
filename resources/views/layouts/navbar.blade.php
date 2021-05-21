<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-100">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Google icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <title>{{ config('app.name', 'Logo') }}</title>

    <!-- Scripts -->
    <script src="{{ url('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link href="{{ url('css/app.css') }}" rel="stylesheet">
	
    <!--<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">-->
	<link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/headers/">
	<link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/offcanvas-navbar/">
	<link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/sticky-footer-navbar/">
	<link href="{{ url('css/bootstrap.min.css') }}" rel="stylesheet">

	<link href="{{ url('css/offcanvas.css') }}" rel="stylesheet">
	<link href="{{ url('css/headers.css') }}" rel="stylesheet">

</head>
<body style="background-color: #f0f9ff;" class="d-flex flex-column h-100">
    <div id="app">
        <!--<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #f0f9ff;">
            <div class="container-fluid">-->
      <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark " aria-label="Main navigation">
        <div class="container-fluid">
                  <!--<a id="logo-navbar" class="navbar-brand text-navbar hover-navbar" href="#">Almacen</a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                  </button>-->

          <img src="{{ url('images/Motorcycle-09.png') }}" alt="logo" width="50" height="24">
          <button class="navbar-toggler p-0 border-0" type="button" data-bs-toggle="offcanvas" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div id="navbarSupportedContent" class="navbar-collapse offcanvas-collapse justify-content-end">

            <!-- Right Side Of Navbar -->
            <ul class="navbar-nav">

              @if(Request::path() === 'inicio')
              <li class="nav-item">
                <!--<a class="nav-link text-navbar hover-navbar text-align" aria-current="page" href="{{ url('/') }}"><i class="material-icons" style="font-size:25px;">home</i> Inicio</a>-->
                <a id="nav-menu" aria-current="page" href="{{ url('/inicio') }}" class="nav-link text-navbar hover-navbar bi active">
                  <i class="material-icons d-block mb-1" style="font-size:25px;">home</i> Inicio
                </a>
              </li>
              @else
              <li class="nav-item">
              <!--<a class="nav-link text-navbar hover-navbar text-align" aria-current="page" href="{{ url('/') }}"><i class="material-icons" style="font-size:25px;">home</i> Inicio</a>-->
                <a id="nav-menu" aria-current="page" href="{{ url('/inicio') }}" class="nav-link text-navbar hover-navbar bi">
                  <i class="material-icons d-block mb-1" style="font-size:25px;">home</i> Inicio
                </a>
              </li>
              @endif

              @if(Request::path() === 'repuestos' or Request::path() === 'repuestos/1' or Request::path() === 'repuestos/1/12')
              <li class="nav-item">
                <a class="nav-link text-navbar hover-navbar bi active" href="{{ url('/repuestos') }}">
                  <i class="material-icons d-block mb-1" style="font-size:25px;">shopping_cart</i> Repuestos
                </a>
              </li>
              @else
              <li class="nav-item">
                <a class="nav-link text-navbar hover-navbar bi" href="{{ url('/repuestos') }}">
                  <i class="material-icons d-block mb-1" style="font-size:25px;">shopping_cart</i> Repuestos
                </a>
              </li>
              @endif

              @if(Request::path() === 'almacen')
              <li class="nav-item">
                <a class="nav-link text-navbar hover-navbar bi active" href="{{ url('/almacen') }}">
                  <i class="material-icons d-block mb-1" style="font-size:25px;">local_shipping</i> Almacen
                </a>
              </li>
              @else
              <li class="nav-item">
                <a class="nav-link text-navbar hover-navbar bi" href="{{ url('/almacen') }}">
                  <i class="material-icons d-block mb-1" style="font-size:25px;">local_shipping</i> Almacen
                </a>
              </li>
              @endif

              @if(Request::path() === 'mantenimiento')
              <li class="nav-item">
                <a class="nav-link text-navbar hover-navbar bi active" href="{{ url('/mantenimiento') }}">
                  <i class="material-icons d-block mb-1" style="font-size:25px;">settings</i> Mantenimiento
                </a>
              </li>
              @else
              <li class="nav-item">
                <a class="nav-link text-navbar hover-navbar bi" href="{{ url('/mantenimiento') }}">
                  <i class="material-icons d-block mb-1" style="font-size:25px;">settings</i> Mantenimiento
                </a>
              </li>
              @endif

              @if(Request::path() === 'ventas')
              <li class="nav-item">
                <a class="nav-link text-navbar hover-navbar bi active" href="{{ url('/ventas') }}">
                  <i class="material-icons d-block mb-1" style="font-size:25px;">attach_money</i> Ventas
                </a>
              </li>
              @else
              <li class="nav-item">
                <a class="nav-link text-navbar hover-navbar bi" href="{{ url('/ventas') }}">
                  <i class="material-icons d-block mb-1" style="font-size:25px;">attach_money</i> Ventas
                </a>
              </li>
              @endif

              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle bi" href="#" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="material-icons d-block mb-1" style="font-size:25px;">account_circle</i>
                                Usuario
                </a>
            <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start" aria-labelledby="navbarDropdown">
                <li><a id="logoutNav" class="dropdown-item" href="/">Cerrar Sesion</a></li>
                </ul>
              </li>
        
            </ul>
          </div>
        </div>
      </nav>

        <main class="flex-shrink-0">
			<div class="container">
				<div class="bg-light p-5 rounded">
					@yield('content')
				</div>
			</div>
        </main>

    </div>

	<footer class="footer mt-auto py-3 bg-light">
	  <div class="container">
		<span class="text-muted">Motos.</span>
	  </div>
	</footer>

    <!-- Bootstrap -->
    <!--<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>-->

	<script type="text/javascript" src="{{ url('js/bootstrap.bundle.min.js') }}"></script>
	<script type="text/javascript" src="{{ url('js/offcanvas.js') }}"></script>
  <script type="text/javascript" src="{{ url('js/nav.js') }}"></script>
</body>
</html>