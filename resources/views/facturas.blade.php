@extends('layouts.navbar')
<link href = "{{ url('jquery-ui-1.12.1/jquery-ui.css') }}" rel = "stylesheet">
<link href = "{{ url('fuzzyComplete/src/css/fuzzycomplete.css') }}" rel = "stylesheet">

@section('content')
<br />
<br />
<!-- titulo -->
<h1 class="h2 text-center mt-3">Emitir Comprobante</h1>

<div id="loader" class="loader mt-3" ></div>

<div id='bill-section' class="container bg-light" style='display: none;'>
    <div class="container bg-light">
        <form id="repuestos-form" action="{{ route('repuestos') }}/1/12" method="POST">
        @csrf
            <input name="idBill" type="text" value="{{ $idResponse }}" hidden>
            <input name="dateBill" type="text" id="billDate" hidden>
            <input name="igvBill" type="number" value="{{ $igv }}" hidden>
            <input name="totalBill" type="number" class="send-bill" hidden>
            <input name="backBill" type="number" class="back" hidden>
            <input name="clientBill" type="number" class="idclient" hidden>
            <input name="razonBill" type="text" class="razonClient" hidden>
            <input name="ruc-Bill" type="number" class="rucClient" hidden>
            <input name="nameBill" type="text" value="" class="nameClient" hidden>
            <input name="numberBill" type="text" class="numberBillClient" hidden>
            <input name="subtotalBill" type="text" class="subtotalClient" hidden>
            <input name="direccionBill" type="text" class="direccionClient" hidden>
            <input name="description" type="text" class="descriptionBill" hidden>
            <input class="count-inputs" name="count" value="" type="text" hidden>
            <input class="username" name="username" value="" type="text" hidden>
            <div class="row">
                <div class="col">
                    <div class="mb-3">
                        <label for="inputGroupSelect01">Comprobante</label>
                        <select name="selectBill" class="form-select type_shop" id="inputGroupSelect01" required>
                            <option value="" selected>Seleccione</option>
                            <option value="1">Nota de Venta</option>
                            <option value="2">Boleta de Venta</option>
                            <option value="3">Factura</option>
                            <option value="4">Cotizacion</option>
                        </select>
                        <input type="number" id="igv" hidden>
                    </div>
                    <div class="mb-3">
                        <h1 class="h4 ml-4 codeBilles"></h1>
                    </div>
                </div>
                <div class="col">

                    <div id="client-input">
                        <label for="client">Cliente</label>
                        <input id="client" name="nameNotaVenta" type="text" class="form-control" placeholder="Cliente" aria-label="cliente">
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
                    <a id="addMore" class="nav-link hover-table btn btn-primary" href="#edit-modal-1" data-bs-toggle="modal" data-bs-target="#edit-modal-1">Agregar mas productos +</a>
                </div>
            </div>

            <hr>

            <!-- tabla de venta -->
            <div id="billTable" class="row mt-2">
                <table class="table" id="table-bill" >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">C??digo</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Subtotal</th>
                            <th scope="col">igv</th>
                            <th scope="col">Total</th>
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
                    <input id="get-total-pay" class="total-bill" type="text" class="form-control" placeholder="S/" aria-label="cliente" disabled>
                </div>
                <div class="col">
                    <label>Descuento</label>
                    <select name="discountBill" class="form-select select-discount" aria-label="Default select example">
                        <option value="no" selected>Seleccione S/ ?? %</option>
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
                <button type="" class="btn btn-danger cancel">Cancelar Compra</button>

            </div>
        </form>

        <!-- modal agregar -->
        <div class="modal fade" id="edit-modal-1" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabel">Agregar productos</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <input id="productIdModal" type="text" class="idModal" name="idModal" hidden>
                    <input id="productCodeModal" type="text" class="codeModal" name="codeModal" hidden>
                    <input id="productNameModal" type="text" class="form-control nameModal" hidden>
                    <input id="productPriceModal" type="text" class="form-control priceModal" hidden>
                    <input id="productCuantityModal" type="text" class="form-control cuantityModal" name="cuantityModal" hidden>
                        <div class="row g-3">
                            <div class="col-md-2 ui-front">
                                <label for="inputProductCode" class="form-label">Cod. Producto</label>
                                <input placeholder="C??digo" type="text" class="form-control ui-autocomplete-input" id="inputProductCode">
                            </div>
                            <div class="col-md-4 ui-front">
                                <label for="inputProduct" class="form-label">Producto</label>
                                <input placeholder="Nombre" type="text" class="form-control ui-autocomplete-input" id="inputProduct">
                            </div>
                            <div class="col-md-2">
                                <label for="inputCantidad" class="form-label">Cantidad</label>
                                <input type="number" class="form-control" id="inputCantidad">
                            </div>
                            <div class="col-md-2">
                                <label for="inputPrecio" class="form-label">Precio</label>
                                <input type="number" class="form-control" id="inputPrecio">
                            </div>
                            <div class="col-md-2">
                                <label for="inputSubtotal" class="form-label">Subtotal</label>
                                <input type="number" class="form-control" id="inputSubtotal" disabled>
                            </div>
                            <div class="mb-12">
                                <label for="inputDescripcion" class="form-label">Descripcion</label>
                                <textarea class="form-control" id="inputDescripcion" rows="3" disabled></textarea>
                            </div>
                    </div>
                        <br>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary button-add" data-bs-dismiss="modal">Agregar</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                </div>
            </div>
        </div>
        <!-- fin modal agregar -->

        <!-- modal editar -->
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
                                    <th data-halign="center" data-width="80" data-search-highlight-formatter="customSearchFormatter" data-field="code" scope="col">C??digo</th>
                                    <th data-width="300" data-search-highlight-formatter="customSearchFormatter" data-field="name" data-sortable="true" data-sort-name="name" data-sort-order="asc" scope="col">Nombre</th>
                                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Descripcion</th>
                                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Cantidad</th>
                                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">P. Venta</th>
                                    <th data-search-highlight-formatter="customSearchFormatter" scope="col">Agregar</th>
                                </tr>
                            </thead>

                            <tbody>
                                
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
        <!-- fin modal editar -->
        
    </div>
</div>

<script> response = '<?php echo $idResponse ?>'; </script>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>

<!-- tabla bootstrap
<script src="{{ url('bootstrap-table-master/dist/bootstrap-table.js') }}"></script>
<script src="{{ url('bootstrap-table-master/dist/bootstrap-table-locale-all.js') }}"></script> -->

<!-- data table -->
<script src="{{ url('DataTables/DataTables-1.10.24/js/jquery.dataTables.js') }}"></script>
<script src="{{ url('DataTables/DataTables-1.10.24/js/dataTables.bootstrap4.min.js') }}"></script>

<!-- Javascript local -->
<script type="text/javascript" src="{{ url('js/bill.js') }}"></script>

<!-- jQuery ui -->
<script src="{{ url('jquery-ui-1.12.1/jquery-ui.js') }}"></script>
<script src = "https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>

<!-- fuzzycomplete -->
<script src="https://cdn.jsdelivr.net/npm/fuse.js@6.4.6"></script>
<script src="{{ url('fuzzyComplete/src/js/fuzzycomplete.js') }}"></script>

<!-- JsPDF -->
<script src="{{ url('jsPDF-1.3.2/dist/jspdf.min.js') }}"></script>
<script src="{{ url('jsPDF-1.3.2/plugins/jspdf.plugin.autotable.js') }}"></script>

@endsection
