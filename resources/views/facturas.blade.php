@extends('layouts.navbar')

@section('content')
<!-- titulo -->
<h1 class="h2 text-center mt-3">Emitir Comprobante</h1>

<div class="container">
    <div class="container">

        <div class="row">
            <div class="col">
                <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">Comprobante</label>
                    <select class="form-select" id="inputGroupSelect01">
                        <option selected>Nota de Venta</option>
                        <option value="bventa">Boleta de Venta</option>
                        <option value="factura">Factura</option>
                    </select>
                </div>
            </div>
            <div class="col">
                <input type="text" class="form-control" placeholder="Cliente" aria-label="cliente">
            </div>
        </div>

        <div class="row">
            <div class="col">
                <label>Monto a pagar</label>
                <input type="text" class="form-control" placeholder="S/" aria-label="cliente" disabled>
            </div>
            <div class="col">
                <label>Pago con soles</label>
                <input type="text" class="form-control" placeholder="S/" aria-label="cliente">
            </div>
            <div class="col">
                <label>Vuelto</label>
                <input type="text" class="form-control" placeholder="S/" aria-label="cliente" disabled>
            </div>
            <div class="col mt-3">
                <a class="nav-link hover-table btn btn-primary" href="#edit-modal-1" data-bs-toggle="modal" data-bs-target="#edit-modal-1">Agregar mas productos +</a>
            </div>
        </div>

        <hr>

        <!-- shop table -->
        <div class="row mt-2">
            <table class="table" id="table-bill" >

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
        </div>

        <hr>

        <div class="row">
            <h4>Descuentos Adicionales</h4>
        </div>

        <div class="row mt-2">
            <div class="col">
                <label>Monto a pagar</label>
                <input type="text" class="form-control" placeholder="S/" aria-label="cliente" disabled>
            </div>
            <div class="col">
                <label>Descuento</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Seleccione S/ ó %</option>
                    <option value="sol">S/</option>
                    <option value="por">%</option>
                </select>
            </div>
            <div class="col">
                <label>Monto del descuento</label>
                <input type="text" class="form-control" aria-label="cliente">
            </div>
            <div class="col">
                <label>Nuevo precio de venta</label>
                <input type="text" class="form-control" placeholder="S/" aria-label="cliente" disabled>
            </div>
        </div>
        <div class="col mt-4 mb-4">
            <button type="submit" class="btn btn-primary">Emitir comprobante</button>
            <button type="submit" class="btn btn-danger">Cancelar</button>
        </div>

        <!-- modal add -->
        @foreach($productsArray['data'] as $product)
        <div class="modal fade" id="edit-modal-1" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabel">Agregar productos</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                            <table 
                            class="table table-sm table-bordered border-dark pagination-detail" 
                            id="table-maintance" 
                            data-height="400"
                            data-search-highlight="true">
                            <thead>
                                <tr>
                                    <th data-halign="center" data-width="80" data-search-highlight-formatter="customSearchFormatter" data-field="code" scope="col">Código</th>
                                    <th data-width="300" data-search-highlight-formatter="customSearchFormatter" data-field="name" data-sortable="true" data-sort-name="name" data-sort-order="asc" scope="col">Nombre</th>
                                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Descripcion</th>
                                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Cantidad</th>
                                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">P. Venta</th>
                                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Agregar</th>
                                </tr>
                            </thead>
                        
                            <tbody>
                                <?php $i=0 ?>
                                @foreach($productsArray['data'] as $product)
                                <tr>
                                    <td><input id="parts-modal-shop{{$i}}" type="text" class="form-control idShop" value="{{ $product['idProducto'] }}" hidden><a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['codProd'] }}</a></td>
                                    <td><input id="parts-modal-shop{{$i}}" type="text" class="form-control codeShop" value="{{ $product['codProd'] }}" hidden><a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['nombreProducto'] }}</a></td>
                                    <td><input id="parts-modal-shop{{$i}}" type="text" class="form-control nameShop" value="{{ $product['nombreProducto'] }}" hidden><a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['descripcion'] }}</a></td>
                                    <td><input id="parts-modal-shop{{$i}}" type="text" class="form-control stockShop" value="{{ $product['stock'] }}" hidden><a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['stock'] }}</a></td>
                                    <td><input id="parts-modal-shop{{$i}}" type="text" class="form-control priceShop" value="{{ $product['precioVenta'] }}" hidden><a class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['precioVenta'] }}</a></td>
                                    <td><a id="parts-modal-shop{{$i}}" class="nav-link hover-table button-add-bill click"><i class="material-icons" style="font-size:20px;">add_shopping_cart</i></a></td>
                                </tr>
                                <?php $i++ ?>
                                @endforeach
                            </tbody>
                        </table>
                                
                        </div>
                        <br>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-primary">Modificar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endforeach

    </div>
</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
<!-- Buscador -->
<script src="{{ url('bootstrap-table-master/dist/bootstrap-table.js') }}"></script>
<script src="{{ url('bootstrap-table-master/dist/bootstrap-table-locale-all.js') }}"></script>
<script type="text/javascript" src="{{ url('js/bill.js') }}"></script>
<script src="{{ url('bootstrap-table-master/dist/extensions/export/bootstrap-table-export.js') }}"></script>
<script type="text/javascript" src="{{ url('libs/FileSaver/FileSaver.min.js') }}"></script>
<script type="text/javascript" src="{{ url('export/libs/js-xlsx/xlsx.core.min.js') }}"></script>
<script type="text/javascript" src="{{ url('export/tableExport.min.js') }}"></script>
@endsection