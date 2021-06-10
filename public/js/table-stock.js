/*$('#table-stock').bootstrapTable({
    locale: 'es-ES',
    pagination: false,
    search: true,
});*/

oTable = $('#table-stock').DataTable({
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


$(".button-addon").click(function (e) {
    var product = $('.stock-stock');
    var now_id = $(this).attr('id');
    var i;

    // total = parseFloat(stock) + parseFloat(porcent);
    //
    for (i = 0; i < product.length; i++) {
        var my_product = product[i];

        if (String(now_id) == String(my_product.id)) {
            var stock = parseFloat(my_product.value);
        }
    }

    const $row = $(this).closest('.row'),
    price = $row.find('input.price-stock').val(),
    porcent = stock * price/100;
    total = stock + porcent
    $row.find('span.stock-print').html(total);

    // if (typeof(TotalSuma) == undefined || isNaN(TotalSuma)) {
    //     document.querySelector('span[name = MiTotal]').innerHTML = valor1;
    // }else{
    //     document.querySelector('span[name = MiTotal]').innerHTML = TotalSuma;
    // }

});

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

var modalUrl = 'http://appdemo1.solarc.pe/api/Productos/GetRepStock';

ModalTable = $('#table-stock-report').DataTable({
    "ajax": modalUrl,
    "columns": [
        {"data" : "codProd"},
        {"data" : "nombreProducto"},
        {"data" : "descripcion"},
        {"data" : "precioBase"},
        {"data" : "cantidad"},
        {"data" : "precioVenta"}
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

$("#inputDateStart").val(`${getYr}.${getMonFormat}.${getDy}`);
$("#inputDateEnd").val(`${getYr}.${getMonFormat}.${getDy}`);
