@extends('layouts.navbar')
<!-- estilos bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

<!-- estilos tabla bootstrap -->
<!--<link rel="stylesheet" href="{{ url('bootstrap-table-master/dist/bootstrap-table.css') }}">-->
<!-- estilos DataTable -->
<link rel="stylesheet" href="{{ url('DataTables/DataTables-1.10.24/css/dataTables.bootstrap.css') }}">
<link rel="stylesheet" href="{{ url('DataTables/DataTables-1.10.24/css/dataTables.bootstrap4.min.css') }}">

@section('content')

<!-- resultado de la venta -->
@isset($resultBill)
    <?php echo $resultBill; ?>
@endisset

<?php $i=0 ?>
<section id="bill" class="container">
    <div>
		<br />
		<br />
        <!-- Titulo de la pagina -->
        <h3 class="h3 text-center mt-3">Repuestos</h3>
        
        <!-- Tabla de repuestos -->
        <div class="container-float">
            <table
                class="table table-hover table-condensed table-striped table-bordered dt-responsive nowrap" 
                id="table-parts" 
                data-search-highlight="true">
                <thead class="bg-dark" style="color:white;" >
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th data-align="right" scope="col">Cantidad</th>
                        <th data-align="right" scope="col">P. Venta</th>
                        <th data-align="center" scope="col">Agregar</th>
                    </tr>
                </thead>

                <tbody>
                    
                </tbody>
            </table>
        </div>

        <!-- Carrito -->
        <div class="text-center mt-5">
            <!-- Titulo de carrito -->
            <p class="h4 text-center mt-1">Productos en el carrito <i class="material-icons" style="font-size:25px;">shopping_cart</i></p>
            <form id="myparts" action="{{ route('repuestos') }}/1" method="POST">
                @csrf

                <div class="col-md-12 mt-4">
                    
                        <label for="price-modal" class="col-form-label">Total:</label>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <input class="resultado" step=".01" name="resultado" type="number" disabled>
                            <input class="resultado_total" step=".01" name="resultadoTotal" type="number" hidden>
                            <input class="count" name="count" type="number" hidden>
                            <button type="submit" class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                                    <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                                </svg>
                                Realizar venta
                            </button>
                            <button id="delete-sd" type="button" class="btn btn-danger button-delete">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
                                    <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
                                </svg>
                                Borrar
                            </button>
                        </div>
                </div>
                <!-- tabla de carrito -->
                <table class="table" id="table-shop" >

                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        
                    </tbody>
                </table>
                <br />
            </form>
        </div>
    </div>
</section>

<!-- modal edit -->
@if ($productsArray['data'] != null)
<?php $i=0 ?>
@foreach($productsArray['data'] as $product)
    <div class="modal fade" id="edit-modal-{{ $product['idProducto'] }}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalLabel">Agregar productos al carrito</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <p class="h3 text-center text-capitalize">{{ $product['nombreProducto'] }}</p>
                <div class="modal-body">
                    <form id="myform" action="">
                        <div class="col-sm-6">
                            <input type="text" class="form-control" name="idModal" value="{{ $product['idProducto'] }}" hidden>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <p class="h5">Codigo: <strong>{{ $product['codProd'] }}</strong></p>
                                <br>
                                <p class="h5">Descripcion: {{ $product['descripcion'] }}</p>
                                <br>
                                <p class="h5">Stock del producto: <strong>{{ $product['stock'] }}</strong></p>
                                <br>
                                <p class="h5">Precio de Venta Actual: <strong>{{ $product['precioVenta'] }}</strong></p>
                                <input type="text" class="form-control" name="codeModal" value="{{ $product['codProd'] }}" hidden>
                            </div>
                            <div class="col-sm-6">
                                <input id="parts-modal{{$i}}" type="text" class="form-control idModal" value="{{ $product['idProducto'] }}" hidden>
                                <input id="parts-modal{{$i}}" type="text" class="form-control codeModal" value="{{ $product['codProd'] }}" hidden>
                                <input id="parts-modal{{$i}}" type="text" class="form-control nameModal" value="{{ $product['nombreProducto'] }}" hidden>
                                <input id="parts-modal{{$i}}" type="text" class="form-control descriptionModal"  value="{{ $product['descripcion'] }}" hidden>
                                <input id="parts-modal{{$i}}" type="text" class="form-control priceDefault" value="{{ $product['precioVenta'] }}" hidden>
                                <label for="price-modal" class="col-form-label">Precio de venta:</label>
                                <input id="parts-modal{{$i}}" type="text" class="form-control priceModal" value="{{ $product['precioVenta'] }}">
                                <label for="parts-modal{{$i}}" class="col-form-label">Cantidad a vender:</label>
                                <input id="parts-modal{{$i}}" type="text" class="form-control cuantityModal" name="cuantityModal">
                            </div>
                        </div>
                        <div class="mb-3">
                            <textarea class="form-control" hidden>{{ $product['descripcion'] }}</textarea>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <input type="number" class="form-control" name="stockModal" value="{{ $product['stock'] }}" hidden>
                            </div>
                            <div class="col-sm-6">
                                <input type="number" step=".01" class="form-control" name="priceModal" value="{{ $product['precioVenta'] }}" hidden>
                            </div>
                        </div>
                        <br>
                        <div class="modal-footer text-center">
                            <div class="col-md-12 text-center">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <a href="{{ route('mantenimiento') }}" class="btn btn-info">Editar repuestos</a>
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                    <a id="parts-modal{{$i}}" type="button" class="btn btn-primary button-add" data-bs-dismiss="modal">Agregar al carrito</a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
<?php $i++ ?>
@endforeach
@endif

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>

<!-- Buscador -->
<!--<script src="{{ url('bootstrap-table-master/dist/bootstrap-table.js') }}"></script>
<script src="{{ url('bootstrap-table-master/dist/bootstrap-table-locale-all.js') }}"></script>-->

<!-- DataTable -->
<script src="{{ url('DataTables/DataTables-1.10.24/js/jquery.dataTables.js') }}"></script>
<script src="{{ url('DataTables/DataTables-1.10.24/js/dataTables.bootstrap4.min.js') }}"></script>

<!-- Archivo Javascript -->
<script type="text/javascript" src="{{ url('js/parts.js') }}"></script>

@endsection
