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

const url = `http://appdemo1.solarc.pe/api/Venta/ConsultaVenta?IdSede=1&Usuario=${select}&TipoComprobante=1&FechaDesde=${$("#datestart").val()}&FechaHasta=${$("#dateend").val()}`;

oTable = $('#table-sells').DataTable({
    "ajax": url,
    "columns": [
        {"data" : "numero"},
        {"data" : "comprobante"},
        {"data" : "razonSocial"},
        {"data" : "total"},
        {"data" : "estado"},
        {"data" : "usuario"},
        {"data": "idVentaCab", render: function (idVentaCab) { return '<a id="' + idVentaCab + '" class="nulled" data-bs-toggle="modal" data-bs-target="#exampleModal" style="cursor: pointer;"><i class="material-icons" style="font-size:25px; margin-left: 40%;">remove_shopping_cart</i></a>'; }} 
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
});

$('#table-sells tbody').on('click', 'tr', function () {
    var getDataTable = oTable.row( this ).data();
    $('#idSell').val(getDataTable['idVentaCab']);
    $('#nulledSell').val(1);
    $('#nSell').html(getDataTable['numero']);
    
    $.ajax({
        type:"GET",
        datatype: "json",
        url: `http://appdemo1.solarc.pe/api/Venta/GetVenta?IdVentaCab=${getDataTable['idVentaCab']}`,
        success: function(data){
            for (let i = 0; i < data['data'].length; i++) {
                var inputs = `
                    <input type="text" class="form-control counterId idProducts${i}" value="${data['data'][i]['idProducto']}" hidden>
                    <input type="text" class="form-control dateProducts" value="${data['data'][i]['fecha']}" hidden>
                    <input type="text" class="form-control subProducts" value="${data['data'][i]['subTotal']}" hidden>
                    <input type="text" class="form-control totProducts" value="${data['data'][i]['total']}" hidden>
                    <input type="text" class="form-control cuantProducts${i}" value="${data['data'][i]['cantidad']}" hidden>
                    <input type="text" class="form-control pSellProducts${i}" value="${data['data'][i]['precioVenta']}" hidden>
                    <input type="text" class="form-control valSellProducts${i}" value="${data['data'][i]['valorVentaDet']}" hidden>
                `;
                $(".modal-body").append(inputs);
            }
        }
    });
});

const user = localStorage.getItem('user');
const productsDetail = [];

$('#null-sell').click(function () {
    const idSell = $('#idSell').val();
    const dateSell = $('.dateProducts').val();
    const subSell = $('.subProducts').val();
    const totSell = $('.totProducts').val();
    
    for (let i = 0; i < $('.counterId').length; i++) {
        const ids = {
            'idVentaCab' : idSell,
            'idProducto' : $(`.idProducts${i}`).val(),
            'cantidad': $(`.cuantProducts${i}`).val(),
            'precioVenta': $(`.pSellProducts${i}`).val(),
            'valorVenta': $(`.valSellProducts${i}`).val(),
            'subTotal': subSell,
            'total': totSell,
            'idOrigen' : 1,
            'isAnulado' : 1
        };
        productsDetail.push(ids);
    }
    
    fetch('http://appdemo1.solarc.pe/api/Venta/InsertaVenta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "fecha": dateSell,
            "idCliente": 0,
            "tipoVenta": 0,
            "subTotal": subSell,
            "igv": 0.18,
            "total": totSell,
            "vuelto": 0,
            "porcDscto": 0,
            "valorDscto": 0,
            "valorVenta": 0,
            "idSede": 1,
            "idPedCab": 0,
            "usuario": user,
            "rucCliente": "string",
            "razonSocial": "string",
            "idOrigen": 1,
            "isAnulado": 1,
            "idVentaCab": idSell,
            "ventaDet": productsDetail
        })
    })
    .then(res => res.json())
    .then(data => {
    // enter you logic when the fetch is successful
        location.reload();
    })
    .catch(error => {
    // enter your logic for when there is an error (ex. error toast)
    console.log(error)
    })
});

// formato de busqueda
window.customSearchFormatter = function(value, searchText) {
    return value.toString().replace(new RegExp('(' + searchText + ')', 'gim'), '<span style="background-color: #bdd7fa;border: 1px solid blue;border-radius:90px;padding:4px">$1</span>')
}
