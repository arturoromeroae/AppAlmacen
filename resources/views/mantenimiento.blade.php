@extends('layouts.navbar')
<!-- estilos bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">

<!-- estilos tabla -->
<!--<link rel="stylesheet" href="{{ asset('bootstrap-table-master/dist/bootstrap-table.css') }}">-->

<!-- estilos DataTables -->
<link rel="stylesheet" href="{{ url('DataTables/DataTables-1.10.24/css/dataTables.bootstrap.css') }}">
<link rel="stylesheet" href="{{ url('DataTables/DataTables-1.10.24/css/dataTables.bootstrap4.min.css') }}">

@section('content')
@isset($result_maintance)
    <!-- muestra success o error -->
    <?php echo $result_maintance; ?>
@endisset

<div id="container-maintance" class="container" style="margin: 0;">
	<br />
	<br />
    <!-- titulo -->
    <h1 class="h3 text-center mt-3">Mantenimiento</h1>

    <!-- inicio de tabla para mostrar productos en la db -->
    <div class="container-float">
        <table
            class="table table-hover table-condensed table-striped table-bordered dt-responsive nowrap"
            id="table-maintance"
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
                    <th>Ubicación</th>
                    <th>Acción</th>
                    <th>Imagen</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    
                </tr>
            </tbody>
        </table>
        <!-- boton agregar productos -->
        <button style="z-index: 0;" id="test" type="button" class="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"/>
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
            </svg>
            Agregar Producto
        </button>
        <div class="btn-group mt-2" role="group" aria-label="Basic example">
            <button id="addButtonBrand" class="btn btn-dark" data-bs-target="#exampleModal2"data-bs-toggle="modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                </svg>
                Agregar Marca
            </button>
            <button id="editButtonBrand" class="btn btn-dark" data-bs-target="#editModalBrand" type="button" data-bs-toggle="modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                Editar Marca
            </button>
        </div>
        <div style="z-index: 0;" class="btn-group mt-2" role="group" aria-label="Basic example">
            <button id="addButtonModel" class="btn btn-info" type="button" data-bs-target="#exampleModal3" data-bs-toggle="modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                </svg>
                Agregar Modelo
            </button>
            <button id="editButtonModel" class="btn btn-info" type="button" data-bs-target="#editModal" data-bs-toggle="modal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
                Editar Modelo
            </button>
        </div>
    </div>
    <!-- final de tabla -->

    <!-- inicio modal editar -->
    @if ($productsArray['data'] != null)
    <?php $i=0 ?>
    @foreach($productsArray['data'] as $product)
    <div class="modal fade image_product_modal-{{ $product['idProducto'] }}" id="edit-modal-{{ $product['idProducto'] }}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalLabel">Editar producto</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="myform" action="{{ route('mantenimiento') }}/{{ $product['idProducto'] }}" method="POST" enctype="multipart/form-data">
                        @csrf
                        <div class="col-sm-6">
                            <input type="text" class="form-control" name="idModal" value="{{ $product['idProducto'] }}" hidden>
                            <input type="text" class="form-control idModalHidden{{ $product['idProducto'] }}" value="image_product_modal-{{ $product['idProducto'] }}" hidden>
                        </div>
                        <div class="d-flex">
                            <div class="col-sm-3 mx-2" style="text-align: center;">
                                <img class="img-thumbnail" src="http://appdemo1.solarc.pe/imagenes/{{ $product['codProd'] }}.png" onerror="this.onerror=null; this.src='http://appdemo1.solarc.pe/imagenes/{{ $product['codProd'] }}.jpg';" style="max-width: 180px;">
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <label for="code-modal" class="col-form-label">Codigo:</label>
                                    <input type="text" class="form-control codeModal-{{ $product['idProducto'] }}" name="codeModal" value="{{ $product['codProd'] }}">
                                </div>
                                <div class="col-sm-6">
                                    <label for="name-modal" class="col-form-label">Nombre:</label>
                                    <input type="text" class="form-control" name="nameModal" value="{{ $product['nombreProducto'] }}">
                                </div>
                                <div class="col-sm-12">
                                    <label for="description-modal" class="col-form-label">Descripcion:</label>
                                    <textarea class="form-control" name="descriptionModal">{{ $product['descripcion'] }}</textarea>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="stock-modal" class="col-form-label">Cantidad:</label>
                                <input type="number" class="form-control" name="stockModal" value="{{ $product['stock'] }}">
                            </div>
                            <div class="col-sm-3">
                                <label for="price-modal" class="col-form-label">Precio Base:</label>
                                <input type="number" step=".01" class="form-control" name="priceModal" value="{{ $product['precioBase'] }}">
                            </div>
                            <div class="col-sm-3">
                                <label for="price-modal" class="col-form-label">Precio Venta:</label>
                                <input type="number" step=".01" class="form-control" name="priceSellModal" value="{{ $product['precioVenta'] }}">
                            </div>
                            <div class="col-md-6 mt-2">
                                <label for="formFile" class="form-label">Imagen del producto (<strong>Solo imágenes ".png"  y ".jpg" tamaño máx 99 KB</strong>)</label>
                                <input class="form-control" type="file" id="image_product_modal-{{ $product['idProducto'] }}" name="image_product_modal">
                            </div>
                            <div class="col-sm-5">
                                <label for="price-modal" class="col-form-label mt-4">Marca</label>
                                <select class="form-select" aria-label="Default select example" id="select_marca" name="selectModalMarca" required>
                                    @if ($selectArrayMarca['data'] != null)
                                        @if ($product['marca'] != "")
                                            @foreach($selectArrayMarca['data'] as $selectMarca)
                                                @if ($selectMarca['valor'] == $product['marca'])
                                                    <option name="brand" value="{{ $selectMarca['idParam'] }}" selected>{{ $selectMarca['valor'] }}</option>
                                                @endif
                                            @endforeach
                                        @else
                                            <option name="brand" value="0" selected>Seleccione una marca</option>
                                        @endif
                                        @foreach($selectArrayMarca['data'] as $selectMarca)
                                            @if ($selectMarca['valor'] != $product['marca'])
                                                <option name="brand" value="{{ $selectMarca['idParam'] }}">{{ $selectMarca['valor'] }}</option>
                                            @endif
                                        @endforeach
                                    @endif
                                </select>
                            </div>
                            <div class="col-sm-5">
                                <label for="price-modal" class="col-form-label">Modelo</label>
                                <select class="form-select" aria-label="Default select example" id="select_modelo" name="selectModalModelo" required>
                                @if ($selectArrayModelo['messages'] == [])
                                    @if ($product['modelo'] != "")
                                        @foreach($selectArrayModelo['data'] as $selectModelo)
                                            @if ($selectModelo['valor'] == $product['modelo'])
                                                <option name="model" value="{{ $selectModelo['idParam'] }}" selected>{{ $selectModelo['valor'] }}</option>
                                            @endif
                                        @endforeach
                                    @else
                                        <option name="model" value="0" selected>Seleccione un modelo</option>
                                    @endif
                                    @foreach($selectArrayModelo['data'] as $selectModelo)
                                        @if ($selectModelo['valor'] != $product['modelo'])
                                            <option name="model" value="{{ $selectModelo['idParam'] }}">{{ $selectModelo['valor'] }}</option>
                                        @endif
                                    @endforeach
                                @endif
                                </select>
                            </div>
                            <div class="col-sm-2">
                                <label for="name-modal" class="col-form-label">Ubicación:</label>
                                <input type="text" class="form-control" name="ubicationModal" value="{{ $product['ubicacion'] }}">
                            </div>
                        </div>
                        <br>
                        <div class="modal-footer">
                            <!-- boton cancelar edicion del producto -->
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            <!-- boton modificar el producto -->
                            <button type="submit" class="btn btn-primary send{{ $product['idProducto'] }}">Modificar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <?php $i++ ?>
    @endforeach
    @endif
    <!-- final modal editar -->

    <!-- inicio modal eliminar -->
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
                    <form id="myform-delete" action="{{ route('mantenimiento') }}/{{ $product['idProducto'] }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <h1 class="text-center">¿Desea eliminar el producto {{ $product['nombreProducto'] }}?</h1>
                        <input type="number" class="form-control" name="idModal" value="{{ $product['idProducto'] }}" hidden>
                        <input type="number" step=".01" class="form-control" name="priceModal" value="0" hidden>
                        <br>
                        <div class="modal-footer d-block text-center">
                            <!-- boton no eliminar producto -->
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" style="padding-left: 20px; padding-right: 20px;">No</button>
                            <!-- boton si eliminar producto -->
                            <button type="submit" class="btn btn-primary" style="padding-left: 25px; padding-right: 25px;">Si</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    @endforeach
    @endif
    <!-- final modal eliminar -->

    <!-- Inicio modal formulario para agregar productos -->
    <div class="modal fade modal-fullscreen-sm-down" id="exampleModal" aria-labelledby="exampleModalLabel" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
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
                        <div class="col-md-2">
                            <label for="price" class="form-label">Precio Base *</label>
                            <input type="number" step=".01" class="form-control" id="price_base_product" name="price" required>
                        </div>
                        <div class="col-md-2">
                            <label for="price-sell" class="form-label">Precio Venta *</label>
                            <input type="number" step=".01" class="form-control" id="price_sell_product" name="price_sell" required>
                        </div>
                        <div class="col-md">
                            <label for="cuantity" class="form-label">Cantidad *</label>
                            <input type="number" class="form-control" id="cuantity_product" name="cuantity" required>
                        </div>

                        <!-- <div class="col-md-12 mt-0">
                            <button type="button" class="btn btn-primary" onclick="addRow()">Agregar Producto a la tabla</button>
                        </div> -->
                        <div class="col-md-5">
                            <label for="formFile" class="form-label">Marca</label>
                            <select class="form-select" aria-label="Default select example" id="select_marca" name="select_marca">
                                <option value= "0" selected>Selecciona una marca</option>
                                @if ($selectArrayMarca['data'] != null)
                                    @foreach($selectArrayMarca['data'] as $selectMarca)
                                        <option name="brand" value="{{ $selectMarca['idParam'] }}">{{ $selectMarca['valor'] }}</option>
                                    @endforeach
                                @endif
                            </select>
                        </div>
                        <div class="col-md-5">
                            <label for="formFile" class="form-label">Modelo</label>
                            <select class="form-select" aria-label="Default select example" id="select_modelo" name="select_modelo">
                                <option value= "0" selected>Selecciona un modelo</option>
                                @if ($selectArrayModelo['messages'] == [])
                                    @foreach($selectArrayModelo['data'] as $selectModelo)
                                        <option name="model" value="{{ $selectModelo['idParam'] }}">{{ $selectModelo['valor'] }}</option>
                                    @endforeach
                                @endif
                            </select>
                        </div>
                        <div class="col-sm-2">
                            <label for="ubication_modal" class="col-form-label">Ubicación:</label>
                            <input type="text" id="ubication_modal" class="form-control" name="ubicationModal" value="{{ $product['ubicacion'] }}">
                        </div>
                        <div class="col-md-6">
                            <label for="formFile" class="form-label">Imagen del producto (<strong>Solo imágenes ".png" y ".jpg" tamaño máx 99 KB</strong>)</label>
                            <input class="form-control" type="file" id="image_product" name="image_product">
                        </div>
                        <div class="col-md-6">
                            <label for="description" class="form-label">Descripcion</label>
                            <textarea class="form-control" id="description_product" rows="3" name="description"></textarea>
                        </div>

                        <div class="modal-footer">
                            <!-- boton guardar producto -->
                            <button type="submit" class="btn btn-primary addNew">Guardar</button>
                            <!-- boton cancelar -->
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Final modal formulario para agregar productos -->

    <!-- Modal agregar marca -->
    <div class="modal fade" id="exampleModal2" aria-hidden="true" aria-labelledby="ModalBrand" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div id="modal-body-add" class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="ModalBrand">Agregar Marcas</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <label for="inputNewBrand" class="form-label">Marca</label>
                <input type="text" id="inputNewBrand" class="form-control" aria-describedby="brandHelpBlock">
                <div id="brandHelpBlock" class="form-text">
                    Inserte el nombre de la marca.
                </div>
                </div>
                <div class="modal-footer bg-dark">
                    <button class="btn btn-primary" id="addBrand">Agregar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal editar marca -->
    <div class="modal fade" id="editModalBrand" aria-hidden="true" aria-labelledby="ModalBrandEdit" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="ModalBrandEdit">Editar Marcas</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label class="form-label">Marcas en el sistema</label>
                    <div id="loader" class="loader mt-3" ></div>
                    <select id="selectEditBrand" class="form-select" size="5" aria-label="multiple select example">
                        
                    </select>
                    <div id="brandHelpBlock" class="form-text">
                        Seleccione la marca a <strong>editar o eliminar</strong>.
                    </div>
                    <label for="inputEditBrand" class="form-label mt-2">Marca a editar</label>
                    <input type="number" id="valval" class="form-control" hidden>
                    <input type="text" id="inputEditBrand" class="form-control">
                </div>
                <div class="modal-footer bg-dark">
                    <button class="btn btn-danger" id="addEditDeleteBrand" disabled
                            data-bs-target="#questionDelete"
                            data-bs-toggle="modal">Eliminar</button>
                    <button class="btn btn-primary" id="addEditBrand" disabled>Editar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal alerta eliminar marca -->
    <div class="modal fade" id="questionDelete" aria-hidden="true" aria-labelledby="ModalBrandQuestionDelete" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div id="modal-body-add" class="modal-content">
                <div class="modal-header bg-warning border-warning" style="--bs-bg-opacity: .5;">
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div class="modal-body bg-warning d-flex" style="--bs-bg-opacity: .5;">
                    <i class="material-icons" style="font-size:50px;color:red">warning</i>
                    <p id="modal-delete-brand" class="h2 text-center"></p>
                </div>
                <div class="modal-footer bg-warning border-warning" style="--bs-bg-opacity: .5;">
                    <button class="btn btn-danger" data-bs-dismiss="modal">No</button>
                    <button class="btn btn-primary" id="deleteBrand" data-bs-dismiss="modal">Si</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal agregar modelo -->
    <div class="modal fade" id="exampleModal3" aria-hidden="true" aria-labelledby="ModalBrand" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div id="modal-body-add-model" class="modal-content">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title" id="ModalBrand">Agregar Modelos</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <label for="inputNewModel" class="form-label">Modelo</label>
            <input type="text" id="inputNewModel" class="form-control" aria-describedby="brandHelpBlock">
            <div id="brandHelpBlock" class="form-text">
                Inserte el nombre del modelo.
            </div>
            </div>
            <div class="modal-footer bg-dark text-white">
                <button class="btn btn-primary" id="addModel">Agregar</button>
            </div>
            </div>
        </div>
    </div>

    <!-- Modal editar modelo -->
    <div class="modal fade" id="editModal" aria-hidden="true" aria-labelledby="ModalModelEdit" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title">Editar Modelos</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label class="form-label">Modelos en el sistema</label>
                    <div id="loader-model" class="loader mt-3" ></div>
                    <select id="selectEditModel" class="form-select" size="5" aria-label="multiple select example">
                        
                    </select>
                    <div id="brandHelpBlock" class="form-text">
                        Seleccione el modelo a <strong>editar o eliminar</strong>.
                    </div>
                    <label for="inputEditModel" class="form-label mt-2">Modelo a editar</label>
                    <input type="number" id="valvalModel" class="form-control" hidden>
                    <input type="text" id="inputEditModel" class="form-control">
                </div>
                <div class="modal-footer bg-dark">
                    <button class="btn btn-danger" id="addEditDeleteModel" disabled
                            data-bs-target="#questionDeleteModel"
                            data-bs-toggle="modal">Eliminar</button>
                    <button class="btn btn-primary" id="addEditModel" disabled>Editar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal alerta eliminar modelo -->
    <div class="modal fade" id="questionDeleteModel" aria-hidden="true" aria-labelledby="ModalBrandQuestionDeleteModel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div id="modal-body-add-model" class="modal-content">
                <div class="modal-header bg-warning border-warning" style="--bs-bg-opacity: .5;">
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div class="modal-body bg-warning d-flex" style="--bs-bg-opacity: .5;">
                    <i class="material-icons" style="font-size:50px;color:red">warning</i>
                    <p id="modal-delete-model" class="h2 text-center"></p>
                </div>
                <div class="modal-footer bg-warning border-warning" style="--bs-bg-opacity: .5;">
                    <button class="btn btn-danger" data-bs-dismiss="modal">No</button>
                    <button class="btn btn-primary" id="deleteModel" data-bs-dismiss="modal">Si</button>
                </div>
            </div>
        </div>
    </div>

</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>

<!-- Buscador bootstrap -->
<!--<script src="{{ url('bootstrap-table-master/dist/bootstrap-table.js') }}"></script>
<script src="{{ url('bootstrap-table-master/dist/bootstrap-table-locale-all.js') }}"></script>-->

<!-- data table -->
<script src="{{ url('DataTables/DataTables-1.10.24/js/jquery.dataTables.js') }}"></script>
<script src="{{ url('DataTables/DataTables-1.10.24/js/dataTables.bootstrap4.min.js') }}"></script>

<!-- script local -->
<script type="text/javascript" src="{{ url('js/table-maintance.js') }}"></script>

<!-- bootstrap table
<script src="{{ url('bootstrap-table-master/dist/extensions/export/bootstrap-table-export.js') }}"></script> -->

@endsection
