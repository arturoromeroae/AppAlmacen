@extends('layouts.navbar')

@section('content')

<section class="container">
	<br />
	<br />
    <div class="row align-items-center">
        <div class="col">
            <h1 id="title" class="h1 text-center">¡Bienvenido!</h1>
            <div style="text-align: center;">
                <img src="{{ url('images/sin_fondo.png') }}" alt="" srcset="">
            </div>
            <h1 id="title" class="h1 text-center">Importaciones NOARG</h1>
        </div>
    </div>
</section>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>

<!-- script local -->
<script type="text/javascript" src="{{ url('js/welcome.js') }}"></script>

@endsection
