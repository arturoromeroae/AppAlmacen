const comp = []

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
        defaultDate: +7
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

var url = `http://appdemo1.solarc.pe/api/Venta/ConsultaVenta?IdSede=1&Usuario=${select}&TipoComprobante=1&FechaDesde=${$("#datestart").val()}&FechaHasta=${$("#dateend").val()}`;

oTable = $('#table-sells').DataTable({
    "ajax": url,
    "columns": [
        {"data" : "numero"},
        {"data" : "comprobante"},
        {"data" : "razonSocial"},
        {"data" : "total"},
        {"data" : "estado"},
        {"data" : "usuario"}
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

// obtener el tipo de factura por ajax
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
    oTable.ajax.url( `http://appdemo1.solarc.pe/api/Venta/ConsultaVenta?IdSede=1&Usuario=${select}&TipoComprobante=${bill}&FechaDesde=${$("#datestart").val()}&FechaHasta=${$("#dateend").val()}` ).load();
    var test = `http://appdemo1.solarc.pe/api/Venta/ConsultaVenta?IdSede=1&Usuario=${select}&TipoComprobante=${bill}&FechaDesde=${$("#datestart").val()}&FechaHasta=${$("#dateend").val()}`
    console.log(test);
});

// formato de busqueda
window.customSearchFormatter = function(value, searchText) {
    return value.toString().replace(new RegExp('(' + searchText + ')', 'gim'), '<span style="background-color: #bdd7fa;border: 1px solid blue;border-radius:90px;padding:4px">$1</span>')
}
