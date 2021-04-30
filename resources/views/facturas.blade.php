@extends('layouts.navbar')
<link href = "{{ url('jquery-ui-1.12.1/jquery-ui.css') }}" rel = "stylesheet">
<link href = "{{ url('fuzzyComplete/src/css/fuzzycomplete.css') }}" rel = "stylesheet">

@section('content')
<!-- titulo -->
<br />
<br />
<h1 class="h2 text-center">Emitir Comprobante</h1>

<div class="container bg-light">
    <div class="container bg-light">
        <form action="{{ route('repuestos') }}/1/12" method="POST">
        @csrf
            <input name="idBill" type="text" value="{{ $idResponse }}" hidden>
            <input name="dateBill" type="text" id="billDate" hidden>
            <input name="igvBill" type="number" value="{{ $igv }}" hidden>
            <input name="totalBill" type="number" class="send-bill" hidden>
            <input name="backBill" type="number" class="back" hidden>
            <input name="clientBill" type="number" class="idclient" hidden>
            <input name="razonBill" type="text" class="razonClient" hidden>
            <input name="rucBill" type="number" class="rucClient" hidden>
            <input name="nameBill" type="text" class="nameClient" hidden>
            <input name="numberBill" type="text" class="numberBillClient" hidden>
            <input name="subtotalBill" type="text" class="subtotalClient" hidden>
            <input name="direccionBill" type="text" class="direccionClient" hidden>
            <div class="row">
                <div class="col">
                    <div class="mb-3">
                        <label for="inputGroupSelect01">Comprobante</label>
                        <select name="selectBill" class="form-select type_shop" id="inputGroupSelect01" required>
                            <option value="" selected>Seleccione</option>
                            <option value="1">Nota de Venta</option>
                            <option value="2">Boleta de Venta</option>
                            <option value="3">Factura</option>
                        </select>
                        <input type="number" id="igv" hidden>
                    </div>
                    <div class="mb-3">
                        <h1 class="h4 ml-4 codeBilles"></h1>
                    </div>
                </div>
                <div class="col">

                    <div id="client-input" style="display:;">
                        <label for="client">Cliente</label>
                        <input id="client" type="text" class="form-control" placeholder="Cliente" aria-label="cliente">
                    </div>
                    <div id="ruc-input">
                        <label for="ruc-client">RUC</label>
                        <input name="rucBill" type="text" id="ruc-client" class="form-control">
                    </div>
                    <div id="razon-input" style="display:none;">
                        <label for="razon-client">Razon Social</label>
                        <input type="text" id="razon-client" class="form-control">
                    </div>
                    <input type="number" id="id-client" value="0" hidden>

                </div>
            </div>

            <div class="row justify-content-end mb-3">
                <div class="col-6" id="dni-input" style="display:none;">
                    <label for="client-dni">DNI</label>
                    <input id="client-dni" type="text" class="form-control" placeholder="DNI" aria-label="DNI">
                </div>
            </div>

            <div class="row">
                <div class="col">
                    <label>Subtotal</label>
                    <input name="subtotalBill" type="number" class="form-control subtotalClient" disabled>
                </div>
                <div class="col">
                    <label>Monto a pagar</label>
                    <input id="total-pay" type="number" class="form-control total-bill" value="" disabled>
                </div>
                <div class="col">
                    <label>Pago con soles</label>
                    <input id="bill" type="number" class="form-control pay-bill" required>
                </div>
                <div class="col">
                    <label>Vuelto</label>
                    <input type="number" class="form-control back-bill" value="" disabled>
                </div>
                <div class="col mt-3">
                    <a class="nav-link hover-table btn btn-primary" href="#edit-modal-1" data-bs-toggle="modal" data-bs-target="#edit-modal-1">Agregar mas productos +</a>
                </div>
            </div>

            <hr>

            <!-- tabla de venta -->
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
                            <th scope="col">igv</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                    <?php (int)$i=0 ?>
                    @foreach($selectArrayCarrito['data'] as $carrito)
                        <tr>
                            <td><input type='checkbox' name='record' class='select'></td>
                            <td><input type="text" class="form-control code-b" name="codeTable{{$i}}" value="{{ $selectArrayCarrito['data'][$i]['codProd'] }}" hidden><input type="text" class="form-control" name="idTable{{$i}}" value="{{ $selectArrayCarrito['data'][$i]['idProducto'] }}" hidden>{{ $selectArrayCarrito['data'][$i]['codProd'] }}</td>
                            <td><input type="text" class="form-control name-b" name="codeModal{{$i}}" value="{{ $selectArrayCarrito['data'][$i]['nombreProducto'] }}" hidden>{{ $selectArrayCarrito['data'][$i]['nombreProducto'] }}</td>
                            <td><input type="text" class="form-control price-b" name="priceTable{{$i}}" value="{{ $selectArrayCarrito['data'][$i]['precioVenta'] }}" hidden>{{ $selectArrayCarrito['data'][$i]['precioVenta'] }}</td>
                            <td><input type="text" class="form-control cuantity-b" name="cuantityTable{{$i}}" value="{{ $selectArrayCarrito['data'][$i]['cantidad'] }}" hidden>{{ $selectArrayCarrito['data'][$i]['cantidad'] }}</td>
                            <td class='productSubtotal subtotal'><input type="text" class="form-control" name="codeModal" value="{{ $selectArrayCarrito['data'][$i]['subTotal'] }}" hidden>{{ $selectArrayCarrito['data'][$i]['subTotal'] }}</td>
                            <td class='total-product'><input type="text" class="form-control" name="igvTable{{$i}}" value="{{ ($selectArrayCarrito['data'][$i]['subTotal'] * $igv) }}" hidden>{{ round(($selectArrayCarrito['data'][$i]['subTotal'] * $igv), 2) }}</td>
                            <td class='productTotal'><input type="text" class="form-control" name="totalTable{{$i}}" value="{{ ($selectArrayCarrito['data'][$i]['subTotal'] * $igv) + $selectArrayCarrito['data'][$i]['subTotal'] }}" hidden>{{ round(($selectArrayCarrito['data'][$i]['subTotal'] * $igv) + $selectArrayCarrito['data'][$i]['subTotal'], 2) }}</td>
                        </tr>
                    <?php $i++ ?>
                    @endforeach
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
                    <input id="get-total-pay" class="total-bill" type="text" class="form-control" placeholder="S/" aria-label="cliente" disabled>
                </div>
                <div class="col">
                    <label>Descuento</label>
                    <select name="discountBill" class="form-select select-discount" aria-label="Default select example">
                        <option value="no" selected>Seleccione S/ ó %</option>
                        <option value="sol">S/</option>
                        <option value="por">%</option>
                    </select>
                </div>
                <div class="col">
                    <label>Monto del descuento</label>
                    <input name="value-discount-bill" type="text" class="form-control rest-discount" aria-label="cliente">
                    <input type="text" class="form-control rest-discount-default" aria-label="cliente" value="0" hidden>
                </div>
                <div class="col">
                    <label>Nuevo precio de venta</label>
                    <input type="text" class="form-control discount" placeholder="S/" aria-label="cliente" value="" disabled>
                </div>
            </div>
            <div class="col mt-4 mb-4">

                <button type="submit" class="btn btn-primary submit-bill">Emitir comprobante</button>
                <button type="" class="btn btn-danger">Borrar</button>

            </div>
        </form>

        <!-- modal agregar -->
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
                                    <td><input id="parts-modal-shop{{$i}}" type="text" class="form-control idShop" value="{{ $product['idProducto'] }}" hidden><a data-bs-dismiss="modal" class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['codProd'] }}</a></td>
                                    <td><input id="parts-modal-shop{{$i}}" type="text" class="form-control codeShop" value="{{ $product['codProd'] }}" hidden><a data-bs-dismiss="modal" class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['nombreProducto'] }}</a></td>
                                    <td><input id="parts-modal-shop{{$i}}" type="text" class="form-control nameShop" value="{{ $product['nombreProducto'] }}" hidden><a data-bs-dismiss="modal" class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['descripcion'] }}</a></td>
                                    <td><input id="parts-modal-shop{{$i}}" type="text" class="form-control stockShop" value="{{ $product['stock'] }}" hidden><a data-bs-dismiss="modal" class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['stock'] }}</a></td>
                                    <td><input id="parts-modal-shop{{$i}}" type="text" class="form-control priceShop" value="{{ $product['precioVenta'] }}" hidden><a data-bs-dismiss="modal" class="nav-link hover-table" href="#edit-modal-{{ $product['idProducto'] }}" data-bs-toggle="modal" data-bs-target="#edit-modal-{{ $product['idProducto'] }}">{{ $product['precioVenta'] }}</a></td>
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
                        </div>
                </div>
            </div>
        </div>
        @endforeach

        <!-- modal editar -->
        @foreach($productsArray['data'] as $product)
        <div class="modal fade" id="edit-modal-1" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabel">Agregar productos</h5>
                        <button type="button" class="btn-close close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
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
                            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Modificar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endforeach

        <!-- modal editar cantidad productos -->
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
                                            <a id="parts-modal{{$i}}" type="button" data-bs-dismiss="modal" class="btn btn-primary button-add">Agregar al carrito</a>
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

    </div>
</div>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>
<!-- tabla bootstrap -->
<script src="{{ url('bootstrap-table-master/dist/bootstrap-table.js') }}"></script>
<script src="{{ url('bootstrap-table-master/dist/bootstrap-table-locale-all.js') }}"></script>
<!-- Javascript local -->
<script type="text/javascript" src="{{ url('js/bill.js') }}"></script>
<!-- jQuery ui -->
<script src="{{ url('jquery-ui-1.12.1/jquery-ui.js') }}"></script>
<script src = "https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
<!-- fuzzycomplete -->
<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.4.6"></script>
<script src="{{ url('fuzzyComplete/src/js/fuzzycomplete.js') }}"></script>
<!-- PDF -->
<script src="{{ url('jsPDF-1.3.2/dist/jspdf.min.js') }}"></script>

@endsection
