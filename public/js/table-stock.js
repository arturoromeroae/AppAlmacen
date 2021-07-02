/*$('#table-stock').bootstrapTable({
    locale: 'es-ES',
    pagination: false,
    search: true,
});*/
const Urltable = 'http://appdemo1.solarc.pe/api/Productos/GetProductos';
// datatable
oTable = $('#table-stock').DataTable({
     // obtener valores con ajax en datatable
    "ajax": Urltable,
    // columnas de la tabla
    "columns": [
        {"data" : {codProd : "codProd"}, render: function (data) { 
            return `
                    <input type="text" class="printcode" name="code" value="${data.codProd}" hidden>
                    ${data.codProd}
                `; }
        },
        {"data" : {nombreProducto : "nombreProducto"}, render: function (data) { 
            return `
                    <input type="text" name="name" value="${data.nombreProducto}" hidden>
                    ${data.nombreProducto}
                `; }
        },
        {"data" : {descripcion : "descripcion"}, render: function (data) { 
            return `
                        ${data.descripcion ?
                            `<input type="text" name="desctip" value="${data.descripcion}" hidden>
                            ${data.descripcion}`
                        : 'Sin descripcion'
                        }
                `;}
        },
        {"data" : {stock : "stock"}, render: function (data) { 
            return `
                    <input type="text" name="cuantity" value="${data.stock}" hidden>
                    <p class="text-end">${data.stock}</p>
                `; }
        },
        {"data" : {precioBase : "precioBase"}, render: function (data) { 
            return `
                    <input type="text" name="pricebase" value="${data.precioBase}" hidden>
                    <p class="text-end">${data.precioBase}</p>
                `; }
        },
        {"data" : {precioVenta : "precioVenta"}, render: function (data) { 
            return `
                    <input type="text" name="pricesell" value="${data.precioVenta}" hidden>
                    <p class="text-end">${parseFloat(data.precioVenta).toFixed(2)}</p>
                `; }
        },
        {"data" : {marca : "marca"}, render: function (data) { 
            return `
                    <input type="text" name="pricesell" value="${data.marca}" hidden>
                    <p class="text-end">${data.marca}</p>
                `; }
        },
        {"data" : {modelo : "modelo"}, render: function (data) { 
            return `
                    <input type="text" name="pricesell" value="${data.modelo}" hidden>
                    <p class="text-end">${data.modelo}</p>
                `; }
        },
        {"data" : {
                modelo : "modelo" , 
                nombreProducto : "nombreProducto", 
                codProd : "codProd",
                idProducto : "idProducto",
                stock : "stock",
                precioBase : "precioBase"
        }, render: function (data) { 
            return `
                <div class="">
                    <a class="iconstable" data-bs-toggle="modal" data-bs-target="#Modaledit${data.idProducto}">
                        <i class="material-icons" style="font-size:17px;">
                            create
                        </i>
                    </a>
                    <a class="iconstable" data-bs-toggle="modal" data-bs-target="#delete-modal-${data.idProducto}">
                        <i class="material-icons" style="font-size:17px;">
                            delete
                        </i>
                    </a>
                </div>

                <!-- Modal Editar -->
                <div class="modal fade" id="Modaledit${data.idProducto}" tabindex="-1" aria-labelledby="ModalEditLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalEditLabel${data.codProd}">${data.nombreProducto}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body">
                            <p class="h3 text-capitalize text-center"><strong>${data.nombreProducto}</strong></p>
                            
                                <div class="col-sm-6">
                                    <input type="text" class="form-control idModal" name="idModal" value="${data.idProducto}" hidden>
                                    <input type="text" class="form-control nameModal" name="nameModal" value="${data.nombreProducto}" hidden>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <label for="code-modal" class="col-form-label">Codigo del Producto:</label>
                                        <input type="text" class="form-control codeModal" name="codeModal" value="${data.codProd}" disabled>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="stock-modal" class="col-form-label">Aumento de stock:</label>
                                        <input type="number" class="form-control stockModal" name="stockModal">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <label for="stock-modal" class="col-form-label">Cantidad:</label>
                                        <input type="number" class="form-control" name="stock" value="${data.stock}" disabled>
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
                                            <input id="price${data.idProducto}" max="100" min="0" step=".01" type="number" class="form-control price-stock" name="minumero${data.idProducto}" aria-describedby="basic-addon1">
                                            <span class="input-group-text basic-addon">%</span>
                                            <button id="calculate${data.idProducto}" name="minumero${data.idProducto}" class="btn btn-outline-primary button-addon" type="button">Calcular Precio</button>
                                        </div>
                                    </div>
                                </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <label for="stock-modal" class="col-form-label">Precio Base:</label>
                                            <input id="minumero${data.idProducto}" type="number" data-prod=@json(${data.precioBase}) class="form-control stock-stock" name="stockPrice" value="${data.precioBase}" disabled>
                                        </div>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button type="button" class="btn btn-primary modify${data.idProducto}" data-bs-dismiss="modal">Modificar</button>
                                </div>
                            
                        </div>
                    </div>
                </div>

                <!-- modal eliminar -->
                <div class="modal fade" id="delete-modal-${data.idProducto}" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalLabel">Eliminar producto</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <h1 class="text-center">¿Desea eliminar el producto<br>${data.nombreProducto}?</h1>
                                <input type="number" class="form-control" name="idModal" value="${data.idProducto}" hidden>

                                    <br>
                                <div class="modal-footer d-block text-center">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" style="padding-left: 20px; padding-right: 20px;">No</button>
                                    <button type="button" class="btn btn-primary delete${data.idProducto}" style="padding-left: 25px; padding-right: 25px;">Si</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ${$(".button-addon").click(function () {
                    // calcula el aumento sobre el precio base al presionar el boton
                    const product = $('.stock-stock');
                    const now_id = $(this).attr('name');
                    console.log(now_id)
                    // total = parseFloat(stock) + parseFloat(porcent);
                    //
                    for (let i = 0; i < product.length; i++) {
                        var my_product = product[i];

                        if (String(now_id) == String(my_product.id)) {
                            var stock = parseFloat(my_product.value);
                        }
                    }

                    const $row = $(this).closest('.row'),
                    price = $row.find('input.price-stock').val(),
                    porcent = stock * price / 100;
                    total = stock + porcent
                    $row.find('span.stock-print').html(parseFloat(total).toFixed(2));

                    // if (typeof(TotalSuma) == undefined || isNaN(TotalSuma)) {
                    //     document.querySelector('span[name = MiTotal]').innerHTML = valor1;
                    // }else{
                    //     document.querySelector('span[name = MiTotal]').innerHTML = TotalSuma;
                    // }

                })}
                
                ////////////////////// modal editar //////////////////////
                ${$(`.modify${data.idProducto}`).click(function () {
                    const idEdit = $('.idModal').val();
                    const codeEdit = $('.codeModal').val();
                    const stockEdit = $('.stockModal').val();
                    const priceEdit = $('.price-stock').val();

                    if(priceEdit == '' || priceEdit == null || priceEdit == undefined){
                        var newprice = 0;
                    } else {
                        var newprice = priceEdit;
                    }

                    if(stockEdit == '' || stockEdit == null || stockEdit == undefined){
                        var newstock = 0;
                    } else {
                        var newstock = stockEdit;
                    }
                    
                    // actualizar stock del producto
                    fetch('http://appdemo1.solarc.pe/api/Productos/ActualizaStock', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "idProducto": idEdit,
                            "codProd": codeEdit,
                            "cantidad": newstock,
                            "idOrigen": 1,
                            "usuario": "string"
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                    // enter you logic when the fetch is successful
                        console.log('done')
                        location.reload();
                    })
                    .catch(error => {
                    // enter your logic for when there is an error (ex. error toast)
                    console.log(error)
                    })

                    // actualizar precio del producto
                    fetch('http://appdemo1.solarc.pe/api/Productos/ActualizaPrecioBase', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "idProducto": idEdit,
                            "codProd": codeEdit,
                            "porcentaje": newprice,
                            "idOrigen": 1,
                            "usuario": "string"
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                    // enter you logic when the fetch is successful
                        console.log('done')
                    })
                    .catch(error => {
                    // enter your logic for when there is an error (ex. error toast)
                    console.log(error)
                    })
                })}

                ////////////////////// modal eliminar //////////////////////
                ${$(`.delete${data.idProducto}`).click(function () {
                    const idDelete = $('.idModal').val();

                    // actualizar stock del producto
                    fetch('http://appdemo1.solarc.pe/api/Productos/ActualizarProducto', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "codProd": "string",
                            "nombreProducto": "string",
                            "descripcion": "string",
                            "idMarca": 0,
                            "idModelo": 0,
                            "idUnidadMedida": 0,
                            "idTienda": 0,
                            "precioBase": 0,
                            "imagen": "string",
                            "rutaImagen": "string",
                            "idProducto": idDelete,
                            "cantidad": 0,
                            "precioVenta": 0
                        })
                    })
                    .then(res => res.json())
                    .then(data => {
                    // enter you logic when the fetch is successful
                        console.log('done')
                        location.reload();
                    })
                    .catch(error => {
                    // enter your logic for when there is an error (ex. error toast)
                    console.log(error)
                    })
                }
                )}
                -->
                `; }
        }
     ],
    responsive: true,
    processing: true,
    "bInfo": true,
    "language": {
        "sProcessing": "Procesando...",
        "lengthMenu": "Mostrar _MENU_ registros por pagina",
        'sZeroRecords': 'No se encontraron resultados',
        'sEmptyTable': 'Ningún dato disponible en esta tabla',
        'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
        'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
        'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
        'sInfoPostFix': '',
        'sSearch': 'Buscar:',
        'sUrl': '',
        'sInfoThousands': ',',
        'sLoadingRecords': 'Cargando...',
        'oPaginate': {
            'sFirst': 'Primero ',
            'sLast': 'Último ',
            'sNext': 'Siguiente ',
            'sPrevious': 'Anterior '
        }
    }
    //"serverSide": true,
});

window.customSearchFormatter = function(value, searchText) {
    return value.toString().replace(new RegExp('(' + searchText + ')', 'gim'), '<span style="background-color: #bdd7fa;border: 1px solid blue;border-radius:90px;padding:4px">$1</span>')
}

// descarga csv de la tabla
$("#report-stk").click(function(tableEle, separator = ','){
    $("#table-stock").table2csv({
        filename:'tabla_stock_.csv',
        separator: ',',
        newline: '\n',
        quoteFields: true,
        excludeColumns: '.accion-stock',
        excludeRows: '',
        trimContent: true // Trims the content of individual <th>, <td> tags of whitespaces.
    });
});

////////// INICIO DEL MODAL PARA CONSULTAR GANANCIAS //////////
// url para obtener productos en el modal
var modalUrl = 'http://appdemo1.solarc.pe/api/Productos/GetRepStock';
// datatable para modal
ModalTable = $('#table-stock-report').DataTable({
    // obtener valores con ajax en datatable
    "ajax": modalUrl,
    // columnas de la tabla
    "columns": [
        {"data" : {codProd : "codProd"}, render: function (data) { 
            return `
                    <input type="text" class="printcode" name="code" value="${data.codProd}" hidden>
                    ${data.codProd}
                `; }
        },
        {"data" : {nombreProducto : "nombreProducto"}, render: function (data) { 
            return `
                    <input type="text" name="name" value="${data.nombreProducto}" hidden>
                    ${data.nombreProducto}
                `; }
        },
        {"data" : {descripcion : "descripcion"}, render: function (data) { 
            return `
                        ${data.descripcion ?
                            `<input type="text" name="desctip" value="${data.descripcion}" hidden>
                            ${data.descripcion}`
                        : 'Sin descripcion'
                        }
                `;}
        },
        {"data" : {cantidad : "cantidad"}, render: function (data) { 
            return `
                    <input type="text" name="cuantity" value="${data.cantidad}" hidden>
                    <p class="text-end">${data.cantidad}</p>
                `; }
        },
        {"data" : {precioBase : "precioBase"}, render: function (data) { 
            return `
                    <input type="text" name="pricebase" value="${data.precioBase}" hidden>
                    <p class="text-end">${data.precioBase}</p>
                `; }
        },
        {"data" : {precioVenta : "precioVenta"}, render: function (data) { 
            return `
                    <input type="text" name="pricesell" value="${data.precioVenta}" hidden>
                    <p class="text-end">${parseFloat(data.precioVenta).toFixed(2)}</p>
                `; }
        },
    ],
    responsive: true,
    processing: true,
    "bInfo": true,
    "language": {
        "sProcessing": "Procesando...",
        "lengthMenu": "Mostrar _MENU_ registros por pagina",
        'sZeroRecords': 'No se encontraron resultados',
        'sEmptyTable': 'Ningún dato disponible en esta tabla',
        'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
        'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
        'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
        'sInfoPostFix': '',
        'sSearch': 'Buscar:',
        'sUrl': '',
        'sInfoThousands': ',',
        'sLoadingRecords': 'Cargando...',
        'oPaginate': {
            'sFirst': 'Primero ',
            'sLast': 'Último ',
            'sNext': 'Siguiente ',
            'sPrevious': 'Anterior '
        }
    }
//"serverSide": true,
});

/////////////////// INICIO REPORTE DE VENTAS ///////////////////
// formateando las fechas
// fecha factura
var getDate = new Date();
var getDy = getDate.getDate();
var getMon = getDate.getMonth() + 1;
var getH = getDate.getHours();
var getM = getDate.getMinutes();
var getS = getDate.getSeconds();

// formateando el mes
if (getMon < 10) {
    getMonFormat = '0'.concat(getDate.getMonth() + 1);
}else{
    getMonFormat = getDate.getMonth() + 1;
}

// se obtiene el año
var getYr = getDate.getFullYear();

$( function() {
    $( "#inputDateStart" ).datepicker({
        dateFormat: "yy.mm.dd",
        dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
        monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
    });
} );
    
$( function() {
    $( "#inputDateEnd" ).datepicker({
        dateFormat: "yy.mm.dd",
        dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
        monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]
    });
} );

$("body").delegate("#DatePicker", "focusin", function () {
    $(this).datepicker();
});

// inputs para seleccionar la fecha
$("#inputDateStart").val(`${getYr}.${getMonFormat}.${getDy}`);
$("#inputDateEnd").val(`${getYr}.${getMonFormat}.${getDy}`);

// obtener ganancias por ajax
$('#filter').click(function (e) {
    // url para obtener las ganancias
    const url_profit = `http://appdemo1.solarc.pe/api/Venta/ConsultaGanancia?FechaDesde=${$("#inputDateStart").val()}&FechaHasta=${$("#inputDateEnd").val()}`;
    
    $.ajax({
        type:"GET",
        datatype: "json",
        url: url_profit,
        success: function(data){
            $('#investment').val(data['data'][0]['invertido']);
            $('#sells').val(data['data'][0]['venta']);
            $('#profits').val(data['data'][0]['ganancia']);
        }
    });
});

// url para el ajax de la tabla
var modaReportlUrl = 'http://appdemo1.solarc.pe/api/Productos/GetRepCatalogo';
// datatable para modal reporte de catalogo
ModalTable = $('#table-catalog-report').DataTable({
    buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
    ],
    // obtener valores con ajax en datatable
    "ajax": modaReportlUrl,
    // columnas de la tabla
    "columns": [
        {"data" : {codProd : "codProd"}, render: function (data) { 
            return `
                    <input id="codeprod${data.codProd}" type="text" name="code" value="${data.codProd}" hidden>
                    ${data.codProd}
                `; }
        },
        {"data" : {nombreProducto : "nombreProducto"}, render: function (data) { 
            return `
                    <input type="text" name="cuantity" value="${data.cantidad}" hidden>
                    ${data.nombreProducto}
                `; }
        },
        {"data" : {descripcion : "descripcion"}, render: function (data) { 
            return `
                    <input type="text" name="cuantity" value="${data.cantidad}" hidden>
                    ${data.descripcion}
                `; }
        },
        {"data" : {cantidad : "cantidad"}, render: function (data) { 
            return `
                    <input type="text" name="cuantity" value="${data.cantidad}" hidden>
                    <p class="text-end">${data.cantidad}</p>
                `; }
        },
        {"data" : {precioVenta : "precioVenta"}, render: function (data) { 
            return `
                    <input type="text" name="cuantity" value="${data.precioVenta}" hidden>
                    <p class="text-end">${parseFloat(data.precioVenta).toFixed(2)}</p>
                `; }
        },
        {"data": {rutaImagen : "rutaImagen", codProd : "codProd"}, render: function (data) {

            let loadImage = function(variable){
                var image = new Image();
                var url_image = '../images/' + variable + '.jpg';
                image.src = url_image;
                if (image.width == 0) {
                    return `<img src='../images/default-image.jpg' width="70" height="70" class="rounded">`;
                } else {
                    return `<img src='../images/`+variable+`.jpg' width="70" height="70" class="rounded">`;
                }
            }

            return `
                    <div class="text-center">
                        ${loadImage(data.codProd)}
                    </div>
                `;
            }
        }
    ],
    responsive: true,
    processing: true,
    "bInfo": true,
    "language": {
        "sProcessing": "Procesando...",
        "lengthMenu": "Mostrar _MENU_ registros por pagina",
        'sZeroRecords': 'No se encontraron resultados',
        'sEmptyTable': 'Ningún dato disponible en esta tabla',
        'sInfo': 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
        'sInfoEmpty': 'Mostrando registros del 0 al 0 de un total de 0 registros',
        'sInfoFiltered': '(filtrado de un total de _MAX_ registros)',
        'sInfoPostFix': '',
        'sSearch': 'Buscar:',
        'sUrl': '',
        'sInfoThousands': ',',
        'sLoadingRecords': 'Cargando...',
        'oPaginate': {
            'sFirst': 'Primero ',
            'sLast': 'Último ',
            'sNext': 'Siguiente ',
            'sPrevious': 'Anterior '
        }
    }
//"serverSide": true,
});

// al presionar el boton reporte de stock
$('#report-stock').click(function () { 

    $.ajax({
        type:"GET",
        datatype: "json",
        url: `http://appdemo1.solarc.pe/api/Productos/GetRepStock`,
        success: function(data){
            // al presionar el boton imprimir en el modal reporte de stock
            $('#print-stock').click(function() {
                // variable de jsPDF
                data
                var doc = new jsPDF();

                // Logo de la empresa en base 64
                var imgData = 'data:image/jpeg;base64,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xun2tFGRtMy6/URu2mOZYpm9CW9TX2q5MdJx82ckNPyJWkXbQjWOySPiuGnF9Dozw7waV0w/QY+eVoOrux/czphq7dYdIcNv7sZmvMjcfrbdXAhkD5D4QeQ/raWtcA5zhx2J5VqLTtJ3+YpbKUY9u5lqXiAOdSVj53RwvLe8YLnOBAJI54Hlzx6Kk8DGT0TRpLpOpBK7T+ciuj8GzaKYU8mH3tkp8o3W+YOP6OnlZi26L6tXZzW0OnWQO6jwC+hkjH63gKP803qb2tPc5uem+QZ5/nyy1z7ZNG22QSOfK13T7pLOXBx4IPryPiraW3bP7Q3OLbSz5ZutdjrauFr5YKEyl0XV36T4ZYCeD3/UoRwUZPRtnSfSc4K7SX8v0NHoNoeqMdGLrmtXYcOtwHL6i9XKOENH6y39bgsNdMz2Y6IAG/5ZW6r5JF5WyyMMdE14Hk6Q9iPmOsfJQxley3eplmptyw+8Wm/ZCKOqFPJfKmu5o5YSfdma6R/Lmlp54AJHkV1V0h2paE6M2+CLD9OrVDXCFrJq6eET1Mh6eHcyP5Pfv2+asUcJC+ke8qV+kKjWst+GnjuctL7u+1Z3J5tjeiGImHTzDMivNJaPqzH4uh7YZpmxufK8e9Jw1xcR2b254C6W6VbINvWl2D1WFx4RR3760iDLpXXeJtRUVpHq4ke6Oe4a3gArdsF27aKaa5DcsrwrTmzWy7XWd09RVxU7fEDnHkhhP2G89+lvA5Ujq7TpZdZaszqtbNpDRGDwzCcT08x2kxPCrBR2e00TeiClpIgxjR8eB5k+pWcRF22K+4REQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAf//Z';

                // AGREGAR TEXTO AL PDF
                // direccion
                doc.setFontSize(10);
                doc.text(60, 25, 'Calle la mar 299 - Ica');
                // nombre empresa
                doc.setFontSize(15);
                doc.setFont('helvetica');
                doc.setFontType('bold');
                doc.text(60, 20, 'Importaciones NOARG');
                // FECHAS
                // desde
                doc.setFontType('');
                doc.setFontSize(12);
                doc.text(60, 37, `Desde: ${$("#inputDateStart").val()}`);
                // hasta
                doc.setFontSize(12);
                doc.text(100, 37, `Hasta: ${$("#inputDateEnd").val()}`);
                // invertido
                doc.setFontSize(12);
                doc.text(60, 45, `Invertido: ${$('#investment').val()}`);
                // ventas
                doc.text(60, 50, `Ventas: ${$('#sells').val()}`);
                // ganancias
                doc.text(60, 55, `Ganancias: ${$('#profits').val()}`);
                
                // agrega logo de la empresa
                doc.addImage(imgData, "JPEG", 15, 0, 45, 45);
                // Genera la tabla
                // Valores de cada fila
                const result = [];
                for (let x = 0; x < data['data'].length; x++) {
                    var name = [
                        data['data'][x]['codProd'],
                        data['data'][x]['nombreProducto'],
                        data['data'][x]['descripcion'],
                        data['data'][x]['cantidad'],
                        data['data'][x]['precioBase'],
                        parseFloat(data['data'][x]['precioVenta']).toFixed(2)
                    ];
                    // agrega cada valor al array vacio
                    result.push(name);
                }

                // genera la tabla en pdf
                doc.autoTable({
                    margin: { top: 60 },
                    head: [['Código', 'Nombre', 'Descripción', 'Cantidad', 'Precio Base', 'Precio de Venta']],
                    body: result,
                    columnStyles: { 3: { halign: 'right'}, 4: { halign: 'right'}, 5: { halign: 'right'} },
                    didDrawCell: function(data) {
                        data.settings.margin.top = 10;
                    }
                })

                // Descargar documento PDF
                doc.save(`reporte-${getYr}-${getMonFormat}-${getDy}.pdf`);
            });
        }
    
    });
});

// al presionar el boton reporte de catalogo
$('#report-catalog').click(function () {

    $.ajax({
        type:"GET",
        datatype: "json",
        url: `http://appdemo1.solarc.pe/api/Productos/GetRepCatalogo`,
        success: function(data_catalog){
            // al presionar el boton imprimir en el modal reporte de stock
            $('#print-catalog').click(function() {

                // variable de jsPDF
                var doc = new jsPDF();
                console.log(data_catalog);

                // Logo de la empresa en base 64
                var imgData = 'data:image/jpeg;base64,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xun2tFGRtMy6/URu2mOZYpm9CW9TX2q5MdJx82ckNPyJWkXbQjWOySPiuGnF9Dozw7waV0w/QY+eVoOrux/czphq7dYdIcNv7sZmvMjcfrbdXAhkD5D4QeQ/raWtcA5zhx2J5VqLTtJ3+YpbKUY9u5lqXiAOdSVj53RwvLe8YLnOBAJI54Hlzx6Kk8DGT0TRpLpOpBK7T+ciuj8GzaKYU8mH3tkp8o3W+YOP6OnlZi26L6tXZzW0OnWQO6jwC+hkjH63gKP803qb2tPc5uem+QZ5/nyy1z7ZNG22QSOfK13T7pLOXBx4IPryPiraW3bP7Q3OLbSz5ZutdjrauFr5YKEyl0XV36T4ZYCeD3/UoRwUZPRtnSfSc4K7SX8v0NHoNoeqMdGLrmtXYcOtwHL6i9XKOENH6y39bgsNdMz2Y6IAG/5ZW6r5JF5WyyMMdE14Hk6Q9iPmOsfJQxley3eplmptyw+8Wm/ZCKOqFPJfKmu5o5YSfdma6R/Lmlp54AJHkV1V0h2paE6M2+CLD9OrVDXCFrJq6eET1Mh6eHcyP5Pfv2+asUcJC+ke8qV+kKjWst+GnjuctL7u+1Z3J5tjeiGImHTzDMivNJaPqzH4uh7YZpmxufK8e9Jw1xcR2b254C6W6VbINvWl2D1WFx4RR3760iDLpXXeJtRUVpHq4ke6Oe4a3gArdsF27aKaa5DcsrwrTmzWy7XWd09RVxU7fEDnHkhhP2G89+lvA5Ujq7TpZdZaszqtbNpDRGDwzCcT08x2kxPCrBR2e00TeiClpIgxjR8eB5k+pWcRF22K+4REQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAf//Z';

                // AGREGAR TEXTO AL PDF
                // direccion
                doc.setFontSize(10);
                doc.text(60, 25, 'Calle la mar 299 - Ica');
                // nombre empresa
                doc.setFontSize(15);
                doc.setFont('helvetica');
                doc.setFontType('bold');
                doc.text(60, 20, 'Importaciones NOARG');
                
                // agrega logo de la empresa
                doc.addImage(imgData, "JPEG", 15, 0, 45, 45);
                // Genera la tabla
                const result_catalog = [];
                // recorre cada detalle del producto
                for (let x = 0; x < data_catalog['data'].length; x++) {
                    var catalog = [
                        data_catalog['data'][x]['codProd'],
                        data_catalog['data'][x]['nombreProducto'],
                        data_catalog['data'][x]['descripcion'],
                        data_catalog['data'][x]['cantidad'],
                        parseFloat(data_catalog['data'][x]['precioVenta']).toFixed(2)
                    ];
                    // agrega cada valor al array vacio
                    result_catalog.push(catalog);
                }

                $.get(`../images/${data_catalog['data'][0]['codProd']}.jpg`)
                    .done(function() { 
                        console.log('si');

                    }).fail(function() { 
                        // Image doesn't exist - do something else.
                        console.log('no');
                })

                // funcion que convierte url en base 64
                function convertImgToDataURLviaCanvas(url, callback) {
                    var img = new Image();
                    img.crossOrigin = 'Anonymous';
                    img.onload = function() {
                        var canvas = document.createElement('CANVAS');
                        var ctx = canvas.getContext('2d');
                        var dataURL;
                        canvas.height = this.height;
                        canvas.width = this.width;
                        ctx.drawImage(this, 0, 0);
                        dataURL = canvas.toDataURL("image/jpeg");
                        callback(dataURL);
                    };
                
                    img.src = url;
                }

                // captura todos los inputs con la clase imgcatalog
                for (let x = 0; x < data_catalog['data'].length; x++) {
                    const images = $(`.imgcatalog${data_catalog[x]['codProd']}`).attr('src');
                }

                // llamada de la funcion para transformar a base 64
                convertImgToDataURLviaCanvas( `${images}`, function(dataUri) {
                    // genera la tabla en pdf
                    doc.autoTable({
                        margin: { top: 40 },
                        head: [['Código', 'Nombre', 'Descripción', 'Cantidad', 'Precio de Venta', 'Imagen']],
                        body: result_catalog,
                        columnStyles: { 3: { halign: 'right'}, 4: { halign: 'right'}, 5: { halign: 'center'} },
                        bodyStyles: {minCellHeight: 10},
                        didDrawCell: function(data) {
                            data.settings.margin.top = 10;
                            // imagen en la columna 5 del PDF
                            if (data.column.index === 5 && data.cell.section === 'body') {
                                var dim = data.cell.height - data.cell.padding('vertical');
                                console.log(dataUri);
                                doc.addImage(dataUri, data.cell.x + 2, data.cell.y + 2, dim, dim);
                            }

                        }
                    });
                

                    // Descargar documento PDF
                    doc.save(`reporte-catalogo-${getYr}-${getMonFormat}-${getDy}.pdf`);
                });
            });
            
        }
    
    });
});
