@extends('layouts.navlogin')

<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </symbol>
  <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
  </symbol>
  <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </symbol>
</svg>

@section('content')

<div id="errorLogin">
</div>

<div class="container ml-5" style="margin-left:10%;">
  <div class="card text-white bg-dark" style="max-width: 50rem;">
    <div class="bg-light" style="text-align: center;">
        <img src="{{ url('images/sin_fondo.png') }}" style="margin-top: -90px; margin-bottom: -90px;" width="400">
    </div>
    <br>
    <br>
    <h3 class="card-title text-center mt-3">Inicio de sesión</h3>
        <div class="card-body">
            <form class="row">
                <div class="row-sm">
                    <label for="inputUsername" class="form-label">Usuario</label>
                    <input type="text" class="form-control" id="inputUsername">
                </div>
                <div class="row-sm mt-2">
                    <label for="inputPassword" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="inputPassword">
                </div>
                <div class="col-auto mt-4">
                    <button id="loginButton" class="btn btn-primary mb-3">Entrar</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>

<!-- Javascript local -->
<script type="text/javascript" src="{{ url('js/login.js') }}"></script>

@endsection