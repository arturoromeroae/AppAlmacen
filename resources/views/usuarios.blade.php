@extends('layouts.navbar')

@section('content')
<div class="alert-user"></div>
<section class="container">
    <br />
	<br />
    <!-- titulo -->
    <h1 class="h3 text-center mt-3">Agregar Usuarios</h1>
    <div class="text-center">
        <i class="material-icons" style="font-size:80px">account_circle</i>
    </div>
    <form id="register_users">
        <div class="row mt-5">
            <div class="col">
                <input id="name" type="text" class="form-control" placeholder="Nombre y Apellido" aria-label="Nombre y Apellido" required>
            </div>
            <div class="col">
                <input id="username" type="text" class="form-control" placeholder="Usuario" aria-label="Usuario" required>
            </div>
            <div class="col">
                <input id="pass" type="password" class="form-control" placeholder="Contraseña" aria-label="Contraseña" required>
            </div>
            <div class="col">
                <input id="repass" type="password" class="form-control" placeholder="Repetir Contraseña" aria-label="Repetir Contraseña" required>
            </div>
        </div>
        <div class="col-12 mt-5">
            <button type="submit" class="button-register btn btn-primary">Registrar</button>
        </div>
    </form>
</section>


<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>

<!-- script local -->
<script type="text/javascript" src="{{ url('js/users.js') }}"></script>

@endsection