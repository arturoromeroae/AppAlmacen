@extends('layouts.navbar')
<!-- estilos bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

<!-- estilos jquery ui -->
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<!-- estilos DataTable -->
<link rel="stylesheet" href="{{ url('DataTables/DataTables-1.10.24/css/dataTables.bootstrap.css') }}">
<link rel="stylesheet" href="{{ url('DataTables/DataTables-1.10.24/css/dataTables.bootstrap4.min.css') }}">

@section('content')

<?php $i=0 ?>
<section id="bill" class="container">
    <div class="mb-3">
		<br />
		<br />
        <!-- Titulo de la pagina -->
        <h3 class="h3 text-center mt-3">Cotizaciones</h3>
    </div>

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
            id="table-cotize" 
            data-search-highlight="true">
            <thead class="bg-dark" style="color:white;" >
                <tr>
                    <th scope="col">Comprobante</th>
                    <th scope="col">Tipo</th>
                    <th data-align="right" scope="col">Cliente</th>
                    <th data-align="right" scope="col">Estado</th>
                    <th data-align="center" scope="col">Vendedor</th>
                    <th data-align="center" scope="col">Total</th>
                    <th data-align="center" scope="col">Anular</th>
                    <th data-align="center" scope="col">Vender</th>
                </tr>
            </thead>
                
            <tbody>
                
            </tbody>
        </table>
    </div>
</section>

<!-- Modals -->

    <!-- Modal vender -->
    <div class="modal fade" id="cotize-modal" tabindex="-1" aria-labelledby="cotizeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalLabel">Agregar productos al carrito</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <p class="h3 text-center text-capitalize titulo-cotiza"></p>
                <div class="modal-body">
                    <div id="loader" class="loader mt-3" ></div>
                    <form id="cotizaForm" action="" style="display: none;">
                        <input id="idCab" type="text" value="" hidden>
                        <div class="row">
                            <div class="col-sm-6">
                                <p class="h5">Cliente: <strong class="client-cotiza"></strong></p>
                                <br>
                                <p class="h5">Estado de cotización: <strong class="status-cotiza"></strong></p>
                                <br>
                                <p class="h5">Total: <strong class="pay-cotiza"></strong></p>
                                
                            </div>
                            <div class="col-md-6">
                                <p class="h5">Productos: <strong class="products-cotiza"></strong></p>
                            </div>
                        </div>
                        
                        <br>
                        <div class="modal-footer text-center">
                            <div class="col-md-12 text-center">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
                                        Cancelar <i class="material-icons" style="font-size:15px;">highlight_off</i>
                                    </button>
                                    <button id="venderCotizacion" type="button" class="btn btn-primary">
                                        Vender <i class="material-icons" style="font-size:15px;">shopping_cart</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal eliminar -->
    <div class="modal fade" id="deleteCotizeModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Anular Cotización</h5>
                <button id="x-cotize" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body modal-delete text-center fs-4">
                <div id="loadDelete" style="display: none;">
                    <div class="spinner-grow text-dark" role="status" style="width: 4rem; height: 4rem;">
                    </div>
                    <br>
                    <span class="m-5">Anulando Cotización...</span>
                </div>
                <input type="text" id="idCotize" hidden>
                <input type="text" id="totalCotize" hidden>
                <input type="text" id="dateCotize" hidden>
                <input type="text" id="subtCotize" hidden>
                <div id="impr"></div>
                <div id="deleteInfo">
                    ¿Esta seguro que desea anular la cotizacion <strong><span id="nCotize"></span></strong>?
                </div>
            </div>
            <div class="modal-footer text-center">
                <button id="cancl-cotize" type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                <button id="del-cotize" type="button" class="btn btn-primary">Aceptar</button>
            </div>
            </div>
        </div>
    </div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>

<!-- jQuery UI-->
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<!-- DataTable -->
<script src="{{ url('DataTables/DataTables-1.10.24/js/jquery.dataTables.js') }}"></script>
<script src="{{ url('DataTables/DataTables-1.10.24/js/dataTables.bootstrap4.min.js') }}"></script>

<!-- Archivo Javascript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script type="text/javascript" src="{{ url('js/cotize.js') }}"></script>
@endsection