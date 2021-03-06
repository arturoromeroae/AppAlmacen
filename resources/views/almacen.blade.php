@extends('layouts.navbar')
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

<!-- estilos tabla -->
<link rel="stylesheet" href="{{ asset('bootstrap-table-master/dist/bootstrap-table.css') }}">

@section('content')

@isset($result)
    <div class="alert alert-success alert-dismissible fade show alert-form" role="alert">
        <?php echo $result; ?> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endisset

<!-- Alerta de bienvenida -->
<!-- <div class="alert alert-warning alert-dismissible fade show" role="alert">
        @if (session('status'))
            {{ session('status') }}
        @endif
        {{ __('Bienvenido!') }} <strong>{{ Auth::user()->name }}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div> -->

<div class="container-float rounded px-3">

    <!-- titulo -->
    <h1 class="h3 text-center mt-3">Almacén</h1>

    <!-- tabla -->
    <div class="container-float">
        <table 
        id="table-stock" 
        class="table table-sm table-bordered border-dark"  
        data-height="430"
        data-search-highlight="true">
            <thead>
                <tr>
                    <th data-search-highlight-formatter="customSearchFormatter" data-width="80" scope="col">Código</th>
                    <th data-search-highlight-formatter="customSearchFormatter" data-width="300" scope="col">Nombre</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Descripcion</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Cantidad</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">P. Base</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">P. Venta</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Marca</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Modelo</th>
                    <th data-width="100" scope="col">Acción</th>
                </tr>
            </thead>
            <tbody>
                @foreach($productsArray['data'] as $product)
                <tr>
                    <td>{{ $product['codProd'] }}</td>
                    <td>{{ $product['nombreProducto'] }}</td>
                    <td>{{ $product['descripcion'] }}</td>
                    <td>{{ $product['stock'] }}</td>
                    <td>{{ $product['precioBase'] }}</td>
                    <td>{{ $product['precioVenta'] }}</td>
                    <td>{{ $product['marca'] }}</td>
                    <td>{{ $product['modelo'] }}</td>
                    <td>
                        <div class="container icons-table" id="icons">
                            <a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}"><i class="material-icons" style="font-size:20px;">create</i></a>
                            <a class="nav-link hover-table" href="#delete-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#delete-modal-{{ $product['idProducto'] }}"><i class="material-icons" style="font-size:20px;">delete</i></a>
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
        <!-- botones de reportes -->
        <button class="btn btn-primary" type="button">Reporte de Stock</button>
        <button class="btn btn-primary" type="button">Reporte de Catalogo</button>
    </div>

    <!-- modal editar cantidad -->
    @foreach($productsArray['data'] as $product)
    <div class="modal fade" id="edit-modal-{{ $product['idProducto'] }}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalLabel">Editar stock del producto</h5>
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
    @endforeach

    <!-- modal eliminar -->
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

</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
<!-- Buscador -->
<script src="{{ asset('bootstrap-table-master/dist/bootstrap-table.js') }}"></script>
<script src="{{ asset('bootstrap-table-master/dist/bootstrap-table-locale-all.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/table-stock.js') }}"></script>
@endsection
