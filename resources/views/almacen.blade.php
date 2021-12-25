@extends('layouts.navbar')
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

<!-- estilos tabla -->
<!--<link rel="stylesheet" href="{{ asset('bootstrap-table-master/dist/bootstrap-table.css') }}">-->

<link rel="stylesheet" href="{{ url('DataTables/DataTables-1.10.24/css/dataTables.bootstrap.css') }}">
<link rel="stylesheet" href="{{ url('DataTables/DataTables-1.10.24/css/dataTables.bootstrap4.min.css') }}">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

@section('content')
<div id="alert" class="mt-5">
</div>
@isset($result)
    <?php echo $result; ?>
@endisset

<div class="container" style="margin: 0;">
	<br />
	<br />
    <!-- titulo -->
    <h1 class="h3 text-center mt-3">Almacén</h1>

    <!-- tabla -->
    <div class="container-float">
        <table
        id="table-stock"
        class="table table-hover table-condensed table-striped table-bordered dt-responsive nowrap"
        data-search-highlight="true">
            <thead class="bg-dark" style="color:white;">
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Cantidad</th>
                    <th>P. Base</th>
                    <th>P. Venta</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th class="accion-stock" data-width="100" width="100">Acción</th>
                    <th>Imagen</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                </tr>
            </tbody>
        </table>

        <!-- botones de reportes -->
        <div class="container mt-2">
            <button id="report-stock" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#reportStockModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                </svg>
                Reporte de Stock
            </button>
            <button id="report-catalog" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#reportCatalog">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                </svg>
                Reporte de Catálogo
            </button>
            <button id="upload-xls" type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#excelModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-excel-fill" viewBox="0 0 16 16">
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.884 6.68 8 9.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 10l2.233 2.68a.5.5 0 0 1-.768.64L8 10.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 10 5.116 7.32a.5.5 0 1 1 .768-.64z"/>
                </svg>
                Cargar Excel
            </button>
        </div>
    </div>

    <!-- Modal Reporte Stock -->
    <div class="modal fade" id="reportStockModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Reporte Stock</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row m-2">
                        <div class="col-md-2">
                            <label for="inputDateStart" class="form-label">Fecha Inicial:</label>
                            <input type="text" class="form-control" id="inputDateStart">
                        </div>
                        <div class="col-md-2">
                            <label for="inputDateEnd" class="form-label">Fecha Final:</label>
                            <input type="text" class="form-control" id="inputDateEnd">
                        </div>
                        <div class="col-1 mt-2">
                            <br>
                            <a id="filter" class="btn btn-dark" href="#investment" role="button">Filtrar</a>
                        </div>
                    </div>
                    <table
                    id="table-stock-report"
                    class="table table-hover table-condensed table-striped table-bordered dt-responsive nowrap"
                    data-search-highlight="true">
                        <thead class="bg-dark" style="color:white;">
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Cantidad</th>
                                <th>P. Base</th>
                                <th>P. Venta</th>
                            </tr>
                        </thead>

                        <tbody>
                           
                        </tbody>
                    </table>
                    <div id="inputs-report" class="col-md-4">
                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Invertido</span>
                            <input id="investment" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled>
                        </div>
                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Venta</span>
                            <input id="sells" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled>
                        </div>
                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Ganancia</span>
                            <input id="profits" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button id="print-stock" type="button" class="btn btn-primary">Imprimir</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Reporte Catálogo -->
    <div class="modal fade" id="reportCatalog" tabindex="-1" aria-labelledby="reportCatalog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Reporte Catálogo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <table
                            id="table-catalog-report"
                            class="table table-hover table-condensed table-striped table-bordered dt-responsive nowrap"
                            data-search-highlight="true">
                            <thead class="bg-dark" style="color:white;">
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                    <th>Descripcion</th>
                                    <th>Cantidad</th>
                                    <th>P. Venta</th>
                                </tr>
                            </thead>

                            <tbody>
                            
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <a id="print-catalog" class="btn btn-primary">Imprimir</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Imagen del producto <span id="pr-name"></span></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="increase-image"></div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Modal agregar excel -->
    <div class="modal fade" id="excelModal" aria-hidden="true" aria-labelledby="ModalExcel" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div id="modal-body-add" class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="ModalExcel">Agregar Excel</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <label for="inputNewBrand" class="form-label"><strong>Archivo ".xlsx"</strong></label>
                <input id="inputExcel" class="form-control" aria-describedby="excelHelpBlock" type="file">
                <div id="excelHelpBlock" class="form-text">
                    Inserte el archivo para actualizar la base de datos.
                </div>
                </div>
                <div class="modal-footer bg-dark">
                    <button class="btn btn-primary" data-bs-dismiss="modal" id="addExcel">Agregar</button>
                </div>
            </div>
        </div>
    </div>

</div>


<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>

<!-- Buscador -->
<!--<script src="{{ url('bootstrap-table-master/dist/bootstrap-table.js') }}"></script>
<script src="{{ url('bootstrap-table-master/dist/bootstrap-table-locale-all.js') }}"></script>-->

<!-- DataTable -->
<script src="{{ url('DataTables/DataTables-1.10.24/js/jquery.dataTables.js') }}"></script>
<script src="{{ url('DataTables/DataTables-1.10.24/js/dataTables.bootstrap4.min.js') }}"></script>

<!-- table2csv -->
<script src="{{ url('Data-To-CSV-File-table2csv/src/table2csv.js') }}"></script>

<!-- jQuery UI-->
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<!-- JavaScript Local -->
<script type="text/javascript" src="{{ url('js/table-stock.js') }}"></script>

<!-- PDF -->
<script src="{{ url('jsPDF-1.3.2/dist/jspdf.min.js') }}"></script>
<script src="{{ url('jsPDF-1.3.2/plugins/jspdf.plugin.autotable.js') }}"></script>
<script src="{{ url('jsPDF-1.3.2/plugins/addimage.js') }}"></script>

@endsection
