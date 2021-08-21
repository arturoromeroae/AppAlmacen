$(document).ready(function(){
    
    if (localStorage.getItem('userId') == "" || localStorage.getItem('userId') == null) {
        window.location.replace("http://app-motos.herokuapp.com/");
    }

    $('.cancel').click(function (e) { 
        e.preventDefault();
        location.replace("/repuestos")
    });

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

        // Logo de la empresa en base 64
        var imgEnterprise = 'data:image/jpeg;base64,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xun2tFGRtMy6/URu2mOZYpm9CW9TX2q5MdJx82ckNPyJWkXbQjWOySPiuGnF9Dozw7waV0w/QY+eVoOrux/czphq7dYdIcNv7sZmvMjcfrbdXAhkD5D4QeQ/raWtcA5zhx2J5VqLTtJ3+YpbKUY9u5lqXiAOdSVj53RwvLe8YLnOBAJI54Hlzx6Kk8DGT0TRpLpOpBK7T+ciuj8GzaKYU8mH3tkp8o3W+YOP6OnlZi26L6tXZzW0OnWQO6jwC+hkjH63gKP803qb2tPc5uem+QZ5/nyy1z7ZNG22QSOfK13T7pLOXBx4IPryPiraW3bP7Q3OLbSz5ZutdjrauFr5YKEyl0XV36T4ZYCeD3/UoRwUZPRtnSfSc4K7SX8v0NHoNoeqMdGLrmtXYcOtwHL6i9XKOENH6y39bgsNdMz2Y6IAG/5ZW6r5JF5WyyMMdE14Hk6Q9iPmOsfJQxley3eplmptyw+8Wm/ZCKOqFPJfKmu5o5YSfdma6R/Lmlp54AJHkV1V0h2paE6M2+CLD9OrVDXCFrJq6eET1Mh6eHcyP5Pfv2+asUcJC+ke8qV+kKjWst+GnjuctL7u+1Z3J5tjeiGImHTzDMivNJaPqzH4uh7YZpmxufK8e9Jw1xcR2b254C6W6VbINvWl2D1WFx4RR3760iDLpXXeJtRUVpHq4ke6Oe4a3gArdsF27aKaa5DcsrwrTmzWy7XWd09RVxU7fEDnHkhhP2G89+lvA5Ujq7TpZdZaszqtbNpDRGDwzCcT08x2kxPCrBR2e00TeiClpIgxjR8eB5k+pWcRF22K+4REQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAf//Z';

        // agrega logo de la empresa
        doc.addImage(imgEnterprise, "JPEG", 10, 10, 45, 45);

        // muestra numero de factura
        doc.setFontSize(10);
                doc.text(145, 50, `Nº ${$('.numberBillClient').val()}`);

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

        // lista de informacion de la venta
        var info = [
            '\n' + '                    Monto a pagar: ' + ( Math.round( (totalBill.val())* 100)/100 ).toFixed(2) + ' '+ 'S/.' + '\n' +
            '                    Descuento: ' + $(discount).val() + ' ' + '\n' +
            '                    Total a pagar: ' + ( Math.round( (totalBill.val())* 100)/100 ).toFixed(2) + ' '+ 'S/.' + '\n' +
            '                    Pago con: ' + $(cash).val() + ' '+ 'S/.' + '\n' +
            '                    Vuelto: ' + ( Math.round( (cashback.val())* 100)/100 ).toFixed(2) + ' '+ 'S/.' + '\n \n' +
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

        // Genera la tabla
        // doc.table(30, 125, generateData(5), headers, { autoSize: false, fontSize: 8 });

        var all_inputs = $(".code-b").map(function() {
            return this.innerHTML;
        }).get();

        // Valores de cada fila
        const result_table = [];
        for (let x = 0; x < all_inputs.length; x++) {
            var name = [
                $(`input[name="codeTable${x}"]`).val(),
                $(`input[name="codeModal${x}"]`).val(),
                $(`input[name="cuantityTable${x}"]`).val(),
                $(`input[name="priceTable${x}"]`).val(),
                (`${parseFloat($(`input[name="totalTable${x}"]`).val()).toFixed(2)}`)
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
        console.log(result_table);

        // Descargar documento PDF
        doc.save(`factura-${$('.numberBillClient').val()}.pdf`);
    });

});
