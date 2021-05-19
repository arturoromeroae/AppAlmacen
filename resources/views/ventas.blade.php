@extends('layouts.navbar')
<!-- estilos bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

<!-- estilos DataTable -->
<link rel="stylesheet" href="{{ url('DataTables/DataTables-1.10.24/css/dataTables.bootstrap.css') }}">
<link rel="stylesheet" href="{{ url('DataTables/DataTables-1.10.24/css/dataTables.bootstrap4.min.css') }}">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

@section('content')
    <br />
    <br />
    <!-- titulo -->
    <h1 class="h2 text-center mb-4 mt-3">Ventas</h1>
    <div id="hidden-inputs"></div>

    <!-- Inicio tabla de ventas -->
    <div class="row mb-5">
        <div class="col-md-2">
            <label for="inputEmail4" class="form-label">Fecha Inicial:</label>
            <input type="text" class="form-control" id="datestart">
        </div>
        <div class="col-md-2">
            <label for="inputEmail4" class="form-label">Fecha Final:</label>
            <input type="text" class="form-control" id="dateend">
        </div>
        <div class="col-md-3">
            <label for="inputState" class="form-label">Usuario:</label>
            <select id="users" class="form-select" aria-label="Default select example">
                <option selected>Seleccione un usuario</option>
            </select>
        </div>
        <div class="col-md-3">
            <label for="iTypeBill" class="form-label">Tipo de Comprobante:</label>
            <select id="typeBill" class="form-select" aria-label="Default select example">
                <option value="0" selected>Seleccione un Comprobante</option>
                <option value="1">Nota de Venta</option>
                <option value="2">Boleta de Venta</option>
                <option value="3">Factura</option>
            </select>
        </div>
        <div class="col-1">
            <br>
            <button id="search" class="btn btn-dark mt-2">Filtrar</button>
        </div>
    </div>
    <div class="container-float">
        <table
            class="table table-hover table-condensed table-striped table-bordered dt-responsive nowrap" 
            id="table-sells" 
            data-search-highlight="true">
            <thead class="bg-dark" style="color:white;" >
                <tr>
                    <th scope="col">Número</th>
                    <th scope="col">Comprobante</th>
                    <th scope="col">Razón Social</th>
                    <th data-align="right" scope="col">Total</th>
                    <th data-align="right" scope="col">Estado</th>
                    <th data-align="center" scope="col">Usuario</th>
                </tr>
            </thead>
                
            <tbody>
                
            </tbody>
        </table>
    </div>
    <!-- Final tabla de ventas -->

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
    
    <!-- DataTable -->
    <script src="{{ url('DataTables/DataTables-1.10.24/js/jquery.dataTables.js') }}"></script>
    <script src="{{ url('DataTables/DataTables-1.10.24/js/dataTables.bootstrap4.min.js') }}"></script>
    
    <!-- Javascript local -->
    <script type="text/javascript" src="{{ url('js/sells.js') }}"></script>
    
    <!-- jQuery UI-->
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

@endsection
