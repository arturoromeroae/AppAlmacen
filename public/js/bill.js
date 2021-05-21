$(document).ready(function(){
    // id de carrito, respuesta del post
    const idResponse = response;
    // url getcarrito
    const urlCar = `http://appdemo1.solarc.pe/api/Carrito/GetCarrito?IdCarrito=${idResponse}`;
    $.ajax({
        type:"GET",
        datatype: "json",
        url: urlCar,
        success: function(data){
            
            for (let i = 0; i < data['data'].length; i++) {
                // variable igv del producto
                const igv = (data['data'][i].subTotal) * 0.18;
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
                var markup = `<tr> 
                                <td> <input type='checkbox' name='record' class='select'> </td> 
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
                                    ${subtot}
                                </td>
                                <td class='total-product'>
                                    <input type="text" class="form-control" name="igvTable${i}" value="${Math.round(igv * 100) / 100}" hidden>
                                    ${Math.round(igv * 100) / 100}
                                </td>
                                <td class='productTotal'>
                                    <input type="text" class="form-control" name="totalTable${i}" value="${subtot + (Math.round(igv * 100) / 100)}" hidden>
                                    ${subtot + (Math.round(igv * 100) / 100)}
                                </td>
                            </tr>`;
                $("#table-bill tbody").append(markup);
            }
            // obtener el precio subtotal
            function calculateColumnSubtotal() {
                var sumaSubtotal = 0; // se inicializa la variable en 0

                // obtener todos los elementos td que tengan la clase y el id
                $('#table-bill td.productSubtotal').each(function() {
                    sumaSubtotal += parseFloat($(this).text()||0,10) // suma el precio total de cada producto
                });

                $(".subtotalClient").attr('value', Math.round(sumaSubtotal * 100) / 100);

            }

             // obtener el precio total
            function calculateColumn() {
                var sumaTotal = 0; // se inicializa la variable en 0

                // obtener todos los elementos td que tengan la clase y el id
                $('#table-bill td.productTotal').each(function() {
                    sumaTotal += parseFloat($(this).text()||0,10) // suma el precio total de cada producto
                });

                var money = $('.pay-bill').val();
                var money2 = $(".total-bill").val(Math.round(sumaTotal * 100) / 100);
                var money3 = $(".send-bill").attr('value', sumaTotal);
                $(".resultado").val(sumaTotal); // coloca el valor de la suma del precio de cada producto en el input

            }

            calculateColumn();
            calculateColumnSubtotal();
        }
    });


    // contador de productos en la venta
    var count = parseInt($('.tableSelect').length) - 1;
    $('.count-inputs').val(count);

    $("#ruc-input").css("display", "");
    // se le asigna el valor de la url con el json de los clientes
    var url = "http://appdemo1.solarc.pe/api/Cliente/GetClientes";

    // obteniendo valores del json con ajax
    $.ajax({
        url: url,
        type: "GET",
        datatype: "json",
        success: function(data){
            client = data['data'];
            var fuseOptions = {keys: ["rucCliente", "dni"]};
            var options = {display: "rucCliente", key: "dni", fuseOptions: fuseOptions};
            $("#ruc-client").fuzzyComplete(client, options);

            // si el input cambia realiza la siguiente funcion
            $('#ruc-client').focusout(function () {
                var currentClient = $('#ruc-client').val(); // se asigna valor del input cliente

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
                        $('#ruc-client').val(data['data'][i]['rucCliente']); // valor que tendra el input ruc cliente
                        $('.rucClient').attr('value', data['data'][i]['rucCliente']); // valor que tendra el input ruc cliente
                        $('.descriptionBill').attr('value', data['data'][i]['rucCliente']); // valor que tendra el input ruc cliente
                    }
                }

            });

        }
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

   

     

    // al presionar el boton agrega produtos a la tabla dentro de la pantalla factura
    $(".button-add-bill").click(function(){

        // variables de los inputs jQuery
        var now_id_table = $(this).attr('id');
        var productTableId = $('.idShop');
        var productTableCode = $('.codeShop');
        var productTableName = $('.nameShop');
        var productTableDescription = $('.descriptionModal');
        var productTablePrice = $('.priceModal');
        var productTablePrice = $('.priceShop');
        var productTableCuantity = $('.stockShop');
        var productTableTotal = $('.stockShop');

        var i;
        // agregando productos a la tabla
        for (i = 0; i < productTableId.length; i++) {
            var product_id_shop = productTableId[i];
            var product_code_shop = productTableCode[i];
            var product_name_shop = productTableName[i];
            var product_price_shop = productTablePrice[i];
            var product_cuantity_shop = productTableCuantity[i];

            if (String(now_id_table) == String(product_id_shop.id) &&
            String(product_id_shop.id) != undefined &&
            String(now_id_table) != undefined) {
                var id_table = product_id_shop.value;
                var code_table = product_code_shop.value;
                var name_table = product_name_shop.value;
                var price_table = product_price_shop.value;
                // var cuantity_table = product_cuantity_shop.value;
            }
        }

        // asignacion de variables
        var idNumTable = ($('#table-bill tbody').find('tr').length); // encontrar tr con la clase
        var rowIdTable = 'row-' + idNumTable; // formateando el id de los elementos en la tabal
        var productIdTable = idNumTable;
        var cuantity_table = 1;
        var count = parseInt($('.select').length);
        var input_count = $('.count').val(count);
        var subtotal = price_table * cuantity_table;
        var igv_product = Math.round((subtotal * 0.18) * 100) / 100;
        var total_product = Math.round((igv_product + subtotal) * 100) / 100;  

        // crea un <tr> cada vez que se presiona el boton
        var markup = "<tr id=" + rowIdTable + "> <td> <input type='checkbox' name='record' class='select'> </td> <td name=codeTable" + productIdTable + ">" + code_table + " <input name=codeTable" + productIdTable + " class='code-b' type='text' value=" + code_table + " style='display:none;'> </td> <td name=nameTable" + productIdTable + ">" + name_table + "<input name=codeModal" + productIdTable + " class='name-b' type='text' value=" + name_table + " style='display:none;'> </td> <td class='productPrice price'>" + price_table + " <input class='price-b' name=priceTable" + productIdTable + " type='number' value=" + price_table + " style='display:none;' hidden> </td> <td class='productCuantity cuantity'>" + cuantity_table + " <input class='cuantity-b' name=cuantityTable" + productIdTable + " type='number' value=" + cuantity_table + " style='display:none;'> </td> <td class='productSubtotal subtotal'>" + subtotal + " <input name=subtotalTable" + productIdTable + " type='number' value=" + subtotal + " style='display:none;'></td> <td class='productIgv'>" + igv_product + " <input name=igvTable" + productIdTable + " type='number' value=" + igv_product + " style='display:none;'></td> <td class='productTotal total'>" + total_product + " <input name=totalTable" + productIdTable + " type='number' value=" + total_product + " style='display:none;'></td> </tr>";
        $("#table-bill tbody").append(markup);

        // llama la funcion para calcular total
        $('#table-bill .productTotal').each(function() {
            calculateColumn();
        });

        // llama la funcion para calcular subtotal
        $('#table-bill .productSubtotal').each(function() {
            calculateColumnSubtotal();
        });

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

    // añadir al presionar el boton dentro de la pantalla repuestos
    $(".button-add").click(function(){
        // asignacion de variables con jQuery
        var now_id = $(this).attr('id');
        var productModalId = $('.idModal');
        var productCode = $('.codeModal');
        var productName = $('.nameModal');
        var productDescription = $('.descriptionModal');
        var productPrice = $('.priceModal');
        var productPriceDefault = $('.priceDefault');
        var productCuantity = $('.cuantityModal');

        var i;

        // agregando productos a la tabla
        for (i = 0; i < productCode.length; i++) {
            // asigancion de variables
            var product_code = productCode[i];
            var product_name = productName[i];
            var product_description = productDescription[i];
            var product_price = productPrice[i];
            var product_price_default = productPriceDefault[i];
            var product_cuantity = productCuantity[i];
            var product_id = productModalId[i];

            // comparando el id actual con el id del producto
            if (String(now_id) == String(product_code.id) &&
            String(product_code.id) != undefined &&
            String(now_id) != undefined) {

                // asignacion de variables
                var code = product_code.value;
                var name = product_name.value;
                var description = product_description.value;
                var price1 = product_price.value;
                var price2 = product_price_default.value;

                // condicional para el precio del producto
                if (price1 == null || price1 == undefined || price1 == 0) {
                    var price = price2;
                }else{
                    var price = price1;
                }
                var cuantity = product_cuantity.value;
                var id = product_id.value;
            }
        }

        // encontrar todos los elementos tr con el id y la clase
        // asignacion de variables
        var idNum = ($('#table-bill tbody').find('tr').length);
        var rowId = 'row-' + idNum;
        var productId = idNum;
        var count = parseInt($('.tableSelect').length) + 1;
        var input_count = $('.count-inputs').val(count);

        // condicional para cantidad de productos
        if (cuantity == 0) {
            cuantity = 1;
            var subtotal = price * cuantity;
            var igv_product = Math.round((subtotal * 0.18) * 100) / 100;
            var total_product = Math.round((igv_product + subtotal) * 100) / 100;
            var markup = "<tr id=" + rowId + "> <td> <input type='checkbox' name='record' class='select'> </td> <td name=codeTable" + productId + ">" + code + " <input name=codeTable" + productId + " class='code-b' type='number' value=" + code + " style='display:none;'> </td> <td name=nameTable" + productId + ">" + name + "<input name=codeModal" + productId + " class='name-b' type='text' value=" + name + " style='display:none;'> </td> <td class='productPrice price'>" + price + " <input class='price-b' name=priceTable" + productId + " type='number' value=" + price + " style='display:none;' hidden> </td> <td class='productCuantity cuantity'>" + cuantity + " <input class='cuantity-b' name=cuantityTable" + productId + " type='number' value=" + cuantity + " style='display:none;'> </td> <td class='productSubtotal subtotal'>" + subtotal + " <input name=subtotalTable" + productId + " type='number' value=" + subtotal + " style='display:none;'></td> <td class='productIgv'>" + igv_product + " <input name=igvTable" + productId + " type='number' value=" + igv_product + " style='display:none;'></td> <td class='productTotal total'>" + total_product + " <input name=totalTable" + productId + " type='number' value=" + total_product + " style='display:none;'></td> </tr>";
            $("#table-bill tbody").append(markup);
        }else{
            var subtotal = price * cuantity;
            var igv_product = Math.round((subtotal * 0.18) * 100) / 100;
            var total_product = Math.round((igv_product + subtotal) * 100) / 100;
            var markup = "<tr id=" + rowId + "> <td> <input type='checkbox' name='record' class='select'> </td> <td name=codeTable" + productId + ">" + code + " <input name=codeTable" + productId + " class='code-b' type='number' value=" + code + " style='display:none;'> </td> <td name=nameTable" + productId + ">" + name + "<input name=codeModal" + productId + " class='name-b' type='text' value=" + name + " style='display:none;'> </td> <td class='productPrice price'>" + price + " <input class='price-b' name=priceTable" + productId + " type='number' value=" + price + " style='display:none;' hidden> </td> <td class='productCuantity cuantity'>" + cuantity + " <input class='cuantity-b' name=cuantityTable" + productId + " type='number' value=" + cuantity + " style='display:none;'> </td> <td class='productSubtotal subtotal'>" + subtotal + " <input name=subtotalTable" + productId + " type='number' value=" + subtotal + " style='display:none;'></td> <td class='productIgv'>" + igv_product + " <input name=igvTable" + productId + " type='number' value=" + igv_product + " style='display:none;'></td> <td class='productTotal total'>" + total_product + " <input name=totalTable" + productId + " type='number' value=" + total_product + " style='display:none;'></td> </tr>";
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
                Precio: (`${(Math.round($(`input[name="priceTable${x}"]`).val() * 100) / 100 ).toFixed(2)}`),
                Total: (`${(Math.round($(`input[name="totalTable${x}"]`).val() * 100) / 100 ).toFixed(2)}`),
            };
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
