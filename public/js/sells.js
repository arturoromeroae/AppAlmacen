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
        {"data": "idVentaCab", render: function (idVentaCab) { 
            return `<a id="${idVentaCab}" class="nulled" data-bs-toggle="modal" data-bs-target="#exampleModal" style="cursor: pointer;">
                        <i class="material-icons" style="font-size:25px; margin-left: 40%;">remove_shopping_cart</i>
                    </a>`; 
            }
        },
        {"data": "idVentaCab", render: function (idVentaCab) {
            return `
                    <input id="test-${idVentaCab}" type="text" class="form-control" value="${idVentaCab}" hidden>
                    <a class="nulled" data-bs-toggle="modal" data-bs-target="#printModal" style="cursor: pointer;">
                        <i id="print-${idVentaCab}" class="print material-icons" style="font-size:25px; margin-left: 40%;">print</i>
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
    $('#idPed').val(getDataTable['idVentaCab']);
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
                $(".modal-delete").append(inputs);
            }
        }
    });
    $(".modal-print").html('');
    $.ajax({
        type:"GET",
        datatype: "json",
        url: `http://appdemo1.solarc.pe/api/Venta/ConsultaReimprimir?IdVentaCab=${getDataTable['idVentaCab']}`,
        success: function(data){
            for (let i = 0; i < data['data'].length; i++) {
                var inputsPrint = `
                    ${data['data'][i]['nombreProducto']}<br>
                `;
                $(".modal-print").append(inputsPrint);
            }
            // muestra numero de fecha
            var inputsDt = `${data['data'][0]['fecha']}`;
            $(".datePrint").html(inputsDt);
            // muestra razon social
            var inputsRz = `${data['data'][0]['razonSocial']}`;
            $(".socialPrint").html(inputsRz);
            // muestra numero de factura
            var inputsNr = `${data['data'][0]['serie'] + data['data'][0]['numero']}`;
            $(".billNum").html(inputsNr);
            // muestra el total
            var inputsPr = `${data['data'][0]['total']} /S.`;
            $(".totalPrint").html(inputsPr);
            // muestra numero de fecha
            // condicional para el tipo de factura en el pdf
            if (data['data'][0]['tipoVenta'] == 1) {
                $(".typePrint").html('Nota de Venta');
            } else if (data['data'][0]['tipoVenta'] == 2) {
                $(".typePrint").html('Boleta de Venta');
            } else if (data['data'][0]['tipoVenta'] == 3) {
                $(".typePrint").html('Factura');
            } else {
                $(".typePrint").html('');
            };
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

$('#test1').click(function () {
    // variable de jsPDF
    var doc = new jsPDF();
    $.ajax({
        type:"GET",
        datatype: "json",
        url: `http://appdemo1.solarc.pe/api/Venta/ConsultaReimprimir?IdVentaCab=${$('#idPed').val()}`,
        success: function(data){

            // cuadrado en el pdf
            doc.rect(140, 20, 50, 40);

            // muestra ruc en el pdf
            doc.setFontSize(10);
            doc.text(145, 30, 'R.U.C.: 20604470081');

            // condicional para el tipo de factura en el pdf
            if (data['data'][0]['tipoVenta'] == 1) {
                doc.setFontSize(15);
                    doc.text(150, 40, 'Nota de Venta');
            } else if (data['data'][0]['tipoVenta'] == 2) {
                doc.setFontSize(15);
                    doc.text(145, 40, 'Boleta de Venta');
            } else if (data['data'][0]['tipoVenta'] == 3) {
                doc.setFontSize(15);
                    doc.text(150, 40, 'Factura');
            } else {
                doc.setFontSize(15);
                    doc.text(159, 40, '');   
            }

            // Logo de la empresa en base 64
            var imgEnterprise = 'data:image/png;base64,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';

            // muestra numero de factura
            doc.setFontSize(10);
            doc.text(145, 50, `Nº ${data['data'][0]['serie'] + data['data'][0]['numero']}`);

            // muestra nombre de empresa
            doc.setFontSize(15);
                    doc.text(55, 30, 'Importaciones NOARG E.I.R.L');

            // muestra direccion de empresa
            doc.setFontSize(10);
                    doc.text(55, 35, 'Dirección: Calle la mar 299 - Ica');

            // muestra telefono de empresa
            doc.setFontSize(10);
                    doc.text(55, 40, 'Tlf:');

            // muestra una linea
            doc.line(20, 45, 85, 45)

            // muestra informacion del cliente
            doc.setFontSize(10);
            doc.text(20, 50, `Cliente: ${$('#client').val()}`);

            // condicional para ruc y razon social
            if (data['data'][0]['tipoVenta'] == 1 || data['data'][0]['tipoVenta'] == 2) {
                doc.setFontSize(10);
                    doc.text(20, 85, ``);
                doc.setFontSize(10);
                    doc.text(20, 90, ``);
            } else {
                // Muestra Razon Social
                doc.setFontSize(10);
                    doc.text(20, 65, `Razón Social: ${data['data'][0]['razonSocial']}`);
            }

            // condicional para subtotal e igv
            if (data['data'][0]['tipoVenta'] == 1 || data['data'][0]['tipoVenta'] == 2) {
                // muestra la fecha
                doc.setFontSize(10);
                    doc.text(20, 55, `Fecha: ${data['data'][0]['fecha']}`);
                doc.setFontSize(10);
                    doc.text(150, 75, ``);
                doc.setFontSize(10);
                    doc.text(150, 80, ``);
            } else {
                // Muestra Subtotal
                doc.setFontSize(10);
                    doc.text(150, 70, `Subtotal: ${data['data'][0]['subTotal']} S/.`);
                // Muestra IGV
                doc.setFontSize(10);
                    doc.text(150, 75, `IGV(18%): ${(data['data'][0]['total']) / 1.18} S/.`);
                // muestra la fecha
                doc.setFontSize(10);
                    doc.text(20, 55, `Fecha: ${data['data'][0]['fecha']}`);
            }

            // cuadrado en el pdf
            doc.rect(147, 80, 35, 8);

            // muestra el total
            doc.setFontSize(10);
                    doc.text(150, 85, `Total: ${data['data'][0]['total']} S/.`);

            // Muestra una linea
            doc.line(20, 70, 85, 70)

            // lista de informacion de la venta
            var infoBill = [];
            var info = [
                '\n' + '                    Monto a pagar: ' + data['data'][0]['total'] + ' '+ 'S/.' + '\n' +
                '                    Descuento: ' + data['data'][0]['valorDscto'] + ' ' + '\n' +
                '                    Total a pagar: ' + data['data'][0]['total'] + ' '+ 'S/.' + '\n' +
                '                    Pago con: ' + (data['data'][0]['total'] + data['data'][0]['vuelto']) + ' '+ 'S/.' + '\n' +
                '                    Vuelto: ' + data['data'][0]['vuelto'] + ' '+ 'S/.' + '\n \n' +
                '                    Cuentas BCP: \n' +
                '                    Corriente Soles: 3802552369086 \n' +
                '                    CCI: 00238000255236908642\n' +
                '                    Corriente Dólares: 3802519002157 \n' +
                '                    CCI: 00238000251900215743'
            ]
            infoBill.push(info);

            // Muestra: Monto a pagar, Descuento, Total a pagar, Pago con, Vuelto.
            doc.setFontSize(10);
            doc.text(10, 75, `${infoBill.join("")}`);

            // agrega logo de la empresa
            doc.addImage(imgEnterprise, "JPEG", 10, 10, 45, 45);

            const result_table = [];
            for (let i = 0; i < data['data'].length; i++) {
                // Valores de cada fila
                var name = [
                    data['data'][i]['codProd'],
                    data['data'][i]['nombreProducto'],
                    data['data'][i]['cantidad'],
                    data['data'][i]['precioVenta'],
                    data['data'][i]['totalDet']
                ];
                // agrega cada valor al array vacio
                result_table.push(name);
            }

            // genera la tabla en pdf
            doc.autoTable({
                margin: { top: 130 },
                theme: 'grid',
                head: [['Código', 'Nombre', 'Cantidad', 'Precio', 'Total']],
                body: result_table,
                columnStyles: { halign: 'center'},
                headStyles: {lineColor: [0, 0, 0], textColor: [0, 0, 0], fillColor: [255, 255, 255], lineWidth: 0.1},
                bodyStyles: {lineColor: [0, 0, 0], textColor: [0, 0, 0]},
                didDrawCell: function(data) {
                    data.settings.margin.top = 10;
                }
            });
            // Descargar documento PDF
            doc.save(`factura-${$('.numberBillClient').val()}.pdf`);
        }
    })
})