@extends('layouts.navbar')
<!-- estilos bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

<!-- estilos DataTable -->
<link rel="stylesheet" href="{{ url('DataTables/DataTables-1.10.24/css/dataTables.bootstrap.css') }}">
<link rel="stylesheet" href="{{ url('DataTables/DataTables-1.10.24/css/dataTables.bootstrap4.min.css') }}">

@section('content')
    <br />
    <br />
    <!-- titulo -->
    <h1 class="h2 text-center mb-4 mt-3">Ventas</h1>

    <!-- Inicio tabla de ventas -->
    <div class="container-float">
        <table
            class="table table-hover table-condensed table-striped table-bordered dt-responsive nowrap" 
            id="table-sells" 
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
                <?php (int)$i=0 ?>
                @if ($productsArray['data'] != null)
                @foreach($productsArray['data'] as $product)
                <tr>
                <td class="fs-6"><input id="parts-modal-shop{{$i}}" type="text" class="form-control idShop" value="{{ $product['idProducto'] }}" hidden><a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['codProd'] }}</a></td>
                        <td class="fs-6"><input id="parts-modal-shop{{$i}}" type="text" class="form-control codeShop" value="{{ $product['codProd'] }}" hidden><a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['nombreProducto'] }}</a></td>
                        <td class="fs-6"><input id="parts-modal-shop{{$i}}" type="text" class="form-control nameShop" value="{{ $product['nombreProducto'] }}" hidden><a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['descripcion'] }}</a></td>
                        <td class="fs-6"><input id="parts-modal-shop{{$i}}" type="text" class="form-control stockShop" value="{{ $product['stock'] }}" hidden><a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['stock'] }}</a></td>
                        <td class="fs-6"><input id="parts-modal-shop{{$i}}" type="text" class="form-control priceShop" value="{{ $product['precioVenta'] }}" hidden><a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['precioVenta'] }}</a></td>
                        <td class="fs-6"><a id="parts-modal-shop{{$i}}" class="nav-link hover-table button-add-table click"><i class="material-icons" style="font-size:17px;">add_shopping_cart</i></a></td>
                    </tr>
                <?php $i++ ?>
                @endforeach
                @endif
            </tbody>
        </table>
    </div>
    <!-- Final tabla de ventas -->

    <!-- Javascript local -->
    <script type="text/javascript" src="{{ url('js/sells.js') }}"></script>

    <!-- DataTable -->
    <script src="{{ url('DataTables/DataTables-1.10.24/js/jquery.dataTables.js') }}"></script>
    <script src="{{ url('DataTables/DataTables-1.10.24/js/dataTables.bootstrap4.min.js') }}"></script>
@endsection
