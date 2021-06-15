$(document).ready(function(){
    // id de carrito, respuesta del post
    const idResponse = response;  
    // url getcarrito
    const urlCar = `http://appdemo1.solarc.pe/api/Carrito/GetCarrito?IdCarrito=${idResponse}`;

    //////// INICIO AJAX OBTENER CARRITO ////////
    // ajax para cargar carrito
    $.ajax({
        type:"GET",
        datatype: "json",
        url: urlCar,
        // antes de cargar el contenido
        beforeSend: function(){
            // muestra spinner loading
            $("#loader").show();
            // esconde pantalla de facturas
            $("#bill-section").hide();
        },
        // si se obtiene correctamente la data
        success: function(data){
            // condicional para recorrer cada producto
            for (let i = 0; i < data['data'].length; i++) {
                // variable igv del producto
                const igv = (data['data'][i].subTotal) / 1.18;
                // variable subtotal del producto
                const subtot = data['data'][i].subTotal;
                // variable codigo del producto
                const codProd = data['data'][i].codProd;
                // variable id del producto
                const idProd = data['data'][i].idProducto;
                // variable nombre del producto
                const nameProd = data['data'][i].nombreProducto;
                // variable precio del producto
                const sellPrice = data['data'][i].precioVenta;
                // variable cantidad del producto
                const cuantyProd = data['data'][i].cantidad;
                // construye 'tr' en la tabla de productos
                const markup = `<tr> 
                                <td> <input type='checkbox' name='record' class='select tableSelect'> </td> 
                                <td>
                                    <input name="idBillTable${i}" type="text" value="${idResponse}" hidden>
                                    <input type="text" class="form-control code-b" name="codeTable${i}" value="${codProd}" hidden>
                                    <input type="text" class="form-control" name="idTable${i}" value="${idProd}" hidden>
                                    ${codProd}
                                </td> 
                                <td>
                                    <input type="text" class="form-control name-b" name="codeModal${i}" value="${nameProd}" hidden>
                                    ${nameProd}
                                </td> 
                                <td>
                                    <input type="text" class="form-control price-b" name="priceTable${i}" value="${sellPrice}" hidden>
                                    ${sellPrice}
                                </td> 
                                <td>
                                    <input type="text" class="form-control cuantity-b" name="cuantityTable${i}" value="${cuantyProd}" hidden>
                                    ${cuantyProd}
                                </td> 
                                <td class='productSubtotal subtotal'>
                                    <input type="text" class="form-control subtotal-table${i}" name="subtotalTable${i}" value="${subtot}" hidden>
                                    ${parseFloat(subtot / 1.18).toFixed(2)}
                                </td>
                                <td class='total-product'>
                                    <input type="text" class="form-control" name="igvTable${i}" value="${Math.round(igv * 100) / 100}" hidden>
                                    ${parseFloat(subtot - igv).toFixed(2)}
                                </td>
                                <td class='productTotal'>
                                    <input type="text" class="form-control" name="totalTable${i}" value="${((subtot) * 100 / 100)}" hidden>
                                    ${(Math.round((subtot) * 100) / 100)}
                                </td>
                            </tr>`;
                // agrega los 'tr' al html
                $("#table-bill tbody").append(markup);
            }
            // obtener el precio subtotal
            function calculateColumnSubtotal() {
                var sumaSubtotal = 0; // se inicializa la variable en 0

                // obtener todos los elementos td que tengan la clase y el id
                $('#table-bill td.productSubtotal').each(function() {
                    sumaSubtotal += parseFloat($(this).text()||0,10) // suma el precio total de cada producto
                });
                // mostrar solo 2 decimales
                $(".subtotalClient").attr('value', Math.round(sumaSubtotal * 100) / 100);

            }

            // obtener el precio total
            function calculateColumn() {
                var sumaTotal = 0; // se inicializa la variable en 0

                // obtener todos los elementos td que tengan la clase y el id
                $('#table-bill td.productTotal').each(function() {
                    sumaTotal += parseFloat($(this).text()||0,10) // suma el precio total de cada producto
                });

                const money = $('.pay-bill').val();
                const money2 = $(".total-bill").val(Math.round(sumaTotal * 100) / 100);
                const money3 = $(".send-bill").attr('value', sumaTotal);
                $(".resultado").val(sumaTotal); // coloca el valor de la suma del precio de cada producto en el input

            }
            // llama a la funcion para calcular precio total
            calculateColumn();
            // llama a la funcion para calcular precio subtotal
            calculateColumnSubtotal();
            // almacenar usuario en localstorage
            const user = localStorage.getItem('user');
            $(".username").attr('value', user);
            // vaciando todos los inputs al presionar el boton agregar productos
            $('#addMore').click(function () { 
                $('#inputProductCode').val('');
                $('#inputProduct').val('');
                $('#inputCantidad').val('');
                $('#inputPrecio').val('');
                $('#inputSubtotal').val('');
                $('#inputDescripcion').val('');
                $('#productIdModal').val('');
                $('#productCodeModal').val('');
                $('#productNameModal').val('');
                $('#productPriceModal').val('');
                $('#productCuantityModal').val('');
            });

            /////////////// INICIO PRESIONAR AGREGAR ///////////////
            // añadir al presionar el boton dentro de la pantalla repuestos
            $(".button-add").click(function(){
                // asignacion de variables con jQuery
                const now_id = $(this).attr('id');
                const cuantity = $('.cuantityModal').val();
                const productModalId = $('.idModal').val();
                const productCode = $('.codeModal').val();
                const productName = $('.nameModal').val();
                const productDescription = $('.inputDescripcion').val();
                const productPrice = $('.priceModal').val();
                const productPriceDefault = $('.priceDefault').val();
                const productCuantity = $('.cuantityModal').val();

                // condicional para cantidad de productos:
                // si existe una cantidad ejecuta el codigo
                if (cuantity) {
                    
                    const count = parseInt($('.name-b').length); // contador
                    $('.count-inputs').val(count + 1); // aumentando el contando al agregar productos
                    // valor subtotal
                    const subtotal = productCuantity * productPrice;
                    // valor igv
                    const igv_product = subtotal / 1.18;
                    // valor total del producto
                    const total_product = Math.round(subtotal * 100) / 100;
                    // construye el 'tr' de la tabla
                    const markup = `<tr id=" + rowId + "> 
                                    <td> 
                                        <input type='checkbox' name='record' class='select'>
                                    </td> 
                                    <td name=codeTable${count}>
                                        ${productCode}
                                        <input name="idBillTable${count}" type="text" value="${idResponse}" hidden>
                                        <input name=codeTable${count} class='code-b' type='number' value=${productCode} style='display:none;'>
                                        <input type="text" class="form-control" name="idTable${count}" value="${productModalId}" hidden>
                                    </td> 
                                    <td name=nameTable${count}>
                                        ${productName}
                                        <input name=codeModal${count} class='name-b' type='text' value=${productName} style='display:none;'>
                                    </td> 
                                    <td class='productPrice price'>
                                        ${productPrice} 
                                        <input class='price-b' name=priceTable${count} type='number' value=${productPrice} style='display:none;' hidden>
                                    </td> 
                                    <td class='productCuantity cuantity'>
                                        ${productCuantity} 
                                        <input class='cuantity-b' name=cuantityTable${count} type='number' value=${productCuantity} style='display:none;'>
                                    </td> 
                                    <td class='productSubtotal subtotal'>
                                        ${parseFloat(subtotal / 1.18).toFixed(2)}
                                        <input name=subtotalTable${count} type='number' value=${subtotal} style='display:none;'>
                                    </td> 
                                    <td class='productIgv'>
                                        ${parseFloat(subtotal - igv_product).toFixed(2)}
                                        <input name=igvTable${count} type='number' value=${igv_product} style='display:none;'>
                                    </td>
                                    <td class='productTotal total'>
                                        ${total_product}
                                        <input name=totalTable${count} type='number' value=${total_product} style='display:none;'>
                                    </td>
                                </tr>`;
                    // agrega los 'tr' al html
                    $("#table-bill tbody").append(markup);
                }

                // activa la funcion para calcular precio y cantidad
                $('#table-bill .productTotal').each(function() {
                    calculateColumn();
                });

                // activa la funcion para calcular subtotal
                $('#table-bill .productSubtotal').each(function() {
                    calculateColumnSubtotal();
                });
                

            });
            /////////////// FIN PRESIONAR AGREGAR ///////////////
        },
        // despues de cargar el contenido
        complete:function(data){
            // esconde spinner loading
            $("#loader").hide();
            // muestra pantalla de facturas
            $("#bill-section").show();

            // contador de productos en la venta
            const count = parseInt($('.name-b').length);
            // console.log(count);
            $('.count-inputs').val(count); // asignando valor al contador
        }
    });
    //////////////// FIN AJAX OBTENER CARRITO //////////////////

    // cuando el input cliente cambia ejecuta la funcion
    $('#client').change(function (e) {
        // obteniendo el valor dentro del input y se le asigna a la variable
        const clientName = $('#client').val();
        // asignando el valor al input 'nameClient'
        $('.nameClient').attr('value', clientName);
    });
    // ocultando el input 'ruc-input!
    $("#ruc-input").css("display", "");
    // se le asigna el valor de la url con el json de los clientes
    const urlClient = "http://appdemo1.solarc.pe/api/Cliente/GetClientes";

    // obteniendo valores del json clientes con ajax
    $.ajax({
        url: urlClient,
        type: "GET",
        datatype: "json",
        success: function(data){
            client = data['data'];
            const fuseOptions = {keys: ["rucCliente", "dni"]};
            const options = {display: "rucCliente", key: "dni", fuseOptions: fuseOptions};
            $("#ruc-client").fuzzyComplete(client, options);

            // si el input cambia realiza la siguiente funcion
            $('#ruc-client').focusout(function () {
                const currentClient = $('#ruc-client').val(); // se asigna valor del input cliente

                // recorriendo array de nombres
                for (let i = 0; i < client.length; i++) {
                    getClient = data['data'][i]['rucCliente']; // se asigna valor de los nombres del array

                    // condicional para obtener dni
                    if (currentClient == getClient) {
                        $('#client').attr('value', data['data'][i]['nombres']); // valor que tendra el input cliente
                        $('.direccionClient').attr('value', data['data'][i]['direccion']); // valor que tendra el input ruc cliente
                        $('#client-dni').val(data['data'][i]['dni']); // valor que tendra el input dni
                        $('#id-client').val(data['data'][i]['idCliente']); // valor que tendra el input id cliente oculto
                        $('.idclient').attr('value', data['data'][i]['idCliente']); // valor que tendra el input id cliente
                        $('#razon-client').val(data['data'][i]['razonSocial']); // valor que tendra el input razon social cliente
                        $('.razonClient').attr('value', data['data'][i]['razonSocial']); // valor que tendra el input id cliente
                        $('.nameClient').attr('value', data['data'][i]['nombres']); // valor que tendra el input id cliente
                        $('#ruc-client').val(data['data'][i]['rucCliente']); // valor que tendra el input ruc cliente
                        $('.rucClient').attr('value', data['data'][i]['rucCliente']); // valor que tendra el input ruc cliente
                        $('.descriptionBill').attr('value', data['data'][i]['rucCliente']); // valor que tendra el input ruc cliente
                    }
                }

            });

        }
    });
    // al presinar el input 'inputProduct' ejecuta la funcion
    $('#inputProduct').click(function () {
            
        // url de nombres productos
        const urlProducts = `http://appdemo1.solarc.pe/api/Productos/GetProductos`
        // obteniendo valores del json productos con ajax
        $.ajax({
            url: urlProducts,
            type: "GET",
            datatype: "json",
            success: function(data){
                client = data['data'];
                // asignamos a 'prod' un array vacio a la variable
                const prod = [];
                // recorremos todos los nombres de los productos
                for (let i = 0; i < client.length; i++) {
                    // se le asigna el nombre de cada producto a 'x'
                    const x = client[i]['nombreProducto'];
                    // se agregan los productos al array vacio
                    prod.push(x);
                }
                // jQuery ui autocomplete
                $( "#inputProduct" ).autocomplete({
                    source: prod
                });
                // Al salir del foco del 'inputProduct' ejecuta la funcion
                $('#inputProduct').focusout(function(){
                    // recorre todos los productos en la db
                    for (let i = 0; i < client.length; i++) {
                        // le asigna el nombre de cada producto a 'name'
                        const name = client[i]['nombreProducto'];
                        // condicional para comparar el producto seleccionado con los que se
                        // encuentran en la db.
                        if (name == $('#inputProduct').val()) {
                            // Input precio base producto
                            $('#inputPrecio').val(client[i]['precioBase']);
                            // Input codigo producto
                            $('#inputProductCode').val(client[i]['codProd']);
                            // Input descripcion
                            $('#inputDescripcion').val(client[i]['descripcion']);
                            // Input cantidad
                            $('#inputCantidad').val(1);
                            // Input subtotal
                            $('#inputSubtotal').val(client[i]['precioBase'] * $('#inputCantidad').val());
                            // Input oculto de id para agregar a tabla
                            $('#productIdModal').val(client[i]['idProducto']);
                            // Input oculto de codigo para agregar a tabla
                            $('#productCodeModal').val(client[i]['codProd']);
                            // Input oculto de nombre para agregar a tabla
                            $('#productNameModal').val(client[i]['nombreProducto']);
                            // Input oculto de cantidad para precio a tabla
                            $('#productPriceModal').val($('#inputPrecio').val());
                            // Input oculto de cantidad para agregar a tabla
                            $('#productCuantityModal').val($('#inputCantidad').val());
                        }
                    }
                });
                // Al salir del inputCantidad
                $('#inputCantidad').focusout(function(){
                    // asignando el resultado de la operacion al input 'inputSubtotal'
                    $('#inputSubtotal').val($('#inputPrecio').val() * $('#inputCantidad').val());
                    // asignando el valor de la cantidad al input 'productCuantityModal'
                    // el cual toma el POST
                    $('#productCuantityModal').val($('#inputCantidad').val());
                });
            }
        });
        
    });
    // al persionar el input 'inputProductCode'
    $('#inputProductCode').click(function () {
            
        // url de codigo productos
        const urlProductsCode = `http://appdemo1.solarc.pe/api/Productos/GetProductos`
        // obteniendo valores del json productos con ajax
        $.ajax({
            url: urlProductsCode,
            type: "GET",
            datatype: "json",
            success: function(data){
                codeprod = data['data'];
                // asignamos a 'codprod' un array vacio
                const codprod = [];
                for (let i = 0; i < codeprod.length; i++) {
                    const x = codeprod[i]['codProd'];
                    codprod.push(x);
                }
                // jQuery ui autocomplete
                $( "#inputProductCode" ).autocomplete({
                    source: codprod
                });
                // Al salir del foco del 'inputProductCode' ejecuta la funcion
                $('#inputProductCode').focusout(function(){
                    // recorre todos los productos en la db
                    for (let i = 0; i < codeprod.length; i++) {
                        // le asigna el codigo de cada producto a 'code'
                        const code = codeprod[i]['codProd'];
                        // condicional para comparar el producto seleccionado con los que se
                        // encuentran en la db.
                        if (code == $('#inputProductCode').val()) {
                            // Input de precio base
                            $('#inputPrecio').val(codeprod[i]['precioBase']);
                            // Input nombre del producto
                            $('#inputProduct').val(codeprod[i]['nombreProducto']);
                            // Input de descripcion
                            $('#inputDescripcion').val(codeprod[i]['descripcion']);
                            // Input de cantidad
                            $('#inputCantidad').val(1);
                            // Input de subtotal
                            $('#inputSubtotal').val(codeprod[i]['precioBase'] * $('#inputCantidad').val());
                            // Input oculto de id para agregar a tabla
                            $('#productIdModal').val(codeprod[i]['idProducto']);
                            // Input oculto de codigo para agregar a tabla
                            $('#productCodeModal').val(codeprod[i]['codProd']);
                            // Input oculto de nombre para agregar a tabla
                            $('#productNameModal').val(codeprod[i]['nombreProducto']);
                            // Input oculto de cantidad para precio a tabla
                            $('#productPriceModal').val($('#inputPrecio').val());
                            // Input oculto de cantidad para agregar a tabla
                            $('#productCuantityModal').val($('#inputCantidad').val());
                        }
                    }
                });
                // al salir del foco del input 'inputCantidad'
                $('#inputCantidad').focusout(function(){
                    // asignando el resultado de la operacion al input 'inputSubtotal'
                    $('#inputSubtotal').val($('#inputPrecio').val() * $('#inputCantidad').val());
                    // asignando el valor de la cantidad al input 'productCuantityModal'
                    // el cual toma el POST
                    $('#productCuantityModal').val($('#inputCantidad').val());
                });
            }
        });
        
    });

    // cuando el select cambia se ejecuta la funcion
    $('.type_shop').change(function () {
        var select = $(this).val(); // obtener el valor seleccionado
        // obtener el tipo de factura por ajax
        $.ajax({
        type:"GET",
        datatype: "json",
        url: `http://appdemo1.solarc.pe/api/Maestro/GetNroComprobante?IdTipoDoc=${select}`,
        success: function(data){
            var serie = data['data'][0]['serieDoc']; // variable serie documento
            var document = data['data'][0]['nroDoc']; // variable numero de documento
            $(".codeBilles").text( serie + '-' + document); // mostar la serie - nro de documento
            $(".numberBillClient").attr('value', (serie + document)); // input hidden que almacena el numero de factura que se va a enviar a la db
            }
        });

    });

    // cuando el select cambia se ejecuta la funcion para mostrar u ocultar inputs
    $('.type_shop').change(function () {
        var conceptName = $('.type_shop').find(":selected").val(); // obtener el valor seleccionado en el select

        if (conceptName == 1 || conceptName == "") {
            $("#dni-input").css("display", "none"); // input DNI
            $("#client-input").css("display", "block"); // input nombre cliente
            $("#ruc-input").css("display", "none"); // input RUC
            $("#razon-input").css("display", "none"); // input razon social
            $('#client-dni').val(0); // input DNI
        }else{
            $("#client-input").css("display", ""); // input nombre cliente
            $("#ruc-input").css("display", "block"); // input RUC
            $("#razon-input").css("display", "block"); // input razon social
            $("#dni-input").css("display", "block"); // input DNI
        }
    });

    // obtener todos los elementos que tengan la clase y el id
    $('#table-bill .productTotal').each(function() {
        calculateColumn(); // se llama a la funcion
    });

    // obtener todos los elementos que tengan la clase y el id
    $('#table-bill .productSubtotal').each(function() {
        calculateColumnSubtotal(); // se llama a la funcion
    });

    // al presionar el boton ejecutar
    $('.button-delete').on('click', function(){
        $('.select:checked').each(function () {
            $(this).closest('tr').remove() // remueve el producto marcado
        });
        calculateColumn(); // se llama a la funcion
    });

    // ejecuta la funcion cada vez que se suelta una tecla
    $('.pay-bill').keyup(function () {
        // obteniendo valores de los inputs
        var cash = parseFloat($(this).val());
        var total_bill = $('.total-bill').val();
        var pay = $('.total-bill').val();
        var disc = $('.discount').val(0);

        // se realiza el calculo y se redondean los resultados
        $('.back-bill').val(Math.round((cash - pay) * 100) / 100);
        $('.back').attr('value', Math.round((cash - pay) * 100) / 100);

    });

    // ejecuta la funcion cada vez que se suelta una tecla
    $('.rest-discount').keyup(function () {
        // obteniendo valores de los inputs
        var cash = parseFloat($('#bill').val());
        var pay = $('#total-pay').val();
        var total_bill = $('#get-total-pay').val();
        var select = $('.select-discount').val();
        var discount_bill = $(this).val();

        // si se selecciona 'sol' se ejecuta el calculo de descuento en soles
        if (select == 'sol') {
            discount_sol = Math.round((total_bill - discount_bill) * 100) / 100;
            $('.discount').val(discount_sol);
            $('#total-pay').val(discount_sol);
            $('.back-bill').val(Math.round((cash - discount_sol) * 100) / 100);
            $('.back').attr('value', Math.round((cash - discount_sol) * 100) / 100);
        // si se selecciona 'por' se ejecuta el calculo de descuento en porcentaje
        }else if (select == 'por') {
            porcent = discount_bill / 100;
            discount_por = total_bill - (total_bill * porcent);
            $('.discount').val(Math.round(discount_por * 100) / 100);
            $('#total-pay').val(Math.round(discount_por * 100) / 100);
            $('.back-bill').val(Math.round((cash - discount_por) * 100) / 100);
            $('.back').attr('value', Math.round((cash - discount_por) * 100) / 100);
        }
    });


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

    // formateando fecha y hora
    $("#billDate").val(getDy + "-" + getMonFormat + "-" + getYr + ' Hora: ' + getH + ':' + getM + ':' + getS);

    // GENERA FACTURA PDF
    $('#repuestos-form').submit(function() {
        // variable de jsPDF
        var doc = new jsPDF();

        /////////////////////////// Inicio de la Tabla /////////////////////////
        var generateData = function(amount) {
            var all = $(".code-b").map(function() {
                        return this.innerHTML;
                        }).get();
        
        // Valores de cada fila
        var result = [];
        for (let x = 0; x < all.length; x++) {
            var name = {
                Código: $(`input[name="codeTable${x}"]`).val(),
                Nombre: $(`input[name="codeModal${x}"]`).val(),
                Cantidad: $(`input[name="cuantityTable${x}"]`).val(),
                Precio: $(`input[name="priceTable${x}"]`).val(),
                Total: (`${(Math.round($(`input[name="totalTable${x}"]`).val() * 100) / 100 ).toFixed(2)}`),
            };
            // agrega cada valor al array vacio
            result.push(name);
        }

        return result;
        };

        function createHeaders(keys) {
        var result = [];
        for (var i = 0; i < keys.length; i += 1) {
            result.push({
            id: keys[i],
            name: keys[i],
            prompt: keys[i],
            width: 40,
            align: "left",
            padding: 0,
            size: 5
            });
        }
        return result;
        }

        // Cabeceras de la tabla
        var headers = createHeaders([
        "Código",
        "Nombre",
        "Cantidad",
        "Precio",
        "Total",
        ]);

        /////////////////////////// Final de la Tabla /////////////////////////
        
        // Variables de los inputs jQuery
        var inputsCode = $('.code-b');
        var inputsName = $('.name-b');
        var inputsCuantity = $('.cuantity-b');
        var inputsPrice = $('.price-b');
        var totalBill = $('.send-bill');
        var subtotalBill = $('.subtotalClient');
        var discount = $('.rest-discount')
        var cash = $('.pay-bill')
        var cashback = $('.back-bill')

        // for(var i = 0; i < inputsCode.length; i++){
        //     a = $(inputsCode[i]).val() + '   ' 
        //     + $(inputsName[i]).val() + '         ' 
        //     + $(inputsCuantity[i]).val() + '               '
        //     + $(inputsPrice[i]).val() + ' '+ 'S/.' + '\n';
        //     result.push(a);
        // }

        

        
        // sizes = [12, 16, 20],
        // fonts = [['Times', 'Roman'], ['Helvetica', ''], ['Times', 'Italic']],
        // font, size, lines,
        // margin = 0.8, // inches on a 8.5 x 11 inch sheet.
        // verticalOffset = margin,
        // loremipsum = result
        // console.log(result)
        
        // font = fonts[1]
        // size = sizes[1]
        // lines = doc.setFont(font[0])
        //                 .setFontSize(size)
        //                 .splitTextToSize(loremipsum, 7.5)
        
        // doc.text(0.5, verticalOffset + size / 72, lines)

        // verticalOffset += (lines.length + 0.5) * size / 72

        // obtiene el valor del select
        var type_bill = $('.type_shop').find(":selected").val();
        var infoBill = [];

        // cuadrado en el pdf
        doc.rect(140, 20, 50, 40);

        // muestra ruc en el pdf
        doc.setFontSize(10);
                doc.text(145, 30, 'R.U.C.: 20604470081');

        // condicional para el tipo de factura en el pdf
        if (type_bill == 1) {
            doc.setFontSize(15);
                doc.text(150, 40, 'Nota de Venta');
        } else if (type_bill == 2) {
            doc.setFontSize(15);
                doc.text(145, 40, 'Boleta de Venta');
        } else if (type_bill == 3) {
            doc.setFontSize(15);
                doc.text(150, 40, 'Factura');
        } else {
            doc.setFontSize(15);
                doc.text(159, 40, '');   
        }

        // muestra numero de factura
        doc.setFontSize(10);
                doc.text(145, 50, `Nº ${$('.numberBillClient').val()}`);

        // muestra nombre de empresa
        doc.setFontSize(20);
                doc.text(20, 30, 'Importaciones NOARG E.I.R.L');

        // muestra direccion de empresa
        doc.setFontSize(10);
                doc.text(20, 35, 'Dirección: Av. Matias Manzanilla Nro. 760 (1 Cdra del Seguro)');

        // muestra una linea
        doc.line(20, 45, 85, 45)

        // muestra telefono de empresa
        doc.setFontSize(10);
                doc.text(20, 40, 'Tlf:');

        // muestra informacion del cliente
        doc.setFontSize(10);
                doc.text(20, 50, `Cliente: ${$('#client').val()}`);
        
        // condicional para ruc y razon social
        if (type_bill == 1 || type_bill == 2) {
            doc.setFontSize(10);
                doc.text(20, 85, ``);
            doc.setFontSize(10);
                doc.text(20, 90, ``);
        } else {
            // Muestra RUC
            doc.setFontSize(10);
                doc.text(20, 60, `RUC: ${$('.rucClient').val()}`);
            // Muestra Razon Social
            doc.setFontSize(10);
                doc.text(20, 65, `Razón Social: ${$('.razonClient').val()}`);
        }
        
        // condicional para subtotal e igv
        if (type_bill == 1 || type_bill == 2) {
            // muestra la fecha
            doc.setFontSize(10);
                doc.text(20, 55, `Fecha: ${$('#billDate').val()}`);
            doc.setFontSize(10);
                doc.text(150, 75, ``);
            doc.setFontSize(10);
                doc.text(150, 80, ``);
        } else {
            // Muestra Subtotal
            doc.setFontSize(10);
                doc.text(150, 70, `Subtotal: ${$('.subtotalClient').val()} S/.`);
            // Muestra IGV
            doc.setFontSize(10);
                doc.text(150, 75, `IGV(18%): ${( Math.round( (totalBill.val() - subtotalBill.val())* 100)/100 ).toFixed(2)} S/.`);
            // muestra la fecha
            doc.setFontSize(10);
                doc.text(20, 55, `Fecha: ${$('#billDate').val()}`);
        }
        
        // cuadrado en el pdf
        doc.rect(147, 80, 35, 8);

        // muestra el total
        doc.setFontSize(10);
                doc.text(150, 85, `Total: ${( Math.round( (totalBill.val())* 100)/100 ).toFixed(2)} S/.`);

        // Muestra una linea
        doc.line(20, 70, 85, 70)

        // Header de productos forma manual
        // doc.setFontSize(10);
        //         doc.text(20, 75, 'Cod.              Producto                                 Cantidad        Precio');

        // Genera la tabla
        doc.table(30, 110, generateData(5), headers, { autoSize: false, fontSize: 8 });

        // lista de informacion de la venta
        var info = [
            '\n' + '                    Monto a pagar: ' + ( Math.round( (totalBill.val())* 100)/100 ).toFixed(2) + ' '+ 'S/.' + '\n' +
            '                    Descuento: ' + $(discount).val() + ' ' + '\n' +
            '                    Total a pagar: ' + ( Math.round( (totalBill.val())* 100)/100 ).toFixed(2) + ' '+ 'S/.' + '\n' +
            '                    Pago con: ' + $(cash).val() + ' '+ 'S/.' + '\n' +
            '                    Vuelto: ' + ( Math.round( (cashback.val())* 100)/100 ).toFixed(2) + ' '+ 'S/.' + '\n'
        ]
        infoBill.push(info);

        // Muestra: Monto a pagar, Descuento, Total a pagar, Pago con, Vuelto.
        doc.setFontSize(10);
                doc.text(10, 75, `${infoBill.join("")}`);

        // Descargar documento PDF
        doc.save(`factura-${$('.numberBillClient').val()}.pdf`);
    });

});
