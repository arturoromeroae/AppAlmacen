@extends('layouts.navbar')

@section('content')

<section class="container">
    <br />
	<br />
    <!-- titulo -->
    <h1 class="h3 text-center mt-3">Agregar Usuarios</h1>
    <div class="text-center">
        <i class="material-icons" style="font-size:80px">account_circle</i>
    </div>
    <div class="row mt-5">
        <div class="col">
            <input type="text" class="form-control" placeholder="Username" aria-label="Username">
        </div>
        <div class="col">
            <input type="password" class="form-control" placeholder="Contraseña" aria-label="Contraseña">
        </div>
        <div class="col">
            <input type="password" class="form-control" placeholder="Repetir Contraseña" aria-label="Repetir Contraseña">
        </div>
    </div>
    <div class="col-12 mt-5">
        <button type="submit" class="btn btn-primary">Registrar</button>
    </div>
</section>


<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>

<!-- script local -->
<script type="text/javascript" src="{{ url('js/welcome.js') }}"></script>

@endsection