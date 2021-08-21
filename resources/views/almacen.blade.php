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
            <button id="report-stk" class="btn btn-primary" type="button">Descargar</button>
            <button id="report-stock" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#reportStockModal">
                Reporte de Stock
            </button>
            <button id="report-catalog" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#reportCatalog">
                Reporte de Catálogo
            </button>
            <button id="upload-xls" type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#excelModal">
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
