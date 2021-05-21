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
    <div id="login">
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

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>

    <!-- Bootstrap -->
    <!--<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>-->
	<script type="text/javascript" src="{{ url('js/bootstrap.bundle.min.js') }}"></script>
	<script type="text/javascript" src="{{ url('js/offcanvas.js') }}"></script>
</body>
</html>