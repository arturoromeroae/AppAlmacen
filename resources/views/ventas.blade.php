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
                <option value="4">Cotizaciones</option>
            </select>
        </div>
        <div class="col-1">
            <br>
            <button id="search" class="btn btn-dark mt-2 d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel-fill mt-1 mx-1" viewBox="0 0 16 16">
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
                </svg>
                Filtrar
            </button>
        </div>
    </div>
    <div class="container-float">
        <table
            class="table table-hover table-condensed table-striped table-bordered dt-responsive nowrap" 
            id="table-sells" 
            data-search-highlight="true">
            <thead class="bg-dark" style="color:white;" >
                <tr>
                    <th scope="col">N??mero</th>
                    <th scope="col">Comprobante</th>
                    <th scope="col">Raz??n Social</th>
                    <th data-align="right" scope="col">Total</th>
                    <th data-align="right" scope="col">Estado</th>
                    <th data-align="center" scope="col">Usuario</th>
                    <th data-align="center" scope="col">Anular</th>
                    <th data-align="center" scope="col">Imprimir</th>
                </tr>
            </thead>
                
            <tbody>
                
            </tbody>
        </table>
    </div>
    <!-- Final tabla de ventas -->
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Anular Ventas</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body modal-delete text-center fs-4">
                <input type="text" class="form-control" id="idSell" hidden>
                <input type="number" class="form-control" id="nulledSell" hidden>
                ??Esta seguro que desea anular la venta <strong><span id="nSell"></span></strong>?
            </div>
            <div class="modal-footer text-center">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button id="null-sell" type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
            </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="printModal" tabindex="-1" aria-labelledby="printModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="printModalLabel">Imprimir Factura <span class="billNum"></span></h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input id="idPed" type="number" value="" hidden>
                <div class="h5 datePrint"></div>
                <p class="h5 mt-3">Informacion del Cliente</p>
                <div class="container">
                    <strong>Nombre: </strong><div class="socialPrint"></div>
                </div>
                <br>
                <p class="h5 ml-2">Informacion de Venta</p>
                <div class="container d-flex">
                    <div class="container d-block">
                        <strong>Tipo de venta: </strong> <div class="typePrint"></div>
                    </div>
                    <br>
                    <div class="container d-block">
                        <strong>Productos: </strong> <div class="modal-print"></div>
                    </div>
                    <br>
                    <div class="container d-block">
                        <strong>Total: </strong><div class="totalPrint"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button id="test1" type="button" class="btn btn-primary">Imprimir</button>
            </div>
            </div>
        </div>
    </div>
    
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
    
    <!-- DataTable -->
    <script src="{{ url('DataTables/DataTables-1.10.24/js/jquery.dataTables.js') }}"></script>
    <script src="{{ url('DataTables/DataTables-1.10.24/js/dataTables.bootstrap4.min.js') }}"></script>
    
    <!-- Javascript local -->
    <script type="text/javascript" src="{{ url('js/sells.js') }}"></script>
    
    <!-- jQuery UI-->
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <!-- JsPDF -->
    <script src="{{ url('jsPDF-1.3.2/dist/jspdf.min.js') }}"></script>
    <script src="{{ url('jsPDF-1.3.2/plugins/jspdf.plugin.autotable.js') }}"></script>

@endsection
