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
    $( "#datestart" ).datepicker({
        dateFormat: "yy.mm.dd",
        dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
        monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
    });
} );
    
$( function() {
    $( "#dateend" ).datepicker({
        dateFormat: "yy.mm.dd",
        dayNamesMin: [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ],
        monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]
    });
} );

$("#datestart").val(`${getYr}.${getMonFormat}.${getDy}`);
$("#dateend").val(`${getYr}.${getMonFormat}.${getDy}`);

select = $('#users').val();

const url = `http://appdemo1.solarc.pe/api/Cotiza/ConsultaCotiza?IdSede=1&Usuario=${select}&TipoComprobante=4&FechaDesde=${$("#datestart").val()}&FechaHasta=${$("#dateend").val()}`;

oTable = $('#table-cotize').DataTable({
    "ajax": url,
    "columns": [
        {"data" : "numero"},
        {"data" : "comprobante"},
        {"data" : "razonSocial"},
        {"data" : "estado"},
        {"data" : "usuario"},
        {"data" : "total"},
        {"data": "idVentaCab", render: function (idVentaCab) { 
            return `<a id="${idVentaCab}" class="nulled link-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" style="cursor: pointer;">
                        <i class="material-icons" style="font-size:25px; margin-left: 40%;">remove_shopping_cart</i>
                    </a>`; 
            }
        },
        {"data": {
                    idVentaCab : "idVentaCab", 
                    numero: "numero", 
                    razonSocial : "razonSocial", 
                    total: "total",
                    estado: "estado"
                }, 
            render: function (data) {
                $(`#cotiza-link-${data.idVentaCab}`).click(function (e) { 
                    $('.titulo-cotiza').text(`${data.numero}`);
                    $('.client-cotiza').text(`${data.razonSocial}`);
                    $('.status-cotiza').text(`${data.estado}`);
                    $('.pay-cotiza').text(`S/${data.total}`);
                    $.ajax({
                        type: "GET",
                        url: `http://appdemo1.solarc.pe/api/Cotiza/GetCotiza?IdVentaCab=${data.idVentaCab}`,
                        beforeSend: function(){
                            // muestra spinner loading
                            $(`#loader-${data.idVentaCab}`).show();
                            // esconde pantalla de facturas
                            $(`#cotizaForm${data.idVentaCab}`).hide();
                        },
                        data: "data",
                        dataType: "json",
                        success: function (response) {
                            const res = response.data
                            const prod = []
                            for (let i = 0; i < res.length; i++) {
                                prod.push("<br>" + res[i].nombreProducto);
                            }
                            $('.products-cotiza').html(`${prod}`);
                        },
                        // despues de cargar el contenido
                        complete:function(response){
                            // esconde spinner loading
                            $(`#loader-${data.idVentaCab}`).hide();
                            // muestra pantalla de facturas
                            $(`#cotizaForm${data.idVentaCab}`).show();
                        }
                    });
                
                });
            return `
                    <input id="cotiza-${data.idVentaCab}" type="text" class="form-control tester" value="${data.idVentaCab}" hidden>
                    <a id="cotiza-link-${data.idVentaCab}" class="nulled" aria-disabled="true" href="#cotize-modal-${data.idVentaCab}" data-bs-toggle="modal" data-bs-target="#cotize-modal-${data.idVentaCab}">
                        <i class="material-icons" style="font-size:25px; margin-left: 40%;">shopping_cart</i>
                    </a>
                    `; 
            }
        }
    ],
    responsive: true,
    processing: false,
    "bInfo": true,
    "language": {
        "sProcessing": "Procesando...",
        "lengthMenu": "Mostrar _MENU_ registros por pagina",
        'sZeroRecords': 'No se encontraron resultados',
        'sEmptyTable': 'Ningún dato disponible en este rango de fechas',
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

// obtener usuarios por ajax
$.ajax({
    type:"GET",
    datatype: "json",
    url: `http://appdemo1.solarc.pe/api/Account/Usuarios`,
    success: function(data){
        for (let i = 0; i < data.length; i++) {
            var markup = `<option value="${data[i].userName}">${data[i].userName}</option>`;
            $("#users").append(markup);
        }
    }
});

$('#search').click(function () {
    select = $('#users').val(); // obtener el valor seleccionado
    bill = $('#typeBill').val(); // obtener el valor seleccionado
    
    oTable.ajax.url( `http://appdemo1.solarc.pe/api/Cotiza/ConsultaCotiza?IdSede=1&Usuario=${select}&TipoComprobante=4&FechaDesde=${$("#datestart").val()}&FechaHasta=${$("#dateend").val()}` ).load();
});

$('#table-cotize tbody').on('click', 'tr', function () {
    var getDataTable = oTable.row( this ).data();

    $('.titulo-cotiza').text(`${getDataTable.numero}`);
    $('.client-cotiza').text(`${getDataTable.razonSocial}`);
    $('.status-cotiza').text(`${getDataTable.estado}`);
    $('.pay-cotiza').text(`S/${getDataTable.total}`);
    $.ajax({
        type: "GET",
        url: `http://appdemo1.solarc.pe/api/Cotiza/GetCotiza?IdVentaCab=${getDataTable.idVentaCab}`,
        beforeSend: function(){
            // muestra spinner loading
            $(`#loader-${getDataTable.idVentaCab}`).show();
            // esconde pantalla de facturas
            $(`#cotizaForm${getDataTable.idVentaCab}`).hide();
        },
        data: "data",
        dataType: "json",
        success: function (response) {
            const res = response.data
            const prod = []
            for (let i = 0; i < res.length; i++) {
                prod.push("<br>" + res[i].nombreProducto);
            }
            $('.products-cotiza').html(`${prod}`);
            
            $(`#venderCotizacion-${getDataTable.idVentaCab}`).click(function () { 
                $('#idCab').attr('value', getDataTable.idVentaCab);
                localStorage.setItem("cotizacion", getDataTable.idVentaCab);
                var origin = window.location.origin;
                window.location.href=`${origin}/repuestos/1`;
            });
        },
        // despues de cargar el contenido
        complete:function(response){
            // esconde spinner loading
            $(`#loader-${getDataTable.idVentaCab}`).hide();
            // muestra pantalla de facturas
            $(`#cotizaForm${getDataTable.idVentaCab}`).show();
        }
    });
});
