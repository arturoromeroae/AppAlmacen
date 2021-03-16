@extends('layouts.navbar')
<!-- estilos bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

<!-- estilos tabla -->
<link rel="stylesheet" href="{{ url('bootstrap-table-master/dist/bootstrap-table.css') }}">

<!-- tabla de repuestos -->
@section('content')
<?php $i=0 ?>
<div class="container-xxl px-5">
    <div>
        <div>
            <p class="h1 text-center">Repuestos</p>
            <table
                class="table table-sm" 
                id="table-parts" 
                data-height="250"
                data-search-highlight="true">
                <thead>
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">P. Venta</th>
                        <th scope="col">Agregar</th>
                    </tr>
                </thead>
            
                <tbody>
                    @foreach($productsArray['data'] as $product)
                    <tr>
                        <td><input id="parts-modal-shop{{$i}}" type="text" class="form-control idShop" value="{{ $product['idProducto'] }}" hidden><a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['codProd'] }}</a></td>
                        <td><input id="parts-modal-shop{{$i}}" type="text" class="form-control codeShop" value="{{ $product['codProd'] }}" hidden><a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['nombreProducto'] }}</a></td>
                        <td><input id="parts-modal-shop{{$i}}" type="text" class="form-control nameShop" value="{{ $product['nombreProducto'] }}" hidden><a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['descripcion'] }}</a></td>
                        <td><input id="parts-modal-shop{{$i}}" type="text" class="form-control stockShop" value="{{ $product['stock'] }}" hidden><a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['stock'] }}</a></td>
                        <td><input id="parts-modal-shop{{$i}}" type="text" class="form-control priceShop" value="{{ $product['precioVenta'] }}" hidden><a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['precioVenta'] }}</a></td>
                        <td><a id="parts-modal-shop{{$i}}" class="nav-link hover-table button-add-table click"><i class="material-icons" style="font-size:20px;">add_shopping_cart</i></a></td>
                    </tr>
                    <?php $i++ ?>
                    @endforeach
                </tbody>
            </table>
        </div>

        <!-- tabla de carrito -->
        <div class="container text-center">
            <p class="h3 text-center mt-1">Productos en el carrito <i class="material-icons" style="font-size:25px;">shopping_cart</i></p>
            <form id="myparts" action="{{ route('repuestos') }}/1" method="POST">
                @csrf
                <table class="table" id="table-shop" >

                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Subtotal</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        
                    </tbody>
                </table>
                <div class="col-md-12 mt-4">
                    
                        <label for="price-modal" class="col-form-label">Total:</label>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <input class="resultado" step=".01" name="resultado" type="number" disabled>
                            <input class="resultado_total" step=".01" name="resultadoTotal" type="number" hidden>
                            <input class="count" name="count" type="number" hidden>
                            <button type="submit" class="btn btn-primary">Realizar venta</button>
                            <button type="button" class="btn btn-danger button-delete">Borrar</button>
                        </div>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- modal edit -->
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
                                    <a id="parts-modal{{$i}}" type="button" onclick="empty()" class="btn btn-primary button-add">Agregar al carrito</a>
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

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
<!-- Buscador -->
<script src="{{ url('bootstrap-table-master/dist/bootstrap-table.js') }}"></script>
<script src="{{ url('bootstrap-table-master/dist/bootstrap-table-locale-all.js') }}"></script>
<script type="text/javascript" src="{{ url('js/parts.js') }}"></script>
@endsection
