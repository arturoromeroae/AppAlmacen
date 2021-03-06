@extends('layouts.app')
<!-- estilos bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

<!-- estilos tabla -->
<link rel="stylesheet" href="{{ asset('bootstrap-table-master/dist/bootstrap-table.css') }}">

@section('content')

@isset($result_maintance)
    <div class="alert alert-success alert-dismissible fade show alert-form" role="alert">
        <?php echo $result_maintance; ?> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
@endisset

<div id="container-maintance" class="container-float rounded px-4">

    <!-- titulo -->
    <h1 class="h3 text-center mt-3">Mantenimiento - "Nuevos Repuestos"</h1>
    
    <!-- tabla -->
    <div class="container-float">
        <table 
            class="table table-sm table-bordered border-dark pagination-detail" 
            id="table-maintance" 
            data-height="400"
            data-search-highlight="true">
            <thead>
                <tr>
                    <th data-width="80" data-search-highlight-formatter="customSearchFormatter" data-field="code" scope="col">Código</th>
                    <th data-width="300" data-search-highlight-formatter="customSearchFormatter" data-field="name" data-sortable="true" data-sort-name="name" data-sort-order="asc" scope="col">Nombre</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Descripcion</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Cantidad</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">P. Base</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">P. Venta</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Marca</th>
                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Modelo</th>
                    <th data-width="90" data-align="center" scope="col">Acción</th>
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
                        <div class="container icons-table" id="icons-table">
                            <a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}"><i class="material-icons" style="font-size:20px;">create</i></a>
                            <a class="nav-link hover-table" href="#delete-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#delete-modal-{{ $product['idProducto'] }}"><i class="material-icons" style="font-size:20px;">delete</i></a>
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
        <button type="button" class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Agregar Producto +
        </button>
    </div>

    <!-- modal edit -->
    @foreach($productsArray['data'] as $product)
    <div class="modal fade" id="edit-modal-{{ $product['idProducto'] }}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalLabel">Editar producto</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="myform" action="{{ route('mantenimiento') }}/{{ $product['idProducto'] }}" method="POST">
                        @csrf
                        <div class="col-sm-6">
                            <input type="text" class="form-control" name="idModal" value="{{ $product['idProducto'] }}" hidden>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="code-modal" class="col-form-label">Codigo:</label>
                                <input type="text" class="form-control" name="codeModal" value="{{ $product['codProd'] }}">
                            </div>
                            <div class="col-sm-6">
                                <label for="name-modal" class="col-form-label">Nombre:</label>
                                <input type="text" class="form-control" name="nameModal" value="{{ $product['nombreProducto'] }}">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="description-modal" class="col-form-label">Descripcion:</label>
                            <textarea class="form-control" name="descriptionModal">{{ $product['descripcion'] }}</textarea>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="stock-modal" class="col-form-label">Cantidad:</label>
                                <input type="number" class="form-control" name="stockModal" value="{{ $product['stock'] }}">
                            </div>
                            <div class="col-sm-6">
                                <label for="price-modal" class="col-form-label">Precio Base:</label>
                                <input type="number" step=".01" class="form-control" name="priceModal" value="{{ $product['precioBase'] }}">
                            </div>
                            <div class="col-sm-6">
                                <label for="price-modal" class="col-form-label">Marca</label>
                                <select class="form-select" aria-label="Default select example" id="select_marca" name="selectModalMarca" required>
                                    
                                    @foreach($selectArrayMarca['data'] as $selectMarca)
                                        <option name="brand" value="{{ $selectMarca['idParam'] }}">{{ $selectMarca['valor'] }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-sm-6">
                                <label for="price-modal" class="col-form-label">Modelo</label>
                                <select class="form-select" aria-label="Default select example" id="select_modelo" name="selectModalModelo" required>
                                    
                                    @foreach($selectArrayModelo['data'] as $selectModelo)
                                        <option name="model" value="{{ $selectModelo['idParam'] }}">{{ $selectModelo['valor'] }}</option>
                                    @endforeach
                                </select>
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

    <!-- modal delete -->
    @foreach($productsArray['data'] as $product)
    <div class="modal fade" id="delete-modal-{{ $product['idProducto'] }}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalLabel">Eliminar producto</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="myform-delete" action="{{ route('mantenimiento') }}/{{ $product['idProducto'] }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <h1 class="text-center">¿Desea eliminar el producto {{ $product['nombreProducto'] }}?</h1>
                        <input type="number" class="form-control" name="idModal" value="{{ $product['idProducto'] }}" hidden>
                        <input type="number" step=".01" class="form-control" name="priceModal" value="0" hidden>
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
    
    <!-- Modal formulario para agregar productos -->
    <div class="modal fade modal-fullscreen-sm-down" id="exampleModal" aria-labelledby="exampleModalLabel" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="text-align">Agregar productos</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <h2 class="text-align p-2">Ingrese los datos del repuesto que desea agregar</h2>
                <div class="modal-body">
                    <form action="{{ route('mantenimiento') }}" method="POST" class="row g-3" enctype="multipart/form-data">
                        @csrf
                        <div class="col-md-2">
                            <label for="code" class="form-label">Codigo *</label>
                            <input type="text" class="form-control" id="code_product" name="code" required>
                        </div>
                        <div class="col-md-4">
                            <label for="name" class="form-label">Nombre *</label>
                            <input type="text" class="form-control" id="name_product" name="name" required>
                        </div>
                        <div class="col-md-4">
                            <label for="price" class="form-label">Precio Base *</label>
                            <input type="number" step=".01" class="form-control" id="price_base_product" name="price" required>
                        </div>
                        <div class="col-md">
                            <label for="cuantity" class="form-label">Cantidad *</label>
                            <input type="number" class="form-control" id="cuantity_product" name="cuantity" required>
                        </div>
                        
                        <!-- <div class="col-md-12 mt-0">
                            <button type="button" class="btn btn-primary" onclick="addRow()">Agregar Producto a la tabla</button>
                        </div> -->
                        <div class="col-md-6">
                            <label for="formFile" class="form-label">Marca *</label>
                            <select class="form-select" aria-label="Default select example" id="select_marca" name="select_marca" required>
                                <option selected>Selecciona una marca</option>
                                @foreach($selectArrayMarca['data'] as $selectMarca)
                                    <option name="brand" value="{{ $selectMarca['idParam'] }}">{{ $selectMarca['valor'] }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="formFile" class="form-label">Modelo *</label>
                            <select class="form-select" aria-label="Default select example" id="select_modelo" name="select_modelo" required>
                                <option selected>Selecciona un modelo</option>
                                @foreach($selectArrayModelo['data'] as $selectModelo)
                                    <option name="model" value="{{ $selectModelo['idParam'] }}">{{ $selectModelo['valor'] }}</option>
                                @endforeach
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="formFile" class="form-label">Imagen del producto</label>
                            <input class="form-control" type="file" id="image_product" name="image_product">
                        </div>
                        <div class="col-md-6">
                            <label for="description" class="form-label">Descripcion</label>
                            <textarea class="form-control" id="description_product" rows="3" name="description"></textarea>
                        </div>
                        
                        <div class="modal-footer">
                            <button type="submit" class="btn btn-primary">Guardar</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
<!-- Buscador -->
<script src="{{ asset('bootstrap-table-master/dist/bootstrap-table.js') }}"></script>
<script src="{{ asset('bootstrap-table-master/dist/bootstrap-table-locale-all.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/table-maintance.js') }}"></script>
<script src="{{ asset('bootstrap-table-master/dist/extensions/export/bootstrap-table-export.js') }}"></script>
<script type="text/javascript" src="{{ asset('libs/FileSaver/FileSaver.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('export/libs/js-xlsx/xlsx.core.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('export/tableExport.min.js') }}"></script>
@endsection
