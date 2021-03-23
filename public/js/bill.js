$(document).ready(function(){

    // se le asigna el valor de la url con el json
    var url = "http://appdemo1.solarc.pe/api/Cliente/GetClientes";

    // obteniendo valores del json con ajax
    $.ajax({
        url: url,
        type: "GET",
        datatype: "json",
        success: function(data){
            client = data['data'];
            var fuseOptions = {keys: ["nombres", "dni"]};
            var options = {display: "nombres", key: "dni", fuseOptions: fuseOptions};
            $("#client").fuzzyComplete(client, options);
            
            // si el input cambia realiza la siguiente funcion
            $('#client').change(function () { 
                var currentClient = $('#client').val(); // se asigna valor del input cliente
                
                // recorriendo array de nombres
                for (let i = 0; i < client.length; i++) {
                    getClient = data['data'][i]['nombres']; // se asigna valor de los nombres del array

                    // condicional para obtener dni
                    if (currentClient == getClient) {
                        $('#client-dni').val(data['data'][i]['dni']); // valor que tendra el input dni
                        $('#id-client').val(data['data'][i]['idCliente']); // valor que tendra el input id cliente
                        $('.idclient').attr('value', data['data'][i]['idCliente']); // valor que tendra el input id cliente
                        $('#razon-client').val(data['data'][i]['razonSocial']); // valor que tendra el input razon social cliente
                        $('.razonClient').attr('value', data['data'][i]['razonSocial']); // valor que tendra el input id cliente
                        $('#ruc-client').val(data['data'][i]['rucCliente']); // valor que tendra el input ruc cliente
                    }
                }
                
            });
            
        }
    });

    $('.type_shop').change(function () { 
        var conceptName = $('.type_shop').find(":selected").val();
        
        if (conceptName == 1 || conceptName == '') {
            $("#dni-input").css("display", "none");
            $('#client-dni').val(0);
        }else{
            $("#dni-input").css("display", "block");
        }
    });

    $('#table-bill .productTotal').each(function() {
        calculateColumn();
    });

    $('#table-bill .productSubtotal').each(function() {
        calculateColumnSubtotal();
    });

    $('.button-delete').on('click', function(){
        $('.select:checked').each(function () {
            $(this).closest('tr').remove()
        });
        calculateColumn();
    });

    // obtener el precio total
    function calculateColumn() {
        var sumaTotal = 0;

        $('#table-bill td.productTotal').each(function() {
            sumaTotal += parseFloat($(this).text()||0,10)
        });

        var money = $('.pay-bill').val();
        var money2 = $(".total-bill").val(Math.round(sumaTotal * 100) / 100);
        var money3 = $(".send-bill").attr('value', sumaTotal);
        $(".resultado").val(sumaTotal);
    
    }

    function calculateColumnSubtotal() {
        var sumaSubtotal = 0;

        $('#table-bill td.productSubtotal').each(function() {
            sumaSubtotal += parseFloat($(this).text()||0,10)
        });

        var money3 = $(".subtotalClient").attr('value', Math.round(sumaSubtotal * 100) / 100);
    
    }

    $(".button-add-bill").click(function(){

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

        var idNumTable = ($('#table-bill tbody').find('tr').length);
        var rowIdTable = 'row-' + idNumTable;
        var productIdTable = idNumTable;
        var cuantity_table = 1;
        var count = parseInt($('.select').length) + 1;
        var input_count = $('.count').val(count);
        var subtotal = price_table * cuantity_table;
        var igv_product = Math.round((subtotal * 0.18) * 100) / 100;
        var total_product = Math.round((igv_product + subtotal) * 100) / 100;

        var markup = "<tr id=" + rowIdTable + "> <td> <input type='checkbox' name='record' class='select'> </td> <td name=codeTable" + productIdTable + ">" + code_table + " <input name=idTable" + productIdTable + " type='number' value=" + id_table + " style='display:none;'> </td> <td name=nameTable" + productIdTable + ">" + name_table + "</td> <td class='productPrice price'>" + price_table + " <input name=priceTable" + productIdTable + " type='number' value=" + price_table + " style='display:none;' hidden> </td> <td class='productCuantity cuantity'>" + cuantity_table + " <input name=cuantityTable" + productIdTable + " type='number' value=" + cuantity_table + " style='display:none;'> </td> <td class='productSubtotal subtotal'>" + subtotal + " <input name=subtotalTable" + productIdTable + " type='number' value=" + subtotal + " style='display:none;'></td> <td class='productIgv'>" + igv_product + " <input name=igvTable" + productIdTable + " type='number' value=" + igv_product + " style='display:none;'></td> <td class='productTotal total'>" + total_product + " <input name=totalTable" + productIdTable + " type='number' value=" + total_product + " style='display:none;'></td> </tr>";
        $("#table-bill tbody").append(markup);

        // activa la funcion para calcular total
        $('#table-bill .productTotal').each(function() {
            calculateColumn();
        });

        // activa la funcion para calcular subtotal
        $('#table-bill .productSubtotal').each(function() {
            calculateColumnSubtotal();
        });

    });

    $('.pay-bill').keyup(function () {
        var cash = parseFloat($(this).val());
        var total_bill = $('.total-bill').val();
        var pay = $('.total-bill').val();
        var disc = $('.discount').val(0);
        
        $('.back-bill').val(Math.round((cash - pay) * 100) / 100);
        $('.back').attr('value', Math.round((cash - pay) * 100) / 100);
        
    });

    $('.rest-discount').keyup(function () {
        var cash = parseFloat($('#bill').val());
        var pay = $('#total-pay').val();
        var total_bill = $('#get-total-pay').val();
        var select = $('.select-discount').val();
        var discount_bill = $(this).val();

        if (select == 'sol') {
            discount_sol = Math.round((total_bill - discount_bill) * 100) / 100;
            $('.discount').val(discount_sol);
            $('#total-pay').val(discount_sol);
            $('.back-bill').val(Math.round((cash - discount_sol) * 100) / 100);
            $('.back').attr('value', Math.round((cash - discount_sol) * 100) / 100);
        }else if (select == 'por') {
            porcent = discount_bill / 100;
            discount_por = total_bill - (total_bill * porcent);
            $('.discount').val(Math.round(discount_por * 100) / 100);
            $('#total-pay').val(Math.round(discount_por * 100) / 100);
            $('.back-bill').val(Math.round((cash - discount_por) * 100) / 100);
            $('.back').attr('value', Math.round((cash - discount_por) * 100) / 100);
        }
    });

    $(".button-add").click(function(){

        var now_id = $(this).attr('id');
        var productModalId = $('.idModal');
        var productCode = $('.codeModal');
        var productName = $('.nameModal');
        var productDescription = $('.descriptionModal');
        var productPrice = $('.priceModal');
        var productPriceDefault = $('.priceDefault');
        var productCuantity = $('.cuantityModal');
        
        var i;

        for (i = 0; i < productCode.length; i++) {
            
            var product_code = productCode[i];
            var product_name = productName[i];
            var product_description = productDescription[i];
            var product_price = productPrice[i];
            var product_price_default = productPriceDefault[i];
            var product_cuantity = productCuantity[i];
            var product_id = productModalId[i];

            if (String(now_id) == String(product_code.id) && 
            String(product_code.id) != undefined && 
            String(now_id) != undefined) {
                var code = product_code.value;
                var name = product_name.value;
                var description = product_description.value;
                var price1 = product_price.value;
                var price2 = product_price_default.value;
                if (price1 == null || price1 == undefined || price1 == 0) {
                    var price = price2;
                }else{
                    var price = price1;
                }
                var cuantity = product_cuantity.value;
                var id = product_id.value;
            }
        }

        var idNum = ($('#table-bill tbody').find('tr').length);
        var rowId = 'row-' + idNum;
        var productId = idNum;
        var count = parseInt($('.select').length) + 1;
        var input_count = $('.count').val(count);

        if (cuantity == 0) {
            cuantity = 1;
            var subtotal = price * cuantity;
            var igv_product = Math.round((subtotal * 0.18) * 100) / 100;
            var total_product = Math.round((igv_product + subtotal) * 100) / 100;
            var markup = "<tr id=" + rowId + "> <td> <input type='checkbox' name='record' class='select'> </td> <td name=codeTable" + productId + ">" + code + " <input name=idTable" + productId + " type='number' value=" + id + " style='display:none;'> </td> <td name=nameTable" + productId + ">" + name + "</td> <td class='productPrice price'>" + price + " <input name=priceTable" + productId + " type='number' value=" + price + " style='display:none;' hidden> </td> <td class='productCuantity cuantity'>" + cuantity + " <input name=cuantityTable" + productId + " type='number' value=" + cuantity + " style='display:none;'> </td> <td class='productSubtotal subtotal'>" + subtotal + " <input name=subtotalTable" + productId + " type='number' value=" + subtotal + " style='display:none;'></td> <td class='productIgv'>" + igv_product + " <input name=igvTable" + productId + " type='number' value=" + igv_product + " style='display:none;'></td> <td class='productTotal total'>" + total_product + " <input name=totalTable" + productId + " type='number' value=" + total_product + " style='display:none;'></td> </tr>";
            $("#table-bill tbody").append(markup);
        }else{
            var subtotal = price * cuantity;
            var igv_product = Math.round((subtotal * 0.18) * 100) / 100;
            var total_product = Math.round((igv_product + subtotal) * 100) / 100;
            var markup = "<tr id=" + rowId + "> <td> <input type='checkbox' name='record' class='select'> </td> <td name=codeTable" + productId + ">" + code + " <input name=idTable" + productId + " type='number' value=" + id + " style='display:none;'> </td> <td name=nameTable" + productId + ">" + name + "</td> <td class='productPrice price'>" + price + " <input name=priceTable" + productId + " type='number' value=" + price + " style='display:none;' hidden> </td> <td class='productCuantity cuantity'>" + cuantity + " <input name=cuantityTable" + productId + " type='number' value=" + cuantity + " style='display:none;'> </td> <td class='productSubtotal subtotal'>" + subtotal + " <input name=subtotalTable" + productId + " type='number' value=" + subtotal + " style='display:none;'></td> <td class='productIgv'>" + igv_product + " <input name=igvTable" + productId + " type='number' value=" + igv_product + " style='display:none;'></td> <td class='productTotal total'>" + total_product + " <input name=totalTable" + productId + " type='number' value=" + total_product + " style='display:none;'></td> </tr>";
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

    if (getMon < 10) {
        getMonFormat = '0'.concat(getDate.getMonth() + 1);
    }else{
        getMonFormat = getDate.getMonth() + 1;
    }


    var getYr = getDate.getFullYear();
    
    $("#billDate").val(getYr + "-" + getMonFormat + "-" + getDy + ' T' + getH + ':' + getM + ':' + getS);
});