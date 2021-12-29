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
        {"data": {
            idVentaCab : "idVentaCab", 
            numero: "numero", 
            razonSocial : "razonSocial", 
            total: "total",
            estado: "estado",
            fecha: "fecha"
        }, render: function (data) {
            $(`#btn-delete${data.idVentaCab}`).click(function () {
                $(`#idCotize${data.idVentaCab}`).attr("value", data.idVentaCab);
                $(`#totalCotize${data.idVentaCab}`).attr("value", data.total);
                $(`#totalCotize${data.idVentaCab}`).attr("value", data.fecha);
                console.log('hola')
            });

            return `
                    <a id="btn-delete${data.idVentaCab}" class="nulled link-danger" data-bs-toggle="modal" data-bs-target="#deleteCotizeModal" style="cursor: pointer;">
                        <i class="material-icons" style="font-size:25px; margin-left: 40%;">remove_shopping_cart</i>
                    </a>
                    `;
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
                $(`#cotiza-link-${data.idVentaCab}`).click(function () { 
                    $('.titulo-cotiza').text(`${data.numero}`);
                    $('.client-cotiza').text(`${data.razonSocial}`);
                    $('.status-cotiza').text(`${data.estado}`);
                    $('.pay-cotiza').text(`S/${data.total}`);
                    $.ajax({
                        type: "GET",
                        url: `http://appdemo1.solarc.pe/api/Cotiza/GetCotiza?IdVentaCab=${data.idVentaCab}`,
                        beforeSend: function(){
                            
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
                            
                        }
                    });
                
                });
            return `
                    <input id="cotiza-${data.idVentaCab}" type="text" class="form-control tester" value="${data.idVentaCab}" hidden>
                    <a id="cotiza-link-${data.idVentaCab}" class="nulled cotiza-link" aria-disabled="true" href="#cotize-modal" data-bs-toggle="modal" data-bs-target="#cotize-modal">
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
    $(`#idCab`).attr("value", getDataTable.idVentaCab);

    $.ajax({
        type: "GET",
        url: `http://appdemo1.solarc.pe/api/Cotiza/GetCotiza?IdVentaCab=${getDataTable.idVentaCab}`,
        beforeSend: function(){
            // muestra spinner loading
            $(`#loader`).show();
            // esconde pantalla de facturas
            $(`#cotizaForm`).hide();
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
            
            $(`#venderCotizacion`).click(function () { 
                $('#idCab').attr('value', getDataTable.idVentaCab);
                localStorage.setItem("cotizacion", getDataTable.idVentaCab);
                var origin = window.location.origin;
                window.location.href=`${origin}/repuestos/1`;
            });

            const user = localStorage.getItem('user');
            const productsDetail = [];

            let counter = 0;
            for (let i = 0; i < res.length; i++) {
                
                if (getDataTable.idVentaCab == res[i].idVentaCab) {
                    counter++
                    document.getElementById(`impr${getDataTable.idVentaCab}`).innerHTML += `<input value="${res[i].nombreProducto}" hidden>`
    
                    if (counter < 2) {
                        $(`#dateCotize${getDataTable.idVentaCab}`).attr("value", res[i].fecha);
                        $(`#subtCotize${getDataTable.idVentaCab}`).attr("value", res[i].subTotal);
                    }
                }
            }

            $(`#nCotize${getDataTable.idVentaCab}`).text(`${getDataTable.numero}`);

            $(`#cancl-cotize-${getDataTable.idVentaCab}`).click(function () { 
                document.getElementById(`impr${getDataTable.idVentaCab}`).innerHTML = ''
            });

            $(`#x-cotize-${getDataTable.idVentaCab}`).click(function () { 
                document.getElementById(`impr${getDataTable.idVentaCab}`).innerHTML = ''
            });

            $(`#del-cotize-${getDataTable.idVentaCab}`).click(function () {
                const idCotize = $(`#idCotize${getDataTable.idVentaCab}`).val();
                const totCotize = $(`#totalCotize${getDataTable.idVentaCab}`).val();
                const dateCotize = $(`#dateCotize${getDataTable.idVentaCab}`).val();
                const subCotize = $(`#subtCotize${getDataTable.idVentaCab}`).val();
                // console.log(subCotize)
                // console.log(res.length)
                
                // for (let i = 0; i < $('.counterId').length; i++) {
                //     const ids = {
                //         'idVentaCab' : idSell,
                //         'idProducto' : $(`.idProducts${i}`).val(),
                //         'cantidad': $(`.cuantProducts${i}`).val(),
                //         'precioVenta': $(`.pSellProducts${i}`).val(),
                //         'valorVenta': $(`.valSellProducts${i}`).val(),
                //         'subTotal': subSell,
                //         'total': totSell,
                //         'idOrigen' : 1,
                //         'isAnulado' : 1
                //     };
                //     productsDetail.push(ids);
                // }
                
                // fetch('http://appdemo1.solarc.pe/api/Venta/InsertaVenta', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         "fecha": dateSell,
                //         "idCliente": 0,
                //         "tipoVenta": 0,
                //         "subTotal": subSell,
                //         "igv": 0.18,
                //         "total": totSell,
                //         "vuelto": 0,
                //         "porcDscto": 0,
                //         "valorDscto": 0,
                //         "valorVenta": 0,
                //         "idSede": 1,
                //         "idPedCab": 0,
                //         "usuario": user,
                //         "rucCliente": "string",
                //         "razonSocial": "string",
                //         "idOrigen": 1,
                //         "isAnulado": 1,
                //         "idVentaCab": idSell,
                //         "ventaDet": productsDetail
                //     })
                // })
                // .then(res => res.json())
                // .then(data => {
                // // enter you logic when the fetch is successful
                //     location.reload();
                // })
                // .catch(error => {
                // // enter your logic for when there is an error (ex. error toast)
                // console.log(error)
                // })
            });
        },
        // despues de cargar el contenido
        complete:function(response){
            // esconde spinner loading
            $(`#loader`).hide();
            // muestra pantalla de facturas
            $(`#cotizaForm`).show();
        }
    });
});
