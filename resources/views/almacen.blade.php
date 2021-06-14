@extends('layouts.navbar')
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

<!-- estilos tabla -->
<!--<link rel="stylesheet" href="{{ asset('bootstrap-table-master/dist/bootstrap-table.css') }}">-->

<link rel="stylesheet" href="{{ url('DataTables/DataTables-1.10.24/css/dataTables.bootstrap.css') }}">
<link rel="stylesheet" href="{{ url('DataTables/DataTables-1.10.24/css/dataTables.bootstrap4.min.css') }}">
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

@section('content')

@isset($result)
    <?php echo $result; ?>
@endisset

<div class="container">
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
                    <th data-search-highlight-formatter="customSearchFormatter" data-width="80" scope="col">Código</th>
                    <th data-search-highlight-formatter="customSearchFormatter" data-width="300" scope="col">Nombre</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Descripcion</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Cantidad</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">P. Base</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">P. Venta</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Marca</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Modelo</th>
                    <th class="accion-stock" data-width="100" width="100" scope="col">Acción</th>
                </tr>
            </thead>
            <tbody>
                @if ($productsArray['data'] != null)
                @foreach($productsArray['data'] as $product)
                <tr>
                    <td class="fs-6">{{ $product['codProd'] }}</td>
                    <td class="fs-6">{{ $product['nombreProducto'] }}</td>
                    <td class="fs-6">{{ $product['descripcion'] }}</td>
                    <td class="fs-6">{{ $product['stock'] }}</td>
                    <td class="fs-6">{{ $product['precioBase'] }}</td>
                    <td class="fs-6">{{ $product['precioVenta'] }}</td>
                    <td class="fs-6">{{ $product['marca'] }}</td>
                    <td class="fs-6">{{ $product['modelo'] }}</td>
                    <td class="accion-stock">
                        <div class="row" id="icons">
							<div class="col-md-10" >
								<div class="form-group row">
									<a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}"><i class="material-icons" style="font-size:17px;">create</i></a>
									<a class="nav-link hover-table" href="#delete-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#delete-modal-{{ $product['idProducto'] }}"><i class="material-icons" style="font-size:17px;">delete</i></a>
								</div>
							</div>
                        </div>
                    </td>
                </tr>
                @endforeach
                @endif
            </tbody>
        </table>

        <!-- botones de reportes -->
        <div class="container mt-2">
            <button id="report-stk" class="btn btn-primary" type="button">Descargar</button>
            <button id="report-stock" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#reportStockModal">
                Reporte de Stock
            </button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#reportCatalog">
                Reporte de Catálogo
            </button>
        </div>
    </div>

    <!-- modal editar cantidad -->
    @if ($productsArray['data'] != null)
    <?php $i=0; $x=10; ?>
    @foreach($productsArray['data'] as $product)
    <div class="modal fade" id="edit-modal-{{ $product['idProducto'] }}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalLabel">Modificacion de Stock y Precio Base</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="h3 text-capitalize text-center"><strong>{{ $product['nombreProducto'] }}</strong></p>
                    <form id="myform" action="{{ route('almacen') }}/{{ $product['idProducto'] }}" method="POST">
                        @csrf
                        <div class="col-sm-6">
                            <input type="text" class="form-control" name="idModal" value="{{ $product['idProducto'] }}" hidden>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="code-modal" class="col-form-label">Codigo del Producto:</label>
                                <input type="text" class="form-control" name="codeModal" value="{{ $product['codProd'] }}" disabled>
                            </div>
                            <div class="col-md-6">
                                <label for="stock-modal" class="col-form-label">Aumento de stock:</label>
                                <input type="number" class="form-control" name="stockModal">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="stock-modal" class="col-form-label">Cantidad:</label>
                                <input type="number" class="form-control" name="stock" value="{{ $product['stock'] }}" disabled>
                            </div>
                            <!-- <div class="col-sm-3">
                                <label class="col-form-label mt-4">
                                    <p class="h3">Total: <strong id="MiTotal"></strong></p>
                                </label>
                            </div> -->
                            <div name="prueba" class="col-sm-6 row">
                                <label for="stock-modal" class="col-form-label">Aumento sobre el precio base:</label>
                                <div class="input-group">
                                    <span class="input-group-text">Total:&nbsp;<span class="stock-print">0.00</span></span>
                                    <input id="minumero{{$i}}" max="100" min="0" step=".01" type="number" class="form-control price-stock" name="priceModal" aria-describedby="basic-addon1">
                                    <span class="input-group-text basic-addon">%</span>
                                    <button id="minumero{{$x}}" class="btn btn-outline-primary button-addon" type="button">Calcular Precio</button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="stock-modal" class="col-form-label">Precio Base:</label>
                                <input id="minumero{{$x}}" type="number" data-prod=@json($product["precioBase"]) class="form-control stock-stock" name="stockPrice" value="{{ $product['precioBase'] }}" disabled>
                            </div>
                        </div>
                        <br>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Modificar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <?php $i++; $x++; ?>
    @endforeach
    @endif

    <!-- modal eliminar -->
    @if ($productsArray['data'] != null)
    @foreach($productsArray['data'] as $product)
    <div class="modal fade" id="delete-modal-{{ $product['idProducto'] }}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalLabel">Eliminar producto</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="myform-delete" action="{{ route('almacen') }}/{{ $product['idProducto'] }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <h1 class="text-center">¿Desea eliminar el producto {{ $product['nombreProducto'] }}?</h1>
                        <input type="number" class="form-control" name="idModal" value="{{ $product['idProducto'] }}" hidden>

                        <br>
                        <div class="modal-footer d-block text-center">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" style="padding-left: 20px; padding-right: 20px;">No</button>
                            <button type="submit" class="btn btn-primary" style="padding-left: 25px; padding-right: 25px;">Si</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    @endforeach

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
                                    <th>Imagen</th>
                                </tr>
                            </thead>

                            <tbody>
                            
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary">Imprimir</button>
                </div>
            </div>
        </div>
    </div>
    

</div>

<script>
   var appSettings = @json( $product['precioBase']);
</script>
@endif

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
@endsection
